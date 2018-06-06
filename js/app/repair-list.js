(function () {
  var curPage = 0;  //当前页码初始化数0开始
  var totalPage = 1; //后台算出总页数
  var H = null;
  var vSn = null;
  var status = null;

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
  mui('.mui-scroll-wrapper').scroll();
  mui.plusReady(function () {
    var self = plus.webview.currentWebview();
    H = self.H;
    
  });
  addEvent();
  // 下拉刷新
  function pulldownRwfresh() {
    curPage = 1;
    // $('#OA_task_1').html('')
    getPageData();
    setTimeout(function () {
      mui('#refreshContainer').pullRefresh().endPulldownToRefresh(); //refresh completed
      mui('#refreshContainer').pullRefresh().refresh(true); //激活上拉加载
    }, 1000);
  }
  // 上拉加载
  function pullupRefresh() {

    if (curPage > totalPage) {
      mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
    } else {
      getPageData({
        status: status
      })
    }
    // 
    setTimeout(function () {
      mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
    }, 1000);
  }



  /**
    * 获取数据
    */
  function getPageData(opt) {
    var data = {
      page: curPage,
      size: 5,
    }

    if (opt && opt.status) {
      data.status = opt.status
    }

    if (opt && opt.vSn) {
      data = {
        vSn: opt.vSn
      }
    }
    app.carMaintainQuery(data, function (res) {

      res = JSON.parse(res);
      console.log(res)
      if (res.total) {
        if (res.total == 0) {
          mui.toast('没有数据');
          return;
        }
        curPage++;
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
      // console.log(item.status) 正在维修   已完成   排队中
      html += '<li class="mui-table-view-cell" data-vSn="' + item.vSn + '" data-id="'+item.id+'">'
        + '<div class="mui-slider-right mui-disabled">'
      if (item.status == '已完成') {
        html += '<a class="mui-btn mui-btn-gray settop">置顶</a>'
          + '<a class="mui-btn mui-btn-blue maintain">保养</a>'

      } else if (item.status == '排队中') {
        html += '<a class="mui-btn mui-btn-gray settop">置顶</a>'
          + '<a class="mui-btn mui-btn-red allot">分配</a>'
          + '<a class="mui-btn mui-btn-blue maintain">保养</a>'
      } else if (item.status == '维修中') {
        html += '<a class="mui-btn mui-btn-gray settop">置顶</a>'
          + '<a class="mui-btn mui-btn-red repaired">完成</a>'
          + '<a class="mui-btn mui-btn-blue maintain">保养</a>'
      }

      html += '</div>'
        + '<div class="mui-slider-handle">'
        + '<div class="list-item">'
        + '<div class="item-left">'
        + '<img src="../img/common/icon_app.png" />'
        + '</div>'
        + '<div class="item-right">'
        + '<div class="item-right-top">'
        + '<div class="number">'
        + '<h4>' + item.vSn + '</h4>'
        + '</div>';

      if (item.status == '已完成') {
        html += '<div class="mui-btn mui-btn-outlined finished">'
          + '<span>' + item.status + '</span>'
          + '<i class="mui-icon mui-icon-arrowright"></i>'
          + '</div>'

      } else if (item.status == '排队中') {
        html += '<div class="mui-btn mui-btn-red mui-btn-outlined waiting">'
          + '<span>' + item.status + '</span>'
          + '<i class="mui-icon mui-icon-arrowright"></i>'
          + '</div>'
      } else if (item.status == '维修中') {
        html += '<div class="mui-btn mui-btn-blue mui-btn-outlined repairing">'
          + '<span>' + item.status + '</span>'
          + '<i class="mui-icon mui-icon-arrowright"></i>'
          + '</div>'
      }

      html += '</div>'
        + '<div class="item-right-middle">'
        + '<p>'
        + '<span>维修项目</span>：' + item.item + '</p>'
        + '<p>'
        + '<span>停放地点</span>：' + item.send_park + '</p>'
        + '<p>'
        + '<span>申请人</span>：' + item.applyPeople + '</p>'
        + '<p>'
        + '<span>申请日期</span>：' + item.applytime + '</p>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '</li>';

    }
    $('#OA_task_1').append(html);
  }

  // 添加点击事件，维修员填写工作内容
  function addEvent() {
    // 查看详情 
    $('#OA_task_1').on('tap', '.mui-slider-handle', function () {
      var $li = $(this).parents('li');
      mui.openWindow({
        url: 'repair-info.html',
        id: 'repair-info', //默认使用当前页面的url作为id
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

    // 筛选
    $('#popover').on('tap', 'a', function () {
      status = $(this).html()
      if (status == '全部') {
        status = ''
      }

      mui('.mui-popover').popover('hide');
      curPage = 1;
      $('#OA_task_1').html('')
      getPageData({
        status: status
      })

    })

    // mui('.mui-popover').popover('show', document.getElementById("openPopover"));


    // 置顶
    $('#OA_task_1').on('tap', '.settop', function () {
      var elem = this;
      var $li = $(this).parents('li');
      var id = $li.attr('data-id')

      console.log(id)
      app.carMaintainTop({
        id: id
      }, function (res) {
        res = JSON.parse(res);
        console.log(res);
        if (res.ret) {
          mui.toast(res.msg)
          $('#OA_task_1').prepend($li.remove());
          setTimeout(function () {
            mui.swipeoutClose($li[0]);
          }, 0);
        }
        mui.toast(res.msg)
      })
    })

    // 分配
    $('#OA_task_1').on('tap', '.allot', function () {
      var $li = $(this).parents('li');
      var _this = this;

      setTimeout(function () {
        mui.swipeoutClose($li[0]);
      }, 0);

      mui.openWindow({
        url: 'repair-allot.html',
        id: 'repair-allot', //默认使用当前页面的url作为id
        styles: {
          top: '0px',
          bottom: H
        }, //窗口参数
        extras: {
          H: H,
          vSn: $li.attr('data-vSn'),
        } //自定义扩展参数

      })
    })
    // 完成
    $('#OA_task_1').on('tap', '.repaired', function () {
      var $li = $(this).parents('li');
      var _this = this;

      setTimeout(function () {
        mui.swipeoutClose($li[0]);
      }, 0);

      mui.openWindow({
        url: 'repair-content.html',
        id: 'repair-content', //默认使用当前页面的url作为id
        styles: {
          top: '0px',
          bottom: H
        }, //窗口参数
        extras: {
          H: H,
          vSn: $li.attr('data-vSn')
        } //自定义扩展参数
      })
    })

    var form = document.getElementsByTagName('form')[0];

    form.onsubmit = function (e) {
      e.preventDefault();// 取消默认事件
    }

    // 搜索
    $('#current_input').off().on('keyup', function (e) {
      e.preventDefault();
      if (e.keyCode == 13) {
        $('#OA_task_1').html('')
        getPageData({
          vSn: $(this).val()
        })
      }


    })

    // 保养
    $('#OA_task_1').on('tap', '.maintain', function (e) {

      var $li = $(this).parents('li');
      var _this = this;

      setTimeout(function () {
        mui.swipeoutClose($li[0]);
      }, 0);

      mui.openWindow({
        url: 'repair-maintain.html',
        id: 'repair-maintain', //默认使用当前页面的url作为id
        styles: {
          top: '0px',
          bottom: H
        }, //窗口参数
        extras: {
          H: H,
          vSn: $li.attr('data-vSn')
        } //自定义扩展参数

      })
    })



  }

  // 返回刷新
  document.addEventListener('update', function (e) {
    plus.webview.currentWebview().reload();
  })

})()
