import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"

export const AppLayput = () => {
  return (
    <>
    <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 f-screen">
            <Outlet/>
        </main>
    </div>

    </>
  )
}
