(function () {
  /**
   * 告诉content-script获取当前标签页面的文本框，并将其缓存到storage中
   */
  $('#writeTextBoxValueStorage').on('click', function () {
    writeTextBoxValueStorageSendMsg();
  });
  function writeTextBoxValueStorageSendMsg() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      tabId = tabs[0].id;

      chrome.tabs.sendMessage(tabId, {
        action: 'writeTextBoxValueStorageSendMsgPopup',
      });
    });
  }

  /**
   * 向content发消息
   * 告诉它popup加载了要求获取目标页面的input信息
   */
  // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  //   const tabId = tabs[0].id;
  //   chrome.tabs.sendMessage(
  //     tabId,
  //     { action: 'getViewTextBoxPopup' },
  //     function (response) {
  //       console.log('向content_script成功发消息', response);
  //     }
  //   );
  // });
  /**
   * 接收来自background的消息
   */
  // chrome.runtime.onMessage.addListener(function (
  //   message,
  //   sender,
  //   sendResponse
  // ) {
  //   if (message.action === 'forToPopupGetViewsAllTextBox') {
  //     console.log('接收Received message from content script via background:');
  //     const newDiv = $('<div></div>');
  //     message.data.forEach((val) => {
  //       const itemDiv = $('<div></div>');
  //       itemDiv.append($(`<${val.tagName}>`, { ...val }));
  //       newDiv.append(itemDiv);
  //     });
  //     $('#textBox').append(newDiv);
  //     setTimeout(function () {
  //       sendResponse({ result: 'Task completed' });
  //     }, 1000);
  //     // 必须返回 true，以表示响应是异步的
  //     return true;
  //   }
  // });

  // $('#setDafault').on('click', function () {
  //   getInputValueFromPage();
  // });
  // function getInputValueFromPage() {
  //   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  //     const tabId = tabs[0].id;
  //     chrome.tabs.sendMessage(
  //       tabId,
  //       { action: 'setViewTextBoxPopupAll' },
  //       function (response) {
  //         console.log('向content_script成功发消息', response);
  //       }
  //     );
  //   });
  // }
})();
