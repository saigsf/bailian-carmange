;
(function(mui, doc) {
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
  	var view = plus.webview.getWebviewById('vehicle-check-safety');
  	var curview = plus.webview.currentWebview();
    // 发表components
    $('#issue').on('tap', function() {
      if($('#issue_text').val()) {
      	
        mui.fire(view,'update',{//触发自定义事件
          components: $('#issue_text').val()
        });
        curview.close("auto", 300);
        
      } else {
        mui.alert('亲，请输入内容！！', '提示', '确定')
      }
    })
  })

})(mui, document)