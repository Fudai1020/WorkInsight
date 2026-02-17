import { useEffect, useState } from "react";
import LazyData from "../components/LazyData"
import SchedulePreview from "../components/SchedulePreview"
import TaskPreview from "../components/TaskPreview"


const Dashboard = () => {
    const today = new Date();
    const dayNames = ["日","月","火","水","木","金","土"];
    const formatDate = `${today.getFullYear()}/${today.getMonth()+1}/${today.getDate()}(${dayNames[today.getDay()]})`;
    const [todayTasks,setTodayTasks] = useState([]);
    const [todaySchedules,setTodaySchedules] = useState([]);
    useEffect(() => {
      const fetchTodayData = async () => {
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
      fetchTodayData();
    },[]);
  return (
    <div className="flex flex-col gap-8 h-full">
        <span className="text-center text-4xl mt-5">{formatDate}</span>
        <div className="flex gap-10 justify-center h-full">
            <TaskPreview tasks={todayTasks}/>
            <SchedulePreview schedules={todaySchedules}/>
        </div>
        <LazyData/>
    </div>
  )
}

export default Dashboard