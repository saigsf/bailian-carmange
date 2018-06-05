(function (mui, doc) {
  //初始化
  mui.init();
  mui('.mui-scroll-wrapper').scroll();

  var H = null;
  var vSn = null;

  mui.plusReady(function () {
    handsetAdaption()
    var self = plus.webview.currentWebview();
    H = self.H;
  })

  // 手机适配方法
  function handsetAdaption() {
    // 更改顶部导航栏高度
    if(plus.device.model === 'iPhoneX') {
      // 页面样式重置
      $('header').css({
        'height': '88px',
        'paddingTop': '40px'
      });
      $('.mui-bar-nav').css({
        'height': '88px',
        'paddingTop': '40px'
      });
      $('.mui-pages').css('top', '88px')
    }

    // 更改状态栏颜色
    // plus.navigator.setStatusBarStyle("light");
    // 弹出软键盘时自动改变webview的高度
    // plus.webview.currentWebview().setStyle({
    //   softinputMode: "adjustResize"
    // });

  }
  addEvent()
  function addEvent() {
    // 获取车辆编号
    // app.getvSn({}, function(res) {
    //   console.log(res);
    //   $('#vSn').val(res);
    // })

    //提交
    $('#next').on('tap', function () {
      //打开接车点检页面
      var data = serialize($('form'));

      app.upcheck(data, function (res) {
        res = JSON.parse(res);
        console.log(res);
      })
    })
  }
})(mui, document);