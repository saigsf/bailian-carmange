(function () {
  mui.init();

  var H = null;
  var ids = null;

  mui.plusReady(function () {
    handsetAdaption()

    var self = plus.webview.currentWebview();
    H = self.H;
    ids = self.ids;

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
    // plus.navigator.setStatusBarStyle("light");
    // 弹出软键盘时自动改变webview的高度
    // plus.webview.currentWebview().setStyle({
    //   softinputMode: "adjustResize"
    // });

  }

  function addEvent() {
    var view = plus.webview.getWebviewById('doorpost-driver.html');

    $('#next').on('tap', function () {
      var startTime = $('#start_date').val();
      var endTime = $('#end_date').val();
      app.authorized({
        ids,
        startTime,
        endTime
      }, function (res) {
        console.log(res)
        res = JSON.parse(res)
        if (res.ret) {
          mui.fire(view, 'update', {});
          mui.back();
        } else {
          mui.toast('授权失败')
        }
      })
    })
    var dDate = new Date();

    $('#start_date_box').off().on('tap', function () {
      var _this = this;

      plus.nativeUI.pickDate(function (e) {
        var d = e.date;
        $('#start_date').val(d.format('yyyy-MM-dd'));
      }, function (e) {
        $('#start_date').val('您没有选择日期');
      }, {
          title: '',
          date: dDate,
          minDate: dDate
        });
    });

    $('#end_date_box').off().on('tap', function () {
      var _this = this;
      plus.nativeUI.pickDate(function (e) {
        var d = e.date;
        $('#end_date').val(d.format('yyyy-MM-dd'));
      }, function (e) {
        $('#end_date').val('您没有选择日期');
      }, {
          title: '',
          date: dDate,
          minDate: dDate
        });
    });
  }

})()