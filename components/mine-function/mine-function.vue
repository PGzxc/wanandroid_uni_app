<template>
	<view class="mine-function-page">
		<text>常用功能</text>
		<uni-grid :column="3" :highlight="true">
			<uni-grid-item v-for="(item, index) in list" :index="index" :key="index">
				<view class="grid-item-box" v-bind:style="'background-color:'+item.background"
					@click="onItemClick(item)">
					<text class="text">{{ item.text }}</text>
				</view>
			</uni-grid-item>
		</uni-grid>
	</view>
</template>

<script>
	export default {
		name: "mine-function",
		data() {
			return {
				list: [{
						text: '工具',
						background: 'royalblue'

					},
					{
						text: '问答',
						background: 'rebeccapurple'
					},
					{
						text: '消息',
						background: 'green'
					},
					{
						text: '课程',
						background: 'skyblue'
					},
					{
						text: '待办清单',
						background: 'darkorange'
					},
					{
						text: '分享文章',
						background: 'firebrick'
					},
					{
						text: '分享项目',
						background: 'darkcyan'
					},
					{
						text: '公众号',
						background: 'gray'
					},

				]
			}
		},
		methods: {
			onItemClick(item) {
				console.log(item)
			}
		}
	}
</script>

<style>
	.mine-function-page {
		display: flex;
		flex-direction: column;
	}

	.mine-function-page>text {
		color: #007AFF;
		text-decoration: underline; //设置下划线
		text-underline-offset: 10rpx; //下划线和文字间距		
		margin: 20rpx;
		font-weight: bold;
		font-size: 36rpx;
		color: black;
	}

	,
	.grid-item-box {
		flex: 1;
		// position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 15px 0;
	}
</style>