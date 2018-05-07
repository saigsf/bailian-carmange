mui.init();
//初始化单页view
var viewApi = mui('#app').view({
  defaultPage: '#setting'
});
//初始化单页的区域滚动
mui('.mui-scroll-wrapper').scroll();
//分享操作
var shares = {};

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
  plus.share.getServices(function (s) {
    if (s && s.length > 0) {
      for (var i = 0; i < s.length; i++) {
        var t = s[i];
        shares[t.id] = t;
      }
    }
  }, function () {
    console.log("获取分享服务列表失败");
  });
});

setTimeout(function () {
  defaultImg();
  setTimeout(function () {
    initImgPreview();
  }, 300);
}, 500);

//分享链接点击事件
document.getElementById("share").addEventListener('tap', function () {
  var ids = [{
    id: "weixin",
    ex: "WXSceneSession"
  }, {
    id: "weixin",
    ex: "WXSceneTimeline"
  }, {
    id: "sinaweibo"
  }, {
    id: "tencentweibo"
  }, {
    id: "qq"
  }],
    bts = [{
      title: "发送给微信好友"
    }, {
      title: "分享到微信朋友圈"
    }, {
      title: "分享到新浪微博"
    }, {
      title: "分享到腾讯微博"
    }, {
      title: "分享到QQ"
    }];
  plus.nativeUI.actionSheet({
    cancel: "取消",
    buttons: bts
  }, function (e) {
    var i = e.index;
    if (i > 0) {
      var s_id = ids[i - 1].id;
      var share = shares[s_id];
      if (share) {
        if (share.authenticated) {
          shareMessage(share, ids[i - 1].ex);
        } else {
          share.authorize(function () {
            shareMessage(share, ids[i - 1].ex);
          }, function (e) {
            console.log("认证授权失败：" + e.code + " - " + e.message);
          });
        }
      } else {
        mui.toast("无法获取分享服务，请检查manifest.json中分享插件参数配置，并重新打包")
      }
    }
  });
});

function shareMessage(share, ex) {
  var msg = {
    extra: {
      scene: ex
    }
  };
  msg.href = "http://www.dcloud.io/hellomui/";
  msg.title = "最接近原生APP体验的高性能前端框架";
  msg.content = "我正在体验HelloMUI，果然很流畅，基本看不出和原生App的差距";
  if (~share.id.indexOf('weibo')) {
    msg.content += "；体验地址：http://www.dcloud.io/hellomui/";
  }
  msg.thumbs = ["_www/images/logo.png"];
  share.send(msg, function () {
    console.log("分享到\"" + share.description + "\"成功！ ");
  }, function (e) {
    console.log("分享到\"" + share.description + "\"失败: " + e.code + " - " + e.message);
  });
}
//去评分
document.getElementById("rate").addEventListener('tap', function () {
  if (mui.os.ios) {
    location.href = 'https://itunes.apple.com/WebObjects/MZStore.woa/wa/viewContentsUserReviews?id=682211190&pageNumber=0&sortOrdering=2&type=&mt=8';
  } else if (mui.os.android) {
    plus.runtime.openURL("market://details?id=io.dcloud.HelloMUI", function (e) {
      plus.runtime.openURL("market://details?id=io.dcloud.HelloMUI", function (e) {
        mui.alert("360手机助手和应用宝，你一个都没装，暂时无法评分，感谢支持");
      }, "com.qihoo.appstore");
    }, "com.tencent.android.qqdownloader");
  }
});
//客服电话
document.getElementById("tel").addEventListener('tap', function () {
  if (mui.os.plus) {
    plus.device.dial("114");
  } else {
    location.href = 'tel:114';
  }

});
//		//意见反馈
//		document.getElementById("quest").addEventListener('tap', function() {
//			
//		});
//		
//检查更新
document.getElementById("update").addEventListener('tap', function () {
  var server = "http://www.dcloud.io/check/update"; //获取升级描述文件服务器地址
  mui.getJSON(server, {
    "appid": plus.runtime.appid,
    "version": plus.runtime.version,
    "imei": plus.device.imei
  }, function (data) {
    if (data.status) {
      plus.ui.confirm(data.note, function (i) {
        if (0 == i) {
          plus.runtime.openURL(data.url);
        }
      }, data.title, ["立即更新", "取　　消"]);
    } else {
      mui.toast('Hello MUI 已是最新版本~')
    }
  });
});
var view = viewApi.view;
(function (mui) {
  //处理view的后退与webview后退
  var oldBack = mui.back;
  mui.back = function () {
    if (viewApi.canBack()) { //如果view可以后退，则执行view的后退
      viewApi.back();
    } else { //执行webview后退
      oldBack();
    }
  };
  //监听页面切换事件方案1,通过view元素监听所有页面切换事件，目前提供pageBeforeShow|pageShow|pageBeforeBack|pageBack四种事件(before事件为动画开始前触发)
  //第一个参数为事件名称，第二个参数为事件回调，其中e.detail.page为当前页面的html对象
  view.addEventListener('pageBeforeShow', function (e) {
    //				console.log(e.detail.page.id + ' beforeShow');
  });
  view.addEventListener('pageShow', function (e) {
    //				console.log(e.detail.page.id + ' show');
  });
  view.addEventListener('pageBeforeBack', function (e) {
    //				console.log(e.detail.page.id + ' beforeBack');
  });
  view.addEventListener('pageBack', function (e) {
    //				console.log(e.detail.page.id + ' back');
  });
})(mui);
//更换头像
mui(".mui-table-view-cell").on("tap", "#head", function (e) {
  if (mui.os.plus) {
    var a = [{
      title: "拍照"
    }, {
      title: "从手机相册选择"
    }];
    plus.nativeUI.actionSheet({
      title: "修改头像",
      cancel: "取消",
      buttons: a
    }, function (b) {
      switch (b.index) {
        case 0:
          break;
        case 1:
          getImage();
          break;
        case 2:
          galleryImg();
          break;
        default:
          break
      }
    })
  }

});

function getImage() {
  var c = plus.camera.getCamera();
  c.captureImage(function (e) {
    plus.io.resolveLocalFileSystemURL(e, function (entry) {
      var s = entry.toLocalURL() + "?version=" + new Date().getTime();
      console.log(s);
      document.getElementById("head-img").src = s;
      document.getElementById("head-img1").src = s;
      //变更大图预览的src
      //目前仅有一张图片，暂时如此处理，后续需要通过标准组件实现
      document.querySelector("#__mui-imageview__group .mui-slider-item img").src = s + "?version=" + new Date().getTime();;;
    }, function (e) {
      console.log("读取拍照文件错误：" + e.message);
    });
  }, function (s) {
    console.log("error" + s);
  }, {
      filename: "_doc/head.jpg"
    })
}

function galleryImg() {
  plus.gallery.pick(function (a) {
    plus.io.resolveLocalFileSystemURL(a, function (entry) {
      plus.io.resolveLocalFileSystemURL("_doc/", function (root) {
        root.getFile("head.jpg", {}, function (file) {
          //文件已存在
          file.remove(function () {
            console.log("file remove success");
            entry.copyTo(root, 'head.jpg', function (e) {
              var e = e.fullPath + "?version=" + new Date().getTime();
              document.getElementById("head-img").src = e;
              document.getElementById("head-img1").src = e;
              //变更大图预览的src
              //目前仅有一张图片，暂时如此处理，后续需要通过标准组件实现
              document.querySelector("#__mui-imageview__group .mui-slider-item img").src = e + "?version=" + new Date().getTime();;
            },
              function (e) {
                console.log('copy image fail:' + e.message);
              });
          }, function () {
            console.log("delete image fail:" + e.message);
          });
        }, function () {
          //文件不存在
          entry.copyTo(root, 'head.jpg', function (e) {
            var path = e.fullPath + "?version=" + new Date().getTime();
            document.getElementById("head-img").src = path;
            document.getElementById("head-img1").src = path;
            //变更大图预览的src
            //目前仅有一张图片，暂时如此处理，后续需要通过标准组件实现
            document.querySelector("#__mui-imageview__group .mui-slider-item img").src = path;
          },
            function (e) {
              console.log('copy image fail:' + e.message);
            });
        });
      }, function (e) {
        console.log("get _www folder fail");
      })
    }, function (e) {
      console.log("读取拍照文件错误：" + e.message);
    });
  }, function (a) { }, {
      filter: "image"
    })
};

function defaultImg() {
  if (mui.os.plus) {
    plus.io.resolveLocalFileSystemURL("_doc/head.jpg", function (entry) {
      var s = entry.fullPath + "?version=" + new Date().getTime();;
      document.getElementById("head-img").src = s;
      document.getElementById("head-img1").src = s;
    }, function (e) {
      document.getElementById("head-img").src = '../img/login/user_logo.png';
      document.getElementById("head-img1").src = '../img/login/user_logo.png';
    })
  } else {
    document.getElementById("head-img").src = 'img/logo.png';
    document.getElementById("head-img1").src = 'img/logo.png';
  }

}
document.getElementById("head-img1").addEventListener('tap', function (e) {
  e.stopPropagation();
});
document.getElementById("welcome").addEventListener('tap', function (e) {
  //显示启动导航
  mui.openWindow({
    id: 'guide',
    url: 'guide.html',
    show: {
      aniShow: 'fade-in',
      duration: 300
    },
    waiting: {
      autoShow: false
    }
  });
});

function initImgPreview() {
  var imgs = document.querySelectorAll("img.mui-action-preview");
  imgs = mui.slice.call(imgs);
  if (imgs && imgs.length > 0) {
    var slider = document.createElement("div");
    slider.setAttribute("id", "__mui-imageview__");
    slider.classList.add("mui-slider");
    slider.classList.add("mui-fullscreen");
    slider.style.display = "none";
    slider.addEventListener("tap", function () {
      slider.style.display = "none";
    });
    slider.addEventListener("touchmove", function (event) {
      event.preventDefault();
    })
    var slider_group = document.createElement("div");
    slider_group.setAttribute("id", "__mui-imageview__group");
    slider_group.classList.add("mui-slider-group");
    imgs.forEach(function (value, index, array) {
      //给图片添加点击事件，触发预览显示；
      value.addEventListener('tap', function () {
        slider.style.display = "block";
        _slider.refresh();
        _slider.gotoItem(index, 0);
      })
      var item = document.createElement("div");
      item.classList.add("mui-slider-item");
      var a = document.createElement("a");
      var img = document.createElement("img");
      img.setAttribute("src", value.src);
      a.appendChild(img)
      item.appendChild(a);
      slider_group.appendChild(item);
    });
    slider.appendChild(slider_group);
    document.body.appendChild(slider);
    var _slider = mui(slider).slider();
  }
}

if (mui.os.stream) {
  document.getElementById("check_update").display = "none";
}

//退出操作******************
document.getElementById('exit').addEventListener('tap', function () {
  if (mui.os.ios) {
    app.setState({});
    mui.openWindow({
      url: '../login.html',
      id: 'login',
      show: {
        aniShow: 'pop-in'
      },
      waiting: {
        autoShow: false
      }
    });
    return;
  }
  var btnArray = [{
    title: "注销当前账号"
  }, {
    title: "直接关闭应用"
  }];
  plus.nativeUI.actionSheet({
    cancel: "取消",
    buttons: btnArray
  }, function (event) {
    var index = event.index;
    switch (index) {
      case 1:
        //注销账号
        app.setState({});
        /*
         * 注意：
         * 1、因本示例应用启动页就是登录页面，因此注册成功后，直接显示登录页即可；
         * 2、如果真实案例中，启动页不是登录页，则需修改，使用mui.openWindow打开真实的登录页面
         */
        plus.webview.getLaunchWebview().show("pop-in");
        //若启动页不是登录页，则需通过如下方式打开登录页
        //						mui.openWindow({
        //							url: 'login.html',
        //							id: 'login',
        //							show: {
        //								aniShow: 'pop-in'
        //							}
        //						});
        break;
      case 2:
        plus.runtime.quit();
        break;
    }
  });
}, false);



// y用户名
if(app.getState().account) {
  $('#username').html(app.getState().account)
}
