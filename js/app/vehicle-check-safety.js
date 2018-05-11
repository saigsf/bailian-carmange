; (function (mui, doc) {
  mui.init();
  //初始化单页view
  var viewApi = mui('#app').view({
    defaultPage: '#setting'
  });
  //初始化单页的区域滚动
  mui('.mui-scroll-wrapper').scroll();

  mui.plusReady(function () {
    if (plus.device.model === 'iPhoneX') {
      //页面样式重置
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

    // plus.webview.currentWebview().setStyle({
    //   softinputMode: "adjustResize" // 弹出软键盘时自动改变webview的高度
    // });

    var self = plus.webview.currentWebview();
    var H = self.H;
    var vSn = self.vSn;

    fetchData.findAllCheckName()
    fetchData.findAllParentItemOne(vSn);
    fetchData.findAllParentItemTwo(vSn);
    fetchData.findAllParentItemThree(vSn);

    //添加说明
    mui('.mui-fullscreen').on('tap', '.add', function () {
      mui.openWindow({
        url: 'vehicle-check-add-explain.html',
        id: 'vehicle-check-add-explains', //默认使用当前页面的url作为id
        styles: {
          top: '0px',
          bottom: H
        }, //窗口参数
        extras: {
          H: H
        }, //自定义扩展参数
        createNew: false, //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
        show: {
          autoShow: true, //页面loaded事件发生后自动显示，默认为true
        },
        waiting: {
          autoShow: true, //自动显示等待框，默认为true
          title: '正在加载...', //等待对话框上显示的提示内容
        }
      })

      window.addEventListener('update', (evt) => {
        var components = evt.detail.components;
        //do something
        $(this).parent().find('.components').html(components)
      });
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

    // 判断其他检查是否完成
    var checkJudge = function (i) {
      var $lis = $('#all_check li');
      var flag = 1;
      $lis.eq(i - 1).attr('data-value', 'finished');
      $lis.each(function () {
        if ($(this).attr('data-value') == 'unfinished') {
          flag = 0;
        }
      });
      return !!flag;
    }

    //保存事件
    var addEvent = function (CNID) {
      var id = null;
      var id_1 = null;

      var apiArr = ['saveClacyLindersss', 'addSafeCheck', 'addHiCheck', 'addEmsAndBomCheck'];
      var apiFindArr = ['findCldCheckByCar', 'findSafeCheckByCar', 'findHiCheckByCar', 'findEmsAndBomCheckByCar']

      if (CNID == 1) {
        id = '#next_BOM';
        id_1 = '#check_BOM';
      } else if (CNID == 2) {
        id = '#next_BOM_1';
        id_1 = '#check_BOM_1';
      } else if (CNID == 3) {
        id = '#next_BOM_2';
        id_1 = '#check_BOM_2';
      }

      $(id).off('tap').on('tap', function () {
        var saftCheckResult = [];
        var data = {
          vSn: vSn
        };
        var data_1 = {
          vSn: vSn
        }
        // 输入检查

        // 数据获取
        $(id_1).find('tbody tr').each(function (i) {
          saftCheckResult.push({
            "status": $(this).find('.status').val(),
            "explanation": $(this).find('.components').html()
          });
        });

        data.saftCheckResult = JSON.stringify(saftCheckResult);
        // data.saftCheckResult = saftCheckResult;
        // console.log(data);
        //数据提交
        app[apiArr[CNID]](data, function (res) {
          if (res && res.ret) {
            console.log(apiArr[CNID] + '已完成提交')
          } else {
            console.log(res.msg)
          }

        })

        // app[apiFindArr[CNID]]({ vSn: data.vSn }, function (res) {
        //   console.log(res)
        //   if (res == null || res.length == 0) {

        //   } else {
        //     console.log('数据更新')
        //   }
        // })

        // 缸压检查数据获取和提交
        // if (CNID == 1) {
        //   // 输入检查

        //   // 缸压检查数据获取
        //   // data_1.cylinder_p = $('#cyliner_p').val();
        //   data_1.one_p = $('#one_p').val();
        //   data_1.two_p = $('#two_p').val();
        //   data_1.three_p = $('#three_p').val();
        //   data_1.four_p = $('#four_p').val();
        //   data_1.fuel_p = 4.0;
        //   data_1.actual_p = $('#actual_p').val();

        //   // 数据提交
        //   app[apiArr[0]](data_1, function (res) {
        //     if(res && res.ret) {
        //       console.log('缸压检查完毕');
        //     } else {
        //       console.log(res.msg)
        //     }

        //   })

        //   // app[apiFindArr[0]]({ vSn: data_1.vSn }, function (res) {
        //   //   console.log(res)
        //   //   if (res == null || res.length == 0) {

        //   //   } else {
        //   //     console.log('数据更新')
        //   //   }
        //   // })
        // }


        // 判断其他检查是否完成，如果都完成则跳转到其他页面，否则执行返回操作
        if (checkJudge(+CNID)) {
          //去其他页面
          console.log('所有检查都已完成，我要跳转了！！')
        } else {
          mui.back();
        }
      })
    }

    var check_html = $('#app');

    // 给每一行添加点击事件
    $('#all_check li').each(function (i) {

      $(this).on('tap', function () {
        var CNID = $(this).attr('data-id');


        app.findAllParentItem({ CNID: CNID }, function (list) {
          var html = '';
          for (let i = 0; i < list.length; i++) {
            const item = list[i];
            html += '<tr><td>' + item.pname + '</td>';
            if (CNID == 1) {
              html += '<td>' + item.carCheckRequest.request + '</td>'
            }
            html += '<td><select class="status">'
              + '<option value="是">是</option>'
              + '<option value="否">否</option>'
              + '<option value="NA">NA</option>'
              + '</select></td>'
              + '<td><i class="mui-btn mui-btn-blue mui-btn-outlined add">+</i><span class="components" style="display: none"></span></td></tr>'
          }
          check_html.find('tbody').html(html);

          addEvent(CNID);
        });
      });
    });
  });

  // 获取数据
  var fetchData = {
    findAllCheckName: function () {
      // 获取检查类型字典
      app.findAllCheckName({}, function (res) {
        // console.log(res)
        res = JSON.parse(res)
        updateView.findAllCheckName(res)
      });
    },
    findAllParentItemOne: function (vSn) {
      app.findAllParentItem({
        CNID: 1,
        param: vSn,
        type: 1
      }, function (res) {
        console.log(res)
      })
    },
    findAllParentItemTwo: function (vSn) {
      app.findAllParentItem({
        CNID: 2,
        param: vSn,
        type: 1
      }, function (res) {
        console.log(res)
      })
    },
    findAllParentItemThree: function () {
      app.findAllParentItem({
        CNID: 3,
        param: vSn,
        type: 1
      }, function (res) {
        console.log(res)
      })
    },
  }

  var updateView = {
    findAllCheckName: function (data) {
      var html = '';
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        html += '<li class="mui-table-view-cell" data-id="' + item.id + '" data-value="unfinished">'
          + '<a href="#check_BOM' + (i == 0 ? '' : ('_' + i)) + '" class="mui-btn">'
          + '<label><i class="icon icon-safe"></i></label>'
          + '<div class="inner">'
          + '<h4>' + item.name + '</h4>'
          + '<span class="unfinished">(未完成，点击开始)</span>'
          + '<span class="finished">(已完成)</span>'
          + '</div>'
          + '</a>'
          + '</li>';

        $('.mui-page').eq(i + 1).find('h1.mui-title').html(item.name);
      }
      $('#all_check').html(html)
    },
    findAllParentItemOne: function (data) {
      var html = '';
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        html += '<tr>'
          + '<td>' + item.pname + '</td>'
          + '<td>' + item.carCheckRequest.request + '</td>'
          + '<td><select name="" id="">'
          + '<option value="是">是</option>'
          + '<option value="否">否</option>'
          + '</select></td>'
          + '<td>说明</td>'
          + '</tr>'
      }

      $('#check_BOM tbody').html(html)
    },
    findAllParentItemTwo: function (data) {

    },
    findAllParentItemThree: function (data) {

    }
  }

})(mui, document)
