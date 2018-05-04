
; (function (mui) {

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
    indicators: true //是否显示滚动条
  });

  mui('#OA_task_1').on('tap', '.delete', function (event) {
    var elem = this;
    var li = elem.parentNode.parentNode;
    mui.confirm('确认删除该条记录？', '提示', btnArray, function (e) {
      if (e.index == 0) {
        li.parentNode.removeChild(li);
      } else {
        setTimeout(function () {
          mui.swipeoutClose(li);
        }, 0);
      }
    });
  });
  var btnArray = ['确认', '取消'];

  mui.plusReady(function () {
    if (plus.device.model === 'iPhoneX') {
      //页面样式重置
      $('header').css({
        'height': '88px',
        'paddingTop': '40px'
      })
    }
    addEvent()
  })
  // 下拉刷新业务
  function pulldownRwfresh() {

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



  function addEvent() {
    var self = plus.webview.currentWebview();
    var H = self.H;
    //查看车辆信息
    mui('#OA_task_1').on('tap', '.mui-slider-handle', function () {

      //打开接车点检页面
      mui.openWindow({
        url: 'vehicle-info.html',
        id: 'vehicle-info', //默认使用当前页面的url作为id
        styles: {
          top: '0px',
          bottom: H
        }, //窗口参数
        extras: { H }, //自定义扩展参数
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
    mui('#OA_task_1').on('tap', '.goback', function (e) {
      e.stopPropagation();
      mui.alert('goback');
    });
  }

  function getData() {
    var statusobj = [{
      value: "",
      name: "全部"
    }, {
      value: 0,
      name: "已录入"
    }, {
      value: 1,
      name: "已点检"
    }, {
      value: 2,
      name: "已安全检查"
    }, {
      value: 3,
      name: "已线束检查"
    }, {
      value: 4,
      name: "已bom检查"
    }, {
      value: 5,
      name: "已审核"
    }, {
      value: 6,
      name: "已还车"
    }];

    // 获取未完成列表
    app.vehicleQuery({
      "vSn": "",
      "status": "",
      "carName": "",
      "cGroup": {
        "id": "",
        "name": "",
        "remark": ""
      }
    }, function (res) {
      console.log(res.length)
      console.log(JSON.stringify(res));

      var html = '';
      for (let i = 0; i < res.length; i++) {
        const item = res[i];
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
          + '<h5>' + item.vSn + '</h5>'
          + '<p>陕A6509B</p>'
          + '</div>'
          + '<div class="mui-btn mui-btn-blue mui-btn-outlined goback">去还车'
          + '<i class="mui-icon mui-icon-arrowright"></i>'
          + '</div>'
          + '</div>'
          + '<div class="item-right-middle">'
          + '<h5>录入状态：' + statusobj[item.status].name + '</h5>'
          + '</div></div></div></div></li>'

      }

      $('#OA_task_0').html(html)
    })
  }






})(mui)
