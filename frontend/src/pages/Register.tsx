import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom"
import { BASE_URL } from "../utils/Api";

const Register = () => {
  const [userPassword,setUserPassword] = useState('');
  const [userEmail,setUserEmail] = useState('');
  const [error,setError]  = useState('');
  const [confirmPassword,setConfirmPassword] = useState('');
  const [showPassword,setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleRegister = async(e:React.FormEvent)=>{
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
    try{
      const response = await fetch(`${BASE_URL}/users/register`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          userEmail,
          password:userPassword,
          confirmPassword
        })
      });
      const data = await response.json();
      if(!response.ok){
        setError(data.message);
        return;
      }else{
        alert("登録完了");
        navigate('/login');
      }
    }catch(err){
      setError("通信に失敗しました");
    }             
  }
  return (
    <>
    <div className="flex min-h-screen items-center justify-center px-4 py-6 sm:p-6">
      <div className="w-full border rounded-xl shadow-md bg-[#F5F5F5] max-w-[480px]  px-5 py-6 sm:px-8 sm:py-8">
        <h1 className="text-center text-2xl mt-6 font-bold sm:text-3xl">新規登録</h1>
          {error &&(
            <p className="text-red-600 text-center mt-5 font-bold text-sm sm:text-base">{error}</p>
          )}
        <form onSubmit={handleRegister} className="flex flex-col items-center gap-1 mt-6 sm:mt-8">
          <label className="text-xl sm:text-2xl">メールアドレス</label>
          <div className="relative w-full px-2">
            <input type="email" 
                    className="w-full h-[50px] shadow-md bg-[#D5D5D5] rounded text-base pl-5
                                hover:scale-[1.05] transition-transform focus:scale-[1.05] sm:text-lg" 
                    value={userEmail} onChange={(e)=>setUserEmail(e.target.value)}/>
          </div>
          <label className="text-xl sm:text-2xl mt-3">パスワード</label>
          <div className="relative w-full px-2">
            <input type={showPassword ? "text":"password"}
                    className="w-full h-[50px] shadow-md bg-[#D5D5D5] rounded pl-5 text-base sm:text-xl
                              hover:scale-[1.05] transition-transform focus:scale-[1.05]" 
                   value={userPassword} onChange={(e)=>setUserPassword(e.target.value)}/>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer hover:scale-[1.3] transition-transform"
                 onClick={()=>setShowPassword(!showPassword)}>
              {showPassword ? <AiOutlineEyeInvisible size={22}/>:<AiOutlineEye size={22}/>}
            </div>
          </div>  
          <label className="text-xl sm:text-2xl mt-3">パスワード(確認)</label>
          <div className="relative w-full px-2">
            <input type={showPassword ? "text":"password"}
                    className="w-full h-[50px] shadow-md bg-[#D5D5D5] rounded pl-5 text-base sm:text-lg
                              hover:scale-[1.05] transition-transform focus:scale-[1.05]" 
                    value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer hover:scale-[1.3] transition-transform" onClick={()=>setShowPassword(!showPassword)}>
              {showPassword ? <AiOutlineEyeInvisible size={22}/>:<AiOutlineEye size={22}/>}
            </div>
          </div>
          <p className="flex flex-wrap justify-center sm:gap-6 gap-2 mt-5 text-sm sm:text-base">登録済み  
                    <Link to='/login' className="text-blue-700 hover:scale-[1.02] ">ログイン</Link>
          </p>
          <button type="submit"
                  className="bg-[#D5D5D5] w-full max-w-[200px] h-[48px]
                             rounded mt-3  shadow-md hover:scale-[1.05] transition-transform" >
            登録
          </button>
        </form>
      </div>
    </div>
    </>
  )
}

export default Register