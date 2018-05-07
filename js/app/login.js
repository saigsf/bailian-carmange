(function($, doc) {
  $.init({
    swipeBack: true //启用右滑关闭功能
  });
  $.plusReady(function() {
    plus.webview.currentWebview().setStyle({
      softinputMode: "adjustResize" // 弹出软键盘时自动改变webview的高度
    });
    //更改状态栏颜色
    plus.navigator.setStatusBarStyle("UIStatusBarStyleBlackOpaque");

    var settings = app.getSettings();
    var state = app.getState();
    var main_loaded_flag = false;
    var mainPage = plus.webview.getWebviewById("index");
    if(!mainPage) {

      mainPage = $.preload({
        "id": 'index',
        "url": 'index.html'
      });
    } else {
      main_loaded_flag = true;
    }

    mainPage.addEventListener("loaded", function() {
      main_loaded_flag = true;
    });

    var toMain = function() {
      //使用定时器的原因：
      //可能执行太快，main页面loaded事件尚未触发就执行自定义事件，此时必然会失败
      var id = setInterval(function() {
        if(main_loaded_flag) {
          clearInterval(id);
          $.fire(mainPage, 'show', null);
          mainPage.show("pop-in");
        }
      }, 20);
    };

    //					console.log(state.token)
    if(settings.autoLogin && state.token) {
      toMain();
    }

    //状态检查结束
    var loginButton = doc.getElementById('login');
    var accountBox = doc.getElementById('account');
    var passwordBox = doc.getElementById('password');
    var verifyCodeBox = doc.getElementById('verifyCode')
    loginButton.addEventListener('tap', function(event) {
      var loginInfo = {
        username: accountBox.value,
        password: passwordBox.value,
        verifyCode: verifyCodeBox.value
      };
      app.login(loginInfo, function(err) {
        if(err) {
          plus.nativeUI.toast(err);
          return;
        }
        toMain();
      });
    });
  });
  doc.getElementById('img').addEventListener('tap', function () {
    document.getElementById("img").src= BASE_URL_1 + 'car-management/user/code.action?'+ Math.random();
  })
})(mui, document);