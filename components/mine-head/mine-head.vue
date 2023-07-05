<template>
	<view class="mine-head">
		<!--head-->
		<view class="mine-head-user" @click="clickLogin">
			<uni-icons type="contact" size="60" class="mine-head-user-head" />
			<text>{{isLogin? username:'欢迎登陆'}}</text>
			<uni-icons type="forward" size="20" class="mine-head-user-right" />
		</view>
		<!--info-->
		<view class="mine-head-info">
			<view class="mine-head-info-level">
				<view class="">等级</view>
				<view class="">{{isLogin ? level: '——'}}</view>
			</view>
			<view class="mine-head-info-rank">
				<view class="">排名</view>
				<view class="">{{isLogin ? rank: '——'}}</view>
			</view>
			<view class="mine-head-info-collect">
				<view class="">收藏</view>
				<view class="">{{isLogin ? total: '——'}}</view>
			</view>
			<view class="mine-head-info-coin">
				<view class="">积分</view>
				<view class="">{{isLogin ? coinCount: '——'}}</view>
			</view>

		</view>
	</view>
</template>

<script>
	import dataManager, {
		isLogin
	} from '@/manager/DataManager.js'
	import utils from '@/utils/Utils.js'
	export default {
		name: "mine-head",
		data() {
			return {
				isLogin: false,
				level: '',
				rank: '',
				coinCount: '',
				total: '',
				username: ''
			}
		},
		onLoad() {
			isLogin: utils.isLogined()
		},
		methods: {
			setHead(data) {
				this.isLogin = utils.isLogined()
				this.level = data.level
				this.rank = data.rank
				this.coinCount = data.coinCount
				this.total = data.total
				this.username = data.username
			},
			clickLogin() {
				if (!utils.isLogined()) {
					uni.navigateTo({
						url: `/pages/mine/login/login`
					})
				}
			}
		}
	}
</script>

<style>
	.mine-head {
		display: flex;
		flex-direction: column;
		padding: 20rpx;
	}

	.mine-head-user {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.mine-head-user-head {
		text-align: left;
	}

	.mine-head-user-right {
		text-align: right;
	}

	.mine-head-user text {
		flex-grow: 1;
	}

	.mine-head-info {
		display: flex;
		flex-direction: row;
	}

	.mine-head-info>view {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 10rpx;
	}

	.mine-head-info>view>view:first-child {
		font-style: normal;
		font-size: 30rpx;
		text-decoration: black;
		font-weight: bold;

	}
</style>