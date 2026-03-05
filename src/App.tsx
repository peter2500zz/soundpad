// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import { invoke } from "@tauri-apps/api/core";
import Setting from "./components/Setting";
import MusicList from "./components/MusicList";
import ProgressBar from "./components/ProgressBar";
import LogOutput from "./components/LogOutput";
import style from "./App.module.css";

function App() {

    return (
        <main className={style.mainPanel}>
            <div className={style.musicPanel}>
                <Setting />
                <MusicList />
            </div>
            <div className={style.outputPanel}>
                <ProgressBar />
                <LogOutput />
            </div>
        </main>
    );
}

export default App;
