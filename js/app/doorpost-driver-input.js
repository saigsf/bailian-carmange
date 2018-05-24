(function () {
  mui.init();
  //初始化单页的区域滚动
  mui('.mui-scroll-wrapper').scroll();
  mui.plusReady(function () {
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
    // 弹出软键盘时自动改变webview的高度
    plus.webview.currentWebview().setStyle({
      softinputMode: "adjustResize"
    });

    var self = plus.webview.currentWebview();

    if (self.ids) {
      // 驾驶员数据回显
      $('.mui-title').html('驾驶员编辑');
      console.log(self.ids)
    }

  });

  // 提交数据
  $('#next').on('click', function () {
    var data = serialize($('#driver'));
    var requiredArr = ['driverName', 'employeeCard'];
    console.log(data);
    // console.log(hasEmptyValue(data, requiredArr));
    
  })



})()