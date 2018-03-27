
var BASE_URL = 'http://120.131.5.162/shouguang'; // 线上服务器地址


// 检测是否为空对象
var isEmptyObject = function (obj) {

	for (var attr in obj) {

		return false;
	}

	return true;
};

/**
 * 数字格式化
 * @param number 原始数据
 * @param decimals 小数位数
 * @param decPoint 整数与小数之间分隔符
 * @param thousandsSep 千分符
 */
function numberFormat(number, decimals, decPoint, thousandsSep) {

	number = (number + '').replace(/[^0-9+\-Ee.]/g, '');

	var n = !isFinite(+number) ? 0 : +number,
		prec = !isFinite(+decimals) ? 2 : Math.abs(decimals),
		sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep,
		dec = (typeof decPoint === 'undefined') ? '.' : decPoint,
		s,
		toFixedFix = function (x, y) {
			var k = Math.pow(10, prec);
			return '' + (Math.round(x * k) / k).toFixed(y);
		};

	// Fix for IE parseFloat(0.55).toFixed(0) = 0;
	s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');

	if (s[0].length > 3) {
		s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
	}

	if ((s[1] || '').length < prec) {
		s[1] = s[1] || '';
		s[1] += new Array(prec - s[1].length + 1).join('0');
	}
	
	return s.join(dec);
}

function randomRange(min, max) {
	if (!max) {
		max = min;
		min = 0;
	}
	return Math.floor(Math.random() * (max - min) + min);
}

