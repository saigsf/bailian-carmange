(function () {
  mui.init({
    swipeBack: true //启用右滑关闭功能
  });

  var pointArr = [];
  // 放缩比
  var zoom = 5;

  // 地图初始化
  map = new BMap.Map("map"); // 首页地图

  // 地图初始化
  navigator.geolocation.getCurrentPosition(translatePoint); //定位

  function translatePoint(position) {
    var currentLat = position.coords.latitude;
    var currentLon = position.coords.longitude;
    var gpsPoint = [new BMap.Point(currentLon, currentLat)];
    var convertor = new BMap.Convertor();
    convertor.translate(gpsPoint, 1, 5, initMap); //转换坐标 
  }

  function initMap(data) {
    // 控件
    map.addControl(new BMap.NavigationControl());
    map.addControl(new BMap.ScaleControl());
    map.addControl(new BMap.OverviewMapControl());


    if (data.status === 0) {
      for (var i = 0; i < data.points.length; i++) {
        // 中心点及放缩比设置
        map.centerAndZoom(data.points[i], zoom);
        // 添加marker
        map.addOverlay(new BMap.Marker(data.points[i]));
      }
    }



  }

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

    getData();
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
        if (docw - X < w) {
          X = docw - w;
        }

        if (Y < h / 2 + 34) {
          Y = 34;
        }
        if (doch - Y < h) {
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

  function getData() {
    app.allcar({}, function (res) {
      console.log(138);
      updateView(res)
    })
  }

  function updateView(data) {
    map.centerAndZoom(new BMap.Point(data[0].longitude, data[0].latitude), 14);
    map.clearOverlays();       //清除地图上所有覆盖物

    if (!document.createElement('canvas').getContext) {
      alert('请在chrome、safari、IE8+以上浏览器查看');
      return;
    }

    var points = [];
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      var point = new BMap.Point(item.longitude, item.latitude)
      // 添加信息
      // ···
      points.push(point);
    }

    var options = {
      size: BMAP_POINT_SIZE_BIG,
      shape: BMAP_POINT_SHAPE_STAR,
      color: '#d340c3'
    }
    console.log(JSON.stringify(points))

    var pointCollection = new BMap.PointCollection(points, options);  // 初始化PointCollection
    pointCollection.addEventListener('click', function (e) {
      alert('单击点的坐标为：' + e.point.lng + ',' + e.point.lat);  // 监听点击事件
    });
    map.addOverlay(pointCollection);  // 添加Overlay
  }



})()