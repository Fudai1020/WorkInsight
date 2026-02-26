import { useEffect, useState } from "react"
import TaskDetails from "../components/TaskDetails"
import TaskList from "../components/TaskList"


const TodoList = () => {
    const [tasks,setTasks] = useState([]);
    const [selectedId,setSelectedId] = useState<number|null>(null);
    const fetchTodoList = async()=>{
        const token = localStorage.getItem('token');
        try{
            const response = await fetch("http://localhost:8080/api/tasks",{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            if(response.ok){
                const taskData = await response.json();
                setTasks(taskData);
                console.log(tasks);
            }
        }catch(err){
            throw new Error("データの取得に失敗しました");
        }
    }
    useEffect(()=>{
        fetchTodoList();
    },[]);
  return (
    <div className="flex  flex-col gap-5">
        <span className="text-center text-3xl font-bold ">タスク一覧</span>
        <main className="flex-1 min-h-0">
        <div className="border rounded-xl  shadow-lg flex  bg-[#F5F5F5] h-full">
            <div className="basis-1/3 p-6 border-r shadow-ls  overflow-y-auto">
                <TaskList tasks={tasks} onSelectedId={setSelectedId} selectedTaskId={selectedId}/>
            </div>
            <div className="basis-2/3 p-6 overflow-y-auto">
                <TaskDetails tasks={tasks} selectedTaskId={selectedId} refreshTasks={fetchTodoList}/>
            </div>
        </div>
        </main>
    </div>
  )
}

export default TodoList