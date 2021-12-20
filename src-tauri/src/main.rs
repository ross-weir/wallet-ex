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
use tauri::Manager;

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

  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
      cmd::create_wallet,
      cmd::find_wallet,
      cmd::list_wallets,
      cmd::create_account,
      cmd::addresses_for_account,
      cmd::create_address,
    ])
    // TODO: YOLO unwraps for now
    .setup(|app| {
      let cfg = app.config();
      // dunno when this could fail, just unwrap for now
      let cfg_path = tauri::api::path::app_dir(&cfg).unwrap();

      // Setup the DB in here so we have access to the app directory (app.config())
      // can probably do this in another thread but will need to sync frontend with loading screen
      // So users can't do anything that will require the database
      // So the db connection passed as tauri state will likely need to be optional
      let db_path = db::get_and_ensure_path(cfg_path).unwrap();
      let conn = SqliteConnection::establish(&db_path.to_string_lossy()).unwrap();
      embedded_migrations::run(&conn).unwrap();
      let safe_db = Arc::new(Mutex::new(conn));

      app.manage(safe_db);

      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running application");

  Ok(())
}
