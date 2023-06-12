<template>
	<view :class="{drawerScope:true,hidden:openType}" ref="myDrawer" @touchstart="touchstartFn" @touchend="touchendFn"
		@click.self='closeDrawerFn'>

		<view :class="{drawer:true,open:openType}" :style="{width:width+'rpx'}">

			<view class="userInfo" v-if="userHeaderSwitch">
				<view class="closeBar" @click="closeBarFn">关闭</view>
				<view class="zhezhao" :style="{background:bgColor}"></view>
				<view class="nullBox"></view>
				<view class="user">
					<view class="userImg" :style="{background:userImg}" @click="clickUserPicFn"></view>
					<view class="userName">{{userInfo.name}}</view>
					<view class="userId">uid:{{userInfo.userId}}</view>
				</view>
			</view>
			<scroll-view scroll-y="true" class="drawer-item" :style="{height:wh+'px'}">
				<slot name="item">
				</slot>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	/*
	参数传递
	
	|  width         |        600       |       抽屉式导航的宽度             |
	|   open         |       false      |       抽屉式导航是否打开            |
	| moveDist       |       100        |       手指滑动开启的距离判定        |
	|touchScope      |        50        |距离最左侧手指按下滑动的开启判定的距离|
	|    touch       |       true       |      是否允许手指滑动拉开抽屉式导航  |
	|userHeaderSwitch|       true       |            是否开启用户栏目         |
	|userBackground  |       green      |      用户栏目的背景(可传图或颜色值)  |
	|  userInfo      |{name,img,userId} |         用户信息              |
	
	
	事件向外
	clickUserPic    用户单击头像
	
	父级界面关闭抽屉导航的方法
	<smm-drawer ref="drawer">
	this.$refs.drawer.closeDrawerFn();
	

*/

	let that = null;
	export default {
		name: "smm-drawer",
		data() {
			return {
				befoX: 0,
				bingo: false,
				afterX: 0,
				timer: null,
				openType: this.open,
				bgColor: '',
				userImg: '',
				wh: 0
			};
		},
		created() {
			that = this;
			const info = uni.getSystemInfoSync();
			this.wh = this.userHeaderSwitch ? info.windowHeight - 280 : nfo.windowHeight - 100;
		},
		props: {
			// 侧标栏宽度
			width: {
				type: Number,
				default: 600
			},
			// 状态是否打开
			open: {
				type: Boolean,
				default: false
			},
			// 移动的距离
			moveDist: {
				type: Number,
				default: 100
			},
			// 触摸滑动的初始位置
			touchScope: {
				type: Number,
				default: 50
			},
			// 是否允许手指滑动拉开
			touch: {
				type: Boolean,
				default: true
			},
			// 是否开启用户栏目
			userHeaderSwitch: {
				type: Boolean,
				default: true
			},
			// 用户栏目背景
			userBackground: {
				type: String,
				default: 'green'
			},
			// 用户信息
			userInfo: {
				type: Object,
				default: function() {
					return {
						name: '用户',
						img: 'red',
						userId: '0000000'
					};
				}
			}
		},
		watch: {
			userBackground: {
				deep: true,
				immediate: true,
				handler(val) {
					this.bgColor = /.*.(jpg|png|gif|jpeg|php)\s*$/.test(val) ? `url(${val})` : val;
				}
			},
			userInfo: {
				deep: true,
				immediate: true,
				handler(val) {
					this.userImg = /.*.(jpg|png|gif|jpeg|php)\s*$/.test(val.img) ? `url(${val.img})` : val.img
				}

			}
		},
		methods: {
			touchstartFn(e) {
				if (!this.touch) return
				if (e.changedTouches[0].pageX > this.touchScope) return
				this.bingo = true;
				this.befoX = e.changedTouches[0].pageX;
			},
			touchendFn(e) {
				if (!this.touch) return
				if (this.befoX) {
					// console.log(e.changedTouches[0].pageX - this.befoX);
					if (e.changedTouches[0].pageX - this.befoX > this.moveDist) {
						this.openType = true;
					}
					this.befoX = 0;
					this.bingo = false;
				}
			},
			closeDrawerFn(e) {
				if (this.openType) {
					console.log('关闭界面');
					this.openType = false;
				}
			},
			closeBarFn(e) {
				this.openType = false;
			},
			clickUserPicFn(e) {
				console.log('用户点击了头像');
				this.$emit('clickUserPic', e);
			}
		}
	}
</script>

<style lang="scss">
	.drawerScope {
		position: fixed;
		z-index: 99999;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		transition: all .3s;
		background-color: transparent;

		&.hidden {
			background-color: rgba(0, 0, 0, .3);
		}

		.drawer {
			opacity: 0;
			height: 100vh;
			transform: translateX(-100%);
			transition: all .3s;
			background-color: #fff;
			background-size: contain !important;

			&.open {
				opacity: 1;
				transform: translateX(0%);
				box-shadow: 0px 0px 20px rgba(0, 0, 10, .3);
			}



			.userInfo {
				position: relative;
				width: 100%;
				box-sizing: border-box;
				height: 350rpx;
				display: flex;
				flex-direction: column;
				// padding:10rpx 40rpx;
				justify-content: space-between;

				.closeBar {
					position: absolute;
					top: 60rpx;
					right: 30rpx;
					font-size: 35rpx;
					font-weight: 800;
					color: #fff;
				}

				.zhezhao {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					z-index: -1;
					opacity: .7;
					background-position: center center !important;

					// background-size: contain !important;
					&:before {
						position: absolute;
						display: block;
						content: '';
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						background-image: linear-gradient(#fff, transparent, transparent, transparent);
					}
				}

				.user {
					padding: 10rpx 30rpx;

					.userImg {
						margin-bottom: 25rpx;
						margin-left: -10rpx;
						width: 150rpx;
						height: 150rpx;
						border-radius: 50%;
						box-shadow: 3rpx 3rpx 8rpx rgba(0, 0, 0, .3);
						background-size: contain !important;
					}

					.userName {
						font-size: 38rpx;
						color: #fff;
						width: 60%;
						height: 50rpx;
						display: flex;
						align-items: center;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}

					.userId {
						font-size: 30rpx;
						color: #fff;
						width: 60%;
						height: 40rpx;
						margin-bottom: 20rpx;
						display: flex;
						align-items: center;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
				}
			}

			.drawer-item {
				width: 100%;
				// background-color: red;
			}
		}
	}
</style>