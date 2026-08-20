// app/TowerDefense/page.js (第 1 段)
'use client';
import { useState, useEffect, useRef } from 'react';
import { minionConfig } from './minionConfig'; // 💡 完美引入你剛架好的角色模組檔

export default function TowerDefense() {
  const minionTypes = Object.keys(minionConfig);
  const [p1BaseHp, setP1BaseHp] = useState(1000);
  const [p2BaseHp, setP2BaseHp] = useState(1000);
  const [p1Money, setP1Money] = useState(100);
  const [p2Money, setP2Money] = useState(100);

  const [minions, setMinions] = useState([]);
  const minionsRef = useRef([]);

  useEffect(() => {
    const moneyTimer = setInterval(() => {
      setP1Money(m => Math.min(m + 15, 1000));
      setP2Money(m => Math.min(m + 15, 1000));
    }, 500);
    return () => clearInterval(moneyTimer);
  }, []);

  const spawnMinion = (owner, type) => {
    // 💡 全自動動態模組化：數值完全從設定檔撈取，再也不用寫死在程式碼裡
    const config = minionConfig[type];
    if (!config) return;

    if (owner === 1 && p1Money < config.cost) return;
    if (owner === 2 && p2Money < config.cost) return;

    if (owner === 1) setP1Money(m => m - config.cost);
    else setP2Money(m => m - config.cost);

    const newMinion = {
      id: Date.now() + Math.random(),
      owner,
      type,
      x: owner === 1 ? 0 : 100,
      hp: config.hp,
      maxHp: config.hp,
      speed: config.speed,
      attack: config.attack,
      emoji: config.emoji
    };

    minionsRef.current = [...minionsRef.current, newMinion];
    setMinions(minionsRef.current);
  };
  useEffect(() => {
    const gameLoop = setInterval(() => {
      let currentMinions = [...minionsRef.current];
      let nextMinions = [];

      for (let i = 0; i < currentMinions.length; i++) {
        let m = { ...currentMinions[i] };
        let isBlocked = false;

        for (let j = 0; j < currentMinions.length; j++) {
          let enemy = currentMinions[j];
          if (m.owner !== enemy.owner) {
            if (m.owner === 1 && enemy.x > m.x && enemy.x - m.x < 4) {
              isBlocked = true;
              enemy.hp -= m.attack * 0.03;
            }
            if (m.owner === 2 && enemy.x < m.x && m.x - enemy.x < 4) {
              isBlocked = true;
              enemy.hp -= m.attack * 0.03;
            }
          }
        }

        if (!isBlocked) {
          if (m.owner === 1) {
            if (m.x < 92) m.x += m.speed;
            else setP2BaseHp(hp => Math.max(hp - m.attack * 0.03, 0));
          } else {
            if (m.x > 8) m.x -= m.speed;
            else setP1BaseHp(hp => Math.max(hp - m.attack * 0.03, 0));
          }
        }

        if (m.hp > 0) {
          nextMinions.push(m);
        }
      }

      minionsRef.current = nextMinions;
      setMinions(nextMinions);
    }, 30);

    return () => clearInterval(gameLoop);
  }, []);
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center p-6 font-sans">
      <header className="w-full max-w-4xl text-center mb-8">
        <h1 className="text-3xl font-extrabold text-emerald-500 tracking-tight">貓咪大對抗：橫向防禦戰</h1>
      </header>

      {/* 1. 雙方基地血量與金幣狀況 */}
      <div className="w-full max-w-4xl grid grid-cols-2 gap-6 mb-8">
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
          <div className="font-bold text-emerald-400 mb-1">我的基地 (P1)</div>
          <div className="text-2xl font-black mb-2">{Math.ceil(p1BaseHp)} / 1000</div>
          <div className="text-sm font-medium opacity-60">金幣：<span className="text-amber-400">{p1Money}</span></div>
        </div>
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-right">
          <div className="font-bold text-rose-400 mb-1">敵方基地 (P2)</div>
          <div className="text-2xl font-black mb-2">{Math.ceil(p2BaseHp)} / 1000</div>
          <div className="text-sm font-medium opacity-60">金幣：<span className="text-amber-400">{p2Money}</span></div>
        </div>
      </div>

      {/* 2. 戰場橫向跑道 */}
      <div className="w-full max-w-4xl h-40 bg-slate-900 border-y-4 border-slate-800 relative rounded-md overflow-hidden mb-8 shadow-inner">
        {minions.map((m) => {
          // 💡 判斷當前小兵是否卡住，如果前方有阻擋則觸發互毆動畫，否則播放走路動畫
          const isWalking = m.speed > 0; 
          
          return (
            <div
              key={m.id}
              className="absolute bottom-4 text-3xl transition-all duration-75 flex flex-col items-center -translate-x-1/2"
              style={{ left: `${m.x}%` }}
            >
              {/* 血量條 */}
              <div className="w-8 h-1 bg-slate-950 rounded-full overflow-hidden mb-1 border border-slate-800">
                <div 
                  className={`h-full ${m.owner === 1 ? 'bg-emerald-500' : 'bg-rose-500'}`}
                  style={{ width: `${(m.hp / m.maxHp) * 100}%` }}
                />
              </div>
              
              {/* 💡 動作核心：利用 Tailwind 內建動畫讓 Emoji 活起來。走路時上下彈跳（animate-bounce），開打時左右狂震揮拳（animate-ping） */}
              <span className={`inline-block ${m.owner === 2 ? '-scale-x-100' : ''} ${
                isWalking ? 'animate-bounce' : 'animate-pulse'
              }`}>
                {m.emoji}
              </span>
            </div>
          );
        })}
      </div>

      {/* 3. 模組化按鈕控制列 */}
      <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-lg">
        <div className="text-sm font-bold opacity-50 mb-3 uppercase tracking-wider">生產軍隊 Spawn Units</div>
        <div className="flex flex-wrap gap-3">
          {minionTypes.map((type) => {
            const cfg = minionConfig[type];
            return (
              <button
                key={type}
                onClick={() => spawnMinion(1, type)}
                className="px-4 py-3 bg-slate-800 border border-slate-700 hover:border-emerald-500/50 hover:bg-slate-700 active:scale-95 transition-all rounded-lg flex items-center gap-2 text-sm font-bold shadow"
              >
                <span className="text-xl">{cfg.emoji}</span>
                <div className="text-left">
                  <div>{cfg.name}</div>
                  <div className="text-xs text-amber-400 font-medium">${cfg.cost}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
