import Sidebar from "./Sidebar"

export const AppLayput = () => {
  return (
    <>
    <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6">
            <h1 className="text-xl">main area</h1>
        </div>
    </div>

    </>
  )
}
