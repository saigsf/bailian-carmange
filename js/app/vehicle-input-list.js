;(function (mui, doc) {
    
  // 定义全局变量
  var H = null; // 页面高度
  var vSn = null;

  mui.init();
  mui('.mui-scroll-wrapper').scroll();


  mui.plusReady(function () {
		// plus准备好后执行H5
		handsetAdaption();
		// 获取当前视图
    var self = plus.webview.currentWebview();
    // 获取传递参数
    H = self.H;
    // 添加点击事件进入下一页
    addEvents();
    
  });
  
  // 手机适配方法
  function handsetAdaption() {
  	// 更改顶部导航栏高度
  	if (plus.device.model === 'iPhoneX') {
      // 页面样式重置
      $('header').css({
        'height': '88px',
        'paddingTop': '40px'
      });
      $('.mui-bar-nav~.mui-content').css({
        'paddingTop': '88px'
      })
    }
  	
  	// 更改状态栏颜色
		// plus.navigator.setStatusBarStyle("light");
    // 弹出软键盘时自动改变webview的高度
    plus.webview.currentWebview().setStyle({
      softinputMode: "adjustResize"
    });
    
  }
  
  // 页面点击事件
  function addEvents() {
  	// 跳转执行下一步
  	$('#vehicle_input_list').on('tap', '.mui-slider-handle', function() {
  		mui.openWindow({
        url: 'vehicle-input-info.html',
        id: 'vehicle-input-info', //默认使用当前页面的url作为id
        styles: {
          top: '0px',
          bottom: H
        }, //窗口参数
        extras: {
          H: H,
          vSn: vSn
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
  
  
})(mui, document)
