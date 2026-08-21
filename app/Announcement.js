// app/Announcement.js
'use client';

export default function Announcement() {
  return (
    /* 💡 80% 直角金黃雙線核心：
       1. max-w-[80vw] mx-auto mt-2：維持 80% 寬度、左右自動置中，並與 Navbar 保持微幅懸浮。
       2. rounded-none：徹底拔除圓角，回歸最俐落的硬核直角。
       3. border-y border-amber-500/40：精確在上下各拉出一條發光的金黃色細線。 */
    <div className="sticky top-16 z-50 max-w-[80vw] mx-auto mt-2 select-none backdrop-blur-md bg-amber-500/10 rounded-none border-y border-amber-500/40 overflow-hidden shadow-lg shadow-amber-500/5">
      <div className="w-full flex items-center h-9 text-xs font-bold text-amber-500 tracking-wide">
        {/* 左側固定標籤：右邊框維持與整條公告連動的金黃細線 */}
        <span className="pl-4 pr-4 bg-slate-950/80 h-full flex items-center shrink-0 border-r border-amber-500/30 z-20">📢 重要公告:</span>

        <div className="flex gap-8 whitespace-nowrap animate-[marquee_25s_linear_infinite] hover:[animation-play-state:paused] cursor-pointer">
          
          <span>【重要公告-遷移】原獨立專案2048catopenbox的雲端資料庫已成功併入本個人網站！老玩家帳號與紀錄皆已同步。請點擊精選專案或輸入子網址重新登入驗收，如發現帳號或開箱資料丟失，請盡快透過下方 Gmail 與我聯繫處理。</span>
          <span>【重要公告-遷移】原獨立專案2048catopenbox的雲端資料庫已成功併入本個人網站！老玩家帳號與紀錄皆已同步。請點擊精選專案或輸入子網址重新登入驗收，如發現帳號或開箱資料丟失，請盡快透過下方 Gmail 與我聯繫處理。</span>
        
        </div>
      </div>
    </div>
  );
}





//2026/8/20【重要公告-遷移】原獨立專案2048catopenbox的雲端資料庫已成功併入本個人網站！老玩家帳號與紀錄皆已同步。請點擊精選專案或輸入子網址重新登入驗收，如發現帳號或開箱資料丟失，請盡快透過下方 Gmail 與我聯繫處理。