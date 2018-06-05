; (function () {
  mui.init();

  var vSn = null;

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
    var self = plus.webview.currentWebview();
    vSn = self.vSn;
    getData();
  });


  function getData() {
    app.carMaintainQuery({
      vSn: vSn
    }, function(res) {
      res = JSON.parse(res);
      console.log(res)
      updateView(res.rows[0])
    })
  }

  function updateView(data) {

    $('#vSn').html(data.vSn)
    $('#item_0').html(data.item)
    $('#applyPeople').html(data.applyPeople)
    $('#status').html(data.status)
    $('#item').val(data.item)
    $('#send_park').val(data.send_park)
    $('#applytime').val(data.applytime)
    $('#applyRemark').val(data.applyRemark)
    $('#operator').val(data.operator)
    $('#forecastTime').val(data.forecastTime)
    $('#fin_park').val(data.fin_park)
    $('#workContent').val(data.workContent)
    $('#remark').val(data.remark)

  }

})();