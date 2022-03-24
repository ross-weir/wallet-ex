use crate::schema::wallets;
use anyhow::Result;
use diesel::{dsl::sql, insert_into, prelude::*, result::Error, SqliteConnection};
use serde::{Deserialize, Serialize};

#[derive(Queryable, Identifiable, Serialize, Deserialize, Debug, Insertable)]
#[serde(rename_all = "camelCase")]
pub struct Wallet {
  id: i32,
  name: String,
  // Don't return password by default when querying a full wallet row
  #[serde(skip_serializing)]
  password: String,
  interface: String,
}

#[derive(Deserialize, Insertable)]
#[table_name = "wallets"]
#[serde(rename_all = "camelCase")]
pub struct CreateWalletArgs<'a> {
  name: &'a str,
  password: &'a str,
  interface: &'a str,
}

impl Wallet {
  pub fn create(args: CreateWalletArgs, db: &SqliteConnection) -> Result<Wallet> {
    Ok(db.transaction::<_, Error, _>(|| {
      insert_into(wallets::table).values(&args).execute(db)?;

      Ok(
        wallets::table
          .find(sql("last_insert_rowid()"))
          .get_result(db)?,
      )
    })?)
  }

  pub fn find(id: i32, db: &SqliteConnection) -> Result<Wallet> {
    Ok(wallets::table.find(id).first(db)?)
  }

  pub fn list(db: &SqliteConnection) -> Result<Vec<Wallet>> {
    Ok(wallets::table.load::<Wallet>(db)?)
  }

  pub fn get_password(id: i32, db: &SqliteConnection) -> Result<String> {
    Ok(
      wallets::table
        .select(wallets::password)
        .find(id)
        .first(db)?,
    )
  }
}
