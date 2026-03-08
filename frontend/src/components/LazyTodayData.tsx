import { useDashboard } from "../context/DashboardContext"

const LazyTodayData = () => {
    const {summary} = useDashboard();
    if(!summary){
        return <div>読み込み中...</div>
    }
  return (
    <div className="flex flex-col items-center justify-center gap-13">
        <h1 className="text-2xl font-semibold mt-10">今日の状況</h1>
        <div className="flex justify-between text-xl">
            <span>稼働時間：</span>
            <span>{summary.workMinutes}分</span>
        </div>
        <div className="flex justify-between text-xl">
            <span>サボり時間：</span>
            <span>{summary.saboriMinutes}分</span>
        </div>
        <div className="flex justify-between text-xl font-semibold">
            <span>サボり率：</span>
            <span>{(summary.saboriRate * 100).toFixed(1)}</span>
        </div>
    </div>
  )
}

export default LazyTodayData