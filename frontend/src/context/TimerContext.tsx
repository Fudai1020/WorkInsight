import { createContext, useContext, useState, type ReactNode } from "react";
type TimerType = {
    seconds:number,
    setSeconds:React.Dispatch<React.SetStateAction<number>>
    isRunning:boolean;
    setIsRunning:React.Dispatch<React.SetStateAction<boolean>>;
}
const TimerContext = createContext<TimerType| null>(null);
export const TimerProvider = ({children}:{children:ReactNode}) =>{
    const [seconds,setSeconds] = useState(0);
    const [isRunning,setIsRunning] = useState(false);
    return(
        <TimerContext.Provider value={{seconds,setSeconds,isRunning,setIsRunning}}>
            {children}
        </TimerContext.Provider>
    )
}
export const useTimer = () => {
    const context = useContext(TimerContext);
    if(!context){
        throw new Error("useTimer must be used within TimerProvider");
    }
    return context;
}