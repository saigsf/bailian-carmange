(function () {
  mui.init({
    swipeBack: true //启用右滑关闭功能
  });

  // 百度地图API功能	
  // var map = new BMap.Map("map");

  // map.centerAndZoom(new BMap.Point(104.114129, 37.550339), 5);
  // map.addControl(new BMap.NavigationControl()); // 添加平移缩放控件
  // map.enableScrollWheelZoom(); //启用滚轮放大缩小，默认禁用

  mui.plusReady(function () {
    // 弹出软键盘时自动改变webview的高度
    plus.webview.currentWebview().setStyle({
      softinputMode: "adjustResize"
    });
    //更改状态栏颜色
    // plus.navigator.setStatusBarStyle("dark");
    var self = plus.webview.currentWebview();
    var H = self.H
    $('#trajectory').on('tap', function () {
      mui.openWindow({
        url: 'home-map-search.html',
        id: 'home-map-search', //默认使用当前页面的url作为id
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
  })

  // 拖住啊
  function drag() {
    var w = document.getElementById('trajectory').clientWidth;
    var h = document.getElementById('trajectory').clientHeight;
    var docw = document.documentElement.clientWidth;
    var doch = document.documentElement.clientHeight;
    console.log(doch, docw)
    // console.log(w)

    mui(document).on('dragstart', '#trajectory', function (e) {
      var x = e.detail.center.x - w / 2;
      var y = e.detail.center.y - h / 2;
      if (x < w / 2) {
        x = 0;
      }

      if (y < h / 2) {
        y = 0;
      }


      // console.log(x + ":" + y);
      document.getElementById('trajectory').style.left = x + 'px';
      document.getElementById('trajectory').style.top = y + 'px';

      mui(document).on('drag', '#trajectory', function (e) {
        var X = e.detail.center.x - w / 2;
        var Y = e.detail.center.y - h / 2;

        if (X < w / 2) {
          X = 0;
        }
        if (docw - X < w / 2) {
          X = docw - w;
        }

        if (Y < h / 2) {
          Y = 0;
        }
        if (doch - Y < h / 2) {
          Y = doch - h;
        }

        document.getElementById('trajectory').style.left = X + 'px';
        document.getElementById('trajectory').style.top = Y + 'px';
        // console.log(e.detail.center.x + ":" + e.detail.center.y);

      })
    })

    mui(document).on('dragend', '#trajectory', function (e) {

      // console.log(e.detail.center.x + ":" + e.detail.center.y);

    })
  }

  drag()


})()