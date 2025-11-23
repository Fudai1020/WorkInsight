import { useState } from "react"
import { Link } from "react-router-dom";

const Login = () => {
    const [userEmail,setUserEmail] = useState('');
    const [userPassword,setUserPassword] = useState('');
    const [error,setError]  = useState('');

    const handleLogin = (e:React.FormEvent) =>{
        e.preventDefault();
        if(!userEmail || !userPassword){
            setError('メールアドレスまたはパスワードを入力してください');
            return;
        }
        if(!userEmail.includes('@')){
            setError('ただしいメールアドレスを入力してください');
            return;
        }


    }
    return (
    <>
    <div className="min-h-screen flex items-center justify-center">
        <div className="w-[480px] h-[550px] bg-[#F5F5F5] p-6 rounded-xl shadow-md border">
            <h1 className="text-center text-3xl mt-4 font-bold">ログイン</h1>
            <form onSubmit={handleLogin}>
                <div className="flex flex-col gap-1 items-center mt-10">
                    <label className="text-center text-3xl">メールアドレス</label>
                    <input type="email" className="w-[380px] h-[58px] shadow-md text-left text-lg pl-5
                                            rounded bg-[#D5D5D5] hover:scale-[1.05] focus:scale-[1.05]"
                    value={userEmail} onChange={(e)=>setUserEmail(e.target.value)}/>
                </div>
            <div className="flex flex-col gap-1 items-center mt-10">
                <label className="text-center text-3xl">パスワード</label>
                <input type="password" className="w-[380px] h-[58px] shadow-md text-left text-lg pl-5
                                                  rounded items-center bg-[#D5D5D5] hover:scale-[1.05] focus:scale-[1.05]"
                value={userPassword} onChange={(e)=>setUserPassword(e.target.value)} />
                <p className="flex gap-10 mt-5">アカウント未作成ですか？  
                    <Link to='' className="text-blue-700 hover:scale-[1.02]">新規作成</Link>
                </p>
                {error &&(
                    <p className="text-red-600 text center">{error}</p>
                )}
                <button className="bg-[#D5D5D5] w-[200px] h-[48px] rounded mt-5 shadow-md hover:scale-[1.05]">
                    ログイン
                </button>
            </div>
            </form>
            
        </div>
    </div>
    </>
  )
}

export default Login