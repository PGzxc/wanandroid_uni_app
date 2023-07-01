<template>
	<view class="article-item-container" v-if="data!=undefined&&data!=null&&data.length>0">

		<view class="vertical" v-for="(item,index) in data" :key="item.id" @click="contentClick(index)">
			<!--第1行-->
			<view class="article-item-header">
				<text class="article-item-head-tag" v-if="hasRefreshTag(item)">{{reFreshTag(item)}}</text>
				<text class="article-item-head-tag" v-if="hasTag(item)">{{tag(item)}}</text>
				<view>
					<uni-icons type="person" size="20"></uni-icons>
					<text>{{author(item)}}</text>
				</view>
				<view class="article-item-header-right">
					<uni-icons type="calendar" size="20"></uni-icons>
					<text>{{niceDate(item)}}</text>
				</view>
			</view>
			<!--第2行-->
			<view class="article-item-middle">
				<view class="article-item-middle-article">
					<view>{{title(item)}}</view>
					<view>{{desc(item)}}</view>
				</view>
				<view class="article-item-middle-img">
					<image v-if="hasPic(item)" class="article-item-pic" :src="item.envelopePic" mode="aspectFill" />
				</view>

			</view>
			<!--第3行-->
			<view class="article-item-end">
				<text class="article-item-end-tag1" v-if="hasSuperChapterName(item)">{{superChapterName(item)}}</text>
				<text class="article-item-end-tag2" v-if="hasChapterName(item)">{{chapterName(item)}}</text>
			</view>

			<view class="line10" />
		</view>

	</view>
</template>

<script>
	import utils from '@/utils/Utils.js'
	export default {
		name: "article-list",
		props: {},
		data() {
			return {
				data: []
			}
		},
		methods: {
			formatData(articles) {
				return articles
			},
			setData(articles) {
				this.data = this.formatData(articles)
			},
			addData(articles) {
				this.data = this.data.concat(this.formatData(articles))
			},
			hasPic(item) {
				return !utils.isEmpty(item.envelopePic)
			},
			hasRefreshTag(item) {
				return item.fresh === true
			},
			reFreshTag(item) {
				return this.hasRefreshTag(item) ? '新' : ''
			},
			hasTag(item) {
				return !utils.isEmpty(item.tags)
			},
			tag(item) {
				return item.tags[0].name
			},
			author(item) {
				return utils.isEmpty(item.author) ?
					utils.isEmpty(item.shareUser) ? '' : item.shareUser :
					item.author
			},
			title(item) {
				return utils.formatHtml(item.title)
			},
			desc(item) {
				return utils.formatHtml(item.desc)
			},
			niceDate(item) {
				return item.niceShareDate
			},
			hasSuperChapterName(item) {
				return !utils.isEmpty(item.superChapterName)
			},
			superChapterName(item) {
				return utils.isEmpty(item.superChapterName) ? '' : utils.formatHtml(item.superChapterName)
			},
			hasChapterName(item) {
				return !utils.isEmpty(item.chapterName)
			},
			chapterName(item) {
				return utils.isEmpty(item.chapterName) ? '' : utils.formatHtml(item.chapterName)
			},
			chapter(item) {
				return utils.isEmpty(item.superChapterName) ? utils.formatHtml(item.chapterName) :
					utils.formatHtml(item.superChapterName) + ' · ' + utils.formatHtml(item.chapterName)
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
	.article-item-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		background-color: lightgray;

	}

	.article-item-header {
		display: flex;
		flex-direction: row;
		padding: 10rpx 20rpx 10rpx 20rpx;
	}

	.article-item-head-tag {
		color: white;
		height: 30rpx;
		font-size: 20rpx;
		border-radius: 5rpx;
		background-color: chocolate;
		padding: 10rpx 20rpx 10rpx 20rpx;
		margin-right: 10rpx;
	}

	.article-item-header-right {
		flex-grow: 1;
		text-align: end;
		justify-content: center;
		align-items: center;
	}

	.article-item-middle {
		flex-grow: 1;
		display: flex;
		flex-direction: row;
		align-items: center;
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

	.article-item-end {
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
</style>