import TaskDetails from "../components/TaskDetails"
import TaskList from "../components/TaskList"


const TodoList = () => {
  return (
    <div className="flex justify-center flex-col gap-5">
        <span className="text-center text-3xl mt-5">タスク一覧</span>
        <div className="border rounded-xl mx-16 shadow-lg h-[710px] flex bg-[#F5F5F5]">
            <div className="basis-1/3 p-6 border-r shadow-ls">
                <TaskList/>
            </div>
            <div className="basis-2/3 p-6">
                <TaskDetails/>
            </div>
        </div>
    </div>
  )
}

export default TodoList