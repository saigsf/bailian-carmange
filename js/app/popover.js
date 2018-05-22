;(function () {
  mui.init();
  setTimeout(function() {
    console.log(123445)
    $('.container').addClass('run');
    // $('.mui-btn').css({
    //   'animation': 'moveOne 1s 0s'
    // })
  }, 100)
  mui.plusReady(function () {
    var ws = plus.webview.currentWebview();
    var H = ws.H;

    document.addEventListener('tap', function () {
      mui.back()
    })
    
    $('#doorpost').on('tap', function () {
      var view = plus.webview.getWebviewById('html/doorpost.html');
      view.show()
    })
  })
})();