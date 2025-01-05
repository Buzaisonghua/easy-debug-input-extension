let tabId = '';
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  tabId = tabs[0].id;
});
function setStorage(val) {
  /**
   * 将当前的文本框内容缓存
   */
  chrome.storage.local.set({ ...val }, function (result) {
    console.log('Retrieved data:', result.key);
  });
}
/**
 * background.js 中接收来自content.js中的消息
 */
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  // if (message.action === 'getViewsAllTextBox') {
  //   // 这里可以存储数据或者做一些处理
  //   console.log(
  //     '接收到了 来自content中的消息: getViewsAllTextBox',
  //     message.data
  //   );

  //   // 如果有 popup 打开，转发消息给 popup
  //   chrome.runtime.sendMessage({
  //     action: 'forToPopupGetViewsAllTextBox',
  //     data: message.data,
  //   });
  // }
  if (message.action === 'writeTextBoxValueStorageSendMsgContent') {
    const obj = {};
    obj[getTitle()] = message.data;
    console.log('????123', obj);
    setStorage(obj);
  }
  setTimeout(function () {
    sendResponse({ result: 'Task completed' });
  }, 1000);
  // 必须返回 true，以表示响应是异步的
  return true;
});

/**
 * 当前浏览器页面存到内存中的标题
 */
function getTitle() {
  return `easy-debug-input-extension:${tabId}`;
}
