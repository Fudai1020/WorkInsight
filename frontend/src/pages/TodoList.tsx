import { useEffect, useState } from "react"
import TaskDetails from "../components/TaskDetails"
import TaskList from "../components/TaskList"
import { useAuth } from "../context/AuthContext";
import { fetchWithAuth } from "../utils/FetchWithAuth";
type Priority = "NONE"|"LOW"|"MEDIUM"|"HIGH";
type Status = "TODO"|"DOING"|"DONE"|"SKIPPED"; 
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
    const {token,logout} = useAuth();
    //タスクデータ取得処理
    const fetchTodoList = async()=>{
        if(!token) return;
        try{
            const response = await fetchWithAuth("/tasks",token,logout);
            const taskData = await response.json();
            setTasks(taskData);
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
                    ...task,taskStatus:task.taskStatus === "DONE" ? "TODO" :"DONE"
                }
                :task
            )
        );
        try{
            await fetchWithAuth(`/tasks/${taskId}/status`,token,logout,{
                method:"PATCH"
            });
            await fetchTodoList();
        }catch(err){
            console.error(err);
        }
    };
  return (
    <div className="flex  flex-col gap-5 px-4 sm:px-6">
        <span className="text-center text-2xl sm:text-3xl font-bold ">タスク一覧</span>
        <main className="flex-1 min-h-0">
        <div className="border rounded-xl  shadow-lg flex flex-col xl:flex-row  bg-[#F5F5F5] h-full">
            <div className="sm:basis-1/3 p-6 border-b sm:border-b-0 sm:border-r shadow-ls  overflow-y-auto">
                <TaskList tasks={tasks} onSelectedId={setSelectedId} selectedTaskId={selectedId} onToggleStatus={toggleTaskStatus}/>
            </div>
            <div className="sm:basis-2/3 sm:p-6 overflow-y-auto">
                <TaskDetails tasks={tasks} selectedTaskId={selectedId} refreshTasks={fetchTodoList}/>
            </div>
        </div>
        </main>
    </div>
  )
}

export default TodoList