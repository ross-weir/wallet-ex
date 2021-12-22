//! Ops for seeding database
//! Used for testing/development purposes

use std::fs;

use crate::{
  entities::{account::Account, address::Address, wallet::Wallet},
  schema::{accounts, addresses, wallets},
};
use diesel::{prelude::*, result::Error, SqliteConnection};
use serde::Deserialize;

#[derive(Deserialize)]
struct SeedJson {
  wallets: Vec<Wallet>,
  accounts: Vec<Account>,
  addresses: Vec<Address>,
}

/// Insert seed data into the database
/// seed_path is an OS path to a json file containing the data
pub fn insert_data(db: &SqliteConnection, seed_path: String) -> anyhow::Result<()> {
  let json_str = fs::read_to_string(seed_path)?;
  let data: SeedJson = serde_json::from_str(&json_str)?;

  Ok(db.transaction::<_, Error, _>(|| {
    // Order is important
    // Wallets -> Accounts -> Addresses
    diesel::insert_into(wallets::table)
      .values(data.wallets)
      .execute(db)?;
    diesel::insert_into(accounts::table)
      .values(data.accounts)
      .execute(db)?;
    diesel::insert_into(addresses::table)
      .values(data.addresses)
      .execute(db)?;

    Ok(())
  })?)
}
