#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri_plugin_log::{LogTarget, LoggerBuilder};

mod cmd;
mod hash;
mod net;

fn main() -> anyhow::Result<()> {
  let ctx = tauri::generate_context!();

  let mut log_targets = vec![LogTarget::LogDir, LogTarget::Stdout];

  // Only log to webiew console if debug build
  if cfg!(debug_assertions) {
    log_targets.push(LogTarget::Webview);
  }

  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
      cmd::download_file,
      cmd::get_free_port,
      cmd::digest_file,
      cmd::path_exists,
    ])
    .plugin(LoggerBuilder::new().targets(log_targets).build())
    .run(ctx)
    .expect("error while running application");

  Ok(())
}
