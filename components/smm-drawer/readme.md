#### 组件介绍
借鉴 ``flutter`` 的 ``Drawer组件`` 风格，还是很舒服的；
为了能显示通知栏等区域；组件使用的是 ``transform`` 的操作

#### 参数传递

|参数|默认值|描述|
|:-|:-|:-|
|width|600|抽屉式导航的宽度|
|open|false|抽屉式导航是否打开|
|moveDist|100|手指滑动开启的距离判定|
|touchScope|50|距离最左侧手指按下滑动的开启判定的距离|
|touch|true|是否允许手指滑动拉开抽屉式导航|
|userHeaderSwitch|true|是否开启用户栏目|
|userBackground|green|用户栏目的背景(可传图或颜色值)|
|userInfo|{name,img,userId}|用户信息|

#### 向外提供事件
|参数|描述|
|:-|:-|
|clickUserPic|用户单击了头像区域|

#### 具名插槽

|命名|说明|
|:-|:-|
|item|左侧下方区域的插槽|

#### 演示

```
<template>
	<view>
		<smm-drawer :userInfo="user" :userBackground='imgs'>
			<template v-slot:item>
				<view class="listView">
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
		onLoad() {}
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
```
#### 父级界面关闭抽屉式导航栏方式

1. 通过直接修改或传入 :open 布尔值可以切换 开启/关闭 的状态
```
<smm-drawer open="true">
```
2. 通过 ref 绑定组件对象，通过组件内置的 closeBarFn() 或 closeDrawerFn() 关闭
```
<template>
	<view>
		<smm-drawer ref="drawer"></smm-drawer>
		<!-- 省略其他代码 -->
	</view>
</template>

<script>
	export default {
		methods:{
			closeDrawer(){
				console.log('点击了关闭');
				this.$refs.drawer.closeDrawerFn();
			}
		}
	}
</script>
```