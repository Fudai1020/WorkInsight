import { useLocation } from "react-router-dom"
import UserDetail from "../components/UserDetail"
import UserProfile from "../components/UserProfile"

const Profile = () => {
  const location = useLocation();
  const isFirstLogin = location.state?.firstLogin;
  return (
   <div className="mt-2 flex flex-col sm:grid sm:grid-rows-[40%_57%] gap-6 sm:gap-10">
    <UserProfile/>
    <UserDetail firstLogin={isFirstLogin}/>
   </div>
  )
}

export default Profile