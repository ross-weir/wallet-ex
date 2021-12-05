//! Database functionality

// TODO:
// If we need to ship migrations
// embed_migrations! (https://docs.rs/diesel_migrations/latest/diesel_migrations/index.html)

use anyhow::Result;
use diesel::{Connection, SqliteConnection};
use std::sync::{Arc, Mutex};

/// Thread safe Sqlite connection
pub type SafeConnection = Arc<Mutex<SqliteConnection>>;

pub fn connect() -> Result<SqliteConnection> {
  // TODO: get db location
  let db_url = "db.sqlite3";

  Ok(SqliteConnection::establish(db_url)?)
}
