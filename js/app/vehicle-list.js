(function (mui, doc) {
  var curPage = 1;  //当前页码初始化数0开始
  var totalPage = 0; //后台算出总页数
  var H = null;
  var filter = '20px';
  var self = null;
  var main = null;
  var side = null;
  var view = null;
  var showMenu = false;
  var isInTransition = false;


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
    },
    gestureConfig: {
      // doubletap: true, //默认为false
      longtap: true, //默认为false
    }
  });

  mui('.mui-scroll-wrapper').scroll();


  mui.plusReady(function () {
    handsetAdaption()

    self = plus.webview.currentWebview();
    main = plus.webview.getWebviewById("HBuilder");
    view = plus.webview.getWebviewById('html/vehicle.html')
    H = self.H;

    main.addEventListener('maskClick', closeMenu);

    addEvent();
  });

  function handsetAdaption() {
    if (plus.device.model === 'iPhoneX') {
      //页面样式重置
      filter = '34px'
    }
    plus.webview.currentWebview().setStyle({
      softinputMode: "adjustResize" // 弹出软键盘时自动改变webview的高度
    });
  }

  // 下拉刷新业务
  function pulldownRwfresh() {
    curPage = 1;
    // $('#OA_task_1').html('')
    getData()
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
  function getData() {
    // console.log(curPage)
    var data = null;
    // app.pageQuery({
    //   page: curPage,
    //   size: 5
    // }, function (res) {
    //   // console.log(res)
    //   res = JSON.parse(res);
    //   if (!res.totalCount || res.totalCount <= 0) {
    //     return;
    //   }
    //   // console.log(res.totalCount)
    //   curPage++;
    //   totalPage = Math.ceil(res.totalCount / 5)
    //   var data = res.pageData;

    //   updateView(data);

    // });
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
    //查看车辆信息
    $('#OA_task_1').on('tap', '.mui-slider-handle', function () {
      //打开接车点检页面
      mui.openWindow({
        url: 'vehicle-list-info.html',
        id: 'vehicle-list-info', //默认使用当前页面的url作为id
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

    // 车辆删除
    $('#OA_task_1').on('tap', '.delete', function (event) {
      var elem = this;
      var $li = $(this).parents('li');
      mui.confirm('确认删除该条记录？', '提示', btnArray, function (e) {
        if (e.index == 0) {
          $li.remove();
          app.delete({
            ids: $li.attr('data-id')
          }, function (res) {
            console.log(res)
          })
        } else {
          setTimeout(function () {
            mui.swipeoutClose(li);
          }, 0);
        }
      });
    });
    var btnArray = ['确认', '取消'];

    $('#add_btn').on('tap', function () {
      mui.fire(view, 'checkup', {
        domId: 'vehicle-check-up'
      })
    })

    // 长按操作
    // 长按
    document.addEventListener("longtap", function () {
      console.log("长按操作");
      $('#OA_task_1').addClass('batch');
      $('.top').addClass('batch')
      $('.btn-container').fadeIn()
    });

    // 取消
    $('.top').on('tap', '#canclecheck', canceLongtap);
    function canceLongtap() {
      $('#OA_task_1').removeClass('batch');
      $('.top').removeClass('batch');
      $('#OA_task_1').find('input').prop('checked', false);
      $('#allcheck').prop('checked', false);
      $('.btn-container').fadeOut()
    }

    // 全选
    $('#allcheck').on('change', function () {
      var $li = $('#OA_task_1').find('input');
      var _this = this;

      if ($(this).prop('checked')) {
        $li.prop('checked', true);
      } else {
        $li.prop('checked', false);
      }
    })

    // 单选
    $('#OA_task_1').on('tap', '.item-checked', function (e) {
      e.stopPropagation();

      var $li = $('#OA_task_1').find('input');
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
  addEvent()

  //打开侧滑窗口；
  function openMenu() {

    main.setStyle({
      mask: 'rgba(0,0,0,0.5)'
    }); //menu设置透明遮罩防止点击

    mui.openWindow({
      url: 'vehicle-filter.html',
      id: 'vehicle-filter', //默认使用当前页面的url作为id
      styles: {
        top: filter,
        bottom: '0',
        left: '30%',
        width: '70%',
        zindex: 999
      }, //窗口参数
      extras: {
        H: H
      }, //自定义扩展参数
      waiting: {
        autoShow: false, //自动显示等待框，默认为true
        title: '正在加载...', //等待对话框上显示的提示内容
      }
    })
  };
  //关闭侧滑窗口；
  function closeMenu() {
    //关闭遮罩；
    side = plus.webview.getWebviewById("vehicle-filter");
    main.setStyle({
      mask: 'none'
    });
    mui.fire(side, 'close', {})

  };

  //点击头部菜单小图标，打开侧滑菜单；
  $('#filter').on('tap', function (e) {
    e.stopPropagation();
    openMenu()
  });
  //menu页面点击后关闭菜单；
  window.addEventListener('closeMenu', closeMenu)





})(mui, document);