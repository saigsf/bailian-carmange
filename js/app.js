/**
 * 演示程序当前的 “注册/登录” 等操作，是基于 “本地存储” 完成的
 * 当您要参考这个演示程序进行相关 app 的开发时，
 * 请注意将相关方法调整成 “基于服务端Service” 的实现。
 **/
(function ($, owner) {
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
		if (!loginInfo.verifyCode) {
			return callback('验证码不能为空')
		}

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
					owner.createState(loginInfo.account, callback);
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

	owner.createState = function (name, callback) {
		var state = owner.getState();
		state.account = name;
		state.token = "token123456789";
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
		//var settings = owner.getSettings();
		//settings.gestures = '';
		//owner.setSettings(settings);
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
	 * HTTP请求分装
	 * @param  type 请求方式
	 * @param  url 请求路径
	 * @param  data 请求参数
	 * @param  callback 回掉函数
	 */
	owner.HTTPRequest = function (type, url, data, callback) {
		callback = callback || $.noop;
		$.ajax({
			type: type,//HTTP请求类型
			url: BASE_URL_1 + url,
			data: data,
			dataType: 'jsonp',//服务器返回json格式数据
			jsonp: "jsonCallback",
			beforeSend: function () {
				console.log('beforesend!' + JSON.stringify(data))
			},
			success: function (data) {
				//服务器返回响应，根据响应结果，分析是否登录成功；
				console.log(data)
				data = JSON.parse(data);
				if(data instanceof Array) {
					callback(data);
				} else if (data.ret) {
					$.toast(data.msg);
					callback(data.data);
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
				console.log('complete')
			}
		});
	}

		/**
	 * HTTP请求分装 post
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
			// dataType: 'jsonp',//服务器返回json格式数据
			// jsonp: "jsonCallback",
			contentType: 'application/json;charset=UTF-8', //contentType很重要 
      // crossDomain: true,
			// timeout: 10000,//超时时间设置为10秒；
			beforeSend: function () {
				console.log('beforesend!' + JSON.stringify(data))
			},
			success: function (data) {
				//服务器返回响应，根据响应结果，分析是否登录成功；
				console.log(data)
				callback(data);
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
				console.log('complete')
			}
		});
	}



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
		}, function () {
			
			var url = 'car-management/tempcar/addTcar.action';
			owner.HTTPRequest('POST', url, data, callback)
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

	/* 车辆分组加载 */
	owner.groupFind = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/group/find.action';

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

		var url = 'car-management/car/findAllParentItem.action';

		owner.HTTPRequest('POST', url, data, callback)
	}

	/**
	 * 
	 * @param {json} data 请求参数	
	 * @param {*} callback 回掉函数
	 * @name 接车点检
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
	 * @param {vSn} data 请求参数	
	 * @param {*} callback 回掉函数
	 * @name 接车点检信息查看
	 */
	owner.findUpcheck = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/car/findUpcheck.action';

		owner.HTTPRequest('POST', url, data, callback)
	}

	/**
	 * 
	 * @param {*} data 请求参数	
	 * @param {*} callback 回掉函数
	 * @name 安全检查
	 */
	owner.addSafeCheck = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/car/addSafeCheck/' + data.vSn + '.action';

		owner.HTTPRequestPost('POST', url, data.saftCheckResult, callback)
	}

	/**
	 * 
	 * @param {*} data 请求参数	
	 * @param {*} callback 回掉函数
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
	 * @param {*} data 请求参数	
	 * @param {*} callback 回掉函数
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
	 * @param {*} data 请求参数	
	 * @param {*} callback 回掉函数
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
	 * @param {*} data 请求参数	
	 * @param {*} callback 回掉函数
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
	 * @param {*} data 请求参数	
	 * @param {*} callback 回掉函数
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
	 * @param {*} data 请求参数	
	 * @param {*} callback 回掉函数
	 * @name BOM/EMS检查
	 */
	owner.addEmsAndBomCheck = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/car/addEmsAndBomCheck/' + data.vSn + '.action';

		owner.HTTPRequestPost('POST', url,  data.saftCheckResult, callback)
	}

	/**
	 * 
	 * @param {*} data 请求参数	
	 * @param {*} callback 回掉函数
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
	 * @param {*} data 请求参数	
	 * @param {*} callback 回掉函数
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
	 * @param {*} data 请求参数	
	 * @param {*} callback 回掉函数
	 * @name 车辆审核，审核不通过
	 */
	owner.notPassReview = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/car/notPassReview.action';

		owner.HTTPRequest('POST', url, data, callback)
	}

	/**
	 * 
	 * @param {*} data 请求参数	
	 * @param {*} callback 回掉函数
	 * @name 待审核列表
	 */
	owner.findWaitReviewCar = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/car/findWaitReviewCar.action';

		owner.HTTPRequest('POST', url, data, callback)
	}

	/**
	 * 
	 * @param {*} data 请求参数	
	 * @param {*} callback 回掉函数
	 * @name 已经完成的审核列表
	 */
	owner.findPassReview = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/car/findPassReview.action';

		owner.HTTPRequest('POST', url, data, callback)
	}

	/**
	 * 
	 * @param {*} data 请求参数	
	 * @param {*} callback 回掉函数
	 * @name 审核失败列表
	 */
	owner.findNotPassReview = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/car/findNotPassReview.action';

		owner.HTTPRequest('POST', url, data, callback)
	}

	/**
	 * 
	 * @param {*} data 请求参数	
	 * @param {*} callback 回掉函数
	 * @name 删除审核记录
	 */
	owner.deleteReview = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/car/deleteReview/' + data.id + '.action';

		owner.HTTPRequest('POST', url, data, callback)
	}

	/**
	 * 
	 * @param {*} data 请求参数	
	 * @param {*} callback 回掉函数
	 * @name 未完成车辆列表
	 */
	owner.vehicleQuery = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/tempcar/query.action';

		owner.HTTPRequest('POST', url, data, callback)
	}

	/**
	 * 
	 * @param {*} data 请求参数	
	 * @param {*} callback 回掉函数
	 * @name 车辆搜索
	 */
	owner.vehicleSearch = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/tempcar/query.action';

		owner.HTTPRequest('POST', url, data, callback)
	}

	/**
	 * 
	 * @param {*} data 请求参数	
	 * @param {*} callback 回掉函数
	 * @name 车辆删除
	 */
	owner.vehicleDelete = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/tempcar/query.action';

		owner.HTTPRequest('POST', url, data, callback)
	}

	/**
	 * 
	 * @param {*} data 请求参数	
	 * @param {*} callback 回掉函数
	 * @name 车辆列表
	 */
	owner.pageQuery = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/car/pageQuery.action';

		owner.HTTPRequest('POST', url, data, callback)
	}

	/**
	 * 
	 * @param {*} data 请求参数	
	 * @param {*} callback 回掉函数
	 * @name 车辆列表删除
	 */
	owner.delete = function (data, callback) {
		callback = callback || $.noop;
		data = data || {};

		var url = 'car-management/car/delete.action';

		owner.HTTPRequest('POST', url, data, callback)
	}

}(mui, window.app = {}));