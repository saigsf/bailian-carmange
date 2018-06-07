
(function (mui) {
  var self = null;
  var H = null;
  var vSn = null;

  mui.init();
  mui('.mui-scroll-wrapper').scroll();
  mui.plusReady(function () {
    handsetAdaption();
    self = plus.webview.currentWebview();
    H = self.H;
    if (!self.vSn) {
      return
    }
    vSn = self.vSn;
    getData(self.vSn)
    mui.toast(self.vSn);
  })

  function handsetAdaption() {
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
    // plus.webview.currentWebview().setStyle({
    //   softinputMode: "adjustResize" // 弹出软键盘时自动改变webview的高度
    // });
  }

  function getData(vSn) {
    // app.vehicleSearch({
    //   vSn: vSn,
    //   status: '',
    //   carName: '',
    //   cGroup: {
    //     id: 0,
    //     name: '',
    //     remark: ''
    //   }
    // }, function (res) {
    //   console.log(JSON.stringify(res))
    //   // updateView(res)
    // })
  }

  // 更新视图
  function updateView(data) {}

  addEvent()
  function addEvent() {
    var $link = $('#info_link_box .info-link');
    console.log($link)
    $link.on('tap', function() {
      var id = $(this).attr('id')
      console.log(id)
      if(id) {
        mui.openWindow({
          url: id + '.html',
          id: id, //默认使用当前页面的url作为id
          styles: {
            top: '0px',
            bottom: H
          }, //窗口参数
          extras: {
            H: H,
            vSn: vSn
          } //自定义扩展参数
        })
      }
    })
  }



})(mui);