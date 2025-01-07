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
 *
 */
function getSendMessage(data) {
  chrome.runtime.sendMessage(data);
}

/**
 * 接收来自popup的消息
 */
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log('接收到了消息');

  Message('成功消息！', 'success');
  /** 页面的值缓存到插件中 */
  if (message.action === 'writeTextBoxValueStorageSendMsgPopup') {
    getSendMessage({
      action: 'writeTextBoxValueStorageSendMsgContent',
      data: getViewsAllTextBox(),
    });
  }
  if (message.action === 'setTextBoxValueInStorageSendMsgPopup') {
    chrome.runtime.sendMessage({
      action: 'setTextBoxValueInStorageSendMsgContent',
    });
  }
  if (message.action === 'setTextBoxValueInStorageSendMsgBackground') {
    console.log(message.data);
    message.data.forEach((val) => {
      $(`#${val.id}`).attr('value', val.value);
    });
  }
  setTimeout(function () {
    sendResponse({ result: 'Task completed' });
  }, 1000);
  // 必须返回 true，以表示响应是异步的
  return true;
});
