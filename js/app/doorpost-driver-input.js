(function () {
  mui.init();
  //初始化单页的区域滚动
  mui('.mui-scroll-wrapper').scroll();

  var id = null;
  var self = null;
  var view = null;

  mui.plusReady(function () {
    handsetAdaption()
    self = plus.webview.currentWebview();

    if (self.ids) {
      // 驾驶员数据回显
      $('.mui-title').html('驾驶员编辑');
      id = self.ids;
      getData.edit();
      $('#next').attr('id', 'update');
    }
    getData.groups()
    getData.update();
  });


  function handsetAdaption() {
    // 更改顶部导航栏高度
    if (plus.device.model === 'iPhoneX') {
      //页面样式重置
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

  var getData = {
    update: function () {
      // view = plus.webview.getWebviewById('doorpost-driver.html')
      // 提交数据
      $('#driver').on('tap', '#next', function () {
        var data = serialize($('#driver'));

        app.carDriverAdd(data, function (res) {
          console.log(res)

          if (res.ret) {
            mui.fire(view, 'update', {});
            mui.back();
          }
          mui.toast(res.msg)
        })
        // console.log(hasEmptyValue(data, requiredArr));
      })
      $('#driver').on('tap', '#update', function () {
        var data = serialize($('#driver'));
        data.id = id;

        app.carDriverUpdate(data, function (res) {
          console.log(res)
          res = JSON.parse(res);

          if (res.ret) {
            mui.fire(view, 'update', {});
            mui.back();
          }
          mui.toast(res.msg)
        })
        // console.log(hasEmptyValue(data, requiredArr));
      })

    },
    edit: function () {
      app.carDriverEdit({ id: id }, function (res) {
        console.log(res)
        updateView(res)
      })
    },
    groups: function () {
      app.carDriverGetGroup({}, function (res) {
        var html = '';
        for (let i = 0; i < res.length; i++) {
          const item = res[i];
          html += '<option value="' + item.id + '">' + item.name + '</option>'
        }
        $('#groups').html(html)
      })
    }
  }










})()