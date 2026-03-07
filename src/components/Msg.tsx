import { useEffect, useState } from "react";
import style from "./Msg.module.css";
import { listen } from '@tauri-apps/api/event';

enum MsgLevel {
    Note,
    Warning,
    Critical,
}

type Msg = {
    content: string;
    level: MsgLevel;
};


function Msg() {
    const [msgList, setMsgList] = useState<Msg[]>([]);

    useEffect(() => {
        const unlisten = listen<Msg>('global-msg', (event) => {
            setMsgList(prev => [
                ...prev,
                { ...event.payload }
            ]);
        });

        // 等待异步监听器注册完成后返回一个函数，用于取消监听
        return () => {
            unlisten.then(f => f());
        };
    }, [])

    return (
        <>
            {msgList.map((msg, index) => (
                <div className={style.MsgBackground}>
                    <div className={style.MsgBox}>
                        <div className={style.MsgContent}>
                            {msg.content}
                        </div>
                        <div className={style.MsgBtnBox}>
                            <button className={style.MsgBtn} onClick={() => {
                                setMsgList(prev => prev.filter((_, i) => i !== index));
                            }}>
                                知道了
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default Msg;
