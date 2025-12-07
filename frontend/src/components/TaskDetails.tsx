import { useState } from "react"
import DatePicker from "react-datepicker";

type props = {
    tasks:any[];
    selectedTaskId:number|null;
}

const TaskDetails = ({tasks,selectedTaskId}:props) => {
    const [priority,setPriority] = useState('高');
    const [state,setState] = useState('未着手');
    const [open,setOpen] = useState(false);
    const [stateOpen,setStateOpen] = useState(false);
    const priorityOptions = ['高','中','低'];
    const taskState = ['未着手','進行中','完了'];
    const [date,setDate] = useState<Date | null>(new Date());
    const [openPicker,setOpenPicker] = useState(false);
    const [memo,setmemo] = useState('');
    
    const selectedTask = tasks.find(task => task.id === selectedTaskId);
  return (
    <div className="flex flex-col items-center gap-15 h-full">
        <h1 className="text-4xl text-center mt-10 ">{selectedTask?.title ?? "タスクを選択してください"}</h1>
        <div className="flex flex-col items-center cursor-pointer select-none h-full">
            <div className="flex items-center gap-5 hover:opacity-70 mt-6 relative"
                onClick={()=>setOpen(!open)}>
                <span className="text-3xl">優先度:</span>
                <span className="font-semibold text-3xl">{priority}</span>
                <span className="text-2xl">▼</span>
            {open && (
                <ul className="absolute top-full right-0 mt-1 bg-white shadow-md rounded-md w-24 z-20">
                    {priorityOptions.map(opt =>(
                        <li key={opt} className="px-3  py-1 hover:bg-gray-200"
                            onClick={()=>{
                                setPriority(opt);
                                setOpen(false);
                            }}>
                            {opt}
                        </li>
                    ))}
                </ul>
            )}
            </div>
            <div className=" mt-20 flex items-center gap-5 hover:opacity-70 mt-6 relative"
                onClick={()=>setStateOpen(!stateOpen)}>
                <span className="text-3xl">状態:</span>
                <span className="font-semibold text-3xl">{state}</span>
                <span className="text-2xl">▼</span>
            {stateOpen && (
                <ul className="absolute right-0 bg-white shadow-md top-full rounded-md w-24 ">
                    {taskState.map(opt =>(
                        <li key={opt} className="px-3  py-1 hover:bg-gray-200"
                            onClick={()=>{
                                setState(opt);
                                setStateOpen(false);
                            }}>
                            {opt}
                        </li>
                    ))}
                </ul>
            )}
            </div>
            <div className="flex gap-1 mt-20 translate-x-10 relative">
                <span className="text-3xl">期限：</span>
                <span className="text-3xl font-semibold">{selectedTask?.deadline ??"期限なし"}</span>
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
            <div className="flex flex-col items-center gap-10 mt-20">
                <label htmlFor="memo" className="text-3xl">メモ</label>
                <textarea id="memo" name="memo"
                         className="bg-white shadow-md rounded w-150 p-5 h-50 max-w-lg 
                                    hover:scale-[1.02] transition-transform"
                        value={memo}
                        onChange={(e) => setmemo(e.target.value)}>
                </textarea>
            </div>
            <div className="flex gap-30 mt-auto mb-15">
                <button className="text-xl bg-[#D9D9D9] p-4 rounded-lg shadow-md hover:scale-[1.05] transiton-transform">更新</button>
                <button className="text-xl bg-[#D9D9D9] p-4 rounded-lg shadow-md hover:scale-[1.05] transiton-transform">削除</button>
            </div>
        </div>
    </div>
  )
}

export default TaskDetails