//! Tauri commands
//! Any commands added should be thin wrappers around other functions
//! This makes them more easily unit testable and reusable

use crate::{hash, net::pick_unused_port};
use std::string::ToString;

#[tauri::command]
pub async fn download_file(url: String, out_path: String) -> Result<(), String> {
  let response = reqwest::get(url).await.map_err(|e| e.to_string())?;
  let mut out_file = std::fs::File::create(out_path).map_err(|e| e.to_string())?;
  let contents = response.bytes().await.map_err(|e| e.to_string())?;
  let mut bytes = std::io::Cursor::new(contents);

  std::io::copy(&mut bytes, &mut out_file).unwrap();

  Ok(())
}

#[tauri::command]
pub async fn digest_file(file_path: String) -> Result<String, String> {
  hash::digest_file(file_path).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn path_exists(path: String) -> bool {
  std::path::Path::new(&path).exists()
}

#[tauri::command]
pub fn get_free_port() -> Result<u16, String> {
  pick_unused_port().ok_or("failed to find free port".to_string())
}
