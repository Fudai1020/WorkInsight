import { createContext, useContext, useEffect, useState, type ReactNode, } from "react";
import { useAuth } from "./AuthContext";
export const WEEK_DAYS = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
] as const;
export type WeekDay = typeof WEEK_DAYS[number];
type Settings = {
    workStartTime:string;
    workEndTime:string;
    restStartTime:string;
    restEndTime:string;
    breakMinutes:number;
    settingWeek:WeekDay[]|null;
}
type SettingType = {
    settings:Settings | null;
    loading:boolean;
    refreshSetting:()=>Promise<void>;
}
type Props = {
    children:ReactNode;
}
export const SettingContext = createContext<SettingType | null>(null);
export const SettingProvider = ({children}:Props) =>{
    const [settings,setSettings] = useState<Settings | null>(null);
    const [loading,setLoading] = useState(true);
    const {token} = useAuth();
    const fetchUserData = async() =>{
        try{
            const response = await fetch("http://localhost:8080/api/settings",{
                headers:{
                    Authorization:`Bearer ${token}`,
                }
            });
            if(!response.ok) throw new Error('faild to fetch');
            const data = await response.json();
            setSettings(data);
        }catch(err){
            console.error(err); 
        }finally{
            setLoading(false);
        }
    };
    useEffect(()=>{
        if(token){
            fetchUserData();
        }
    },[token]);

    return(
        <SettingContext.Provider value={{settings,loading,refreshSetting:fetchUserData}}>
            {children}
        </SettingContext.Provider>
    )
}
export const useSettings = () => {
    const context = useContext(SettingContext);
    if(!context){
        throw new Error("useSettings must be used within SettingContestProvider");
    }
    return context;
}