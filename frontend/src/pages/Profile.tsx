import UserDetail from "../components/UserDetail"
import UserProfile from "../components/UserProfile"

const Profile = () => {
  return (
   <div className="mt-7 grid grid-rows-[40%_57%]  gap-10">
    <UserProfile/>
    <UserDetail />
   </div>
  )
}

export default Profile