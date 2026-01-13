document.addEventListener("DOMContentLoaded", function () {
  const root = document.documentElement;
  const langButtons = document.querySelectorAll(".lang-btn");

  function setLanguage(lang) {
    root.setAttribute("data-lang", lang);

    langButtons.forEach((btn) => {
      const target = btn.getAttribute("data-switch-lang");
      btn.classList.toggle("active", target === lang);
    });

    try {
      window.localStorage.setItem("preferred-lang", lang);
    } catch (e) {
      // ignore storage errors
    }
  }

  // 初始化语言：优先使用本地存储，其次根据浏览器语言猜测
  let initialLang = "zh";
  try {
    const stored = window.localStorage.getItem("preferred-lang");
    if (stored === "zh" || stored === "en") {
      initialLang = stored;
    } else {
      const browserLang = navigator.language || navigator.userLanguage || "";
      if (browserLang.toLowerCase().startsWith("en")) {
        initialLang = "en";
      }
    }
  } catch (e) {
    // ignore
  }
  setLanguage(initialLang);

  langButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetLang = btn.getAttribute("data-switch-lang");
      if (!targetLang) return;
      setLanguage(targetLang);
    });
  });

  // 平滑滚动到锚点
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (!href || href === "#") return;

      const id = href.slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
});
