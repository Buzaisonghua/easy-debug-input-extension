chrome.runtime.onConnect.addListener(function (port) {
  port.onMessage.addListener(function (message) {
    /** 页面的值缓存到插件中 */
    if (message.action === 'writeTextBoxValueStorageSendMsgPopup') {
      writeTextBoxValueStorage(port);
    }
    if (message.action === 'setTextBoxValueInStorageSendMsgPopup') {
      setTextBoxValueInStorage(message);
    }
  });
});

/** 读取页面的input值，并返回给popup页面 */
function writeTextBoxValueStorage(port) {
  const allTextBox = getViewsAllTextBox();
  console.log(allTextBox);
  if (allTextBox.length === 0) {
    Message('当前页面不存在文本框', 'error');
    return;
  }

  port.postMessage({ data: allTextBox });
  Message('缓存成功！', 'success');
}
/** 获取当前页面所有的文本框 */
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

function setTextBoxValueInStorage(msg) {
  if ($.type(msg.data) !== 'array') {
    Message('当前页面无缓存数据', 'error');
    return;
  }
  msg.data.forEach((val) => {
    $(`#${val.id}`).attr('value', val.value);
  });
  Message('写入成功！', 'success');
}
