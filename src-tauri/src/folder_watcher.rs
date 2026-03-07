use notify::{RecommendedWatcher, RecursiveMode, Result, Watcher};
use std::{path::{Path, PathBuf}, sync::LazyLock};

static MUSIC_FOLDER: &'static str = "soundpad";

#[test]
fn watch() -> Result<()> {
    let (tx, rx) = std::sync::mpsc::channel();

    let mut watcher = RecommendedWatcher::new(tx, Default::default())?;
    watcher.watch(Path::new(MUSIC_FOLDER), RecursiveMode::Recursive)?;

    for res in rx {
        match res {
            Ok(event) => println!("事件: {:?}", event),
            Err(e) => println!("错误: {:?}", e),
        }
    }

    unreachable!();
}
