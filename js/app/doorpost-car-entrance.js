(function () {
  var curPage = 0;  //当前页码初始化数0开始
  var totalPage = 1; //后台算出总页数
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
  // 

  mui.plusReady(function () {
    addEvent()
  });

  // 下拉刷新业务
  function pulldownRwfresh() {

    if (curPage > totalPage) {
      mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
    } else {
      getData()
    }
    setTimeout(function () {
      mui('#refreshContainer').pullRefresh().endPulldownToRefresh(); //refresh completed
      // mui('#refreshContainer').pullRefresh().refresh(true); //激活上拉加载
    }, 1000)
  }

  // 上拉加载业务
  function pullupRefresh() {
    setTimeout(function () {
      mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
    }, 1000)
  }

  // 获取数据
  function getData() {
    app.carInAndOutAll({}, function (res) {
      res = JSON.parse(res)
      console.log(res)
      if (!res.total) {
        return;
      }
      totalPage = Math.ceil(res.total / 5)
      updateView(res.rows);
    })
  }

  // 视图更新
  function updateView(data) {
    var html = '';
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      html += '<li class="mui-table-view-cell">'
        + '<div class="mui-slider-right mui-disabled">'
        + '<a class="mui-btn mui-btn-gray settop">通过</a>'
        + '<a class="mui-btn mui-btn-red delete">拒绝</a>'
        + '</div>'
        + '<div class="mui-slider-handle">'
        + '<div class="list-item">'
        + '<div class="item-left">'
        + '<img src="../img/common/icon_app.png" />'
        + '</div>'
        + '<div class="item-right">'
        + '<div class="item-right-top">'
        + '<div class="number">'
        + '<h4>2018-0591</h4>'
        + '<p>陕A6509B</p>'
        + '</div>'
        + '<div class="mui-btn mui-btn-blue mui-btn-outlined goback">'
        + '<span>未处理</span>'
        + '<!-- <i class="mui-icon mui-icon-arrowright"></i> -->'
        + '</div>'
        + '</div>'
        + '<div class="item-right-middle">'
        + '<p><span>驾驶员</span>：张三</p>'
        + '<p><span>牌照有效期</span>：2019-01-01</p>'
        + '<p><span>处理状态</span>：未处理</p>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '</li>'
    }
    $('#OA_task_1').append(html);
  }

  function addEvent() {
    // 取消授权操作
    $('#OA_task_1').on('tap', '.settop', function () {
      mui.toast('这里要添加取消授权业务')
    })
    $('#OA_task_1').on('tap', '.delete', function () {
      mui.toast('这里要添加删除列表业务')
    })
  }

})()