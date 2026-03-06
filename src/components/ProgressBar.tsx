import style from "./ProgressBar.module.css";

function ProgressBar() {
    return (
        <div className={style.progressBarArea}>
            <div className={style.progressBar}>
                <label htmlFor="prog">下载进度</label>
                <progress id="prog" value="50" max="100"></progress>
                <span>50%</span>
            </div>
            <div className={style.progressBar}>
                <label htmlFor="prog">下载进度</label>
                <progress id="prog" value="50" max="100"></progress>
                <span>50%</span>
            </div>
            <div className={style.progressBar}>
                <label htmlFor="prog">下载进度</label>
                <progress id="prog" value="50" max="100"></progress>
                <span>50%</span>
            </div>
            <div className={style.progressBar}>
                <label htmlFor="prog">下载进度</label>
                <progress id="prog" value="50" max="100"></progress>
                <span>50%</span>
            </div>
            <div className={style.progressBar}>
                <label htmlFor="prog">下载进度</label>
                <progress id="prog" value="50" max="100"></progress>
                <span>50%</span>
            </div>
            <div className={style.progressBar}>
                <label htmlFor="prog">下载进度</label>
                <progress id="prog" value="50" max="100"></progress>
                <span>50%</span>
            </div>
            <div className={style.progressBar}>
                <label htmlFor="prog">下载进度</label>
                <progress id="prog" value="50" max="100"></progress>
                <span>50%</span>
            </div>
            <div className={style.progressBar}>
                <label htmlFor="prog">下载进度</label>
                <progress id="prog" value="50" max="100"></progress>
                <span>50%</span>
            </div>
            
        </div>
    )
}

export default ProgressBar;
