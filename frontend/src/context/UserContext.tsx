import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
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
    logout:()=>void;
    refreshUser:()=>Promise<void>;
}
export const UserContext = createContext<UserType | null>(null);
export const UserProvider = ({children}:Props) =>{
    const [userData,setUserData] = useState<User | null>(null);
    const [loading,setLoading] = useState(true);
    const fetchUser = async () =>{
        try{
            const token = localStorage.getItem("token");
            if(!token){
                setLoading(false);
                return;
            }
            const response = await fetch("http://localhost:8080/api/users",{
                headers:{
                    Authorization:`Bearer ${token}`,
                },
            });
            if(!response.ok){
                throw new Error("Failed to fetch user");    
            }
            const data = await response.json();
            setUserData(data);
        }catch(err){
            console.error(err);
        }finally{
            setLoading(false);
        }
    };
    const logout = ()=>{
        localStorage.removeItem("token");
        setUserData(null);
    }
    useEffect(()=>{
        fetchUser();
    },[])
    return (
        <UserContext.Provider value={{userData,logout,loading,refreshUser:fetchUser}}>
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