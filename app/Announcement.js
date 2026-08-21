// app/Announcement.js
'use client';

export default function Announcement() {
  return (
    /* 💡 80% 置中懸浮核心：
       1. mt-2：讓它跟上方的 Navbar 保持一點精緻的懸浮空隙。
       2. max-w-[80vw] mx-auto：寬度死死鎖定在全螢幕的 80% 並且自動左右置中。
       3. rounded-full：兩端長出完美的膠囊圓角。 */
    <div className="sticky top-16 z-50 max-w-[80vw] mx-auto mt-2 select-none backdrop-blur-md bg-amber-500/10 border rounded-full overflow-hidden shadow-lg shadow-amber-500/5" style={{ borderColor: 'var(--card-border)' }}>
      <div className="w-full flex items-center h-9 text-xs font-bold text-amber-500 tracking-wide">
        {/* 左側固定標籤也一併換成漂亮的圓角防漏 */}
        <span className="pl-5 pr-4 bg-slate-950/80 h-full flex items-center shrink-0 border-r z-20" style={{ borderColor: 'var(--card-border)' }}>📢 重要公告:</span>
        <div className="flex gap-8 whitespace-nowrap animate-[marquee_25s_linear_infinite] hover:[animation-play-state:paused] cursor-pointer">
          
          <span>【重要公告-遷移】原獨立專案2048catopenbox的雲端資料庫已成功併入本個人網站！老玩家帳號與紀錄皆已同步。請點擊精選專案或輸入子網址重新登入驗收，如發現帳號或開箱資料丟失，請盡快透過下方 Gmail 與我聯繫處理。</span>
          <span>【重要公告-遷移】原獨立專案2048catopenbox的雲端資料庫已成功併入本個人網站！老玩家帳號與紀錄皆已同步。請點擊精選專案或輸入子網址重新登入驗收，如發現帳號或開箱資料丟失，請盡快透過下方 Gmail 與我聯繫處理。</span>
        
        </div>
      </div>
    </div>
  );
}





//2026/8/20【重要公告-遷移】原獨立專案2048catopenbox的雲端資料庫已成功併入本個人網站！老玩家帳號與紀錄皆已同步。請點擊精選專案或輸入子網址重新登入驗收，如發現帳號或開箱資料丟失，請盡快透過下方 Gmail 與我聯繫處理。