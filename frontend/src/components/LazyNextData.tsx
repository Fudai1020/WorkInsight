import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext"
import type { Task } from "../pages/TodoList";

const LazyNextData = () => {
  const {token} = useAuth();
  const [tomorrowData,setTomorrowData] = useState<Task[]>([]);
  const fetchComingData = async() =>{
    if(!token) return;
    try{
      const response = await fetch("http://localhost:8080/api/tasks/tomorrow",{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
      if(response.ok){
        const data = await response.json();
        setTomorrowData(data);
      }
    }catch(err){
      console.error(err);
    }
  };
  useEffect(()=>{
    fetchComingData();
  },[token]);
  return (
    <div className="flex flex-col items-center gap-5 pb-3">
      <h1 className="text-xl sm:text-2xl mt-5">期限の近いタスク</h1>
      {tomorrowData.length === 0 ? (
        <p>明日期限のタスクはありません</p>
      ):(
        tomorrowData.map(task => (
          <div key={task.taskId} className="flex flex-col gap-1 text-lg">
            <li>{task.taskTitle}</li>
            <li>優先度：{task.taskPriority}</li>
            <li>期限：{task.taskDeadline}</li>
          </div>
        ))
      )}
    </div>
  )
}

export default LazyNextData