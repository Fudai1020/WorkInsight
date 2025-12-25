import LazyNextData from "./LazyNextData"
import LazyTodayData from "./LazyTodayData"
import Timer from "./Timer"

const LazyData = () => {
  return (
    <div className="border rounded-xl w-full h-full">
      <div className="grid grid-cols-[1fr_1.5fr_1fr] h-full gap-6">
        <div className="border-r">
          <LazyTodayData />
        </div>
        <div className="flex items-center justify-center">
        <Timer />
        </div>
        <div className="border-l   ">
          <LazyNextData />
        </div>
      </div>
    </div>
  )
}

export default LazyData