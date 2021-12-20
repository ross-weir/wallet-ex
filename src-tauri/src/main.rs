#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

#[macro_use]
extern crate diesel;
#[macro_use]
extern crate diesel_migrations;

use anyhow::anyhow;
use diesel::{Connection, SqliteConnection};
use std::{
  fs,
  sync::{Arc, Mutex},
};

mod app;
mod cmd;
mod config;
mod db;
mod entities;
mod schema;

embed_migrations!();

fn main() -> anyhow::Result<()> {
  // Read configuration file
  // Or cli parameters

  // can probably do this in another thread but will need to sync frontend with loading screen
  // So users can't do anything that will require the database
  // So the db connection passed as tauri state will likely need to be optional
  let db_path = db::path().ok_or(anyhow!("Couldn't find path for database"))?;
  if !db_path.exists() {
    fs::create_dir_all(
      db_path
        .parent()
        .ok_or(anyhow!("couldn't get db directory"))?,
    )?;
  }
  let conn = SqliteConnection::establish(&db_path.to_string_lossy())?;
  embedded_migrations::run(&conn)?;
  let safe_db = Arc::new(Mutex::new(conn));

  tauri::Builder::default()
    .manage(safe_db)
    .invoke_handler(tauri::generate_handler![
      cmd::create_wallet,
      cmd::find_wallet,
      cmd::list_wallets,
      cmd::create_account,
      cmd::addresses_for_account,
      cmd::create_address,
    ])
    .run(tauri::generate_context!())
    .expect("error while running application");

  Ok(())
}
