// var BASE_URL_1 = 'http://192.168.0.222:8080/';
var BASE_URL_1 = 'http://36.110.56.189:8848/';
// var BASE_URL_1 = 'http://47.98.182.165/';


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
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(format))
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
  }

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
    for (let i = 0; i < str.length; i++) {
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
    for (const key in object) {
      if (object.hasOwnProperty(key) && arr.contains(key)) {
        const element = object[key];
        if (!element) {
          flag = 1;
          emptyArr.push(key);
        }
      }
    }
  } else {
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        const element = object[key];
        if (!element) {
          flag = 1;
          emptyArr.push(key);
        }
      }
    }
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

  for (let i = 0; i < subArr.length; i++) {
    const item = subArr[i];
    if (length == 0) {
      arr.push(item);
    } else {
      for (let j = 0; j < arr.length; j++) {
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

  for (let i = 0; i < before.length; i++) {
    const item = before[i];

    for (let j = 0; j < standard.length; j++) {
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
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const item = obj[key];
      if (typeof item == 'Number') {
        obj[key] = Math.floor(item);
      }
    }
  }
  return obj;
}

// 数据回显
function dataRetrieval(data) {
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const item = data[key];
      if (typeof item == 'object') {
        for (const keys in item) {
          if (item.hasOwnProperty(keys)) {
            const element = item[keys];
            $('#' + keys + '_0').html(element ? element : '-');
            $('#' + keys).html(element ? element : '-');
          }
        }
      } else {
        $('#' + key + '_0').html(item ? item : '-');
        $('#' + key).html(item ? item : '-');
        $('#' + key).val(item ? item : '-');
      }
    }
  }
}


// 数组中对象的值等于当前值的个数
var findNum = function (arr, value) {
  var flag = 0;
  for (let i = 0; i < arr.length; i++) {
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




  ; (function ($) {
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




// if (window.history && window.history.pushState) {
//   $(window).on('popstate', function () {
//     var hashLocation = location.hash; 
//     var hashSplit = hashLocation.split("#!/");
//     var hashName = hashSplit[1];
//     console.log(hashName)
//     if (hashName !== '') { 
//       var hash = window.location.hash; 
//       if (hash === '') { 
//         alert('后退按钮点击'); 

//       } 
//     }
//   });
//   window.history.pushState('forward', null, './#forward');
// }
