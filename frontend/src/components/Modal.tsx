import { useModal } from "../context/ModalContext"
import FeedbackModal from "./FeedbackModal";
import ScheduleModal from "./ScheduleModal";
import TaskModal from "./TaskModal";

const Modal = () => {
    const {isOpen,modalType,closeModal} = useModal();
    if(!isOpen) return null;
    const handleBackdropClick = () =>{
      if(modalType === "feedback") return;
      closeModal();
    }
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        onClick={handleBackdropClick}>
        <div className="p-6 rounded-lg bg-white w-[85vw] sm:w-[70wh] lg:w-[40wh] h-[85vh] sm:h-[80vh] overflow-y-auto" 
            onClick={(e) => e.stopPropagation()}>
            {modalType === "schedule" && <ScheduleModal/>}
            {modalType === "task" && <TaskModal/>}
            {modalType === "feedback" && <FeedbackModal />}
        </div>
    </div>
  )
}

export default Modal