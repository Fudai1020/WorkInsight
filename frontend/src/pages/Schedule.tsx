import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from "react";
import { useModal } from "../context/ModalContext";
import { useAuth } from "../context/AuthContext";
import { fetchWithAuth } from "../utils/FetchWithAuth";
const Schedule = () => {
  const [selectedDate,setSelectedDate] = useState(new Date);
  const {openModal} = useModal();
  const {token,logout} = useAuth();
  const [events,setEvents] = useState<any[]>([]);
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
        };
      });
      setEvents(formatted);
    }catch(err){
      console.error(err);
    }
  }


  return (
    <div className="h-[80vh]">
      <FullCalendar 
        plugins={[dayGridPlugin,timeGridPlugin,listPlugin,interactionPlugin]}
        locale={'ja'}
        initialView="dayGridMonth"
        events={events}
        datesSet={(info)=>{
          const start = info.startStr.slice(0,10);
          const end = info.endStr.slice(0,10);
          fetchSchedule(start,end);
        }}
        headerToolbar={{
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
        selectable={true}
        height={'100%'}
        />
        <div className="flex justify-center mt-10">
          <button className="text-2xl p-6 bg-[#D9D9D9] rounded-lg hover:scale-[1.05] transition-transform"
            onClick={() => openModal("schedule",{date:selectedDate})}>
            予定の追加</button>
        </div>
    </div>
  )
}

export default Schedule    