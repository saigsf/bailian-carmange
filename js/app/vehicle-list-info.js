; (function () {
  mui.init();

  var H = null;
  var vSn = null;
  var self = null;

  //初始化单页的区域滚动
  mui('.mui-scroll-wrapper').scroll();

  mui.plusReady(function () {
    handsetAdaption()
    self = plus.webview.currentWebview();
    H = self.H;
    vSn = self.vSn;
    getData();
  });

  
  function handsetAdaption() {
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
    // plus.webview.currentWebview().setStyle({
    //   softinputMode: "adjustResize" // 弹出软键盘时自动改变webview的高度
    // });
  }


  document.addEventListener('close', function () {
    mui.back();
  })


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
    $('#next').on('tap', function() {
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
  addEvent()

})();