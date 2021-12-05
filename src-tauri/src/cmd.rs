//! Tauri commands

use crate::{
  db::SafeConnection,
  entities::wallet::{CreateWalletArgs, Wallet},
};
// use anyhow::Result;
use diesel::{dsl::sql, insert_into, prelude::*};

/// Create wallet command
#[tauri::command]
pub fn create_wallet(
  args: CreateWalletArgs,
  db_conn: tauri::State<SafeConnection>,
) -> Result<Wallet, String> {
  let db = &*db_conn.lock().unwrap();

  Wallet::create(args, db)
}

/// Get wallet command
#[tauri::command]
pub fn get_wallet(
  args: CreateWalletArgs,
  db_conn: tauri::State<SafeConnection>,
) -> Result<Wallet, String> {
  let db = &*db_conn.lock().unwrap();

  Wallet::find(db)
}
