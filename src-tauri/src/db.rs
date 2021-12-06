//! Database functionality

// TODO:
// If we need to ship migrations
// embed_migrations! (https://docs.rs/diesel_migrations/latest/diesel_migrations/index.html)

use anyhow::Result;
use diesel::{Connection, SqliteConnection};
use std::sync::{Arc, Mutex};

/// Thread safe Sqlite connection
pub type SafeConnection = Arc<Mutex<SqliteConnection>>;

pub fn init_and_connect(db_url: &str) -> Result<SqliteConnection> {
  // create db if it doesn't exist
  // run db migrations
  // connect to db, pass db into tauri state

  Ok(SqliteConnection::establish(db_url)?)
}
