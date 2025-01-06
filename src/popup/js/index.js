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

$('#setTextBoxValueInStorage').on('click', function () {
  setTextBoxValueInStorageSendMsg();
});
function setTextBoxValueInStorageSendMsg() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    tabId = tabs[0].id;
    chrome.tabs.sendMessage(tabId, {
      action: 'setTextBoxValueInStorageSendMsgPopup',
    });
  });
}
