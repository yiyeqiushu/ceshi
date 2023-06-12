<template>
	<view>
		<smm-drawer :userInfo="user" :userBackground='imgs' ref="drawer" @clickUserPic="clickUserPicFn" @closeDrawer='closeBarFn'>
			<template v-slot:item>
				<view class="listView" @click="openMenu">
					菜单
				</view>
				<view class="listView">
					我的收藏
				</view>
				<view class="listView">
					我的作品
				</view>
				<view class="listView">
					我的频道
				</view>
			</template>
		</smm-drawer>
		<view class="content">
			Hello word
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				text: '首页',
				user: {
					name: 'smmMax',
					userId: '10010101',
					img: 'https://img.xjh.me/img/62973578_p15_master1200.jpg'
				},
				imgs: 'https://api.vvhan.com/static/img/background-1.png'
			}
		},
		methods:{
			openMenu(){
				console.log('打开了菜单');
				this.$refs.drawer.closeDrawerFn();
			},
			messageFn(){
				console.log(2333);
			},
			closeDrawer(){
				console.log('点击了关闭');
				this.$refs.drawer.closeDrawerFn();
			},
			clickUserPicFn(e){
				console.log(e);
				this.$refs.drawer.closeDrawerFn();
			},
			closeBarFn(){
				console.log('触发事件');
			}
		}
	}
</script>

<style lang="scss">
	.listView {
		position: relative;
		height: 120rpx;
		width: 100%;
		box-sizing: border-box;
		padding: 20rpx 30rpx;
		font-size: 35rpx;
		display: flex;
		align-items: center;
		border-bottom: 2rpx solid #ccc;

		&::after {
			content: '>';
			transform: rotate(90deg) scale(1, 2);
			font-size: 30rpx;
			position: absolute;
			right: 30rpx;
			top: 35%;
		}
	}
</style>