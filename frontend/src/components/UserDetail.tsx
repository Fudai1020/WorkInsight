import { useState } from "react"

const UserDetail = () => {
  const [editMode,setEditMode] = useState(false);
  const [startTime,setStartTime] = useState("9:00");
  const [endTime,setEndTime] = useState("18:00");
  const [timer,setTimer] = useState('30');
  const days = ['なし','月','火','水','木','金','土','日'];
  const [selectedDays,setSelectedDays] = useState<string[]>(['なし']);
  return (
    <div className="border rounded-lg mx-10 shadow-md flex flex-col overflow-auto">
      <div className="mt-10">
        <div className="grid grid-cols-[30%_30%]
                        items-center justify-center">
            <span className="text-3xl">稼働時間：</span>
            {editMode ? 
            <div className="flex gap-5">
              <input type="text" value={startTime} onChange={(e) => setStartTime(e.target.value)}
                      className="bg-[#D9D9D9] rounded-lg p-2 text-2xl text-center w-[35%]"/>
              <span className="text-3xl">〜</span>
              <input type="text" value={endTime} onChange={(e) => setEndTime(e.target.value)}
                      className="bg-[#D9D9D9] rounded-lg p-2 text-2xl text-center w-[35%]"/></div>
              :<span className="text-3xl">{startTime}〜{endTime}</span>
            }
        </div>
        <div className="border-b mx-[20%] mt-6 "></div>
      </div>
       <div className="mt-10">
        <div className="grid grid-cols-[30%_30%]
                        items-center justify-center">
            <span className="text-3xl">休憩時間：</span>
            {editMode ? 
            <div className="flex gap-5">
              <input type="text" value={startTime} onChange={(e) => setStartTime(e.target.value)}
                      className="bg-[#D9D9D9] rounded-lg p-2 text-2xl text-center w-[35%]"/>
              <span className="text-3xl">〜</span>
              <input type="text" value={endTime} onChange={(e) => setEndTime(e.target.value)}
                      className="bg-[#D9D9D9] rounded-lg p-2 text-2xl text-center w-[35%]"/></div>
              :<span className="text-3xl">{startTime}〜{endTime}</span>
            } 
        </div>
        <div className="border-b mx-[20%] mt-6 "></div>
      </div>
       <div className="mt-10">
        <div className="grid grid-cols-[30%_30%]
                        items-center justify-center">
            <span className="text-3xl">タイマー間隔：</span>
            {editMode ? 
              <div className="flex gap-3">
                <input type="text" value={timer} onChange={(e) => setTimer(e.target.value)}
                      className="bg-[#D9D9D9] rounded-lg  text-2xl text-center w-[35%]" />
                <span className="text-3xl">m</span></div>
                :<span className="text-3xl">{timer}m</span>
            }
        </div>
        <div className="border-b mx-[20%] mt-6 "></div>
        <div className=" mt-8 grid grid-cols-[30%_30%] items-center justify-center">
          <span className="text-3xl">曜日設定：</span>
          {editMode ? 
            <div className="flex gap-5">
              {days.map(day => (
                <button key={day}
                        className={`p-2 rounded ${selectedDays.includes(day) ? "bg-blue-500":'bg-gray-200'}`}
                        onClick={() => {
                          if(day === 'なし'){
                            setSelectedDays(['なし']);
                            return;
                          }
                          const withoutNone = selectedDays.filter(d => d!=='なし');
                          if(withoutNone.includes(day)){
                            setSelectedDays(withoutNone.filter(d => d !== day));
                          }else{
                            setSelectedDays([...withoutNone,day]);
                          }
                        }}>{day}</button>
              ))}
            </div>:
          <span className="text-3xl">{selectedDays}</span>
          }
        </div>
      </div>
        <button className="mt-auto ml-auto mr-10 bg-[#D9D9D9] p-3 mb-5 rounded-lg text-2xl
                            hover:scale-[1.05]  transition-transform" onClick={()=>setEditMode(!editMode)}>{editMode ? '保存': '編集'}</button>
    </div>
  )
}

export default UserDetail