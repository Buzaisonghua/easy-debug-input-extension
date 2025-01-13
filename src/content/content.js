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
  console.log('11111', allTextBox);
  if (allTextBox.length === 0) {
    Message('当前页面不存在文本框', 'error');
    return;
  }

  port.postMessage({ data: allTextBox });
  Message('缓存成功！', 'success');
}
/** 获取当前页面所有的文本框 */
function getViewsAllTextBox() {
  const textBox = Array.from(
    $('input, textarea, select').not('input[type="hidden"]')
  );
  return textBox.map((val) => {
    const attrs = Object.values(val.attributes);
    const obj = {};
    attrs.forEach((v) => (obj[v.nodeName] = v.value));
    if (val.type === 'radio') {
      obj.checked = $(`input[name="${val.name}"]:checked`).val();
    }
    obj.value = $(val).val();
    console.log(obj.option);
    return obj;
  });
}

function setTextBoxValueInStorage(msg) {
  if ($.type(msg.data) !== 'array') {
    Message('当前页面无缓存数据', 'error');
    return;
  }
  const addName = ['type', 'placeholder', 'name'];
  msg.data.forEach((val) => {
    const keys = Object.keys(val);
    let query = '';
    if (val.id) {
      query += `#${val.id}`;
    }
    if (val.class) {
      query += `.${val.class.split(' ').join('.')}`;
    }
    keys.forEach((key) => {
      if (addName.find((val) => val === key)) {
        query += `[${key}="${val[key]}"]`;
      }
    });
    if (val.type === 'number') {
      $(query).val(Number(val.value));
    } else if (val.type === 'radio') {
      $(query).val(val.checked === val.value);
    } else {
      $(query).val(val.value);
    }

    // $('#el-id-1024-37').val(3);
    // console.log('aaaaaa', query, val.value);
    // console.log(query, val.type === 'number' ? Number(val.value) : val.value);
  });
  Message('写入成功！', 'success');
}
