const LazyTodayData = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-13">
        <h1 className="text-2xl font-semibold mt-10">今日の状況</h1>
        <div className="flex justify-between text-xl">
            <span>稼働時間：</span>
            <span>02:15</span>
        </div>
        <div className="flex justify-between text-xl">
            <span>サボり時間：</span>
            <span>00:45</span>
        </div>
        <div className="flex justify-between text-xl font-semibold">
            <span>サボり率：</span>
            <span>45%</span>
        </div>
    </div>
  )
}

export default LazyTodayData