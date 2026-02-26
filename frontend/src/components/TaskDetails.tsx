import { useEffect, useState } from "react"
import DatePicker from "react-datepicker";
type Priority = "NONE"|"LOW"|"MEDIUM"|"HIGH";
type Status = "NONE"|"DOING"|"DONE"|"SKIPPED"; 
type Task = {
    taskId:number;
    taskTitle:string;
    taskStatus:Status;
    taskDeadline:string|null;
    taskPriority:Priority;
    taskMemo:string | undefined;
}
type props = {
    tasks:Task[];
    selectedTaskId:number|null;
    refreshTasks:()=>void;
}

const TaskDetails = ({tasks,selectedTaskId,refreshTasks}:props) => {
    const selectedTask = tasks.find(t => t.taskId === selectedTaskId);

    const [priority,setPriority] = useState<Priority|undefined>();
    const [state,setState] = useState<Status|undefined>();
    const [open,setOpen] = useState(false);
    const [stateOpen,setStateOpen] = useState(false);
    const [date,setDate] = useState<Date | null>(new Date());
    const [openPicker,setOpenPicker] = useState(false);
    const [memo,setmemo] = useState<string>();
    const PRIORITY_LABELS: Record<Priority,string> = {
        NONE:"なし",
        LOW:"低",
        MEDIUM:"中",
        HIGH:"高"
    };
    const STATUS_LABELS: Record<Status,string> ={
        NONE:"未着手",
        DOING:"進行中",
        DONE:"完了",
        SKIPPED:"後で"
    };
    useEffect(()=>{
        if(selectedTask){
            setPriority(selectedTask.taskPriority);
            setState(selectedTask.taskStatus);
            setmemo(selectedTask.taskMemo);
            setDate(selectedTask.taskDeadline ? new Date(selectedTask.taskDeadline) : null);
        }
    },[selectedTask]);
    const handleUpdate = async()=>{
        if(!selectedTaskId) return;
        try{
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:8080/api/tasks/${selectedTaskId}`,{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                },
                body:JSON.stringify({
                    taskPriority:priority,
                    taskStatus:state,
                    taskDeadline:date ? date.toISOString().split("T")[0] :null,
                    taskMemo:memo
                })
            });
            if(!response.ok){
                const errorText = await response.text();
                console.log(errorText);
                throw new Error("更新失敗");
            }else{
                refreshTasks();
            }
        }catch(err){
            console.error(err);
        }
    }
  return (
    <div className="flex flex-col items-center gap-5 h-full">
        <h1 className="text-4xl text-center mt-10 ">{selectedTask?.taskTitle ?? "タスクを選択してください"}</h1>
        <div className="flex flex-col items-center gap-10 cursor-pointer select-none h-full">
            <div className="flex items-center gap-5 hover:opacity-70 mt-6 relative"
                onClick={()=>setOpen(!open)}>
                <span className="text-3xl">優先度:</span>
                <span className="font-semibold text-3xl">{priority? PRIORITY_LABELS[priority] : ""}</span>
                <span className="text-2xl">▼</span>
            {open && (
                <ul className="absolute top-full right-0 mt-1 bg-white shadow-md rounded-md w-24 z-20">
                    {Object.entries(PRIORITY_LABELS).map(([key,label]) =>(
                        <li key={key} className="px-3  py-1 hover:bg-gray-200"
                            onClick={()=>{
                                setPriority(key as Priority);
                                setOpen(false);
                            }}>
                            {label}
                        </li>
                    ))}
                </ul>
            )}
            </div>
            <div className=" flex items-center gap-5 hover:opacity-70  relative"
                onClick={()=>setStateOpen(!stateOpen)}>
                <span className="text-3xl">状態:</span>
                <span className="font-semibold text-3xl">{state ? STATUS_LABELS[state] :""}</span>
                <span className="text-2xl">▼</span>
            {stateOpen && (
                <ul className="absolute right-0 bg-white shadow-md top-full rounded-md w-24 ">
                    {Object.entries(STATUS_LABELS).map(([key,label]) =>(
                        <li key={key} className="px-3  py-1 hover:bg-gray-200"
                            onClick={()=>{
                                setState(key as Status);
                                setStateOpen(false);
                            }}>
                            {label}
                        </li>
                    ))}
                </ul>
            )}
            </div>
            <div className="flex gap-1 translate-x-10 relative">
                <span className="text-3xl">期限：</span>
                <span className="text-3xl font-semibold">{date? date.toISOString().split("T")[0]:"期限なし"}</span>
                <button className="text-blue-600 hover:underline text-base translate-x-10"
                        onClick={()=>setOpenPicker(!openPicker)}>日付を変更
                </button>
            {openPicker && (
                <div className="absolute bg-white shadow-lg p-3 top-full right-0 rounded z-30 mt-2 hover:bg-gray-100">
                <DatePicker selected={date} 
                            onChange={(date) => {
                                setDate(date);
                                setOpenPicker(false);
                            }}
                            dateFormat={'yyyy-MM-dd'}
                            minDate={new Date()}
                            inline />
                </div>
            )}
            </div>
            <div className="flex flex-col items-center gap-5">
                <label htmlFor="memo" className="text-3xl">メモ</label>
                <textarea id="memo" name="memo"
                         className="bg-white shadow-md rounded w-150 p-5 h-50 max-w-lg 
                                    hover:scale-[1.02] transition-transform"
                        value={memo}
                        onChange={(e) => setmemo(e.target.value)}>
                </textarea>
            </div>
            <div className="flex gap-30 mb-15">
                <button className="text-xl bg-[#D9D9D9] p-4 rounded-lg shadow-md hover:scale-[1.05] transiton-transform">削除</button>
                <button className="text-xl bg-[#D9D9D9] p-4 rounded-lg shadow-md hover:scale-[1.05] transiton-transform"
                        onClick={handleUpdate}>更新</button>
            </div>
        </div>
    </div>
  )
}

export default TaskDetails