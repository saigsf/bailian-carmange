(function () {
  // 顶部导航

  $('.mui-scroll').on('tap', 'a', function() {
    var l = $(this).offset().left;
    var L = $('.mui-scroll').offset().left;
    var w = $('.mui-scroll').width();
    var W = $('.mui-scroll-wrapper').width();
    if(l+L>W/2) {
      mui('.mui-scroll-wrapper').scroll().scrollTo(W-w, 0, 100);
    } else {
      mui('.mui-scroll-wrapper').scroll().scrollTo(0, 0, 100);
    }
    
  })


  mui.init();
  //子页面列表
  var subpages = ['vehicle-input.html', 'vehicle-list.html', 'vehicle-auditing.html', 'vehicle-input-unfinished.html'];

  // 子页面切换样式
  var subpages_style = {
    top: '64px',
    bottom: '0px'
  }
  //页面切换动画
  var aniShow = {};

  //页面传值
  var extras = {}

  // 创建子页面，显示首个选项卡其他都影藏
  mui.plusReady(function () {
    //更改状态栏颜色
    plus.navigator.setStatusBarStyle("light");

    if (plus.device.model === 'iPhoneX') {
      //子页面导入样式重置
      subpages_style.top = 88 + 'px';
      //传参重置
      //页面样式重置
      $('header').css({
        'height': '88px',
        'paddingTop': '40px'
      })
    }

    var self = plus.webview.currentWebview();

    extras.H = self.H;

    for (var i = 0; i < subpages.length; i++) {
      var temp = {};
      var sub = plus.webview.create(subpages[i], subpages[i], subpages_style, extras);

      if (i > 0) {
        sub.hide();
      } else {
        temp[subpages[i]] = "true";
        mui.extend(aniShow, temp);
      }
      self.append(sub);
    }

  });
  //当前激活选项
  var activeTab = subpages[0];
  //选项卡点击事件
  mui('.mui-scroll').on('tap', 'a', function (e) {
    var targetTab = this.getAttribute('href');
   
    if (targetTab == activeTab) {
      return;
    }
    //显示目标选项卡
    //若为iOS平台或非首次显示，则直接显示
    if (mui.os.ios || aniShow[targetTab]) {
      plus.webview.show(targetTab);
      // plus.webview.getWebviewById(targetTab).reload()
    } else {
      //否则，使用fade-in动画，且保存变量
      var temp = {};

      temp[targetTab] = "true";
      mui.extend(aniShow, temp);
      plus.webview.show(targetTab, "slide-in-right", 300);
      // plus.webview.getWebviewById(targetTab).reload()
    }
    //隐藏当前;
    plus.webview.hide(activeTab);
    //更改当前活跃的选项卡
    activeTab = targetTab;
  });

  //自定义事件，模拟点击“首页选项卡”
  document.addEventListener('gohome', function () {
    var defaultTab = document.getElementById("defaultTab");
    //模拟首页点击
    mui.trigger(defaultTab, 'tap');
    //切换选项卡高亮
    var current = document.querySelector(".mui-scroll>.mui-control-item.mui-active");
    if (defaultTab !== current) {
      current.classList.remove('mui-active');
      defaultTab.classList.add('mui-active');
    }
  });
})()