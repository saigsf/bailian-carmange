(function () {
  var curPage = 0;  //当前页码初始化数0开始
  var totalPage = 1; //后台算出总页数
  // 下拉刷新
  var pulldownRwfresh = function () {
    getPageData()
    setTimeout(function () {

      mui('#refreshContainer').pullRefresh().endPulldownToRefresh(); //refresh completed
      // mui('#refreshContainer').pullRefresh().refresh(true); //激活上拉加载
    }, 1000);
  }
  // 上拉加载
  var pullupRefresh = function () {
    getPageData()
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

    app.pageQueryCarMaintain({
      page: 1,
      size: 10
    }, function(res) {
      console.log(res)
    })
    return data;
  }
  getPageData()
  // 添加点击事件，维修员填写工作内容
  function addEvent() {
    var self = plus.webview.currentWebview();
    var H = self.H;
    $('#OA_task_1').on('tap', '.mui-slider-handle', function () {
      mui.openWindow({
        url: 'repair-repairman.html',
        id: 'repair-repairman', //默认使用当前页面的url作为id
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
    });
    
  }


})()