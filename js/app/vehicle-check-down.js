(function() {
  var H = null;
  var self = null;
  var vSn = null;

  //初始化
  mui.init();
  mui('.mui-scroll-wrapper').scroll();
  mui.plusReady(function () {
    handsetAdaption()
    self = plus.webview.currentWebview();
    H = self.H;

  })

  function handsetAdaption() {
    if (plus.device.model === 'iPhoneX') {
      //页面样式重置
      $('header').css({
        'height': '88px',
        'paddingTop': '40px'
      });
      $('.mui-bar-nav~.mui-content').css({
        'paddingTop': '88px'
      })
    }
    plus.webview.currentWebview().setStyle({
      softinputMode: "adjustResize" // 弹出软键盘时自动改变webview的高度
    });
  }

  addEvent()
  function addEvent() {
    $('#submit').on('tap', function () {
      var data = serialize($('form'));
      console.log(data)
    })
  }



})();