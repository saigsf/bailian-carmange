; (function () {
  var H = null;
  var self = null;
  var main = null;

  mui.init();
  // 初始化区域滚动
  mui('.mui-scroll-wrapper').scroll();
  mui.plusReady(function () {
    handsetAdaption()
    self = plus.webview.currentWebview();
    main = plus.webview.getWebviewById("vehicle-list.html");
    H = self.H;
  })

  function handsetAdaption() {
    if (plus.device.model === 'iPhoneX') {
      //页面样式重置
      $('nav.mui-bar-tab').css({
        'paddingBottom': '34px'
      })
    }
    // plus.webview.currentWebview().setStyle({
    //   softinputMode: "adjustResize" // 弹出软键盘时自动改变webview的高度
    // });
  }


  document.addEventListener('close', function () {
    mui.back();
  })
})();