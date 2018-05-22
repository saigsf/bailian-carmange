; (function () {
  mui.init();

  

  // 时间选择
  $('#finish_time_box').off().on('tap', function () {
    var dDate = new Date();
    plus.nativeUI.pickDate(function (e) {
      var d = e.date;
      $('#finish_time').val(d.format('yyyy-MM-dd'));

    }, function (e) {
      $('#finish_time').val('您没有选择日期');
    }, {
        title: '',
        date: dDate
      });
  });

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
    plus.webview.currentWebview().setStyle({
      softinputMode: "adjustResize" // 弹出软键盘时自动改变webview的高度
    });

    var self = plus.webview.currentWebview();
    var view = plus.webview.getWebviewById(self.prevId);
    
    // 回显
    $('#vSn').val(self.vSn)

    // 提交
    $('#next').on('tap', function () {
      var data = {};

      data.vSn = $('#vSn').val();
      data.finish_park = $('#finish_park').val();
      data.finish_time = $('#finish_time').val();
      data.work = $('#work').val();
      data.remark = $('#remark').val();
      data.infoid = self.infoid;

      app.coordination(data, function (res) {
        // console.log(res);
        res = JSON.parse(res);
        if (res.ret) {
          // mui.toast(res.msg);
          mui.fire(view, 'update', {});
          mui.back()
        } else {
          mui.toast(res.msg);
        }
      })
    })

  })




})();