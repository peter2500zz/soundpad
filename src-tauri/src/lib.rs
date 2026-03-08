mod msg_sender;
mod file;

use tauri::AppHandle;

// use crate::file::get_audio;

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn send_test_msg(app: AppHandle, msg: &str) {
    msg_sender::send_msg(&app, msg, msg_sender::MsgLevel::Note);
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet])
        .invoke_handler(tauri::generate_handler![send_test_msg])
        .invoke_handler(tauri::generate_handler![file::get_audio])
        .setup(|app| {
            let app_handle = AppHandle::clone(app.handle());

            file::watcher::watch(app_handle)?;

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
