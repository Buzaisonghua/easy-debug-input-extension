// // indexedDB
// function a() {
//   let disabled = false;
//   console.log('aaaaaaa');
//   chrome.tabs.onActivated.addListener(function (activeInfo) {
//     console.log(1, activeInfo);
//     chrome.tabs.get(activeInfo.tabId, function (tab) {
//       console.log('执行了吗1', tab);
//       tabId = tab.id;
//       url = tab.url;
//     });
//   });
//   /**
//    * 告诉content-script获取当前标签页面的文本框，并将其缓存到storage中
//    */
//   $('#writeTextBoxValueStorage').on('click', function () {
//     chrome.storage.local.get(null, function (result) {
//       console.log(result);
//     });
//     writeTextBoxValueStorageSendMsg();
//   });
//   function writeTextBoxValueStorageSendMsg() {
//     console.log(1);
//     getSendMsg({
//       action: 'writeTextBoxValueStorageSendMsgPopup',
//     });
//   }

//   $('#setTextBoxValueInStorage').on('click', function () {
//     setTextBoxValueInStorageSendMsg();
//   });
//   function setTextBoxValueInStorageSendMsg() {
//     getSendMsg({
//       action: 'setTextBoxValueInStorageSendMsgPopup',
//     });
//   }

//   /** 给content_script发消息 */
//   function getSendMsg(options) {
//     if (disabled) {
//       return;
//     }
//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//       console.log('z', tabs);
//       const port = chrome.tabs.connect(tabs[0].id);
//       port.postMessage({ ...options });
//       port.onMessage.addListener(function (response) {
//         console.log('Received data:', response);
//       });
//     });
//   }
//   /** 判断是否是http或者https开头的网址 */
//   function isHttpOrHttps(url) {
//     const regex = /^https?:\/\//;
//     return !regex.test(url);
//   }
//   function getTitle(tabId, url) {
//     return `easy-debug-input-extension-${tabId}-${url}`;
//   }
//   /** 禁用所有按钮 */
//   function getDisableAllBtn() {
//     $('.item').addClass('disabled');
//     $('#box').append(
//       '<div class="disabled-tip">只允许http，https网址下使用<div>'
//     );
//   }
// }
// // content
// function b() {
//   /**
//    * 获取当前页面所有的文本框
//    */
//   function getViewsAllTextBox() {
//     const textBox = Array.from($('input').not('input[type="hidden"]'));
//     return textBox.map((val) => ({
//       id: val.id,
//       class: val.class,
//       type: val.type,
//       name: val.name,
//       tagName: val.tagName,
//       placeholder: val.placeholder,
//       label: val.label,
//       value: val.value,
//     }));
//   }

//   console.log('在这个页面是否');

//   /**
//    *extensionId,     // 可选：目标扩展程序的 ID。如果省略或为 null，则消息会发送到当前扩展。
//     message,          // 要发送的消息对象
//     [options],        // 可选：额外的参数，比如 `to` 可以指定目标应用的背景脚本
//     responseCallback  // 可选：一个回调函数，用于处理响应
//    */
//   function getSendMsg(data, callback) {
//     chrome.runtime.sendMessage(data, callback);
//   }

//   /**
//    * 接收来自popup的消息
//    */
//   chrome.runtime.onConnect.addListener(function (port) {
//     port.onMessage.addListener(function (message) {
//       /** 页面的值缓存到插件中 */
//       if (message.action === 'writeTextBoxValueStorageSendMsgPopup') {
//         const allTextBox = getViewsAllTextBox();
//         if (allTextBox.length === 0) {
//           Message('当前页面不存在文本框', 'error');
//           return;
//         }
//         getSendMsg(
//           {
//             action: 'writeTextBoxValueStorageSendMsgContent',
//             data: getViewsAllTextBox(),
//           },
//           (res) => {
//             Message('缓存成功！', 'success');
//           }
//         );
//       }
//       if (message.action === 'setTextBoxValueInStorageSendMsgBackground') {
//         if ($.type(message.data) !== 'array') {
//           Message('当前页面无缓存数据', 'error');
//           return;
//         }
//         a
//       }
//     });
//   });
// }

// function c() {
//   let tabId = '';
//   let url = '';
//   chrome.tabs.onActivated.addListener(function (activeInfo) {
//     chrome.tabs.get(activeInfo.tabId, function (tab) {
//       console.log('执行了吗132', tab);
//       tabId = tab.id;
//       url = tab.url;
//     });
//   });

//   /**
//    * 将当前的文本框内容缓存
//    */
//   function setStorage(val) {
//     chrome.storage.local.set({ ...val }, function (result) {
//       console.log('Retrieved data:', result);
//     });
//   }
//   function getStorage() {
//     const title = getTitle();
//     chrome.storage.local.get([`${title}`], function (result) {
//       chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//         chrome.tabs.sendMessage(tabs[0].id, {
//           action: 'setTextBoxValueInStorageSendMsgBackground',
//           data: result[title],
//         });
//       });
//     });
//   }

//   /**
//    * 当前浏览器页面存到内存中的标题
//    */
//   function getTitle() {
//     return `easy-debug-input-extension-${tabId}-${url}`;
//   }
//   /**
//    * background.js 中接收来自content.js中的消息
//    */
//   chrome.runtime.onConnect.addListener(function (port) {
//     console.log(1);
//     port.onMessage.addListener(function (message) {
//       console.log('start', message);
//       /** 插件中的缓存反写到页面中 */
//       if (message.action === 'setTextBoxValueInStorageSendMsgPopup') {
//         console.log('????????');
//         // port.postMessage({ ...options });
//         // port.onMessage.addListener(function (response) {
//         //   console.log('Received data:', response);
//         // });
//         // getSendMsg({
//         //   action: 'setTextBoxValueInStorageSendMsgContent',
//         // });
//       }
//     });
//   });

//   // chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//   //   console.log(2222222222222222);
//   //   if (message.action === 'writeTextBoxValueStorageSendMsgContent') {
//   //     console.log(2);
//   //     const obj = {};
//   //     obj[getTitle()] = message.data;
//   //     setStorage(obj);
//   //     sendResponse({ code: '200' });
//   //   }
//   //   if (message.action === 'setTextBoxValueInStorageSendMsgContent') {
//   //     getStorage();
//   //     sendResponse({ code: '200' });
//   //   }
//   //   // setTimeout(function () {
//   //   // }, 1000);
//   //   // 必须返回 true，以表示响应是异步的
//   //   // return true;
//   // });
// }
// a
