
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
    if(!self.vSn) {
      return
    }
    getData(self.vSn)
    mui.toast(self.vSn);
  })

  function getData(vSn) {
    app.vehicleSearch({
      vSn: vSn,
      status: '', 
      carName: '',
      cGroup: {
          id: 0,
          name: '',
          remark: ''
      }
  }, function(res) {
      console.log(JSON.stringify(res))
      // updateView(res)
    })
  }

  // 更新视图
  function updateView(data) {

  }

  // 去还车

})(mui);