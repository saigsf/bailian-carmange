
(function(mui) {
  mui.init({
    swipeBack: false
  });
  mui('.mui-scroll-wrapper').scroll({
    indicators: true //是否显示滚动条
  });
  var html2 = '';
  var item2 = document.getElementById('item2mobile');

  document.getElementById('slider').addEventListener('slide', function(e) {
    if(e.detail.slideNumber === 1) {
      if(item2.querySelector('.mui-loading')) {
        setTimeout(function() {
          item2.querySelector('.mui-loading').style.display = 'none';
          item2.querySelector('.vehicle-info').style.display = 'block';
        }, 500);
      }
    }
  });

  mui.plusReady(function() {
    if (plus.device.model === 'iPhoneX') {
      //页面样式重置
      $('header').css({
        'height': '88px',
        'paddingTop': '40px'
      })
      $('.mui-bar-nav~.mui-content').css({
        'paddingTop': '88px'
      })
    }
    var self = plus.webview.currentWebview();
    mui.toast(self.vSn)
  })

})(mui);