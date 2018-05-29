var BASE_URL_1 = 'http://192.168.0.222:8080/';
// var BASE_URL_1 = 'http://36.110.56.189:8848/';
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

  if(!deep) {
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
var isEmpty = function(object) {
  for (const key in object) {
    return false;
  }
  return true
}

/**
 * 对象是否含有空值,检查指定值是否为空
 * @param {Object} object 
 */
var hasEmptyValue = function(object, arr) {
  var flag = 0;
  if(arr && arr.length>0) {
    for (const key in object) {
      if (object.hasOwnProperty(key) && arr.contains(key)) {
        const element = object[key];
        if(!element) {
          flag = 1
        }
      }
    }
  } else {
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        const element = object[key];
        if(!element) {
          flag = 1
        }
      }
    }
  }
  
  return !!flag;
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
