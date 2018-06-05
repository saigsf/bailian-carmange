(function() {
  //初始化
  mui.init();

  mui('.mui-scroll-wrapper').scroll();

  var H = null;
  var vSn = null;
  
  mui.plusReady(function () {
    handsetAdaption()
    var self = plus.webview.currentWebview();
    H = self.H;
    vSn = self.vSn;

    $('#vSn').html(vSn)
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

  $('#submit').on('tap', function() {
    var data = serialize($('#insurance_input'));

    console.log(data);
    app.insuranceAdd(data, function(res) {
      res = JSON.parse(res);
      console.log(res)
      mui.toast(res.msg);
      if(res.ret) {
        mui.back();
      }
    })
  })

})();