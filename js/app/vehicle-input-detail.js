;
(function(mui, doc) {
  mui.init();

  //初始化单页view
  var viewApi = mui('#app').view({
    defaultPage: '#zero'
  });

  //重写后退
  var oldBack = mui.back;
  mui.back = function() {
    if(viewApi.canBack()) {
      viewApi.back();
    } else {
      oldBack();
    }
  };
  
  //初始化单页的区域滚动
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  });

  // 定义全局变量
  var H = null; // 页面高度
  var nextIdArr = ['vehicle-input']; // 下一页id

  mui.plusReady(function() {
    // plus准备好后执行H5
    handsetAdaption();
    // 获取当前视图
    var self = plus.webview.currentWebview();
    // 获取传递参数
    H = self.H;
    // 添加点击事件进入下一页
//  addEvents();

  });

  // 手机适配方法
  function handsetAdaption() {
    // 更改顶部导航栏高度
    if(plus.device.model === 'iPhoneX') {
      // 页面样式重置
      $('header').css({
        'height': '88px',
        'paddingTop': '40px'
      });
      $('.mui-bar-nav').css({
        'height': '88px',
        'paddingTop': '40px'
      });
      $('.mui-pages').css('top', '88px')
    }

    // 更改状态栏颜色
    // plus.navigator.setStatusBarStyle("light");
    // 弹出软键盘时自动改变webview的高度
    // plus.webview.currentWebview().setStyle({
    //   softinputMode: "adjustResize"
    // });

  }

  // 页面点击事件
  function addEvents() {
    console.log(nextIdArr)
    for(var i = 0; i < nextIdArr.length; i++) {
      var id = nextIdArr[i];
      $('#' + id).on('tap', function() {
        var t = $(this).find('a').html();
        mui.toast(t);
        mui.openWindow({
          url: id + '.html',
          id: id, //默认使用当前页面的url作为id
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
    }

  }

})(mui, document)