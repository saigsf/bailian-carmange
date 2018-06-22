/**
 * 演示程序当前的 “注册/登录” 等操作，是基于 “本地存储” 完成的
 * 当您要参考这个演示程序进行相关 app 的开发时，
 * 请注意将相关方法调整成 “基于服务端Service” 的实现。
 **/
(function ($, owner) {
	//***** 强制打开软键盘  Begin******  
	var _softKeyboardwebView, _imm, _InputMethodManager, _isKeyboardInited = false;
	// 打开软键盘  
	owner.initSoftKeyboard = function () {
		if (mui.os.ios) {
			_softKeyboardwebView = plus.webview.currentWebview().nativeInstanceObject();
		} else {
			_softKeyboardwebView = plus.android.currentWebview();
			plus.android.importClass(_softKeyboardwebView);
			_softKeyboardwebView.requestFocus();
			var Context = plus.android.importClass("android.content.Context");
			_InputMethodManager = plus.android.importClass("android.view.inputmethod.InputMethodManager");
			var main = plus.android.runtimeMainActivity();
			_imm = main.getSystemService(Context.INPUT_METHOD_SERVICE);
		}
		_isKeyboardInited = true;
	}

	// 打开软键盘  
	owner.openSoftKeyboard = function () {
		if (!_isKeyboardInited) {
			owner.initSoftKeyboard();
		}
		if (mui.os.ios) {
			_softKeyboardwebView.plusCallMethod({
				"setKeyboardDisplayRequiresUserAction": false
			});
		} else {
			_imm.toggleSoftInput(0, _InputMethodManager.SHOW_FORCED);
		}
	}

	// 控件获得焦点并弹出软键盘  
	// input：需要获得焦点的控件  
	owner.focusAndOpenKeyboard = function (input) {
		setTimeout(function () {
			input.focus();
			input.focus();
			owner.openSoftKeyboard();
		}, 200);
	}

	//***** 强制打开软键盘  End******  

	/**
	 * 用户登录
	 **/
	owner.login = function (loginInfo, callback) {
		callback = callback || $.noop;
		loginInfo = loginInfo || {};
		loginInfo.username = loginInfo.username || '';
		loginInfo.password = loginInfo.password || '';
		loginInfo.verifyCode = loginInfo.verifyCode || '';

		if (loginInfo.username.length < 5) {
			return callback('账号最短为 5 个字符');
		}
		if (loginInfo.password.length < 6) {
			return callback('密码最短为 6 个字符');
		}
		// if (!loginInfo.verifyCode) {
		// 	return callback('验证码不能为空')
		// }

		$.ajax({
			type: 'post',//HTTP请求类型
			url: BASE_URL_1 + 'car-management/user/login.action',
			data: {
				username: loginInfo.username,
				password: loginInfo.password,
				verifyCode: loginInfo.verifyCode
			},
			dataType: 'jsonp',//服务器返回json格式数据
			jsonp: "jsonCallback",
			// timeout: 10000,//超时时间设置为10秒；
			beforeSend: function () {
				console.log('beforesend!' + JSON.stringify(loginInfo))
				plus.nativeUI.showWaiting();
			},
			success: function (data) {
				//服务器返回响应，根据响应结果，分析是否登录成功；
				console.log(data)
				data = JSON.parse(data);
				if (data.ret) {
					$.toast(data.msg);
					owner.createState(data.data.username, loginInfo.password, callback);
				} else {
					$.toast(data.msg)
				}
			},
			error: function (xhr, type, errorThrown) {
				//异常处理；
				console.log(type);
				if (type == 'timeout') {
					$.toast("请求超时：请检查网络")
				} else {
					$.toast('请求失败：' + type + '\n err:' + errorThrown);
				}
			},
			complete: function () {
				console.log('userLogin:关闭转圈')
				plus.nativeUI.closeWaiting();
			}
		});


		// var users = JSON.parse(localStorage.getItem('$users') || '[]');
		// var authed = users.some(function (user) {
		// 	return loginInfo.account == user.account && loginInfo.password == user.password;
		// });
		// if (authed) {
		// 	return owner.createState(loginInfo.account, callback);
		// } else {
		// 	return callback('用户名或密码错误');
		// }
	};

	owner.createState = function (name, token, callback) {
		var state = owner.getState();
		state.account = name;
		state.token = token;
		owner.setState(state);
		return callback();
	};

	/**
	 * 新用户注册
	 **/
	owner.reg = function (regInfo, callback) {
		callback = callback || $.noop;
		regInfo = regInfo || {};
		regInfo.account = regInfo.account || '';
		regInfo.password = regInfo.password || '';
		if (regInfo.account.length < 5) {
			return callback('用户名最短需要 5 个字符');
		}
		if (regInfo.password.length < 6) {
			return callback('密码最短需要 6 个字符');
		}
		if (!checkEmail(regInfo.email)) {
			return callback('邮箱地址不合法');
		}
		var users = JSON.parse(localStorage.getItem('$users') || '[]');
		users.push(regInfo);
		localStorage.setItem('$users', JSON.stringify(users));
		return callback();
	};

	/**
	 * 获取当前状态
	 **/
	owner.getState = function () {
		var stateText = localStorage.getItem('$state') || "{}";
		return JSON.parse(stateText);
	};

	/**
	 * 设置当前状态
	 **/
	owner.setState = function (state) {
		state = state || {};
		localStorage.setItem('$state', JSON.stringify(state));
		var settings = owner.getSettings();
		settings.gestures = '';
		owner.setSettings(settings);
	};

	var checkEmail = function (email) {
		email = email || '';
		return (email.length > 3 && email.indexOf('@') > -1);
	};

	/**
	 * 找回密码
	 **/
	owner.forgetPassword = function (email, callback) {
		callback = callback || $.noop;
		if (!checkEmail(email)) {
			return callback('邮箱地址不合法');
		}
		return callback(null, '新的随机密码已经发送到您的邮箱，请查收邮件。');
	};

	/**
	 * 获取应用本地配置
	 **/
	owner.setSettings = function (settings) {
		settings = settings || {};
		localStorage.setItem('$settings', JSON.stringify(settings));
	}

	/**
	 * 设置应用本地配置
	 **/
	owner.getSettings = function () {
		var settingsText = localStorage.getItem('$settings') || "{}";
		return JSON.parse(settingsText);
	}
	/**
	 * 获取本地是否安装客户端
	 **/
	owner.isInstalled = function (id) {
		if (id === 'qihoo' && mui.os.plus) {
			return true;
		}
		if (mui.os.android) {
			var main = plus.android.runtimeMainActivity();
			var packageManager = main.getPackageManager();
			var PackageManager = plus.android.importClass(packageManager)
			var packageName = {
				"qq": "com.tencent.mobileqq",
				"weixin": "com.tencent.mm",
				"sinaweibo": "com.sina.weibo"
			}
			try {
				return packageManager.getPackageInfo(packageName[id], PackageManager.GET_ACTIVITIES);
			} catch (e) { }
		} else {
			switch (id) {
				case "qq":
					var TencentOAuth = plus.ios.import("TencentOAuth");
					return TencentOAuth.iphoneQQInstalled();
				case "weixin":
					var WXApi = plus.ios.import("WXApi");
					return WXApi.isWXAppInstalled()
				case "sinaweibo":
					var SinaAPI = plus.ios.import("WeiboSDK");
					return SinaAPI.isWeiboAppInstalled()
				default:
					break;
			}
		}
	}


	/**
	 * HTTP请求分装 跨域请求
	 * @param  type 请求方式
	 * @param  url 请求路径
	 * @param  data 请求参数
	 * @param  callback 回掉函数
	 */
	owner.HTTPRequest = function (type, url, data, callback, loading) {
		callback = callback || $.noop;
		$.ajax({
			type: type,//HTTP请求类型
			url: BASE_URL_1 + url,
			data: data,
			dataType: 'jsonp',//服务器返回json格式数据
			jsonp: "jsonCallback",
			beforeSend: function () {
				console.log('beforesend!');
				// loading && plus.nativeUI.showWaiting();
			},
			success: function (res) {
				//服务器返回响应，根据响应结果，分析是否登录成功；
				callback(res);
			},
			error: function (xhr, type, errorThrown) {
				//异常处理；
				console.log(xhr.status);
				if (type == 'timeout') {
					$.toast("请求超时：请检查网络")
				} else {
					$.toast('请求失败：' + xhr.status + '\n err:' + errorThrown);
				}
			},
			complete: function () {
				console.log('complete');
				// loading && plus.nativeUI.closeWaiting();
			}
		});
	}

	/**
	 * HTTP请求分装 跨域请求
	 * @param  type 请求方式
	 * @param  url 请求路径
	 * @param  data 请求参数
	 * @param  callback 回掉函数
	 */
	owner.HTTPRequestPost = function (type, url, data, callback) {
		callback = callback || $.noop;
		$.ajax({
			type: type,//HTTP请求类型
			url: BASE_URL_1 + url,
			data: data,
			contentType: 'application/json;charset=UTF-8', //contentType很重要 
			crossDomain: true,
			beforeSend: function () {
				console.log('beforesend!')
			},
			success: function (res) {
				//服务器返回响应，根据响应结果，分析是否登录成功；
				callback(res);
			},
			error: function (xhr, type, errorThrown) {
				//异常处理；
				console.log(xhr.status);
				if (type == 'timeout') {
					$.toast("请求超时：请检查网络")
				} else {
					$.toast('请求失败：' + xhr.status + '\n err:' + errorThrown);
				}
			},
			complete: function () {
				console.log('complete')
			}
		});
	}

	/**
	 * HTTP请求分装 不跨域请求
	 * @param {String} type 请求方式
	 * @param {String} url 请求路径
	 * @param {Object} data 请求参数
	 * @param {Function} callback 回掉函数
	 */
	owner.HttpRequestNonCrossDomain = function (type, url, data, callback) {
		callback = callback || $.noop;
		$.ajax({
			type: type,//HTTP请求类型
			url: BASE_URL_1 + url,
			data: data,
			beforeSend: function () {
				console.log('beforesend!')
			},
			success: function (res) {
				//服务器返回响应，根据响应结果，分析是否登录成功；
				callback(res);
			},
			error: function (xhr, type, errorThrown) {
				//异常处理；
				console.log(xhr.status);
				if (type == 'timeout') {
					$.toast("请求超时：请检查网络")
				} else {
					$.toast('请求失败：' + xhr.status + '\n err:' + errorThrown);
				}
			},
			complete: function () {
				console.log('complete')
			}
		});
	}




	/* ===============车辆 start==================== */

	/*  */
	/**
	 * 添加车辆录入
	 * 录入之前，先对参数进行校验，检查是否已存在；
	 * 如果存在，则不执行录入；反之，继续
	 **/
	owner.addTcar = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};
		//输入校验
		if (!data.vSn) {
			return mui.toast('车辆编号未填写');
		}
		if (!data.product_sn) {
			return mui.toast('项目编号未填写');
		}
		if (!data.engineNumber) {
			return mui.toast('发动机编号未填写');
		}
		if (!data.vin) {
			return mui.toast('车辆识别码未填写');
		}

		//数据校验
		owner.check({
			param: data.vSn,
			type: 1
		}, function (res) {
			res = JSON.parse(res);
			if (res.ret) {
				var url = 'car-management/tempcar/addTcar.action';
				owner.HTTPRequest('POST', url, data, callback)
			} else {
				mui.toast(res.msg);
			}

		});

		// callback()
	}

	/* 车辆参数校验 */
	owner.check = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/tempcar/check/' + data.param + '/' + data.type + '.action';

		owner.HTTPRequest('POST', url, data, callback)
	}

	/**
	 * 车辆分组获取
	 * @param data 请求参数
	 * @param callback 回掉函数
	 */
	owner.getGroup = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/group/getGroup.action';

		owner.HTTPRequest('POST', url, data, callback)
	}

	/**
	 * 获取车辆编号
	 * @param {json} data 请求参数	
	 * @param {Function} callback 回掉函数
	 */
	owner.getvSn = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/car/getvSn.action';

		owner.HTTPRequest('POST', url, data, callback)

	}

	/**
	 * 接车点检
	 * @param {json} data 请求参数	
	 * @param {Function} callback 回掉函数
	 */
	owner.upcheck = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};
		var checkArr = ['vSn', 'brandModelone', 'vin', 'odometer', 'send_p', 'engineNumber', 'telephone']
		var translateArr = [{
			name: 'vSn',
			value: '车辆编号不能为空'
		}, {
			name: 'brandModelone',
			value: '厂牌型号不能为空'
		}, {
			name: 'vin',
			value: '车架号不能为空'
		}, {
			name: 'odometer',
			value: '里程表不能为空'
		}, {
			name: 'send_p',
			value: '送车人不能为空'
		}, {
			name: 'engineNumber',
			value: '发动机号不能为空'
		}, {
			name: 'telephone',
			value: '送车人电话不能为空'
		}];


		var checkResult = hasEmptyValue(data, checkArr);
		if (checkResult) {
			console.log(translate(checkResult, translateArr))
			mui.toast(translate(checkResult, translateArr));
			return;
		}
		console.log(data)

		var url = 'car-management/car/upcheck.action';

		owner.HTTPRequest('POST', url, data, callback)

	}

	/**
	 * 接车点检更新
	 * @param {json} data 请求参数	
	 * @param {Function} callback 回掉函数
	 */
	owner.updateUpcheck = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};
		var checkArr = ['vSn', 'brandModelone', 'vin', 'odometer', 'send_p', 'engineNumber', 'telephone']
		var translateArr = [{
			name: 'vSn',
			value: '车辆编号不能为空'
		}, {
			name: 'brandModelone',
			value: '厂牌型号不能为空'
		}, {
			name: 'vin',
			value: '车架号不能为空'
		}, {
			name: 'odometer',
			value: '里程表不能为空'
		}, {
			name: 'send_p',
			value: '送车人不能为空'
		}, {
			name: 'engineNumber',
			value: '发动机号不能为空'
		}, {
			name: 'telephone',
			value: '送车人电话不能为空'
		}];

		var checkResult = hasEmptyValue(data, checkArr);
		if (checkResult) {
			mui.toast(translate(checkResult, translateArr));
			return;
		}

		var url = 'car-management/car/updateUpcheck.action';

		owner.HTTPRequest('POST', url, data, callback)

	}

	/**
	 * 接车点检信息查询
	 * @param {vSn} data 请求参数	
	 * @param {Function} callback 回掉函数
	 */
	owner.findUpcheck = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/car/findUpcheck/' + data.vSn + '.action';

		owner.HTTPRequestPost('POST', url, {}, callback)
	}

	/**
	 * BOM检查
	 * @param {JSON} data 请求参数	
	 * @param {Function} callback 回掉函数
	 */
	owner.addEmsAndBomCheck = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/car/addEmsAndBomCheck/' + data.vSn + '.action'

		owner.HTTPRequestPost('POST', url, data.emsAndBomCheckResults, callback)
	}

	/**
	 * BOM检查更新
	 * @param {JSON} data 请求参数	
	 * @param {Function} callback 回掉函数
	 */
	owner.updateEmsAndBomCheckByCar = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/car/updateEmsAndBomCheckByCar/' + data.vSn + '.action'

		owner.HTTPRequestPost('POST', url, data.emsAndBomCheckResults, callback)
	}

	/**
	 * BOM检查信息查看
	 * @param {JSON} data 请求参数	
	 * @param {Function} callback 回掉函数
	 */
	owner.findEmsAndBomCheckByvSn = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/car/findEmsAndBomCheckByvSn/' + data.vSn + '.action';

		owner.HTTPRequestPost('POST', url, {}, callback)
	}


	/**
	 * 线束检查
	 * @param {JSON} data 请求参数	
	 * @param {Function} callback 回掉函数
	 */
	owner.addHiCheck = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/car/addHiCheck/' + data.vSn + '.action';

		owner.HTTPRequestPost('POST', url, data.HIResults, callback)
	}

	/**
	 * 线束检查更新
	 * @param {JSON} data 请求参数	
	 * @param {Function} callback 回掉函数
	 */
	owner.updateHiCheckByvSn = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/car/updateHiCheckByvSn/' + data.vSn + '.action';

		owner.HTTPRequestPost('POST', url, data.HIResults, callback)
	}

	/**
	 * 线束检查查看
	 * @param {JSON} data 请求参数	
	 * @param {Function} callback 回掉函数
	 */
	owner.findHiCheckByvSn = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/car/findHiCheckByvSn/' + data.vSn + '.action';

		owner.HTTPRequestPost('POST', url, {}, callback)
	}

	/**
	 * 安全检查
	 * @param {JSON} data 请求参数	
	 * @param {Function} callback 回掉函数
	 * 
	 */
	owner.addSafeCheck = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/car/addSafeCheck/' + data.vSn + '.action';

		owner.HTTPRequestPost('POST', url, data.safeCheckResult, callback)
	}

	/**
	 * 安全检查更新
	 * @param {JSON} data 请求参数	
	 * @param {Function} callback 回掉函数
	 * 
	 */
	owner.updateSafeCheckByvSn = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/car/updateSafeCheckByvSn/' + data.vSn + '.action';

		owner.HTTPRequestPost('POST', url, data.safeCheckResult, callback)
	}

	/**
	 * 安全检查查看
	 * @param {JSON} data 请求参数	
	 * @param {Function} callback 回掉函数
	 */
	owner.findSafeCheckByvSn = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/car/findSafeCheckByvSn/' + data.vSn + '.action';

		owner.HTTPRequestPost('POST', url, {}, callback)
	}

	/**
	 * 缸压检查
	 * @param {JSON} data 请求参数	
	 * @param {Function} callback 回掉函数
	 */
	owner.saveClacyLindersss = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};
		var url = 'car-management/car/saveClacyLindersss.action';

		owner.HTTPRequestPost('POST', url, data, callback)
	}

	/**
	 * 缸压检查更新
	 * @param {JSON} data 请求参数	
	 * @param {Function} callback 回掉函数
	 */
	owner.updateCldCheckByvSn = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/car/updateCldCheckByvSn.action';

		owner.HTTPRequestPost('POST', url, data, callback)
	}

	/**
	 * 缸压检查查看
	 * @param {JSON} data 请求参数	
	 * @param {Function} callback 回掉函数
	 */
	owner.findCldCheckByvSn = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/car/findCldCheckByvSn/' + data.vSn + '.action';

		owner.HTTPRequestPost('POST', url, {}, callback)
	}

	/**
	 * 还车点检
	 * @param {JSON} data 请求参数	
	 * @param {Function} callback 回掉函数
	 */
	owner.backCheck = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};


		var checkArr = ['forpeople', 'trans_sn', 'pick_tel', 'proposer', 'pickone']
		var translateArr = [{
			name: 'forpeople',
			value: '交车人不能为空'
		}, {
			name: 'trans_sn',
			value: '运输号不能为空'
		}, {
			name: 'pick_tel',
			value: '接车人电话'
		}, {
			name: 'proposer',
			value: '还车申请人不能为空'
		}, {
			name: 'pickone',
			value: '接车人不能为空'
		}];

		var checkResult = hasEmptyValue(data, checkArr);
		if (checkResult) {
			mui.toast(translate(checkResult, translateArr));
			return;
		}

		var url = 'car-management/car/backCheck.action';

		owner.HTTPRequestPost('POST', url, data, callback)
	}

	/**
	 * 还车点检信息查询
	 * @param {JSON} data 请求参数	
	 * @param {Function} callback 回掉函数
	 */
	owner.findBackcheck = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/car/findBackcheck/' + data.vSn + '.action';

		owner.HTTPRequest('POST', url, {}, callback)
	}

	/**
	 * 审核
	 * @param {JSON} data 请求参数	
	 * @param {Function} callback 回掉函数
	 */
	owner.doReview = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/car/doReview.action';

		owner.HTTPRequest('POST', url, data, callback)
	}

	/**
	 * 审核信息查看
	 * @param {JSON} data 请求参数	
	 * @param {Function} callback 回掉函数
	 */
	owner.findReview = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/car/findReview.action';

		owner.HTTPRequest('POST', url, data, callback)
	}

	/**
	 * 获取审核视图
	 * @param {JSON} data 请求参数	
	 * @param {Function} callback 回掉函数
	 */
	owner.getReviewInfo = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/car/getReviewInfo/' + data.vSn + '.action';

		owner.HTTPRequestPost('POST', url, data, callback)
	}

	/**
	 * 查看车辆研发记录
	 * @param {JSON} data 请求参数	
	 * @param {Function} callback 回掉函数
	 */
	owner.findDevelop = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/car/findDevelop.action';

		owner.HTTPRequest('POST', url, data, callback)
	}

	/**
	 * 车辆录入
	 * @param {JSON} data 请求参数	
	 * @param {Function} callback 回掉函数
	 */
	owner.save = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var checkArr = [
			'carName',
			'vSn',
			'adminName',
			'seats',
			'vin',
			'color',
			'vCarType',
			'project_name',
			'price',
			'vehicleQuality',
			'projectEngineer',
			'engineNumber',
			'customer',
			'project_sn',
			'contactNumber',
		]
		var translateArr = [{
			name: 'carName',
			value: '车辆名称不能为空'
		}, {
			name: 'vSn',
			value: '车辆编号不能为空'
		}, {
			name: 'adminName',
			value: '车管不能为空'
		}, {
			name: 'seats',
			value: '座位数不可以为空'
		}, {
			name: 'vin',
			value: '车架号不能为空'
		}, {
			name: 'color',
			value: '车辆颜色不能为空'
		}, {
			name: 'vCarType',
			value: '车辆类型不能为空'
		}, {
			name: 'project_name',
			value: '项目名称不能为空'
		}, {
			name: 'price',
			value: '价值不能为空'
		}, {
			name: 'vehicleQuality',
			value: '吨位不能为空'
		}, {
			name: 'projectEngineer',
			value: '项目工程师不能为空'
		}, {
			name: 'engineNumber',
			value: '发动机编号不能为空'
		}, {
			name: 'customer',
			value: '客户不能不能为空'
		}, {
			name: 'project_sn',
			value: '项目号不能为空'
		}, {
			name: 'contactNumber',
			value: '联系电话不能为空'
		}];
		console.log(translateArr)

		var checkResult = hasEmptyValue(data, checkArr);
		if (checkResult) {
			mui.toast(translate(checkResult, translateArr));
			console.log(translate(checkResult, translateArr));
			return;
		}
		var url = 'car-management/car/save.action';

		owner.HTTPRequest('POST', url, data, callback)
	}

	/**
	 * 车辆录入查看
	 * @param {JSON} data 请求参数	
	 * @param {Function} callback 回掉函数
	 */
	owner.findAddCar = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/car/findAddCar.action';

		owner.HTTPRequest('POST', url, data, callback)
	}


	/**
	 * bom零部件查验
	 * @param {JSON} data 请求参数	
	 * @param {Function} callback 回掉函数
	 */
	owner.applybom = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/car/applybom.action';

		owner.HTTPRequestPost('POST', url, data, callback)
	}

	/**
	 * 研发工具安装申请
	 * @param {JSON} data 请求参数	
	 * @param {Function} callback 回掉函数
	 */
	owner.applytools = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/car/applytools.action';

		owner.HTTPRequestPost('POST', url, data, callback)
	}

	/**
	 * 研发工具安装查看
	 * @param {JSON} data 请求参数	
	 * @param {Function} callback 回掉函数
	 */
	owner.findDevelopTools = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/car/develop/find/'+ data.vSn +'.action';

		owner.HTTPRequestPost('POST', url, {}, callback)
	}

	/**
	 * 研发工具安装
	 * @param {JSON} data 请求参数	
	 * @param {Function} callback 回掉函数
	 */
	owner.developEquipment = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/car/develop/developEquipment.action';

		owner.HTTPRequestPost('POST', url, {}, callback)
	}



	/**
	 * 车辆列表
	 * @param {JSON} data 请求参数	
	 * @param {Function} callback 回掉函数
	 */
	owner.carQuery = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/car/pageQuery.action';

		owner.HTTPRequest('POST', url, data, callback)
	}

	/* ===============车辆 end=============== */
	/* ===============保险 start=============== */

	/**
	 * 保险列表
	 * @param {JSON} data 请求参数	
	 * @param {Function} callback 回掉函数
	 */
	owner.insuranceQuery = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/insurance/pageQuery.action';

		owner.HTTPRequest('POST', url, data, callback)
	}
	/**
	 * 保险查询
	 * @param {JSON} data 请求参数	
	 * @param {Function} callback 回掉函数
	 */
	owner.insuranceFindByvSn = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/insurance/findByvSn/' + data.vSn + '.action';

		owner.HTTPRequest('POST', url, {}, callback)
	}


	/* ===============保险 end=============== */
	/* ===============临牌 start=============== */

	/**
	 * 临牌列表
	 * @param {JSON} data 请求参数	
	 * @param {Function} callback 回掉函数
	 */
	owner.licenseQuery = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/license/pageQuery.action';

		owner.HTTPRequest('POST', url, data, callback)
	}

	/**
	 * 临牌信息查询
	 * @param {JSON} data 请求参数	
	 * @param {Function} callback 回掉函数
	 */
	owner.historyLicenseByvSn = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/license/historyLicenseByvSn.action';

		owner.HTTPRequest('POST', url, data, callback)
	}

	/* ===============临牌 end=============== */
	/* ===============项目相关 start=============== */
	
	/**
	 * 加载所有的项目名称
	 * @param {JSON} data 请求参数	
	 * @param {Function} callback 回掉函数
	 */
	owner.loadprojectName = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/project/loadprojectName.action';

		owner.HTTPRequest('POST', url, data, callback)
	}
	
	/**
	 * 通过项目号查询项目状态
	 * @param {JSON} data 请求参数	
	 * @param {Function} callback 回掉函数
	 */
	owner.loadStatusBySn = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/project/loadStatusBySn.action';

		owner.HTTPRequest('POST', url, data, callback)
	}
	
	/**
	 * 更新项目状态
	 * @param {JSON} data 请求参数	
	 * @param {Function} callback 回掉函数
	 */
	owner.updateStatus = function (data, callback) {
		callback = callback || $.noop;
		data = data || {
			projectSn: '',
			status: ''
		};

		var url = 'car-management/project/updateStatus.action';

		owner.HTTPRequest('POST', url, data, callback)
	}
	/* ===============项目相关 end=============== */

	/* ===============维修 start=============== */

	/**
	 * 维修申请
	 * @param {Object} data 请求参数
	 * @param {Function} callback 回掉函数
	 */
	owner.carMaintainApply = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};
		var checkArr = ['vSn', 'item', 'send_park'];
		var translateArr = [{
			name: 'vSn',
			value: '车辆编号不能为空'
		}, {
			name: 'item',
			value: '维修项目不能为空'
		}, {
			name: 'send_park',
			value: '停放地地点不能为空'
		}]

		var checkResult = hasEmptyValue(data, checkArr);
		if (checkResult) {
			mui.toast(translate(checkResult, translateArr));
			return;
		}
		var url = 'car-management/carmaintain/apply.action';
		owner.HTTPRequest('POST', url, data, callback)
	}

	/**
	 * 任务分配
	 * @param {Object} data 请求参数
	 * @param {Function} callback 回掉函数
	 */
	owner.carMaintainAssign = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var checkArr = ['vSn', 'workContent', 'operator'];
		var translateArr = [{
			name: 'vSn',
			value: '车辆编号不能为空'
		}, {
			name: 'operator',
			value: '操作人不能为空'
		}, {
			name: 'workContent',
			value: '工作内容不能为空'
		}]

		var checkResult = hasEmptyValue(data, checkArr);
		if (checkResult) {
			mui.toast(translate(checkResult, translateArr));
			return;
		}

		var url = 'car-management/carmaintain/assign.action';

		owner.HTTPRequest('post', url, data, callback)
	}

	/**
	 * 维修完成
	 * @param {Object} data 请求参数
	 * @param {Function} callback 回掉函数
	 */
	owner.carMaintainComplete = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		console.log(data)
		if (!data.fin_park) {
			mui.toast('请填写停放地点')
			return;
		}

		var url = 'car-management/carmaintain/complete.action';

		owner.HTTPRequest('post', url, data, callback)
	}

	/**
	 * 维修列表-查询-搜索
	 * @param {Object} data 请求参数
	 * @param {Function} callback 回掉函数
	 */
	owner.carMaintainQuery = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/carmaintain/query.action';

		owner.HTTPRequest('post', url, data, callback)
	}


	/**
	 * 维修列表置顶
	 * @param {Object} data 请求参数
	 * @param {Function} callback 回掉函数
	 */
	owner.carMaintainTop = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/carmaintain/top.action';

		owner.HTTPRequest('post', url, data, callback)
	}

	/**
	 * 维修工查询
	 * @param {Object} data 请求参数
	 * @param {Function} callback 回掉函数
	 */
	owner.carMaintainEmployee = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/carmaintain/employee.action';

		owner.HTTPRequest('post', url, data, callback)
	}

	/**
	 * 保养查询
	 * @param {Object} data 请求参数
	 * @param {Function} callback 回掉函数
	 */
	owner.getMaintenance = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/car/maintenance/getMaintenance.action';

		owner.HTTPRequest('post', url, data, callback)
	}

	/**
	 * 保养删除
	 * @param {Object} data 请求参数
	 * @param {Function} callback 回掉函数
	 */
	owner.deleteMaintenance = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/car/maintenance/delete.action';

		owner.HTTPRequest('post', url, data, callback)
	}

	/**
	 * 保存保养记录
	 * @param {Object} data 请求参数
	 * @param {Function} callback 回掉函数
	 */
	owner.saveMaintenance = function (data, callback) {
		var newData = {};

		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/car/maintenance/save/' + data.vSn + '/' + data.mm + '/' + data.nt + '.action';

		owner.HTTPRequestPost('post', url, data.maintenanceItems, callback)
	}




	/* ===============维修 end=============== */
	/* =================驾驶员 start====================== */
	/**
	 * 驾驶员列表
	 * @param {Object} data 请求参数
	 * @param {Function} callback 回掉函数
	 */
	owner.carDriverList = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};
		var url = 'car-management/driver/CarDriverList.action';

		owner.HttpRequestNonCrossDomain('post', url, data, callback)
	}

	/**
	 * 驾驶员添加
	 * @param {Object} data 请求参数
	 * @param {Function} callback 回掉函数
	 */
	owner.carDriverAdd = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};
		var startDate = (new Date()).format('yyyy-MM-dd');
		var year = new Date().getFullYear()
		var endDate = (new Date()).setFullYear(year + 1);

		var url = 'car-management/driver/add.action';


		if (data.isallow == '授权') {
			data.allowStartTime = startDate
			data.allowEndTime = (new Date(endDate)).format('yyyy-MM-dd')
		}

		owner.HttpRequestNonCrossDomain('post', url, data, callback)
	}

	/**
	 * 取消授权
	 * @param {Object} data 请求参数
	 * @param {Function} callback 回掉函数
	 */
	owner.cancelAuthorized = function (data, callback) {
		callback = callback || $.noop;
		data = data || {
			ids: 1
		};
		var url = 'car-management/driver/cancelAuthorized.action';

		owner.HTTPRequest('POST', url, data, callback)
	}

	/**
	 * 驾驶员授权
	 * @param {Object} data 请求参数
	 * @param {Function} callback 回掉函数
	 */
	owner.authorized = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/driver/authorized.action';

		owner.HTTPRequest('get', url, data, callback)
	}

	/**
	 * 驾驶员信息获取
	 * @param {Object} data 请求参数
	 * @param {Function} callback 回掉函数
	 */
	owner.carDriverEdit = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/driver/edit.action';

		owner.HttpRequestNonCrossDomain('GET', url, data, callback)
	}

	/**
	 * 驾驶员删除
	 * @param {Object} data 请求参数
	 * @param {Function} callback 回掉函数
	 */
	owner.carDriverDelete = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/driver/delete.action';

		owner.HttpRequestNonCrossDomain('post', url, data, callback)
	}

	/**
	 * 驾驶员更新
	 * @param {Object} data 请求参数
	 * @param {Function} callback 回掉函数
	 */
	owner.carDriverUpdate = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		console.log(data)

		var url = 'car-management/driver/update.action';

		// owner.HTTPRequest('post', url, data, callback)
	}

	/**
	 * 驾驶员分组管理-获取分组
	 * @param {Object} data 请求参数
	 * @param {Function} callback 回掉函数
	 */
	owner.carDriverGetGroup = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/driver/group/getGroup.action';

		owner.HttpRequestNonCrossDomain('get', url, data, callback)
	}

	/**
	 * 车辆出入
	 * @param {Object} data 请求参数
	 * @param {Function} callback 回掉函数
	 */
	owner.carInAndOutAll = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/inAndOut/all.action';

		owner.HTTPRequest('post', url, data, callback)
	}

	/**
	 * 车辆出入删除
	 * @param {Object} data 请求参数
	 * @param {Function} callback 回掉函数
	 */
	owner.carInAndOutDelete = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/inAndOut/delete.action';

		owner.HTTPRequest('post', url, data, callback)
	}


	/* =================驾驶员 end====================== */
	/* ================GPS地图数据获取================ */

	/**
	 * 所有车辆实时定位数据
	 * @param {Object} data 请求参数
	 * @param {Function} callback 回掉函数
	 */
	owner.allcar = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/car/allcar.action';

		owner.HTTPRequest('post', url, data, callback)
	}

	/**
	 * 单个车辆实时数据查询
	 * @param {Object} data 请求参数
	 * @param {Function} callback 回掉函数
	 */
	owner.carData = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/car/carDataByvSn.action';

		owner.HTTPRequest('post', url, data, callback)
	}

	/**
	 * 车辆历史轨迹数据
	 * @param {Object} data 请求参数
	 * @param {Function} callback 回掉函数
	 */
	owner.carTrack = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/car/carTrack.action';

		owner.HTTPRequest('post', url, data, callback)
	}

	/**
	 * 模糊匹配车辆编号
	 * @param {Object} data 请求参数
	 * @param {Function} callback 回掉函数
	 */
	owner.likevSn = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/car/likevSn.action';

		owner.HttpRequestNonCrossDomain('POST', url, data, callback)
	}








}(mui, window.app = {}));
