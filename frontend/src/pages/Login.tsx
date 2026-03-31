import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible    } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { BASE_URL } from "../utils/Api";

const Login = () => {
    const [userEmail,setUserEmail] = useState('');
    const [userPassword,setUserPassword] = useState('');
    const [error,setError]  = useState('');
    const [showPassword,setShowPassword] = useState(false);
    const {login} = useAuth();
    const navigate = useNavigate();

    const handleLogin = async(e:React.FormEvent) =>{
        e.preventDefault();
        if(!userEmail || !userPassword){
            setError('メールアドレスまたはパスワードを入力してください');
            return;
        }
        if(!userEmail.includes('@')){
            setError('ただしいメールアドレスを入力してください');
            return;
        }
        try{
            const response = await fetch(`${BASE_URL}/users/login`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    userEmail,
                    password:userPassword
                })
            });
            const data = await response.json();
            if(!response.ok){
                setError(data.message);
                return;
            }
                alert("ログイン成功");
                login(data.token);
                if(data.firstLogin){
                    navigate("/profile",{state:{firstLogin:true}});
                }else{
                    navigate("/Dashboard");                    
                }
        }catch(err){
            setError("通信に失敗しました");
        }
    }
    return (
    <>
    <div className="min-h-screen flex items-center justify-center px-4 py-6 sm:p-6">
        <div className="w-full max-w-[480px] min-h-[550px] bg-[#F5F5F5] rounded-xl shadow-md border px-5 py-6 sm:px-8 sm:py-8">
            <h1 className="text-center text-2xl sm:text-3xl mt-4 font-bold">ログイン</h1>
            <form onSubmit={handleLogin}>
                <div className="flex flex-col gap-1 items-center mt-10">
                    <label className="text-center text-2xl sm:text-3xl">メールアドレス</label>
                    <div className="relative w-full px-2">
                        <input type="email" className="w-full h-[50px] shadow-md text-left text-lg pl-5 transition-transform
                                                rounded bg-[#D5D5D5] hover:scale-[1.05] focus:scale-[1.05]"
                        value={userEmail} onChange={(e)=>setUserEmail(e.target.value)}/>
                    </div>
                </div>
                <div className="flex flex-col gap-1 items-center mt-10">
                    <label className="text-center text-2xl sm:text-3xl">パスワード</label>
                    <div className="relative w-full px-2">
                        <input type={showPassword ? "text":"password"} 
                                className="w-full h-[50px] shadow-md text-left text-lg pl-5 transition-transform
                                                    rounded items-center bg-[#D5D5D5] hover:scale-[1.05] focus:scale-[1.05]"
                        value={userPassword} onChange={(e)=>setUserPassword(e.target.value)} />
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer hover:scale-[1.3] transition-transform"
                            onClick={()=>setShowPassword(!showPassword)}>
                            {showPassword ? <AiOutlineEyeInvisible size={22}/>:<AiOutlineEye size={22}/>}
                        </div>
                    </div>
                    <p className="flex flex-wrap gap-2 sm:gap-6 mt-5">アカウント未作成ですか？  
                        <Link to='/' className="text-blue-700 hover:scale-[1.02]">新規作成</Link>
                    </p>
                    {error &&(
                        <p className="text-red-600 text-center mt-3 text-sm sm:text-base">{error}</p>
                    )}
                    <button className="bg-[#D5D5D5] w-full max-w-[200px] h-[48px] rounded mt-8  shadow-md hover:scale-[1.05] transition-transform">
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