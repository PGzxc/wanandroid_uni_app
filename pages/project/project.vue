<template>
	<view>
		<tab ref="tab" @tabChange="onTabChange" />
		<article-list ref="articleList" />
	</view>
</template>

<script>
	import api from '@/http/ApiService.js'
	import utils from '@/utils/Utils.js'
	var self
	export default {
		data() {
			return {
				page: 1,
				cid: 0,
				enableLoadMore: false,
			}
		},
		onLoad() {
			self = this
			self.getProjectTree()
		},
		onPullDownRefresh() {
			self.page = 1
			self.getProjectTree()
		},
		onReachBottom() {
			if (self.enableLoadMore) self.getProjectArticle()
		},
		methods: {
			getProjectTree() {
				api.getProjectTree().then(res => {
					res.forEach((tab) => {
						tab.name = utils.formatHtml(tab.name)
					})
					self.$refs.tab.setTabsAndIndex(res, 0)
					if (res.length > 0) {
						self.cid = res[0].id
						self.getProjectArticle()
					}
				})
			},
			getProjectArticle() {
				if (self.cid != 0) {
					api.getProjectArticle(self.page, self.cid).then(res => {
						uni.stopPullDownRefresh()
						res.curPage == 1 ? self.$refs.articleList.setData(res.datas) :
							self.$refs.articleList.addData(res.datas)
						if (res.curPage == 1) utils.pageScrollToTop()
						self.enableLoadMore = res.over == false
						self.page++
					})
				}
			},
			onTabChange(id) {
				self.cid = id
				self.page = 1
				self.getProjectArticle()
			}
		}
	}
</script>

<style>
</style>