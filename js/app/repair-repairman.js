;(function () {
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
  })

  $('#next').on('tap', function () {
    var data = {};

    data.infoid = $('#infoid').val();
    data.finish_park = $('#finish_park').val();
    data.work = $('#work').val();
    data.remark = $('#remark').val();

    console.log(JSON.stringify(data))

    app.Maintenancecoordination(data, function (res) {
      console.log(res);
      res = JSON.parse(res);
      if (res.ret) {
        // mui.toast(res.msg);
        mui.back()
      } else {
        mui.toast(res.msg);
      }
    })
  })

})();