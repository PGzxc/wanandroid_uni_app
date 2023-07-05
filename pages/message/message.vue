<template>
	<view>
		<view class="uni-padding-wrap uni-common-mt">
			<uni-segmented-control :current="current" :values="items" :active-color="activeColor"
				@clickItem="onClickItem" />
		</view>
		<view class="content">
			<view v-if="current === 0"><text class="content-text">选项卡1的内容</text></view>
			<view v-if="current === 1"><text class="content-text">选项卡2的内容</text></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				items: ['未读消息列表', '已读消息列表'],
				current: 0,
				colorIndex: 0,
				activeColor: '#007aff',
			}
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
			},
		},
	}
</script>

<style>
	.uni-common-mt {
		margin-top: 30px;
	}

	.uni-padding-wrap {
		// width: 750rpx;
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