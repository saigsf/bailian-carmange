;
(function (mui, doc) {
  mui.init({
    gestureConfig: {
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
  mui.back = function () {
    if (viewApi.canBack()) {
      viewApi.back();
    } else {
      oldBack();
    }
  };

  //初始化单页的区域滚动
  mui('.mui-scroll-wrapper').scroll();
  var vSn = null;
  var viewId = null;

  // 定义全局变量
  var H = null; // 页面高度
  // 页面id zero 为默认页面
  var pageIdArr = ['zero', 'one', 'two', 'three', 'four', 'five', 'six'];
  // 模块id vehicle-input-detail为默认模块id
  var moduleIdArr = ['vehicle-input-detail', 'vehicle-input', 'vehicle-input-detail', 'vehicle-input-detail', 'vehicle-input-detail', 'vehicle-input-detail']
  // 保存按钮
  var saveBtnArr = ['one_next', 'two_next', 'three_next', 'four_next', 'five_next', 'six_next']

  mui.plusReady(function () {
    // plus准备好后执行H5
    handsetAdaption();
    // 获取当前视图
    var self = plus.webview.currentWebview();
    // 获取传递参数
    H = self.H;
    vSn = self.vSn
    viewId = self.viewId;
    
    
    // 添加点击事件进入下一页

  });

  addEvents();
  // 手机适配方法
  function handsetAdaption() {
    // 更改顶部导航栏高度
    if (plus.device.model === 'iPhoneX') {
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
    $('#detail').on('tap', function () {
      mui.openWindow({
        url: 'vehicle-info.html',
        id: 'vehicle-info', //默认使用当前页面的url作为id
        styles: {
          top: '0px',
          bottom: H
        }, //窗口参数
        extras: {
          H: H
        } //自定义扩展参数
      });
    })

    // 车辆录入,包含三部分的数据提交
    $('#one_submit').on('tap', function () {
      var oneInfo = serialize($('#form_one_info'));
      var oneBom = [];
      var oneToolApply = [];

      var $bomTr = $('#form_one_bom tr');
      var $toolTr = $('#form_one_tool_apply tr');

      $bomTr.each(function (i) {
        var $bomName = $(this).find('input[name=bomName]');
        var $bomnum = $(this).find('input[name=bomnum]');

        if ($bomName.val()) {
          oneBom.push({
            bomName: $bomName.val(),
            bomnum: $bomnum.val(),
            ApplyPerson: '',
            vSn: ''
          })
        }
      })

      $toolTr.each(function (i) {
        var $toolName = $(this).find('input[name=toolName]');

        if ($toolName.val()) {
          oneToolApply.push({
            toolName: $toolName.val(),
            applicant: '',
            vSn: ''
          })
        }
      })
      console.log(oneInfo)
      console.log(oneBom)
      console.log(oneToolApply)

      // app.save(oneInfo, function(res) {
      //   console.log(res)
      // })
      // app.applybom(oneBom, function(res) {
      //   console.log(res)
      // })
      // app.applytools(oneToolApply, function(res) {
      //   console.log(res)
      // })

      // mui.back()
      // 页面返回

    })

    // 安全检查&缸压检查
    $('#app').on('tap', '#two_next', function () {
      // 缸压检查
      var pressure = serialize($('#pressure'));
      pressure.fuel_p = $('#fuel_p').html()
      pressure.vSn = ''
      console.log(pressure)

      // 安全检查
      var $safeTr = $('#app table tbody tr');
      var safeCheckResult = [];
      var data = {}

      $safeTr.each(function (i) {
        safeCheckResult.push({
          'checkExplanation': $(this).find('.explain-text').val(),
          'checkingExplanation': '',
          'item': $(this).find('.item').html(),
          'request': $(this).find('.request').html(),
          'status': $(this).find('.status').val(),
          'vSn': ''
        })
      })
      data = {
        vSn: '',
        safeCheckResult: safeCheckResult
      }
      console.log(data);

    })

    // 线束检查
    $('#app').on('tap', '#three_next', function() {
      var $wireTr = $('#app table tbody tr');
      console.log($wireTr)

      var HIResults	= [];
      var data = {};

      $wireTr.each(function(i) {
        HIResults.push({
          'checkExplanation': $(this).find('.explain-text').val(),
          'checkPerson': 'string',
          'checkingPerson': 'string',
          'checkingTime': 'string',
          'item': $(this).find('.item').html(),
          'status': $(this).find('.status').val(),
          'vSn': ''
        })
      });

      data = {
        vSn: '',
        HIResults: HIResults
      }
      console.log(data)
    })

    // bom检查
    $('#app').on('tap', '#four_next', function() {
      var $bomTr = $('#app table tbody tr');
      console.log($bomTr);

      var emsAndBomCheckResults = [];
      var data = {};

      $bomTr.each(function(i) {
        emsAndBomCheckResults.push({
          'vSn': 'string',
          'bomName': $(this).find('.bomName').html(),
          'bomNum': $(this).find('.bomNum').html(),
          'status': $(this).find('.status').val(),
          'applyPerson': 'string',
          'checkExplanation': $(this).find('.explain-text').val(),
          'checkingExplanation': 'string',
          'applyTime': '2018-06-05T06:26:16.746Z'
        })
      });

      data = {
        vSn: '',
        emsAndBomCheckResults: emsAndBomCheckResults
      }
      console.log(data)
    })


    // 添加说明
    $('#app').on('tap', '.explain', function () {
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

    // 研发工具



    // 添加解决方法
    $('#app').on('tap', '.resolvent', function () {
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
    $('#one').on('longtap', '.tab-col input', function () {
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