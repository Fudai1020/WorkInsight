import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom"

const Register = () => {
  const [userPassword,setUserPassword] = useState('');
  const [userEmail,setUserEmail] = useState('');
  const [error,setError]  = useState('');
  const [confirmPassword,setConfirmPassword] = useState('');
  const [showPassword,setShowPassword] = useState(false);
  const handleRegister = (e:React.FormEvent)=>{
    e.preventDefault();
    if(!userEmail || !userPassword){
      setError('メールアドレスまたはパスワードを入力してください');
      return;
    }
    if(!userEmail.includes('@')){
      setError('有効なメールアドレスを入力してください');
      return;
    }
    if(userPassword != confirmPassword){
      setError('パスワードが一致していません');
      return;
    }
  }
  return (
    <>
    <div className="flex min-h-screen items-center justify-center">
      <div className="border rounded-xl shadow-md bg-[#F5F5F5] w-[480px] h-[550px]">
        <h1 className="text-center text-3xl mt-6 font-bold">新規登録</h1>
          {error &&(
            <p className="text-red-600 text-center mt-5">{error}</p>
          )}
        <form onSubmit={handleRegister} className="flex flex-col items-center gap-1 mt-6">
          <label className="text-2xl">メールアドレス</label>
          <input type="email" 
                  className="w-[380px] h-[50px] shadow-md bg-[#D5D5D5] rounded pl-5 text-lg
                              hover:scale-[1.05] transition-transform focus:scale-[1.05]" 
                  value={userEmail} onChange={(e)=>setUserEmail(e.target.value)}/>
          <label className="text-2xl mt-3">パスワード</label>
          <div className="relative w-[380px]">
            <input type={showPassword ? "text":"password"}
                    className="w-[380px] h-[50px] shadow-md bg-[#D5D5D5] rounded pl-5 text-lg
                              hover:scale-[1.05] transition-transform focus:scale-[1.05]" 
                   value={userPassword} onChange={(e)=>setUserPassword(e.target.value)}/>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer hover:scale-[1.3] transition-transform"
                 onClick={()=>setShowPassword(!showPassword)}>
              {showPassword ? <AiOutlineEyeInvisible size={22}/>:<AiOutlineEye size={22}/>}
            </div>
          </div>  
          <label className="text-2xl mt-3">パスワード(確認)</label>
          <div className="relative w-[380px]">
            <input type={showPassword ? "text":"password"}
                    className="w-[380px] h-[50px] shadow-md bg-[#D5D5D5] rounded pl-5 text-lg
                              hover:scale-[1.05] transition-transform focus:scale-[1.05]" 
                    value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer hover:scale-[1.3] transition-transform" onClick={()=>setShowPassword(!showPassword)}>
              {showPassword ? <AiOutlineEyeInvisible size={22}/>:<AiOutlineEye size={22}/>}
            </div>
          </div>
          <p className="flex gap-10 mt-5">登録済み  
                    <Link to='/' className="text-blue-700 hover:scale-[1.02] ">ログイン</Link>
          </p>
          <button className="bg-[#D5D5D5] w-[200px] h-[48px] rounded mt-3  shadow-md hover:scale-[1.05] transition-transform">登録</button>
        </form>
      </div>
    </div>
    </>
  )
}

export default Register