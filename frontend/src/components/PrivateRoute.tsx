import type { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

type Props = {
    children:ReactNode;
}
const PrivateRoute = ({children}:Props) =>{
    const {token} = useAuth();
    if(!token){
        return <Navigate to="/login" replace />
    }
    return children;
};
export default PrivateRoute;