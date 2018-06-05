(function () {
  //初始化
  mui.init();

  mui('.mui-scroll-wrapper').scroll();

  var H = null;
  var vSn = null;
  var view = null;

  mui.plusReady(function () {
    handsetAdaption()
    var self = plus.webview.currentWebview();
    view = plus.webview.getWebviewById('html/repair-list.html')
    H = self.H;
    vSn = self.vSn;
    $('#vSn').html(vSn)
  })

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
    plus.webview.currentWebview().setStyle({
      softinputMode: "adjustResize" // 弹出软键盘时自动改变webview的高度
    });
  }

  function getData() {

  }
  getData();

  function updateView(data) {

  }

  // 保养查询-测试
  // app.getMaintenance({
  //   vSn: '1111'
  // }, function(res) {
  //   res = JSON.parse(res);
  //   console.log(res)
  // })

  // 保养删除-测试
  // app.deleteMaintenance({
  //   ids: []
  // }, function(res) {
  //   res = JSON.parse(res);
  //   console.log(res);

  // })

  // 提交
  $('#next').on('tap', function () {
    var data = {};
    var data = serialize($('#maintain'));
    var maintenanceItems = [];
    data.vSn = $('#vSn').html()
    
    var $checkbox = $('#maintenance li input[type=checkbox]');
    $checkbox.each(function (i) {
      var _this = this;

      if ($(this).prop('checked')) {
        maintenanceItems.push({
          brandAndlabel: $(_this).next().next().find('input').val(),
          itemName: $(_this).next().html()
        })
      }
    })

    data.maintenanceItems = maintenanceItems;

    app.saveMaintenance(data, function(res) {
      console.log(res)
      if(res.ret) {
        mui.back();
        mui.fire(view , 'update', {});
      }
      mui.toast(res.msg)
    })

  })



})();