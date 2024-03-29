import Request from 'luch-request'
import utils from '@/utils/Utils.js'
import dataManager from '@/manager/DataManager.js'
import router from '@/http/Router.js'


const http = new Request({
	// #ifdef H5
	baseURL: 'api/',
	// #endif
	// #ifndef H5
	baseURL: 'https://www.wanandroid.com/',
	// #endif

})

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
		http.request({
			method: method,
			header: header,
			url: path,
			params: params,
			withCredentials: true,
		}).then(res => {
			console.log('request success', res);
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
		])
	},
	getSystemArticle: (cid, page) => {
		return get(`article/list/${page}/json`, {
			cid: cid
		})
	},
	getCoinInfo: () => {
		return Promise.all([
			getNoCheck('lg/collect/list/0/json'),
			getNoCheck('lg/coin/userinfo/json')
		])
	},
	coinRank: (page) => {
		return get(`coin/rank/${page}/json`)
	},
	getMessageRead: (page) => {
		return get(`message/lg/readed_list/${page}/json`)
	},
	getMessageUnRead: (page) => {
		return get(`message/lg/unread_list/${page}/json`)
	}

}