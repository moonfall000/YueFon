'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

const CHEST_LEVEL_CONFIGS = {
  1: { cost: 100, rates: { '普通': 1.00, '優秀': 0.00, '精良': 0.00, '史詩': 0.00, '傳說': 0.00, '神話': 0.00, '不朽': 0.00, '超越': 0.00, '鎏金': 0.00, '永恆': 0.00, '至尊': 0 } },
  2: { cost: 300, rates: { '普通': 0.85, '優秀': 0.10, '精良': 0.05, '史詩': 0.00, '傳說': 0.00, '神話': 0.00, '不朽': 0.00, '超越': 0.00, '鎏金': 0.00, '永恆': 0.00, '至尊': 0 } },
  3: { cost: 800, rates: { '普通': 0.70, '優秀': 0.20, '精良': 0.08, '史詩': 0.02, '傳說': 0.00, '神話': 0.00, '不朽': 0.00, '超越': 0.00, '鎏金': 0.00, '永恆': 0.00, '至尊': 0 } },
  4: { cost: 2000, rates: { '普通': 0.55, '優秀': 0.25, '精良': 0.12, '史詩': 0.06, '傳說': 0.02, '神話': 0.00, '不朽': 0.00, '超越': 0.00, '鎏金': 0.00, '永恆': 0.00, '至尊': 0 } },
  5: { cost: 5000, rates: { '普通': 0.40, '優秀': 0.25, '精良': 0.18, '史詩': 0.10, '傳說': 0.05, '神話': 0.02, '不朽': 0.00, '超越': 0.00, '鎏金': 0.00, '永恆': 0.00, '至尊': 0 } },
  6: { cost: 10000, rates: { '普通': 0.25, '優秀': 0.25, '精良': 0.22, '史詩': 0.15, '傳說': 0.08, '神話': 0.04, '不朽': 0.01, '超越': 0.00, '鎏金': 0.00, '永恆': 0.00, '至尊': 0 } },
  7: { cost: 18000, rates: { '普通': 0.12, '優秀': 0.25, '精良': 0.25, '史詩': 0.18, '傳說': 0.12, '神話': 0.06, '不朽': 0.018, '超越': 0.002, '鎏金': 0.00, '永恆': 0.00, '至尊': 0 } },
  8: { cost: 30000, rates: { '普通': 0.05, '優秀': 0.20, '精良': 0.28, '史詩': 0.22, '傳說': 0.15, '神話': 0.07, '不朽': 0.025, '超越': 0.004, '鎏金': 0.001, '永恆': 0.00, '至尊': 0 } },
  9: { cost: 50000, rates: { '普通': 0.00, '優秀': 0.15, '精良': 0.30, '史詩': 0.25, '傳說': 0.18, '神話': 0.08, '不朽': 0.032, '超越': 0.006, '鎏金': 0.0018, '永恆': 0.0002, '至尊': 0 } },
  10: { cost: 85000, rates: { '普通': 0.00, '優秀': 0.08, '精良': 0.32, '史詩': 0.28, '傳說': 0.20, '神話': 0.085, '不朽': 0.028, '超越': 0.0052, '鎏金': 0.0015, '永恆': 0.0003, '至尊': 0 } },
  11: { cost: 140000, rates: { '普通': 0.00, '優秀': 0.00, '精良': 0.35, '史詩': 0.30, '傳說': 0.22, '神話': 0.09, '不朽': 0.032, '超越': 0.0065, '鎏金': 0.0012, '永恆': 0.0003, '至尊': 0 } },
  12: { cost: 220000, rates: { '普通': 0.00, '優秀': 0.00, '精良': 0.25, '史詩': 0.35, '傳說': 0.24, '神話': 0.11, '不朽': 0.038, '超越': 0.009, '鎏金': 0.0026, '永恆': 0.0004, '至尊': 0 } },
  13: { cost: 350000, rates: { '普通': 0.00, '優秀': 0.00, '精良': 0.15, '史詩': 0.35, '傳說': 0.28, '神話': 0.15, '不朽': 0.05, '超越': 0.015, '鎏金': 0.0045, '永恆': 0.0005, '至尊': 0 } },
  14: { cost: 550000, rates: { '普通': 0.00, '優秀': 0.00, '精良': 0.05, '史詩': 0.32, '傳說': 0.32, '神話': 0.20, '不朽': 0.08, '超越': 0.022, '鎏金': 0.007, '永恆': 0.001, '至尊': 0 } },
  15: { cost: 850000, rates: { '普通': 0.00, '優秀': 0.00, '精良': 0.00, '史詩': 0.25, '傳說': 0.38, '神話': 0.23, '不朽': 0.10, '超越': 0.028, '鎏金': 0.012, '永恆': 0.002, '至尊': 0 } },
  16: { cost: 1300000, rates: { '普通': 0.00, '優秀': 0.00, '精良': 0.00, '史詩': 0.15, '傳說': 0.40, '神話': 0.28, '不朽': 0.12, '超越': 0.035, '鎏金': 0.012, '永恆': 0.003, '至尊': 0 } },
  17: { cost: 2000000, rates: { '普通': 0.00, '優秀': 0.00, '精良': 0.00, '史詩': 0.05, '傳說': 0.42, '神話': 0.32, '不朽': 0.14, '超越': 0.045, '鎏金': 0.016, '永恆': 0.004, '至尊': 0 } },
  18: { cost: 3200000, rates: { '普通': 0.00, '優秀': 0.00, '精良': 0.00, '史詩': 0.00, '傳說': 0.40, '神話': 0.36, '不朽': 0.16, '超越': 0.055, '鎏金': 0.02, '永恆': 0.005, '至尊': 0 } },
  19: { cost: 5000000, rates: { '普通': 0.00, '優秀': 0.00, '精良': 0.00, '史詩': 0.00, '傳戰': 0.32, '神話': 0.40, '不朽': 0.18, '超越': 0.07, '鎏金': 0.024, '永恆': 0.006, '至尊': 0 } },
  20: { cost: 8000000, rates: { '普通': 0.00, '優秀': 0.00, '精良': 0.00, '史詩': 0.00, '傳說': 0.22, '神話': 0.45, '不朽': 0.22, '超越': 0.08, '鎏金': 0.023, '永恆': 0.007, '至尊': 0 } },
  21: { cost: 12000000, rates: { '普通': 0.00, '優秀': 0.00, '精良': 0.00, '史詩': 0.00, '傳說': 0.12, '神話': 0.48, '不朽': 0.26, '超越': 0.10, '鎏金': 0.032, '永恆': 0.008, '至尊': 0 } },
  22: { cost: 18000000, rates: { '普通': 0.00, '優秀': 0.00, '精良': 0.00, '史詩': 0.00, '傳說': 0.05, '神話': 0.48, '不朽': 0.32, '超越': 0.11, '鎏金': 0.031, '永恆': 0.009, '至尊': 0 } },
  23: { cost: 27000000, rates: { '普通': 0.00, '優秀': 0.00, '精良': 0.00, '史詩': 0.00, '傳說': 0.00, '神話': 0.45, '不朽': 0.38, '超越': 0.12, '鎏金': 0.04, '永恆': 0.01, '至尊': 0 } },
  24: { cost: 40000000, rates: { '普通': 0.00, '優秀': 0.00, '精良': 0.00, '史詩': 0.00, '傳說': 0.00, '神話': 0.35, '不朽': 0.42, '超越': 0.15, '鎏金': 0.06, '永恆': 0.02, '至尊': 0 } },
  25: { cost: 60000000, rates: { '普通': 0.00, '優秀': 0.00, '精良': 0.00, '史詩': 0.00, '傳說': 0.00, '神話': 0.25, '不朽': 0.48, '超越': 0.18, '鎏金': 0.065, '永恆': 0.025, '至尊': 0 } },
  26: { cost: 90000000, rates: { '普通': 0.00, '優秀': 0.00, '精良': 0.00, '史詩': 0.00, '傳說': 0.00, '神話': 0.15, '不朽': 0.52, '超越': 0.22, '鎏金': 0.075, '永恆': 0.035, '至尊': 0 } },
  27: { cost: 140000000, rates: { '普通': 0.00, '優秀': 0.00, '精良': 0.00, '史詩': 0.00, '傳說': 0.00, '神話': 0.05, '不朽': 0.55, '超越': 0.25, '鎏金': 0.11, '永恆': 0.04, '至尊': 0 } },
  28: { cost: 200000000, rates: { '普通': 0.00, '優秀': 0.00, '精良': 0.00, '史詩': 0.00, '傳說': 0.00, '神話': 0.00, '不朽': 0.52, '超越': 0.28, '鎏金': 0.155, '永恆': 0.045, '至尊': 0 } },
  29: { cost: 300000000, rates: { '普通': 0.00, '優秀': 0.00, '精良': 0.00, '史詩': 0.00, '傳說': 0.00, '神話': 0.00, '不朽': 0.40, '超越': 0.35, '鎏金': 0.202, '永恆': 0.048, '至尊': 0 } },
  30: { cost: 500000000, rates: { '普通': 0.00, '優秀': 0.00, '精良': 0.00, '史詩': 0.00, '傳說': 0.00, '神話': 0.00, '不朽': 0.25, '超越': 0.40, '鎏金': 0.30, '永恆': 0.049999 , '至尊': 0.000001 } },
  31: { cost: 1000000000, rates: { '普通': 0.00, '優秀': 0.00, '精良': 0.00, '史詩': 0.00, '傳說': 0.00, '神話': 0.00, '不朽': 0.2, '超越': 0.42, '鎏金': 0.32, '永恆': 0.05 , '至尊': 0.009999, '無上': 0.000001  } },
  32: { cost: 2000000000, rates: { '普通': 0.00, '優秀': 0.00, '精良': 0.00, '史詩': 0.00, '傳說': 0.00, '神話': 0.00, '不朽': 0.15, '超越': 0.4, '鎏金': 0.35, '永恆': 0.06 , '至尊': 0.025, '無上': 0.015  } },
  33: { cost: 5000000000, rates: { '普通': 0.00, '優秀': 0.00, '精良': 0.00, '史詩': 0.00, '傳說': 0.00, '神話': 0.00, '不朽': 0.1, '超越': 0.4, '鎏金': 0.3, '永恆': 0.1 , '至尊': 0.08, '無上': 0.02 } },
  34: { cost: 10000000000, rates: { '普通': 0.00, '優秀': 0.00, '精良': 0.00, '史詩': 0.00, '傳說': 0.00, '神話': 0.00, '不朽': 0.05, '超越': 0.35, '鎏金': 0.33, '永恆': 0.16 , '至尊': 0.085, '無上': 0.025  } },
  35: { cost: 20000000000, rates: { '普通': 0.00, '優秀': 0.00, '精良': 0.00, '史詩': 0.00, '傳說': 0.00, '神話': 0.00, '不朽': 0, '超越': 0, '鎏金': 0.3, '永恆': 0.5 , '至尊': 0.1, '無上': 0.1  } },
  36: { cost: 40000000000, rates: { '普通': 0.00, '優秀': 0.00, '精良': 0.00, '史詩': 0.00, '傳說': 0.00, '神話': 0.00, '不朽': 0, '超越': 0, '鎏金': 0.25, '永恆': 0.4 , '至尊': 0.2, '無上': 0.15  } },
  37: { cost: 50000000000, rates: { '普通': 0.00, '優秀': 0.00, '精良': 0.00, '史詩': 0.00, '傳說': 0.00, '神話': 0.00, '不朽': 0, '超越': 0, '鎏金': 0.2, '永恆': 0.3 , '至尊': 0.25 , '無上': 0.25  } },
  38: { cost: 60000000000, rates: { '普通': 0.00, '優秀': 0.00, '精良': 0.00, '史詩': 0.00, '傳說': 0.00, '神話': 0.00, '不朽': 0, '超越': 0, '鎏金': 0.15, '永恆': 0.52 , '至尊': 0.08, '無上': 0.25 } },
  39: { cost: 75000000000, rates: { '普通': 0.00, '優秀': 0.00, '精良': 0.00, '史詩': 0.00, '傳說': 0.00, '神話': 0.00, '不朽': 0., '超越': 0, '鎏金': 0., '永恆': 0.45 , '至尊': 0.25, '無上': 0.3  } },
  40: { cost: 100000000000, rates: { '普通': 0.00, '優秀': 0.00, '精良': 0.00, '史詩': 0.00, '傳說': 0.00, '神話': 0.00, '不朽': 0, '超越': 0, '鎏金': 0, '永恆': 0 , '至尊': 0.1, '無上': 0.9  } },
};

const RARITY_SETTINGS = {
  '普通': { color: '#94a3b8', bg: '#1e293b' },
  '優秀': { color: '#4ade80', bg: '#064e3b' },
  '精良': { color: '#60a5fa', bg: '#1e3a8a' },
  '史詩': { color: '#c084fc', bg: '#581c87' },
  '傳說': { color: '#fb923c', bg: '#7c2d12' },
  '神話': { color: '#d61cef', bg: '#5b7f1d' },
  '不朽': { color: '#ff1b07', bg: '#1d7f56' },
  '超越': { color: '#25f192', bg: '#7f1d1d' },
  '鎏金': { color: '#ff9900', bg: '#fafa11' },
  '永恆': { color: '#acf0f7', bg: '#e99a1b' },
  '至尊': { color: '#1e176a', bg: '#00ffcc' },
  '無上': { color: '#2f00ff', bg: '#00ffcc' },  
};

const SLOTS = ['武器', '頭盔', '胸甲', '鞋子'];

const NAMES_BY_SLOT = {
  '武器': [
    '新手木杖', '貓貓合金短刃', '拔山蓋世神劍', '不滅至尊弒神歌',
    '飲血狂瀾大刀', '虛空裂痕法杖', '千擊破空長槍', '晨曦微光細劍', '暴虐巨獸之爪', '萬物枯榮巫刃', '星河倒影長弓', '幽冥鬼火雙匕', '寒霜凝結重鎚', '極光審判巨劍',
  ],
  '頭盔': [
    '大綠葉帽', '厚皮兜帽', '璀璨琉璃聖盔', '至尊龍皇耀光冕',
    '暗夜潛行兜帽', '鋼鐵意志戰盔', '秘術符文髮帶', '深淵凝視面具', '白銀騎士護面', '幻象迷霧面紗', '荊棘纏繞王冠', '元素核心法帽', '破陣先鋒重盔', '心靈感應頭帶',
  ],
  '胸甲': [
    '破舊布衣', '常春藤輕甲', '不落要塞重鎧', '反物質粒子戰甲',
    '不滅意志重鎧', '影隱暗流皮甲', '織星者輕絲袍', '大地守護石甲', '雷霆淬鍊護胸', '亡靈怨咒長袍', '極光流線輕甲', '巨龍逆鱗胸甲', '狂戰士鎖子甲', '守望隱者風衣',
  ],
  '鞋子': [
    '破爛草鞋', '旅行者皮靴', '疾風逐影輕履', '踏碎虛空逆時靴',
    '神速追風輕履', '重裝合金戰靴', '幽靈漂浮軟鞋', '熔岩漫步鐵靴', '靜音潛伏皮靴', '踏星漫遊長靴', '怒濤奔流戰足', '幻影移形涼鞋', '泰坦踏地重履', '微光閃爍絲履',
  ]
};


export default function Game() {
      // 🌐 重新補上多人連線線上帳號的核心防護狀態
  const [user, setUser] = useState(null); // 儲存當前登入的玩家 Auth 資訊
  const [authMode, setAuthStyle] = useState('login'); // 控制登入或註冊切換
  const [authInput, setAuthInput] = useState({ email: '', password: '', username: '' });
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  const [isLoaded, setIsLoaded] = useState(false);
    const [isCloudDataLoaded, setIsCloudDataLoaded] = useState(false); // 🧙‍♂️ 新增：雲端資料下載 防洗檔 鎖
  const [gold, setGold] = useState(500); 
  const [chestCount, setChestCount] = useState(100);
  const [chestLevel, setChestLevel] = useState(1);
  const [equipped, setEquipped] = useState({ '武器': null, '頭盔': null, '胸甲': null, '鞋子': null });
    // 🔨 核心新增：儲存四個裝備欄位的獨立鍛造等級，預設皆為 0 級
  const [forgeLevels, setForgeLevels] = useState({ "武器": 0, "頭盔": 0, "胸甲": 0, "鞋子": 0 });
    // 🌌 核心新增：儲存天賦等級狀態，預設皆為 0 級開荒，升級門檻 5 億金幣起步
  const [talentLevels, setTalentLevels] = useState({ "攻擊天賦": 0, "防禦天賦": 0, "生命天賦": 0 });

  const [newDrop, setNewDrop] = useState(null);
  const [board, setBoard] = useState([[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]);
  const [score, setScore] = useState(0);
  const [isAutoOpen, setIsAutoOpen] = useState(false);
  const [autoFilter, setAutoFilter] = useState('無'); 
  //連抽按鈕
  const [multiOpen, setMultiOpen] = useState(1);
    if (typeof window !== 'undefined') window.currentMaxOpen = multiOpen;

  const [timeToReset, setTimeToReset] = useState(60); 
  const [leaderboard, setLeaderboard] = useState([]);

    //核心：實時戰力計算引擎
      // 🌌 核心修正：實時戰力計算引擎！完美把大後期天賦的百分比增幅乘進去！
  const stats = (() => {
    let attack = 50, defense = 20, health = 500;
    const currentEquipped = equipped || { '武器': null, '頭盔': null, '胸甲': null, '鞋子': null };
    const currentForge = forgeLevels || { '武器': 0, '頭盔': 0, '胸甲': 0, '鞋子': 0 };
    // 讀取你的天賦狀態（防錯保底 0 級）
    const currentTalent = talentLevels || { "攻擊天賦": 0, "防禦天賦": 0, "生命天賦": 0 };

    // 1. 先算裝備 + 鍛造
    Object.entries(currentEquipped).forEach(([slot, item]) => { 
      if (item) { 
        const forgeMultiplier = 1 + (currentForge[slot] || 0) * 0.001;
        attack += Math.floor((item.attack || 0) * forgeMultiplier); 
        defense += Math.floor((item.defense || 0) * forgeMultiplier); 
        health += Math.floor((item.health || 0) * forgeMultiplier); 
      } 
    });

    // 2. 🌌 核心新增：天賦乘法放大！1 級天賦 = +1% 總屬性（0 級 = +0% 不加不減）
    const attackTalentMultiplier = 1 + (currentTalent["攻擊天賦"] || 0) * 0.01;
    const defenseTalentMultiplier = 1 + (currentTalent["防禦天賦"] || 0) * 0.01;
    const healthTalentMultiplier = 1 + (currentTalent["生命天賦"] || 0) * 0.01;

    const finalAttack = Math.floor(attack * attackTalentMultiplier);
    const finalDefense = Math.floor(defense * defenseTalentMultiplier);
    const finalHealth = Math.floor(health * healthTalentMultiplier);

    return { 
      attack: finalAttack, 
      defense: finalDefense, 
      health: finalHealth, 
      power: Math.floor(finalAttack * 4 + finalDefense * 2.5 + finalHealth * 0.4) 
    };
  })();



    // 🌐 核心新增：排行榜搜尋、滑桿下拉與個人排名狀態
  const [searchQuery, setSearchQuery] = useState(''); // 儲存使用者輸入的搜尋字串
  const [myRank, setMyRank] = useState('--'); // 儲存玩家在全服的真實名次
  const [catCount, setCatCount] = useState(200); // 🐱 核心新增：控制假貓咪數量的變數，預設為 20 隻

  // 儲存雲端撈出的所有玩家+貓咪完整名冊
    // 核心修正：開局直接把 🐱 貓咪 1 號到 20 號寫死塞入 allPlayers 狀態，保證搜尋滑桿絕對不落空！
  const [allPlayers, setAllPlayers] = useState([
    //{ name: '🐱 貓咪1號', power: 480, isPlayer: false },
    //{ name: '🐱 貓咪2號', power: 460, isPlayer: false },
    //{ name: '🐱 貓咪3號', power: 440, isPlayer: false },
  ]);
  // 修正：將寫死的貓咪名單與你（玩家）的真實戰力即時大排序，並精準計算個人全服排名
  // 🟢 完美修正：真・全服第一名加權！精準抓取所有人中的最強戰力，作為貓咪動態膨脹的火車頭！
    // 🟢 完美修正：真・全服 100 隻貓咪集體咬合引擎！名次越後面，對第一名戰力的咬合幅度與敏感度全自動階梯式衰減！
    // 🟢 完美修正：真・全服實時大排序！絕對不亂覆蓋別人的戰力，讓玥楓的 27 億與 YF 的 21 億在所有人手機上完美對齊同步！
  const displayLeaderboard = (() => {
    // 🧙‍♂️ 第一步：精準找出目前雲端撈回來的「純真人玩家名冊」（含你和 YF 等所有真人）
    let pureRealPlayers = allPlayers.map(p => {
      // 💡 核心保險鎖：如果這個真人是「當前正在操作手機的玩家自己」，才用他本地最實時的戰力去同步
      if (p.isPlayer) {
        return {
          ...p,
          name: authInput.username || p.name,
          power: stats.power // 只有自己才吃本地即時戰力
        };
      }
      // 如果是別的真人玩家，老老實實保留雲端 profiles 資料庫吐回來的真實戰力（如玥楓的27億、YF的21億），絕對不亂覆蓋！
      return p;
    });

    // 🧙‍♂️ 第二步：找出目前純真人維度裡的最強天花板戰力（當作 100 隻貓咪的加權火車頭）
    const realTopOnePower = pureRealPlayers.length > 0 
      ? Math.max(...pureRealPlayers.map(p => p.power || 500)) 
      : 500;

    // 🧙‍♂️ 第三步：根據設定的 catCount 數量，動態生成你的「50名精準斷代 ＋ 5000基礎長尾」規律衰減貓咪清單！
    const catsList = Array.from({ length: catCount }, (_, i) => {
      const catNum = i + 1;
      //貓咪算法
      // 🎯 玥楓完美調校核心：50名後分子精準歸零，加權幅度以 0.95 次方平滑壓制！
      let Numofcat = (520 - catNum * catNum * catNum * 12);
      if (Numofcat <= 0) { Numofcat = 1; }
      
      const weightFactor = Numofcat * 0.00003125 / Math.pow(catNum, 0.65); // 這裡採用降維平準後的 0.0006 確保貓咪不插隊
      const basePower = Math.max(10, 5000 - catNum * 48) * (1 + chestLevel * 0.05);
      
      const weightedPower = Math.max(0, Math.floor(realTopOnePower * weightFactor));
      let finalCatPower = weightedPower + Math.floor(basePower);

      const elapsedSeconds = 86400 - (timeToReset || 86400);
      const liveVolatility = Math.floor(Math.sin(Math.floor(elapsedSeconds / 3) + catNum) * 15);
      finalCatPower += liveVolatility;

      return {
        name: `🐱 貓咪${catNum}號`,
        power: finalCatPower > 10 ? finalCatPower : 10,
        isPlayer: false
      };
    });

    // 第四步：將不亂吃變數的真人名冊，與加權好的貓咪群進行大合體
    let list = [...pureRealPlayers, ...catsList];

    // 第五步：全服混合大排序！
    list.sort((a, b) => b.power - a.power);
    return list;
  })();



  // 即時計算我的真實排名
  const currentMyRank = displayLeaderboard.findIndex(p => p.isPlayer) + 1;

  // 根據搜尋輸入框的文字，動態過濾出過濾後的清單
  const filteredLeaderboard = displayLeaderboard.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

    // 🌐 核心新增：Supabase 線上註冊與登入雲端傳輸函式
  const handleAuth = async (e) => {
    e.preventDefault();
    if (!authInput.email || !authInput.password) return alert("請填寫 Email 與密碼！");
    setIsAuthLoading(true);

    try {
              const { supabase } = await import('../lib/supabase');

      if (authMode === 'register') {
        if (!authInput.username) { setIsAuthLoading(false); return alert("註冊請填寫玩家暱稱！"); }
        // 1. 註冊雲端 Auth 帳號
        const { data: authData, error: authErr } = await supabase.auth.signUp({
          email: authInput.email, password: authInput.password
        });
        if (authErr) throw authErr;

        if (authData?.user) {
          // 2. 在 profiles 資料表建立初始玩家遊戲數據
          const { error: profErr } = await supabase.from('profiles').insert([{
            id: authData.user.id, username: authInput.username, gold: 500,
            chest_count: 100, chest_level: 1, score: 0, power: 500,
            board: [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],
            equipped: { "武器": null, "頭盔": null, "胸甲": null, "鞋子": null }
          }]);
          if (profErr) throw profErr;
          alert("🎉 註冊成功！已自動登入遊戲。");
          setIsCloudDataLoaded(true);
          setUser(authData.user);
        }
      } else {
        // 3. 雲端帳號登入
        const { data: loginData, error: loginErr } = await supabase.auth.signInWithPassword({
          email: authInput.email, password: authInput.password
        });
        if (loginErr) throw loginErr;

        if (loginData?.user) {
          // 4. 從資料庫撈取該玩家儲存的所有金幣、裝備、2048 棋盤進度
          const { data: profData, error: fetchErr } = await supabase.from('profiles').select('*').eq('id', loginData.user.id).single();
          if (!fetchErr && profData) {
            setGold(profData.gold);
            setChestCount(profData.chest_count);
            setChestLevel(profData.chest_level);
            setScore(profData.score);
            if (profData.board) setBoard(profData.board);
            if (profData.equipped) setEquipped(profData.equipped);
          // 🔨 核心新增：讀取雲端鍛造存檔（防錯保底）
            if (profData.forge_levels) setForgeLevels(profData.forge_levels);
          // 🔨 核心修正：讀取雲端鍛造存檔，如果雲端剛好是空的，老老實實給它保底 1 級，絕對不讓變數吃空！
          if (profData.forge_levels) {
            setForgeLevels(profData.forge_levels);
          } else {
            setForgeLevels({ "武器": 0, "頭盔": 0, "胸甲": 0, "鞋子": 0 });
          }
          // 🌌 核心新增：讀取雲端天賦存檔（防錯保底 0 級開局）
            if (profData.talent_levels) {
              setTalentLevels(profData.talent_levels);
          } else {
              setTalentLevels({ "攻擊天賦": 0, "防禦天賦": 0, "生命天賦": 0 });
          }
          // 🧙‍♂️ 核正：確認雲端舊檔已經百分之百完美寫入 React 狀態，此時才可以安全開啟上傳
          setIsCloudDataLoaded(true);
          }
          setUser(loginData.user);
          alert("🔑 歡迎回來，小貓咪！雲端存檔已同步載入。");
        }
      }
    } catch (err) {
      alert(`❌ 認證失敗: ${err.message || err.toString()}`);
    } finally {
      setIsAuthLoading(false);
    }
  };

  // 登出函式
  const handleLogout = async () => {
            const { supabase } = await import('../lib/supabase');

    await supabase.auth.signOut(); setUser(null);
    localStorage.clear(); window.location.reload(); // 清空單機殘留並重新整理
  };


  const stateRef = useRef({ chestLevel, autoFilter, chestCount, isAutoOpen });
  useEffect(() => {
    stateRef.current = { chestLevel, autoFilter, chestCount, isAutoOpen };
  }, [chestLevel, autoFilter, chestCount, isAutoOpen]);
  // 2048 隨機生成方塊
  const addRandomTile = useCallback((currentBoard) => {
    const emptyCells = [];
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (currentBoard[r] && currentBoard[r][c] === 0) emptyCells.push({ r, c });
      }
    }
    if (emptyCells.length === 0) return currentBoard;
    const { r, c } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const newBoard = currentBoard.map(row => [...row]);
    newBoard[r][c] = Math.random() < 0.9 ? 2 : 4;
    return newBoard;
  }, []);

  // 載入遊戲進度
  useEffect(() => {
    const savedGold = localStorage.getItem('m2048_gold');
    const savedChests = localStorage.getItem('m2048_chests');
    const savedLevel = localStorage.getItem('m2048_level');
    const savedEquipped = localStorage.getItem('m2048_equipped');
    const savedBoard = localStorage.getItem('m2048_board');
    const savedScore = localStorage.getItem('m2048_score');

    if (savedGold) setGold(parseInt(savedGold));
    if (savedChests) setChestCount(parseInt(savedChests));
    if (savedLevel) setChestLevel(parseInt(savedLevel));
    if (savedScore) setScore(parseInt(savedScore));
    if (savedEquipped) setEquipped(JSON.parse(savedEquipped));
    
        // 核心修正：強力攔截 null 與錯誤快取，保證開局 board 絕對不為空
    let ib = [[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0]];
    
    if (savedBoard && savedBoard !== "null" && savedBoard !== "undefined") {
      try { 
        let parsed = JSON.parse(savedBoard); 
        if (Array.isArray(parsed) && parsed.length === 4) ib = parsed;
      } catch(e) {}
    } else {
      ib = addRandomTile(ib);
      ib = addRandomTile(ib);
    }
    
    setBoard(ib);
    setIsLoaded(true);

    setBoard(ib);
    setIsLoaded(true);
  }, [addRandomTile]);

  // 原(進度自動寫入快取) 已改成連線版本
    // 🌐 核心修正：將單機快取存檔，升級為雲端全自動即時同步資料庫引擎
      // 🌐 核心修正：雙重鋼鐵防禦！如果玩家是剛註冊新角（此時 stats.power 應為初始），或者「剛登入但雲端舊檔還沒安全下載完畢」，一律死死攔截上傳，拒絕洗掉紀錄！
  useEffect(() => {
        // 🌌 修正：如果玩家剛登入、且雲端的真實天賦紀錄還沒 100% 安全下載到 React 之前，一律死死攔截上傳，拒絕扣錢洗存檔！
        // 💡 關鍵修正：只要最核心的 user 登入成功、且下載鎖解開，就無條件放行上傳！不要在後面塞一堆會卡死天賦的物件判定！
    if (!isLoaded || !user || !isCloudDataLoaded) return;



    // 建立一個防抖/延時上傳，避免玩家玩 2048 按太快導致頻繁呼叫雲端資料庫卡死
    const syncCloudData = async () => {
      try {
                const { supabase } = await import('../lib/supabase');

          // 🌌 終極修正：天賦鋼鐵防空鎖！確保攻擊、防禦、生命三個天賦在 React 記憶體中 100% 安全落地，否則絕對攔截、拒絕上傳！
          if (talentLevels && (talentLevels["攻擊天賦"] === undefined || talentLevels["防禦天賦"] === undefined || talentLevels["生命天賦"] === undefined)) {
            return; 
          }
        await supabase .from('profiles')
          .update({
            gold: gold,
            chest_count: chestCount,
            chest_level: chestLevel,
            score: score,
            power: stats.power, // 同步最新真實總戰力
            equipped: equipped,
            board: board,

            power: stats.power,//四項鍛造資訊
            equipped: equipped,
            board: board,
            forge_levels: forgeLevels, // 🔨 核心新增：自動將最新鍛造等級實時同步進 Supabase 資料庫

            forge_levels: forgeLevels,
            talent_levels: talentLevels, // 🌌 核心新增：自動將最新天賦等級實時同步進 Supabase 資料庫
              "攻擊天賦": talentLevels["攻擊天賦"] !== undefined ? talentLevels["攻擊天賦"] : 0,
              "防禦天賦": talentLevels["防禦天賦"] !== undefined ? talentLevels["防禦天賦"] : 0,
              "生命天賦": talentLevels["生命天賦"] !== undefined ? talentLevels["生命天賦"] : 0

          })
          //讀檔，只看 user.id 的標準 SQL 比對線
          .eq('id', user.id); 
      } catch (e) {
        console.error("雲端存檔同步失敗:", e);
      }
    };

    const timer = setTimeout(() => {
      syncCloudData();
    }, 1000); // 玩家停止動作 1 秒後，全自動無感背景上傳

    return () => clearTimeout(timer);
  }, [gold, chestCount, chestLevel, equipped, board, score, isLoaded, user, stats.power, isCloudDataLoaded, talentLevels]);

  // 原排行榜模擬 已更新為真人
    // 🌐 核心修正：徹底幹掉隨機假名單，直接從雲端資料庫抓取全服真實前 5 強排行榜！
  useEffect(() => {
    if (!user) return;
    const fetchAllPlayersAndRank = async () => {
      let mergedList = [];
      try {
        const { supabase } = await import('../lib/supabase');
        const { data, error } = await supabase.from('profiles').select('username, power, id').order('power', { ascending: false });
        if (!error && data) {
          mergedList = data.map(p => ({ name: p.username, power: p.power, isPlayer: p.id === user.id }));
        }
      } catch (e) { console.error("雲端連線失敗，由貓咪保底接管:", e); }

      // 確保自己如果不在名單裡，全自動把自己補進去，防止顯示「查無此人」
      if (!mergedList.some(p => p.isPlayer)) {
        mergedList.push({
          name: authInput.username || '你（玩家）',
          power: stats.power,
          isPlayer: true
        });
      }

      mergedList.sort((a, b) => b.power - a.power);
      setAllPlayers(mergedList);

      const pIndex = mergedList.findIndex(p => p.isPlayer);
      if (pIndex !== -1) setMyRank(pIndex + 1);
    };

    fetchAllPlayersAndRank();
    const rankTimer = setInterval(fetchAllPlayersAndRank, 10000);
    return () => clearInterval(rankTimer);
  }, [stats.power, user, timeToReset, authInput.username]);

     // 🌐 終極魔改：全服集體同步結算引擎！死死鎖定每天半夜 24:00（晚上12點）集體同步發獎
  const rankRef = useRef(currentMyRank);
  useEffect(() => { rankRef.current = currentMyRank; }, [currentMyRank]);

  // 新增一個旗標，防止時間到那一秒因為 setInterval 跑太快導致重疊彈出兩次 alert
  const hasRewardedToday = useRef(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      
      // 1. 計算距離今天晚上 24:00 (明天凌晨 00:00:00) 還剩下多少秒
      const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
      const secondsLeft = Math.floor((tomorrow.getTime() - now.getTime()) / 1000);

      // 2. 將全服統一的剩餘秒數同步到畫面上的倒數看板
      setTimeToReset(secondsLeft);

      // 3. 核心大判定：當秒數歸零、或是剛好跨越到新的一天的第一秒時（secondsLeft 剛好是當天最大秒數 86400 附近）
      if (secondsLeft <= 0 || secondsLeft >= 86399) {
        if (!hasRewardedToday.current) {
          hasRewardedToday.current = true; // 鎖定，今天領過獎了
          
          const realLatestRank = rankRef.current;
          let rewardChests = 50; 
          let rewardGold = 1000;

          if (realLatestRank === 1) { rewardChests = 1000000; rewardGold = 50000000; } 
          else if (realLatestRank === 2) { rewardChests = 500000; rewardGold = 2000000; } 
          else if (realLatestRank === 3) { rewardChests = 30000; rewardGold = 100000; } 
          else if (realLatestRank <= 10) { rewardChests = 15000; rewardGold = 30000; } 

          setChestCount(c => c + rewardChests);
          setGold(g => g + rewardGold);
          
          alert(`🏆 《2048貓咪開箱傳說》 全服每日零點大結算！\n\n恭喜你今日榮獲全服第 ${realLatestRank} 名！\n🎁 獎勵已同步派發：寶箱 +${rewardChests} 個、金幣 +${rewardGold.toLocaleString()}🪙！\n\n新一輪賽事已重置啟動，祝新賽季武運昌隆！`);
        }
      } else {
        // 只要不是在跨天那一秒，就把旗標解開，準備迎接明天的半夜 12 點
        hasRewardedToday.current = false;
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);


  // 核心修復：100% 精準的 2048 上下左右滑動合併演算法
    // 核心終極修復：全實心二維陣列、保證 100% 正向垂直向下合併、絕不留空的 2048 演算法
  const move = useCallback((direction) => {
    let moved = false;
    let earnedGold = 0;
    
    // 真正的 4x4 實心二維陣列，四列全部塞滿，絕不留空，徹底消滅 undefined (setting '0')
    let finalBoard = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    let nb         = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        nb[r][c] = board[r] && board[r][c] ? board[r][c] : 0;
      }
    }

    // 核心滑動合併函數（只處理左滑）
    const slideLeft = (matrix) => {
      let scoreGain = 0;
      let nm = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
      for (let r = 0; r < 4; r++) {
        let row = matrix[r].filter(v => v !== 0);
        let nr = [];
        for (let i = 0; i < row.length; i++) {
          if (row[i] === row[i + 1]) {
            const combined = row[i] * 2;
            nr.push(combined);
            scoreGain += combined;
            i++;
          } else {
            nr.push(row[i]);
          }
        }
        while (nr.length < 4) nr.push(0);
        nm[r] = nr;
      }
      return { nm, scoreGain };
    };

    // 💡 1. 處理：左、右、上 三個方向
    if (direction === 'LEFT') {
      const result = slideLeft(nb);
      finalBoard = result.nm;
      earnedGold = result.scoreGain;
    } else if (direction === 'RIGHT') {
      let tb = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
      for (let r = 0; r < 4; r++) tb[r] = [...nb[r]].reverse();
      const result = slideLeft(tb);
      for (let r = 0; r < 4; r++) finalBoard[r] = [...result.nm[r]].reverse();
      earnedGold = result.scoreGain;
    } else if (direction === 'UP') {
      let tb = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) tb[r][c] = nb[c][r];
      }
      const result = slideLeft(tb);
      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) finalBoard[r][c] = result.nm[c][r];
      }
      earnedGold = result.scoreGain;
    } 
    // 💡 2. 核心大修復：處理「向下（DOWN）」，不套任何旋轉公式，直接一列一列由下往上垂直平移
    else if (direction === 'DOWN') {
      for (let c = 0; c < 4; c++) {
        // 抽出這一縱列所有非 0 數字（由下往上抓）
        let col = [];
        for (let r = 3; r >= 0; r--) {
          if (nb[r][c] !== 0) col.push(nb[r][c]);
        }
        // 由下往上合併相同相鄰數字
        let ncol = [];
        for (let i = 0; i < col.length; i++) {
          if (col[i] === col[i + 1]) {
            const combined = col[i] * 2;
            ncol.push(combined);
            earnedGold += combined;
            i++;
          } else {
            ncol.push(col[i]);
          }
        }
        // 補滿 0 並精準塞回 finalBoard 的對應直列（從最底部列索引 3 開始往上填）
        while (ncol.length < 4) ncol.push(0);
        for (let r = 3; r >= 0; r--) {
          finalBoard[r][c] = ncol[3 - r];
        }
      }
    }

    // 檢查是否有格子變動
    if (JSON.stringify(board) !== JSON.stringify(finalBoard)) {
      moved = true;
    }

    if (moved) {
      const fb = addRandomTile(finalBoard);
      setBoard(fb);
      setScore(s => s + earnedGold);
            // 🧙‍♂️ 2048 金幣通膨公式：基礎得分 * (1 + 寶箱等級 * 0.5) + 總戰力的 1%
      const finalEarned = Math.floor(earnedGold * (1 + chestLevel * 0.5) + (stats.power * 0.01));
      setGold(g => g + (finalEarned > 0 ? finalEarned : earnedGold));
      // 📦 核心新增：2048 驚喜掉箱機制！只要「本次合併產生的最高方塊數值」大於等於 128，直接階梯式暴擊贈送寶箱！
      if (earnedGold >= 128) {
        let bonusChests = 10;
        if (earnedGold >= 2048) { bonusChests = 1000 * chestLevel; }      // 合出 2048 送
        else if (earnedGold >= 1024) { bonusChests = 500 * chestLevel; }  // 合出 1024 送
        else if (earnedGold >= 512) { bonusChests = 200 * chestLevel; }    // 合出 512 送 
        else if (earnedGold >= 256) { bonusChests = 50 * chestLevel; }     // 合出 256 送 
        else if (earnedGold >= 128) { bonusChests = 10 * chestLevel; }     // 合出 256 送 
        setChestCount(c => c + bonusChests);
      }
    }
  }, [board, addRandomTile]);


  // 鍵盤監聽事件
  useEffect(() => {
    const handleKD = (e) => {
      if (['ArrowUp', 'KeyW'].includes(e.code)) { e.preventDefault(); move('UP'); }
      if (['ArrowDown', 'KeyS'].includes(e.code)) { e.preventDefault(); move('DOWN'); }
      if (['ArrowLeft', 'KeyA'].includes(e.code)) { e.preventDefault(); move('LEFT'); }
      if (['ArrowRight', 'KeyD'].includes(e.code)) { e.preventDefault(); move('RIGHT'); }
    };
    window.addEventListener('keydown', handleKD); 
    return () => window.removeEventListener('keydown', handleKD);
  }, [move]);

  // 手動開箱
  const openChest = () => {
    if (chestCount <= 0) return;
    setChestCount(p => p - 1);
    const rates = CHEST_LEVEL_CONFIGS[chestLevel].rates; const rand = Math.random();
    let cum = 0; let rarity = '普通';
    for (const [r, rate] of Object.entries(rates)) { cum += rate; if (rand <= cum) { rarity = r; break; } }
    const rs = SLOTS[Math.floor(Math.random() * SLOTS.length)];
    const bn = NAMES_BY_SLOT[rs][Math.floor(Math.random() * NAMES_BY_SLOT[rs].length)];
    const mults = {'普通': 1, '優秀': 2.5, '精良': 6, '史詩': 15, '傳說': 40, '神話': 110, '不朽': 240, '超越': 500, '鎏金': 1200, '永恆': 36000 , '至尊': 128000 , '至尊': 10240000 };
    const m = mults[rarity] * (1 + chestLevel * 0.25);
    setNewDrop({ name: `[${rarity}] ${bn}`, slot: rs, rarity, attack: Math.floor((Math.random() * 10 + 5) * m), defense: Math.floor((Math.random() * 5 + 2) * m), health: Math.floor((Math.random() * 40 + 20) * m), sellValue: Math.floor(15 * m) });
  };

  // 全自動開箱計時器
    // 核心修正：支援多連抽與智慧過濾的自動開箱計時器
  useEffect(() => {
    const timer = setInterval(() => {
      const { isAutoOpen: auto, chestCount: count, chestLevel: lv, autoFilter: flt } = stateRef.current;
      if (!auto || count <= 0) return;

      // 讀取當前使用者設定的連抽數量 (若庫存不足，則有多少開多少)
      const currentMulti = window.currentMaxOpen || 1;
      const amountToOpen = Math.min(count, currentMulti);
      
      const safeLv = (lv && CHEST_LEVEL_CONFIGS[lv]) ? lv : 1;
      const ro = ['普通', '優秀', '精良', '史詩', '傳說', '神話', '不朽', '超越', '鎏金', '永恆', '至尊', '無上'];
      const filterIndex = ro.indexOf(flt);

      let totalEarnedGold = 0;
      let lastGoodItem = null;

      // 迴圈模擬一次開 amountToOpen 個寶箱
      for (let i = 0; i < amountToOpen; i++) {
        const rates = CHEST_LEVEL_CONFIGS[safeLv].rates; 
        const rand = Math.random();
        let cum = 0; let rarity = '普通';
        for (const [r, rate] of Object.entries(rates)) { cum += rate; if (rand <= cum) { rarity = r; break; } }
        
        const rs = SLOTS[Math.floor(Math.random() * SLOTS.length)];
        const bn = NAMES_BY_SLOT[rs][Math.floor(Math.random() * NAMES_BY_SLOT[rs].length)];
        const mults = { '普通': 1, '優秀': 2.5, '精良': 6, '史詩': 15, '傳說': 40, '神話': 110, '不朽': 240, '超越': 500, '鎏金': 1200, '永恆': 36000 , '至尊': 128000 , '無上': 10240000 };
        const m = mults[rarity] * (1 + safeLv * 0.25);
        const item = { name: `[${rarity}] ${bn}`, slot: rs, rarity, attack: Math.floor((Math.random() * 10 + 5) * m), defense: Math.floor((Math.random() * 5 + 2) * m), health: Math.floor((Math.random() * 40 + 20) * m), sellValue: Math.floor(15 * m) };

        const itemIndex = ro.indexOf(item.rarity);
        // 如果符合自動分解條件
        if (flt !== '無' && itemIndex <= filterIndex) {
          totalEarnedGold += item.sellValue;
        } else {
          // 抽到好東西，記錄下來，準備停下自動
          lastGoodItem = item;
        }
      }

      // 扣除消耗的寶箱並加上分解所得金幣
      setChestCount(p => p - amountToOpen);
      if (totalEarnedGold > 0) setGold(g => g + totalEarnedGold);

      // 如果有抽到好貨，塞進鑑定欄，並強制暫停自動
      if (lastGoodItem) {
        setNewDrop(lastGoodItem);
        setIsAutoOpen(false);
      }
    }, 450);
    return () => clearInterval(timer);
  }, []);


  const upgradeChest = () => {
    const nl = chestLevel + 1; if (!CHEST_LEVEL_CONFIGS[nl]) return;
    const cost = CHEST_LEVEL_CONFIGS[chestLevel].cost; if (gold < cost) return;
    setGold(p => p - cost); setChestLevel(nl);
  };

    // 🔨 核心新增：鍛造升級按鈕邏輯！消耗金幣，提升指定部位的百分比增幅
  const upgradeForge = (slot) => {
    const currentLv = forgeLevels[slot] || 1;
    // 數值平衡公式：升級消耗金幣 = 當前等級 * 當前等級 * 250
    const cost = currentLv * currentLv * 100;
    
    if (gold < cost) return alert("🪙 金幣餘額不足，無法鍛造此部位！");
    
    setGold(g => g - cost);
    setForgeLevels(p => ({ ...p, [slot]: currentLv + 1 }));
  };
  
  // 🌌 核心修正：天賦升級按鈕邏輯！採用實心拆解，確保 100% 觸發 React 狀態變更與自動存檔！
    const upgradeTalent = (talentName) => {
    const currentLv = talentLevels[talentName] || 0;
    const cost = 500000000 + currentLv * currentLv * 20000000;
    
    if (gold < cost) return alert(`🪙 金幣餘額不足！升級此天賦需要 ${cost >= 100000000 ? `${(cost/100000000).toFixed(1)}億` : cost.toLocaleString()} 金幣！`);
    
    setGold(g => g - cost);

    // 💡 關鍵修正：必須透過建立全新物件 nextLevels，React 才能敏銳捕捉到物件內部的變更，進而觸發自動存檔！
    const nextLevels = { ...talentLevels };
    nextLevels[talentName] = currentLv + 1;
    setTalentLevels(nextLevels);
  };




  // 🧙‍♂️ 核心修正：換上裝備！將新裝穿上，並強行把脫下來的「舊裝備」完美吐回掉落欄，絕不憑空消失！
  const equipItem = () => {
    if (!newDrop) return;
    const currentEquippedItem = equipped[newDrop.slot]; // 先把身上的舊裝備藏起來
    
    setEquipped(p => ({ ...p, [newDrop.slot]: newDrop })); // 把新裝備穿上身
    
    if (currentEquippedItem) {
      // 💡 靈魂改動：如果原本有穿衣服，把脫下來的舊衣服原地「吐回掉落對比欄」，讓玩家可以手動分解它！
      setNewDrop(currentEquippedItem); 
    } else {
      // 如果原本是裸體，沒衣服可脫，掉落欄才清空
      setNewDrop(null);
    }
  };

  // 🧙‍♂️ 核心修正：分解函式！不論分解的是新抽到的垃圾，還是剛剛換下來的舊裝，分解完一律全自動「繼續開箱」！
  const sellItem = () => {
    if (!newDrop) return;
    setGold(g => g + newDrop.sellValue);
    setNewDrop(null); // 清空掉落欄
    
    // 💡 永動關鍵：只要背包庫存還有寶箱，分解完成清空的瞬間，全自動無感重新亮起「自動開箱」！
    if (chestCount > 0) {
      setIsAutoOpen(true);
    }
  };

  const reset2048 = () => { let eb = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]; eb = addRandomTile(eb); eb = addRandomTile(eb); setBoard(eb); setScore(0); };

  const currentEquippedItem = newDrop ? equipped[newDrop.slot] : null;
  if (!isLoaded) return <div style={{ color: '#64748b', textAlign: 'center', paddingTop: '100px', fontFamily: 'monospace' }}>載入進度中...</div>;
  // 原生手寫 CSS 鎖死排版樣式表
  const layoutStyle = {
    minHeight: '100vh', backgroundColor: '#020617', color: '#f8fafc', padding: '20px',
    fontFamily: 'system-ui, sans-serif', boxSizing: 'border-box'
  };
  const boxStyle = {
    backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '20px', borderRadius: '16px',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
  };
  
    // 🧙‍♂️ 核心：強制線上登入牆總閘門（加在這裡）
  if (typeof window !== 'undefined' && !user) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#020617', color: '#f8fafc', padding: '20px', fontFamily: 'sans-serif', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ backgroundColor: '#0f172a', border: '2px solid #fbbf24', padding: '30px', borderRadius: '20px', width: '100%', maxWidth: '400px', boxShadow: '0 10px 25px rgba(0,0,0,0.7)', textAlign: 'center' }}>
          <h1 style={{ margin: '0 0 10px 0', fontSize: '24px', fontWeight: '900', color: '#fbbf24' }}>2048貓咪開箱傳說</h1>
          <p style={{ margin: '0 0 20px 0', fontSize: '13px', color: '#94a3b8' }}>⚔️ 真實全服多人連線 × 2048 金幣版 ⚔️</p>
          
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', backgroundColor: '#020617', padding: '4px', borderRadius: '8px' }}>
            <button onClick={() => setAuthStyle('login')} style={{ flex: 1, padding: '8px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px', backgroundColor: authMode === 'login' ? '#fbbf24' : 'transparent', color: authMode === 'login' ? '#000' : '#fff' }}>密碼登入</button>
            <button onClick={() => setAuthStyle('register')} style={{ flex: 1, padding: '8px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px', backgroundColor: authMode === 'register' ? '#fbbf24' : 'transparent', color: authMode === 'register' ? '#000' : '#fff' }}>新角註冊</button>
          </div>

                    <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {authMode === 'register' && (
              <input 
                type="text" 
                placeholder="🧙‍♂️ 請輸入你的玩家暱稱" 
                value={authInput.username} 
                onChange={e => setAuthInput({...authInput, username: e.target.value})} 
                onKeyDown={(e) => e.stopPropagation()} // 💡 核心新增：隔離按鍵，解鎖打字限制
                style={{ padding: '10px', borderRadius: '8px', border: '1px solid #1e293b', backgroundColor: '#020617', color: '#fff', fontSize: '13px', outline: 'none' }} 
              />
            )}
            <input 
              type="email" 
              placeholder="📧 請輸入電子信箱 (Email)" 
              value={authInput.email} 
              onChange={e => setAuthInput({...authInput, email: e.target.value})} 
              onKeyDown={(e) => e.stopPropagation()} // 💡 核心新增：隔離按鍵，解鎖打字限制
              style={{ padding: '10px', borderRadius: '8px', border: '1px solid #1e293b', backgroundColor: '#020617', color: '#fff', fontSize: '13px', outline: 'none' }} 
            />
            <input 
              type="password" 
              placeholder="🔒 請輸入安全密碼" 
              value={authInput.password} 
              onChange={e => setAuthInput({...authInput, password: e.target.value})} 
              onKeyDown={(e) => e.stopPropagation()} // 💡 核心新增：隔離按鍵，解鎖打字限制
              style={{ padding: '10px', borderRadius: '8px', border: '1px solid #1e293b', backgroundColor: '#020617', color: '#fff', fontSize: '13px', outline: 'none' }} 
            />

            <button type="submit" disabled={isAuthLoading} style={{ marginTop: '8px', width: '100%', padding: '12px', backgroundColor: '#059669', color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '900', fontSize: '14px', transition: '0.2s', opacity: isAuthLoading ? 0.5 : 1 }}>
              {isAuthLoading ? '⚡ 雲端傳輸中...' : authMode === 'login' ? '🔑 進入修仙世界' : '🔥 創建角色出世'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={layoutStyle}>
      {/* 頂部數據看板 */}
      <header style={{ maxWidth: '1200px', margin: '0 auto 20px auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '16px', borderRadius: '16px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '900', color: '#f59e0b' }}>2048貓咪開箱傳說 金幣版</h1>
          <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#94a3b8' }}>智慧自動掛機開箱</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ backgroundColor: '#020617', padding: '8px 12px', borderRadius: '8px', border: '1px solid #1e293b', color: '#fbbf24', fontWeight: 'bold' }}>🪙 金幣: {gold}</div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ backgroundColor: '#7c2d12', color: '#fdba74', fontSize: '11px', padding: '2px 8px', borderRadius: '9999px', fontWeight: 'bold' }}>寶箱 Lv.{chestLevel}</span>
            <div style={{ color: '#ef4444', fontWeight: '900', fontSize: '20px', marginTop: '2px' }}>戰力: {stats.power.toLocaleString()}</div>
          </div>
        </div>
      </header>

      {/* 核心三欄主要網格佈局 */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        
        {/* 左側：2048金幣工廠 */}
        <div style={boxStyle}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <h2 style={{ margin: 0, fontSize: '15px', color: '#34d399', fontWeight: 'bold' }}>🧩 2048 金幣機</h2>
              <span style={{ fontSize: '12px', color: '#94a3b8' }}>積分: {score}</span>
            </div>
            {/* 4x4 原生 Grid 棋盤 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'repeat(4, 1fr)', gap: '8px', backgroundColor: '#020617', padding: '12px', borderRadius: '12px', border: '1px solid #1e293b', width: '100%', height: '320px', boxSizing: 'border-box' }}>
              {board.map((row, r) => row.map((val, c) => {
                let cellBg = '#0f172a'; let cellColor = 'transparent';
                if (val === 2) { cellBg = '#1e293b'; cellColor = '#f1f5f9'; }
                else if (val === 4) { cellBg = '#334155'; cellColor = '#fbbf24'; }
                else if (val === 8) { cellBg = '#b45309'; cellColor = '#ffffff'; }
                else if (val === 16) { cellBg = '#ea580c'; cellColor = '#ffffff'; }
                else if (val === 32) { cellBg = '#dc2626'; cellColor = '#ffffff'; }
                else if (val === 64) { cellBg = '#be123c'; cellColor = '#ffffff'; }
                else if (val > 64) { cellBg = '#6b21a8'; cellColor = '#22d3ee'; }
                return (
                  <div key={`${r}-${c}`} style={{ backgroundColor: cellBg, color: cellColor, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', fontWeight: 'bold', fontSize: '18px', fontFamily: 'monospace', width: '100%', height: '100%' }}>
                    {val !== 0 ? val : ''}
                  </div>
                );
              }))}
            </div>
            {/* 一鍵重玩 2048 按鈕 */}
            <button 
              onClick={reset2048} 
              style={{ width: '100%', marginTop: '12px', padding: '8px', backgroundColor: '#334155', color: '#67e8f9', border: '1px solid #22d3ee', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}
            >
              🔄 重置/重玩 2048 棋盤
            </button>
          </div>
                    {/* 核心修正：高質感多人連線排行榜（含即時搜尋、滑桿下拉、個人保底防護欄） */}
          <div style={{ marginTop: '16px', backgroundColor: '#020617', padding: '12px', borderRadius: '12px', border: '1px solid #1e293b', fontSize: '12px' }}>
            
            {/* 🔍 頂部即時搜尋輸入框 */}
            <div style={{ marginBottom: '10px' }}>
              <input 
                type="text" 
                placeholder="🔍 輸入玩家暱稱或貓咪號進行搜尋..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #1e293b', backgroundColor: '#0f172a', color: '#fff', fontSize: '11px', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fb5555', fontWeight: 'bold', marginBottom: '6px', padding: '0 4px' }}>
              <span>🏆 全服實時排行 (可滑動下拉)</span>
                <span>結算倒數: {(() => {
                const h = Math.floor(timeToReset / 3600).toString().padStart(2, '0');
                const m = Math.floor((timeToReset % 3600) / 60).toString().padStart(2, '0');
                const s = (timeToReset % 60).toString().padStart(2, '0');
                return `${h}:${m}:${s}`;
              })()}</span>

            </div>

            {/* 📜 帶有垂直滾動滑桿（Overflow-Y）的真實前10名/全服名冊顯示區 */}
            <div style={{ maxHeight: '320px', overflowY: 'auto', paddingRight: '4px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {filteredLeaderboard.length > 0 ? (
                filteredLeaderboard?.map((p, idx) => {
                  // 在完整名冊中尋找原始真實排名
                  const realRank = displayLeaderboard.findIndex(orig => orig.name === p.name) + 1;
                  return (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 8px', borderRadius: '6px', backgroundColor: p.isPlayer ? 'rgba(245,158,11,0.15)' : 'transparent', border: p.isPlayer ? '1px solid rgba(245,158,11,0.3)' : 'none', color: p.isPlayer ? '#f59e0b' : '#94a3b8', fontWeight: p.isPlayer ? 'bold' : 'normal' }}>
                      <span>第 {realRank} 名 - {p.name}</span>
                      <span>{p.power.toLocaleString()}</span>
                    </div>
                  );
                })
              ) : (
                <div style={{ color: '#475569', textAlign: 'center', padding: '20px 0', fontStyle: 'italic' }}>查無此貓咪...</div>
              )}
            </div>

            {/* 📌 排行榜下方：死死釘住玩家自己的真實全服名次與最新戰力欄 */}
            <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '2px dashed #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(245,158,11,0.05)', padding: '8px', borderRadius: '8px' }}>
              <span style={{ color: '#fbbf24', fontWeight: 'bold' }}>👤 我的真實排名: <span style={{ color: '#fff', fontSize: '14px', fontFamily: 'monospace' }}>第 {currentMyRank} 名
</span></span>
              <span style={{ color: '#ef4444', fontWeight: 'bold' }}>戰力: <span style={{ fontSize: '13px', fontFamily: 'monospace' }}>{stats.power.toLocaleString()}</span></span>
            </div>

          </div>

        </div>
        {/* 中間：配戴神裝 */}
        <div style={boxStyle}>
          <div>
            <h2 style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#38bdf8', fontWeight: 'bold' }}>👤 已穿戴裝備位</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
              {<>
                            <h2 style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#38bdf8', fontWeight: 'bold' }}>🔨 欄位鍛造增幅</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
              {SLOTS?.map((slot) => {
                const item = equipped[slot]; 
                const forgeLv = forgeLevels[slot] || 1;
                // 計算升級成本
                const forgeCost = forgeLv * forgeLv * 250;
                const cfg = item ? RARITY_SETTINGS[item.rarity] : { color: '#475569', bg: '#020617' };
                
                return (
                  <div key={slot} style={{ display: 'flex', flexDirection: 'column', gap: '6px', backgroundColor: '#020617', border: '1px solid #1e293b', padding: '12px', borderRadius: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 'bold' }}>{slot} <span style={{ color: '#38bdf8' }}>(Lv.{forgeLv} / +{(forgeLv-1)}%)</span></span>
                      {item ? ( 
                        <span style={{ color: cfg.color, backgroundColor: cfg.bg, fontSize: '11px', padding: '2px 6px', borderRadius: '6px', border: `1px solid ${cfg.color}`, fontWeight: 'bold' }}>{item.name}</span> 
                      ) : ( 
                        <span style={{ fontSize: '11px', color: '#334155' }}>⚡ 虛位以待</span> 
                      )}
                    </div>
                    {/* 一鍵升級鍛造欄位按鈕 */}
                    <button onClick={() => upgradeForge(slot)} style={{ width: '100%', marginTop: '4px', padding: '4px 8px', backgroundColor: gold >= forgeCost ? '#1e293b' : '#090d16', color: gold >= forgeCost ? '#38bdf8' : '#475569', border: `1px solid ${gold >= forgeCost ? '#38bdf8' : '#1e293b'}`, borderRadius: '6px', cursor: gold >= forgeCost ? 'pointer' : 'not-allowed', fontSize: '11px', fontWeight: 'bold', textAlign: 'center', transition: '0.2s' }}>
                      ⚡ 消耗 🪙{forgeCost.toLocaleString()} ➔ 鍛造升級 +0.1%
                    </button>
                  </div>
                );
              })}
            </div>
</>
              }
            </div>
                        {/* 🧙‍♂️ 終極版面校正：外層用 flex 左右並排！把屬性與天賦拉開，畫面瞬間大器舒暢 */}
            <div style={{ display: 'flex', gap: '16px', width: '100%', marginTop: '16px', marginBottom: '16px', flexWrap: 'wrap' }}>
              
                           {/* 🟢 基礎屬性增幅：徹底拔除卡死人的 ...fontStyle！字體縮小、左右兩側精準對齊 */}
              <div style={{ flex: 1, minWidth: '240px' }}>
                <h2 style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#38bdf8', fontWeight: 'bold' }}>📊 基礎屬性增幅</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', backgroundColor: '#020617', border: '1px solid #1e293b', padding: '12px', borderRadius: '12px' }}>
                  
                  {/* ⚔️ 攻擊屬性列 */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', borderBottom: '1px solid #0f172a', paddingBottom: '4px' }}>
                    <span style={{ color: '#64748b', fontWeight: 'bold' }}>攻擊</span>
                    <span style={{ fontWeight: 'bold', color: '#fff', fontFamily: 'monospace', fontSize: '12px' }}>{stats.attack.toLocaleString()}</span>
                  </div>

                  {/* 🛡️ 防禦屬性列 */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', borderBottom: '1px solid #0f172a', paddingBottom: '4px', paddingTop: '2px' }}>
                    <span style={{ color: '#64748b', fontWeight: 'bold' }}>防禦</span>
                    <span style={{ fontWeight: 'bold', color: '#fff', fontFamily: 'monospace', fontSize: '12px' }}>{stats.defense.toLocaleString()}</span>
                  </div>

                  {/* ❤️ 生命屬性列 */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', paddingTop: '2px' }}>
                    <span style={{ color: '#64748b', fontWeight: 'bold' }}>生命</span>
                    <span style={{ fontWeight: 'bold', color: '#fff', fontFamily: 'monospace', fontSize: '12px' }}>{stats.health.toLocaleString()}</span>
                  </div>

                </div>
              </div>


              {/* 🟣 右半邊：🌌 天賦神殿 (佔比 1) */}
              <div style={{ flex: 1, minWidth: '240px' }}>
                <h2 style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#a855f7', fontWeight: 'bold' }}>🌌 天賦神殿 (總屬性 +1%)</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {["攻擊天賦", "防禦天賦", "生命天賦"].map((talentName) => {
                    const currentLv = talentLevels[talentName] || 0;
                    const cost = 500000000 + currentLv * currentLv * 200000000;
                    return (
                      <div key={talentName} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#090514', border: '1px solid #581c87', padding: '8px 12px', borderRadius: '10px' }}>
                        <span style={{ fontSize: '12px', color: '#c084fc', fontWeight: 'bold' }}>{talentName} <span style={{ color: '#a855f7' }}>(Lv.{currentLv} / +{currentLv}%)</span></span>
                        <button onClick={() => upgradeTalent(talentName)} style={{ padding: '6px 12px', backgroundColor: gold >= cost ? '#3b0764' : '#05020a', color: gold >= cost ? '#d8b4fe' : '#4a207a', border: `1px solid ${gold >= cost ? '#a855f7' : '#3b0764'}`, borderRadius: '6px', cursor: gold >= cost ? 'pointer' : 'not-allowed', fontSize: '11px', fontWeight: 'bold', transition: '0.2s', minWidth: '100px' }}>
                          ⚡ {currentLv === 0 ? '覺醒' : '升級'} ({cost >= 100000000 ? `${(cost/100000000).toFixed(1)}億` : cost.toLocaleString()})
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

          </div>
                    {/* 核心修正：解鎖手動升級寶箱按鈕至 40 等 */}
          <button 
            onClick={upgradeChest} 
            disabled={chestLevel >= 40 || gold < CHEST_LEVEL_CONFIGS[chestLevel]?.cost} 
            style={{ 
              width: '100%', marginTop: '16px', backgroundColor: '#1e293b', color: '#e2e8f0', 
              border: '1px solid #334155', padding: '10px', borderRadius: '10px', 
              cursor: 'pointer', fontSize: '12px', fontWeight: 'bold',
              opacity: (chestLevel >= 40 || gold < CHEST_LEVEL_CONFIGS[chestLevel]?.cost) ? 0.4 : 1 
            }}
          >
            {chestLevel < 40 ? `升級神壇寶箱 🪙 消耗 ${CHEST_LEVEL_CONFIGS[chestLevel]?.cost?.toLocaleString()}` : '🔮 寶箱神壇已達當前最大等級 (Lv.40)'}
          </button>

        </div>
        {/* 右側：掛機開箱鑑定 */}
        <div style={boxStyle}>
          <div style={{ backgroundColor: '#020617', padding: '16px', borderRadius: '12px', border: '1px solid #1e293b', textAlign: 'center', marginBottom: '16px' }}>
            <div style={{ fontSize: '36px', marginBottom: '4px' }}>🎁</div>
            <p style={{ margin: '0 0 10px 0', fontSize: '13px', color: '#94a3b8' }}>庫存餘量: <span style={{ color: '#fbbf24', fontWeight: 'bold' }}>{chestCount}</span> 個</p>
            
                {/* 修正：隨寶箱等級動態解鎖的多連抽智慧選單面板 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '10px', marginTop: '12px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <button onClick={() => setIsAutoOpen(!isAutoOpen)} style={{ backgroundColor: isAutoOpen ? '#dc2626' : '#059669', color: '#fff', border: 'none', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}>
                  {isAutoOpen ? '停止掛機' : '自動開箱'}
                </button>
                <select value={autoFilter} onChange={(e) => setAutoFilter(e.target.value)} style={{ backgroundColor: '#0f172a', color: '#cbd5e1', border: '1px solid #1e293b', borderRadius: '6px', fontSize: '11px', padding: '4px', outline: 'none' }}>
                  <option value="無">不自動分解</option>
                  <option value="普通">自動分解普通及以下</option>
                  <option value="優秀">自動分解優秀及以下</option>
                  <option value="精良">自動分解精良及以下</option>
                  <option value="史詩">自動分解史詩及以下</option>
                  <option value="傳說">自動分解傳說及以下</option>
                  <option value="神話">自動分解神話及以下</option>
                  <option value="不朽">自動分解不朽及以下</option>
                  <option value="超越">自動分解超越及以下</option>
                  <option value="鎏金">自動分解鎏金及以下</option>
                  <option value="永恆">自動分解永恆及以下</option>
                  <option value="至尊">自動分解至尊及以下</option>
                  <option value="無上">自動分解無上及以下</option>
                </select>
                </div>
              </div>

                {/* 🧙‍♂️ 動態連抽選單：5級一個階段完全解鎖 */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#020617', padding: '6px 10px', borderRadius: '8px', border: '1px solid #1e293b' }}>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>⚡ 連抽設定:</span>
                <select value={multiOpen} onChange={(e) => setMultiOpen(parseInt(e.target.value))} style={{ backgroundColor: '#0f172a', color: '#fbbf24', border: '1px solid #1e293b', borderRadius: '6px', fontSize: '11px', padding: '2px 6px', outline: 'none', fontWeight: 'bold' }}>
                  <option value={1}>單抽 (Lv.1 解鎖)</option>
                  <option value={5} disabled={chestLevel < 5}>5 連抽 {chestLevel < 5 ? '🔒(Lv.5)' : '🔓'}</option>
                  <option value={10} disabled={chestLevel < 10}>10 連抽 {chestLevel < 10 ? '🔒(Lv.10)' : '🔓'}</option>
                  <option value={20} disabled={chestLevel < 15}>20 連抽 {chestLevel < 15 ? '🔒(Lv.15)' : '🔓'}</option>
                  <option value={50} disabled={chestLevel < 20}>50 連抽 {chestLevel < 20 ? '🔒(Lv.20)' : '🔓'}</option>
                  <option value={100} disabled={chestLevel < 25}>100 連抽 {chestLevel < 25 ? '🔒(Lv.25)' : '🔓'}</option>
                  <option value={500} disabled={chestLevel < 30}>500 連抽 {chestLevel < 30 ? '🔒(Lv.30)' : '🔓'}</option>
                  <option value={1000} disabled={chestLevel < 35}>1000 連抽 {chestLevel < 35 ? '🔒(Lv.35)' : '🔓'}</option>
                  <option value={5000} disabled={chestLevel < 40}>5000 連抽 {chestLevel < 40 ? '🔒(Lv.40)' : '🔓'}</option>
                </select>
              </div>

            </div>


          {/* 鑑定面板與分解面板 */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ margin: '0 0 6px 0', fontSize: '12px', color: '#f59e0b' }}>✨ 掉落物屬性對比</h3>
              {newDrop ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ padding: '8px', borderRadius: '8px', border: '1px solid #fb923c', backgroundColor: '#7c2d12', fontSize: '12px' }}>
                    <div style={{ opacity: 0.6, fontSize: '10px' }}>{newDrop.slot}</div>
                    <div style={{ fontWeight: 'bold' }}>{newDrop.name}</div>
                  </div>
                  <div style={{ backgroundColor: '#020617', padding: '10px', borderRadius: '8px', fontSize: '12px', fontFamily: 'monospace', lineHeight: '1.5' }}>
                    <div>攻擊: {newDrop.attack} <span style={{ color: '#4ade80' }}>({currentEquippedItem ? `+${newDrop.attack - currentEquippedItem.attack}` : `+${newDrop.attack}`})</span></div>
                    <div>防禦: {newDrop.defense} <span style={{ color: '#4ade80' }}>({currentEquippedItem ? `+${newDrop.defense - currentEquippedItem.defense}` : `+${newDrop.defense}`})</span></div>
                    <div>生命: {newDrop.health} <span style={{ color: '#4ade80' }}>({currentEquippedItem ? `+${newDrop.health - currentEquippedItem.health}` : `+${newDrop.health}`})</span></div>
                  </div>
                    {/* 🧙‍♂️ 核心新增：舊裝備面板！將換下來的裝備同步顯示，並用綠色/紅色即時看出戰力加減 */}
                              <div>
              <h3 style={{ margin: '0 0 6px 0', fontSize: '12px', color: '#f59e0b' }}>✨ 新舊裝備屬性對比 (綠加紅減)</h3>
              {newDrop ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {/* 🟢 掉落欄主位：顯示剛抽到 (或剛換下來) 的新目標 */}
                  <div style={{ padding: '8px', borderRadius: '8px', border: `1px solid ${RARITY_SETTINGS[newDrop.rarity].color}`, backgroundColor: RARITY_SETTINGS[newDrop.rarity].bg, fontSize: '12px' }}>
                    <div style={{ opacity: 0.6, fontSize: '10px' }}>{newDrop.slot} - 掉落物/待處置</div>
                    <div style={{ fontWeight: 'bold', color: RARITY_SETTINGS[newDrop.rarity].color }}>{newDrop.name}</div>
                  </div>
                  
                  <div style={{ backgroundColor: '#020617', padding: '10px', borderRadius: '8px', fontSize: '12px', fontFamily: 'monospace', lineHeight: '1.5' }}>
                    <div>攻擊: {newDrop.attack} {currentEquippedItem ? ( <span style={{ color: newDrop.attack - currentEquippedItem.attack >= 0 ? '#4ade80' : '#f87171' }}>({newDrop.attack - currentEquippedItem.attack >= 0 ? `+${newDrop.attack - currentEquippedItem.attack}` : `${newDrop.attack - currentEquippedItem.attack}`})</span> ) : <span style={{ color: '#4ade80' }}>({`+${newDrop.attack}`})</span>}</div>
                    <div>防禦: {newDrop.defense} {currentEquippedItem ? ( <span style={{ color: newDrop.defense - currentEquippedItem.defense >= 0 ? '#4ade80' : '#f87171' }}>({newDrop.defense - currentEquippedItem.defense >= 0 ? `+${newDrop.defense - currentEquippedItem.defense}` : `${newDrop.defense - currentEquippedItem.defense}`})</span> ) : <span style={{ color: '#4ade80' }}>({`+${newDrop.defense}`})</span>}</div>
                    <div>生命: {newDrop.health} {currentEquippedItem ? ( <span style={{ color: newDrop.health - currentEquippedItem.health >= 0 ? '#4ade80' : '#f87171' }}>({newDrop.health - currentEquippedItem.health >= 0 ? `+${newDrop.health - currentEquippedItem.health}` : `${newDrop.health - currentEquippedItem.health}`})</span> ) : <span style={{ color: '#4ade80' }}>({`+${newDrop.health}`})</span>}</div>
                  </div>

                  {/* 🧙‍♂️ 舊裝備對比欄：當身上有穿衣服時，在下方顯示即將被對調下來的舊裝備數值 */}
                  {currentEquippedItem && (
                    <div style={{ marginTop: '4px', paddingTop: '8px', borderTop: '1px dashed #334155' }}>
                      <div style={{ padding: '6px', borderRadius: '6px', backgroundColor: '#020617', border: '1px solid #1e293b', fontSize: '11px', marginBottom: '4px' }}>
                        <span style={{ color: '#64748b' }}>🧍 身上穿戴：</span>
                        <span style={{ color: RARITY_SETTINGS[currentEquippedItem.rarity].color, fontWeight: 'bold' }}>{currentEquippedItem.name}</span>
                      </div>
                    </div>
                  )}
                </div>
              ) : <p style={{ color: '#475569', fontSize: '12px', textAlign: 'center', padding: '30px 0', margin: 0, fontStyle: 'italic' }}>等待開啟寶箱...</p>}
            </div>

                </div>
              ) : (
                <p style={{ color: '#475569', fontSize: '12px', textAlign: 'center', padding: '30px 0', margin: 0, fontStyle: 'italic' }}>等待神木開啟寶箱...</p>
              )}
            </div>

            {newDrop && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '12px' }}>
                <button onClick={sellItem} style={{ backgroundColor: '#334155', color: '#cbd5e1', border: '1px solid #475569', padding: '8px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>
                  分解 🪙+{newDrop.sellValue}
                </button>
                <button onClick={equipItem} style={{ backgroundColor: '#059669', color: '#fff', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>
                  換上裝備
                </button>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
