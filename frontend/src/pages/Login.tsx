import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible    } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [userEmail,setUserEmail] = useState('');
    const [userPassword,setUserPassword] = useState('');
    const [error,setError]  = useState('');
    const [showPassword,setShowPassword] = useState(false);
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
            const response = await fetch("http://localhost:8080/api/users/login",{
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
                localStorage.setItem("token",data.token);
                navigate("/Dashboard");
        }catch(err){
            setError("通信に失敗しました");
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
                    <input type="email" className="w-[380px] h-[50px] shadow-md text-left text-lg pl-5 transition-transform
                                            rounded bg-[#D5D5D5] hover:scale-[1.05] focus:scale-[1.05]"
                    value={userEmail} onChange={(e)=>setUserEmail(e.target.value)}/>
                </div>
            <div className="flex flex-col gap-1 items-center mt-10">
                <label className="text-center text-3xl">パスワード</label>
                <div className="relative w-[380px]">
                    <input type={showPassword ? "text":"password"} 
                            className="w-[380px] h-[50px] shadow-md text-left text-lg pl-5 transition-transform
                                                  rounded items-center bg-[#D5D5D5] hover:scale-[1.05] focus:scale-[1.05]"
                    value={userPassword} onChange={(e)=>setUserPassword(e.target.value)} />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer hover:scale-[1.3] transition-transform"
                        onClick={()=>setShowPassword(!showPassword)}>
                        {showPassword ? <AiOutlineEyeInvisible size={22}/>:<AiOutlineEye size={22}/>}
                    </div>
                </div>
                <p className="flex gap-10 mt-5">アカウント未作成ですか？  
                    <Link to='/' className="text-blue-700 hover:scale-[1.02]">新規作成</Link>
                </p>
                {error &&(
                    <p className="text-red-600 text center">{error}</p>
                )}
                <button className="bg-[#D5D5D5] w-[200px] h-[48px] rounded mt-8  shadow-md hover:scale-[1.05] transition-transform">
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