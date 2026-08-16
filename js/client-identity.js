/* ══════════════════════════════════════
   client-identity.js — 共用訪客身分模組
   必須在 app.js / tracking.js / divination.js / music.js 之前載入
   ══════════════════════════════════════ */
"use strict";

window.ClientIdentity = (function () {
  let _cached = null;

  function safeGet(key) {
    try {
      return { ok: true, value: localStorage.getItem(key) };
    } catch (_) {
      return { ok: false, value: null };
    }
  }

  function safeSet(key, value) {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (_) {
      return false;
    }
  }

  function makeId() {
    return "tw_" + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
  }

  // 前後端共用規格：<英文字前綴>_<安全字元>，涵蓋本站(tw_)與各測驗(sc_/tale_/uid_)。
  // GAS/程式碼.gs 的 isValidClientId() 必須手動保持一致（此專案沒有共用模組機制）。
  function isValidClientId(value) {
    if (typeof value !== "string") return false;
    return /^[a-z]{2,16}_[A-Za-z0-9._-]{4,80}$/i.test(value);
  }

  // 依固定優先序解析身分：外部測驗共用ID → 本站既有 ID → 新建本站 ID → 記憶體 fallback
  // abyss_client_id 是 story-command-academy/DarkBLstory/TwistedTales 共用的 key，
  // 三者都是「已有值就沿用、沒有才新建」，同一裝置終身只會有一個值，不會被覆寫。
  // 非空不代表合法，仍須格式驗證，避免舊資料污染或外部程式寫入垃圾值被當成正式身分。
  function compute() {
    const statsRead = safeGet("abyss_client_id");
    const statsId = statsRead.value;
    if (statsId && isValidClientId(statsId)) {
      return {
        clientId: statsId,
        clientIdStatus: "legacy",
        clientIdStorageStatus: statsRead.ok ? "available" : "read_error",
        isLegacyStats: true,
      };
    }

    const existingRead = safeGet("tw_tealize_id");
    const existing = existingRead.value;
    if (existing) {
      return {
        clientId: existing,
        clientIdStatus: "existing",
        clientIdStorageStatus: existingRead.ok ? "available" : "read_error",
        isLegacyStats: false,
      };
    }

    const newId = makeId();

    // 讀取本身若已失敗，就不再嘗試寫入，直接記憶體 fallback
    if (!existingRead.ok) {
      return {
        clientId: newId,
        clientIdStatus: "memory_only",
        clientIdStorageStatus: "read_error",
        isLegacyStats: false,
      };
    }

    const wrote = safeSet("tw_tealize_id", newId);
    if (wrote) {
      return {
        clientId: newId,
        clientIdStatus: "created",
        clientIdStorageStatus: "available",
        isLegacyStats: false,
      };
    }

    return {
      clientId: newId,
      clientIdStatus: "memory_only",
      clientIdStorageStatus: "write_error",
      isLegacyStats: false,
    };
  }

  return {
    // 單例：同一頁面生命週期內，所有呼叫方拿到同一份結果
    get() {
      if (!_cached) _cached = compute();
      return _cached;
    },
  };
})();
