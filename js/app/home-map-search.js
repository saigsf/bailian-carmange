(function() {
  mui.init({
    swipeBack: true //启用右滑关闭功能
  });

  var flag = true;
  var bottom = '-70px';
  $('#btn').on('tap', function() {
    if(!flag) {
      $(this).removeClass('icon-arrowup').addClass('icon-arrowdown')
      $('.bottom-search').css('bottom', '0px')
    } else {
      $(this).removeClass('icon-arrowdown').addClass('icon-arrowup')
      $('.bottom-search').css('bottom', bottom)
    }
    flag = !flag
  })
  // 更改标题
  $('.mui-segmented-control').on('tap', '.mui-control-item', function() {
    $('.mui-title').html($(this).html())
    if($(this).html() == '实时监控') {
    	$('.date-container').hide();
    	bottom = '-70px';
    }
    if($(this).html() == '车辆轨迹') {
    	$('.date-container').css('display', 'flex');
    	bottom = '-120px';
    }
    $('#btn').removeClass('icon-arrowdown').addClass('icon-arrowup')
      $('.bottom-search').css('bottom', bottom)
    flag = false;
  })

  // 全局变量
  var H = null;

  mui.plusReady(function() {
    // plus准备好后执行H5
    handsetAdaption()
    // 获取当前视图
    var self = plus.webview.currentWebview();
    // 获取传递参数
    H = self.H;
    addEvent()
  })

  // 手机适配方法
  function handsetAdaption() {
    // 更改顶部导航栏高度
    if(plus.device.model === 'iPhoneX') {
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
    //  plus.webview.currentWebview().setStyle({
    //    softinputMode: "adjustResize"
    //  });

  }

  function addEvent() {

    // 搜索
    $('#search').on('tap', function() {
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
  var myIcon = new BMap.Icon("../../img/car@3x.png", new BMap.Size(30, 57));

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

    if(data.status === 0) {
      for(var i = 0; i < data.points.length; i++) {
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
  document.addEventListener('statusBar', function(e) {
    plus.navigator.setStatusBarStyle('light');
    mui.toast(e.detail.vSn);
    getData(e.detail.vSn)
  })

  function getData(vSn) {
    // 实时数据查询
    app.carData({
      vSn: vSn
    }, function(res) {
      // console.log(JSON.stringify(res));
      updateView.carData(res)
    });

    app.carTrack({
      vSn: vSn,
      startDate: (new Date()).format('yyyy-MM-dd hh:mm:ss'),
      endDate: (new Date()).format('yyyy-MM-dd hh:mm:ss')
    }, function(res) {
      // console.log(res)
      res = JSON.parse(res)
      // if (res.length <= 0) {
      //   mui.toast('没有数据');
      //   return;
      // }
      updateView.carTrack(res)
    })
  }

  var updateView = {
    carData: function(data) {
      var points = [];
      for(let i = 0; i < data.length; i++) {
        const item = data[i];
        var point = new BMap.Point(item.longitude, item.latitude)
        points.push(point);
      }

      //坐标转换完之后的回调函数
      var translateCallback = function(data) {
        if(data.status === 0) {
          // console.log(myIcon)
          for(var i = 0; i < data.points.length; i++) {
            var marker = new BMap.Marker(data.points[i]); // 在指定坐标创建marker对象
            marker.setLabel('工作地点'); // 设置marker的标注文字
            map2.addOverlay(marker);
            map2.setCenter(data.points[i]);
          }
        }
      }
      setTimeout(function() {
        var convertor = new BMap.Convertor();
        convertor.translate(points, 1, 5, translateCallback)
      }, 1000);
    },
    carTrack: function(data) {

      // 获取车辆位置点集，这里使用假数据
      var pts = [
        new BMap.Point(108.929346, 34.303791),
        new BMap.Point(108.929202, 34.283391),
        new BMap.Point(108.929202, 34.276471),
        new BMap.Point(108.928771, 34.275397)
      ];
      //展示线条
      var polyline;
      // 轨迹配置项
      var options = {
        onSearchComplete: function(results) {
          if(driving.getStatus() == BMAP_STATUS_SUCCESS) {
            // 获取第一条方案
            var plan = results.getPlan(0);
            // 获取方案的驾车线路
            var route = plan.getRoute(0);
            //返回路线的地理坐标点数组。（自 1.2 新增）
            var points = route.getPath();
            polyline = new BMap.Polyline(points);
            map1.addOverlay(polyline); //增加折线
          }
        }
        //,
        //renderOptions:{map: map1, autoViewport: true}
      };
      // 创建轨迹实例
      var driving = new BMap.DrivingRoute(map1, options);
      // 索引
      var i = 0;

      // 轨迹实现方法
      function playLine(i) {
        if(i == 0) { //第一个点 直接添加
          var marker = new BMap.Marker(pts[i]); // 创建标注
          map1.addOverlay(marker);
          // marker.setLabel(new BMap.Label("我是第" + (i + 1) + "个点", { offset: new BMap.Size(20, -10) }));
          map1.panTo(pts[i]);
          i++;
          setTimeout(function() {
            playLine(i);
          }, 2000)
        } else { //获取PolyLine并添加 添加点
          if(i < pts.length) {
            driving.search(pts[i - 1], pts[i]);
            map1.addOverlay(polyline);
            var marker = new BMap.Marker(pts[i]); // 创建标注
            map1.addOverlay(marker);
            // marker.setLabel(new BMap.Label("我是第" + (i + 1) + "个点", { offset: new BMap.Size(20, -10) }));
            map1.panTo(pts[i]);
            i++;
            setTimeout(function() {
              playLine(i);
            }, 10)
          }
        }

        map1.setViewport(pts)
      }

      playLine(i);

    }
  }

})()