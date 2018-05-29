(function () {
  var curPage = 1;  //当前页码初始化数0开始
  var totalPage = 1; //后台算出总页数
  var H = null;
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
    
  // 下拉刷新业务
  function pulldownRwfresh() {
    curPage = 1;
    getData()
    setTimeout(function () {
      mui('#refreshContainer').pullRefresh().endPulldownToRefresh(); //refresh completed
      // mui('#refreshContainer').pullRefresh().refresh(true); //激活上拉加载
    }, 1000)
  }

  // 上拉加载业务
  function pullupRefresh() {
    curPage++
    if(curPage < totalPage) {
      getData();
    }

    setTimeout(function () {
      mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
    }, 1000)
  }
  // 
  mui.plusReady(function () {
    var self = plus.webview.currentWebview();
    H = self.H;
    addEvent()
  });


  // 获取数据
  function getData() {
    var data = null;
    app.carDriverList({
      page: curPage,
      size: 5
    }, function (res) {
      console.log(JSON.stringify(res))
      mui.toast(res.msg)
      if (res.total && res.total > 0) {
        totalPage = Math.ceil(res.total / 5)
        updateView(res.rows)
      }
    })
  }

  // 更新视图
  function updateView(data) {
    var html = '';
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      html += '<li class="mui-table-view-cell" data-id="' + item.id + '">'
        + '<div class="mui-slider-right mui-disabled">'
        + '<a class="mui-btn mui-btn-gray authorize" data-isallow="' + item.isallow + '">' + (item.isallow == '禁止'? '授权' : '禁止') + '</a>'
        + '<a class="mui-btn mui-btn-red delete">删除</a>'
        + '</div>'
        + '<div class="mui-slider-handle">'
        + '<div class="list-item">'
        + '<div class="item-left"><img src="../img/common/icon_app.png" /></div>'
        + '<div class="item-right">'
        + '<div class="item-right-top">'
        + '<div class="number">'
        + '<h4>'
        + '<span>' + item.name + '</span>'

      if (item.sex == '男') {
        html += '<i class="icon icon-man"></i>'
      } else if (item.sex == '女') {
        html += '<i class="icon icon-woman"></i>'
      }

      html += '</h4>'
        + '<p>' + item.iccard + '</p>'
        + '</div>'
        + '<div class="mui-btn mui-btn-blue mui-btn-outlined goback">'
        + '<!-- <span>未处理</span> -->'
        + '<i class="mui-icon mui-icon-arrowright"></i>'
        + '</div>'
        + '</div>'
        + '<div class="item-right-middle">'
        + '<p><span>授权状态</span>：' + item.isallow + '</p>'
        + '<p><span>授权开始</span>：' + (item.allowStartTime ? item.allowStartTime : '') + '</p>'
        + '<p><span>授权截至</span>：' + (item.allowEndTime ? item.allowEndTime : '') + '</p>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '</li>';
    }
    $('#OA_task_1').append($(html));
  }

  function addEvent() {

    // 授权/取消授权业务
    $('#OA_task_1').on('tap', '.authorize', function () {
      var $li = $(this).parents('li')
      // mui.toast('这里要添加授权业务');
      if ($(this).attr('data-isallow') == '禁止') {
        app.authorized({
          ids: $li.attr('data-id')
        }, function (res) {
          console.log(res)
          res = JSON.parse(res)
          if(res.ret) {
            plus.webview.currentWebview().reload()
          } else {
            mui.toast('授权失败')
          }
        })
      } else {
        app.cancelAuthorized({
          ids: $li.attr('data-id')
        }, function (res) {
          console.log(res);
          res = JSON.parse(res)
          if(res.ret) {
            plus.webview.currentWebview().reload()
          } else {
            mui.toast('禁止失败')
          }
        })
      }
    })

    // 删除业务
    $('#OA_task_1').on('tap', '.delete', function () {
      var $li = $(this).parents('li')
      console.log($li.attr('data-id'))
      // mui.toast('这里要添加删除业务')
      app.carDriverDelete({
        ids: $li.attr('data-id')
      }, function(res) {
        console.log(JSON.stringify(res))
        // res = JSON.parse(res);
          if(res.ret) {
            $li.remove();
            mui.toast('删除成功')
          } else {
            mui.toast('删除失败')
          }
      })
    })
    // 添加驾驶员
    $('#add').on('tap', function () {
      mui.openWindow({
        url: 'doorpost-driver-input.html',
        id: 'doorpost-driver-input', //默认使用当前页面的url作为id
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

    // 查看驾驶员信息
    $('#OA_task_1').on('tap', '.mui-slider-handle', function () {
      var $li = $(this).parent('li');
      mui.openWindow({
        url: 'doorpost-driver-info.html',
        id: 'doorpost-driver-info', //默认使用当前页面的url作为id
        styles: {
          top: '0px',
          bottom: H
        }, //窗口参数
        extras: {
          H: H,
          ids: $li.attr('data-id')
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