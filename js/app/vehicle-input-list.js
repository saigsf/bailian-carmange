;(function (mui, doc) {
  var curPage = 1;  //当前页码初始化数0开始
  var totalPage = 0; //后台算出总页数
  // 定义全局变量
  var H = null; // 页面高度
  var vSn = null;

  mui.init({
    pullRefresh: {
      container: "#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down: {
        auto: true,//可选,默认false.首次加载自动下拉刷新一次
        callback: pulldownRwfresh //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
      },
      up: {
        auto: true,
        callback: pullupRefresh
      }
    }
  });
  mui('.mui-scroll-wrapper').scroll();
    // 下拉刷新业务
    function pulldownRwfresh() {
      // getData(1)
      setTimeout(function () {
  
        mui('#refreshContainer').pullRefresh().endPulldownToRefresh(); //refresh completed
        mui('#refreshContainer').pullRefresh().refresh(true); //激活上拉加载
      }, 1000)
    }
  
    // 上拉加载业务
    function pullupRefresh() {
      // getData();
      if (curPage > totalPage) {
        mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
      } else {
        // getData()
      }
      setTimeout(function () {
        mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
      }, 1000)
    }


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
    

    // 保险申请
    $('#add_btn').on('tap', function () {
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
  }
  
  // addEvents()
})(mui, document)
