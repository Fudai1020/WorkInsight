import { useEffect, useState } from "react"
import { AiOutlineHome } from "react-icons/ai";
import { BsLayoutSidebar } from "react-icons/bs";
import { CiLogout, CiUser } from "react-icons/ci";
import { FcTodoList } from "react-icons/fc";
import { GrSchedule } from "react-icons/gr";
import { NavLink, useNavigate } from "react-router-dom";
import { useModal } from "../context/ModalContext";
import { useUser } from "../context/UserContext";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
    const [isOpen,setIsOpen] = useState(window.innerWidth >= 640);
    const {closeModal} = useModal();
    const {userData} = useUser();
    const {logout} = useAuth();
    const navigate = useNavigate();
    //画面サイズによってサイドバー開閉を管理
    useEffect(()=>{
        const handleResize = () =>{
            if(window.innerWidth < 640){
                setIsOpen(false);
            }else{
                setIsOpen(true);
            }
        };
        handleResize();
        window.addEventListener("resize",handleResize);
        return () => window.removeEventListener("resize",handleResize);
    },[])
    //ログアウト処理
    const handleLogout = () => {
        logout();
        navigate("/login");
    }
  return (
    <div className={`${isOpen ? "w-[250px]":"w-[80px] sm:w-[90px]"} shadow-[4px_0_8px_rgba(0,0,0,0.05)] flex flex-col
                    bg-[#F5F5F5] h-screen p-4 transition-all duration-300 border-r border-gray-200`}>
        <div className="hidden sm:flex justify-end mt-2">
            <button onClick={()=>setIsOpen(!isOpen)} className="p-2 rounded-lg hover:bg-gray-200 hover:scale-[1.05] transition-colors">
            <BsLayoutSidebar size={20} />
            </button>
        </div>
        <div>
        <NavLink to='/dashboard'
                className={({isActive})=>`flex items-center gap-3 p-3 rounded-lg cursor-pointer mt-10
                                transitional-all ${isActive ? 'bg-gray-200':'hover:bg-gray-200'}`}
                onClick={closeModal}>
        {!isOpen ?
        <AiOutlineHome size={28}/>:
        <><AiOutlineHome size={22} /><span className="text-xl">ホーム</span></>}   
        </NavLink>
        <NavLink to='/todoList'
                className={({isActive}) => `flex items-center gap-3 p-3 rounded-lg cursor-pointer mt-10
                            transitional-all ${isActive ? 'bg-gray-200':'hover:bg-gray-200'}`}
                onClick={closeModal}>
            {!isOpen ?<FcTodoList size={28}/> :
            <><FcTodoList size={22} /><span className="text-xl">Todoリスト</span></>}
        </NavLink>
        <NavLink to='/schedule'
                className={({isActive}) => `flex items-center gap-3 p-3 rounded-lg cursor-pointer mt-10
                            transitional-all ${isActive ? 'bg-gray-200':'hover:bg-gray-200'}`}
                onClick={closeModal}>
            {!isOpen ? <GrSchedule size={28}/>:
            <><GrSchedule size={22} /><span className="text-xl">スケジュール</span></>}
        </NavLink>
        </div>
        <NavLink to='/profile'
                    className={({isActive}) => `mt-10 flex gap-3 rounded-lg p-3 items-center
                                transitional-all ${isActive ? 'bg-gray-200':'hover:bg-gray-200'}`}>
        {!isOpen ? 
            <CiUser size={30}/>:
        <><CiUser size={30} /><span className="text-xl">{userData?.userName ?? "ユーザ名"}</span></>
        }
        </NavLink>
        <div className="mt-auto flex gap-3 rounded-lg p-3 hover:bg-gray-200 mb-3"
             onClick={handleLogout}>
        {!isOpen ? 
            <CiLogout size={30}/>:
        <><CiLogout size={30}/><span className="text-xl">ログアウト</span></>    
    }
        </div>
    </div>
  )
}

export default Sidebar