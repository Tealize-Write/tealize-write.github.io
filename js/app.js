/* ══════════════════════════════════════
   Tealize Base v3 - Core Script (終極修復版 2.0)
   ══════════════════════════════════════ */
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement; // ✅ 修正：把主導權還給 html
  const body = document.body;
  const isMobile = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  let canvas, ctx, particles = [], animationId;

  // 1. 字典定義：完整收錄所有區塊的翻譯
  const i18nData = {
    zh: {
      "nav-home": "奇想基地", "nav-sc": "字命覺醒", "nav-lag": "咬了神一口", "nav-soil": "穿越者種土裡", "nav-game": "反轉的真實",
      "cat-novel": '<i class="fa-solid fa-book-open"></i> NOVELS | 小說區',
      "cat-game": '<i class="fa-solid fa-gamepad"></i> GAMES | 遊戲區',
      "tag-capricorn": "魔羯座", "tag-gamemaker": "遊戲 Maker", "tag-art": "繪圖", "tag-creator": "奇幻創作者",

      "sc-title": "NOVEL: 字命覺醒",
      "sc-quote": "「因為是文閉所以會贏。」「冠軍是我們的，你們加油吧。」",
      "sc-sys": "[系統提示] 偵測到高濃度迷因與校園奇幻反應，創作即魔法。",
      "sc-vol1": "VOL.1 小心字穢",
      "sc-vol2": "VOL.2 字者互毆",
      "sc-side": "序曲：北車地下城守則",
      "sc-quiz-title": "🧪 創作者屬性鑑定 (心理測驗)",
      "sc-quiz-btn": '開始測驗 <i class="fa-solid fa-wand-magic-sparkles"></i>',

      "lag-title": "NOVEL: 《咬了神一口》",
      "lag-quote": "「改編自美女與野獸。山上有座不能亂碰的莊園，摘花要付出代價，說謊也有代價。」",
      "lag-subtitle": "A Bite of God &nbsp;·&nbsp; Beauty &amp; the Beast retelling",
      "lag-desc": "山上有座不能亂碰的莊園。<br>摘花要付出代價，說謊也有代價。<br>黎昂只是想把弟弟帶回家。<br>但他從來不是會乖乖服從規則的獅子。<br>於是，他咬了神一口。<br>或許還不只一口。",
      "lag-purchase": '<span style="color:var(--text-sub);font-size:0.9rem;font-style:italic;"><i class="fa-solid fa-clock"></i> 購書連結 — 即將上線</span>',
      "lag-afterword-btn": '<i class="fa-solid fa-scroll"></i> 閱讀後記',
      "lag-quiz-btn": '測測你的黑暗特質 <i class="fa-solid fa-arrow-right"></i>',

      "soil-title": "NOVEL：REVISING (修文施工中)",
      "soil-read": "點擊閱讀",
      "soil-booktitle": "是誰把穿越者種在土裡",
      "soil-sys": "[系統提示] 恐龍注意！",
      "soil-quote": "「17歲的蘇海躍選擇結束生命，卻在陌生山林的泥土裡被挖了出來。」",
      "soil-desc": "一個人類分為 ABO、幽靈依附費洛蒙、恐龍遊蕩於街頭的瘋狂世界。蘇海躍在這個怪異卻溫暖的日常中，遇見了蒼白如鬼的 Alpha 陸翎邑。新聞上另一個「完美的蘇海躍」失蹤案，揭開了橫跨兩個世界的巨大陰謀。",
      "soil-link": '<i class="fa-solid fa-arrow-right"></i> 前往 KadoKado',

      "game-title": "GAME: 恐怖民俗RPG遊戲",
      "game-web": '<i class="fa-solid fa-globe"></i> 遊戲官網',
      "game-forum": '<i class="fa-solid fa-comments"></i> 巴哈姆特',
      "game-warn": '<i class="fa-solid fa-triangle-exclamation"></i> 【系統警告】包含大量紅色顏料與精神污染（開玩笑的，但也許不是）。',

      "modal-title": "⚠ 劇透警告",
      "modal-body": "後記包含《咬了神一口》的劇情劇透，<br>建議閱讀完正文後再前往。",
      "modal-sub": "確定要繼續嗎？",
      "modal-cancel": "返回",
      "modal-confirm": '<i class="fa-solid fa-arrow-right"></i> 我要閱讀'
    },
    en: {
      "nav-home": "Tealize Hub", "nav-sc": "Word Awakening", "nav-lag": "Bitten by God", "nav-soil": "Soil Crossing", "nav-game": "Reversed Truth",
      "cat-novel": '<i class="fa-solid fa-book-open"></i> NOVELS',
      "cat-game": '<i class="fa-solid fa-gamepad"></i> GAMES',
      "tag-capricorn": "Capricorn", "tag-gamemaker": "Game Maker", "tag-art": "Illustration", "tag-creator": "Fantasy Creator",

      "sc-title": "NOVEL: Word Awakening",
      "sc-quote": '"Because I\'m a closed-writer, I\'ll win." "The championship is ours."',
      "sc-sys": "[System Prompt] High concentration of memes & school fantasy detected.",
      "sc-vol1": "VOL.1 Beware of Word-Filth",
      "sc-vol2": "VOL.2 Writers' Brawl",
      "sc-side": "Prologue: Taipei Main Station Rules",
      "sc-quiz-title": "🧪 Creator Attribute Assessment",
      "sc-quiz-btn": 'Start Test <i class="fa-solid fa-wand-magic-sparkles"></i>',

      "lag-title": "NOVEL: Bitten by God",
      "lag-quote": '"A Beauty and the Beast retelling. There\'s an untouchable manor on the mountain..."',
      "lag-subtitle": "A Bite of God &nbsp;·&nbsp; Beauty &amp; the Beast retelling",
      "lag-desc": "There is a manor on the mountain that shouldn't be touched.<br>Picking flowers has a price, and lying does too.<br>Leon just wanted to bring his brother home.<br>But he's never been an obedient lion.<br>So, he took a bite out of God.<br>Maybe more than one bite.",
      "lag-purchase": '<span style="color:var(--text-sub);font-size:0.9rem;font-style:italic;"><i class="fa-solid fa-clock"></i> Purchase Link — Coming Soon</span>',
      "lag-afterword-btn": '<i class="fa-solid fa-scroll"></i> Read Afterword',
      "lag-quiz-btn": 'Test Your Dark Traits <i class="fa-solid fa-arrow-right"></i>',

      "soil-title": "NOVEL: REVISING",
      "soil-read": "Click to Read",
      "soil-booktitle": "Who Planted the Time-Traveler in the Soil?",
      "soil-sys": "[System Prompt] Dinosaur Warning!",
      "soil-quote": '"17-year-old Su Hai-Yue chose to end his life, only to be dug out of the soil..."',
      "soil-desc": "A crazy world where humans are divided into ABO, ghosts cling to pheromones, and dinosaurs roam the streets. Su Hai-Yue meets the ghost-pale Alpha, Lu Ling-Yi, uncovering a massive conspiracy spanning two worlds.",
      "soil-link": '<i class="fa-solid fa-arrow-right"></i> Go to KadoKado',

      "game-title": "GAME: Folklore Horror RPG",
      "game-web": '<i class="fa-solid fa-globe"></i> Official Website',
      "game-forum": '<i class="fa-solid fa-comments"></i> Bahamut Forum',
      "game-warn": '<i class="fa-solid fa-triangle-exclamation"></i> [System Warning] Contains a large amount of red paint and mental pollution.',

      "modal-title": "⚠ Spoiler Warning",
      "modal-body": "The afterword contains major plot spoilers for Bitten by God.<br>We recommend reading the main story first.",
      "modal-sub": "Do you want to continue?",
      "modal-cancel": "Return",
      "modal-confirm": '<i class="fa-solid fa-arrow-right"></i> Read Afterword'
    }
  };

  // 2. 定義所有核心函式
  function setLang(lang) {
    html.lang = lang;
    localStorage.setItem("tealize.lang", lang);
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.dataset.i18n;
      if (i18nData[lang] && i18nData[lang][key]) el.innerHTML = i18nData[lang][key];
    });
    const langBtnSpan = document.querySelector("#langBtn span") || document.getElementById("langBtnLabel");
    if (langBtnSpan) langBtnSpan.textContent = html.lang === "zh" ? "EN" : "中文";
  }

  function toggleMode() {
    // ✅ 修正：讀取與寫入 html 的 data-mode
    const currentMode = html.getAttribute("data-mode");
    const newMode = currentMode === "visual" ? "code" : "visual";
    html.setAttribute("data-mode", newMode);
    localStorage.setItem("tealize.mode", newMode);
    
    if (newMode === "visual") initCanvas();
    else stopCanvas();
    updateVisualMode(newMode === "visual");
  }
  
  function updateVisualMode(isVisual) {
    const modeBtnIcon = document.querySelector("#modeBtn i");
    if (modeBtnIcon) modeBtnIcon.className = isVisual ? "fa-solid fa-terminal" : "fa-solid fa-wand-magic-sparkles";

    const visualContainer = document.getElementById("visual-mode");
    const codeContainer = document.getElementById("code-mode");
    
    if (visualContainer) {
      if (isVisual) visualContainer.classList.remove("hidden");
      else visualContainer.classList.add("hidden");
    }
    
    if (codeContainer) {
      if (isVisual) {
        codeContainer.classList.add("hidden");
      } else {
        codeContainer.classList.remove("hidden");
        if (typeof playCodeModeAnimation === "function") playCodeModeAnimation();
      }
    }
  }

  function playCodeModeAnimation() {
    const codeTitle = document.getElementById("code-title");
    const codeBio = document.getElementById("code-bio");
    const codeIntro = document.getElementById("code-intro");
    const codeContent = document.querySelector(".code-content");

    if (!codeTitle) return;

    if (codeTitle.dataset.typed === "true") {
      if (codeBio) codeBio.style.opacity = "1";
      if (codeIntro) codeIntro.style.opacity = "1";
      if (codeContent) codeContent.style.opacity = "1";
      return;
    }

    codeTitle.dataset.typed = "true";
    codeTitle.textContent = "";
    const text = "TEALIZE.HUB()";
    let i = 0;
    
    function typeWriter() {
      if (i < text.length) {
        codeTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 80);
      } else {
        if (codeBio) codeBio.style.opacity = "1";
        if (codeIntro) codeIntro.style.opacity = "1";
        if (codeContent) codeContent.style.opacity = "1";
      }
    }
    setTimeout(typeWriter, 300);
  }

  function toggleTheme() {
    // ✅ 修正：讀取與寫入 html 的 data-theme
    const currentTheme = html.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("tealize.theme", newTheme);
    syncIcons();
  }

  function syncIcons() {
    const avatarImg = document.getElementById("avatar-img") || document.getElementById("avatarImg");
    const themeBtnIcon = document.querySelector("#themeBtn i");
    const isDark = html.getAttribute("data-theme") === "dark";
    
    if (avatarImg) avatarImg.src = isDark ? "img/avatar_black.jpg" : "img/avatar_white.jpg";
    if (themeBtnIcon) themeBtnIcon.className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
  }

  // ── 平滑滾動 ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
     anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        if (targetId === "#") return;
        const target = document.querySelector(targetId);
        if (target) {
           window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 60, behavior: "smooth" });
        }
     });
  });

  // ── 咬了神一口：防雷彈窗邏輯 ──
  const spoilerBtn = document.getElementById("lagAfterwordBtn");
  const spoilerOverlay = document.getElementById("spoilerOverlay");
  if (spoilerBtn && spoilerOverlay) {
    const spoilerCancel = document.getElementById("spoilerCancel");
    const spoilerConfirm = document.getElementById("spoilerConfirm");

    const openModal = () => {
      spoilerOverlay.classList.add("active");
      spoilerOverlay.setAttribute("aria-hidden", "false");
      body.style.overflow = "hidden";
    };
    const closeModal = () => {
      spoilerOverlay.classList.remove("active");
      spoilerOverlay.setAttribute("aria-hidden", "true");
      body.style.overflow = "";
    };

    spoilerBtn.addEventListener("click", openModal);
    if (spoilerCancel) spoilerCancel.addEventListener("click", closeModal);
    if (spoilerConfirm) spoilerConfirm.addEventListener("click", () => {
      closeModal();
      window.open("lag-afterword.html", "_blank", "noopener,noreferrer");
    });
    spoilerOverlay.addEventListener("click", (e) => { if (e.target === spoilerOverlay) closeModal(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && spoilerOverlay.classList.contains("active")) closeModal(); });
  }

  // ── Canvas 背景粒子特效 ──
  function initCanvas() {
    canvas = document.getElementById("particlesCanvas");
    if (!canvas) return;
    ctx = canvas.getContext("2d");
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    createParticles();
    animateCanvas();
  }

  function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }

  function createParticles() {
    particles = [];
    const count = window.innerWidth > 768 ? 50 : 25;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        r: Math.random() * 2 + 1, vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.4 + 0.2
      });
    }
  }

  function animateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const accentColor = getComputedStyle(body).getPropertyValue("--accent-color");
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = accentColor.replace(')', `, ${p.opacity})`).replace('rgb', 'rgba');
      ctx.fill();
    });
    animationId = requestAnimationFrame(animateCanvas);
  }

  function stopCanvas() {
    if (animationId) cancelAnimationFrame(animationId);
    if (canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      window.removeEventListener("resize", resizeCanvas);
    }
  }

  // ── 自訂游標 (強化版防干擾) ──
  function initCustomCursor() {
    const dot = document.querySelector(".cursor-dot");
    const outline = document.querySelector(".cursor-outline");
    if (!dot || !outline) return;

    let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
    let outlineX = mouseX, outlineY = mouseY;
    let cursorEnabled = false;

    window.addEventListener("mousemove", (e) => {
      if (!cursorEnabled) {
        body.dataset.cursor = "on";
        dot.style.display = "block";
        outline.style.display = "block";
        cursorEnabled = true;
      }
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + "px";
      dot.style.top  = mouseY + "px";
    }, { passive: true });

    function animateOutline() {
      if (cursorEnabled) {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;
        outline.style.left = outlineX + "px";
        outline.style.top  = outlineY + "px";
      }
      requestAnimationFrame(animateOutline);
    }
    animateOutline();

    document.querySelectorAll("a, button, .link-card, .neon-tag, .bubble-link, .control-btn").forEach(el => {
      el.addEventListener("mouseenter", () => { if (cursorEnabled) body.classList.add("cursor-active"); });
      el.addEventListener("mouseleave", () => body.classList.remove("cursor-active"));
    });
  }

  // 3. 讀取儲存的狀態並開始執行
  const savedMode = localStorage.getItem("tealize.mode") || html.getAttribute("data-mode") || "visual";
  const savedThemeStr = localStorage.getItem("tealize.theme") || html.getAttribute("data-theme") || "dark";
  html.setAttribute("data-mode", savedMode); // ✅ 修正：寫入 html
  html.setAttribute("data-theme", savedThemeStr); // ✅ 修正：寫入 html
  
  const savedLang = localStorage.getItem("tealize.lang") || (navigator.language.startsWith("en") ? "en" : "zh");
  setLang(savedLang);

  syncIcons();
  initCustomCursor();
  updateVisualMode(savedMode === "visual");
  if (savedMode === "visual") initCanvas();

  // ── 按鈕事件綁定 ──
  const btnTheme = document.getElementById("themeBtn");
  if (btnTheme) btnTheme.addEventListener("click", toggleTheme);

  const btnMode = document.getElementById("modeBtn");
  if (btnMode) btnMode.addEventListener("click", toggleMode);

  const btnLang = document.getElementById("langBtn");
  if (btnLang) btnLang.addEventListener("click", () => {
      const currentLang = html.lang;
      const nextLang = currentLang.includes("zh") ? "en" : "zh";
      setLang(nextLang);
  });

  // ── PWA Service Worker 註冊 (完整加回) ──
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").then(() => console.log("SW registered")).catch(() => {});
    });
  }
});