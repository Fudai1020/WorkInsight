import LazyData from "../components/LazyData"
import SchedulePreview from "../components/SchedulePreview"
import TaskPreview from "../components/TaskPreview"


const Dashboard = () => {
    const today = new Date();
    const dayNames = ["日","月","火","水","木","金","土"];
    const formatDate = `${today.getFullYear()}/${today.getMonth()+1}/${today.getDate()}(${dayNames[today.getDay()]})`;
  return (
    <div className="flex flex-col gap-8">
        <span className="text-center text-4xl mt-5">{formatDate}</span>
        <div className="flex gap-10 justify-center">
            <TaskPreview/>
            <SchedulePreview/>
        </div>
        <LazyData/>
    </div>
  )
}

export default Dashboard