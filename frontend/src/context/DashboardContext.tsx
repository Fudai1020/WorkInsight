import { createContext, useContext, useState, type ReactNode } from "react";
type Schedule = any;
type Task = any;
type DashboardContextType = {
    todayTasks:Task[];
    todaySchedules:Schedule[];
    refreshDashboard:()=>Promise<void>;
}
export const DashboardContext = createContext<DashboardContextType | null>(null);
export const DashboardProvider = ({children}:{children:ReactNode}) =>{
    const [todayTasks,setTodayTasks] = useState([]);
    const [todaySchedules,setTodaySchedules] = useState([]);
    const refreshDashboard = async () => {
        const token = localStorage.getItem("token")
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
        if(taskRes.ok){
          const taskData = await taskRes.json();
          setTodayTasks(taskData);
        }
        if(scheduleRes.ok){
          const scheduleData = await scheduleRes.json();
          setTodaySchedules(scheduleData);
        }
      };
    return(
        <DashboardContext.Provider value={{todayTasks,todaySchedules,refreshDashboard}}>
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