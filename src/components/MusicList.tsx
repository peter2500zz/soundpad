import style from "./MusicList.module.css";

function MusicList() {
    return (
        <div className={style.musicList}>
            <table>
                <thead>
                    <tr>
                        <th>姓名</th>
                        <th>年龄</th>
                        <th>城市</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>朝仓彩玲</td><td>23</td><td>东京</td></tr>
                    <tr><td>小明</td><td>30</td><td>北京</td></tr>
                    <tr><td>小红</td><td>25</td><td>上海</td></tr>
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
