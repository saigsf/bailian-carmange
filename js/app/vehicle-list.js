(function (mui, doc) {

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
    plus.webview.currentWebview().setStyle({
      softinputMode: "adjustResize" // 弹出软键盘时自动改变webview的高度
    });
    
    addEvent();
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
  // 获取数据
  function getData() {
    var data = null;
    app.pageQuery({
      page: 1,
      size: 10
    }, function (res) {
      res =JSON.parse(res);
      if(!res.totalCount || res.totalCount <= 0) {
        return;
      }
      
      var data = res.pageData;
      var html = '';
      // mui.toast('车辆列表获取成功!');
      // console.log(res.totalCount);

      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        html += '<li class="mui-table-view-cell">'
          + '<div class="mui-slider-right mui-disabled">'
          + '<a class="mui-btn mui-btn-red delete">删除</a>'
          + '</div>'
          + '<div class="mui-slider-handle" data-vSn="'+item.vSn+'">'
          + '<div class="list-item">'
          + '<div class="item-left">'
          + '<img src="../img/common/icon_app.png" />'
          + '</div>'
          + '<div class="item-right">'
          + '<div class="item-right-top">'
          + '<div class="number">'
          + '<h4>'+item.vSn+'</h4>'
          + '<p>陕A6509B</p>'
          + '</div>'
          + '<div class="mui-btn mui-btn-blue mui-btn-outlined goback">去还车'
          + '<i class="mui-icon mui-icon-arrowright"></i>'
          + '</div>'
          + '</div>'
          + '<div class="item-right-bottom">'
          + '<div class="bottom-item">'
          + '<span>安全检查：张三</span>'
          + '<span>2018-02-22</span>'
          + '</div>'
          + '<div class="bottom-item bottom-item-empty"></div>'
          + '<div class="bottom-item">'
          + '<span>安全检查：张三</span>'
          + '<span>2018-02-22</span>'
          + '</div>'
          + '<div class="bottom-item bottom-item-empty"></div>'
          + '<div class="bottom-item">'
          + '<span>审核：张三</span>'
          + '<span>2018-02-22</span>'
          + '</div></div></div></div></div></li>';
      }

      $('#OA_task_1').html(html)

    });
    return data
  }

  //添加事件
  function addEvent() {
    var self = plus.webview.currentWebview();
    var H = self.H;
    //查看车辆信息
    $('#OA_task_1').on('tap', '.mui-slider-handle', function (e) {
      e.stopPropagation();
      // 需要传递参数vSn
      //打开接车点检页面
      mui.openWindow({
        url: 'vehicle-info.html',
        id: 'vehicle-info', //默认使用当前页面的url作为id
        styles: {
          top: '0px',
          bottom: H
        }, //窗口参数
        extras: {
          H: H,
          vSn: $(this).attr('data-vSn')
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
    $('#OA_task_1').on('tap', '.goback', function (e) {
      e.stopPropagation();

      //打开页面
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
  }

})(mui, document);