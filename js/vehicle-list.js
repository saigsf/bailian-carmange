(function($, doc) {

  $.init();

  $('.mui-scroll-wrapper').scroll({
    indicators: true //是否显示滚动条
  });
  
  // app.pageQuery({
  // 	page: 1,
  // 	size: 10
  // }, function (vehicleList) {
  // 	$.toast('车辆列表获取成功')
  // });

  $('#OA_task_1').on('tap', '.delete', function(event) {
    var elem = this;
    var li = elem.parentNode.parentNode;
    mui.confirm('确认删除该条记录？', '提示', btnArray, function(e) {
      if(e.index == 0) {
        li.parentNode.removeChild(li);
      } else {
        setTimeout(function() {
          $.swipeoutClose(li);
        }, 0);
      }
    });
  });
  var btnArray = ['确认', '取消'];

  mui.plusReady(function() {
    plus.webview.currentWebview().setStyle({
      softinputMode: "adjustResize" // 弹出软键盘时自动改变webview的高度
    });

    var self = plus.webview.currentWebview();
    var H = self.H;
    //查看车辆信息
    $('#OA_task_1').on('tap', '.mui-slider-handle', function() {

      //打开接车点检页面
      mui.openWindow({
        url: 'vehicle-info.html',
        id: 'vehicle-info', //默认使用当前页面的url作为id
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
    });
    //去还车
    $('#OA_task_1').on('tap', '.goback', function(e) {
      e.stopPropagation();

      //打开接车点检页面
      mui.openWindow({
        url: 'vehicle-check-down.html',
        id: 'vehicle-check-down', //默认使用当前页面的url作为id
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

})(mui, document);