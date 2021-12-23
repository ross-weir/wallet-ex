use crate::schema::wallets;
use anyhow::Result;
use chrono::NaiveDateTime;
use diesel::{dsl::sql, insert_into, prelude::*, result::Error, SqliteConnection};
use serde::{Deserialize, Serialize};

#[derive(Queryable, Identifiable, Serialize, Deserialize, Debug, Insertable)]
#[serde(rename_all = "camelCase")]
pub struct Wallet {
  id: i32,
  name: String,
  interface: String,
  // Describes the standard to use for HD wallets
  // For example: https://github.com/ergoplatform/eips/blob/master/eip-0003.md
  hd_standard: String,
  created_at: Option<NaiveDateTime>,
}

#[derive(Deserialize, Insertable)]
#[table_name = "wallets"]
pub struct CreateWalletArgs<'a> {
  name: &'a str,
  interface: &'a str,
}

impl Wallet {
  pub fn create(args: CreateWalletArgs, db: &SqliteConnection) -> Result<Wallet> {
    use crate::schema::wallets::dsl::*;

    // Diesel sqlite doesn't support returning:
    // https://github.com/diesel-rs/diesel/discussions/2684
    Ok(db.transaction::<_, Error, _>(|| {
      insert_into(wallets).values(&args).execute(db)?;

      Ok(wallets.find(sql("last_insert_rowid()")).get_result(db)?)
    })?)
  }

  pub fn find(id: i32, db: &SqliteConnection) -> Result<Wallet> {
    Ok(wallets::table.find(id).first(db)?)
  }

  // TODO: pagination
  // aggregrate balances
  pub fn list(db: &SqliteConnection) -> Result<Vec<Wallet>> {
    use crate::schema::wallets::dsl::*;

    // get balance of each account belonging to the wallet
    // and tally them
    // Should account balance be a denormalized field? with the tally of all transactions?
    // Maybe start non-denormalized
    todo!()
  }
}
