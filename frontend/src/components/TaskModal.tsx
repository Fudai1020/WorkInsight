import { useState } from "react"
import { useModal } from "../context/ModalContext";
import { useDashboard } from "../context/DashboardContext";
import { useAuth } from "../context/AuthContext";
import { fetchWithAuth } from "../utils/FetchWithAuth";

const TaskModal = () => {
    const {refreshDashboard} = useDashboard();
    const {closeModal} = useModal();
    const [priority,setPriority] = useState("NONE");
    const [open,setOpen] = useState(false);
    const {token,logout} = useAuth();
    const priorites = [
        {label:"未設定",value:"NONE"},
        {label:"低",value:"LOW"},
        {label:"中",value:"MEDIUM"},
        {label:"高",value:"HIGH"}];
    const [taskTitle,setTaskTitle] = useState("");
    const [deadline,setDeadline] = useState("");
    const [taskMemo,setTaskMemo] = useState("");
    const submitForm = async(e:React.FormEvent) =>{
        e.preventDefault();
        try{
            if(!token) return;
                await fetchWithAuth("/tasks",token,logout,{
                method:"POST",
                body:JSON.stringify({
                    taskTitle,
                    taskPriority:priority,
                    taskDeadline:deadline,
                    taskMemo
                })
            });
                await refreshDashboard();
                closeModal();
        }catch(err){
            throw new Error("送信に失敗しました");
        }
    }
  return (
    <form onSubmit={submitForm}
            className="flex flex-col h-full gap-4 sm:gap-12">
        <h1 className="text-2xl sm:text-3xl flex justify-center items-center font-semibold mt-5">タスクの追加</h1>
        <div className="grid gap-2 sm:gap-8  grid-cols-1 sm:grid-cols-[auto_minmax(280px,1fr)] w-full max-w-3xl mx-auto items-center">
        <span className="text-2xl sm:text-3xl text-center sm:text-right">題名</span>
            <input type="text"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)} 
                    className="bg-[#D9D9D9] rounded h-[40px] text-black focus:outline mx-auto w-full max-w-md
                               p-4 text-xl shadow-md hover:scale-[1.05] transition-transform"/>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] w-full max-w-3xl mx-auto gap-4 items-center relative">
            <span className="text-2xl sm:text-3xl text-center sm:text-right">優先度</span>
            <div className="mx-auto flex items-center justify-center gap-2 sm:gap-10">
            <span className="text-2xl sm:text-3xl font-semibold">{priorites.find(p=>p.value === priority)?.label}</span>
            <span className="text-3xl" onClick={()=> setOpen(!open)}>▼</span>
            </div>
            {open && (
                <ul className="absolute left-1/2 -translate-x-1/2 bg-white shadow-md top-full rounded-md z-20 w-24">
                    {priorites.map(opt =>(
                        <li key={opt.value} className="px-3 py-1 hover:bg-gray-200"
                            onClick={()=> {
                                setPriority(opt.value)
                                setOpen(false)
                            }}>
                            {opt.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] w-full max-w-3xl mx-auto gap-2 items-center">
            <span className="text-2xl sm:text-3xl text-center sm:text-right">期限</span>
            <input type="date" 
                   value={deadline}
                   onChange={(e)=>setDeadline(e.target.value)}
                   className="bg-[#D9D9D9] rounded h-[40px] w-full max-w-md mx-auto text-center
                                    p-4 text-xl shadow-md hover:scale-[1.05] transition-transform"/>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] w-full max-w-3xl mx-auto gap-2 pt-3 items-start">
            <span className="text-2xl sm:text-3xl text-center sm:text-right">メモ</span>
            <textarea className="mx-auto bg-[#D9D9D9] rounded w-full max-w-md 
                                 h-[120px] hover:scale-[1.05] transition-transform p-3"
                      value={taskMemo}
                      onChange={(e)=>setTaskMemo(e.target.value)}>

            </textarea>
        </div>
        <div className="flex items-center justify-center gap-10 sm:gap-25 mt-auto pb-10">
            <button type="button" onClick={()=>closeModal()} className="bg-[#D9D9D9] p-3 sm:p-4 rounded-md font-semibold hover:scale-[1.05] transition-transform text-sm sm:text-base">キャンセル</button>
            <button type="submit" className="bg-[#D9D9D9] p-3 sm:p-4 rounded-md font-semibold hover:scale-[1.05] transition-transform text-sm sm:text-base">追加</button>
        </div>
    </form>
  )
}

export default TaskModal