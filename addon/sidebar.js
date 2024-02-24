/* globals buildSettings */

function element(selector) {
  return document.querySelector(selector);
}

function applySystemTheme(classList) {
  classList.add("system-theme");
}

function applyDarkTheme(classList) {
  classList.add("dark-theme");
}

async function checkForDark() {
  const classList = document.querySelector(".page").classList;
  const extensions = await browser.management.getAll();
  const enabledExts = extensions.map(ext => ext.enabled ? ext.id : undefined).filter(e => e != null);
  classList.remove("system-theme");
  classList.remove("dark-theme");
  // The user has the default dark theme enabled
  if (enabledExts.includes("firefox-compact-dark@mozilla.org")) {
    applyDarkTheme(classList);
    return;
  }
  // The user has the default theme enabled
  if (enabledExts.includes("default-theme@mozilla.org")) {
    applySystemTheme(classList);
    return;
  }
}

async function init() {
  element("#watch-tutorial").onclick = () => {
    window.open("https://youtu.be/no6D_B4wgo8");
  };

  checkForDark();
  browser.management.onEnabled.addListener((info) => {
    checkForDark();
  });
}

init();
