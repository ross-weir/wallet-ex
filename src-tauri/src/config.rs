use anyhow::{anyhow, Result};
use serde::{de::DeserializeOwned, Serialize};
use std::{
  fs::{self, OpenOptions},
  io::{ErrorKind, Write},
  path::PathBuf,
};
use tauri::api::path::config_dir;

use crate::app::App;

pub struct AppConfig {
  // network testnet vs mainnet
// operation mode light vs full node vs spv
// experience level: basic vs pro
// explorer api endpoint
// node location
}

/// Returns the configuration directory for the application
/// based on the OS
pub fn dir() -> Option<PathBuf> {
  let mut base_dir = config_dir()?;
  base_dir.push(App::NAME);
  Some(base_dir)
}

/// Full path to the app config file
fn file() -> Option<PathBuf> {
  let mut dir = dir()?;
  dir.push(format!("{}.toml", App::NAME));
  Some(dir)
}

/// Save app configuration to file
pub fn store<'a, T: Serialize>(cfg: T) -> Result<()> {
  let cfg_str = toml::to_string_pretty(&cfg)?;
  let mut f = OpenOptions::new()
    .write(true)
    .create(true)
    .truncate(true)
    .open(file().ok_or(anyhow!("failed to get config file path"))?)?;
  f.write_all(cfg_str.as_bytes())?;
  Ok(())
}

/// Load app configuration from file
pub fn load<'a, T: Serialize + DeserializeOwned + Default>() -> Result<T> {
  let cfg_path = file().ok_or(anyhow!("failed to get config file path"))?;
  let cfg_str = fs::read_to_string(&cfg_path);

  match cfg_str {
    Ok(s) => Ok(toml::from_str(&s)?),
    Err(ref e) if e.kind() == ErrorKind::NotFound => {
      if let Some(parent) = cfg_path.parent() {
        fs::create_dir_all(parent)?;
      }
      let cfg = T::default();
      store(&cfg)?;
      Ok(cfg)
    }
    Err(e) => Err(e)?,
  }
}
