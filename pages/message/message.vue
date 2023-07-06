<template>
	<view class="page">
		<view class="tab-box sticky">
			<view class="uni-padding-wrap uni-common-mt">
				<uni-segmented-control :current="current" :values="items" :active-color="activeColor"
					@clickItem="onClickItem" />
			</view>
		</view>

		<view style="height: 100vh;width: 100%;">
			<view v-if="current === 0"><message-list :data="messageUnReadList" /></view>
			<view v-if="current === 1"><message-list :data="messageReadList" /></view>
		</view>

	</view>
</template>

<script>
	import utils from '@/utils/Utils.js'
	import api from '@/http/ApiService.js'
	import dataManager from '@/manager/DataManager.js'
	import bus from '@/manager/BusManager.js'
	var self
	export default {
		data() {
			return {
				items: ['未读消息列表', '已读消息列表'],
				current: 0,
				colorIndex: 0,
				activeColor: '#007aff',
				page: 0,
				// 是否继续加载下一页
				enableLoadMore: false,
				messageUnReadList: [],
				messageReadList: []
			}
		},
		onLoad() {
			self = this
			self.getMessageOnCurrent()
		},
		onPullDownRefresh() {
			self.page = 1
			self.getMessageOnCurrent()
		},
		onReachBottom() {
			if (self.enableLoadMore) self.getMessageOnCurrent()
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
					self.getMessageOnCurrent()
				}
			},
			getMessageOnCurrent() {
				if (this.current == 0) {
					self.getMessageUnRead()
				} else {
					self.getMessageRead()
				}
			},
			getMessageRead() {
				api.getMessageRead(self.page).then(res => {
					uni.stopPullDownRefresh()
					self.messageReadList = self.messageReadList.concat(res.datas.map(item => {
						return {
							fromUser: item.fromUser,
							message: item.message,
							niceDate: item.niceDate,
							tag: item.tag,
							title: item.title
						}
					}))
					// 判断是否可以继续加载下一页
					self.enableLoadMore = res.over == false
					self.page++

				})
			},
			getMessageUnRead() {
				api.getMessageUnRead(self.page).then(res => {
					uni.stopPullDownRefresh()
					self.messageUnReadList = self.messageUnReadList.concat(res.datas.map(item => {
						return {
							fromUser: item.fromUser,
							message: item.message,
							niceDate: item.niceDate,
							tag: item.tag,
							title: item.title,

						}
					}))
					// 判断是否可以继续加载下一页
					self.enableLoadMore = res.over == false
					self.page++
				})
			}
		},
	}
</script>

<style>
	.page {
		position: relative;
		width: 100vw;
		height: 100vh;
		margin: auto;
		overflow: scroll;
		line-height: 32px;
	}

	.tab-box {
		display: flex;
		height: 150rpx;
		width: 100vw;
		background: #ffffff;
		align-items: center;
		justify-content: center;
		position: sticky;
		top: 0px;
	}

	.tab-container {
		width: 500rpx;
		height: 100%;
		height: 74rpx;
		align-self: center;
		border-radius: 10rpx;
		border: solid #000000 1rpx;
	}

	.uni-common-mt {
		margin-top: 10rpx;
		margin-bottom: 10rpx;

	}

	.uni-padding-wrap {
		width: 750rpx;
		padding: 0px 30px;
	}

	.content {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: center;
		align-items: center;
		height: 150px;
		text-align: center;
	}

	.content-text {
		font-size: 14px;
		color: #666;
	}
</style>