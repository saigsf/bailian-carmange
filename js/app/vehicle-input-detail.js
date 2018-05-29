;
(function(mui, doc) {
  mui.init({
    gestureConfig:{
      doubletap: true, //默认为false
      longtap: true, //默认为false
     }
  });

  //初始化单页view
  var viewApi = mui('#app').view({
    defaultPage: '#zero'
  });

  //重写后退
  var oldBack = mui.back;
  mui.back = function() {
    if(viewApi.canBack()) {
      viewApi.back();
    } else {
      oldBack();
    }
  };

  //初始化单页的区域滚动
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  });

  // 定义全局变量
  var H = null; // 页面高度
  // 页面id zero 为默认页面
  var pageIdArr = ['zero', 'one', 'two', 'three', 'four', 'five', 'six']; 
  // 模块id vehicle-input-detail为默认模块id
  var moduleIdArr = ['vehicle-input-detail', 'vehicle-input', 'vehicle-input-detail', 'vehicle-input-detail', 'vehicle-input-detail', 'vehicle-input-detail']
  // 保存按钮
  var saveBtnArr = ['one_next','two_next','three_next','four_next','five_next','six_next']

  mui.plusReady(function() {
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
    if(plus.device.model === 'iPhoneX') {
      // 页面样式重置
      $('header').css({
        'height': '88px',
        'paddingTop': '40px'
      });
      $('.mui-bar-nav').css({
        'height': '88px',
        'paddingTop': '40px'
      });
      $('.mui-pages').css('top', '88px')
    }

    // 更改状态栏颜色
    // plus.navigator.setStatusBarStyle("light");
    // 弹出软键盘时自动改变webview的高度
    // plus.webview.currentWebview().setStyle({
    //   softinputMode: "adjustResize"
    // });

  }

  // 页面点击事件
  function addEvents() {
    // 查看详情
    $('#detail').on('tap', function() {
      mui.openWindow({
        url: 'vehicle-detail.html',
        id: 'vehicle-detail', //默认使用当前页面的url作为id
        styles: {
          top: '0px',
          bottom: H
        }, //窗口参数
        extras: {
          H: H
        } //自定义扩展参数
      });

      
    })

    // 添加说明
    $('#app').on('tap', '.explain', function() {
      var _this = this;
      var explainText = $(_this).parents('tr').find('.explain-text').val();
      mui.openWindow({
        url: 'vehicle-check-add-explain.html',
        id: 'vehicle-check-add-explain', //默认使用当前页面的url作为id
        styles: {
          top: '0px',
          bottom: H
        }, //窗口参数
        extras: {
          H: H,
          status: 'explain',
          explainText: explainText
        } //自定义扩展参数
      })

      window.submitDataListener('updateExplain', (evt) => {
        var explainText = evt.detail.explainText;
        //do something
        $(_this).parents('tr').find('.explain-text').val(explainText)
      });
    })
    

    // 添加解决方法
    $('#app').on('tap', '.resolvent', function() {
      var _this = this;
      var explainText = $(_this).parents('tr').find('.explain-text').val();
      var resolventText = $(_this).parents('tr').find('.resolvent-text').val();

      mui.openWindow({
        url: 'vehicle-check-add-explain.html',
        id: 'vehicle-check-add-explain', //默认使用当前页面的url作为id
        styles: {
          top: '0px',
          bottom: H
        }, //窗口参数
        extras: {
          H: H,
          status: 'resolvent',
          explainText: explainText,
          resolventText: resolventText
        } //自定义扩展参数
      })
      window.submitDataListener('updateResolvent', (evt) => {
        var resolventText = evt.detail.resolventText;
        //do something
        $(_this).parents('tr').find('.resolvent-text').val(resolventText)
      });
    })
    // 手势操作——长按
    $('#one').on('longtap', '.tab-col input', function() {
      mui.toast($(this).val())
    })
  }

  // 数据交互
  var fetchData = {

  }

  // 页面更新
  var updateView = {
    
  }

})(mui, document)