import { useModal } from "../context/ModalContext";

type props = {
tasks:any[];
onSelectedId:(id:number)=>void;
selectedTaskId:number|null;
}
const TaskList = ({tasks,onSelectedId,selectedTaskId}:props) => {
    const {openModal} = useModal();
  return (
    <div className="flex flex-col h-full gap-3">
        <div className="flex-1 overflow-y-auto  p-3 ">
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
        </div>

        <div className=" text-xl mt-auto pb-6 text-center underline hover:scale-[1.02] cursor-pointer"
            onClick={() => openModal("task",{data:tasks})}>+タスクを追加する
        </div>
    </div>
  )
}

export default TaskList