<template>
	<view>
		<tree-group  :data="systemTree" />
	</view>
</template>

<script>
	import api from '@/http/ApiService.js'
	import utils from '@/utils/Utils.js'
	var self
	export default {
		data() {
			return {
				systemTree: [],
			};
		},
		onLoad() {
			self = this
			self.getData()
		},
		methods: {
			getData() {
				api.getSystemAndNaviTree().then(res => {
					res[0].forEach(item => {
						self.systemTree.push({
							isTitle: true,
							title: item.name,
							children: item.children.map(item => {
								return {
									title: item.name,
									cid: item.id
								}
							})
						})
					})
				})
			}
		}
	}
</script>

<style lang="less">

</style>