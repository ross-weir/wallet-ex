#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

#[macro_use]
extern crate diesel;
#[macro_use]
extern crate diesel_migrations;

use diesel::{Connection, SqliteConnection};
use std::{
  env,
  path::PathBuf,
  sync::{Arc, Mutex},
};
use tauri::api::cli::get_matches;

mod cmd;
mod db;
mod entities;
mod hash;
mod net;
mod schema;
mod seed;

embed_migrations!();

fn main() -> anyhow::Result<()> {
  // Read configuration file
  // Or cli parameters
  let ctx = tauri::generate_context!();
  let cfg = ctx.config();
  // dunno when this could fail, just unwrap for now
  let cfg_path = tauri::api::path::app_dir(&cfg).unwrap();

  // can probably do this in another thread but will need to sync frontend with loading screen
  // so users can't do anything that will require the database, db connection in tauri state will become optional
  // At the moment it blocks the UI, the user just sees a blank window
  // So the db connection passed as tauri state will likely need to be optional
  let db_path: PathBuf = match env::var("WALLET_X_DB_URL") {
    Ok(path) => path.into(),
    Err(_) => db::get_and_ensure_path(cfg_path).unwrap(),
  };

  let conn = SqliteConnection::establish(&db_path.to_string_lossy()).unwrap();
  embedded_migrations::run(&conn).unwrap();

  // Handle CLI args
  if let Ok(matches) = get_matches(&cfg.tauri.cli.clone().unwrap()) {
    // Load json file at path "seed_db" into the database
    if let Some(seed_db) = matches.args.get("seed_db") {
      if let Some(seed_path) = seed_db.value.as_str() {
        seed::insert_data(&conn, seed_path.to_string())?;
      }
    }
  }

  let safe_db = Arc::new(Mutex::new(conn));

  tauri::Builder::default()
    .manage(safe_db)
    .invoke_handler(tauri::generate_handler![
      cmd::create_wallet,
      cmd::find_wallet,
      cmd::list_wallets,
      cmd::get_wallet_password,
      cmd::create_account,
      cmd::find_account,
      cmd::accounts_for_wallet,
      cmd::addresses_for_account,
      cmd::create_address,
      cmd::download_file,
      cmd::get_free_port,
      cmd::digest_file,
      cmd::path_exists,
    ])
    .run(ctx)
    .expect("error while running application");

  Ok(())
}
