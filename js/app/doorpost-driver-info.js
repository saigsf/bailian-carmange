(function () {
  mui.init();
  //初始化单页的区域滚动
  mui('.mui-scroll-wrapper').scroll();

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
console.log(data.groups.length)

    $('#name').html(data.name);
    $('#allowStartTime_0').html(data.allowStartTime ? data.allowStartTime : '——');
    $('#allowEndTime_0').html(data.allowEndTime ? data.allowEndTime : '——');
    $('#groups').val((data.groups.length>0) ? data.groups[0].name : '未分组');
    $('#isallow').html(data.isallow);
    $('#employeeCard').val(data.employeeCard);
    $('#iccard').val(data.iccard);
    $('#telephone').val(data.telephone ? data.telephone : '未填写');
    $('#remark').val(data.remark ? data.remark : '无');
    $('#allowStartTime').val(data.allowStartTime ? data.allowStartTime : '——');
    $('#allowEndTime').val(data.allowEndTime ? data.allowEndTime : '——');

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