(function (mui, doc) {
  var loginType = 'netid';
  mui.init({
    swipeBack: true //启用右滑关闭功能
  });
  mui.plusReady(function () {
    plus.webview.currentWebview().setStyle({
      softinputMode: "adjustResize" // 弹出软键盘时自动改变webview的高度
    });
    //更改状态栏颜色
    plus.navigator.setStatusBarStyle("UIStatusBarStyleBlackOpaque");
    //更改状态栏颜色
    // plus.navigator.setStatusBarStyle("dark");
    // 获取本地配置
    var settings = app.getSettings();
    // console.log(JSON.stringify(settings))
    // 获取本地存储
    var state = app.getState();
    // 预加载页面是否加载完成
    var main_loaded_flag = false;
    // 获取预加载页面
    var mainPage = plus.webview.getWebviewById("index");
    // 判读预加载页面是否存在，
    if (!mainPage) {
      mainPage = mui.preload({
        "id": 'index',
        "url": 'index.html'
      });
    } else {
      main_loaded_flag = true;
    }
    // 预加载页面添加加载完成事件
    mainPage.addEventListener("loaded", function () {
      main_loaded_flag = true;
    });



    // 
    doc.getElementById('NETID').value = state.data ? state.data.netid : '';
    doc.getElementById('employeeCard').value = state.data ? state.data.employeeCard : '';
    doc.getElementById('password').value = state.loginInfo ? state.loginInfo.password : '';


    //					console.log(state.token)
    if (settings.autoLogin && state.data) {
      setTimeout(function () {
        login();
      }, 1000)

    }



    var toMain = function () {
      // 使用定时器的原因：
      // 可能执行太快，main页面loaded事件尚未触发就执行自定义事件，此时必然会失败
      var id = setInterval(function () {
        if (main_loaded_flag) {
          clearInterval(id);
          mui.fire(mainPage, 'goback', null);
          mui.fire(plus.webview.getWebviewById('html/home.html'), 'statusBar', null)
          mainPage.show("pop-in");

        }
      }, 20);

      // mui.openWindow({
      //   url: 'index.html',
      //   id: 'index', //默认使用当前页面的url作为id
      //   styles: {}, //窗口参数
      //   extras: {}, //自定义扩展参数
      //   createNew: false, //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
      //   show: {
      //     autoShow: true, //页面loaded事件发生后自动显示，默认为true
      //   },
      //   waiting: {
      //     autoShow: true, //自动显示等待框，默认为true
      //     title: '正在加载...', //等待对话框上显示的提示内容
      //   }
      // })
    };
    addEvent();
    function addEvent() {
      $('#loginType').on('tap', function () {
        if ($(this).html() == '用员工卡号登陆') {
          $('#NETID').hide().attr('disabled', true);
          $('#employeeCard').show().attr('disabled', false);
          $(this).html('用员工NET ID号登陆');

          loginType = 'employeeCard'
        } else {
          $('#NETID').show().attr('disabled', false);
          $('#employeeCard').hide().attr('disabled', true);
          $(this).html('用员工卡号登陆');

          loginType = 'netid'
        }

      })
    }

    submitData()
    function submitData() {
      $('#login').on('tap', login);
    }

    function login() {
      var loginInfo = serialize($('form'))
      loginInfo.autoLogin = '是';
      console.log(loginInfo)
      if (loginType == 'netid') {
        app.loginNetId(loginInfo, function (err) {
          if (err) {
            mui.toast(err);
            return;
          }
          toMain();
        });
      } else {
        app.loginCard(loginInfo, function (err) {
          if (err) {
            plus.nativeUI.toast(err);
            return;
          }
          toMain();
        });
      }
    }
  });
})(mui, document);