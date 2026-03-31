const BASE_URL = import.meta.env.VITE_API_URL;
export const fetchWithAuth = async(url:string,token:string,logout:()=>void,options?:RequestInit) =>{
    const response = await fetch(BASE_URL + url,{
        ...options,
        headers:{
            "Content-Type":"application/json",
            ...(options?.headers || {}),
            Authorization:`Bearer ${token}`
        }
    });
    if(response.status === 401 || response.status === 403){
        logout();
        throw new Error("認証期限切れ");
    }
    if(!response.ok){
        throw new Error("APIエラー");
    }
    return response;
}