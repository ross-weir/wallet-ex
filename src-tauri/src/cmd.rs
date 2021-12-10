//! Tauri commands
//! Any commands added should be thin wrappers around other functions
//! This makes them more easily unit testable

use crate::{
  db::SafeConnection,
  entities::wallet::{CreateWalletArgs, Wallet},
};
use std::string::ToString;

/// Create wallet command
#[tauri::command]
pub fn create_wallet(
  args: CreateWalletArgs,
  db_conn: tauri::State<SafeConnection>,
) -> Result<Wallet, String> {
  let db = &*db_conn.lock().unwrap();

  Wallet::create(args, db).map_err(|e| e.to_string())
}

/// Get wallet command
#[tauri::command]
pub fn find_wallet(id: i32, db_conn: tauri::State<SafeConnection>) -> Result<Wallet, String> {
  let db = &*db_conn.lock().unwrap();

  Wallet::find(id, db).map_err(|e| format!("Failed to find wallet (id: {}, err: {})", id, e))
}

/// List wallets command
#[tauri::command]
pub fn list_wallets(db_conn: tauri::State<SafeConnection>) -> Result<Vec<Wallet>, String> {
  let db = &*db_conn.lock().unwrap();

  Wallet::list(db).map_err(|e| format!("Failed to get list of wallets (err: {})", e))
}