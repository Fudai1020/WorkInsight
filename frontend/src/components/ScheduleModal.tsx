import { useState } from "react"


const ScheduleModal = () => {
  const [allDay,setAllDay] = useState(false);
  return (
    <form onSubmit={(e) => e.preventDefault()}
          className="flex flex-col h-full gap-13">
        <h1 className="text-3xl font-semibold justify-center flex items-center mt-4">新しい予定</h1>
        <div className="grid grid-cols-[auto_1fr] px-[14%] items-center">
        <span className="text-3xl text-right">題名</span>
            <input type="text" 
                    className="bg-[#D9D9D9] rounded h-[40px] text-black focus:outline mx-auto w-[14vw]
                               p-4 text-xl shadow-md hover:scale-[1.05] transition-transform"/>
        </div>
        <div className="grid grid-cols-[auto_1fr] px-[14%] items-center">
        <span className="text-3xl text-right">日付</span>
            <input type="date" 
                    className="bg-[#D9D9D9] rounded h-[40px] text-black focus:outline mx-auto w-[14vw]
                               p-4 text-xl shadow-md hover:scale-[1.05] transition-transform"/>
        </div>
        <div className="grid grid-cols-[auto_1fr_auto] px-[14%] items-center">
          <span className="text-3xl text-right">時間</span>
          <div className="flex items-center gap-2 mx-auto translate-x-10">
            <input type="time" step="1800" disabled={allDay} className="input bg-[#D9D9D9] p-3 rounded-md text-lg font-semibold hover:scale-[1.05]"/>
            <span className="text-lg font-semibold">〜</span>
            <input type="time" step="1800" disabled={allDay} className="input bg-[#D9D9D9] p-3 rounded-md text-lg font-semibold hover:scale-[1.05]"/>
          </div>
          <label className="flex items-center gap-2 ml-4 text-xl cursor-pointer">
            <input type="checkbox" className="size-4"
                    checked={allDay}
                    onChange={(e) => setAllDay(e.target.checked)}/>
            終日
          </label>
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

export default ScheduleModal