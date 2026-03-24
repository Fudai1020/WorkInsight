import {  useEffect } from "react";
import LazyData from "../components/LazyData"
import SchedulePreview from "../components/SchedulePreview"
import TaskPreview from "../components/TaskPreview"
import { useDashboard } from "../context/DashboardContext";
import { useAuth } from "../context/AuthContext";
import { fetchWithAuth } from "../utils/FetchWithAuth";
const Dashboard = () => {
    const {todayTasks,todaySchedules,refreshDashboard} = useDashboard();
    const today = new Date();
    const dayNames = ["日","月","火","水","木","金","土"];
    const formatDate = `${today.getFullYear()}/${today.getMonth()+1}/${today.getDate()}(${dayNames[today.getDay()]})`;
    const {token,logout} = useAuth();
    const handleToggle = async(taskId:number)=>{
      if(!token) return;
      try{
        await fetchWithAuth(`/tasks/${taskId}/status`,token,logout,{
          method:"PATCH"});
        await refreshDashboard();
      }catch(err){
        console.error(err);
      }
    };
    useEffect(()=>{
      if(token){
        refreshDashboard();
      }
    },[token,refreshDashboard]);
  return (
    <div className="flex flex-col gap-8 h-full">
        <span className="text-center text-3xl sm:text-4xl font-bold mt-5">{formatDate}</span>
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 justify-center h-full">
            <TaskPreview tasks={todayTasks} onToggle={handleToggle}/>
            <SchedulePreview schedules={todaySchedules}/>
        </div>
        <LazyData />
    </div>
  )
}

export default Dashboard