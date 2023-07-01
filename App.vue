<script>
	export default {
		globalData: {
			// 用户信息，不要直接使用，从DataManager中获取
			userInfo: null,
			// 用户信息Cookie，不要直接使用，从DataManager中获取
			cookie:null,
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
