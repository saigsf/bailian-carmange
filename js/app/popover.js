; (function () {
  mui.init();
  setTimeout(function () {
    $('.container').addClass('run');
    $('#close .icon').css({
      'transform': 'rotate(-135deg)'
    })
  }, 100);

  var H = null;
  var self = null;
  var view = null;


  mui.plusReady(function () {
    handsetAdaption()
    self = plus.webview.currentWebview();
    view = plus.webview.getWebviewById('HBuilder');
    H = self.H;

    $(document).on('tap', function () {
      mui.fire(view, 'clearActiveTab', {});
      $('.container').removeClass('run');
      $('#close .icon').css({
        'transform': 'rotate(135deg)'
      });

      setTimeout(function () {
        mui.back();
      }, 100)
    })

    $('#doorpost').on('tap', function () {
      var view = plus.webview.getWebviewById('html/doorpost.html');
      view.show();
    })
  })

  function handsetAdaption() {
    // 更改顶部导航栏高度
    if (plus.device.model === 'iPhoneX') {
      //页面样式重置
      $('body').css({
        'paddingBottom': '35px'
      });
    }
  }
})();