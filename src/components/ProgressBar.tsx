import { useEffect, useState } from "react";
import style from "./ProgressBar.module.css";

function formatDuration(totalSeconds: number): string {
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor((totalSeconds / 60) % 60);
    const hours = Math.floor(totalSeconds / 3600);

    const mm = String(minutes).padStart(2, "0");
    const ss = String(seconds).padStart(2, "0");

    if (hours > 0) {
        return `${hours}:${mm}:${ss}`;
    }

    return `${mm}:${ss}`;
}

function ProgressBar({ playingAudio }: { playingAudio: HTMLAudioElement[] }) {
    return (
        <div className={style.progressBarArea}>
            {playingAudio.map((audio) => (
                <AudioProgress key={audio.src} audio={audio} />
            ))}
        </div>
    )
}

function AudioProgress({ audio }: { audio: HTMLAudioElement }) {
    const [progress, setProgress] = useState(0);

    // react 无法感知到 audio.currentTime 的变化
    // useEffect 充当了桥梁，将不可感知的 audio.currentTime 变化映射到可感知的 progress 变化上
    useEffect(() => {
        let rafId: number;

        // 定义了一个每帧都会被调用的函数，每帧由requestAnimationFrame决定
        // 在下一帧前都会等待，同时react能通过里面的setProg读取到数据改变dom
        const update = () => {
            if (audio.duration) {
                setProgress((audio.currentTime / audio.duration) * 100);
            }

            // 登记下一帧触发此函数
            rafId = requestAnimationFrame(update);
        };

        // 初次登记
        rafId = requestAnimationFrame(update);

        // 返回闭包，在 audio 改变时取消之前的登记，重新登记
        return () => cancelAnimationFrame(rafId);
    }, [audio]);  // 标记依赖 audio 

    return (
        <div className={style.progressBar}>
            <label htmlFor={`prog-${audio.src}`}>播放进度</label>
            <progress id={`prog-${audio.src}`} value={progress} max="100"></progress>
            <span>{formatDuration(audio.currentTime)} / {formatDuration(audio.duration || 0)}</span>
        </div>
    );
}

export default ProgressBar;
