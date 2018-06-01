(function() {
  //初始化
  mui.init();

  mui('.mui-scroll-wrapper').scroll();

  var H = null;
  var vSn = null;
  var view = null;
  
  mui.plusReady(function () {
    handsetAdaption()
    var self = plus.webview.currentWebview();
    view = plus.webview.getWebviewById('html/repair-list.html')
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


  // 提交
  $('#next').on('tap', function() {
    var data = serialize($('#allot'));
    data.vSn = $('#vSn').html()

    if(!data.fin_park) {
      mui.toast('请填写停放地点')
      return;
    }

    app.carMaintainComplete(data, function(res) {
      res = JSON.parse(res);
      console.log(res);
      mui.toast(res.msg);
      if(res.ret) {
        mui.fire(view, 'update', {});
        mui.back();
      }
      
    })
  })

})();