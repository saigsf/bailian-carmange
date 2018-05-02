;(function () {
  mui.init();
  mui.plusReady(function () {
    var ws = plus.webview.currentWebview();
    var H = ws.H;
    document.addEventListener('tap', function () {
      mui.back()
    })
    $('#doorpost').on('tap', function () {
      mui.openWindow({
        url: 'doorpost.html',
        id: 'doorpost', //默认使用当前页面的url作为id
        styles: {
          top: '0px',
          bottom: H
        }, //窗口参数
        extras: {
          H: H,
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
})();