<template>
	<view class="content">
		<view class="banner-container" v-if="data!=undefined&&data!=null&&data.length!=0">
			<swiper class="banner-box" :circular="true" :indicator-dots="true" :autoplay="true" :interval="4000"
				indicator-color="#46485F" indicator-active-color="#ff0000" :duration="1000" @change="change"
				:current="position">
				<swiper-item v-for="(item,index) in data" :key="index" @click="itemClick(item)">
					<image class="banner-image" :src="item.image" mode="aspectFill" />
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import utils from '@/utils/Utils.js'
	export default {
		name: "banner",
		data() {
			return {
				data: [],
				position: 0
			}
		},
		onLoad() {},
		methods: {
			setBanners(data) {
				this.data = data
				this.position = 0
			},
			change(e) {
				this.position = e.detail.current
			},
			itemClick(item) {
				utils.openLink(item.id, item.title, item.link)
			}
		}
	}
</script>

<style lang="scss">
	.banner-container {
		display: flex;
		height: 360rpx;
		width: 100%;
	}

	.banner-box {
		display: flex;
		width: 100%;
		height: 360rpx;
	}

	.banner-image {
		display: flex;
		width: 100%;
		height: 360rpx;
	}
</style>