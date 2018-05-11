
(function () {
  mui.init({
    pullRefresh: {
      container: "#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down: {
        auto: true,//可选,默认false.首次加载自动下拉刷新一次
        callback: pulldownRwfresh //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
      },
      up: {
        callback: pullupRefresh
      }
    }
  });
  mui('.mui-scroll-wrapper').scroll({
    indicators: true //是否显示滚动条vehicle-detail
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
      $('.mui-scroll').css({
        'top': '88px'
      })
      $('.mui-pull-top-pocket').css({
        'top': '88px'
      })
    }
    addEvent()
  })

  // 下拉刷新业务
  function pulldownRwfresh() {
    getData();
    setTimeout(function () {
      mui('#refreshContainer').pullRefresh().endPulldownToRefresh(); //refresh completed
      // mui('#refreshContainer').pullRefresh().refresh(true); //激活上拉加载
    }, 1000)
  }

  // 上拉加载业务
  function pullupRefresh() {
    // getData();
    setTimeout(function () {
      mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
    }, 1000)
  }

  // 获取数据
  function getData() {
    // 获取待审核列表信息
    app.findWaitReviewCar({}, function (res) {
      // console.log(res);
      res = JSON.parse(res);
      updateView.waitReviewCar(res);
    })

    // 获取已审核列表信息
    app.findPassReview({}, function (res) {
      // console.log(res);
      res = JSON.parse(res);
      updateView.passReview(res);
    })

    // 获取未通过审核列表信息
    app.findNotPassReview({}, function (res) {
      console.log(res);
      res = JSON.parse(res);
      updateView.notPassReview(res);
    })
  }

  var updateView = {
    waitReviewCar: function (data) {
      var html = '';
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        html += '<li class="mui-table-view-cell">'
          + '<div class="mui-slider-right mui-disabled">'
          + '<a class="mui-btn mui-btn-red delete">删除</a>'
          + '</div>'
          + '<div class="mui-slider-handle">'
          + '<div class="list-item">'
          + '<div class="item-left">'
          + '<img src="../img/common/icon_app.png" />'
          + '</div>'
          + '<div class="item-right">'
          + '<div class="item-right-top">'
          + '<div class="number">'
          + '<h4>' + item.vSn + '</h4>'
          // + '<p>陕A6509B</p>'
          + '</div>'
          + '<div class="mui-btn mui-btn-blue mui-btn-outlined goback">'
          + '<i class="mui-icon mui-icon-arrowright"></i>'
          + '</div>'
          + '</div>'
          + '<div class="item-right-bottom">'
          + '<div class="bottom-item">'
          + '<span>安全检查：' + item.safeCheck.operator + '</span>'
          + '<span>' + item.safeCheck.time + '</span>'
          + '</div>'
          + '<div class="bottom-item bottom-item-empty"></div>'
          + '<div class="bottom-item">'
          + '<span>系统检查：' + item.systemCheck.operator + '</span>'
          + '<span>' + item.systemCheck.time + '</span>'
          + '</div>'
          + '</div>'
          + '</div>'
          + '</div>'
          + '</div>'
          + '</li>'

      }
      $('#OA_task_1').html(html)
    },
    passReview: function (data) {
      var html = '';
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        html += '<tr>'
          + '<td>' + item.vSn + '</td>'
          + '<td>'
          + '<span>' + item.safeCheck.operator + '</span>'
          + '<span>' + item.safeCheck.time + '</span>'
          + '</td>'
          + '<td>'
          + '<span>' + item.systemCheck.operator + '</span>'
          + '<span>' + item.systemCheck.time + '</span>'
          + '</td>'
          + '<td>'
          + '<span>' + item.reviewer.operator + '</span>'
          + '<span>' + item.reviewer.ReviewerTime + '</span>'
          + '</td>'
          + '</tr>'

      }
      $('#item3 table tbody').html(html)
    },
    notPassReview: function (data) {
      var html = '';
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        html += '<li class="mui-table-view-cell">'
          + '<div class="mui-slider-right mui-disabled">'
          + '<a class="mui-btn mui-btn-red delete">删除</a>'
          + '</div>'
          + '<div class="mui-slider-handle">'
          + '<div class="list-item">'
          + '<div class="item-left">'
          + '<img src="../img/common/icon_app.png" />'
          + '</div>'
          + '<div class="item-right">'
          + '<div class="item-right-top">'
          + '<div class="number">'
          + '<h4>' + item.vSn + '</h4>'
          // + '<p>陕A6509B</p>'
          + '</div>'
          + '<div class="mui-btn mui-btn-blue mui-btn-outlined goback">去修改'
          + '<i class="mui-icon mui-icon-arrowright"></i>'
          + '</div>'
          + '</div>'
          + '<div class="item-right-bottom">'
          + '<div class="bottom-item">'
          + '<span>安全检查：' + item.safeCheck.operator + '</span>'
          + '<span>' + item.safeCheck.time + '</span>'
          + '</div>'
          + '<div class="bottom-item bottom-item-empty"></div>'
          + '<div class="bottom-item">'
          + '<span>系统检查：' + item.systemCheck.operator + '</span>'
          + '<span>' + item.systemCheck.time + '</span>'
          + '</div>'
          + '</div>'
          + '<div class="item-right-middle">'
          + '<h5>原因：</h5>'
          + '<p>' + item.reviewer.remark + '</p>'
          + '</div>'
          + '</div>'
          + '</div>'
          + '</div>'
          + '</li>'

      }
      $('#OA_task_2').html(html)
    }
  }

  // 添加事件
  function addEvent() {
    var self = plus.webview.currentWebview();
    var H = self.H;
    //查看车辆信息
    mui('#OA_task_1').on('tap', '.mui-slider-handle', function () {

      //打开接车点检页面
      mui.openWindow({
        url: 'vehicle-detail.html',
        id: 'vehicle-detail', //默认使用当前页面的url作为id
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

    //查看未通过原因
    mui('#OA_task_2').on('tap', '.mui-slider-handle', function () {

      //打开接车点检页面
      mui.openWindow({
        url: 'vehicle-auditing-reason.html',
        id: 'vehicle-auditing-reason', //默认使用当前页面的url作为id
        styles: {
          top: '0px',
          bottom: H
        }, //窗口参数
        extras: {}, //自定义扩展参数
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

    //去修改
    mui('#OA_task_2').on('tap', '.goback', function (e) {
      e.stopPropagation();
      //打开接车点检页面
      mui.openWindow({
        url: 'vehicle-detail.html',
        id: 'vehicle-detail', //默认使用当前页面的url作为id
        styles: {
          top: '0px',
          bottom: H
        }, //窗口参数
        extras: {
          isChange: true
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

    // 删除审核列表
  }


})();