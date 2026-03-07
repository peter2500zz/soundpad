// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import { invoke } from "@tauri-apps/api/core";
import Setting from "./components/Setting";
import MusicList from "./components/MusicList";
import ProgressBar from "./components/ProgressBar";
import style from "./App.module.css";
import { useState } from "react";

function App() {
    const [playing_audio, set_playing_audio] = useState<HTMLAudioElement[]>([]);

    console.log(playing_audio);

    return (
        <main className={style.mainPanel}>
            <div className={style.musicPanel}>
                <Setting />
                <MusicList set_playing_audio={set_playing_audio} />
            </div>
            <div className={style.outputPanel}>
                <ProgressBar playing_audio={playing_audio} />
            </div>
        </main>
    );
}

export default App;
