let tabId = '';
let url = '';
chrome.tabs.onActivated.addListener(function (activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function (tab) {
    console.log('执行了吗', tab);
    tabId = tab.id;
    url = tab.url;
  });
});

/**
 * 将当前的文本框内容缓存
 */
function setStorage(val) {
  chrome.storage.local.set({ ...val }, function (result) {
    console.log('Retrieved data:', result);
  });
}
function getStorage() {
  const title = getTitle();
  chrome.storage.local.get([`${title}`], function (result) {
    if (!result[title]) return;
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: 'setTextBoxValueInStorageSendMsgBackground',
        data: result[title],
      });
    });
  });
}

/**
 * 当前浏览器页面存到内存中的标题
 */
function getTitle() {
  return `easy-debug-input-extension-${tabId}-${url}`;
}
/**
 * background.js 中接收来自content.js中的消息
 */
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === 'writeTextBoxValueStorageSendMsgContent') {
    const obj = {};
    obj[getTitle()] = message.data;
    setStorage(obj);
  }
  if (message.action === 'setTextBoxValueInStorageSendMsgContent') {
    getStorage();
  }
  setTimeout(function () {
    sendResponse({ result: 'Task completed' });
  }, 1000);
  // 必须返回 true，以表示响应是异步的
  return true;
});
