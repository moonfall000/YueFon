'use client';
import { useState } from 'react';
import { hero, about, project, contest, social, tabinfo, friends } from '../config';
// 💡 功能 4：升級引入 Vercel 自訂數據事件追蹤晶片
import { Analytics, track } from "@vercel/analytics/next"

// 💡 玥楓專屬全球公開圖片子網址 (完整保留你的 SVG)
const avatarUrl = "https://yue-fon.vercel.app/YueFon.svg";

export default function Home() {
  const categories = Object.keys(tabinfo);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(categories[0]);

  // 💡 功能 3：特選群大佬裝弱互動計數器狀態
  const [weakCount, setWeakCount] = useState(0);

  // 💡 功能 3 & 4：點擊大老裝弱按鈕時的處理邏輯
  const handleWeakClick = () => {
    const newCount = weakCount + 1;
    setWeakCount(newCount);
    
    // 將數據即時傳回 Vercel 後台統計
    track('click_weak_button', { current_count: newCount });

    if (newCount === 100) {
      alert("🎉 恭喜！您已成功認證全校前 1% 生活科技大佬的低調裝弱行為！");
    }
  };

  // 💡 功能 4：點擊分頁標籤時追蹤使用者行為
  const handleTabChange = (cat) => {
    setActiveTab(cat);
    track('view_tab', { tab_name: cat });
  };

  return (
    // style 裡面的變數會自動根據 html 有沒有 .dark 去切換顏色
    <div className="font-sans pb-24 transition-colors duration-300" style={{ backgroundColor: 'var(--background)', color: 'var(--text)' }}>
      
      {/* 1. Hero 頂部主視覺 */}
      <header className="max-w-5xl mx-auto px-6 py-24 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1">
          <span className="text-emerald-500 font-semibold tracking-wider uppercase text-sm block mb-2">Welcome to My Space</span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">{hero.title}</h1>
          <p className="text-xl max-w-2xl mb-6 opacity-80">{hero.subtitle}</p>
          
          {/* 💡 功能 3：全新實裝的大老低調裝弱按鈕 UI */}
          <div className="mb-6 flex justify-center md:justify-start items-center gap-3">
            <button 
              onClick={handleWeakClick}
              className="px-3 py-1.5 text-xs font-bold rounded-full border bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/20 active:scale-95 transition-all duration-200"
            >
              點擊證明玥楓真的很弱 弱化層數：{weakCount} 層
            </button>
          </div>

          <div className="flex justify-center md:justify-start gap-4 text-sm font-medium">
            {/* 修改為：Instagram 專屬科技感炫彩漸層按鈕 */}
            <a href={social.instagram} target="_blank" className="px-4 py-2 bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600 text-white font-medium rounded-md shadow-lg shadow-pink-500/10 hover:shadow-pink-500/30 hover:brightness-110 active:scale-95 transition-all duration-200 border border-transparent">Instagram</a>
            <a href={social.github} target="_blank" className="px-4 py-2 bg-slate-800 text-white rounded-md hover:bg-slate-700 border border-slate-700 transition">GitHub</a>
            {/*<a href={social.linkedin} target="_blank" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition">LinkedIn</a>
            */}
            <a href={`mailto:${social.gmail}`} className="px-4 py-2 border rounded-md transition" style={{ borderColor: 'var(--card-border)' }}>Gmail</a>
          </div>
        </div>
        {/* 🛠️ 100% 保留你原有的完美大頭貼設定，objectPosition 依舊是 center -10px */}
        <div 
          onClick={() => setIsImageOpen(!isImageOpen)}
          className="w-44 h-44 rounded-full flex items-center justify-center shadow-xl overflow-hidden shrink-0 border-4 cursor-pointer hover:scale-105 transition-all duration-300" 
          style={{ borderColor: 'var(--card-border)' }}
        >
          <img 
            src={avatarUrl} 
            alt="玥楓" 
            onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerText = '🐱'; }}
            className="w-full h-full object-cover" 
            style={{ objectPosition: 'center -10px' }} 
          />
        </div>

        {/* 💡 全螢幕放大燈箱：當狀態為 true 時在最上層彈出 */}
        {isImageOpen && (
          <div 
            onClick={() => setIsImageOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-zoom-out"
          >
            <img 
              src={avatarUrl} 
              alt="完整頭像" 
              className="max-w-[90vw] max-h-[85vh] rounded-lg shadow-2xl object-contain border border-slate-800"
            />
          </div>
        )}
      </header>

      {/* 2. About 關於我 */}
      <section id="about" className="max-w-5xl mx-auto px-6 py-16 border-t" style={{ borderColor: 'var(--card-border)' }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <h2 className="text-2xl font-bold mb-2">關於我</h2>
            <p className="text-sm opacity-50 uppercase tracking-wider">About Me</p>
          </div>
          <div className="md:col-span-2">
            <p className="leading-relaxed mb-6 whitespace-pre-line opacity-80">{about.bio}</p>
            <div className="flex flex-wrap gap-2">
              {about.skills.map((skill, index) => (
                <span key={index} className="px-3 py-1 text-xs font-semibold rounded-full border bg-emerald-500/10 text-emerald-500 border-emerald-500/20">{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Tabinfo 程式貓經典分頁切換區塊 */}
      <section id="tabinfo" className="max-w-5xl mx-auto px-6 py-16 border-t" style={{ borderColor: 'var(--card-border)' }}>
        <h2 className="text-2xl font-bold mb-2">摘要</h2>
        <p className="text-sm opacity-50 uppercase tracking-wider mb-8">Core Summary</p>
        
        {/* 💡 功能 2：分頁按鈕導航列改為 handleTabChange 觸發追蹤 */}
        <div className="flex gap-2 mb-6 border-b relative" style={{ borderColor: 'var(--card-border)' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleTabChange(cat)}
              className={`px-4 py-2 text-sm font-bold transition-all relative z-10 duration-200 ${
                activeTab === cat ? 'text-emerald-500' : 'opacity-60 hover:opacity-100'
              }`}
            >
              {cat}
              {/* 💡 功能 2：App 級別底線溜過去平滑特效 (純 CSS 寬度過渡動畫) */}
              {activeTab === cat && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-emerald-500 rounded-full transition-all duration-300 animate-pulse" />
              )}
            </button>
          ))}
        </div>
        <div className="p-6 rounded-xl border shadow-sm transition-colors duration-300" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
          <ul className="space-y-3">
            {tabinfo[activeTab].content.map((text, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm opacity-90">
                <span className="text-emerald-500 mt-1">✔</span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. Project 精選專案 */}
      <section id="portfolio" className="max-w-5xl mx-auto px-6 py-16 border-t" style={{ borderColor: 'var(--card-border)' }}>
        <h2 className="text-2xl font-bold mb-2">精選專案</h2>
        <p className="text-sm opacity-50 uppercase tracking-wider mb-8">Featured Projects</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {project.map((item) => (
            {/* 💡 功能 1：卡片加上 3D 懸浮與發光陰影 (100% 融合你原有的 flex-col 排版與樣式) */}
            <div 
              key={item.id} 
              className="p-6 rounded-xl border shadow-sm transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:-translate-y-2 dark:hover:border-emerald-500/40 dark:hover:shadow-2xl dark:hover:shadow-emerald-500/10" 
              style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}
            >
              <div>
                <h3 className="text-lg font-bold mb-2">
                  {item.url ? (
                    <a 
                      href={item.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      onClick={() => track('click_project_link', { project_title: item.title })} // 💡 功能 4：追蹤專案點擊
                      className="inline-flex items-center gap-1 hover:text-emerald-500 transition-colors"
                    >
                      {item.title} <span className="text-xs opacity-60">↗</span>
                    </a> 
                  ) : (
                    item.title
                  )}
                </h3>
                <p className="text-sm mb-4 leading-relaxed opacity-70">{item.desc}</p>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {item.tech.map((t, idx) => (
                  <span key={idx} className="px-2 py-0.5 text-xs rounded border bg-slate-500/10 text-slate-400 border-slate-500/20">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Contest 競賽資歷 (完美渲染 level 欄位版，並補上手機版防折行擠壓) */}
      <section id="contest" className="max-w-5xl mx-auto px-6 py-16 border-t" style={{ borderColor: 'var(--card-border)' }}>
        <h2 className="text-2xl font-bold mb-2">競賽與認證資歷</h2>
        <p className="text-sm opacity-50 uppercase tracking-wider mb-8">Contests & Certifications</p>
        <div className="space-y-4">
          {contest.map((item, index) => (
            <div key={index} className="p-5 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-300" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
              <div>
                {/* 💡 加上 flex-wrap 讓手機版自適應斷行，標籤絕對不會重疊擠壓 */}
                <div className="flex flex-wrap items-start sm:items-center gap-3 mb-1.5">
                  <h3 className="text-md font-bold leading-tight break-words">{item.name}</h3>
                  {item.level && (
                    <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-xs font-semibold rounded shrink-0">
                      {item.level}
                    </span>
                  )}
                  <span className="px-2 py-0.5 text-xs font-medium rounded border bg-amber-500/10 text-amber-500 border-amber-500/20 shrink-0">{item.rank}</span>
                </div>
                <p className="text-sm opacity-60 leading-relaxed">{item.about}</p>
              </div>
              {item.official && (
                <a 
                  href={item.official} 
                  target="_blank" 
                  onClick={() => track('click_contest_link', { contest_name: item.name })} // 💡 功能 4：追蹤官網點擊
                  className="text-xs font-medium underline text-emerald-500 hover:text-emerald-400 shrink-0"
                >
                  官方網站 ↗
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 6. Friends 友情連結區塊 (徹底解鎖 truncate 換行，拒絕三個點) */}
      {friends && friends.length > 0 && (
        <section id="friends" className="max-w-5xl mx-auto px-6 py-16 border-t" style={{ borderColor: 'var(--card-border)' }}>
          <h2 className="text-2xl font-bold mb-2">友情連結</h2>
          <p className="text-sm opacity-50 uppercase tracking-wider mb-8">Friends & Links</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {friends.map((friend, index) => (
              <a 
                key={index}
                href={friend.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('click_friend_link', { friend_name: friend.name })} // 💡 功能 4：追蹤朋友點擊
                className="p-4 rounded-xl border shadow-sm transition-all duration-300 hover:-translate-y-1 flex items-center gap-4 hover:border-emerald-500/50"
                style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg overflow-hidden shrink-0 bg-slate-500/10 border" style={{ borderColor: 'var(--card-border)' }}>
                  <img 
                    src={friend.image || "/globe.svg"} 
                    alt="🔗" 
                    onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerText = '🔗'; }}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* 💡 關鍵修正：徹底拿掉卡死文字的 truncate 限制，改用 break-words 和 whitespace-pre-wrap 自由換行 */}
                <div className="flex-1 min-w-0 break-words">
                  <div className="font-bold text-sm text-emerald-500 mb-0.5 hover:text-emerald-400 leading-snug">
                    {friend.name}
                  </div>
                  <p className="text-xs opacity-60 leading-relaxed whitespace-pre-wrap">
                    {friend.desc}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Vercel 流量統計監控晶片 */}
      <Analytics />

    </div>
  );
}
