import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"
import Modal from "../components/Modal"

export const AppLayout = () => {
  return (
    <>
    <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 p-6 overflow-auto relative">
            <Outlet/>
            <Modal/>
        </main>
    </div>

    </>
  )
}
