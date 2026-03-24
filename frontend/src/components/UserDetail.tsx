import { useEffect, useState } from "react"
import { useSettings, type WeekDay } from "../context/SettingContext";
import { useAuth } from "../context/AuthContext";
import { fetchWithAuth } from "../utils/FetchWithAuth";
type Props = {
  firstLogin:boolean;
}
const UserDetail = ({firstLogin}:Props) => {
  const {settings,loading,refreshSetting} = useSettings();
  const [editMode,setEditMode] = useState(false);
  const [startTime,setStartTime] = useState("");
  const [endTime,setEndTime] = useState("");
  const [restStartTime,setRestStartTime] = useState("");
  const [restEndTime,setRestEndTime] = useState("");
  const [timer,setTimer] = useState(0);
  const days:WeekDay[]=["MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY","SUNDAY"];
  const {token,logout} = useAuth();
  const DAY_LABEL : Record<WeekDay,string> = {
    MONDAY:'月',
    TUESDAY:'火',
    WEDNESDAY:'水',
    THURSDAY:'木',
    FRIDAY:'金',
    SATURDAY:'土',
    SUNDAY:'日'};
  const [selectedDays,setSelectedDays] = useState<WeekDay[]>([]);
  useEffect(()=>{
    if(firstLogin){
      setEditMode(true);
    }
  },[firstLogin]);
  useEffect(()=>{
    if(settings){
      setStartTime(settings.workStartTime);
      setEndTime(settings.workEndTime);
      setRestStartTime(settings.restStartTime);
      setRestEndTime(settings.restEndTime);
      setTimer(settings.breakMinutes);
      setSelectedDays(settings.settingWeek ?? []);
    }
  },[settings]);
  const updateSetting = async ()=>{
    try{
      if(!token) return;
        await fetchWithAuth("/settings",token,logout,{
        method:"PUT",
        body:JSON.stringify({
          workStartTime:startTime,
          workEndTime:endTime,
          restStartTime,
          restEndTime,
          breakMinutes:timer,
          settingWeek:selectedDays
        })
      });
      await refreshSetting();
      setEditMode(false);
    }catch(err){
      console.error(err);
    }
  }
  if(loading) return <div>loading...</div>
  return (
    <div className="border rounded-lg sm:mx-10 shadow-md flex flex-col overflow-auto">
      <div className="mt-10">
        <div className="grid sm:grid-cols-[30%_30%]
                        items-center justify-center">
            <span className="text-2xl sm:text-3xl text-center sm:text-left">稼働時間：</span>
            {editMode ? 
            <div className="flex flex-wrap items-center justfiy-center sm:justify-start gap-2 sm:gap-5">
              <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)}
                      className="bg-[#D9D9D9] rounded-lg p-2 text-base sm:text-2xl text-center w-24 sm:w-[35%]"/>
              <span className="text-2xl sm:text-3xl">〜</span>
              <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)}
                      className="bg-[#D9D9D9] rounded-lg p-2 text-base sm:text-2xl text-center w-24 sm:w-[35%]"/></div>
              :<span className="text-2xl sm:text-3xl">{startTime}〜{endTime}</span>
            }
        </div>
        <div className="border-b mx-[20%] mt-6 "></div>
      </div>
       <div className="mt-10">
        <div className="grid sm:grid-cols-[30%_30%]
                        items-center justify-center">
            <span className="text-2xl sm:text-3xl text-center sm:text-left">休憩時間：</span>
            {editMode ? 
            <div className="flex flex-wrap items-center jusify-center gap-2 sm:gap-5">
              <input type="time" value={restStartTime} onChange={(e) => setRestStartTime(e.target.value)}
                      className="bg-[#D9D9D9] rounded-lg p-2 text-base sm:text-2xl text-center w-24 sm:w-[35%]"/>
              <span className="text-2xl sm:text-3xl">〜</span>
              <input type="time" value={restEndTime} onChange={(e) => setRestEndTime(e.target.value)}
                      className="bg-[#D9D9D9] rounded-lg p-2 text-base sm:text-2xl text-center w-24 sm:w-[35%]"/></div>
              :<span className="text-2xl sm:text-3xl">{restStartTime}〜{restEndTime}</span>
            } 
        </div>
        <div className="border-b mx-[20%] mt-6 "></div>
      </div>
       <div className="mt-10">
        <div className="grid sm:grid-cols-[30%_30%]
                        items-center justify-center">
            <span className="text-2xl sm:text-3xl">タイマー間隔：</span>
            {editMode ? 
              <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-3">
                <input type="text" value={timer} 
                       onChange={(e) => {
                        const value = e.target.value;
                        setTimer(value === ""?0:Number(value))}}
                      className="bg-[#D9D9D9] rounded-lg  text-xl sm:text-2xl text-center w-24 sm:w-[35%]" />
                <span className="text-2xl sm:text-3xl">m</span></div>
                :<span className="text-2xl sm:text-3xl">{timer}m</span>
            }
        </div>
        <div className="border-b mx-[20%] mt-6 "></div>
        <div className=" mt-8 grid sm:grid-cols-[30%_30%] items-center justify-center">
          <span className="text-2xl sm:text-3xl text-center sm:text-left">曜日設定：</span>
          {editMode ? 
            <div className="flex flex-wrap justfy-center sm:justify-start gap-2 sm:gap-5">
              {days.map(day => (
                <button key={day}
                        className={`p-2 rounded ${selectedDays.includes(day) ? "bg-blue-500":'bg-gray-200'}`}
                        onClick={() => {
                          if(selectedDays.includes(day)){
                            setSelectedDays(selectedDays.filter(d => d !== day));
                          }else{
                            setSelectedDays(prev => [...prev,day]);
                          }
                        }}>{DAY_LABEL[day]}</button>
              ))}
            </div>:
          <span className="text-2xl sm:text-3xl">{selectedDays.length === 0 ? "なし":selectedDays.map(day => DAY_LABEL[day]).join("・")}</span>
          }
        </div>
      </div>
        <button className="mt-5 sm:mt-auto ml-auto mr-10 bg-[#D9D9D9] p-2 sm:p-3 mb-5 rounded-lg text-xl sm:text-2xl
                            hover:scale-[1.05]  transition-transform" 
                            onClick={()=>{
                              editMode ? updateSetting():setEditMode(true);
                            }}>{editMode ? '保存': '編集'}</button>
    </div>
  )
}

export default UserDetail