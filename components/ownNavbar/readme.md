## 使用说明
## 基本上和官方uview的一样，只不过把-去掉了，例如官方原来是back-text，现在是backText,案例在pages_demo/index
|  参数   |  格式 |  说明 |
|  ----  | ----  |----  |
| backText  | String | 返回图标右边的辅助提示文字 |
| titleWidth  | String |导航栏标题的最大宽度，内容超出会以省略号隐藏，单位rpx|
| title  | String |导航栏标题|
| isBack  | Boolean |是否显示导航栏左边返回图标和辅助文字，默认true|
| borderbottom  | String |底部边框线，默认true|


```javascript
<own-Navbar title="案例">
/* 右插槽 */
	<view slot="rights">
		111
	</view>
</own-Navbar>


```
