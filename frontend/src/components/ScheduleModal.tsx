import { useState } from "react";
import NomalScheduleForm from "./NomalScheduleForm";
import PeriodScheduleForm from "./PeriodScheduleForm";
import RepeatScheduleForm from "./RepeatScheduleForm";
import { useModal } from "../context/ModalContext";

const ScheduleModal = () => {
  const {modalData} = useModal();

  type ScheduleKind = "normal" | "period" | "repeat";

  const [scheduleType,setScheduleType] = useState<ScheduleKind>("normal");

  const selectedScheduleType = modalData?.mode === "edit" ? modalData?.kind : scheduleType;
  
  return (
    <div>
      <div className="flex justify-center items-center">
        <button className={selectedScheduleType === "normal" ? "border border-b-white p-2 relative z-10 -mb-px":"bg-[#D9D9D9] p-2 "}
                onClick={() =>setScheduleType("normal")}>通常予定</button>
        <button className={selectedScheduleType === "period" ? "border border-b-white p-2 relative z-10 -mb-px":"bg-[#D9D9D9] p-2 "}
                onClick={() =>setScheduleType("period")}>期間予定</button>
        <button className={selectedScheduleType === "repeat" ? "border border-b-white p-2 relative z-10 -mb-px":"bg-[#D9D9D9] p-2"}
                onClick={() =>setScheduleType("repeat")}>繰り返し</button>
      </div>
      {selectedScheduleType === "normal" && <NomalScheduleForm/> }
      {selectedScheduleType === "period" && <PeriodScheduleForm/> }
      {selectedScheduleType === "repeat" && <RepeatScheduleForm/> }

    </div>
  )
}

export default ScheduleModal