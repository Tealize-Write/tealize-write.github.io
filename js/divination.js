/* ══════════════════════════════════════
   divination.js — 本次創作占卜台
   ══════════════════════════════════════ */
"use strict";

const DIVINATION_READINGS = [
  { nameKey: "div-green-name",    luckKey: "div-green-luck",    emoji: "🐈‍⬛", textKey: "div-green-text"    },
  { nameKey: "div-red-name",      luckKey: "div-red-luck",      emoji: "🔥",  textKey: "div-red-text"      },
  { nameKey: "div-blue-name",     luckKey: "div-blue-luck",     emoji: "📘",  textKey: "div-blue-text"     },
  { nameKey: "div-ink-name",      luckKey: "div-ink-luck",      emoji: "🖋️", textKey: "div-ink-text"      },
  { nameKey: "div-silver-name",   luckKey: "div-silver-luck",   emoji: "🐶",  textKey: "div-silver-text"   },
  { nameKey: "div-sc-name",       luckKey: "div-sc-luck",       emoji: "📚",  textKey: "div-sc-text"       },
  { nameKey: "div-core-name",     luckKey: "div-core-luck",     emoji: "✨",  textKey: "div-core-text"     },
  { nameKey: "div-filth-name",    luckKey: "div-filth-luck",    emoji: "🫠",  textKey: "div-filth-text"    },
  { nameKey: "div-room-name",     luckKey: "div-room-luck",     emoji: "🕯️", textKey: "div-room-text"     },
  { nameKey: "div-race-name",     luckKey: "div-race-luck",     emoji: "🎯",  textKey: "div-race-text"     },
  { nameKey: "div-overread-name", luckKey: "div-overread-luck", emoji: "😵",  textKey: "div-overread-text" },
  { nameKey: "div-pit-name",      luckKey: "div-pit-luck",      emoji: "💭",  textKey: "div-pit-text"      },
  { nameKey: "div-dead-name",     luckKey: "div-dead-luck",     emoji: "⏰",  textKey: "div-dead-text"     },
  { nameKey: "div-fill-name",     luckKey: "div-fill-luck",     emoji: "✂️", textKey: "div-fill-text"     },
  { nameKey: "div-slack-name",    luckKey: "div-slack-luck",    emoji: "🛋️", textKey: "div-slack-text"    },
  { nameKey: "div-done-name",     luckKey: "div-done-luck",     emoji: "🏆",  textKey: "div-done-text"     },
  { nameKey: "div-lore-name",     luckKey: "div-lore-luck",     emoji: "📎",  textKey: "div-lore-text"     },
  { nameKey: "div-bless-name",    luckKey: "div-bless-luck",    emoji: "🎉",  textKey: "div-bless-text"    },
];

// 隨機挑一組（固定後不再換）
const _divItem = DIVINATION_READINGS[Math.floor(Math.random() * DIVINATION_READINGS.length)];

function renderDivination() {
  const lang = document.documentElement.lang?.startsWith("en") ? "en" : "zh";
  const dict = window.i18nData?.[lang] || window.i18nData?.zh || {};

  const elSymbol = document.getElementById("divSymbol");
  const elName   = document.getElementById("divName");
  const elLuck   = document.getElementById("divLuck");
  const elText   = document.getElementById("divText");
  if (!elSymbol) return;

  elSymbol.textContent = _divItem.emoji;
  elName.textContent   = dict[_divItem.nameKey] || _divItem.nameKey;
  elText.textContent   = dict[_divItem.textKey] || _divItem.textKey;
  elLuck.textContent   = dict[_divItem.luckKey] || _divItem.luckKey;
  elLuck.className     = `divination-luck luck-${dict[_divItem.luckKey] || _divItem.luckKey}`;
}

// 初次渲染
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(renderDivination, 50); // 等 app.js setLang 跑完
});

// 語言切換時重新渲染（app.js 的 setLang 結束後會 dispatch 此事件）
document.addEventListener("langChanged", renderDivination);