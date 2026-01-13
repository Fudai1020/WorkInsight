import { useState } from "react";

const UserProfile = () => {
    const [userName,setUserName] = useState('未設定');
    const [userEmail,setUserEmail] = useState('未設定');
    const [userMemo,setUserMemo] = useState('未設定');
    const [editMode,setEditMode] = useState(false)
  return (
    <div className="border rounded-lg mx-10 shadow-md flex flex-col h-full">
        <div className="grid grid-cols-[30%_30%] place-items-center justify-center mt-10">
            <span className="text-3xl">ユーザ名</span>
            {editMode ? 
            <input type="text" className="text-2xl bg-[#D9D9D9] rounded-lg p-1 text-center"
             value={userName} onChange={(e) => setUserName(e.target.value)}/>
            :
            <span className="text-3xl">{userName}</span>
            }
        </div>
        <div className="grid grid-cols-[30%_30%] place-items-center justify-center mt-10">
            <span className="text-3xl">メールアドレス</span>
            {editMode ? 
            <input type="email" className="text-2xl bg-[#D9D9D9] rounded-lg p-1 text-center"
                    value={userEmail} onChange={(e) => setUserEmail(e.target.value)}/>
            :
            <span className="text-3xl">{userEmail}</span>
            }
        </div>
        <div className="grid grid-cols-[30%_30%] place-items-center justify-center mt-10">
            <span className="text-3xl">メモ</span>
            {editMode ? 
            <textarea value={userMemo} onChange={(e) => setUserMemo(e.target.value)}
                        className="bg-[#D9D9D9] rounded-lg text-base p-1 w-[14vw]"></textarea>
            :
            <span className="text-3xl">{userMemo}</span>
            }
        </div>
        <button className="mt-auto ml-auto mr-10 bg-[#D9D9D9] p-3 mb-5 rounded-lg text-2xl
                            hover:scale-[1.05]  transition-transform"
                onClick={()=>setEditMode(!editMode)}>
        {editMode ? '変更':'編集'}
        </button>
    </div>
  )
}

export default UserProfile