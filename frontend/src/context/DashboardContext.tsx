import { createContext, useContext, useState, type ReactNode } from "react";
import { useAuth } from "./AuthContext";
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
    const {token} = useAuth();
    const [todayTasks,setTodayTasks] = useState([]);
    const [todaySchedules,setTodaySchedules] = useState([]);
    const [summary,setSummary] = useState(null);
    const refreshDashboard = async () => {
      if(!token) return;
      try{
        const taskRes = await fetch("http://localhost:8080/api/tasks?filter=dashboard",{
          headers:{
            Authorization:`Bearer ${token}`
          }
        });
        const scheduleRes = await fetch("http://localhost:8080/api/schedules?range=TODAY",{
          headers:{
            Authorization:`Bearer ${token}`
          }
        });
        const summaryRes = await fetch("http://localhost:8080/api/feedbacks",{
          headers:{
            Authorization:`Bearer ${token}`,
          }
        });
        if(taskRes.ok){
          const taskData = await taskRes.json();
          setTodayTasks(taskData);
        }
        if(scheduleRes.ok){
          const scheduleData = await scheduleRes.json();
          setTodaySchedules(scheduleData);
        }
        if(summaryRes.ok){
          const summaryData = await summaryRes.json();
          setSummary(summaryData);
        }
      }catch (err){
        console.error(err);
      }
    };
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