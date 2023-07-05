import dataManager from '@/manager/DataManager.js'

// 格式化字符串
const formatHtml = function(html) {
	let data = ''
	if (!isEmpty(html)) {
		var regSymbol = RegExp("&.*;")
		var regHtml = RegExp(/<[^>]*>/g);
		data = html.replace(regSymbol, '').replace(regHtml, '')
	}
	return data
}

// 是否是空字符串
const isEmpty = function(data) {
	return data == undefined || data == null || data == ""
}

// 是否是空列表
const isEmptyList = function(data) {
	return data == undefined || data == null || data.length == 0
}

// 格式化空数据
const orEmpty = function(data) {
	return isEmpty(data) ? '' : data
}

// toast弹窗
const toast = function(message) {
	if (!isEmpty(message)) {
		uni.showToast({
			title: message.toString(),
			icon: "none",
			duration: 1500
		})
	}
}

// 跳转到页面顶部
const pageScrollToTop = function() {
	uni.pageScrollTo({
		scrollTop: 0,
		duration: 200
	})
}
// 是否已经登录
const isLogined = function(toLogin = true) {
	let isUserInfoExit = !isEmpty(dataManager.getUser())
	let isCookieExit = !isEmpty(dataManager.getCookie())
	let login = isUserInfoExit && isCookieExit

	// #ifndef MP-WEIXIN
	login = isUserInfoExit
	// #endif

	// if (!login && toLogin) {
	// 	uni.navigateTo({
	// 		url: '/pages/mine/login/login'
	// 	})
	// }
	return login
}
// 跳转文章页面
const openLink = function(id, title, link) {
	if (!isEmpty(link)) {
		uni.navigateTo({
			url: `/pages/webview/webview?id=${id}&title=${title}&link=${link}`
		})
	}
}

function formatNum(num) {
	return num < 10 ? "0" + num : "" + num
}


const nowDate = function() {
	var date = new Date();
	var year = formatNum(date.getFullYear());
	var month = formatNum(date.getMonth() + 1);
	var day = formatNum(date.getDate());

	var hours = formatNum(date.getHours());
	var minutes = formatNum(date.getMinutes());
	var seconds = formatNum(date.getSeconds());

	let Y_CHN = year + "年"
	let YMD = year + "-" + month + "-" + day
	let YMD_CHN = year + "年" + month + "月" + day + "日"
	let YMDHM = year + "-" + month + "-" + day + " " + hours + ":" + minutes
	let YMDHM_CHN = year + "年" + month + "月" + day + "日 " + hours + "时" + minutes + "分"
	let YMDHMS = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds
	let YMDHMS_CHN = year + "年" + month + "月" + day + "日 " + hours + "时" + minutes + "分" + seconds + "秒"
	let MDHM = month + "-" + day + " " + hours + ":" + minutes
	let MDHM_CHN = month + "月" + day + "日 " + hours + "时" + minutes + "分"
	let HM = hours + ":" + minutes
	let HM_CHN = hours + "时" + minutes + "分"

	return {
		year: year,
		month: month,
		day: day,
		hours: hours,
		minutes: minutes,
		seconds: seconds,
		Y_CHN: Y_CHN,
		YMD: YMD,
		YMD_CHN: YMD_CHN,
		YMDHM: YMDHM,
		YMDHM_CHN: YMDHM_CHN,
		YMDHMS: YMDHMS,
		YMDHMS_CHN: YMDHMS_CHN,
		MDHM: MDHM,
		MDHM_CHN: MDHM_CHN,
		HM: HM,
		HM_CHN: HM_CHN
	}
}
module.exports = {
	formatHtml,
	isEmpty,
	isEmptyList,
	orEmpty,
	toast,
	nowDate,
	pageScrollToTop,
	openLink,
	isLogined
}