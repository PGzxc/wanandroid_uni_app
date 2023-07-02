<template>
	<view>
		<view v-for="(item,index) in data" :key="index">
			<!--group-title-->
			<uni-group :title="item.title" margin-top="20">
				<!--group-content-->
				<view class="wrap-container">
					<view v-for="(childitem,index) in item.children" :key="index" @click="itemClick(childitem)">
						<uni-tag :key="index" :inverted="true" :text="childitem.title" type="primary"
							class="wrap-item" />
					</view>
				</view>
			</uni-group>
		</view>
	</view>

</template>

<script>
	export default {
		name: "tree-group",
		props: {
			data: {
				type: Array,
				default: () => []
			}
		},
		methods: {
			itemClick(childitem) {
				console.log(childitem)
			}
		}
	}
</script>

<style>
	.wrap-container {
		display: flex;
		flex-direction: row;
		width: calc(100% - 30rpx);
		margin: 15rpx;
		flex-wrap: wrap;
	}

	.wrap-item {
		display: flex;
		color: #666666;
		margin: 15rpx;
	}
</style>