(function (mui, doc) {
  //初始化
  mui.init();
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
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
    var H = self.H;

    $('#vSn').val(self.vSn);
    $('#engineNumber').val(self.engineNumber);
    $('#vin').val(self.vin);

    //添加点击事件进入下一页
    doc.getElementById('next').addEventListener('tap', function () {
      //打开接车点检页面
      var data = {};
 
      data.vSn = $('#vSn').val();  //点检车辆编号
      data.facade = $('#normal').attr('checked') ? '正常' : '见下页说明'; //车辆外观
      data.item = $('#item').val(); //随车物品
      data.tools = $('#tools').val(); //工具/套
      data.sparetyre = $('#sparetyre').val(); //备用轮胎/只
      data.jack = $('#jack').val(); //千斤顶
      data.warningboard = $('#warningboard').val(); //警示牌/只
      data.fire = $('#fire').val(); //车用灭火器/只
      data.keyy = $('#keyy').val(); //钥匙数量/把
      data.odometer = $('#odometer').val(); //里程表/km
      data.pickone = $('#pickone').val(); //接车人
      data.telephone = $('#telephone').val(); //电话号码
      data.send_p = $('#send_p').val(); //送车人
      // data.time = new Date(); //时间
      data.vin = $('#vin').val(); //车架号
      data.engineNumber = $('#engineNumber').val();//发动机号



      app.upcheck(data, function (err) {
        // if(err && typeof err === 'String') {
        //   mui.toast(err);
        //   return;
        // }
        mui.openWindow({
          url: 'vehicle-check-safety.html',
          id: 'vehicle-check-safety', //默认使用当前页面的url作为id
          styles: {
            top: '0px',
            bottom: H
          }, //窗口参数
          extras: {
            H: H,
            vSn: self.vSn
          }, //自定义扩展参数
          createNew: false, //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
          show: {
            autoShow: true, //页面loaded事件发生后自动显示，默认为true
          },
          waiting: {
            autoShow: true, //自动显示等待框，默认为true
            title: '正在加载...', //等待对话框上显示的提示内容
          }
        })
      })


    })
  })
})(mui, document);