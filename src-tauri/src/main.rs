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

  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
      cmd::download_file,
      cmd::get_free_port,
      cmd::digest_file,
      cmd::path_exists,
    ])
    .plugin(
      LoggerBuilder::new()
        .targets([LogTarget::LogDir, LogTarget::Stdout, LogTarget::Webview])
        .build(),
    )
    .run(ctx)
    .expect("error while running application");

  Ok(())
}
