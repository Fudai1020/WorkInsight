import { useEffect, useRef} from "react"
import { useModal } from "../context/ModalContext";
import { useSettings } from "../context/SettingContext";
import { useTimer } from "../context/TimerContext";
const Days = ["SUNDAY","MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY"] as const;

const Timer = () => {
    const {openModal,modalType} = useModal();
    const {seconds,setSeconds,isRunning,setIsRunning} = useTimer();
    const {settings} = useSettings();
    const initialSecond = (settings?.breakMinutes ?? 0)*60;
    const prevModalType = useRef(modalType);
    //ユーザ設定変更時のタイマーリセット
    useEffect(()=>{
        if(!settings) return;
        setSeconds(prev => {
            if(prev === 0){
                return settings.breakMinutes*60;
            }
            return prev;
        });
    },[settings,setSeconds]);
    //タイマーが0になった際にモーダルを開く
    useEffect(()=>{
        if(seconds === 0 && isRunning){
            setIsRunning(false);
            openModal("feedback");
        }
    },[seconds,openModal,isRunning]);
    //フィードバック送信完了orモーダルとじた時のタイマーリセット
    useEffect(()=>{
        if(!settings) return;
        const wasFeedbackOpen = prevModalType.current === "feedback";
        const isNowClosed = modalType === "";
        if(wasFeedbackOpen && isNowClosed && seconds <= 0){
            setSeconds(settings.breakMinutes * 60);
            if(checkWorkTime()){
                setIsRunning(true);
            }else{
                setIsRunning(false);
            }
        }
        prevModalType.current = modalType;
    },[modalType,seconds,settings,setSeconds,setIsRunning]);
    //ユーザ設定の時間からタイマーを動かす
    useEffect(()=>{
        if(!settings) return;
        const interval = setInterval(()=>{
            if(checkWorkTime()){
                setIsRunning(true);
            }
        },60000);
        return () => clearInterval(interval);
    },[settings])
    const checkWorkTime = () =>{
        if(!settings) return false;
        const now = new Date();
        const current = now.getHours()*60 + now.getMinutes();
        const today = Days[now.getDay()];
        const isWorkDay = !settings.settingWeek || settings.settingWeek.includes(today);
        const [startH,startM] = settings.workStartTime.split(':').map(Number);
        const [endH,endM] = settings.workEndTime.split(':').map(Number);
        const [restStartH,restStartM] = settings.restStartTime.split(':').map(Number);
        const [restEndH,restEndM] = settings.restEndTime.split(':').map(Number);
        const start = startH*60+startM;
        const end = endH*60+ endM;
        const restStart = restStartH*60+restStartM;
        const restEnd = restEndH*60+restEndM;
        return(
            isWorkDay && current >= start && current < end &&
            (current >= restStart && current < restEnd)
        );
    }
    //タイマーフォーマットの修正
    const formatTime = (totalSecond:number) => {
        const safe = Math.max(totalSecond,0);
        const hours = Math.floor(safe / 3600);
        const minutes = Math.floor((safe%3600)/60);
        const seconds = safe % 60;
        return `${hours.toString().padStart(2,"0")}：${minutes.toString().padStart(2,"0")}：${seconds.toString().padStart(2,"0")}`;
    }
  return (
    <div>
        <div className="flex flex-col items-center gap-10">
            <h1 className="text-3xl">タイマー</h1>
            <span className="text-3xl  font-mono">{formatTime(seconds)}</span>
            <div className="flex gap-20">
            <button onClick={()=>setSeconds(initialSecond)} className="text-base bg-[#D9D9D9] p-3 rounded-lg">リセット</button>
            <button onClick={()=>setIsRunning(prev => !prev)}
                    className={`text-base ${isRunning ? "bg-[#48494B]" : "bg-[#FF9500]"} text-white p-3 rounded-lg`}>
                {isRunning ? '停止':'開始'}
            </button>
            </div>
            <button onClick={()=> openModal("feedback")}
                    className="underline">
                フィードバック
            </button>
        </div>
    </div>
  )
}

export default Timer