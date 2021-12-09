//! Database functionality

use crate::config;
use diesel::SqliteConnection;
use std::{
  path::PathBuf,
  sync::{Arc, Mutex},
};

/// Thread safe Sqlite connection
pub type SafeConnection = Arc<Mutex<SqliteConnection>>;

/// Get the path that should be used for the database
pub fn path() -> Option<PathBuf> {
  let mut dir = config::dir()?;
  dir.push("db.sqlite3");
  Some(dir)
}
