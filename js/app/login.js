(function ($, doc) {
  $.init({
    swipeBack: true //启用右滑关闭功能
  });
  $.plusReady(function () {
    plus.webview.currentWebview().setStyle({
      softinputMode: "adjustResize" // 弹出软键盘时自动改变webview的高度
    });
    //更改状态栏颜色
    plus.navigator.setStatusBarStyle("UIStatusBarStyleBlackOpaque");
    // 获取本地配置
    var settings = app.getSettings();
    console.log(JSON.stringify(settings))
    // 获取本地存储
    var state = app.getState();
    // 预加载页面是否加载完成
    var main_loaded_flag = false;
    // 获取预加载页面
    var mainPage = plus.webview.getWebviewById("index");
    // 判读预加载页面是否存在，
    if(!mainPage) {
      mainPage = $.preload({
        "id": 'index',
        "url": 'index.html'
      });
    } else {
      main_loaded_flag = true;
    }
    // 预加载页面添加加载完成事件
    mainPage.addEventListener("loaded", function() {
      main_loaded_flag = true;
    });

    var toMain = function () {
      // 使用定时器的原因：
      // 可能执行太快，main页面loaded事件尚未触发就执行自定义事件，此时必然会失败
      var id = setInterval(function() {
        if(main_loaded_flag) {
          clearInterval(id);
          $.fire(mainPage, 'show', null);
          mainPage.show("pop-in");

        }
      }, 20);

      // $.openWindow({
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

    // 
    doc.getElementById('NETID').value = state.NETID ? state.NETID : '';
    doc.getElementById('password').value = state.token ? state.token : '';


    //					console.log(state.token)
    if (settings.autoLogin && state.token) {
      setTimeout(function () {
        toMain();
      }, 1000)

    }

    //状态检查结束
    var loginButton = doc.getElementById('login');
    var NETIDBox = doc.getElementById('NETID');
    var passwordBox = doc.getElementById('password');

    loginButton.addEventListener('tap', function (event) {
      var loginInfo = {
        NETID: NETIDBox.value,
        password: passwordBox.value,
        autologin: '是'
      };
      app.login(loginInfo, function (err) {
        if (err) {
          plus.nativeUI.toast(err);
          return;
        }
        toMain();
      });
    });
  });
  // doc.getElementById('img').addEventListener('tap', function () {
  //   document.getElementById("img").src= BASE_URL_1 + 'car-management/user/code.action?'+ Math.random();
  // })
})(mui, document);