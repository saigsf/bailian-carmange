; (function () {
  mui.init();

  var H = null;
  var vSn = null;
  var self = null;
  var hasData = false;

  //初始化单页的区域滚动
  mui('.mui-scroll-wrapper').scroll();

  mui.plusReady(function () {
    handsetAdaption()
    self = plus.webview.currentWebview();
    H = self.H;
    vSn = self.vSn;
    hasData = self.hasData;
    console.log(hasData);
    getData();
  });

  
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
    // plus.webview.currentWebview().setStyle({
    //   softinputMode: "adjustResize" // 弹出软键盘时自动改变webview的高度
    // });
  }

  function getData() {
    updateView() 
  }

  function updateView(data) {
    if(hasData == 'true') {
      $('#no_data').hide().prev().show();
      $('#license_input').hide();
    } else {
      $('#no_data').show().prev().hide();
      $('#license_input').show();
    }

  }

  function addEvent() {
    $('#info').on('tap', function() {
      mui.openWindow({
        url: 'vehicle-info.html',
        id: 'vehicle-info', //默认使用当前页面的url作为id
        styles: {
          top: '0px',
          bottom: H
        }, //窗口参数
        extras: {
          H: H,
          vSn: vSn
        } //自定义扩展参数
      })
    })
    $('#license_input').on('tap', function() {
      mui.openWindow({
        url: 'vehicle-license-input.html',
        id: 'vehicle-license-input', //默认使用当前页面的url作为id
        styles: {
          top: '0px',
          bottom: H
        }, //窗口参数
        extras: {
          H: H,
          vSn: vSn
        } //自定义扩展参数
      })
    })
  }
  addEvent()

})();