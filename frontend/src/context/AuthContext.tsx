import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
type AuthContextType = {
    token:string|null;
    login:(token:string) => void;
    logout:()=>void;
}
const AuthContext = createContext<AuthContextType|null>(null);
export const AuthProvider = ({children}:{children:ReactNode}) =>{
    const [token,setToken] = useState<string|null>(null);
    //localStorageからトークンを取得
    useEffect(()=>{
        const savedToken = localStorage.getItem("token");
        if(savedToken){
            setToken(savedToken);
        }
    },[]);
    //新規ログイン時のトークンを保存
    const login = (newToken:string) =>{
        localStorage.setItem("token",newToken);
        setToken(newToken);
    }
    //ログアウト時のトークン削除
    const logout = () =>{
        localStorage.removeItem("token");
        setToken(null);
    }
    return(
        <AuthContext.Provider value={{token,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () =>{
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}