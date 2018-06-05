;(function (mui, doc) {
  mui.init();
  mui('.mui-scroll-wrapper').scroll();
  
  // 定义全局变量
  var H = null; // 页面高度

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

  function getData() {
    app.insuranceQuery({
      page: 1,
      size: 5
    }, function(res) {
      res = JSON.parse(res)
      console.log(res)
    })
  }
  getData();

  function updateView() {

  }
  
  // 页面点击事件
  function addEvents() {
  	$('#add_btn').on('tap', function() {
      mui.openWindow({
        url: 'vehicle-insurance-apply.html',
        id: 'vehicle-insurance-apply', //默认使用当前页面的url作为id
        styles: {
          top: '0px',
          bottom: H
        }, //窗口参数
        extras: {
          H: H
        } //自定义扩展参数
      })
    })

    // 保险录入
    $('#vehicle_insurance_list').on('tap', '.insurance-entry', function(e) {
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
          vSn: $li.attr('data-vSn')
        } //自定义扩展参数
      })
    })

    // 保险详情
    $('#vehicle_insurance_list').on('tap', '.mui-slider-handle', function() {
      var $li = $(this).parents('li')
      
      mui.openWindow({
        url: 'vehicle-insurance-info.html',
        id: 'vehicle-insurance-info', //默认使用当前页面的url作为id
        styles: {
          top: '0px',
          bottom: H
        }, //窗口参数
        extras: {
          H: H,
          vSn: $li.attr('data-vSn')
        } //自定义扩展参数
      })
    })

  }
  
  
})(mui, document)
