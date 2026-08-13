// =========================================================================
// 程式貓標準架構配置檔 (遵循 next-liteprofile 官方規範)
// =========================================================================

// 1. base 模組：網站基本配置，包含導航欄、頁尾和網站名稱
export const base = {
  title: "玥楓",
  description: "玥楓的個人品牌網站 | AI 工程師 × 機械工程師的科技空間",
};

// 2. hero 模組：首頁頂部主視覺區塊的核心文字
export const hero = {
  title: "玥楓",
  subtitle: "不專業的 AI 工程師 × 機械工程師 （我什麼都不會）",
};

// 3. about 模組：關於我詳細介紹、經歷與專長標籤
export const about = {
  bio: "目前是機械與機電工程學系準大一。",
  skills: ["我不會C語言", "我不會3D建模", "我不會玩遊戲", "我不會股票","我會看小說"],
};

// 4. project 模組：精選專案/作品集列表資料
export const project = [
  {
    id: 1,
    title: "2048貓咪開箱傳說",
    desc: "結合2048與開箱的小遊戲，可以透過2048獲得金幣和寶箱",
    tech: ["不知道", "不知道", "不知道"],
    url:"https://001-2048game.vercel.app/"
  },
  {
    id: 2,
    title: "專案2",
    desc: "介紹",
    tech: ["使用能力", "使用能力", "使用能力"],
    url:""
  }
];

// 5. contest 模組：展示個人的比賽/證照/活動資歷、排名與官方連結
export const contest = [
  {
    name: "APCS 大學程式設計先修檢測",
    rank: "觀念 4 級 (前 3% ~ 20%)",
    level: "全國檢定", // 💡 新增的級別標籤
    about: "Advanced Placement Computer Science，檢測模式參考美國大學先修課程，為台灣資訊工程核心能力之重要指標。",
    official: "https://apcs.csie.ntnu.edu.tw/",
  },{
    name: "FRC 全球高中生機器人競賽",
    rank: "2024賽季 洛杉磯區域賽",
    level: "國際級", // 💡 新增的級別標籤
    about: "For Inspiration and Recognition of Science and Technology Robotics Competition",
    official: "https://www.firstinspires.org/programs/frc/",
  },{
    name: "FRC 全球高中生機器人競賽",
    rank: "2025賽季 台灣區域賽",
    level: "國際級", // 💡 新增的級別標籤
    about: "For Inspiration and Recognition of Science and Technology Robotics Competition",
    official: "https://www.firstinspires.org/programs/frc/",
  },{
    name: "FRC 全球高中生機器人競賽",
    rank: "2026賽季 夏威夷區域賽",
    level: "國際級", // 💡 新增的級別標籤
    about: "For Inspiration and Recognition of Science and Technology Robotics Competition",
    official: "https://www.firstinspires.org/programs/frc/",
  }
  /*
  {
    name: "",
    rank: "",
    level:"",
    about: "",
    official: "",
  }
  */
];

// 6. social 模組：社群平台與外部聯絡管道 (對齊拼音並補上預防爆錯的空值)
export const social = {
  instagram: "https://www.instagram.com/liu_senryckey/",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  email: "your-email@example.com",
};

// 7. tabinfo 模組：分頁籤資訊（切換展示比賽、技能、團隊）
export const tabinfo = {
  獎項: {
    content: [
      "中和高中2026畢業獎項 - 校長獎（全校僅三位）",
      "中和高中2026畢業獎項 - 服務獎",
    ]
  },
  會一點的技能: {
    content: [
      "Onshape",
      "Blender",
      "C",
      "Vibe-coding",
      "簡易魔術",
      "樂高",
      "Minecraft紅石機關",
      "Minecraft指令(Java)",
      "3D列印",
      "簡易3D動畫",
      "大型機具操作",
      "網頁設計入門"
    ]
  },
  團隊參與: {
    content: [
      "2025中和FRC機器人校隊 - 副隊長",
      "2025中和FRC機器人校隊 - 機構組組長",
      "2026中和FRC機器人校隊 - Driver Team Coach",
      "程式貓科技教育社群 - 核心委員",
      "程式貓科技教育社群 - CodeCat AI - 專案主持人",
      "程式貓科技教育社群 - Takasagos War 台域戰策 - 專案主持人",
    ]
  },
  遊戲: {
    content: [
      "Minecraft",
      "傳說對決",
      "極速領域",
      "貓咪大戰爭",
      "菇勇者傳說",
      "元氣騎士",
      "其他一些小遊戲"
    ]
  },
  社群媒體: {
    content: [
      "Line",
      "Facebook",
      "Instagram",
      "Threads",
      "Gmail",
      "Youtube",
      "Discord"
    ]
  },
  股票: {
    content: [
      "非即時更新 為最佳交易紀錄(單筆50%以上)及目前持股",
      
      "2454聯發科2026/4/20 以2570買進 2026/5/25時以4245賣出 獲利約65.18% 26個交易日，平均2.61%/天",
      "6739竹陞科技2026/3/30 以1160買進 2026/4/21時以1755賣出 獲利約50.82% 17個交易日，平均3.39%/天",
      "00929復華台灣科技優息2026/4/13 以19.98買進 2026/5/27時以30.08賣出 獲利約50.35% 32個交易日，平均1.57%/天",
      
      "川湖2026/7/30 以7040買進 2026/8/7時已至11110 獲利約57.29%,2026/8/10該日最高漲到12220 獲利約72.58% 目前8個交易日，平均9.07%/天",
      
      "川湖",
      "台積電",
      "聯發科",
      "竹陞科技",
      "凌華",
      "微星",
      "瑞昱",
      "鴻海",
      "南亞",
      "緯創",
      "聯電",
      "泰金寶-DR",
      "兆豐金",
      
      
    ]
  }
};

// 8. friends 模組：友情連結列表（可自由增減朋友的網站）
export const friends = [
  /*
  {
    name: "玥楓",
    url: "https://yue-fon.vercel.app/",
    desc: "我什麼都不會",//介紹
    image: "https://yue-fon.vercel.app/YueFon.svg" // 放圖片網址或位置
  },
*/
  {
    name: "程式貓 CodeCat",
    url: "https://codecat.tw",
    desc: "程式貓科技教育社群",
    image: "/CodeCat.png" // 放圖片網址或位置
  },
  {
    name: "淳",
    url: "https://chuen666666.com",
    desc: "群除我佬，我是肺霧",
    image: "https://chuen666666.com/img/avatar.jpg" // 放圖片網址或位置
  },{
    name: "YD 楊光地",
    url: "https://www.kuang-ti.com",
    desc: "希望大佬不嫌棄我這個菜雞，等哪天有空我也會在我個網放你們的",
    image: "https://www.kuang-ti.com/logo.png" // 放圖片網址或位置
  },{
    name: "Steven",
    url: "https://steventeng.uk",
    desc: "好玩😊",
    image: "https://steventeng.uk/steven-drawing.png" // 放圖片網址或位置
  },{
    name: "電神",
    url: "https://example.com",
    desc: "裝弱的電神朋友",
    image: "/name.png" // 放圖片網址或位置
  },{
    name: "電神",
    url: "https://example.com",
    desc: "裝弱的電神朋友",
    image: "/name.png" // 放圖片網址或位置
  }
];



//修改完於終端執行以下指令更新網站
//git add .
//git commit -m "update profile"
//git push
//網址:https://yue-fon.vercel.app/
//頭像網址:https://yue-fon.vercel.app/YueFon.png