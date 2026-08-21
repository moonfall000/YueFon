'use client'; 
import { useState } from 'react';
import { base } from '@/config';

export default function Navbar() {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    const isNowDark = document.documentElement.classList.toggle('dark');
    setIsDark(isNowDark);
  };

  return (
    // 終極修正：背景色與邊框線完全由 var(--card-bg) 與 var(--card-border) 控制，與首頁完美同盟！
    <nav 
      className="sticky top-0 z-50 border-b transition-all duration-300 shadow-sm"
      style={{ 
        backgroundColor: 'var(--card-bg)', 
        borderColor: 'var(--card-border)',
        color: 'var(--text)'
      }}
    >
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* 左側標題 */}
        <div className="flex items-center gap-2 font-bold text-xl">
          <span>🐱</span>
          <span>{base.title}</span>
        </div>
        
        {/* 右側選單 */}
        <div className="flex items-center gap-4 sm:gap-6 text-sm font-medium">
          
          {/* 切換按鈕 */}
          <button 
            onClick={toggleTheme}
            className="px-3 py-1.5 rounded-full transition-all border text-xs font-semibold"
            style={{
              backgroundColor: 'var(--background)',
              borderColor: 'var(--card-border)',
              color: isDark ? '#fbbf24' : '#334155' // 暗色時顯示金黃太陽，亮色時顯示深灰月亮
            }}
            title={isDark ? "切換至亮色模式" : "切換至暗色模式"}
          >
            {isDark ? '☀️ 亮色' : '🌙 暗色'}
          </button>

          {/* 導航連結：顏色直接跟隨 var(--text)，並在滑鼠懸停時給予初音綠點綴 */}
          <a href="#" className="transition opacity-80 hover:opacity-100 hover:text-emerald-500">首頁</a>
          <a href="#about" className="transition opacity-80 hover:opacity-100 hover:text-emerald-500">關於我</a>
          <a href="#portfolio" className="transition opacity-80 hover:opacity-100 hover:text-emerald-500">精選專案</a>
          <a href="#contest" className="transition opacity-80 hover:opacity-100 hover:text-emerald-500">競賽資歷</a>
        </div>
      </div>
    </nav>
  );
  {/*公告欄位*/}
  <Announcement />
}
