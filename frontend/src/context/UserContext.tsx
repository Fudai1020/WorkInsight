import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { fetchWithAuth } from "../utils/FetchWithAuth";
type User = {
    userId:number;
    userName:string;
    userEmail:string;
    userMemo:string;
}
type Props ={
    children:ReactNode;
}
type UserType = {
    userData:User | null;
    loading:boolean;
    refreshUser:()=>Promise<void>;
}
export const UserContext = createContext<UserType | null>(null);
export const UserProvider = ({children}:Props) =>{
    const [userData,setUserData] = useState<User | null>(null);
    const [loading,setLoading] = useState(true);
    const {token,logout} = useAuth();
    //ユーザ情報を取得する処理
    const fetchUser = useCallback(async () =>{
        if(!token) {
            setLoading(false);
            return;
        }
        try{
            const response = await fetchWithAuth("/users",token,logout);
            const data = await response.json();
            setUserData(data);
        }catch(err){
            console.error(err);
        }finally{
            setLoading(false);
        }
    },[token,logout]);
    useEffect(()=>{
            fetchUser();
    },[fetchUser]);
    return (
        <UserContext.Provider value={{userData,loading,refreshUser:fetchUser}}>
            {children}
        </UserContext.Provider>
    )
}
export const useUser = () => {
    const context = useContext(UserContext);
    if(!context){
        throw new Error("useUser must be used within UserContextProvider");
    }
    return context;
}