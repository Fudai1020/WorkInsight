import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { useAuth } from "../context/AuthContext";
import { fetchWithAuth } from "../utils/FetchWithAuth";

const UserProfile = () => {
    const {userData,loading,refreshUser} = useUser();
    const [userName,setUserName] = useState('');
    const [userEmail,setUserEmail] = useState('');
    const [userMemo,setUserMemo] = useState('');
    const [editMode,setEditMode] = useState(false);
    const {token,logout} = useAuth();
    //DBから取得したユーザデータの設定
    useEffect(()=>{
        if(userData){
            setUserName(userData.userName ?? "");
            setUserEmail(userData.userEmail ?? "");
            setUserMemo(userData.userMemo ?? "");
        }
    },[userData])
    //ユーザ情報更新リクエスト
    const updateUser = async()=>{
        try{
            if(!token) return;
                await fetchWithAuth("/users",token,logout,{
                method:"PUT",
                body:JSON.stringify({
                    userName,
                    userEmail,
                    userMemo
                })
            });
            await refreshUser();
            setEditMode(false);            
        }catch(err){
            console.error(err);
        }
    }
    if(loading) return <div>loading...</div>;
  return (
    <div className="border rounded-lg sm:mx-10 shadow-md flex flex-col h-full">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-[30%_30%] place-items-center justify-center mt-10">
            <span className="text-2xl sm:text-3xl">ユーザ名</span>
            {editMode ? 
            <input type="text" className="text-2xl bg-[#D9D9D9] rounded-lg p-1 text-center"
             value={userName} onChange={(e) => setUserName(e.target.value)}/>
            :
            <span className="text-2xl sm:text-3xl">{userName ? userName:"未設定"}</span>
            }
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-[30%_30%] gap-3 place-items-center justify-center mt-10">
            <span className="text-2xl sm:text-3xl">メールアドレス</span>
            {editMode ? 
            <input type="email" className="text-2xl bg-[#D9D9D9] rounded-lg p-1 text-center"
                    value={userEmail} onChange={(e) => setUserEmail(e.target.value)}/>
            :
            <span className="text-2xl sm:text-3xl">{userEmail ? userEmail:"未設定"}</span>
            }
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-[30%_30%] gap-1 place-items-center justify-center mt-5 sm:mt-10">
            <span className="text-2xl sm:text-3xl">メモ</span>
            {editMode ? 
            <textarea value={userMemo} onChange={(e) => setUserMemo(e.target.value)}
                        className="bg-[#D9D9D9] rounded-lg text-base p-1  sm:w-[14vw]"></textarea>
            :
            <span className="text-2xl sm:text-3xl">{userMemo ? userMemo:"未設定"}</span>
            }
        </div>
        <button className="mt-5 sm:mt-auto ml-auto mr-10 bg-[#D9D9D9] p-1 sm:p-3 mb-5 rounded-lg text-2xl
                            hover:scale-[1.05]  transition-transform"
                onClick={()=>editMode ? updateUser():setEditMode(true)}>
        {editMode ? '変更':'編集'}
        </button>
    </div>
  )
}

export default UserProfile