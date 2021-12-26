//! Tauri commands
//! Any commands added should be thin wrappers around other functions
//! This makes them more easily unit testable and reusable

use crate::{
  db::SafeConnection,
  entities::{
    account::{Account, CreateAccountArgs},
    address::{Address, CreateAddressArgs},
    wallet::{CreateWalletArgs, Wallet},
  },
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

#[tauri::command]
pub fn get_wallet_password(
  wallet_id: i32,
  db_conn: tauri::State<SafeConnection>,
) -> Result<String, String> {
  let db = &*db_conn.lock().unwrap();

  Wallet::get_password(wallet_id, db)
    .map_err(|e| format!("Failed to get password for wallet (err: {})", e))
}

/// Create account command
#[tauri::command]
pub fn create_account(
  args: CreateAccountArgs,
  db_conn: tauri::State<SafeConnection>,
) -> Result<Account, String> {
  let db = &*db_conn.lock().unwrap();

  Account::create(args, db).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn find_account(id: i32, db_conn: tauri::State<SafeConnection>) -> Result<Account, String> {
  let db = &*db_conn.lock().unwrap();

  Account::find(id, db).map_err(|e| format!("Failed to find account: (id: {}, err: {})", id, e))
}

#[tauri::command]
pub fn accounts_for_wallet(
  wallet_id: i32,
  db_conn: tauri::State<SafeConnection>,
) -> Result<Vec<Account>, String> {
  let db = &*db_conn.lock().unwrap();

  Account::by_wallet_id(wallet_id, db).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn addresses_for_account(
  account_id: i32,
  db_conn: tauri::State<SafeConnection>,
) -> Result<Vec<Address>, String> {
  let db = &*db_conn.lock().unwrap();

  Address::by_account_id(account_id, db).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn create_address(
  args: CreateAddressArgs,
  db_conn: tauri::State<SafeConnection>,
) -> Result<Address, String> {
  let db = &*db_conn.lock().unwrap();

  Address::create(args, db).map_err(|e| e.to_string())
}
