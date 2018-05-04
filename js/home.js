(function () {
  mui.init({
    swipeBack: true //启用右滑关闭功能
  });

  // 百度地图API功能	
  var map = new BMap.Map("map");

  map.centerAndZoom(new BMap.Point(104.114129, 37.550339), 5);
  map.addControl(new BMap.NavigationControl()); // 添加平移缩放控件
  map.enableScrollWheelZoom(); //启用滚轮放大缩小，默认禁用

  mui.plusReady(function () {
         // 弹出软键盘时自动改变webview的高度
        plus.webview.currentWebview().setStyle({
          softinputMode: "adjustResize"
        });
    //更改状态栏颜色
    // plus.navigator.setStatusBarStyle("dark");
    var self = plus.webview.currentWebview();
    var H = self.H
    $('#trajectory').on('tap', function () {
      mui.openWindow({
        url: 'home-map-search.html',
        id: 'home-map-search', //默认使用当前页面的url作为id
        styles: {
          top: '0px',
          bottom: H
        }, //窗口参数
        extras: {
          H: H
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

  
    

})()