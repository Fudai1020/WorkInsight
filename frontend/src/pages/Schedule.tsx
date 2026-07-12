import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useState } from "react";
import { useModal } from "../context/ModalContext";
import { useAuth } from "../context/AuthContext";
import { fetchWithAuth } from "../utils/FetchWithAuth";
const Schedule = () => {
  const [selectedDate,setSelectedDate] = useState(new Date);
  const {openModal} = useModal();
  const {token,logout} = useAuth();
  const [events,setEvents] = useState<any[]>([]);
  const [isMobile,setIsMobile] = useState(window.innerWidth < 640);
  const [calendarRange,setCalendarRange] = useState({
    start:"",
    end:""
  });

  //画面サイズに合わせてサイズを編集
  useEffect(()=>{
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize",handleResize);
    return ()=> window.removeEventListener("resize",handleResize);
  },[])

  //スケジュールを取得してFullCalendarにセット
  const fetchSchedule = async(start:string,end:string)=>{
    try{
      if(!token) return;
        const res = await fetchWithAuth(`/schedules/period?start=${start}&end=${end}`,token,logout);
        const data = await res.json();
        const formatted = data.map((s:any)=>{
        let startDateTime;
        let endDateTime;
        if(s.allday){
          return{
            id:s.scheduleId,
            title:s.scheduleTitle,
            start:s.scheduleDate,
            allDay:true,
            extendedProps:{
            scheduleMemo:s.scheduleMemo,
          }
          }
        }else{
          startDateTime = `${s.scheduleDate}T${s.startTime}`;
          endDateTime = `${s.scheduleDate}T${s.endTime}`;
        }
        return{
          id:s.scheduleId,
          title:s.scheduleTitle,
          start:startDateTime,
          end:endDateTime,
          allDay:s.allday,
          extendedProps:{
            scheduleMemo:s.scheduleMemo,
          }
        };
      });
      setEvents(formatted);
    }catch(err){
      console.error(err);
    }
  }

  //すでに追加されている予定押下時の処理
  const handleEventClick = (info:any) =>{
    const clickedEvent = {
      id:info.event.id,
      title:info.event.title,
      date:info.event.start,
      start:info.event.start,
      end:info.event.end,
      allDay:info.event.allDay,
      scheduleMemo:info.event.extendedProps.scheduleMemo
    };
    openModal("schedule",{mode:"edit",event:clickedEvent,onSuccess:()=>fetchSchedule(calendarRange.start,calendarRange.end)});
  }

  return (
    <div className="h-[70vh] sm:h-[80vh]">
      <FullCalendar 
        plugins={[dayGridPlugin,timeGridPlugin,listPlugin,interactionPlugin]}
        locale={'ja'}
        initialView="dayGridMonth"
        events={events}
        datesSet={(info)=>{
          const start = info.startStr.slice(0,10);
          const end = info.endStr.slice(0,10);
          setCalendarRange({start,end})
          fetchSchedule(start,end);
        }}
        headerToolbar={
          isMobile
          ? {
            left:"prev,next",
            center:"title",
            right:"today",
          }:{
          left:'prev,next,today',
          center:'title',
          right:'dayGridMonth,timeGridWeek,listWeek',
        }}
        buttonText={{
          today:'今日',
          dayGridMonth:'月',
          timeGridWeek:'週',
          listWeek:'リスト',
        }}
        dateClick={(info) => {
          setSelectedDate(info.date);
        }}
        eventClick={(info) => handleEventClick(info)}
        selectable={true}
        height={'100%'}
        />
        <div className="flex justify-center mt-5">
          <button className="text-base sm:text-2xl p-6 bg-[#D9D9D9] rounded-lg hover:scale-[1.05] transition-transform"
            onClick={() => openModal("schedule",{mode:"create",date:selectedDate,onSuccess:()=>fetchSchedule(calendarRange.start,calendarRange.end)})}>
            予定の追加</button>
        </div>
    </div>
  )
}

export default Schedule    