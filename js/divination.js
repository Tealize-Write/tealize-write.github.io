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
        text: "今日創意值爆表，適合天馬行空、先寫再說。你現在最不需要的東西叫做「想太多」。先動筆，邏輯等會再補，補不上當作是風格。"
      },
      {
        name: "紅馳增幅",
        luck: "小吉", emoji: "🔥",
        text: "腦子很適合生出「這大家一定會愛」的東西。把會讓人尖叫的橋段先記下來，細節之後補，氣勢先贏了再說。"
      },
      {
        name: "藍行校正",
        luck: "平", emoji: "📘",
        text: "靈感不是沒有，是你的腦內編輯正在瘋狂挑錯。今天適合修設定、補漏洞、整理時間線，沉澱一下讓作品更好。"
      },
      {
        name: "墨佇沉澱",
        luck: "小吉", emoji: "🖋️",
        text: "今日適合寫一些讓人看完沉默三秒的段落。你想傳達的事物，終會打動對的人。"
      },
      {
        name: "銀倚共鳴",
        luck: "大吉", emoji: "🐶",
        text: "角色感情線今天特別有反應，很適合補人物互動、心境轉折，還有那些你平常嫌肉麻但其實很香的段落。放心寫，讀者會買單的。"
      },
      {
        name: "字命覺醒",
        luck: "大吉", emoji: "📚",
        text: "失蹤的靈感正在自己游回來。那份你以為已經死透的舊稿，今天打開可能會突然順很多。建議打鐵趁熱，別讓它化為怨念。"
      },
      {
        name: "核心點亮",
        luck: "大吉", emoji: "✨",
        text: "恭喜，你的創作正在聚型。角色、衝突或主題之中，至少有一個東西開始發光了。快記下來，別讓它跑了。"
      },
      {
        name: "字穢警戒",
        luck: "平", emoji: "🫠",
        text: "那堆放著不管的殘稿正在角落默默長出黑斑。今天與其開新坑，不如先去整理舊稿。不然總有一天它們會化為怨念找你算帳。"
      },
      {
        name: "私人書室的加護",
        luck: "小吉", emoji: "🕯️",
        text: "今天關掉一切安靜地獨自寫文，不看訊息、不滑廢文，直接將世界靜音。"
      },
      {
        name: "比賽模式",
        luck: "大吉", emoji: "🎯",
        text: "現在很適合衝進度。氣勢來了就衝，你會發現自己寫得比想像中更快。"
      },
      {
        name: "字讀過載",
        luck: "平", emoji: "😵",
        text: "閱讀許多後，不如也寫點什麼？"
      },
      {
        name: "挖坑獸聚集",
        luck: "小吉", emoji: "💭",
        text: "靈感很多，多到有點吵。有個新點子正在對你招手，而且長得非常迷人。你會同時想寫五個橋段、三條支線、兩個新坑。建議先抓一個，不然最後只會快樂爆炸什麼都沒寫完。"
      },
      {
        name: "死線獸逼近",
        luck: "凶", emoji: "⏰",
        text: "死線像條蛇爬上你的脖子，而且牠看起來越長越肥。再滑手機的話就沒時間囉？"
      },
      {
        name: "填坑獸的美食",
        luck: "小吉", emoji: "✂️",
        text: "今天很適合修文。刪贅字、處理病句、你會發現你終於將不停繁殖的贅字結扎了。"
      },
      {
        name: "摸魚獸的誘惑",
        luck: "平", emoji: "🛋️",
        text: "今天摸魚能量偏高，很想休息一下，然後一休就是整個晚上。可以休，但請先寫一小段，不然你之後會心虛。"
      },
      {
        name: "完稿的預兆",
        luck: "大吉", emoji: "🏆",
        text: "這是少數適合收尾的日子。結尾、修尾、交稿，都有加成。勝利就在眼前！"
      },
      {
        name: "挖坑獸在設定集中翻滾",
        luck: "平", emoji: "📎",
        text: "挖坑獸蹲在你的設定集裡玩耍，讓你不斷補世界觀、寫角色設定。表面上看起來沒毫無進度，但讓你的字命更加扎實穩固。"
      },
      {
        name: "瑪臨的祝福",
        luck: "大吉", emoji: "🎉",
        text: "今天整體創作運勢都在你這邊。靈感有、手感有、執行力也沒失蹤。這種日子不寫文，真的對不起宇宙和你的鍵盤。"
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