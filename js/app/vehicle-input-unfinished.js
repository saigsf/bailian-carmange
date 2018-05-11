
; (function (mui) {

  mui.init({
    pullRefresh: {
      container: "#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down: {
        auto: true,//可选,默认false.首次加载自动下拉刷新一次
        callback: pulldownRwfresh //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
      }
    }
  });

  mui('.mui-scroll-wrapper').scroll({
    indicators: true //是否显示滚动条
  });



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
    getData();
    setTimeout(function () {
      mui('#refreshContainer').pullRefresh().endPulldownToRefresh(); //refresh completed
    }, 1000)
  }

  function addEvent() {
    var self = plus.webview.currentWebview();
    var H = self.H;
    //查看车辆信息
    mui('#refreshContainer').on('tap', '.goCheck', function () {
      var $li = $(this).parents('li');
      //打开安全检查
      mui.openWindow({
        url: 'vehicle-check-safety.html',
        id: 'vehicle-check-safety', //默认使用当前页面的url作为id
        styles: {
          top: '0px',
          bottom: H
        }, //窗口参数
        extras: { 
          H: H,
          vSn: $li.attr('data-vSn')
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

    // 打开接车检点
    mui('#refreshContainer').on('tap', '.goPickUp', function () {

      //打开接车点检页面
      mui.openWindow({
        url: 'vehicle-check-up.html',
        id: 'vehicle-check-up', //默认使用当前页面的url作为id
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
    mui('#refreshContainer').on('tap', '.goback', function (e) {
      e.stopPropagation();
      //打开接车点检页面
      mui.openWindow({
        url: 'vehicle-check-down.html',
        id: 'vehicle-check-down', //默认使用当前页面的url作为id
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
    // 删除列表
    mui('#refreshContainer').on('tap', '.delete', function (event) {
      var elem = this;
      var $li = $(this).parents('li');
      mui.confirm('确认删除该条记录？', '提示', btnArray, function (e) {
        if (e.index == 0) {
          
          app.vehicleDelete({
            ids: $li.attr('data-id')
          }, function (res) {
            // console.log(res)
            res = JSON.parse(res);
            if(res.ret) {
              $li.remove();
              mui.toast(res.msg)
            } else {
              mui.toast(res.msg)
            }
          })
        } else {
          setTimeout(function () {
            mui.swipeoutClose($li[0]);
          }, 0);
        }
      });
    });
    var btnArray = ['确认', '取消'];
  }

  function getData() {
    var statusobj = [{
      value: 0,
      name: "接车点检（未完成）",
      nextClass: "goPickUp"
    }, {
      value: 1,
      name: "所有检查（未完成）",
      nextClass: "goCheck"
    }, {
      value: 2,
      name: "线束/bom检查（未完成）",
      nextClass: "goCheck"
    }, {
      value: 3,
      name: "安全/bom检查（未完成）",
      nextClass: "goCheck"
    }, {
      value: 4,
      name: "线束/安全检查（未完成）",
      nextClass: "goCheck"
    }, {
      value: 5,
      name: "已完成（去还车）",
      nextClass: "goback"
    }, {
      value: 6,
      name: "已完成（去还车）",
      nextClass: "goback"
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
      console.log(JSON.stringify(res))
      var data_1 = [];
      var data_2 = [];
      var data_3 = [];

      for (let i = 0; i < res.length; i++) {
        const item = res[i];
        switch (item.status) {
          case '0':
            data_1.push(item);
            break;
          case '1':
          case '2':
          case '3':
          case '4':
            data_2.push(item);
            break;
          case '5':
          case '6':
            data_3.push(item);
            break;
          default:
            break;
        }
      }

      updateView.all(res, statusobj)
      updateView.pickUpCheck(data_1, statusobj)
      updateView.allCheck(data_2, statusobj)
      updateView.pickDownCheck(data_3, statusobj)
    })
  }

  var updateView = {
    all: function (res, statusobj) {
      var html = '';
      for (let i = 0; i < res.length; i++) {
        const item = res[i];
        html += '<li class="mui-table-view-cell" data-id="' + item.id + '" data-vSn="'+ item.vSn +'">'
          + '<div class="mui-slider-right mui-disabled">'
          + '<a class="mui-btn mui-btn-red delete">删除</a>'
          + '</div>'
          + '<div class="mui-slider-handle ' + statusobj[item.status].nextClass + '">'
          + '<div class="list-item">'
          + '<div class="item-left">'
          + '<img src="../img/common/icon_app.png" />'
          + '</div>'
          + '<div class="item-right">'
          + '<div class="item-right-top">'
          + '<div class="number">'
          + '<h4>' + item.vSn + '</h4>'
          + '<p>' + (item.vCarSn ? item.vCarSn : '未填写') + '</p>'
          + '</div>'
          + '<div class="mui-btn mui-btn-blue mui-btn-outlined goback">'
          + '<i class="mui-icon mui-icon-arrowright"></i>'
          + '</div>'
          + '</div>'
          + '<div class="item-right-middle">'
          + '<h5>录入状态：' + statusobj[item.status].name + '</h5>'
          + '</div></div></div></div></li>'

      }

      $('#OA_task_0').html(html)
    },
    pickUpCheck: function (res, statusobj) {
      var html = '';
      for (let i = 0; i < res.length; i++) {
        const item = res[i];
        html += '<li class="mui-table-view-cell" data-id="' + item.id + '">'
          + '<div class="mui-slider-right mui-disabled">'
          + '<a class="mui-btn mui-btn-red delete">删除</a>'
          + '</div>'
          + '<div class="mui-slider-handle ' + statusobj[item.status].nextClass + '">'
          + '<div class="list-item">'
          + '<div class="item-left">'
          + '<img src="../img/common/icon_app.png" />'
          + '</div>'
          + '<div class="item-right">'
          + '<div class="item-right-top">'
          + '<div class="number">'
          + '<h4>' + item.vSn + '</h4>'
          + '<p>' + (item.vCarSn ? item.vCarSn : '未填写') + '</p>'
          + '</div>'
          + '<div class="mui-btn mui-btn-blue mui-btn-outlined goPickUp">'
          + '<i class="mui-icon mui-icon-arrowright"></i>'
          + '</div>'
          + '</div>'
          + '<div class="item-right-middle">'
          + '<h5>录入状态：' + statusobj[item.status].name + '</h5>'
          + '</div></div></div></div></li>'

      }

      $('#OA_task_1').html(html)
    },
    allCheck: function (res, statusobj) {
      var html = '';
      for (let i = 0; i < res.length; i++) {
        const item = res[i];
        html += '<li class="mui-table-view-cell" data-id="' + item.id + '">'
          + '<div class="mui-slider-right mui-disabled">'
          + '<a class="mui-btn mui-btn-red delete">删除</a>'
          + '</div>'
          + '<div class="mui-slider-handle ' + statusobj[item.status].nextClass + '">'
          + '<div class="list-item">'
          + '<div class="item-left">'
          + '<img src="../img/common/icon_app.png" />'
          + '</div>'
          + '<div class="item-right">'
          + '<div class="item-right-top">'
          + '<div class="number">'
          + '<h4>' + item.vSn + '</h4>'
          + '<p>' + (item.vCarSn ? item.vCarSn : '未填写') + '</p>'
          + '</div>'
          + '<div class="mui-btn mui-btn-blue mui-btn-outlined goCheck">'
          + '<i class="mui-icon mui-icon-arrowright"></i>'
          + '</div>'
          + '</div>'
          + '<div class="item-right-middle">'
          + '<h5>录入状态：' + statusobj[item.status].name + '</h5>'
          + '</div></div></div></div></li>'

      }

      $('#OA_task_2').html(html)
    },
    pickDownCheck: function (res, statusobj) {
      var html = '';
      for (let i = 0; i < res.length; i++) {
        const item = res[i];
        html += '<li class="mui-table-view-cell" data-id="' + item.id + '">'
          + '<div class="mui-slider-right mui-disabled">'
          + '<a class="mui-btn mui-btn-red delete">删除</a>'
          + '</div>'
          + '<div class="mui-slider-handle ' + statusobj[item.status].nextClass + '">'
          + '<div class="list-item">'
          + '<div class="item-left">'
          + '<img src="../img/common/icon_app.png" />'
          + '</div>'
          + '<div class="item-right">'
          + '<div class="item-right-top">'
          + '<div class="number">'
          + '<h4>' + item.vSn + '</h4>'
          + '<p>' + (item.vCarSn ? item.vCarSn : '未填写') + '</p>'
          + '</div>'
          + '<div class="mui-btn mui-btn-blue mui-btn-outlined">去还车'
          + '<i class="mui-icon mui-icon-arrowright"></i>'
          + '</div>'
          + '</div>'
          + '<div class="item-right-middle">'
          + '<h5>录入状态：' + statusobj[item.status].name + '</h5>'
          + '</div></div></div></div></li>'

      }

      $('#OA_task_3').html(html)
    }
  }

})(mui)
