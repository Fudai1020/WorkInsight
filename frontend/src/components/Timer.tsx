import { useEffect, useState } from "react"

const Timer = () => {
    const InitialSecond = 3600;
    const [seconds,setSeconds] = useState(InitialSecond);
    const [isRunning,setIsRunning] = useState(false);
    useEffect(()=>{
        if(!isRunning) return;
        const interval = setInterval(()=>{
            setSeconds(prev => {
                if(prev < 1 ){
                    clearInterval(interval);
                    setIsRunning(false);
                    return 0;
                }
                return prev -1 ;
            });
        },1000);
        return () => clearInterval(interval);
    },[isRunning])
    const formatTime = (totalSecond:number) => {
        const hours = Math.floor(totalSecond / 3600);
        const minutes = Math.floor((totalSecond%3600)/60);
        const seconds = totalSecond % 60;
        return `${hours.toString().padStart(2,"0")}：${minutes.toString().padStart(2,"0")}：${seconds.toString().padStart(2,"0")}`;
    }
  return (
    <div>
        <div className="flex flex-col items-center gap-10">
            <h1 className="text-3xl">タイマー</h1>
            <span className="text-3xl  font-mono">{formatTime(seconds)}</span>
            <div className="flex gap-20">
            <button onClick={()=>setSeconds(InitialSecond)} className="text-base bg-[#D9D9D9] p-3 rounded-lg">リセット</button>
            <button onClick={()=>setIsRunning(prev => !prev)}
                    className={`text-base ${isRunning ? "bg-[#48494B]" : "bg-[#FF9500]"} text-white p-3 rounded-lg`}>
                {isRunning ? '停止':'開始'}
            </button>
            </div>
        </div>
    </div>
  )
}

export default Timer