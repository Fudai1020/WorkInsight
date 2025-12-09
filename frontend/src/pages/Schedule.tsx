import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from "react";
const Schedule = () => {
  const [selectedDate,setSelectedDate] = useState(new Date);
  return (
    <div className="h-[80vh]">
      <FullCalendar 
        plugins={[dayGridPlugin,timeGridPlugin,listPlugin,interactionPlugin]}
        locale={'ja'}
        initialView="dayGridMonth"
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
          console.log(selectedDate);
        }}
        selectable={true}
        height={'100%'}
        />
        <div className="flex justify-center mt-10">
          <button className="text-2xl p-6 bg-[#D9D9D9] rounded-lg hover:scale-[1.05] transition-transform">予定の追加</button>
        </div>
    </div>
  )
}

export default Schedule    