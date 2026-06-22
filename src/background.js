let activeTab = "";
let startTime = Date.now();

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);

  if (activeTab) {
    saveTime();
  }

  activeTab = new URL(tab.url).hostname;
  startTime = Date.now();
});

function saveTime() {
  const timeSpent =
    Math.floor((Date.now() - startTime) / 1000);

  chrome.storage.local.get(["usage"], (result) => {
    const usage = result.usage || {};

    usage[activeTab] =
      (usage[activeTab] || 0) + timeSpent;

    chrome.storage.local.set({ usage });
  });
}
