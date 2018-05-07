;(function () {
  mui.init();
  mui.plusReady(function () {
    var ws = plus.webview.currentWebview();
    var H = ws.H;

    document.addEventListener('tap', function () {
      mui.back()
    })
    
    $('#doorpost').on('tap', function () {
      var view = plus.webview.getWebviewById('html/doorpost.html');
      view.show()
    })
  })
})();