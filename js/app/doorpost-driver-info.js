(function () {
  mui.init();

  var H = null;
  var id = null;

  mui.plusReady(function () {
    handsetAdaption()

    var self = plus.webview.currentWebview();
    H = self.H;
    id = self.ids;
    getData(id);
    addEvent();
  })

  function handsetAdaption() {
    // 更改顶部导航栏高度
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

    // 更改状态栏颜色
    // plus.navigator.setStatusBarStyle("light");
    // 弹出软键盘时自动改变webview的高度
    // plus.webview.currentWebview().setStyle({
    //   softinputMode: "adjustResize"
    // });

  }

  function getData(id) {
    app.carDriverEdit({ id: id }, function (res) {
      console.log(res)
      updateView(res)
    })
  }

  function updateView(data) {
    var html = '<div class="driver-info">'
      + '<div><label>姓名：</label>' + data.name + '</div>'
      + '<div><label>iccard：</label>' + data.iccard + '</div>'
      + '<div><label>授权状态：</label>' + data.isallow + '</div>'
      + '<div><label>授权开始：</label>' + data.allowStartTime + '</div>'
      + '<div><label>授权截至：</label>' + data.allowEndTime + '</div>'
      + '<div><label>联系方式：</label>' + data.telephone + '</div>'
      + '<div><label>备注：</label><p>' + (data.remark ? data.remark : '无') + '</p>'
      + '</div><div class="mui-btn mui-btn-blue mui-btn-outlined" data-id="' + data.id + '" id="edit">修改>>></div></div>';
  
    $('.mui-scroll').html(html);
    }

  function addEvent() {
    $('.mui-scroll').on('tap', '#edit', function () {
      mui.openWindow({
        url: 'doorpost-driver-input.html',
        id: 'doorpost-driver-input', //默认使用当前页面的url作为id
        styles: {
          top: '0px',
          bottom: H
        }, //窗口参数
        extras: {
          H: H,
          ids: id
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


})()