import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useModal } from "../context/ModalContext"
import { fetchWithAuth } from "../utils/FetchWithAuth";

const FeedbackModal = () => {
    const {closeModal} = useModal();
    const {token,logout} = useAuth();
    const [workHour,setWorkHour] = useState(0);
    const [workMinutes,setWorkMinutes] = useState(0);
    const [feedbackContent,setFeedbackContent] = useState("");
    const saveFeedback = async(feedback:string | null) =>{
        if(!token) return false;
        try{
            await fetchWithAuth("/feedbacks",token,logout,{
                method:"POST",
                body:JSON.stringify({
                    workHour,
                    workMinutes,
                    feedbackContent:feedback,
                })
            });
            return true;
        }catch(err){
            console.error(err);
            return false;
        }
    };
    const canselModal = async() =>{
        const ok = window.confirm("サボりとして登録されますがよろしいですか?");
        if(!ok) return;
        const saved = await saveFeedback(null);
        if(saved){
            closeModal();
        }
    }
    const handleSubmit = async()=>{
        const saved = await saveFeedback(feedbackContent);
        if(saved){
            closeModal();
        }
    }
  return (
    <form onSubmit={(e) =>{ 
            e.preventDefault();
            handleSubmit();}}
            className="flex gap-10 flex-col h-full items-center ">
        <h1 className="text-3xl mt-7 font-semibold">フィードバックの入力</h1>
        <div className="flex text-2xl gap-5">
            <span>作業時間</span>
            <input type="number" min={0}
                    value={workHour}
                    onChange={(e)=>setWorkHour(Number(e.target.value))} 
                   className="w-[6vw] h-[4vh] bg-[#D9D9D9] rounded text-center hover:scale-[1.05] transition-transform"/>
            <span>時間</span>
            <input type="number" min={0} max={59} 
                    value={workMinutes}
                    onChange={(e)=>setWorkMinutes(Number(e.target.value))}
                    className="w-[6vw] h-[4vh] rounded bg-[#D9D9D9] text-center hover:scale-[1.05] transition-transform"/>
            <span>分</span>
        </div>
        <div className="flex flex-col items-center gap-4">
            <span className="text-2xl">振り返り</span>
            <textarea value={feedbackContent}
                      onChange={(e)=>setFeedbackContent(e.target.value)}
                     className="bg-[#D9D9D9] w-[30vw] h-[30vh] rounded-lg p-3 hover:scale-[1.03] transition-transform"></textarea>
        </div>
        <div className="flex gap-20 mt-auto mb-10">
        <button type="button"
                className="bg-[#D9D9D9] p-3 rounded-lg hover:scale-[1.05] transition-transform"
                onClick={() =>canselModal()}>入力しない</button>
        <button type="submit" className="bg-[#D9D9D9] p-3 rounded-lg hover:scale-[1.05] transition-transform">保存</button>
        </div>
    </form>
  )
}

export default FeedbackModal