import  utils from '@/utils/Utils.js'
import  dataManager from '@/manager/DataManager.js'
import  router from '@/http/Router.js'


const request = function(method, path, params, showLoading, checkError) {
	if (showLoading) {
		uni.showLoading({
			title: '加载中'
		})
	}
	let header = {}
	if (!utils.isEmpty(dataManager.getCookie())) {
		header = {
			'cookie': dataManager.getCookie()
		}
	}

	return new Promise((resolve, reject) => {
		uni.request({
			method: method,
			header: header,
			url: router.baseURL + path,
			params: params,
		}).then(res => {
			let cookie = res.header["Set-Cookie"]
			if (!utils.isEmpty(cookie)) {
				dataManager.saveCookie(cookie)
			}
			if (showLoading) uni.hideLoading()
			if (res.statusCode == 200) {
				if (res.data.errorCode == 0) {
					resolve(res.data.data)
				} else if (res.data.errorCode == -1001) {
					// 只要登录失效了 那么就清除缓存
					dataManager.clear()
					if (checkError) {
						utils.toast(res.data.errorMsg)
						uni.navigateTo({
							url: '/pages/mine/login/login'
						})
					}
				} else {
					if (checkError) {
						utils.toast(res.data.errorMsg)
					}
				}
			} else {
				reject()
			}
		}).catch(err => {
			if (showLoading) uni.hideLoading()
			reject(err)
		})
	})
}

const get = function(path) {
	return request('GET', path, {}, true, true)
}

const getParams = function(path, params) {
	return request('GET', path, params, true, true)
}

const getNoLoading = function(path) {
	return request('GET', path, {}, false, true)
}

const getNoCheck = function(path) {
	return request('GET', path, {}, false, false)
}

const post = function(path, params) {
	return request('POST', path, params, true, true)
}

const postNoLoading = function(path, params) {
	return request('POST', path, params, false, true)
}

module.exports = {
	login: (account, pwd) => {
		return post(router.login, {
			username: account,
			password: pwd
		}, true)
	},
	register: (account, pwd, repwd) => {
		return post(router.register, {
			username: account,
			password: pwd,
			repassword: repwd
		})
	},
	loginOut: () => {
		return get(router.loginOut)
	},
	getHomeData: () => {
		return Promise.all([
			get(router.homeBanner), 
			get(router.homeArticles)
		])
	},
	getHomeArticles: (page) => {
		return get(`article/list/${page}/json`)
	},
	getProjectTree: () => {
		return get('project/tree/json')
	},
	getProjectArticle: (page, cid) => {
		return getParams(`project/list/${page}/json`, {
			cid: cid
		})
	},
	getSystemAndNaviTree: () => {
		return Promise.all([
			get('tree/json'),
			get('navi/json')
		])
	},
	getSystemArticle: (cid, page) => {
		return get(`article/list/${page}/json`, {
			cid: cid
		})
	},
	coinRank: (page) => {
		return get(`coin/rank/${page}/json`)
	},
}