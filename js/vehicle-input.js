(function ($, doc) {
  $.init();
  $('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  });

  $.plusReady(function () {
    //更改状态栏颜色
    plus.navigator.setStatusBarStyle("light");
    // 弹出软键盘时自动改变webview的高度
    plus.webview.currentWebview().setStyle({
      softinputMode: "adjustResize"
    });

    var self = plus.webview.currentWebview();
    var H = self.H;

    //添加点击事件进入下一页
    doc.getElementById('next').addEventListener('tap', function () {
      //打开接车点检页面
      var data = {};

      data.vSn = h('#vSn').val(); //车辆编号
      data.product_sn = h('#product_sn').val(); //项目编号
      data.product_name = h('#product_name').val(); //项目名称
      data.carName = h('#carName').val(); //车辆名称
      data.vCarType = h('#vCarType').val(); //车辆类型
      data.customer = h('#customer').val(); //客户
      data.projectEngineer = h('#projectEngineer').val(); //项目工程师
      data.contactNumber = h('#contactNumber').val(); //联系电话
      data.engineType = h('#engineType').val(); //发动机型号
      data.engineNumber = h('#engineNumber').val(); //发动机编号
      data.engineCapacity = +h('#engineCapacity').val(); //发动机排量
      data.fulType = h('#fulType').val(); //燃油规格
      data.oilspecification = h('#oilspecification').val(); //机油规格
      data.tyresize = h('#tyresize').val(); //轮胎规格
      data.GBTS = h('#GBTS').val(); //变速箱规格
      data.reaTireP = h('#reaTireP').val(); //前轮胎压
      data.frontTireP = h('#frontTireP').val(); //后轮胎压
      data.vin = h('#vin').val(); //车辆识别码
      data.operator = h('#operator').val(); //填写人

      // data.gids = '123'; //车辆分组
      app.addTcar(data, function () {

        $.openWindow({
          url: 'vehicle-check-up.html',
          id: 'vehicle-check-up', //默认使用当前页面的url作为id
          styles: {
            top: '0px',
            bottom: H
          }, //窗口参数
          extras: {
            H: H,
            vSn: data.vSn,
            engineNumber: data.engineNumber,
            vin: data.vin
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
    });

  })
})(mui, document)