<!-- 账号密码登录页 -->
<template>
	<view class="uni-content">

		<!-- 顶部文字 -->
		<view class="title">
			<text class="title-box">{{isLogin ?'登录': '注册'}}</text>
		</view>

		<uni-forms class="uni-form-login">
			<uni-forms-item name="username">
				<uni-easyinput :focus="focusUsername" @blur="focusUsername = false" class="input-box"
					:inputBorder="false" v-model="username" placeholder="请输入用户名" />
			</uni-forms-item>
			<uni-forms-item name="password">
				<uni-easyinput :focus="focusPassword" @blur="focusPassword = false" class="input-box" clearable
					type="password" :inputBorder="false" v-model="password" placeholder="请输入密码" />
			</uni-forms-item>
			<uni-forms-item name="repassword" v-if="!isLogin">
				<uni-easyinput :focus="focusPassword" @blur="focusPassword = false" class="input-box" clearable
					type="password" :inputBorder="false" v-model="repassword" placeholder="请输入确认密码" />
			</uni-forms-item>
		</uni-forms>
		<uni-captcha v-if="needCaptcha" focus ref="captcha" scene="login-by-pwd" v-model="captcha" />
		<!-- 带选择框的隐私政策协议组件 -->
		<button class="uni-btn" type="primary" @click="pwdLogin">{{isLogin ?'登录': '注册'}}</button>
		<!-- 忘记密码 -->
		<view class="link-box">
			<view>
				<!-- 	<text class="forget">忘记了？</text>
				<text class="link" @click="toRetrievePwd">找回密码</text> -->
			</view>
			<text class="link" @click="changeType">{{isLogin ? '没有账号？去注册': '已有账号？去登陆'}}</text>
		</view>
	</view>
</template>

<script>
	import api from '@/http/ApiService.js'
	import dataManager from '@/manager/DataManager.js'
	import bus from '@/manager/BusManager.js'
	import checker from '@/utils/Checker.js'

	var self
	export default {
		data() {
			return {
				"password": "",
				"repassword": "",
				"username": "",
				"captcha": "",
				"needCaptcha": false,
				"focusUsername": false,
				"focusPassword": false,
				isLogin: true
			}
		},
		onLoad() {
			self = this
		},
		onShow() {

		},
		methods: {
			// 页面跳转，找回密码
			toRetrievePwd() {

			},
			/**
			 * 密码登录
			 */
			pwdLogin() {
				if (!this.password.length) {
					this.focusPassword = true
					return uni.showToast({
						title: '请输入密码',
						icon: 'none',
						duration: 3000
					});
				}
				if (!this.username.length) {
					this.focusUsername = true
					return uni.showToast({
						title: '请输入用户名',
						icon: 'none',
						duration: 3000
					});
				}
				if (this.needCaptcha && this.captcha.length != 4) {
					this.$refs.captcha.getImageCaptcha()
					return uni.showToast({
						title: '请输入验证码',
						icon: 'none',
						duration: 3000
					});
				}

				if (this.needAgreements && !this.agree) {
					return this.$refs.agreements.popup(this.pwdLogin)
				}

				let data =
					self.isLogin ? {
						"username": this.username,
						"password": this.password,
					} : {
						"username": this.username,
						"password": this.password,
						"repassword": this.repassword,
					}
				if (self.isLogin) {
					//登录
					self.login()

				} else {
					//注册
					self.register()
				}

			},
			/* 前往注册 */
			changeType() {
				self.isLogin = !self.isLogin
				uni.setNavigationBarTitle({
					title: self.isLogin ? "登录" : "注册"
				});
			},
			login() {
				api.login(self.username, self.password).then(res => {
					dataManager.saveUser(res)
					bus.emitLogin()
					uni.navigateBack({})
				})
			},
			register() {
				api.register(self.username, self.password, self.repassword).then(res => {
					self.login()
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@media screen and (min-width: 690px) {
		.uni-content {
			height: auto;

		}
	}

	.uni-content {
		padding: 30rpx;
	}

	.title {
		display: flex;
		margin-top: 200rpx;
		justify-content: center;
		text-align: center;
	}

	.title>text {
		font-weight: bold;
		font-size: 40rpx;
	}

	.uni-form-login {
		padding: 30rpx;
	}

	.input-box {
		border: 1rpx solid black;

	}



	.forget {
		font-size: 12px;
		color: #8a8f8b;
	}

	.link-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: space-between;
		margin-top: 20px;
	}

	.link {
		font-size: 12px;
		color: #8a8f8b;
	}
</style>