/* ══════════════════════════════════════
   divination.js — 本次創作占卜台
   無外部依賴，DOMContentLoaded 後自執行
   ══════════════════════════════════════ */
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  (function initDivination() {
    const READINGS = [
      {
        name: "綠躍迸發",
        luck: "大吉", emoji: "🐈‍⬛",
        text: "今日創意值爆表，適合亂寫、怪寫、先寫再說。你現在最不需要的東西叫做「想太多」。先動筆，邏輯等會再補，補不上再說是風格。"
      },
      {
        name: "紅馳增幅",
        luck: "小吉", emoji: "🔥",
        text: "腦子很適合生出「這很酷我要寫」的東西。把會讓人尖叫的橋段先記下來，細節之後救，氣勢先贏再說。"
      },
      {
        name: "藍行校正",
        luck: "平", emoji: "📘",
        text: "靈感不是沒有，是你的腦內編輯正在瘋狂挑錯。今天適合修設定、補漏洞、整理時間線，不適合硬擠浪漫場面。"
      },
      {
        name: "墨佇滲透",
        luck: "小吉", emoji: "🖋️",
        text: "今日適合寫一些讓人看完沉默三秒的句子。氣氛、隱喻、情緒餘韻都有加成。請小心不要連你自己也看不懂。"
      },
      {
        name: "銀倚共鳴",
        luck: "大吉", emoji: "🐶",
        text: "角色感情線今天特別有反應，很適合補人物互動、心境轉折，還有那些你平常嫌肉麻但其實很香的段落。放心寫，讀者會買單的。"
      },
      {
        name: "字命覺醒",
        luck: "大吉", emoji: "📚",
        text: "失蹤的靈感正在自己游回來。那份你以為已經死透的舊稿，今天打開可能會突然順很多。建議趁熱追打，別讓它再逃一次。"
      },
      {
        name: "核心點亮",
        luck: "大吉", emoji: "✨",
        text: "恭喜，你這次的重點終於不是一團霧。角色、衝突或主題之中，至少有一個東西開始發光了。快記下來，別讓它跑掉。"
      },
      {
        name: "字穢警戒",
        luck: "平", emoji: "🫠",
        text: "你那堆放著不管的殘稿正在角落默默長黑斑。今天與其開新坑，不如先去整理舊稿。不然遲早它們會半夜來掐你。"
      },
      {
        name: "私人書室加護",
        luck: "小吉", emoji: "🕯️",
        text: "今天適合躲起來寫，少看訊息，少滑廢文，少被世界打擾。你的創作運不是沒有，是一直被通知欄吸走。"
      },
      {
        name: "比賽模式",
        luck: "大吉", emoji: "🎯",
        text: "現在很適合衝進度。你不是沒能力，你只是平常沒把自己逼上場。今天那股「好我來了」的氣很夠，能寫就快寫。"
      },
      {
        name: "字讀過載",
        luck: "平", emoji: "😵",
        text: "你已經看太多、想太多、分析太多了。再看下去不是更懂作品，是先把自己看乾。今天請停止空想，寫一句都算贏。"
      },
      {
        name: "挖坑獸聚集",
        luck: "小吉", emoji: "💭",
        text: "靈感很多，多到有點吵。你會同時想寫五個橋段、三條支線、兩個新坑。建議先抓一個，不然最後只會快樂爆炸什麼都沒寫完。"
      },
      {
        name: "死線獸逼近",
        luck: "凶", emoji: "⏰",
        text: "死線正在爬過來，而且牠看起來很有精神。今天的你不適合思考人生，只適合把檔案打開——哪怕先寫標題都比躺平裝死強。"
      },
      {
        name: "填坑獸的美食",
        luck: "小吉", emoji: "✂️",
        text: "今天很適合修文。刪贅字、處理病句、重看一次你昨天自以為很帥的那句話。放心，刪掉通常真的會更好。"
      },
      {
        name: "摸魚獸的誘惑",
        luck: "平", emoji: "🛋️",
        text: "今天摸魚能量偏高，很想休息一下，然後一休就是整個晚上。可以休，但請先寫一小段，不然你之後會心虛。"
      },
      {
        name: "引用相性良好",
        luck: "小吉", emoji: "🧩",
        text: "今天很適合參考、拼接、重組靈感。看別人的作品不一定是在逃避，也可能是在幫你的腦內字命接線。"
      },
      {
        name: "新坑誘惑",
        luck: "凶", emoji: "😈",
        text: "有個新點子正在對你招手，而且長得非常迷人。但請注意，它不一定是救星，也可能只是來拆你現有進度的。請三思，再三思。"
      },
      {
        name: "完稿窗口",
        luck: "大吉", emoji: "🏆",
        text: "這是少數適合收尾的日子。結尾、修尾、交稿，都有加成。不要再說「我再看一下」——你再看下去只會多改三輪。"
      },
      {
        name: "設定挖井中",
        luck: "平", emoji: "📎",
        text: "今天比較適合挖世界觀、補規則、理清角色背景。表面上看起來沒產出，但這是在替之後少崩幾次提前鋪路。"
      },
      {
        name: "瑪臨高中偏心中",
        luck: "大吉", emoji: "🎉",
        text: "今天整體創作場都站你這邊。靈感有、手感有、執行力也沒失蹤。這種日子不寫，真的對不起宇宙和你的鍵盤。"
      }
    ];

    const reading = READINGS[Math.floor(Math.random() * READINGS.length)];

    const elSymbol = document.getElementById("divSymbol");
    const elName   = document.getElementById("divName");
    const elLuck   = document.getElementById("divLuck");
    const elText   = document.getElementById("divText");

    if (!elSymbol) return;

    elSymbol.textContent = reading.emoji;
    elName.textContent   = reading.name;
    elText.textContent   = reading.text;
    elLuck.textContent   = reading.luck;
    elLuck.className     = `divination-luck luck-${reading.luck}`;
  })();
});