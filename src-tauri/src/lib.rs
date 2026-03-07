mod folder_watcher;
mod msg_sender;

use std::thread;

use tauri::AppHandle;

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

        .setup(|app| {
            let app_handle = AppHandle::clone(app.handle());

            thread::spawn(move || {

            });

            Ok(())
        })

        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
