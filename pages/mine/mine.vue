<template>
	<view>
		<mine-head ref="mineHead" />
		<mine-function />
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
				level: '',
				rank: '',
				coinCount: '',
				total: '',
				username:''
			};
		},
		onLoad() {
			self = this
			if (utils.isLogined()) {
				self.getCoinInfo()
			}
			bus.onLogin(function() {
				self.getCoinInfo()
			})
		},
		methods: {
			getCoinInfo() {
				api.getCoinInfo().then(res => {
					console.log(res)
					self.total = res[0].total
					self.level = res[1].level
					self.rank = res[1].rank
					self.coinCount = res[1].coinCount
					self.username = res[1].username
					self.$refs.mineHead.setHead(self)
				})
			},
		}
	}
</script>

<style lang="less">

</style>