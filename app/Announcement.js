// app/Announcement.js
'use client';

export default function Announcement() {
  return (
    <div className="sticky top-0 z-50 w-full select-none backdrop-blur-md bg-amber-500/10 border-b overflow-hidden" style={{ borderColor: 'var(--card-border)' }}>
      {/* 💡 跑馬燈軌道：利用 flex 和 animate-marquee 實現一行流暢無限橫向滑動 */}
      <div className="w-full flex items-center h-10 text-xs font-bold text-amber-500 tracking-wide">
        <span className="px-4 bg-slate-950/80 h-full flex items-center shrink-0 border-r z-20" style={{ borderColor: 'var(--card-border)' }}>📢 重要公告:</span>
        
        {/* 跑馬燈動畫本體 */}
        <div className="flex gap-8 whitespace-nowrap animate-[marquee_25s_linear_infinite] hover:[animation-play-state:paused] cursor-pointer">
          <span>【重要公告-遷移】原獨立專案2048catopenbox的雲端資料庫已成功併入本個人網站！老玩家帳號與紀錄皆已同步。請點擊精選專案或輸入子網址重新登入驗收，如發現帳號或開箱資料丟失，請盡快透過下方 Gmail 與我聯繫處理。</span>
          {/* 💡 複製第二組達成無縫接軌無限循環 */}
          <span>【重要公告-遷移】原獨立專案2048catopenbox的雲端資料庫已成功併入本個人網站！老玩家帳號與紀錄皆已同步。請點擊精選專案或輸入子網址重新登入驗收，如發現帳號或開箱資料丟失，請盡快透過下方 Gmail 與我聯繫處理。</span>
        </div>
      </div>
    </div>
  );
}





//2026/8/20【重要公告-遷移】原獨立專案2048catopenbox的雲端資料庫已成功併入本個人網站！老玩家帳號與紀錄皆已同步。請點擊精選專案或輸入子網址重新登入驗收，如發現帳號或開箱資料丟失，請盡快透過下方 Gmail 與我聯繫處理。