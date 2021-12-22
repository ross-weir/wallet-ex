use super::account::Account;
use crate::schema::addresses;
use anyhow::Result;
use diesel::{dsl::sql, insert_into, prelude::*, result::Error, QueryDsl, SqliteConnection};
use serde::{Deserialize, Serialize};

#[derive(Queryable, Identifiable, Insertable, Serialize, Deserialize, Associations)]
#[belongs_to(Account)]
#[table_name(addresses)]
#[serde(rename_all = "camelCase")]
pub struct Address {
  id: i32,
  address: String,
  /// Index of the path used to derive this address:
  /// m/44'/429'/0'/0/{derive_idx}
  derive_idx: i32,
  account_id: i32,
  balance: Option<f64>,
}

/// Form for creating a new address
#[derive(Deserialize, Insertable)]
#[table_name(addresses)]
#[serde(rename_all = "camelCase")]
pub struct CreateAddressArgs {
  address: String,
  derive_idx: i32,
  account_id: i32,
}

impl Address {
  pub fn create(args: CreateAddressArgs, db: &SqliteConnection) -> Result<Address> {
    use crate::schema::addresses::dsl::*;

    Ok(db.transaction::<_, Error, _>(|| {
      insert_into(addresses).values(&args).execute(db)?;

      Ok(addresses.find(sql("last_insert_rowid()")).get_result(db)?)
    })?)
  }

  pub fn by_account_id(acct_id: i32, db: &SqliteConnection) -> Result<Vec<Address>> {
    use crate::schema::addresses::dsl::*;

    Ok(
      addresses
        .filter(account_id.eq(acct_id))
        .load::<Address>(db)?,
    )
  }
}
