;(function () {
  mui.init();
  setTimeout(function() {
    $('.container').addClass('run');
  }, 100);
  
  var H = null;
  
  mui.plusReady(function () {
    var self = plus.webview.currentWebview();
    var view = plus.webview.getWebviewById('index');
    H = self.H;

    document.addEventListener('tap', function () {
      mui.back();
      mui.fire(view, 'clearActiveTab', {});
    }, false)
    
    $('#doorpost').on('tap', function () {
      var view = plus.webview.getWebviewById('html/doorpost.html');
      view.show();
    })
  })
})();