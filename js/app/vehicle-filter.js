;(function () {
  mui.init();
  
  var H = null;
  var self = null;
  var main = null;
  
  mui.plusReady(function () {
    self = plus.webview.currentWebview();
    main = plus.webview.getWebviewById("vehicle-list.html");
    H = self.H;
  })
  $(document).on('tap', function() {
    mui.back();
    mui.fire(main, 'closeMenu', {})

  })
})();