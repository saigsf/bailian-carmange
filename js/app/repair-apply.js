; (function () {
  mui.init();

  var dDate = new Date();
  console.log(dDate)
  $('#send_time_box').off().on('tap', function () {

    plus.nativeUI.pickDate(function (e) {
      var d = e.date;
      $('#send_time').val(d.format('yyyy-MM-dd'));

    }, function (e) {
      $('#send_time').val('您没有选择日期');
    }, {
        title: '',
        date: dDate,
        minDate: dDate
      });
  });

  $('#oppointedtime_box').off().on('tap', function () {

    plus.nativeUI.pickDate(function (e) {
      var d = e.date;
      $('#oppointedtime').val(d.format('yyyy-MM-dd'));

    }, function (e) {
      $('#oppointedtime').val('您没有选择日期');
    }, {
        title: '',
        date: dDate,
        minDate: dDate
      });
  });

  $('#next').on('tap', function () {
    var data = {};

    data.vSn = $('#vSn').val();
    data.sendPeople = $('#sendPeople').val();
    data.reason = $('#reason').val();
    data.send_park = $('#send_park').val();
    data.oppointedtime = $('#oppointedtime').val();
    data.send_time = $('#send_time').val();
    data.remark = $('#remark').val();

    console.log(JSON.stringify(data))

    app.PutInCarMaintainApply(data, function (res) {
      console.log(res);
      res = JSON.parse(res);
      if (res.ret) {
        mui.toast(res.msg);
      } else {
        mui.toast(res.msg);
      }
    })
  })

})();