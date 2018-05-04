(function() {
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
  if (mui.os.plus) {
    mui.plusReady(function () {
      setTimeout(function () {
        mui('#refreshContainer').pullRefresh().pullupLoading();
      }, 1000);
      addEvent()
    });
  } else {
    mui.ready(function () {
      mui('#refreshContainer').pullRefresh().pullupLoading();
    });
    addEvent()
  }
  // 下拉刷新业务
  function pulldownRwfresh() {
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
    var data = null;
    return data
  }
  function addEvent() {
    // 取消授权操作
    $('#OA_task_1').on('tap', '.settop', function() {
      mui.toast('这里要添加取消授权业务')
    })
    $('#OA_task_1').on('tap', '.delete', function() {
      mui.toast('这里要添加删除列表业务')
    })
  }
})()