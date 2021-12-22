use super::wallet::Wallet;
use crate::schema::accounts;
use anyhow::Result;
use chrono::NaiveDateTime;
use diesel::{dsl::sql, insert_into, prelude::*, result::Error, SqliteConnection};
use serde::{Deserialize, Serialize};

/// Represents a wallet account.
/// Contains the coin_type derivation path as it made the most sense to me to include it at the account level
/// m/44'/{coin_type}'/{derive_idx}'/0/0
#[derive(Queryable, Identifiable, Insertable, Serialize, Deserialize, Associations)]
#[serde(rename_all = "camelCase")]
#[belongs_to(Wallet)]
pub struct Account {
  id: i32,
  name: String,
  coin_type: i32,
  derive_idx: i32,
  created_at: Option<NaiveDateTime>,
  wallet_id: i32,
}

/// Form for creating a new wallet account
#[derive(Deserialize, Insertable)]
#[table_name = "accounts"]
#[serde(rename_all = "camelCase")]
pub struct CreateAccountArgs<'a> {
  name: &'a str,
  coin_type: i32,
  wallet_id: i32,
}

impl Account {
  pub fn create(args: CreateAccountArgs, db: &SqliteConnection) -> Result<Account> {
    use crate::schema::accounts::dsl::*;

    Ok(db.transaction::<_, Error, _>(|| {
      let existing_derive_idx = accounts
        .filter(coin_type.eq(args.coin_type))
        .filter(wallet_id.eq(args.wallet_id))
        .select(derive_idx)
        .order_by(derive_idx.desc())
        .first::<i32>(db);
      let derive_index = match existing_derive_idx {
        Ok(i) => i + 1,
        Err(Error::NotFound) => 0,
        Err(e) => return Err(e)?,
      };

      insert_into(accounts)
        .values((&args, derive_idx.eq(derive_index)))
        .execute(db)?;

      Ok(accounts.find(sql("last_insert_rowid()")).get_result(db)?)
    })?)
  }

  pub fn find(id: i32, db: &SqliteConnection) -> Result<Account> {
    Ok(accounts::table.find(id).first(db)?)
  }
}
