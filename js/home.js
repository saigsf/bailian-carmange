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
    //更改状态栏颜色
    // plus.navigator.setStatusBarStyle("dark");
  })
})()