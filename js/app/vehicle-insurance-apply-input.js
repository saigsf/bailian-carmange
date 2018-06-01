(function() {
  //初始化
  mui.init();

  mui('.mui-scroll-wrapper').scroll();

  var H = null;
  var vSns = null;
  
  mui.plusReady(function () {
    handsetAdaption()
    var self = plus.webview.currentWebview();
    H = self.H;
    vSns = self.vSns;
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

  // 提交
  $('#next').on('tap', function() {
    var data = serialize($('#apply'));
    var reg = /[1-9]/;
    
    if (!data.numtime || !reg.test(data.numtime)) {
      mui.toast('请正确填写申请年限')
      return;
    }

    app.insuranceApply(data, function(res) {
      res = JSON.parse(res);
      if(res.ret) {
        mui.back();
      }
      console.log(res);
      mui.toast(res.msg);
    })
  })

})();