import {  useEffect } from "react";
import LazyData from "../components/LazyData"
import SchedulePreview from "../components/SchedulePreview"
import TaskPreview from "../components/TaskPreview"
import { useDashboard } from "../context/DashboardContext";
import { useAuth } from "../context/AuthContext";


const Dashboard = () => {
    const {todayTasks,todaySchedules,refreshDashboard} = useDashboard();
    const today = new Date();
    const dayNames = ["日","月","火","水","木","金","土"];
    const formatDate = `${today.getFullYear()}/${today.getMonth()+1}/${today.getDate()}(${dayNames[today.getDay()]})`;
    const {token} = useAuth();
    const handleToggle = async(taskId:number)=>{
      try{
        await fetch(`http://localhost:8080/api/tasks/${taskId}/status`,{
          method:"PATCH",
          headers:{
            Authorization:`Bearer ${token}`
          }
        });
        await refreshDashboard();
      }catch(err){
        console.error(err);
      }
    };
    useEffect(()=>{
      if(token){
        refreshDashboard();
      }
    },[token])
  return (
    <div className="flex flex-col gap-8 h-full">
        <span className="text-center text-4xl mt-5">{formatDate}</span>
        <div className="flex gap-10 justify-center h-full">
            <TaskPreview tasks={todayTasks} onToggle={handleToggle}/>
            <SchedulePreview schedules={todaySchedules}/>
        </div>
        <LazyData/>
    </div>
  )
}

export default Dashboard