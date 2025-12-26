const LazyNextData = () => {
  return (
    <div className="flex flex-col items-center gap-5">
        <div className="flex flex-col gap-2 mt-5 text-xl">
            <h1>現在の予定</h1>
            <li>資料作成</li>
            <li>優先度：高</li>
            <li>作業時間:20分</li>
        </div>
        <div className="flex flex-col gap-2 text-xl">
            <h1>次の予定</h1>
            <li>コーディング</li>
            <li>優先度：高</li>
            <li>作業時間:20分</li>
        </div>
    </div>
  )
}

export default LazyNextData