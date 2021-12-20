//! Database functionality

use anyhow::{anyhow, Result};
use diesel::SqliteConnection;
use std::{
  fs,
  path::PathBuf,
  sync::{Arc, Mutex},
};

/// Thread safe Sqlite connection
pub type SafeConnection = Arc<Mutex<SqliteConnection>>;

/// Get the path that should be used for the database
pub fn path(mut app_path: PathBuf) -> PathBuf {
  app_path.push("db.sqlite3");
  app_path
}

/// Returns the db path and creates any missing directories
pub fn get_and_ensure_path(app_path: PathBuf) -> Result<PathBuf> {
  let db_path = path(app_path);
  if !db_path.exists() {
    fs::create_dir_all(
      db_path
        .parent()
        .ok_or(anyhow!("couldn't get db directory"))?,
    )?;
  }

  Ok(db_path)
}
