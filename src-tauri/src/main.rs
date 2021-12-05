#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

#[macro_use]
extern crate diesel;

use std::sync::{Arc, Mutex};

mod cmd;
mod db;
mod entities;
mod schema;

fn main() -> anyhow::Result<()> {
  // create db if it doesn't exist
  // run db migrations
  // connect to db, pass db into tauri state
  // could probably do this in another thread so we don't block app startup
  let db_conn = Arc::new(Mutex::new(db::connect()?));

  tauri::Builder::default()
    .manage(db_conn)
    .invoke_handler(tauri::generate_handler![
      cmd::create_wallet,
      cmd::get_wallet
    ])
    .run(tauri::generate_context!())
    .expect("error while running application");

  Ok(())
}
