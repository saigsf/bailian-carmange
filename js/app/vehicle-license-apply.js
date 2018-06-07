(function () {
  var curPage = 1; //当前页码初始化数0开始
  var totalPage = 1; //后台算出总页数
  var H = null;
  var allCheckFlag = false;

  mui.init({
    pullRefresh: {
      container: "#refreshContainer", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down: {
        auto: true, //可选,默认false.首次加载自动下拉刷新一次
        callback: pulldownRwfresh //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
      },
      up: {
        callback: pullupRefresh
      }
    },
    gestureConfig: {
      // doubletap: true, //默认为false
      longtap: true, //默认为false
    }
  });

  // 下拉刷新业务
  function pulldownRwfresh() {
    // curPage = 1;
    // $('#OA_task_1').html('')
    getData();
    setTimeout(function () {
      mui('#refreshContainer').pullRefresh().endPulldownToRefresh(); //refresh completed
      mui('#refreshContainer').pullRefresh().refresh(true); //激活上拉加载
    }, 1000)
  }

  // 上拉加载业务
  function pullupRefresh() {
    if (curPage > totalPage) {
      mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
    } else {
      getData()
    }

    setTimeout(function () {
      mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
    }, 1000)
  }
  // 
  mui.plusReady(function () {
    handsetAdaption()
    var self = plus.webview.currentWebview();
    H = self.H;
    addEvent()
  });
  // 手机适配方法
  function handsetAdaption() {
    // 更改顶部导航栏高度
    if (plus.device.model === 'iPhoneX') {
      // 页面样式重置
      $('header').css({
        'height': '88px',
        'paddingTop': '40px'
      });
      $('.mui-bar-nav~.mui-content').css({
        'paddingTop': '88px'
      })
      $('.mui-pull-top-pocket').css({
        'top': '88px'
      })
    }

    // 更改状态栏颜色
    // plus.navigator.setStatusBarStyle("light");
    // 弹出软键盘时自动改变webview的高度
    plus.webview.currentWebview().setStyle({
      softinputMode: "adjustResize"
    });

  }

  // 获取数据
  function getData() {

  }

  // 更新视图
  function updateView(data) {
    var html = '';
  }

  function addEvent() {


  }


  // 全选
  $('#allcheck').on('change', function () {
    console.log($(this).prop('checked'))
    var $li = $('#OA_task_1').find('input');

    if ($(this).prop('checked')) {
      $li.prop('checked', true);
    } else {
      $li.prop('checked', false);
    }
  })

  // 单选
  $('#OA_task_1').on('change', '.checkbox-wrapper input', function (e) {
    e.stopPropagation();

    var $li = $('#OA_task_1').find('input');
    var flag = $(this).prop('checked');
    // $(this).find('input').prop('checked', flag);

    if (!flag) {
      $('#allcheck').prop('checked', false);
    } else {
      $li.each(function (i) {
        if (!$(this).prop('checked')) {
          allCheckFlag = true;
        }
      });
      console.log(allCheckFlag)
      if (allCheckFlag) {
        allCheckFlag = false;
        $('#allcheck').prop('checked', false);
      } else {
        allCheckFlag = true;
        $('#allcheck').prop('checked', true);
      }
    }
  })

  // 申请
  $('#apply').on('tap', function () {
    var $li = $('#OA_task_1').find('input');
    var ids = [];
    $li.each(function (i) {
      var id = null;
      if ($(this).prop('checked')) {
        id = $(this).parents('li').attr('data-vSn');
        ids.push(id);
      }
    });

    if (ids.length == 0) {
      mui.toast('请至少选择一辆车')
      return;
    }

    // mui.openWindow({
    //   url: 'vehicle-insurance-apply-input.html',
    //   id: 'vehicle-insurance-apply-input', //默认使用当前页面的url作为id
    //   styles: {
    //     top: '0px',
    //     bottom: H
    //   }, //窗口参数
    //   extras: {
    //     H: H,
    //     vSns: ids.join()
    //   } //自定义扩展参数
    // })
  })





  // 刷新页面
  document.addEventListener('update', function (e) {
    plus.webview.currentWebview().reload()
  })
})()