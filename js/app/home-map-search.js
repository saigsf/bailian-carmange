(function() {
  mui.init({
    swipeBack: true //启用右滑关闭功能
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
    //  弹出软键盘时自动改变webview的高度
    //  plus.webview.currentWebview().setStyle({
    //   softinputMode: "adjustResize"
    // });
    addEvent()
  })
  // mui('.mui-popover').popover('toggle',document.getElementById("openPopover"));

  function addEvent() {
    var flag = true
    $('#btn').on('tap', function() {
      if(!flag) {
        $(this).removeClass('mui-icon-arrowup').addClass('mui-icon-arrowdown')
        $('.bottom-search').css('bottom', '0px')
      } else {
        $(this).removeClass('mui-icon-arrowdown').addClass('mui-icon-arrowup')
        $('.bottom-search').css('bottom', '-80px')
      }
      flag = !flag
    })


    // 更改标题
    $('.mui-segmented-control').on('tap', '.mui-control-item', function () {
      $('.mui-title').html($(this).html())
    })

  }

    // 百度地图API功能	
    var map1 = new BMap.Map("item1-map");

    map1.centerAndZoom(new BMap.Point(104.114129, 37.550339), 5);
    map1.addControl(new BMap.NavigationControl()); // 添加平移缩放控件
    map1.enableScrollWheelZoom(); //启用滚轮放大缩小，默认禁用

      // 百度地图API功能	
  var map2 = new BMap.Map("item2-map");

  map2.centerAndZoom(new BMap.Point(104.114129, 37.550339), 5);
  map2.addControl(new BMap.NavigationControl()); // 添加平移缩放控件
  map2.enableScrollWheelZoom(); //启用滚轮放大缩小，默认禁用
})()