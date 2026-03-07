use serde::Serialize;
use tauri::{AppHandle, Emitter};

#[derive(Serialize, Clone, Debug)]
pub enum MsgLevel {
    Note,
    Warning,
    Critical,
}

#[derive(Debug, Serialize, Clone)]
struct Msg {
    content: String,
    level: MsgLevel,
}

pub fn send_msg(app: &AppHandle, msg: &str, level: MsgLevel) {
    let msg = Msg {
        content: msg.to_string(),
        level,
    };

    println!("发送消息: {:?}", msg);

    app.emit("", msg).unwrap();
}
