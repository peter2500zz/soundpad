pub mod watcher;

use std::fs;

use serde::Serialize;
use symphonia::core::{formats::FormatOptions, io::MediaSourceStream, meta::MetadataOptions, probe::Hint};
use tauri::Runtime;
use walkdir::{DirEntry, WalkDir};
use anyhow::{Result, anyhow};

static MUSIC_FOLDER: &'static str = "soundpad";

#[derive(Serialize, Clone, Debug)]
pub struct Audio {
    name: String,
    path: String,
    duration: f64,
}

#[tauri::command]
pub async fn get_audio<R: Runtime>(
    _: tauri::AppHandle<R>,
    _: tauri::Window<R>,
) -> Result<Vec<Audio>, String> {
    let mut audio_list = Vec::new();

    for entry in WalkDir::new(MUSIC_FOLDER).max_depth(255) {
        if let Ok(entry) = entry {
            if entry.file_type().is_file() {
                let path = entry.path().to_string_lossy().to_string();
                println!("Found file: {}", path);


                match process_audio(entry) {
                    Ok(audio) => audio_list.push(audio),
                    Err(e) => println!("Error processing file {}: {}", path, e),
                }
            }
        } else {
            println!("Error reading entry: {:?}", entry);
        }
    }

    Ok(audio_list)
}

fn process_audio(entry: DirEntry) -> Result<Audio> {
    let file = fs::File::open(entry.path())?;

    let mss = MediaSourceStream::new(Box::new(file), Default::default());

    // 提示探针文件格式（通过扩展名猜）
    let mut hint = Hint::new();
    if let Some(ext) = entry.path().extension().and_then(|e| e.to_str()) {
        hint.with_extension(ext);
    }

    // 自动探测文件格式（mp3 / flac / ogg 等）
    let probed = symphonia::default::get_probe().format(
        &hint,
        mss,
        &FormatOptions::default(),
        &MetadataOptions::default(),
    )?;

    // 取默认音轨（一般音频文件只有一条）
    let track = probed
        .format
        .default_track()
        .ok_or(anyhow!("找不到音轨"))?;

    let params = &track.codec_params;

    // time_base 是时间单位（类似分母），n_frames 是总帧数
    // duration(秒) = n_frames * time_base(秒/帧)
    let time_base = params.time_base.ok_or(anyhow!("缺少 time_base"))?;
    let n_frames  = params.n_frames.ok_or(anyhow!("缺少 n_frames"))?;

    // 转成人类可读的 Time { seconds, frac }
    let time = time_base.calc_time(n_frames);


    Ok(Audio {
        name: entry.file_name().to_string_lossy().to_string(),
        path: entry.path().to_string_lossy().to_string(),
        duration: time.seconds as f64 + time.frac,
    })
}
