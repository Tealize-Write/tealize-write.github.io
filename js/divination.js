/* ══════════════════════════════════════
   divination.js — 本次創作占卜台
   無外部依賴，DOMContentLoaded 後自執行
   ══════════════════════════════════════ */
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  (function initDivination() {
    const HEXAGRAMS = [
      { name: "屯卦", symbol: "䷂", luck: "小吉", emoji: "🌱",
        text: "萬物初生，困頓中蘊藏生機。靈感雖尚未成形，宜隨手記錄，莫急著完稿。" },
      { name: "需卦", symbol: "䷄", luck: "平", emoji: "☁️",
        text: "雲上有雨，等待是智慧。不必強求突破，讓想法自然沉澱，時機到了一切水到渠成。" },
      { name: "比卦", symbol: "䷇", luck: "小吉", emoji: "🤝",
        text: "萬水歸海，同類相親。宜與創作同伴交流，一個對話往往勝過獨自苦思三小時。" },
      { name: "觀卦", symbol: "䷓", luck: "小吉", emoji: "👁️",
        text: "登高遠觀，洞察入微。宜廣泛涉獵、觀察生活，素材就藏在你以為無聊的細節裡。" },
      { name: "賁卦", symbol: "䷕", luck: "小吉", emoji: "✨",
        text: "文飾之美，光華內斂。適合打磨已有的文字，細節決定質感，宜修改勝於新寫。" },
      { name: "復卦", symbol: "䷗", luck: "大吉", emoji: "🌅",
        text: "一陽來復，否極泰來。靈感回流，曾擱置的創作計畫值得重新翻出來看看。" },
      { name: "頤卦", symbol: "䷙", luck: "平",  emoji: "🍵",
        text: "頤養正道，慎其所食。宜休息，為創作補充能量。好好吃飯、好好睡覺才是正事。" },
      { name: "坎卦", symbol: "䷜", luck: "平",  emoji: "💧",
        text: "習坎維心，水流不止。可能遭遇卡關，但只要保持節奏，自然能穿越瓶頸。" },
      { name: "晉卦", symbol: "䷢", luck: "大吉", emoji: "☀️",
        text: "明出地上，文采大放。文思泉湧，宜趁早提筆，靈感不等人，先寫再說。" },
      { name: "益卦", symbol: "䷩", luck: "大吉", emoji: "🌊",
        text: "損上益下，利有攸往。所投入的創作時間將得到豐厚回報，勇於嘗試新寫法。" },
      { name: "升卦", symbol: "䷭", luck: "小吉", emoji: "🪜",
        text: "地中生木，積小成高。宜訂下小目標，哪怕只寫一段話，累積才是王道。" },
      { name: "井卦", symbol: "䷯", luck: "平",  emoji: "🪣",
        text: "木上有水，汲而不竭。靈感如地下水，需要靜下心來才能汲到，宜閱讀蓄積。" },
      { name: "渙卦", symbol: "䷺", luck: "小吉", emoji: "🌬️",
        text: "風行水上，渙然冰釋。宜整理思緒，將雜亂的創作碎片梳理成清晰的脈絡。" },
      { name: "節卦", symbol: "䷻", luck: "平",  emoji: "🎋",
        text: "澤上有水，節制有度。切勿熬夜，適度創作才能長久，休息也是一種生產力。" },
      { name: "既濟", symbol: "䷾", luck: "大吉", emoji: "🎯",
        text: "水火既濟，萬事俱備。適合完稿或提交作品，一鼓作氣，收尾就在今天。" },
      { name: "謙卦", symbol: "䷎", luck: "小吉", emoji: "🌙",
        text: "地中有山，謙謙君子。宜回顧舊作，帶著謙遜之心重讀，往往有意想不到的發現。" },
      { name: "豫卦", symbol: "䷏", luck: "大吉", emoji: "🎶",
        text: "雷出地奮，歡欣鼓舞。創作能量滿載，跟著感覺走，不必想太多，動筆就對了。" },
      { name: "隨卦", symbol: "䷐", luck: "小吉", emoji: "🍃",
        text: "澤中有雷，順勢而為。宜順著當下的心情創作，不要強迫自己寫不想寫的部分。" },
      { name: "蠱卦", symbol: "䷑", luck: "平",  emoji: "🔧",
        text: "山下有風，振弊起衰。適合整理積壓的待辦，修繕舊稿勝過倉促開新坑。" },
      { name: "臨卦", symbol: "䷒", luck: "大吉", emoji: "🌄",
        text: "地上有澤，大來吉亨。諸事順遂，靈感與執行力雙雙在線，把握機會大幹一場。" },
    ];

    const hex = HEXAGRAMS[Math.floor(Math.random() * HEXAGRAMS.length)];

    const elSymbol = document.getElementById("divSymbol");
    const elName   = document.getElementById("divName");
    const elLuck   = document.getElementById("divLuck");
    const elText   = document.getElementById("divText");

    if (!elSymbol) return;

    elSymbol.textContent = hex.emoji;
    elName.textContent   = hex.name;
    elText.textContent   = hex.text;
    elLuck.textContent   = hex.luck;
    elLuck.className     = `divination-luck luck-${hex.luck}`;
  })();
});