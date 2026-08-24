// components/CounterButton.js
import React, { useState, useEffect, useCallback } from 'react';
// 🟢 鋼鐵定錨：1:1 對齊妳搬移到根目錄最驕傲的 supabase.js 原生大腦金身！
// 透過它，不管妳專案的真實網址跟金鑰是什麼，它都會自動幫妳對接正確的雲端機房，徹底消滅 404 穿越！
import { supabase } from '../supabase.js'; 

export default function CounterButton() {
  const [totalClicks, setTotalClicks] = useState(0);
  const [isClicking, setIsClicking] = useState(false);

  // 📡 實時總數撈取：利用根目錄模擬器直接撈取 site_counter，0 閘道快取副作用！
  const fetchTotalClicks = useCallback(async () => {
    try {
      const { data, error } = await supabase.from('site_counter').select('id');
      if (!error && data) {
        setTotalClicks(data.length); // 🟢 實時更新網頁總數面板！
      }
    } catch (err) { console.error('撈取計數失敗:', err.message); }
  }, []);

  // 🎯 核心落子：滑鼠一點，秒速呼叫模擬器 insert 砸進資料表，並就地驚醒刷新！
  const handleButtonClick = async () => {
    if (isClicking) return;
    setIsClicking(true);
    try {
      // 🟢 徹底接通：直接傳送純空物件給模擬器，生成一條新時間戳行數
      const { error } = await supabase.from('site_counter').insert({});
      if (!error) {
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
        🔥 累計點擊次數：<span style={{ color: '#4ade80', fontWeight: 'bold', fontSize: '1.2rem' }}>{totalClicks}</span> 次
      </p>
    </div>
  );
}
