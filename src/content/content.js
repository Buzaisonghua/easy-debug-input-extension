/**
 * 获取当前页面所有的文本框
 */
function getViewsAllTextBox() {
  const textBox = Array.from($('input').not('input[type="hidden"]'));
  return textBox.map((val) => ({
    id: val.id,
    class: val.class,
    type: val.type,
    name: val.name,
    tagName: val.tagName,
    placeholder: val.placeholder,
    label: val.label,
    value: val.value,
  }));
}

/**
 * 接收来自popup的消息
 */
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === 'writeTextBoxValueStorageSendMsgPopup') {
    chrome.runtime.sendMessage({
      action: 'writeTextBoxValueStorageSendMsgContent',
      data: getViewsAllTextBox(),
    });
  }
  if (message.action === 'getViewTextBoxPopup') {
    console.log('接收到了getViewTextBoxPopup消息，通过background转发给popup');
    getViewsAllTextBoxContent();
  }
  if (message.action === 'setViewTextBoxPopupAll') {
    const textBox = Array.from($('input').not('input[type="hidden"]'));
    console.log('1111', textBox);
    textBox.forEach((val) => {
      console.log(val.value);
      val.value = 'debug-input-seting:' + val.placeholder;
    });
  }
  setTimeout(function () {
    sendResponse({ result: 'Task completed' });
  }, 1000);
  // 必须返回 true，以表示响应是异步的
  return true;
});

/**
 * content.js到popup.html之间的通信
 * 需要通过 background script
 * 在 content script 中发送消息到 background script
 */
// function getViewsAllTextBoxContent() {
//   chrome.runtime.sendMessage(
//     {
//       action: 'getViewsAllTextBox',
//       data: getViewsAllTextBox(),
//     },
//     function (response) {
//       console.log('easy-debug-input-extension：发消息给 backgrounds', response);
//     }
//   );
// }

// getViewsAllTextBox();

// // chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
// //   if (message.type === 'tabUpdated') {
// //     console.log('Tab updated: ', message.tabId);
// //     // 执行你在 content script 中需要的操作
// //   }
// // });
// // chrome.runtime.sendMessage({
// //   type: 'fromContentScript',
// //   message: 'Hello from content script!',
// // });
// // function init() {
// //     chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
// //         if (message.type === 'tabUpdated') {
// //           console.log('Tab updated: ', message.tabId);
// //           // 执行你在 content script 中需要的操作
// //         }
// //       });
// //   //   chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
// //   //     console.log('1', tabId);
// //   //   });
// //   //   let inputElement = Object.values($('input[type="text"], textarea')); // 获取第一个 input 元素
// //   //   chrome.runtime.onMessage.addListener(function (
// //   //     request,
// //   //     sender,
// //   //     sendResponse
// //   //   ) {
// //   //     if (request.action === 'getInputValue') {
// //   //       sendResponse({ value: 'zzzzz' });
// //   //     }
// //   //   });
// //   //   if (inputElement) {
// //   //     // 将获取到的值通过消息传递给扩展背景页或 popup 页
// //   //   }
// // }
// // setTimeout(() => {
// //   init();
// // });
