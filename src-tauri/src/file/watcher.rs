use notify::{RecommendedWatcher, RecursiveMode, Result, Watcher};
use std::{
    path::Path,
    sync::{self},
    thread,
};
use tauri::{AppHandle, Emitter};

use crate::file::MUSIC_FOLDER;

pub fn watch(app: AppHandle) -> Result<()> {
    let (tx, rx) = sync::mpsc::channel();

    let mut watcher = RecommendedWatcher::new(tx, Default::default())?;
    watcher.watch(Path::new(MUSIC_FOLDER), RecursiveMode::Recursive)?;

    thread::spawn(move || {
        let _2 = watcher;
        for res in rx {
            match res {
                Ok(event) => {
                    println!("事件: {:?}", event);
                    let _ = app.emit("soundpad-folder-modified", ());
                }
                Err(e) => println!("错误: {:?}", e),
            }
        }
    });

    Ok(())
}
