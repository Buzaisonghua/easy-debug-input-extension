const initData = {};
/** 判断是否是http或者https开头的网址 */
function isHttpOrHttps(url) {
  const regex = /^chrome:\/\//;
  return regex.test(url);
}

/** 禁用所有按钮 */
function getDisableAllBtn() {
  $('.item').addClass('disabled');
  $('#box').append('<div class="disabled-tip">chrome内置页面禁用<div>');
}

function init() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    if (activeTab.id === initData.id) return;
    initData.id = activeTab.id;
    initData.url = activeTab.url;
    if (isHttpOrHttps(tabs[0].url)) {
      initData.disabled = true;
      getDisableAllBtn();
    }
  });
}
/** 监听每次插件打开 */
document.addEventListener('DOMContentLoaded', () => {
  init();
});
