var BASE_URL_1 = 'http://222.91.98.78:9999/';
// var BASE_URL_1 = 'http://222.91.98.78:8848/';


/**
 * 时间格式化函数
 * @param {String} format 目标格式 'yyyy-MM-dd hh:mm:ss'
 */
Date.prototype.format = function (format) {

  var o = {
    "M+": this.getMonth() + 1, //month
    "d+": this.getDate(), //day
    "h+": this.getHours(), //hour
    "m+": this.getMinutes(), //minute
    "s+": this.getSeconds(), //second
    "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
    "S": this.getMilliseconds() //millisecond
  }

  if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));


  $.each(o, function (k, v) {
    if (new RegExp("(" + k + ")").test(format))
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? v : ("00" + v).substr(("" + v).length));
  })

  return format;
}

/**
 * 获取上一个月
 *
 * @date 格式为yyyy-mm-dd的日期，如：2014-01-25
 */
function getPreMonth(date) {
  var arr = date.split('-');
  var year = arr[0]; //获取当前日期的年份
  var month = arr[1]; //获取当前日期的月份
  var day = arr[2]; //获取当前日期的日
  var days = new Date(year, month, 0);
  days = days.getDate(); //获取当前日期中月的天数
  var year2 = year;
  var month2 = parseInt(month) - 1;
  if (month2 == 0) {
    year2 = parseInt(year2) - 1;
    month2 = 12;
  }
  var day2 = day;
  var days2 = new Date(year2, month2, 0);
  days2 = days2.getDate();
  if (day2 > days2) {
    day2 = days2;
  }
  if (month2 < 10) {
    month2 = '0' + month2;
  }
  var t2 = year2 + '-' + month2 + '-' + day2;
  return t2;
}

/**
 * 某一范围内的随机数
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 */
function randomRange(min, max) {
  if (!max) {
    max = min;
    min = 0;
  }
  return Math.floor(Math.random() * (max - min) + min);
}
/**
 * 表单序列化
 * @param {jQuery}  form DOM节点
 * @param {boolean} deep 是否深度遍历
 */
var serialize = function ($form, deep) {
  var str = null;
  var obj = {};

  if (!deep) {
    str = $form.serializeArray();
    for (var i = 0; i < str.length; i++) {
      const item = str[i];
      obj[item.name] = item.value;
    }
    str = obj;
  } else {
    str = $form.serialize();
  }
  return str;
}

/**
 * 对象是否为空
 * @param {Object} object 
 */
var isEmpty = function (object) {
  for (const key in object) {
    return false;
  }
  return true
}

/**
 * 对象是否含有空值,检查指定值是否为空
 * @param {Object} object 
 * @param {Array} arr 指定值，数组形式传入 
 */
var hasEmptyValue = function (object, arr) {
  var flag = 0;
  var emptyArr = [];

  if (arr && arr.length > 0) {
    $.each(object, function (key, value) {
      if (object.hasOwnProperty(key) && arr.contains(key)) {
        const element = object[key];
        if (!element) {
          flag = 1;
          emptyArr.push(key);
        }
      }
    })

  } else {
    $.each(object, function (key, value) {
      if (object.hasOwnProperty(key)) {
        const element = object[key];
        if (!element) {
          flag = 1;
          emptyArr.push(key);
        }
      }
    })
  }

  return !!flag && emptyArr;
}

/**
 * 判断obj是否在数组中
 * @param {*} obj 数组元素
 */
Array.prototype.contains = function (obj) {
  var i = this.length;
  while (i--) {
    if (this[i] === obj) {
      return true;
    }
  }
  return false;
}

Array.prototype.remove = function (val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};

var merge = function (arr, subArr) {
  var length = arr.length;
  console.log(length);
  console.log(subArr.length)

  for (var i = 0; i < subArr.length; i++) {
    const item = subArr[i];
    if (length == 0) {
      arr.push(item);
    } else {
      for (var j = 0; j < arr.length; j++) {
        const value = arr[j];
        if (item.id === value.id) {
          arr[j] = item;
        } else {
          arr.push(item);
        }
      }
    }

  }
  return arr;
  // return [];
}

// 翻译
function translate(before, standard) {

  for (var i = 0; i < before.length; i++) {
    const item = before[i];

    for (var j = 0; j < standard.length; j++) {
      const element = standard[j];
      if (element.name == item) {
        return element.value;
      }
    }
  }
}

/**
 * 坐标转换
 * @param {坐标点或坐标数组} points 
 * @param {Function} callback 回掉函数
 */
function translatePoint(points, callback) {

}

//获取指定标记的详细信息     



// 对象数据格式化

function format(obj) {
  $.each(obj, function (key, value) {
    if (typeof value == 'Number') {
      obj[key] = Math.floor(value);
    }
  })
  return obj;
}

// 数据回显
function dataRetrieval(data) {
  $.each(data, function (key, value) {
    if (typeof value == 'object') {
      $.each(value, function (keys, val) {
        $('#' + keys + '_0').html(val ? val : '-');
        $('#' + keys).html(val ? val : '-');
      })
    } else {
      $('#' + key + '_0').html(value ? value : '-');
      $('#' + key).html(value ? value : '-');
      $('#' + key).val(value ? value : '-');
    }
  })
}


// 数组中对象的值等于当前值的个数
var findNum = function (arr, value) {
  var flag = 0;
  for (var i = 0; i < arr.length; i++) {
    const item = arr[i];
    // console.log(item.pitem == value)
    if (item.pitem.replace(/\s/g, "") == value) {
      flag++
    }
  }

  return flag;
}



// if (navigator.onLine) {
//   alert('online')
// } else {
//   alert('offline');
// }




;
(function ($) {
  $.fn.autoTextarea = function (options) {
    var defaults = {
      maxHeight: null,
      minHeight: $(this).height()
    };
    var opts = $.extend({}, defaults, options);
    return $(this).each(function () {
      $(this).bind("paste cut keydown keyup focus blur", function () {
        var height, style = this.style;
        this.style.height = opts.minHeight + 'px';
        if (this.scrollHeight > opts.minHeight) {
          if (opts.maxHeight && this.scrollHeight > opts.maxHeight) {
            height = opts.maxHeight;
            style.overflowY = 'scroll';
          } else {
            height = this.scrollHeight;
            style.overflowY = 'hidden';
          }
          style.height = height + 'px';
        }
      });
    });
  };
})(jQuery);




/*
 * 身份证15位编码规则：dddddd yymmdd xx p
 * dddddd：6位地区编码
 * yymmdd: 出生年(两位年)月日，如：910215
 * xx: 顺序编码，系统产生，无法确定
 * p: 性别，奇数为男，偶数为女
 *
 * 身份证18位编码规则：dddddd yyyymmdd xxx y
 * dddddd：6位地区编码
 * yyyymmdd: 出生年(四位年)月日，如：19910215
 * xxx：顺序编码，系统产生，无法确定，奇数为男，偶数为女
 * y: 校验码，该位数值可通过前17位计算获得
 *
 * 前17位号码加权因子为 Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ]
 * 验证位 Y = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ]
 * 如果验证码恰好是10，为了保证身份证是十八位，那么第十八位将用X来代替
 * 校验位计算公式：Y_P = mod( ∑(Ai×Wi),11 )
 * i为身份证号码1...17 位; Y_P为校验码Y所在校验码数组位置
 */
function validateIdCard(idCard) {
  //15位和18位身份证号码的正则表达式
  var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;

  var flag = false;
  //如果通过该验证，说明身份证格式正确，但准确性还需计算
  if (regIdCard.test(idCard)) {
    if (idCard.length == 18) {
      var idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); //将前17位加权因子保存在数组里
      var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
      var idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和
      for (var i = 0; i < 17; i++) {
        idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
      }
      var idCardMod = idCardWiSum % 11; //计算出校验码所在数组的位置
      var idCardLast = idCard.substring(17); //得到最后一位身份证号码
      //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
      if (idCardMod == 2) {
        if (idCardLast == "X" || idCardLast == "x") {
          flag = true;
          mui.alert("恭喜通过验证啦！");
        } else {
          mui.alert("身份证号码错误！");
        }
      } else {
        //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
        if (idCardLast == idCardY[idCardMod]) {
          flag = true;
          mui.alert("恭喜通过验证啦！");
        } else {
          mui.alert("身份证号码错误！");
        }
      }
    }
  } else {
    mui.alert("身份证格式不正确!");
  }
  return (flag)
}




function once(fn) {
  var result;

  return function () {
    if (fn) {
      result = fn.apply(this, arguments);
      fn = null;
    }
    return result;
  };
}


function getCount(str, arr) {
  var count = 0
  arr.forEach(function (item) {
    if (item.pitem == str) {
      count++
    }
  });
  return count
}