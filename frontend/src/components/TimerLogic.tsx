import { useEffect } from "react";
import { useTimer } from "../context/TimerContext"

const TimerLogic = () => {
    const {isRunning,setSeconds} = useTimer();
    useEffect(()=>{
        if(!isRunning) return;
        const interval = setInterval(()=>{
            setSeconds(prev => {
                if(prev <= 1){
                    return 0;
                }
                return prev -1;
            });
        },1000)
        return ()=> clearInterval(interval);
    },[isRunning,setSeconds]);
  return null;
}

export default TimerLogic