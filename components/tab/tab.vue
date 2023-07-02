<template>
	<view>
		<scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false"
			:scroll-into-view="scrollInto">
			<view v-for="(tab,index) in tabs" :key="tab.id" class="uni-tab-item" :id="tab.id" :data-current="index">
				<text class="uni-tab-item-title" :class="tabIndex==index ? 'uni-tab-item-title-active' : ''"
					@click="ontabtap(index)">{{tab.name}}</text>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: "tab",
		data() {
			return {
				tabs: [],
				tabIndex: 0,
				scrollInto: "",
				bold: true
			};
		},
		methods: {
			setTabsAndIndex(tabs, index) {
				this.tabs = tabs
				this.tabIndex = index
			},
			change(index) {
				this.tabIndex = index
				this.scrollInto = this.tabs[index].name;
				this.$emit("tabChange", this.tabs[index].id)
			},
			ontabtap(index) {
				this.tabIndex = index
				//this.scrollInto = this.tabs[index].name;
				this.$emit("tabChange", this.tabs[index].id)
			},
		}
	}
</script>

<style>
	.tabs {
		flex: 1;
		flex-direction: column;
		overflow: hidden;
		background-color: #ffffff;
		/* #ifndef APP-PLUS */
		height: 100vh;
		/* #endif */
	}

	.scroll-h {
		width: 750rpx;
		/* #ifdef H5 */
		width: 100%;
		/* #endif */
		height: 80rpx;
		flex-direction: row;
		/* #ifndef APP-PLUS */
		white-space: nowrap;
		/* #endif */
		/* flex-wrap: nowrap; */
		/* border-color: #cccccc;
		border-bottom-style: solid;
		border-bottom-width: 1px; */
	}

	.line-h {
		height: 1rpx;
		background-color: #cccccc;
	}

	.uni-tab-item {
		/* #ifndef APP-PLUS */
		display: inline-block;
		/* #endif */
		flex-wrap: nowrap;
		padding-left: 34rpx;
		padding-right: 34rpx;
	}

	.uni-tab-item-title {
		color: #555;
		font-size: 30rpx;
		height: 80rpx;
		line-height: 80rpx;
		flex-wrap: nowrap;
		/* #ifndef APP-PLUS */
		white-space: nowrap;
		/* #endif */
	}

	.uni-tab-item-title-active {
		color: #007AFF;
		text-decoration: underline; //设置下划线
		text-underline-offset:10rpx; //下划线和文字间距		
		/* text-decoration-color: red;//下划线颜色 */
	}
</style>