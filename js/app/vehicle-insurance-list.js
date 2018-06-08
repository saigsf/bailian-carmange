; (function (mui, doc) {
  // 定义全局变量
  var H = null; // 页面高度
  var allCheckFlag = false; // 页面高度
  var curPage = 1; //当前页码初始化数0开始
  var totalPage = 0; //后台算出总页数

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
  mui('.mui-scroll-wrapper').scroll();

  // 下拉刷新业务
  function pulldownRwfresh() {
    curPage = 1;
    // $('#vehicle_insurance_list').html('')
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


  mui.plusReady(function () {
    // plus准备好后执行H5
    handsetAdaption();
    // 获取当前视图
    var self = plus.webview.currentWebview();
    // 获取传递参数
    H = self.H;
    // 添加点击事件进入下一页
    addEvents();

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
    }

    // 更改状态栏颜色
    // plus.navigator.setStatusBarStyle("light");
    // 弹出软键盘时自动改变webview的高度
    plus.webview.currentWebview().setStyle({
      softinputMode: "adjustResize"
    });

  }

  function getData() {
    // app.insuranceQuery({
    //   page: 1,
    //   size: 5
    // }, function (res) {
    //   res = JSON.parse(res)
    //   console.log(res)
    // })
  }
  getData();

  function updateView() {

  }

  // 页面点击事件
  function addEvents() {
    // 保险申请
    $('#add_btn').on('tap', function () {
      mui.openWindow({
        url: 'vehicle-insurance-apply.html',
        id: 'vehicle-insurance-apply', //默认使用当前页面的url作为id
        styles: {
          top: '0px',
          bottom: H
        }, //窗口参数
        extras: {
          H: H
        } //自定义扩展参数
      })
    })



    // 保险详情
    $('#vehicle_insurance_list').on('tap', '.mui-slider-handle', function () {
      var $li = $(this).parents('li')

      mui.openWindow({
        url: 'vehicle-insurance-info.html',
        id: 'vehicle-insurance-info', //默认使用当前页面的url作为id
        styles: {
          top: '0px',
          bottom: H
        }, //窗口参数
        extras: {
          H: H,
          vSn: $li.attr('data-vSn'),
          hasData: $li.attr('data-status')
        } //自定义扩展参数
      })
    })

    // 长按操作
    // 长按
    document.addEventListener("longtap", function () {
      console.log("长按操作");
      $('#vehicle_insurance_list').addClass('batch');
      $('.top').addClass('batch')
      $('.btn-container').fadeIn()
    });

    // 取消
    $('.top').on('tap', '#canclecheck', canceLongtap);
    function canceLongtap() {
      $('#vehicle_insurance_list').removeClass('batch');
      $('.top').removeClass('batch');
      $('#vehicle_insurance_list').find('input').prop('checked', false);
      $('#allcheck').prop('checked', false);
      $('.btn-container').fadeOut()
    }

    // 全选
    $('#allcheck').on('change', function () {
      var $li = $('#vehicle_insurance_list').find('input');
      var _this = this;

      if ($(this).prop('checked')) {
        $li.prop('checked', true);
      } else {
        $li.prop('checked', false);
      }
    })

    // 单选
    $('#vehicle_insurance_list').on('tap', '.item-checked', function (e) {
      e.stopPropagation();

      var $li = $('#vehicle_insurance_list').find('input');
      var flag = $(this).find('input').prop('checked');

      flag = !flag;
      $(this).find('input').prop('checked', flag);

      if (!flag) {
        $('#allcheck').prop('checked', false);
      } else {
        $li.each(function (i) {
          if (!$(this).prop('checked')) {
            allCheckFlag = true;
          }
        });
        if (allCheckFlag) {
          allCheckFlag = false;
          $('#allcheck').prop('checked', false);
        } else {
          allCheckFlag = true;
          $('#allcheck').prop('checked', true);
        }
      }
    })

  }
  // addEvents()

})(mui, document)
