const getTitle = () =>
  `easy-debug-input-extension-${initData.id}-${initData.url}`;
function getStorage() {
  return new Promise((resolve, reject) => {
    const key = getTitle();
    chrome.storage.local.get(key, function (result) {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError); // 如果发生错误，拒绝 Promise
      } else {
        resolve(result[key]); // 成功时，解析结果
      }
    });
  });
}
/** 将当前的文本框内容缓存 */
function setStorage(val) {
  chrome.storage.local.set({ ...val }, function (result) {
    console.log('Retrieved data:', result);
  });
}
/**
 * 告诉content-script获取当前标签页面的文本框，并将其缓存到storage中
 */
$('#writeTextBoxValueStorage').on('click', function () {
  console.log(initData);
  if (initData.disabled) return;
  const port = chrome.tabs.connect(initData.id);
  port.postMessage({ action: 'writeTextBoxValueStorageSendMsgPopup' });
  port.onMessage.addListener(function (res) {
    console.log(res);
    const obj = {};
    obj[getTitle()] = res.data;
    console.log(obj);
    setStorage(obj);
  });
});
$('#setTextBoxValueInStorage').on('click', function () {
  setTextBoxValueInStorageSendMsg();
});
function setTextBoxValueInStorageSendMsg() {
  getStorage().then((res) => {
    console.log('aaaas', res);
    const port = chrome.tabs.connect(initData.id);
    port.postMessage({
      action: 'setTextBoxValueInStorageSendMsgPopup',
      data: res,
    });
  });
  // getSendMsg({
  //   action: 'setTextBoxValueInStorageSendMsgPopup',
  // });
}
