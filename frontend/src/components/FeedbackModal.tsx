import { useModal } from "../context/ModalContext"

const FeedbackModal = () => {
    const {closeModal} = useModal();
    const canselModal = () =>{
        alert("サボりとして登録されますがよろしいですか?");
        closeModal();
    }
  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex gap-10 flex-col h-full items-center ">
        <h1 className="text-3xl mt-7 font-semibold">フィードバックの入力</h1>
        <div className="flex text-2xl gap-5">
            <span>作業時間</span>
            <input type="number" min={0} className="w-[6vw] h-[4vh] bg-[#D9D9D9] rounded text-center hover:scale-[1.05] transition-transform"/>
            <span>時間</span>
            <input type="number" min={0} max={59} className="w-[6vw] h-[4vh] rounded bg-[#D9D9D9] text-center hover:scale-[1.05] transition-transform"/>
            <span>分</span>
        </div>
        <div className="flex flex-col items-center gap-4">
            <span className="text-2xl">振り返り</span>
            <textarea className="bg-[#D9D9D9] w-[30vw] h-[30vh] rounded-lg p-3 hover:scale-[1.03] transition-transform"></textarea>
        </div>
        <div className="flex gap-20 mt-auto mb-10">
        <button className="bg-[#D9D9D9] p-3 rounded-lg hover:scale-[1.05] transition-transform"
                onClick={() =>canselModal()}>入力しない</button>
        <button className="bg-[#D9D9D9] p-3 rounded-lg hover:scale-[1.05] transition-transform">保存</button>
        </div>
    </form>
  )
}

export default FeedbackModal