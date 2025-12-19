import { useState } from "react"

const TaskModal = () => {
    const [priority,setPriority] = useState('未設定');
    const [open,setOpen] = useState(false);
    const priorites = ["未設定","低","中","高"];
  return (
    <form onSubmit={(e) => e.preventDefault()}
            className="flex flex-col h-full gap-12">
        <h1 className="text-3xl flex justify-center items-center font-semibold mt-10">タスクの追加</h1>
        <div className="grid grid-cols-[auto_1fr] px-[14%] items-center">
        <span className="text-3xl text-right">題名</span>
            <input type="text" 
                    className="bg-[#D9D9D9] rounded h-[40px] text-black focus:outline mx-auto w-[14vw]
                               p-4 text-xl shadow-md hover:scale-[1.05] transition-transform"/>
        </div>
        <div className="grid grid-cols-[auto_1fr] px-[14%] items-center relative">
            <span className="text-3xl text-right">優先度</span>
            <div className="mx-auto flex items-center gap-10">
            <span className="text-3xl font-semibold">{priority}</span>
            <span className="text-3xl" onClick={()=> setOpen(!open)}>▼</span>
            </div>
            {open && (
                <ul className="absolute right-[33%] bg-white shadow-md top-full rounded-md w-24">
                    {priorites.map(opt =>(
                        <li key={opt} className="px-3 py-1 hover:bg-gray-200"
                            onClick={()=> {
                                setPriority(opt)
                                setOpen(false)
                            }}>
                            {opt}
                        </li>
                    ))}
                </ul>
            )}
        </div>
        <div className="grid grid-cols-[auto_1fr] px-[14%] items-center">
            <span className="text-3xl text-right">期限</span>
            <input type="date" 
                        className="bg-[#D9D9D9] rounded h-[40px] w-[14vw] mx-auto text-center
                                    p-4 text-xl shadow-md hover:scale-[1.05] transition-transform"/>
        </div>
        <div className="grid grid-cols-[auto_1fr] px-[14%] pt-3 items-start">
            <span className="text-3xl text-right">メモ</span>
            <textarea className="mx-auto bg-[#D9D9D9] rounded w-[14vw] h-[120px] hover:scale-[1.05] transition-transform p-3"></textarea>
        </div>
        <div className="flex items-center justify-center gap-25 mt-auto pb-15">
            <button type="button" className="bg-[#D9D9D9] p-4 rounded-md font-semibold hover:scale-[1.05] transition-transform">キャンセル</button>
            <button type="submit" className="bg-[#D9D9D9] p-4 rounded-md font-semibold hover:scale-[1.05] transition-transform">追加</button>
        </div>
    </form>
  )
}

export default TaskModal