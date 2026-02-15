
import { useModal } from "../context/ModalContext";
type Props = {
  tasks:any[];
}
const TaskPreview = ({tasks}:Props) => {
  const {openModal} = useModal();

  return (
    <div className="border rounded-xl w-full h-full">
      <div className="flex flex-col items-center h-full gap-10">
        <h1 className="text-3xl font-semibold mt-5">今日のタスク</h1>
        <ul className="flex flex-col gap-2 overflow-y-auto">
          {tasks.length === 0 ? (
            <span className="text-2xl">本日のタスクはありません</span>):
            (tasks.map(item => (
              <li key={item.id} className="grid grid-cols-[auto_1fr_auto] gap-15 items-center">
                <input type="checkbox" className="size-5"/>
                <span className="text-2xl">{item.title}</span>
                <span className="text-2xl">{item.priority}</span>
              </li>
          )))
          }
        </ul>
        <div className="border-t mt-auto pb-6 pt-5 w-[80%]  text-center">
          <span className="text-xl underline hover:scale-[1.05 cursor-pointer]"
                onClick={()=>openModal("task",{data:tasks})}>＋タスクの追加</span>
        </div>
      </div>
    </div>
  )
}

export default TaskPreview