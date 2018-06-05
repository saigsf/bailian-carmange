
(function (mui) {
  mui.init({
    swipeBack: false
  });
  mui('.mui-scroll-wrapper').scroll();

  var H = null;


  mui.plusReady(function () {
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
    H = self.H;
    if (!self.vSn) {
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
    }, function (res) {
      console.log(JSON.stringify(res))
      // updateView(res)
    })
  }

  // 更新视图
  function updateView(data) {

  }
  addEvent()
  function addEvent() {
    var $link = $('#info_link_box .info-link');
    console.log($link)
    $link.on('tap', function() {
      console.log($(this).attr('data-id'))
      if($(this).attr('data-id')) {
        mui.openWindow({
          url: 'vehicle-input-detail.html',
          id: 'vehicle-input-detail', //默认使用当前页面的url作为id
          styles: {
            top: '0px',
            bottom: H
          }, //窗口参数
          extras: {
            H: H,
            viewId: $(this).attr('data-id')
          } //自定义扩展参数
        })
      }
    })
  }



})(mui);