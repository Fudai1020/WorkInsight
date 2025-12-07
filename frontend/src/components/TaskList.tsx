type props = {
tasks:any[];
onSelectedId:(id:number)=>void;
selectedTaskId:number|null;
}
const TaskList = ({tasks,onSelectedId,selectedTaskId}:props) => {
  return (
    <div className="flex flex-col gap-3 p-10 h-full">
        <span className="text-3xl">期限なし</span>
        <ul className="my-2 pl-5 flex flex-col gap-5">
            {tasks.filter(t => !t.deadline).map(t=>(
                <li key={t.id} className="text-xl border-b pb-2 "
                    onClick={()=>onSelectedId(t.id)}>
                    <div className={`flex gap-3 p-2 rounded-md ${selectedTaskId === t.id ? "bg-gray-200":"hover:bg-gray-200"}`}>
                    <input type="checkbox" className="scale-125"/>
                    {t.title}
                    </div>
                </li>
            ))}
        </ul>
        <span className="text-3xl">期限あり</span>
        <ul className="my-2 pl-5 flex flex-col gap-5">
            {tasks.filter(t => t.deadline).map(t=>(
            <li key={t.id} className="text-xl border-b pb-2"
                onClick={()=>onSelectedId(t.id)}>
                    <div className={`flex gap-3 p-2 rounded-md ${selectedTaskId === t.id ? "bg-gray-200":"hover:bg-gray-200"}`}>
                    <input type="checkbox" className="scale-125"/>
                    <span>{t.title}</span> 
                    <span className="ml-auto mt-auto text-base">{t.deadline}</span>
                </div>
            </li>
            ))}
        </ul>
        <a className=" text-xl mt-auto text-center underline hover:scale-[1.02] cursor-pointer">+タスクを追加する</a>
    </div>
  )
}

export default TaskList