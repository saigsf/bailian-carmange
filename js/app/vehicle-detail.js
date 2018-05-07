

(function(mui) {
  mui.init({
    swipeBack: false
  });
  mui('.mui-scroll-wrapper').scroll({
    indicators: true //是否显示滚动条
  });

  var webview = plus.webview.currentWebview();
  console.log(webview.isChange)
  if(webview.isChange) {
    document.getElementById('auditing_btn').style.display = 'none';
    document.getElementById('change_btn').style.display = 'block';
  } else {
    document.getElementById('auditing_btn').style.display = 'block';
    document.getElementById('change_btn').style.display = 'none';
  }

  mui.plusReady(function() {
    if (plus.device.model === 'iPhoneX') {
      //页面样式重置
      $('header').css({
        'height': '88px',
        'paddingTop': '40px'
      })
      $('.mui-bar-nav~.mui-content').css({
        'paddingTop': '88px'
      })
    }
    var self = plus.webview.currentWebview();
    var H = self.H;
    //通过审核的事件
    document.getElementById('through').addEventListener('tap', function() {
      //打开接车点检页面
      mui.openWindow({
        url: 'vehicle-auditing-add-explain.html',
        id: 'vehicle-auditing-add-explain', //默认使用当前页面的url作为id
        styles: {
          top: '0px',
          bottom: H
        }, //窗口参数
        extras: {
          H
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

    //未通过审核的事件
    document.getElementById('not_through').addEventListener('tap', function() {
      //打开接车点检页面
      mui.openWindow({
        url: 'vehicle-auditing-add-explain.html',
        id: 'vehicle-auditing-add-explain', //默认使用当前页面的url作为id
        styles: {
          top: '0px',
          bottom: H
        }, //窗口参数
        extras: {
          H
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
})(mui);