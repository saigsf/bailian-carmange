; (function () {
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
    var self = plus.webview.currentWebview();
    var vSn = self.vSn;
    getData(vSn);
  });

  function getData(vSn) {
    app.pageQueryCarMaintain({
      page: 1,
      size: 5,
      vSn: vSn,
    }, function(res) {
      console.log(res);
      res = JSON.parse(res);
      updateView(res.rows)
    })
  }

  function updateView(data) {

    var vSn = data[0].carMaintainApply.vSn;
    var sendPeople = data[0].carMaintainApply.sendPeople;
    var reason = data[0].carMaintainApply.reason;
    var send_time = data[0].carMaintainApply.send_time;
    var send_park = data[0].carMaintainApply.send_park;
    var send_remark = data[0].carMaintainApply.send_remark ? data[0].carMaintainApply.send_remark : '无'
    var finish_park = data[0].maintenancecoordination.finish_park ? data[0].maintenancecoordination.finish_park:'未填写'
    var work = data[0].maintenancecoordination.work ? data[0].maintenancecoordination.work:'未填写'
    var operator = data[0].maintenancecoordination.operator ? data[0].maintenancecoordination.operator:'未填写'
    var finish_time = data[0].maintenancecoordination.finish_time ? data[0].maintenancecoordination.finish_time:'未填写'
    var remark = data[0].maintenancecoordination.remark ? data[0].maintenancecoordination.remark:'无'


    $('#vSn').val(vSn)
    $('#sendPeople').val(sendPeople)
    $('#reason').val(reason)
    $('#send_time').val(send_time)
    $('#send_park').val(send_park)
    $('#remark').val(send_remark)
    $('#finish_park').val(finish_park)
    $('#work').val(work)
    $('#operator').val(operator)
    $('#finish_time').val(finish_time)
    $('#remark_new').val(remark)
  }

})();