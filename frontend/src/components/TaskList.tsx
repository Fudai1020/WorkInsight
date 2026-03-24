import { useState } from "react";
import { useModal } from "../context/ModalContext";
import type { Task } from "../pages/TodoList";

type props = {
tasks:Task[];
onSelectedId:(id:number)=>void;
selectedTaskId:number|null;
onToggleStatus:(taskId:number)=>void;
}
const TaskList = ({tasks,onSelectedId,selectedTaskId,onToggleStatus}:props) => {    
    const {openModal} = useModal();
    const [isOpen,setIsOpen] = useState(false);
    const isOverdue = (deadline:string | null) =>{
        if(!deadline) return false;
        const today = new Date();
        const todayOnly = new Date(today.getFullYear(),today.getMonth(),today.getDate());
        const  deadlineDate = new Date(deadline);
        return deadlineDate < todayOnly;
    }
  return (
    <div className="flex flex-col h-full gap-3">
        <div className="flex-1 overflow-y-auto  p-3 ">
            <span className="text-2xl sm:text-3xl text-center sm:text-left block">期限なし</span>
            <ul className="my-2 pl-5 flex flex-col gap-5">
                {tasks.filter(t => t.taskStatus !== 'DONE' && !t.taskDeadline).map(t=>(
                    <li key={t.taskId} className="text-base sm:text-xl border-b pb-2 "
                        onClick={()=>onSelectedId(t.taskId)}>
                        <div className={`flex gap-3 p-2 rounded-md ${selectedTaskId === t.taskId ? "bg-gray-200":"hover:bg-gray-200"}`}>
                            <input type="checkbox" 
                                    className="scale-125"
                                    checked={t.taskStatus === "DONE"}
                                    onChange={(e) => {
                                        e.stopPropagation();
                                        onToggleStatus(t.taskId);
                                    }}/>
                                {t.taskTitle}
                        </div>
                    </li>
                ))}
            </ul>
            <span className="text-2xl sm:text-3xl text-center sm:text-left block">期限あり</span>
            <ul className="my-2 pl-5 flex flex-col gap-5">
                {tasks.filter(t=>t.taskStatus !== "DONE" && t.taskDeadline).map(t=>{
                    const overdue = isOverdue(t.taskDeadline);
                    return(
                <li key={t.taskId} className="text-base sm:text-xl border-b pb-2"
                    onClick={()=>onSelectedId(t.taskId)}>
                    <div className={`flex gap-3 p-2 rounded-md ${selectedTaskId === t.taskId ? "bg-gray-200":"hover:bg-gray-200"}`}>
                        <input type="checkbox"
                                className="scale-125"
                                checked={t.taskStatus === "DONE"}
                                onChange={(e)=>{
                                    e.stopPropagation();
                                    onToggleStatus(t.taskId);
                                }}/>
                        <span className={`${overdue ? "text-red-500":"text-black"}`}>{t.taskTitle}</span> 
                        <span className={`ml-auto mt-auto text-base ${overdue ? "text-red-500":"text-black"}`}>{t.taskDeadline}</span>
                    </div>
                </li>
                )})}
            </ul>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-2xl sm:text-3xl cursor-pointer selecet-none"
                 onClick={()=>setIsOpen(prev => !prev)}>
                <span>完了済み</span>
                <span className={`transition-transform duration-300 ${isOpen ? "rotate-180":"rotate-0"}`}>▼</span>
            </div>
            {isOpen && (
                <ul className="my-2 pl-5 flex flex-col gap-5">
                    {tasks.filter(t => t.taskStatus === 'DONE')
                    .map(t=>(
                        <li key={t.taskId} className="text-base sm:text-xl border-b pb-3"
                            onClick={()=>onSelectedId(t.taskId)}>
                            <div className={`flex gap-3 p-2 rounded-md ${selectedTaskId === t.taskId ? "bg-gray-200":"hover:bg-gray-200"}`}>
                                <input type="checkbox"
                                        className="scale-125"
                                        checked={t.taskStatus === "DONE"}
                                        onChange={(e)=>{
                                            e.stopPropagation();
                                            onToggleStatus(t.taskId);
                                        }} />
                                <span className="line-through">{t.taskTitle}</span>
                            </div>
                            </li>
                    ))}
                </ul>
            )}
        </div>

        <div className=" text-base sm:text-xl mt-auto pb-6 text-center underline hover:scale-[1.02] cursor-pointer"
            onClick={() => openModal("task",{data:tasks})}>+タスクを追加する
        </div>
    </div>
  )
}

export default TaskList