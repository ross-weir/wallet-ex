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
  // Read configuration file
  // Or cli parameters

  // create db if it doesn't exist
  // run db migrations
  // connect to db, pass db into tauri state
  // could probably do this in another thread so we don't block app startup
  // probably cant do in another thread, what if user tries to do stuff while
  // we're running migrations etc?
  let db_conn = Arc::new(Mutex::new(db::init_and_connect("db.sqlite3")?));

  tauri::Builder::default()
    .manage(db_conn)
    .invoke_handler(tauri::generate_handler![
      cmd::create_wallet,
      cmd::find_wallet,
      cmd::list_wallets,
    ])
    .run(tauri::generate_context!())
    .expect("error while running application");

  Ok(())
}
