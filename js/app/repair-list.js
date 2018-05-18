(function () {
  var curPage = 0;  //当前页码初始化数0开始
  var totalPage = 1; //后台算出总页数
  // 下拉刷新
  var pulldownRwfresh = function () {
    getPageData(1)
    setTimeout(function () {

      mui('#refreshContainer').pullRefresh().endPulldownToRefresh(); //refresh completed
      // mui('#refreshContainer').pullRefresh().refresh(true); //激活上拉加载
    }, 1000);
  }
  // 上拉加载
  var pullupRefresh = function () {
    curPage++;
    if (curPage > totalPage) {
      mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
    } else {
      getPageData(curPage)
    }
    // 
    setTimeout(function () {
      mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
    }, 1000);
  }
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

  if (mui.os.plus) {
    mui.plusReady(function () {
      // setTimeout(function () {
      //   mui('#refreshContainer').pullRefresh().pullupLoading();
      // }, 1000);
      // console.log(H)
      addEvent();

    });
  } else {
    mui.ready(function () {
      // mui('#refreshContainer').pullRefresh().pullupLoading();
      addEvent();
    });
  }

  /**
    * 获取数据
    */
  function getPageData(page) {
    var data = null;
    var name = app.getState().account;

    if (!name) {
      return;
    }

    app.pageQueryCarMaintain({
      page: page,
      size: 5
    }, function (res) {
      // console.log(res)0
      data = JSON.parse(res);
      if (data.total && data.total > 0) {
        totalPage = Math.ceil(data.total / 5)
        updateView(data.rows)
      }
    })
    // return data;
  }

  // 更新视图
  function updateView(data) {
    var html = '';
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      console.log(item.status)
      html += '<li class="mui-table-view-cell" data-id="' + item.id + '">'
        + '<div class="mui-slider-right mui-disabled">'
        + '<a class="mui-btn mui-btn-gray settop">置顶</a>'
        + '<a class="mui-btn mui-btn-red delete">删除</a>'
        + '</div>'
        + '<div class="mui-slider-handle" data-vSn="' + item.carMaintainApply.vSn + '">'
        + '<div class="list-item">'
        + '<div class="item-left">'
        + '<img src="../img/common/icon_app.png" />'
        + '</div>'
        + '<div class="item-right">'
        + '<div class="item-right-top">'
        + '<div class="number">'
        + '<h4>' + item.carMaintainApply.vSn + '</h4>'
        + '<p>' + (item.carMaintainApply.vCarSn ? item.carMaintainApply.vCarSn : '未填写') + '</p>'
        + '</div>'

      if (item.status == 1) {
        html += '<div class="mui-btn mui-btn-blue mui-btn-outlined repairing">'
          + '<span>排队中</span>'
      } else if (item.status == 2) {
        html += '<div class="mui-btn mui-btn-blue mui-btn-outlined repairing">'
          + '<span>维修中</span>'
      } else if (item.status == 4) {
        html += '<div class="mui-btn mui-btn-blue mui-btn-outlined finished">'
          + '<span>已完成</span>'
      } else {
        html += '<div class="mui-btn mui-btn-blue mui-btn-outlined">'
      }

      html += '<i class="mui-icon mui-icon-arrowright"></i>'
        + '</div>'
        + '</div>'
        + '<div class="item-right-middle">'
        + '<p><span>维修项目</span>：' + item.carMaintainApply.reason + '</p>'
        + '<p><span>停放地点</span>：' + item.carMaintainApply.send_park + '</p>'
        + '<p><span>送修人</span>：' + item.carMaintainApply.sendPeople + '</p>'
        + '<p><span>备注</span>：' + (item.carMaintainApply.send_remark ? item.carMaintainApply.send_remark : '无') + '</p>'
        + '<p><span>送修日期</span>：' + item.carMaintainApply.send_time + '<span>截止日期</span>：' + item.carMaintainApply.appointedtime + '</p>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '</li>'

    }
    $('#OA_task_1').html(html);
  }

  // 添加点击事件，维修员填写工作内容
  function addEvent() {
    var self = plus.webview.currentWebview();
    var H = self.H;
    $('#OA_task_1').on('tap', '.repairing', function () {
      mui.openWindow({
        url: 'repair-repairman.html',
        id: 'repair-repairman', //默认使用当前页面的url作为id
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

    // 置顶
    $('#OA_task_1').on('tap', '.settop', function () {
      var elem = this;
      var $li = $(this).parents('li');

      app.carMaintainTop({
        infoid: $li.attr('data-id')
      }, function (res) {
        console.log(res);
        res = JSON.parse(res);
        if(res.ret) {
          mui.toast(res.msg)
          $('#OA_task_1').prepend($li.remove());
          setTimeout(function () {
            mui.swipeoutClose($li[0]);
          }, 0);
        } else {
          mui.toast(res.msg)
        }
      })
    })

    // 删除
    $('#OA_task_1').on('tap', '.delete', function () {
      var btnArray = ['确认', '取消'];
      var elem = this;
      var $li = $(this).parents('li');
      mui.confirm('您确定要删除这条信息吗？', '确认信息', btnArray, function (e) {

        if (e.index == 0) {
          // 确认删除
          var id = $li.attr('data-id');
          // 后台删除
          app.carMaintainDelete({
            infoid: id
          }, function (res) {
            // console.log(res);
            res = JSON.parse(res);
            if (res.ret) {
              $li.remove();
              mui.toast(res.msg);
            } else {
              mui.toast(res.msg);
            }
          })
        } else {
          // 后悔！取消
          setTimeout(function () {
            mui.swipeoutClose($li[0]);
          }, 0);
        }
      })
    })
  }

})()
