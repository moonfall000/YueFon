// components/CounterButton.js (共 58 行)
import React, { useState, useEffect, useCallback } from 'react';

export default function CounterButton() {
  const [totalClicks, setTotalClicks] = useState(0);
  const [isClicking, setIsClicking] = useState(false);

  const baseUrl = 'https://okdsrghwbrvreupuxszc.supabase.co';
  const anonKey = 'sb_publishable_7JdIjohyqQx_oVigJnRT9Q_8bXGXn5n';

  // 📡 實時總數撈取
  const fetchTotalClicks = useCallback(async () => {
    try {
      const res = await fetch(`${baseUrl}/rest/v1/site_counter?select=id`, {
        method: 'GET',
        headers: { 
          'apikey': anonKey, 
          'Authorization': `Bearer ${anonKey}`,
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        }
      });
      if (res.ok) {
        const data = await res.json();
        setTotalClicks(data.length); // 🟢 實時更新網頁總數面板！
      }
    } catch (err) { console.error('撈取計數失敗:', err.message); }
  }, []);

  // 🎯 核心落子：滑鼠點擊的那一秒，秒速發送純原生 POST 砸進資料表！
  const handleButtonClick = async () => {
    if (isClicking) return;
    setIsClicking(true);
    try {
      const res = await fetch(`${baseUrl}/rest/v1/site_counter`, {
        method: 'POST',
        headers: { 
          'apikey': anonKey, 
          'Authorization': `Bearer ${anonKey}`,
          'Content-Type': 'application/json',
          'Content-Profile': 'public', // 🟢 終極修正：補齊這根核心指引引線，一拳秒殺網關找不到路由的 404 地雷！
          'Prefer': 'return=representation'
        },
        body: JSON.stringify({}) // 📡 0 欄位負擔，直接塞入空物件生成一條新時間戳行數！
      });
      if (res.ok) {
        await fetchTotalClicks(); // 📡 實時連鎖：上傳完的萬分之一秒，就地強行重整總數！
      }
    } catch (err) { console.error('計數同步失敗:', err.message); }
    finally { setIsClicking(false); }
  };

  useEffect(() => { fetchTotalClicks(); }, [fetchTotalClicks]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '20px 0' }}>
      <button
        onClick={handleButtonClick}
        disabled={isClicking}
        style={{ padding: '12px 24px', fontSize: '1.1rem', fontWeight: '800', background: 'linear-gradient(to right, #10b981, #059669)', color: 'white', border: 'none', borderRadius: '12px', cursor: isClicking ? 'not-allowed' : 'pointer', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.3)', transition: 'all 0.1s ease', outline: 'none' }}
        onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
        onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        {isClicking ? '🚀 計數同步中...' : '簽到計數'}
      </button>
      <p style={{ fontSize: '0.9rem', color: '#94a3b8', margin: 0, fontFamily: 'monospace' }}>
        🔥 全網累計真實點擊次數：<span style={{ color: '#4ade80', fontWeight: 'bold', fontSize: '1.2rem' }}>{totalClicks}</span> 次
      </p>
    </div>
  );
}
