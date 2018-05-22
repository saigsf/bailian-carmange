// var BASE_URL_1 = 'http://192.168.0.222:8080/';
// var BASE_URL_1 = 'http://36.110.56.189:8848/';
var BASE_URL_1 = 'http://47.98.182.165/';


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
