(function (mui, doc) {
  var curPage = 1;  //当前页码初始化数0开始
  var totalPage = 0; //后台算出总页数
  var H = null;
  var self = null;
  var vSn = null;

  mui.init({
    pullRefresh: {
      container: "#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down: {
        auto: true,//可选,默认false.首次加载自动下拉刷新一次
        callback: pulldownRwfresh //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
      },
      up: {
        auto: true,
        callback: pullupRefresh
      }
    }
  });

  mui('.mui-scroll-wrapper').scroll();


  mui.plusReady(function () {
    self = plus.webview.currentWebview();
    H = self.H;
    // addEvent();
  });



  // 下拉刷新业务
  function pulldownRwfresh() {
    // getData()
    setTimeout(function () {

      mui('#refreshContainer').pullRefresh().endPulldownToRefresh(); //refresh completed
      mui('#refreshContainer').pullRefresh().refresh(true); //激活上拉加载
    }, 1000)
  }

  // 上拉加载业务
  function pullupRefresh() {
    // getData();
    // curPage++;
    if (curPage > totalPage) {
      mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
    } else {
      // getData()
    }
    setTimeout(function () {
      mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
    }, 1000)
  }
  // 获取数据
  function getData(page) {
    // console.log(curPage)
    var data = null;
    app.pageQuery({
      page: curPage,
      size: 5
    }, function (res) {
      // console.log(res)
      res = JSON.parse(res);
      if (!res.totalCount || res.totalCount <= 0) {
        return;
      }
      // console.log(res.totalCount)
      curPage++;
      totalPage = Math.ceil(res.totalCount / 5)
      var data = res.pageData;

      updateView(data);

    });
  }

  function updateView(data) {
    var html = '';

    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      html += '<li class="mui-table-view-cell" data-id="' + item.id + '">'
        + '<div class="mui-slider-right mui-disabled">'
        + '<a class="mui-btn mui-btn-red delete" >删除</a>'
        + '</div>'
        + '<div class="mui-slider-handle" data-vSn="' + item.vSn + '">'
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

    $('#OA_task_1').append($(html))
  }

  //添加事件
  function addEvent() {
    //查看临牌信息
    $('#OA_task_1').on('tap', '.mui-slider-handle', function () {
      //打开接车点检页面
      mui.openWindow({
        url: 'vehicle-license-info.html',
        id: 'vehicle-license-info', //默认使用当前页面的url作为id
        styles: {
          top: '0px',
          bottom: H
        }, //窗口参数
        extras: {
          H: H,
          vSn: $(this).attr('data-vSn')
        } //自定义扩展参数
      })
    });

    // 临牌录入
    $('#license-input').on('tap', function() {
      //打开接车点检页面
      mui.openWindow({
        url: 'vehicle-license-apply.html',
        id: 'vehicle-license-apply', //默认使用当前页面的url作为id
        styles: {
          top: '0px',
          bottom: H
        }, //窗口参数
        extras: {
          H: H,
          vSn: vSn
        } //自定义扩展参数
      })
    })
  }
  addEvent();


})(mui, document);