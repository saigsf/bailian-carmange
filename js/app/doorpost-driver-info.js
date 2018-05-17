(function() {
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

    var self = plus.webview.currentWebview();
    getData(self.ids)
  })

  function getData(id) {
    app.carDriverEdit({id: id}, function(res) {
      console.log(res)
    })
  }
})()