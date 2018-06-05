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
		console.log(type)
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
	 * 检查类型字典
	 * @param data 请求参数
	 * @param callback 回掉函数
	 */
	owner.findAllCheckName = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/car/findAllCheckName.action';

		owner.HTTPRequest('POST', url, data, callback)
	}

	/**
	 * 获取某一检查的所有检查项
	 * @param data 请求参数	
	 * @param callback 回掉函数
	 */
	owner.findAllParentItem = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/car/findAllParentItem.action?CNID=' + data.CNID;

		owner.HTTPRequest('POST', url, {
			param: data.param,
			type: data.type
		}, callback)
	}

	/**
	 * 接车点检
	 * @param {json} data 请求参数	
	 * @param {Function} callback 回掉函数
	 */
	owner.upcheck = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};
		//输入校验
		if (!data.vSn) {
			return mui.toast('车辆编号未填写');
		}
		if (!data.engineNumber) {
			return mui.toast('发动机编号未填写');
		}
		if (!data.vin) {
			return mui.toast('车辆识别码未填写');
		}
		if (!data.send_p) {
			return mui.toast('送车人未填写');
		}
		if (!data.pickone) {
			return mui.toast('接车人未填写');
		}
		if (!data.telephone) {
			return mui.toast('电话未填写');
		}

		var url = 'car-management/car/upcheck.action';

		owner.HTTPRequest('POST', url, data, callback)

		// callback()
	}

	/**
	 * 接车点检信息查看
	 * @param {vSn} data 请求参数	
	 * @param {Function} callback 回掉函数
	 */
	owner.findUpcheck = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/car/findUpcheck.action';

		owner.HTTPRequest('POST', url, data, callback)
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

		owner.HTTPRequestPost('POST', url, data.saftCheckResult, callback)
	}

	/**
	 * 
	 * @param {JSON} data 请求参数	
	 * @param {Function} callback 回掉函数
	 * @name 安全检查查看
	 */
	owner.findSafeCheckByCar = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/car/findSafeCheckByCar/' + data.vSn + '.action';

		owner.HTTPRequestPost('POST', url, data, callback)
	}

	/**
	 * 
	 * @param {JSON} data 请求参数	
	 * @param {Function} callback 回掉函数
	 * @name 缸压检查
	 */
	owner.saveClacyLindersss = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/car/saveClacyLindersss/' + data.vSn + '.action';

		owner.HTTPRequestPost('POST', url, data, callback)
	}

	/**
	 * 
	 * @param {JSON} data 请求参数	
	 * @param {Function} callback 回掉函数
	 * @name 缸压检查查看
	 */
	owner.findCldCheckByCar = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/car/findCldCheckByCar/' + data.vSn + '.action';

		owner.HTTPRequestPost('POST', url, data, callback)
	}

	/**
	 * 
	 * @param {JSON} data 请求参数	
	 * @param {Function} callback 回掉函数
	 * @name 线束检查
	 */
	owner.addHiCheck = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/car/addHiCheck/' + data.vSn + '.action';

		owner.HTTPRequestPost('POST', url, data.saftCheckResult, callback)
	}

	/**
	 * 
	 * @param {JSON} data 请求参数	
	 * @param {Function} callback 回掉函数
	 * @name 线束检查查看
	 */
	owner.findHiCheckByCar = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/car/findHiCheckByCar/' + data.vSn + '.action';

		owner.HTTPRequestPost('POST', url, data, callback)
	}

	/**
	 * 
	 * @param {JSON} data 请求参数	
	 * @param {Function} callback 回掉函数
	 * @name BOM/EMS检查
	 */
	owner.addEmsAndBomCheck = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/car/addEmsAndBomCheck/' + data.vSn + '.action';

		owner.HTTPRequestPost('POST', url, data.saftCheckResult, callback)
	}

	/**
	 * 
	 * @param {JSON} data 请求参数	
	 * @param {Function} callback 回掉函数
	 * @name BOM/EMS检查查看
	 */
	owner.findEmsAndBomCheckByCar = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/car/findEmsAndBomCheckByCar/' + data.vSn + '.action';

		owner.HTTPRequestPost('POST', url, data, callback)
	}

	/**
	 * 
	 * @param {JSON} data 请求参数	
	 * @param {Function} callback 回掉函数
	 * @name 车辆审核，审核通过
	 */
	owner.passReview = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/car/passReview.action';

		owner.HTTPRequest('POST', url, data, callback)
	}

	/**
	 * 
	 * @param {JSON} data 请求参数	
	 * @param {Function} callback 回掉函数
	 * @name 车辆审核，审核不通过
	 */
	owner.notPassReview = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/car/notPassReview.action';

		owner.HTTPRequest('POST', url, data, callback)
	}

	/**
	 * 待审核列表
	 * @param {JSON} data 请求参数	
	 * @param {Function} callback 回掉函数
	 */
	owner.findWaitReviewCar = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/car/findWaitReviewCar.action';

		owner.HTTPRequest('POST', url, data, callback)
	}

	/**
	 * 已经完成的审核列表
	 * @param {JSON} data 请求参数	
	 * @param {Function} callback 回掉函数
	 */
	owner.findPassReview = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/car/findPassReview.action';

		owner.HTTPRequest('POST', url, data, callback)
	}

	/**
	 * 审核失败列表
	 * @param {JSON} data 请求参数	
	 * @param {Function} callback 回掉函数
	 */
	owner.findNotPassReview = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/car/findNotPassReview.action';

		owner.HTTPRequest('POST', url, data, callback)
	}

	/**
	 * 删除审核记录
	 * @param {JSON} data 请求参数	
	 * @param {Function} callback 回掉函数
	 */
	owner.deleteReview = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/car/deleteReview/' + data.id + '.action';

		owner.HTTPRequest('POST', url, data, callback)
	}

	/**
	 * 
	 * @param {JSON} data 请求参数	
	 * @param {Function} callback 回掉函数
	 * @name 未完成车辆列表
	 */
	owner.vehicleQuery = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/tempcar/query.action';

		data = JSON.stringify(data)

		owner.HTTPRequestPost('POST', url, data, callback)
	}

	/**
	 * 车辆搜索
	 * @param {JSON} data 请求参数	
	 * @param {Function} callback 回掉函数
	 */
	owner.vehicleSearch = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/tempcar/query.action';

		data = JSON.stringify(data);
		console.log(data)
		owner.HTTPRequestPost('POST', url, data, callback)
	}

	/**
	 * 车辆删除
	 * @param {JSON} data 请求参数	
	 * @param {Function} callback 回掉函数
	 */
	owner.vehicleDelete = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/tempcar/delete.action';

		// data = JSON.stringify(data)
		owner.HTTPRequest('POST', url, data, callback)
	}

	/**
	 * 
	 * @param {JSON} data 请求参数	
	 * @param {Function} callback 回掉函数
	 * @name 车辆列表
	 */
	owner.pageQuery = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/car/pageQuery.action';

		owner.HTTPRequest('POST', url, data, callback, true)
	}

	/**
	 * 车辆列表删除
	 * @param {JSON} data 请求参数	
	 * @param {Function} callback 回掉函数
	 */
	owner.delete = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/car/delete.action';

		owner.HTTPRequest('POST', url, data, callback)
	}

	/* ===============车辆 end=============== */
	/* ===============保险 start=============== */
	/**
	 * 保险申请
	 * @param {JSON} data 请求参数	
	 * @param {Function} callback 回掉函数
	 */
	owner.insuranceApply = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};
		data.vSns = data.vSns.split(',');

		var url = 'car-management/insurance/apply.action';

		owner.HTTPRequest('POST', url, data, callback)
	}
	/**
	 * 保险录入
	 * @param {JSON} data 请求参数	
	 * @param {Function} callback 回掉函数
	 */
	owner.insuranceAdd = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/insurance/addInsurance.action';

		owner.HTTPRequest('POST', url, data, callback)
	}
	/**
	 * 续保
	 * @param {JSON} data 请求参数	
	 * @param {Function} callback 回掉函数
	 */
	owner.insuranceLast = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/insurance/lastInsurance.action';

		owner.HTTPRequest('POST', url, data, callback)
	}
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

		var url = 'car-management/insurance/findByvSn/'+data.vSn+'.action';

		owner.HTTPRequest('POST', url, {}, callback)
	}


	/* ===============保险 end=============== */
	/* ===============维修 start=============== */

	/**
	 * 维修申请
	 * @param {Object} data 请求参数
	 * @param {Function} callback 回掉函数
	 */
	owner.carMaintainApply = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};
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
		var endDate = (new Date()).setFullYear(year+1);

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

		owner.HttpRequestNonCrossDomain('get', url, data, callback)
	}

	/**
	 * 单个车辆实时数据查询
	 * @param {Object} data 请求参数
	 * @param {Function} callback 回掉函数
	 */
	owner.carData = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/car/carData.action';

		owner.HttpRequestNonCrossDomain('get', url, data, callback)
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

		owner.HTTPRequest('get', url, data, callback)
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
