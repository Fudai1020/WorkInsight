import { useModal } from "../context/ModalContext"


const SchedulePreview = () => {
  const {openModal} = useModal();
  const schedules = [
    {id:1,title:"終日イベント",allDay:true,startTime:null,endTime:null},
    {id:2,title:"定例MTG",allDay:false,startTime:"10:00",endTime:"10:30"},
    {id:3,title:"会議",allDay:false,startTime:"13:00",endTime:"13:30"},
  ];
  const sortedSchedules = [...schedules].sort((a,b) => {
    if(a.allDay && !b.allDay) return -1;
    if(!a.allDay && b.allDay) return 1;
    if(a.allDay && b.allDay) return 0;
    return a.startTime!.localeCompare(b.startTime!);
  })
  return (
    <div className="border rounded-xl w-full h-full">
      <div className="flex flex-col items-center h-full">
        <h1 className="text-3xl font-semibold mt-5">今日のスケジュール</h1>
        <ul className="w-[80%] flex flex-col gap-4 mt-7 overflow-y-auto">
          {sortedSchedules.map(s => (
            <li key={s.id} className="grid grid-cols-[6rem_1fr] items-center gap-30">
              <span className="text-xl whitespace-nowrap">
                {s.allDay ? "終日":`${s.startTime}〜${s.endTime}`}
              </span>
              <span className="text-2xl truncate">{s.title}</span>
            </li>
          ))}
        </ul>
        <div className="border-t mt-auto pb-6 pt-5 w-[80%]  text-center">
          <span className="text-xl underline hover:scale-[1.05] cursor-pointer"
                onClick={()=>openModal("schedule",)}>＋予定の追加</span>
        </div>
      </div>
    </div>
  )
}

export default SchedulePreview