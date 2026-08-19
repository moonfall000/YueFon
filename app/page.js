'use client';
import { useState } from 'react';
import { hero, about, project, contest, social, tabinfo, friends } from '../config';
import { Analytics } from "@vercel/analytics/next"

// 💡 頭像網址（你可以隨時換成你親手連好的正確子網址）
const avatarUrl = "https://yue-fon.vercel.app/YueFon.svg";

export default function Home() {
  const categories = Object.keys(tabinfo);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(categories[0]);
  const [weakCount, setWeakCount] = useState(0);

  return (
    <div className="font-sans pb-24 transition-colors duration-300" style={{ backgroundColor: 'var(--background)', color: 'var(--text)' }}>
      
      {/* 1. Hero 頂部主視覺 */}
      <header className="max-w-5xl mx-auto px-6 py-24 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1">
          <span className="text-emerald-500 font-semibold tracking-wider uppercase text-sm block mb-2">Welcome to My Space</span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">{hero.title}</h1>
          <p className="text-xl max-w-2xl mb-6 opacity-80">{hero.subtitle}</p>
          
          <div className="mb-6 flex justify-center md:justify-start items-center gap-3">
            <button 
              onClick={() => {
                const nextCount = weakCount + 1;
                setWeakCount(nextCount);
                if (nextCount === 100) alert("🎉 恭喜！您已成功認證低調裝弱行為！");
              }}
              className="px-3 py-1.5 text-xs font-bold rounded-full border bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/20 active:scale-95 transition-all duration-200"
            >
              點擊證明玥楓真的很弱 弱化層數：{weakCount} 層
            </button>
          </div>

          <div className="flex justify-center md:justify-start gap-4 text-sm font-medium">
            <a href={social.instagram} target="_blank" className="px-4 py-2 bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600 text-white font-medium rounded-md shadow-lg shadow-pink-500/10 hover:shadow-pink-500/30 hover:brightness-110 active:scale-95 transition-all duration-200 border border-transparent">Instagram</a>
            <a href={social.github} target="_blank" className="px-4 py-2 bg-slate-800 text-white rounded-md hover:bg-slate-700 border border-slate-700 transition">GitHub</a>
            <a href={`mailto:${social.gmail}`} className="px-4 py-2 border rounded-md transition" style={{ borderColor: 'var(--card-border)' }}>Gmail</a>
          </div>
        </div>
        
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

            {/* 3. Tabinfo 摘要 */}
      <section id="tabinfo" className="max-w-5xl mx-auto px-6 py-16 border-t" style={{ borderColor: 'var(--card-border)' }}>
        <h2 className="text-2xl font-bold mb-2">摘要</h2>
        <p className="text-sm opacity-50 uppercase tracking-wider mb-8">Core Summary</p>
        
        {/* 💡 大師級動態外框：移除 grid-cols-6，改用 flex flex-wrap 搭配 gap-2。未來不論你在 config.js 塞幾個分頁，它都會自己排好、永遠不破圖！ */}
        <div className="flex flex-wrap gap-2 mb-6 border-b relative" style={{ borderColor: 'var(--card-border)' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 text-sm font-bold relative transition-all duration-300 ${
                activeTab === cat ? 'text-emerald-500' : 'opacity-60 hover:opacity-100'
              }`}
            >
              {cat}
              {/* 💡 全自動動態寬度滑軌：底線直接鎖在按鈕自己的底部（left-0 right-0 吃滿 100% 寬度）。切換時舊的縮小淡出、新的像磁浮列車一樣從中間向左右平滑滑動長出來！ */}
              <span 
                className={`absolute bottom-0 left-0 right-0 h-[2px] bg-emerald-500 rounded-full transition-all duration-300 ease-out origin-center ${
                  activeTab === cat ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
                }`} 
              />
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
            <div 
              key={item.id} 
              className="p-6 rounded-xl border shadow-sm transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:-translate-y-2 dark:hover:border-emerald-500/40 dark:hover:shadow-2xl dark:hover:shadow-emerald-500/10" 
              style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}
            >
              <div>
                <h3 className="text-lg font-bold mb-2">
                  {item.url ? (
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-emerald-500 transition-colors">
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
      {/* 5. Contest 競賽資歷 */}
      <section id="contest" className="max-w-5xl mx-auto px-6 py-16 border-t" style={{ borderColor: 'var(--card-border)' }}>
        <h2 className="text-2xl font-bold mb-2">競賽與認證資歷</h2>
        <p className="text-sm opacity-50 uppercase tracking-wider mb-8">Contests & Certifications</p>
        <div className="space-y-4">
          {contest.map((item, index) => (
            <div key={index} className="p-5 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-300" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
              <div>
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
              {item.official && <a href={item.official} target="_blank" className="text-xs font-medium underline text-emerald-500 hover:text-emerald-400 shrink-0">官方網站 ↗</a>}
            </div>
          ))}
        </div>
      </section>
      {/* 6. Friends 友情連結 */}
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
                <div className="flex-1 min-w-0 break-words">
                  <div className="font-bold text-sm text-emerald-500 mb-0.5 hover:text-emerald-400 leading-snug">{friend.name}</div>
                  <p className="text-xs opacity-60 leading-relaxed whitespace-pre-wrap">{friend.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      <Analytics />

    </div>
  );
}
