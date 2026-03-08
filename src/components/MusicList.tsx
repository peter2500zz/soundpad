import { convertFileSrc, invoke } from "@tauri-apps/api/core";
import style from "./MusicList.module.css";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { listen } from "@tauri-apps/api/event";


type Audio = {
    name: string;
    path: string;
    duration: number;
}

type PlayingAudio = {
    audio: HTMLAudioElement;
    uuid: string;
}

function MusicList(
    {
        setPlayingAudio
    }: {
        setPlayingAudio: Dispatch<SetStateAction<PlayingAudio[]>>
    }
) {
    const [audioList, setAudioList] = useState<Audio[]>([]);

    const fetchAudioList = async () => {
        const audioData = await invoke<Audio[]>("get_audio");
        setAudioList(audioData);
    };

    useEffect(() => {
        fetchAudioList();

        const unlisten = listen('soundpad-folder-modified', () => {
            fetchAudioList();
        });

        return () => {
            unlisten.then(f => f());
        };
    }, []);

    return (
        <div className={style.musicList}>
            <table>
                <thead>
                    <tr>
                        <th>名称</th>
                        <th>时长</th>
                        <th>路径</th>
                    </tr>
                </thead>
                <tbody>
                    {audioList.map((audio) => (
                        <tr key={audio.path} onClick={() => {
                            console.time("myFunctionTime");

                            const fileUrl = convertFileSrc(audio.path);
                            const file = new Audio(fileUrl);
                            const uuid = crypto.randomUUID();

                            file.onerror = () => {
                                console.error("audio not found:", fileUrl);
                            };

                            file.onended = () => {
                                setPlayingAudio((prev) => prev.filter((audio) => audio.uuid !== uuid));
                            };

                            file.oncanplaythrough = () => {
                                setPlayingAudio((prev) => [...prev, { audio: file, uuid }]);
                                file.play();
                            };

                            console.timeEnd("myFunctionTime");
                        }}>
                            <td>{audio.name}</td>
                            <td>{audio.duration.toFixed(2) + 's'}</td>
                            <td>{audio.path}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
} 

export default MusicList;
export type { PlayingAudio };
