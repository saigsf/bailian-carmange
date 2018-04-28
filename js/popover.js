;(function () {
  mui.init();
  mui.plusReady(function () {
    var ws = plus.webview.currentWebview();
    document.addEventListener('tap', function () {
      mui.back()
    })
  })
})();