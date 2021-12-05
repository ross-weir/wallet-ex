use crate::schema::wallets;
use diesel::{dsl::sql, insert_into, prelude::*, SqliteConnection};
use serde::{Deserialize, Serialize};

#[derive(Queryable, Identifiable, Serialize, PartialEq, Debug)]
pub struct Wallet {
  pub id: i32,
  pub name: String,
  pub interface: String,
}

#[derive(Deserialize, Insertable)]
#[table_name = "wallets"]
pub struct CreateWalletArgs<'a> {
  name: &'a str,
  interface: &'a str,
}

impl Wallet {
  pub fn create(args: CreateWalletArgs, db: &SqliteConnection) -> Result<Wallet, String> {
    use crate::schema::wallets::dsl::*;
    use diesel::result::Error;

    // Diesel sqlite doesn't support returning:
    // https://github.com/diesel-rs/diesel/discussions/2684
    Ok(
      db.transaction::<_, Error, _>(|| {
        insert_into(wallets).values(&args).execute(db)?;

        Ok(wallets.find(sql("last_insert_rowid()")).get_result(db)?)
      })
      .map_err(|_| "Failure")?,
    )
  }

  pub fn find(db: &SqliteConnection) -> Result<Wallet, String> {
    todo!()
  }
}
