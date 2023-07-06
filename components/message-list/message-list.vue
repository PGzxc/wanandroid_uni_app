<template>
	<view class="message-item-container" v-if="data!=undefined&&data!=null&&data.length>0">

		<view class="vertical" v-for="(item,index) in data" :key="item.id" @click="contentClick(index)">
			<!--第1行-->
			<view class="message-item-header">
				<view class="message-item-head-tag">
					<uni-icons type="person" size="20"></uni-icons>
					<text>{{author(item)}}</text>
				</view>
				<text class="message-item-head-tag" v-if="hasTag(item)">{{tag(item)}}</text>

				<view class="message-item-header-right">
					<uni-icons type="calendar" size="20"></uni-icons>
					<text>{{niceDate(item)}}</text>
				</view>
			</view>
			<!--第2行-->
			<view class="message-item-middle">
				<view>{{title(item)}}</view>
			</view>
			<!--第3行-->
			<view class="message-item-end">
				<view>{{message(item)}}</view>
			</view>
			<view class="line10" />
		</view>

	</view>
	<view v-else class="message-no-data">暂时没有数据</view>
</template>

<script>
	import utils from '@/utils/Utils.js'
	export default {
		name: "message-list",
		props: {
			data: {
				type: Array,
				default: () => []
			}
		},
		// data() {
		// 	return {
		// 		data: []
		// 	}
		// },
		methods: {
			formatData(message) {
				return message
			},
			setData(message) {
				this.data = this.formatData(message)
			},
			addData(message) {
				this.data = this.data.concat(this.formatData(message))
			},
			author(item) {
				return utils.isEmpty(item.fromUser) ? '' : item.fromUser
			},
			hasTag(item) {
				return !utils.isEmpty(item.tag)
			},
			tag(item) {
				return item.tag
			},
			niceDate(item) {
				return item.niceDate
			},
			title(item) {
				return utils.formatHtml(item.title)
			},
			message(item) {
				return utils.formatHtml(item.message)
			},

			
			open(index) {
				this.data[index].show = true
			},
			close(index) {
				this.data[index].show = false
			},
			isEmpty() {
				return this.data.length == 0
			},
			contentClick(index) {
				//this.data[index].show = false
				let article = this.data[index]
				// 如果有原始id那么就使用原始id 不然就使用当前id
				let id = utils.isEmpty(article.originId) ? article.id : article.originId
				utils.openLink(id, this.title(article), article.link)
			},
			optionClick(index, position) {
				this.data[index].show = false
				this.$emit("optionClick", this.data[index], this.data[index].options[position])
			}
		}
	}
</script>

<style>
	.message-item-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		background-color: lightgray;

	}

	.message-item-header {
		display: flex;
		flex-direction: row;
		padding: 10rpx 20rpx 10rpx 20rpx;
	}

	.message-item-head-tag {
		color: white;
		height: 30rpx;
		font-size: 20rpx;
		border-radius: 5rpx;
		background-color: chocolate;
		padding: 10rpx 20rpx 10rpx 20rpx;
		margin-right: 10rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.message-item-header-right {
		flex-grow: 1;
		text-align: end;
		justify-content: center;
		align-items: center;
	}

	.message-item-middle {
		flex-grow: 1;
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100vw;
		background-color: lightseagreen;
		padding: 10rpx 20rpx 10rpx 20rpx;
	}

	.article-item-middle-article {
		flex-grow: 3;
		display: flex;
		flex-direction: column;

	}

	.article-item-pic {
		width: 120rpx;
		height: 180rpx;
		margin-left: 30rpx;
		border-radius: 10rpx;
		background: #eeeeee;
	}

	.message-item-end {
		display: flex;
		flex-direction: row;
		padding: 10rpx 20rpx 10rpx 20rpx;
	}

	.article-item-end-tag1 {
		color: white;
		height: 30rpx;
		font-size: 20rpx;
		border-radius: 5rpx;
		background-color: orange;
		margin-right: 10rpx;
		padding: 10rpx 20rpx 10rpx 20rpx;
	}

	.article-item-end-tag2 {
		color: white;
		height: 30rpx;
		font-size: 20rpx;
		border-radius: 5rpx;
		background-color: darkcyan;
		margin-right: 10rpx;
		padding: 10rpx 20rpx 10rpx 20rpx;
	}

	.line10 {
		height: 10rpx;
		background-color: white;
	}
	.message-no-data{
		display: flex;
		text-align: center;
		align-items: center;
		justify-content: center;
		margin-top: 30rpx;
	/* 	width: 100vw;
		height: 100vh; */
		
	}
</style>