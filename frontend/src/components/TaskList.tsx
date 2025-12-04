type props = {
tasks:any[];
}
const TaskList = ({tasks}:props) => {
  return (
    <div className="flex flex-col gap-3 p-10 h-full">
        <span className="text-3xl">期限なし</span>
        <ul className="my-2 pl-5 flex flex-col gap-5">
            {tasks.filter(t => !t.deadline).map(t=>(
                <li key={t.id} className="text-xl border-b pb-2 ">
                    <div className="flex gap-3 hover:bg-gray-200 p-2 rounded-md">
                    <input type="checkbox" className="scale-125"/>
                    {t.title}
                    </div>
                </li>
            ))}
        </ul>
        <span className="text-3xl">期限あり</span>
        <ul className="my-2 pl-5 flex flex-col gap-5">
            {tasks.filter(t => t.deadline).map(t=>(
            <li key={t.id} className="text-xl border-b pb-2">
                <div className="flex gap-3 hover:bg-gray-200 p-2 rounded-md">
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