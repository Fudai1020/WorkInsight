import { useModal } from "../context/ModalContext"
import ScheduleModal from "./ScheduleModal";
import TaskModal from "./TaskModal";

const Modal = () => {
    const {isOpen,modalType,closeModal} = useModal();
    if(!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        onClick={closeModal}>
        <div className="p-6 rounded-lg bg-white w-[40vw] h-[80vh] overflow-y-auto" 
            onClick={(e) => e.stopPropagation()}>
            {modalType === "schedule" && <ScheduleModal/>}
            {modalType === "task" && <TaskModal/>}

        </div>
    </div>
  )
}

export default Modal