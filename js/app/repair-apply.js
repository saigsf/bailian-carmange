; (function () {
  mui.init();

  // 维修申请
  $('#next').on('tap', function () {
    var data = null;
    data = serialize($('#repair_apply'))
    // 维修申请
    app.carMaintainApply(data, function (res) {
      res = JSON.parse(res);
      if (res.ret) {

      }
      console.log(res)
      mui.toast(res.msg);
    })


  })
  
})();