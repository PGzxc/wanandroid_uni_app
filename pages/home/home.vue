<template>
	<view class="page">
		<banner ref="banner" />
		<article-list ref="articleList" />
	</view>
</template>

<script>
	import api from '@/http/ApiService.js'
	var self
	export default {
		data() {
			return {
				page: 0,
				// 是否继续加载下一页
				enableLoadMore: false,
			};
		},
		onLoad() {
			self = this
			this.getHomeData()
		},
		onPullDownRefresh() {
			self.page = 0
			self.getHomeData()
		},
		onReachBottom() {
			if (self.enableLoadMore) self.getHomeArticles()
		},
		methods: {
			getHomeData() {
				api.getHomeData().then(res => {
					// 重新允许上拉加载加载
					self.enableLoadMore = true
					// 关闭下啦刷新
					uni.stopPullDownRefresh()
					// 轮播图
					self.$refs.banner.setBanners(res[0].map((item) => {
						return {
							id: item.id,
							title: item.title,
							image: item.imagePath,
							link: item.url
						}
					}))
					self.$refs.articleList.setData(res[1].datas)
					self.page++
				})
			},
			getHomeArticles() {
				api.getHomeArticles(self.page).then(res => {
					res.curPage == self.$refs.articleList.addData(res.datas)
					// 判断是否可以继续加载下一页
					self.enableLoadMore = res.over == false
					self.page++
				})
			},
		}
	}
</script>

<style lang="less">

</style>