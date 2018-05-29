;
(function(mui, doc) {
  mui.init();

  var view = null;
  var explainText = null;
  var resolventText = null;
  
  mui.plusReady(function() {
    handsetAdaption();

    var self = plus.webview.currentWebview();

    explainText = self.explainText;
    resolventText = self.resolventText;
    view = plus.webview.getWebviewById('vehicle-input-stail');
  	addEvent();
  })

  function handsetAdaption() {
    // 更改顶部导航栏高度
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

    // 更改状态栏颜色
    plus.navigator.setStatusBarStyle("light");
    // 弹出软键盘时自动改变webview的高度
    // plus.webview.currentWebview().setStyle({
    //   softinputMode: "adjustResize"
    // });

  }

  function addEvent() {
    console.log(explainText);
    console.log(resolventText)
    // 发表components
    $('#issue').on('tap', function() {
      if($('#issue_text').val()) {

      	
        mui.fire(view,'updateExplain',{//触发自定义事件
          explainText: $('#issue_text').val()
        });
        self.close("auto", 300);
        
      } else {
        mui.alert('亲，请输入内容！！', '提示', '确定')
      }
    })
  }

})(mui, document)