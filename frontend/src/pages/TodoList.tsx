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
    <div className="flex justify-center flex-col gap-5 h-full">
        <span className="text-center text-3xl mt-6 font-bold">タスク一覧</span>
        <div className="border rounded-xl mx-16 shadow-lg h-full my-5 flex bg-[#F5F5F5]">
            <div className="basis-1/3 p-6 border-r shadow-ls ">
                <TaskList tasks={tasks} onSelectedId={setSelectedId} selectedTaskId={selectedId}/>
            </div>
            <div className="basis-2/3 p-6">
                <TaskDetails tasks={tasks} selectedTaskId={selectedId}/>
            </div>
        </div>
    </div>
  )
}

export default TodoList