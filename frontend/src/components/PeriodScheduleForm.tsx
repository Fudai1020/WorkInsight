import { useEffect, useState } from "react"
import { useModal } from "../context/ModalContext";
import { useAuth } from "../context/AuthContext";
import { fetchWithAuth } from "../utils/FetchWithAuth";
import { useDashboard } from "../context/DashboardContext";



const PeriodScheduleForm = () => {
  const {refreshDashboard} = useDashboard();
  const {closeModal,modalData} = useModal();
  const [scheduleTitle,setScheduleTitle] = useState("");
  const [scheduleMemo,setScheduleMemo] = useState("");
  const [startDate,setStartDate] = useState("");
  const [endDate,setEndDate] = useState(""); 
  const {token,logout} = useAuth();
  
  //スケジュール登録リクエスト処理
  const submitForm = async (e:React.FormEvent) =>{
    e.preventDefault();

    const url = modalData?.mode === 'edit' ?  `/schedules/period/${modalData.event.id}`:'/schedules/period'

    const method = modalData?.mode == 'edit' ? 'PUT':'POST'

    try{
      if(!token) return;
      const response = await fetchWithAuth(url,token,logout,{
        method:method,
        body:JSON.stringify({
          scheduleTitle,
          startDate,
          endDate,
          scheduleMemo
        })
      })
      //リクエスト成功
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

  //編集時に渡されるデータをセット
  useEffect(() => {
    console.log(modalData)
    if(modalData?.mode === 'edit'){
      if(modalData.kind === 'period'){
        const event = modalData.event;
        setScheduleTitle(event.title);
        setStartDate(formatDate(event.start));
        setEndDate(formatDate(event.end));
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

      <div className="grid grid-cols-1 sm:grid-cols-[70px_minmax(300px,1fr)_auto] max-m-3xl mx-auto gap-2 sm:gap-10 items-center">
        <span className="text-2xl text-center sm:text-3xl sm:text-right">期間</span>
        <div className="flex items-center gap-2 mx-auto">
          <input type="date"
                 value={startDate}
                 onChange={(e) => setStartDate(e.target.value)}
                  className="bg-[#D9D9D9] p-2 rounded-md text-md w-30 hover:scale-[1.05] transition-transform" />
          <span className="text-lg font-semibold">〜</span>
          <input type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-[#D9D9D9] p-2 rounded-md text-md w-30 hover:scale-[1.05] transition-transform" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[auto_minmax(280px,1fr)_auto] mx-auto sm:gap-10 items-center">
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

export default PeriodScheduleForm