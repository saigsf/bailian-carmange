(function () {
  var curPage = 0;  //当前页码初始化数0开始
  var totalPage = 10; //后台算出总页数
  // 下拉刷新
  var pulldownRwfresh = function () {
    curPage = 1;//当前页码数
    setTimeout(function () {
      var table = document.body.querySelector('.mui-table-view');
      var data = getPageData(curPage);
      if (data != null) {
        table.innerHTML = data;
      }
      mui('#refreshContainer').pullRefresh().endPulldownToRefresh(); //refresh completed
      mui('#refreshContainer').pullRefresh().refresh(true); //激活上拉加载
    }, 1500);
  }
  // 上拉加载
  var pullupRefresh = function () {
    setTimeout(function () {
      //判断当前页是否大于总页数
      mui('#refreshContainer').pullRefresh().endPullupToRefresh((curPage > totalPage)); //参数为true代表没有更多数据了。
      if (typeof (totalPage) == 'undefined' || totalPage <= 1 || curPage == totalPage) {
        mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
      } else {
        curPage = curPage + 1;
        if (curPage > totalPage) {
          mui('#refreshContainer').pullRefresh().enablePullupToRefresh(true);
        } else {
          var data = getPageData(curPage);
          if (data != null) {
            var table = $(".mui-table-view");
            table.append(data);
          }
          mui('#refreshContainer').pullRefresh().enablePullupToRefresh();
          if (curPage == totalPage) {//当前页加载数据之后判断是不是还有下一页  没有的话底部显示没有更多数据
            mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
          }
        }
      }
    }, 1500);
  }
  mui.init({
    pullRefresh: {
      container: "#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down: {
        auto: true,//可选,默认false.首次加载自动下拉刷新一次
        contentdown: "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
        contentover: "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
        contentrefresh: "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
        callback: pulldownRwfresh //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
      },
      up: {
        auto: true,
        callback: pullupRefresh
      }
    }
  });

  if (mui.os.plus) {
    mui.plusReady(function () {
      setTimeout(function () {
        mui('#refreshContainer').pullRefresh().pullupLoading();
      }, 1000);

    });
  } else {
    mui.ready(function () {
      mui('#refreshContainer').pullRefresh().pullupLoading();
    });
  }

  /**
    * 获取数据
    */
  function getPageData(page) {
    var data = null;
    // mui.ajax("/wapp/vip/hits.html",{
    //     data:{'page':page},
    //     dataType:'json',
    //     type:"post",
    //     async:false,
    //     success:function(d){
    //         data=d;
    //     }
    // });
    return data;
  }
})()