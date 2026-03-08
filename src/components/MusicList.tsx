import { convertFileSrc, invoke } from "@tauri-apps/api/core";
import style from "./MusicList.module.css";


type Audio = {
    path: string;
    duration: number;
}

function MusicList(
    { 
        setPlayingAudio 
    }: { 
        setPlayingAudio: React.Dispatch<React.SetStateAction<Array<HTMLAudioElement>>> 
    }
) {
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
                    <tr onClick={() => {
                        console.time("myFunctionTime");

                        const fileUrl = convertFileSrc("soundpad/ge2ebar.mp3");
                        const file = new Audio(fileUrl);

                        file.onerror = () => {
                            console.error("audio not found:", fileUrl);
                        };

                        file.onended = () => {
                            setPlayingAudio((prev) => prev.filter((audio) => audio !== file));
                        };

                        file.oncanplaythrough = () => {
                            setPlayingAudio((prev) => [...prev, file]);
                            file.play();
                        };

                        console.timeEnd("myFunctionTime");

                    }}><td>朝仓彩玲</td><td>23</td><td>东京</td></tr>
                    <tr onClick={
                        () => {
                            invoke("send_test_msg", { msg: "soundpad/ge2ebar.mp3" })
                        }
                    }><td>小明</td><td>30</td><td>北京</td></tr>
                    <tr onClick={() => {
                        console.log(invoke<Audio[]>("get_audio"));
                    }}><td>小红</td><td>25</td><td>上海</td></tr>
                    <tr><td>小刚</td><td>28</td><td>广州</td></tr>
                    <tr><td>小李</td><td>22</td><td>深圳</td></tr>
                    <tr><td>小王</td><td>26</td><td>杭州</td></tr>
                    <tr><td>小张</td><td>29</td><td>成都</td></tr>
                    <tr><td>小赵</td><td>24</td><td>西安</td></tr>
                    <tr><td>小陈</td><td>27</td><td>武汉</td></tr>
                    <tr><td>小周</td><td>31</td><td>南京</td></tr>
                    <tr><td>小吴</td><td>25</td><td>苏州</td></tr>
                    <tr><td>小徐</td><td>28</td><td>天津</td></tr>
                    <tr><td>小孙</td><td>23</td><td>重庆</td></tr>
                    <tr><td>小郑</td><td>30</td><td>福州</td></tr>
                    <tr><td>小何</td><td>26</td><td>厦门</td></tr>
                    <tr><td>小吕</td><td>29</td><td>青岛</td></tr>
                    <tr><td>小高</td><td>27</td><td>宁波</td></tr>
                    <tr><td>小唐</td><td>32</td><td>郑州</td></tr>
                    <tr><td>小曾</td><td>24</td><td>长沙</td></tr>
                    <tr><td>小韦</td><td>28</td><td>沈阳</td></tr>
                </tbody>
            </table>
        </div>
    );
}

export default MusicList;
