// app/Announcement.js
'use client';

export default function Announcement() {
  return (
    /* 💡 置頂核心：sticky 搭配 top-0，加上 z-50 確保它永遠踩在 3D 卡片跟頭像的頭頂，絕不被遮擋 */
    <div className="sticky top-0 z-50 w-full select-none backdrop-blur-md bg-background/80 py-3 border-b" style={{ borderColor: 'var(--card-border)' }}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-start gap-3 shadow-lg shadow-amber-500/5">
          <span className="text-xl animate-bounce mt-0.5">📢</span>
          <div className="flex-1 text-sm leading-relaxed text-amber-500/90 font-medium whitespace-pre-line">

          <span className="font-bold text-amber-500">【重要公告-遷移】</span> 
          原獨立專案2048catopenbox的雲端資料庫已成功併入本個人網站！老玩家帳號與紀錄皆已同步。請點擊精選專案或輸入子網址重新登入驗收，如發現帳號或開箱資料丟失，請盡快透過下方 Gmail 與我聯繫處理。
        
        
        </div>
      </div>
    </div>
  );
}
