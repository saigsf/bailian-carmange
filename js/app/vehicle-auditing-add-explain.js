mui.init();
    mui.plusReady(function() {
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
  })

    var oldBack = mui.back;
    mui.back = function (url) {
      if (url) {
        var webview = plus.webview.getWebviewById(url); //假设第一个Webview的id是home
        webview.close();
      } else {
        oldBack()
      }

    };

    // 发表
    document.getElementById('issue').addEventListener('tap', function () {
      if ($('#issue_text').val()) {

        mui.plusReady(function () {
          plus.webview.currentWebview().close();

        });
        mui.back('vehicle-detail')
      } else {
        mui.alert('亲，请输入内容！！', '提示', '确定')
      }

    })