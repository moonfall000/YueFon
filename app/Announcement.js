// app/Announcement.js
'use client';

export default function Announcement() {
  // 🎨 十六進位色碼控制面板（你可以隨時修改這 6 個字元的色碼）
  const mainColor = '#21ee9c';     // 主要文字顏色
  const borderColor = '#f4d746dd'; // 上下細線顏色 (66 代表 40% 透明度)
  const bgColor = '#f59f0b05';     // 背景暈染顏色 (1a 代表 10% 透明度)

  return (
    <div 
      className="sticky top-20 z-50 max-w-[67.5vw] mx-auto mt-2 select-none backdrop-blur-md rounded-none border-y overflow-hidden shadow-lg"
      style={{ 
        borderColor: borderColor, 
        backgroundColor: bgColor
      }}
    >
      <div 
        className="w-full flex items-center h-9 text-xs font-bold tracking-wide"
        style={{ color: mainColor }}
      >
        {/* 左側固定標籤 */}
        <span 
          className="pl-4 pr-4 bg-slate-950/80 h-full flex items-center shrink-0 border-r z-20"
          style={{ borderColor: borderColor }}
        >
          📢 重要公告:
        </span>
        
        {/* 跑馬燈無限循環賽道 */}
        <div className="flex gap-8 whitespace-nowrap animate-[marquee_25s_linear_infinite] hover:[animation-play-state:paused] cursor-pointer">
          <span>【重要公告-遷移】原獨立專案2048catopenbox的雲端資料庫已成功併入本個人網站！老玩家帳號與紀錄皆已同步。請點擊精選專案或輸入子網址重新登入驗收，如發現帳號或開箱資料丟失，請盡快透過下方 Gmail 與我聯繫處理。</span>
          <span>【重要公告-遷移】原獨立專案2048catopenbox的雲端資料庫已成功併入本個人網站！老玩家帳號與紀錄皆已同步。請點擊精選專案或輸入子網址重新登入驗收，如發現帳號或開箱資料丟失，請盡快透過下方 Gmail 與我聯繫處理。</span>
        </div>
      </div>
    </div>
  );
}

          //【重要公告-遷移】原獨立專案2048catopenbox的雲端資料庫已成功併入本個人網站！老玩家帳號與紀錄皆已同步。請點擊精選專案或輸入子網址重新登入驗收，如發現帳號或開箱資料丟失，請盡快透過下方 Gmail 與我聯繫處理。
          //【重要公告-遷移】原獨立專案2048catopenbox的雲端資料庫已成功併入本個人網站！老玩家帳號與紀錄皆已同步。請點擊精選專案或輸入子網址重新登入驗收，如發現帳號或開箱資料丟失，請盡快透過下方 Gmail 與我聯繫處理。

//2026/8/20【重要公告-遷移】原獨立專案2048catopenbox的雲端資料庫已成功併入本個人網站！老玩家帳號與紀錄皆已同步。請點擊精選專案或輸入子網址重新登入驗收，如發現帳號或開箱資料丟失，請盡快透過下方 Gmail 與我聯繫處理。