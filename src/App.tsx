// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import { invoke } from "@tauri-apps/api/core";
import Setting from "./components/Setting";
import MusicList, { PlayingAudio } from "./components/MusicList";
import ProgressBar from "./components/ProgressBar";
import style from "./App.module.css";
import { useState } from "react";
import Msg from "./components/Msg";

function App() {
    const [playingAudio, setPlayingAudio] = useState<PlayingAudio[]>([]);

    console.log(playingAudio);

    return (
        <main className={style.mainPanel}>
            <Msg />
            <div className={style.musicPanel}>
                <Setting />
                <MusicList setPlayingAudio={setPlayingAudio} />
            </div>
            <div className={style.outputPanel}>
                <ProgressBar playingAudio={playingAudio} />
            </div>
        </main>
    );
}

export default App;
