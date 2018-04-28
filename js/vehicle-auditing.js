; (function () {
  mui.init();

  
  var byId = function (id) {
    return document.getElementById(id);
  };
  // pie
  var pieChart = echarts.init(byId('pieChart'));
  var chartOption = {
    calculable: false,
    series: [{
      name: '访问来源',
      type: 'pie',
      radius: '65%',
      center: ['50%', '50%'],
      startAngle: -120,
      roseType: 'radius',
      data: [{
        value: 335,
        name: '已通过'
      }, {
        value: 310,
        name: '未通过'
      }, {
        value: 234,
        name: '审核中'
      }]
    }]
  }
  pieChart.setOption(chartOption);

  var placeHolderStyle = {
    normal: {
      color: 'rgba(0,0,0,0.3)',
      label: {
        show: false
      },
      labelLine: {
        show: false
      }
    },
    emphasis: {
      label: {
        show: false
      },
      labelLine: {
        show: false
      }
    }
  };
  var dataStyle = {
    normal: {
      label: { show: false },
      labelLine: { show: false },
      shadowBlur: 10,
      shadowColor: 'rgba(40, 40, 40, 0.5)',
    }
  };
  var labelLine = {
    normal: {
      show: false,
      length: 20,
      length2: 10,
      lineStyle: {
        type: 'dashed',
        width: 4,
      },
    },
  };
  var label = {
    normal: {
      show: false,
      position: "center",
      formatter: function (param) {
        console.log(param)
        str = param.name;
        return str;
      },
      textStyle: {
        fontSize: 14,
        fontFamily: "Microsoft Yahei",
        color: '#fff'
      },
    },
    emphasis: {
      show: true
    }
  };


  var echartOne = echarts.init($('#one')[0]),
    echartOneOptions = {
      color: ['rgba(149, 202, 153, .7)', 'rgba(190, 219, 233, .7)', '#EDEBEE', 'rgba(166, 209, 14, .7)'],
      legendHoverLink: true,
      hoverAnimation: true,
      series: [{
        avoidLabelOverlap: true,
        name: '已通过',
        type: 'pie',
        clockWise: true,
        radius: [30, 40],
        itemStyle: dataStyle,
        hoverAnimation: true,
        labelLine: labelLine,
        label: label,
        data: [
          {
            value: 40,
            name: '已通过'
          },
          {
            value: 60,
            name: 'invisible',
            itemStyle: placeHolderStyle,
          }

        ],

      }]
    };

    echartOne.setOption(echartOneOptions);
    
  var echartTwo = echarts.init($('#two')[0]),
    echartTwoOptions = {
      color: ['rgba(166, 209, 14, .7)', 'rgba(216, 79, 95, .7)', 'rgba(149, 202, 153, .7)', 'rgba(190, 219, 233, .7)', '#EDEBEE', 'rgba(166, 209, 14, .7)'],
      legendHoverLink: true,
      hoverAnimation: true,
      series: [{
        avoidLabelOverlap: true,
        name: '已通过',
        type: 'pie',
        clockWise: true,
        radius: [30, 40],
        itemStyle: dataStyle,
        hoverAnimation: true,
        labelLine: labelLine,
        label: label,
        data: [
          {
            value: 40,
            name: '已通过'
          },
          {
            value: 60,
            name: 'invisible',
            itemStyle: placeHolderStyle,
          }

        ],

      }]
    };
  echartTwo.setOption(echartTwoOptions);

  var echartThree = echarts.init($('#three')[0]),
    echartThreeOptions = {
      color: ['rgba(216, 79, 95, .7)', 'rgba(149, 202, 153, .7)', 'rgba(190, 219, 233, .7)', '#EDEBEE', 'rgba(166, 209, 14, .7)'],
      legendHoverLink: true,
      hoverAnimation: true,
      series: [{
        avoidLabelOverlap: true,
        name: '已通过',
        type: 'pie',
        clockWise: true,
        radius: [30, 40],
        itemStyle: dataStyle,
        hoverAnimation: true,
        labelLine: labelLine,
        label: label,
        data: [
          {
            value: 40,
            name: '已通过'
          },
          {
            value: 60,
            name: 'invisible',
            itemStyle: placeHolderStyle,
          }

        ],

      }]
    };

    echartThree.setOption(echartThreeOptions);


  mui.plusReady(function () {
    var self = plus.webview.currentWebview();
    var H = self.H;
    document.getElementById('look_auditing').addEventListener('tap', function () {
      //打开接车点检页面
      mui.openWindow({
        url: 'vehicle-auditing-list.html',
        id: 'vehicle-auditing-list', //默认使用当前页面的url作为id
        styles: {
          top: '0px',
          bottom: H
        }, //窗口参数
        extras: { H }, //自定义扩展参数
        createNew: false, //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
        show: {
          autoShow: true, //页面loaded事件发生后自动显示，默认为true
        },
        waiting: {
          autoShow: true, //自动显示等待框，默认为true
          title: '正在加载...', //等待对话框上显示的提示内容
        }
      })
    })
  })
})()