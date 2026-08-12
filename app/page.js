'use client';
import { useState } from 'react';
import { hero, about, project, contest, social, tabinfo, friends } from '../config';
import { Analytics } from "@vercel/analytics/next"


// 💡 玥楓專屬全球公開圖片子網址
const avatarUrl = "https://yue-fon.vercel.app/YueFon.svg";


export default function Home() {
  const categories = Object.keys(tabinfo);
    // 補在 categories 下方：控制頭像放大狀態
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(categories[0]);

  return (
    // style 裡面的變數會自動根據 html 有沒有 .dark 去切換顏色
    <div className="font-sans pb-24 transition-colors duration-300" style={{ backgroundColor: 'var(--background)', color: 'var(--text)' }}>
      
      {/* 1. Hero 頂部主視覺 */}
      <header className="max-w-5xl mx-auto px-6 py-24 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1">
          <span className="text-emerald-500 font-semibold tracking-wider uppercase text-sm block mb-2">Welcome to My Space</span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">{hero.title}</h1>
          <p className="text-xl max-w-2xl mb-6 opacity-80">{hero.subtitle}</p>
          <div className="flex justify-center md:justify-start gap-4 text-sm font-medium">
            {/* 修改為：Instagram 專屬科技感炫彩漸層按鈕 */}
            <a href={social.instagram} target="_blank" className="px-4 py-2 bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600 text-white font-medium rounded-md shadow-lg shadow-pink-500/10 hover:shadow-pink-500/30 hover:brightness-110 active:scale-95 transition-all duration-200 border border-transparent">Instagram</a>
            <a href={social.github} target="_blank" className="px-4 py-2 bg-slate-800 text-white rounded-md hover:bg-slate-700 border border-slate-700 transition">GitHub</a>
            <a href={social.linkedin} target="_blank" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition">LinkedIn</a>
            <a href={`mailto:${social.email}`} className="px-4 py-2 border rounded-md transition" style={{ borderColor: 'var(--card-border)' }}>Email Me</a>
          </div>
        </div>
                {/* 🛠️ 貓咪正式退場！換成能自動讀取最上方 avatarUrl 網址的真實大頭貼標籤 */}
                {/* 🛠️ 大頭貼自由微調版：修改 '??px' 就可以控制圖片往上下移的距離 */}
                {/* 🛠️ 大頭貼區塊：點擊切換 isImageOpen 狀態 */}
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
            style={{ objectPosition: 'center -10px' }} //💡 20px 代表「從頂部往下移動 20 像素」，你可以改成 10px、15px、30px 自己調到爽！
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


        {/*<div className="w-44 h-44 bg-gradient-to-tr from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white text-6xl shadow-xl">🐱</div>*/}
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
        
        <div className="flex gap-2 mb-6 border-b" style={{ borderColor: 'var(--card-border)' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 text-sm font-bold border-b-2 transition-all duration-200 ${
                activeTab === cat ? 'border-emerald-500 text-emerald-500' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              {cat}
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
            <div key={item.id} className="p-6 rounded-xl border shadow-sm transition-all duration-300 flex flex-col justify-between" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
              <div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm mb-4 leading-relaxed opacity-70">{item.desc}</p>
                <a key={index} href={project.url} target="_blank" rel="noopener noreferrer" 
                className="p-4 rounded-xl border shadow-sm transition-all duration-300 hover:-translate-y-1 flex items-center gap-4 hover:border-emerald-500/50"
                style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }} ></a>
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

            {/* 5. Contest 競賽資歷 (完美渲染 level 欄位版) */}
      <section id="contest" className="max-w-5xl mx-auto px-6 py-16 border-t" style={{ borderColor: 'var(--card-border)' }}>
        <h2 className="text-2xl font-bold mb-2">競賽與認證資歷</h2>
        <p className="text-sm opacity-50 uppercase tracking-wider mb-8">Contests & Certifications</p>
        <div className="space-y-4">
          {contest.map((item, index) => (
            <div key={index} className="p-5 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-300" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <h3 className="text-md font-bold">{item.name}</h3>
                  {/* 💡 這裡會自動去抓 item.level，並生出一個漂亮精緻的小標籤 */}
                  {item.level && (
                    <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-xs font-semibold rounded">
                      {item.level}
                    </span>
                  )}
                  <span className="px-2 py-0.5 text-xs font-medium rounded border bg-amber-500/10 text-amber-500 border-amber-500/20">{item.rank}</span>
                </div>
                <p className="text-sm opacity-60">{item.about}</p>
              </div>
              {item.official && <a href={item.official} target="_blank" className="text-xs font-medium underline text-emerald-500 hover:text-emerald-400 shrink-0">官方網站 ↗</a>}
            </div>
          ))}
        </div>
      </section>

            {/* 6. Friends 友情連結區塊 (完整頭像支援版) */}
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
                {/* 1. 左側：朋友的大頭貼圖片，如果沒給網址或讀取失敗，會自動用 🔗 替代 */}
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg overflow-hidden shrink-0 bg-slate-500/10 border" style={{ borderColor: 'var(--card-border)' }}>
                  <img 
                    src={friend.image || "/globe.svg"} 
                    alt="🔗" 
                    onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerText = '🔗'; }}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* 2. 右側：朋友網站名稱與簡介 */}
                <div className="truncate">
                  <div className="font-bold text-sm text-emerald-500 mb-0.5 truncate hover:text-emerald-400">
                    {friend.name}
                  </div>
                  <p className="text-xs opacity-60 truncate">{friend.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
