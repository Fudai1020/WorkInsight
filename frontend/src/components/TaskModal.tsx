import { useState } from "react"
import { useModal } from "../context/ModalContext";

const TaskModal = () => {
    const {closeModal} = useModal();
    const [priority,setPriority] = useState("NONE");
    const [open,setOpen] = useState(false);
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
        const token = localStorage.getItem("token");
        try{
            const response = await fetch("http://localhost:8080/api/tasks",{
                method:"post",
                headers:{
                    Authorization:`Bearer ${token}`,
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    taskTitle,
                    taskPriority:priority,
                    taskDeadline:deadline,
                    taskMemo
                })
            });
            if(response.ok){
                closeModal();
            }
        }catch(err){
            throw new Error("送信に失敗しました");
        }
    }
  return (
    <form onSubmit={submitForm}
            className="flex flex-col h-full gap-12">
        <h1 className="text-3xl flex justify-center items-center font-semibold mt-10">タスクの追加</h1>
        <div className="grid grid-cols-[auto_1fr] px-[14%] items-center">
        <span className="text-3xl text-right">題名</span>
            <input type="text"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)} 
                    className="bg-[#D9D9D9] rounded h-[40px] text-black focus:outline mx-auto w-[14vw]
                               p-4 text-xl shadow-md hover:scale-[1.05] transition-transform"/>
        </div>
        <div className="grid grid-cols-[auto_1fr] px-[14%] items-center relative">
            <span className="text-3xl text-right">優先度</span>
            <div className="mx-auto flex items-center gap-10">
            <span className="text-3xl font-semibold">{priorites.find(p=>p.value === priority)?.label}</span>
            <span className="text-3xl" onClick={()=> setOpen(!open)}>▼</span>
            </div>
            {open && (
                <ul className="absolute right-[33%] bg-white shadow-md top-full rounded-md w-24">
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
        <div className="grid grid-cols-[auto_1fr] px-[14%] items-center">
            <span className="text-3xl text-right">期限</span>
            <input type="date" 
                   value={deadline}
                   onChange={(e)=>setDeadline(e.target.value)}
                   className="bg-[#D9D9D9] rounded h-[40px] w-[14vw] mx-auto text-center
                                    p-4 text-xl shadow-md hover:scale-[1.05] transition-transform"/>
        </div>
        <div className="grid grid-cols-[auto_1fr] px-[14%] pt-3 items-start">
            <span className="text-3xl text-right">メモ</span>
            <textarea className="mx-auto bg-[#D9D9D9] rounded w-[14vw] 
                                 h-[120px] hover:scale-[1.05] transition-transform p-3"
                      value={taskMemo}
                      onChange={(e)=>setTaskMemo(e.target.value)}>

            </textarea>
        </div>
        <div className="flex items-center justify-center gap-25 mt-auto pb-15">
            <button type="button" onClick={()=>closeModal()} className="bg-[#D9D9D9] p-4 rounded-md font-semibold hover:scale-[1.05] transition-transform">キャンセル</button>
            <button type="submit" className="bg-[#D9D9D9] p-4 rounded-md font-semibold hover:scale-[1.05] transition-transform">追加</button>
        </div>
    </form>
  )
}

export default TaskModal