import { useEffect, useState } from "react"
import TaskDetails from "../components/TaskDetails"
import TaskList from "../components/TaskList"
import { useAuth } from "../context/AuthContext";
type Priority = "NONE"|"LOW"|"MEDIUM"|"HIGH";
type Status = "NONE"|"DOING"|"DONE"|"SKIPPED"; 
export type Task = {
    taskId:number;
    taskTitle:string;
    taskStatus:Status;
    taskDeadline:string|null;
    taskPriority:Priority;
    taskMemo:string | undefined;
}
const TodoList = () => {
    const [tasks,setTasks] = useState<Task[]>([]);
    const [selectedId,setSelectedId] = useState<number|null>(null);
    const {token} = useAuth();
    //タスクデータ取得処理
    const fetchTodoList = async()=>{
        try{
            const response = await fetch("http://localhost:8080/api/tasks",{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            if(response.ok){
                const taskData = await response.json();
                setTasks(taskData);
            }
        }catch(err){
            throw new Error("データの取得に失敗しました");
        }
    }
    useEffect(()=>{
        if(token){
            fetchTodoList();
        }
    },[token]);
    //タスク進捗変更処理
    const toggleTaskStatus = async(taskId:number) =>{
        if(!token) return;
        setTasks(prev =>
            prev.map(task =>
                task.taskId === taskId ? {
                    ...task,status:task.taskStatus === "DONE" ? "TODO" :"DONE"
                }
                :task
            )
        );
        try{
            const res = await fetch(`http://localhost:8080/api/tasks/${taskId}/status`,{
                method:"PATCH",
                headers:{
                    Authorization:`Bearer ${token}`
                },
            });
            if(res.ok){
                fetchTodoList();
            }
        }catch(err){
            console.error(err);
        }
    };
  return (
    <div className="flex  flex-col gap-5">
        <span className="text-center text-3xl font-bold ">タスク一覧</span>
        <main className="flex-1 min-h-0">
        <div className="border rounded-xl  shadow-lg flex  bg-[#F5F5F5] h-full">
            <div className="basis-1/3 p-6 border-r shadow-ls  overflow-y-auto">
                <TaskList tasks={tasks} onSelectedId={setSelectedId} selectedTaskId={selectedId} onToggleStatus={toggleTaskStatus}/>
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