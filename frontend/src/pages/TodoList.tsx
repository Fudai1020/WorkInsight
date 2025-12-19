import { useState } from "react"
import TaskDetails from "../components/TaskDetails"
import TaskList from "../components/TaskList"


const TodoList = () => {
    const [tasks,setTasks] = useState([
        {id:1,title:'洗濯',deadline:null,},
        {id:2,title:'役所手続き',deadline:'2025-12-01'},
        {id:3,title:'マイナンバー更新',deadline:'2025-12-06'},
        {id:4,title:'電話',deadline:null},
    ]);
    const [selectedId,setSelectedId] = useState<number|null>(null);
  return (
    <div className="flex  flex-col gap-5  overflow-hidden">
        <span className="text-center text-3xl font-bold ">タスク一覧</span>
        <main className="flex-1 min-h-0">
        <div className="border rounded-xl  shadow-lg flex  bg-[#F5F5F5] h-full">
            <div className="basis-1/3 p-6 border-r shadow-ls  overflow-y-auto">
                <TaskList tasks={tasks} onSelectedId={setSelectedId} selectedTaskId={selectedId}/>
            </div>
            <div className="basis-2/3 p-6 overflow-y-auto">
                <TaskDetails tasks={tasks} selectedTaskId={selectedId}/>
            </div>
        </div>
        </main>
    </div>
  )
}

export default TodoList