import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useDashboard } from "../context/DashboardContext";
import { useModal } from "../context/ModalContext";
import { fetchWithAuth } from "../utils/FetchWithAuth";

const NomalScheduleForm = () => {

  const {refreshDashboard} = useDashboard();
  const {closeModal,modalData} = useModal();
  const [allDay,setAllDay] = useState(false);
  const [scheduleTitle,setScheduleTitle] = useState('');
  const [scheduleDate,setScheduleDate] = useState("");
  const [startTime,setStartTime] = useState("");
  const [endTime,setEndTime] = useState("");
  const [scheduleMemo,setScheduleMemo] = useState("");
  const {token,logout} = useAuth();

  //入力したスケジュールの送信処理
  const submitForm = async (e:React.FormEvent) =>{
    e.preventDefault();
    var url = "";

    if(modalData?.mode === "edit" && modalData?.kind==="normal"){
       url = `/schedules/${modalData.event.id}`;
    }else{
       url = "/schedules";
    }
     
      const method = modalData?.mode === "edit" ? "PUT":"POST";

    try{
      if(!token) return;
      const response = await fetchWithAuth(url,token,logout,{
        method:method,
        body:JSON.stringify({
          scheduleTitle,
          scheduleDate,
          startTime:allDay ? null : startTime,
          endTime : allDay ? null : endTime,
          allDay:allDay,
          scheduleMemo
        })
      });
      if(response.ok){
        await modalData?.onSuccess?.();
        await refreshDashboard();  
        closeModal();
      }
    }catch(err){
      throw new Error("データの送信に失敗しました");
    }
  }
  //日付を変換
  const formatDate = (date:Date) =>{
    return date.toISOString().slice(0,10);
  }

  //時間を変換
  const formatTime = (time:Date) => {
    return time.toTimeString().slice(0,5);
  }

  //登録済みのデータを編集する際の情報取得
  useEffect(()=> {
    if(modalData?.mode === "edit"){
      if(modalData.kind === "normal"){

        const event = modalData.event;

        setScheduleTitle(event.title);
        setScheduleDate(formatDate(event.date));
        setStartTime(event.start ? formatTime(event.start):"");
        setEndTime(event.end ? formatTime(event.end):"");
        setAllDay(event.allDay);
        setScheduleMemo(event.scheduleMemo ?? "");        
      }

    }
  },[modalData])
  
  return (
    <form onSubmit={submitForm}
          className="flex flex-col h-full gap-4 sm:gap-13 border rounded-md shadow-md">
      <div className="grid grid-cols-1 gap-3 sm:gap-10 sm:grid-cols-[auto_minmax(280px,1fr)_auto] max-w-3xl mx-auto items-center mt-15">
        <span className="text-2xl text-center sm:text-3xl sm:text-right">題名</span>
            <input type="text"
                   value={scheduleTitle} 
                   onChange={(e)=>setScheduleTitle(e.target.value)}
                   className="bg-[#D9D9D9] rounded h-[40px] text-black focus:outline mx-auto w-full max-w-md
                               p-4 text-xl shadow-md hover:scale-[1.05] transition-transform"/>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:gap-10 sm:grid-cols-[auto_minmax(280px,1fr)_auto] max-w-3xl mx-auto items-center">
          <span className="text-2xl text-center sm:text-3xl sm:text-right">日付</span>
            <input type="date"
                   value={scheduleDate}
                   onChange={(e)=> setScheduleDate(e.target.value)} 
                    className="bg-[#D9D9D9] rounded h-[40px] text-black focus:outline mx-auto w-full max-w-md
                               p-4 text-xl shadow-md hover:scale-[1.05] transition-transform"/>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-[120px_minmax(280px,1fr)_auto] max-m-3xl mx-auto gap-2 sm:gap-10 items-center">
        <span className="text-2xl text-center sm:text-3xl sm:text-right">時間</span>
        <div className="flex items-center gap-2 mx-auto ">
          <input type="time" step="1800" disabled={allDay} 
                   value={startTime}
                   onChange={(e)=>setStartTime(e.target.value)}
                   className="input bg-[#D9D9D9] p-3 rounded-md text-lg font-semibold hover:scale-[1.05]"/>
            <span className="text-lg font-semibold">〜</span>
            <input type="time" step="1800" disabled={allDay} 
                   value={endTime}
                   onChange={(e)=>setEndTime(e.target.value)}
                   className="input bg-[#D9D9D9] p-3 rounded-md text-lg font-semibold hover:scale-[1.05]"/>
        </div>
          <label className="flex justify-center items-center gap-2 text-xl cursor-pointer">
            <input type="checkbox" className="size-4"
                    checked={allDay}
                    onChange={(e) => setAllDay(e.target.checked)}/>
            終日
          </label>
      </div>
      
         <div className="grid grid-cols-1 sm:grid-cols-[auto_minmax(280px,1fr)_auto] mx-auto sm:gap-10 items-start">
            <span className="text-2xl text-center sm:text-3xl sm:text-right">メモ</span>
            <textarea className="mx-auto bg-[#D9D9D9] rounded w-full max-w-lg h-[120px] 
                      hover:scale-[1.05] transition-transform p-3"
                      value={scheduleMemo}
                      onChange={(e)=>setScheduleMemo(e.target.value)}></textarea>
        </div>
        <div className="flex items-center justify-center gap-10 sm:gap-25 mt-auto pb-10">
            <button type="button"
                    onClick={closeModal} 
                    className="bg-[#D9D9D9] p-3 sm:p-4 rounded-md font-semibold 
                               hover:scale-[1.05] transition-transform">
                    キャンセル
            </button>
            <button type="submit" 
                    className="bg-[#D9D9D9] p-3 sm:p-4 rounded-md font-semibold 
                              hover:scale-[1.05] transition-transform">
                    追加
            </button>
        </div>
    </form>


  )
}

export default NomalScheduleForm