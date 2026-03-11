import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { fetchWithAuth } from "../utils/FetchWithAuth";
type Schedule = any;
type Summary = {
  workMinutes:number;
  saboriMinutes:number;
  saboriRate:number;
}
type Task = any;
type DashboardContextType = {
    todayTasks:Task[];
    todaySchedules:Schedule[];
    summary:Summary|null;
    refreshDashboard:()=>Promise<void>;
}
export const DashboardContext = createContext<DashboardContextType | null>(null);
export const DashboardProvider = ({children}:{children:ReactNode}) =>{
    const {token,logout} = useAuth();
    const [todayTasks,setTodayTasks] = useState<Task[]>([]);
    const [todaySchedules,setTodaySchedules] = useState<Schedule[]>([]);
    const [summary,setSummary] = useState<Summary|null>(null);
    const refreshDashboard = useCallback(async () => {
      if(!token) return;
      try{
        const taskRes = await fetchWithAuth("/tasks?filter=dashboard",token,logout);
        const scheduleRes = await fetchWithAuth("/schedules?range=TODAY",token,logout);
        const summaryRes = await fetchWithAuth("/feedbacks",token,logout);
        const taskData = await taskRes.json();
        const scheduleData = await scheduleRes.json();
        const summaryData = await summaryRes.json();
        setTodayTasks(taskData);
        setTodaySchedules(scheduleData);
        setSummary(summaryData);
      }catch (err){
        console.error(err);
      }
    },[token,logout]);
    return(
        <DashboardContext.Provider value={{todayTasks,todaySchedules,summary,refreshDashboard}}>
            {children}
        </DashboardContext.Provider>
    )
}
export const useDashboard = () => {
    const context = useContext(DashboardContext);
    if(!context){
        throw new Error("useDashboard must be used within DashboardProvider");
    }
    return context;
}