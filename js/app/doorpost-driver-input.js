(function () {
  mui.init();
  //初始化单页的区域滚动
  mui('.mui-scroll-wrapper').scroll();

  var id = null;

  mui.plusReady(function () {
    handsetAdaption()

    var self = plus.webview.currentWebview();
    addEvent();

    if (self.ids) {
      // 驾驶员数据回显
      $('.mui-title').html('驾驶员编辑');
      id = self.ids;
      getData.edit();
      $('#next').attr('id', 'update');
    }
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
      // 提交数据
      $('#driver').on('tap', '#next', function () {
        var data = serialize($('#driver'));
        app.carDriverAdd(data, function (res) {
          console.log(JSON.stringify(res))
          mui.toast(res.msg)
        })
        // console.log(hasEmptyValue(data, requiredArr));
      })
      $('#driver').on('tap', '#update', function () {
        var data = serialize($('#driver'));
        data.id = id;
        app.carDriverUpdate(data, function (res) {
          console.log(JSON.stringify(res))
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
      app.carDriverGetGroup({}, function(res) {
        var html = '';
        for (let i = 0; i < res.length; i++) {
          const item = res[i];
          html += '<option value="'+item.id+'">'+item.name+'</option>'
        }
        $('#groups').html(html)
      })
    }
  }
  getData.groups()
  getData.update();

  function updateView(data) {
    $('#driver_name').val(data.name)
    $('#employee_card').val(data.employeeCard)
    $('#telephone').val(data.telephone)
    $('#iccard').val(data.iccard)
    $('input[name=isallow]').val(data.isallow)
    $('#allow_start_time').val(data.allowStartTime)
    $('#allow_end_time').val(data.allowEndTime)
    $('#remark').val(data.remark)

  }


  function addEvent() {
    var dDate = new Date();

    $('#allow_start_time').off().on('tap', function () {
      var _this = this;

      plus.nativeUI.pickDate(function (e) {
        var d = e.date;
        $(_this).val(d.format('yyyy-MM-dd'));
      }, function (e) {
        $(_this).val('您没有选择日期');
      }, {
          title: '',
          date: dDate,
          maxDate: dDate
        });
    });

    $('#allow_end_time').off().on('tap', function () {
      var _this = this;
      plus.nativeUI.pickDate(function (e) {
        var d = e.date;
        $(_this).val(d.format('yyyy-MM-dd'));
      }, function (e) {
        $(_this).val('您没有选择日期');
      }, {
          title: '',
          date: dDate,
          maxDate: dDate
        });
    });
  }




})()