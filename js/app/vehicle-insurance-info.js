; (function () {
  mui.init();

  var vSn = null;
  var self = null;
  var H = null;
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
    self = plus.webview.currentWebview();
    vSn = self.vSn;
    H = self.H;
    getData();
    addEvent();
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

  function addEvent() {

    // 保险录入
    $('#insurance_input').on('tap', function (e) {
      e.stopPropagation();
      var $li = $(this).parents('li')

      mui.openWindow({
        url: 'vehicle-insurance-input.html',
        id: 'vehicle-insurance-input', //默认使用当前页面的url作为id
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

    // 续保
    $('#renew_insurance').on('tap', function (e) {
      e.stopPropagation();
      var $li = $(this).parents('li')

      mui.openWindow({
        url: 'vehicle-insurance-apply-input.html',
        id: 'vehicle-insurance-apply-input', //默认使用当前页面的url作为id
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

    // 临牌申请
    $('#car_checking').on('tap', function (e) {
      e.stopPropagation();
      var $li = $(this).parents('li')

      mui.toast('验车成功')
    })

    // 详情
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
  }

})();