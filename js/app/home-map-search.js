(function () {
  mui.init({
    swipeBack: true //启用右滑关闭功能
  });

  mui.plusReady(function () {
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
    //  弹出软键盘时自动改变webview的高度
    // plus.webview.currentWebview().setStyle({
    //   softinputMode: "adjustResize"
    // });
    addEvent()
  })

  function addEvent() {
    var flag = true
    $('#btn').on('tap', function () {
      if (!flag) {
        $(this).removeClass('mui-icon-arrowup').addClass('mui-icon-arrowdown')
        $('.bottom-search').css('bottom', '0px')
      } else {
        $(this).removeClass('mui-icon-arrowdown').addClass('mui-icon-arrowup')
        $('.bottom-search').css('bottom', '-80px')
      }
      flag = !flag
    })

    var self = plus.webview.currentWebview();
    var H = self.H


    // 更改标题
    $('.mui-segmented-control').on('tap', '.mui-control-item', function () {
      $('.mui-title').html($(this).html())
    })

    // 搜索
    $('#search').on('tap', function () {
      mui.openWindow({
        url: 'search.html',
        id: 'search', //默认使用当前页面的url作为id
        styles: {
          top: '0px',
          bottom: H
        }, //窗口参数
        extras: {
          H: H,
          prevId: self.id
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

  // 百度地图API功能	
  var myIcon = new BMap.Icon("../../img/common/md/icon_bus.png", new BMap.Size(30, 57));


  // 添加平移缩放控件
  // map1.addControl(new BMap.NavigationControl());
  // map2.addControl(new BMap.NavigationControl()); 

  //启用滚轮放大缩小，默认禁用
  // map1.enableScrollWheelZoom(); 
  // map2.enableScrollWheelZoom(); 

  navigator.geolocation.getCurrentPosition(translatePoint); //定位

  function translatePoint(position) {
    // console.log(JSON.stringify(position))
    var currentLat = position.coords.latitude;
    var currentLon = position.coords.longitude;
    var gpsPoint = [new BMap.Point(currentLon, currentLat)];
    var convertor = new BMap.Convertor();
    convertor.translate(gpsPoint, 1, 5, initMap); //转换坐标 
  }
  function initMap(data) {
    console.log(JSON.stringify(data))
    // 放缩比
    var zoom = 11;

    // 地图初始化
    map1 = new BMap.Map("item1-map"); // 轨迹查询
    map2 = new BMap.Map("item2-map"); // 实时监控

    // 控件
    // map1.addControl(new BMap.NavigationControl());
    // map2.addControl(new BMap.NavigationControl());
    // map1.addControl(new BMap.ScaleControl());
    // map2.addControl(new BMap.ScaleControl());
    // map1.addControl(new BMap.OverviewMapControl());
    // map2.addControl(new BMap.OverviewMapControl());

    if (data.status === 0) {
      for (var i = 0; i < data.points.length; i++) {
        // 中心点及放缩比设置
        map1.centerAndZoom(data.points[i], zoom);
        map2.centerAndZoom(data.points[i], zoom);
        // 添加marker
        map1.addOverlay(new BMap.Marker(data.points[i]));
        map2.addOverlay(new BMap.Marker(data.points[i]));
      }
    }



  }




  // 状态栏颜色更改
  document.addEventListener('statusBar', function (e) {
    plus.navigator.setStatusBarStyle('light');
    mui.toast(e.detail.vSn);
    getData(e.detail.vSn)
  })

  function getData(vSn) {
    // 实时数据查询
    app.carData({
      vSn: vSn
    }, function (res) {
      // console.log(JSON.stringify(res));
      updateView.carData(res)
    });

    app.carTrack({
      vSn: vSn,
      startDate: (new Date()).format('yyyy-MM-dd hh:mm:ss'),
      endDate: (new Date()).format('yyyy-MM-dd hh:mm:ss')
    }, function (res) {
      // console.log(res)
      res = JSON.parse(res)
      if (res.length <= 0) {
        mui.toast('没有数据');
        return;
      }
      updateView.carTrack(res)
    })
  }


  var updateView = {
    carData: function (data) {
      var points = [];
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        var point = new BMap.Point(item.longitude, item.latitude)
        points.push(point);
      }

      //坐标转换完之后的回调函数
      var translateCallback = function (data) {
        if (data.status === 0) {
          for (var i = 0; i < data.points.length; i++) {
            map2.addOverlay(new BMap.Marker(data.points[i]));
            map2.setCenter(data.points[i]);
          }
        }
      }
      setTimeout(function () {
        var convertor = new BMap.Convertor();
        convertor.translate(points, 1, 5, translateCallback)
      }, 1000);
    },
    carTrack: function (data) {
      var markers = [];
      var new_markers = [];
      var points = [];
      var total = 0; // 总记录数
      var groupCount = 0; // 每次转十条

    }
  }
})()