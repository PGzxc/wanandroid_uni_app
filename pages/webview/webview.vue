<template>
	<web-view :src="link">

	</web-view>
</template>

<script>
	var self
	export default {
		data() {
			return {
				id: 0,
				title: '',
				link: '',
			};
		},
		onLoad(params) {
			self = this
			self.id = params.id
			self.link = params.link
			uni.setNavigationBarTitle({
				title: params.title
			})
		}
	}
</script>

<style lang="less">

</style>