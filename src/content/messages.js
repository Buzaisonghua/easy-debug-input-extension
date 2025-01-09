function getStyle() {
  return `
.message-container {
  position: fixed;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  width: 300px;
  padding: 10px;
}

.message {
  height: 36px;
  padding: 0 9px 0 24px;
  line-height: 1;
  border: 1px solid rgb(224.6, 242.8, 215.6);
  white-space: nowrap;
  display: flex;
  align-items: center;
  border-radius: 4px;
  font-size: 14px;
  opacity: 0;
  transition: opacity 0.5s ease;
  border-color: rgb(224.6, 242.8, 215.6);
  color: #67c23a;
}

.message.success {
  background-color: rgb(239.8, 248.9, 235.3);
  border-color: rgb(224.6, 242.8, 215.6);
  color: #67c23a;
}

.message.error {
  background-color: rgb(254, 240.3, 240.3);
  border-color: rgb(253, 225.6, 225.6);
  color: #f56c6c;
}

.message.info {
  background-color: rgb(243.9, 244.2, 244.8);
  border-color: rgb(232.8, 233.4, 234.6;
  color: #909399;
}

.message.warning {
  background-color: rgb(252.5, 245.7, 235.5);
  border-color: rgb(250, 236.4, 216);
  color: #e6a23c;
}

`;
}

// 纯jQuery实现Message
function Message(message, type = 'info', duration = 3000) {
  const box = $('<div class="message-container"></div>');
  const $message = $('<div class="message"></div>')
    .addClass(type)
    .text(message);
  box.append($message);

  // 动画显示
  $message.css('opacity', 1);

  // 自动消失
  setTimeout(function () {
    $message.css('opacity', 0);
    setTimeout(function () {
      styleEle.remove();
      box.remove();
    }, 500);
  }, duration);

  const styleEle = $('<style>').prop('type', 'text/css').html(getStyle());
  $('body').append(styleEle).append(box);
}
