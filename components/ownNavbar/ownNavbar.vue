<template>
	<view class="">
		<u-navbar
			:back-text="backText" 
			:title-width="titleWidth" 
			:title="title" 
			:background="background"
			:title-color="color"
			:back-icon-color="color"
			:is-back="isBack"
			:border-bottom="borderbottom"
		>
		<view slot="right">
			<slot name="rights"></slot>
		</view>
		</u-navbar>
	</view>
</template>

<script>
	import themeMxins from "@/utils/mixins/themeMxins.js"
	// :background="background"
	// :title-color="titleColor"
	// :back-icon-color="backiconcolor"
	export default {
		mixins: [themeMxins],
		props:{
			//标题
			title:{
				type: String,
				default () {
					return ""
				}
			},
			//标题宽度
			titleWidth:{
				type: String,
				default () {
					return "300"
				}
			},
			//标题宽度
			backText:{
				type: String,
				default () {
					return ""
				}
			},
			/* 是否返回 */
			isBack:{
				type: Boolean,
				default () {
					return true
				}
			},
			/* 底部线条 */
			borderbottom:{
				type: Boolean,
				default () {
					return true
				}
			},
		},
		data(){
			return{
				// background:{},
				// titleColor:"",
				// backiconcolor:"",
				// navColor:""
			}
		},
		computed:{
			background(){
				let type = themeMxins.methods.toggleAppTheme(this.$store.state.appTheme,this.$store.state.appThemeIndex);
				if(type == '1'){
					return {
						backgroundImage: 'linear-gradient(45deg, rgb(32, 171, 254), rgb(60, 199, 254))',
					}
				}else if(type == '2'){
					return {
						backgroundImage: 'linear-gradient(45deg, rgb(78, 78, 78), rgb(78, 78, 78))',
					}
				}else if(type == '3'){
					return {
						backgroundImage: 'linear-gradient(45deg, rgb(47, 166, 200), rgb(47, 166, 200))',
					}
				}else if(type == '4'){
					return {
						backgroundImage: 'linear-gradient(45deg, rgb(214, 214, 214), rgb(214, 214, 214))',
					}
				}else if(type == '5'){
					return {
						backgroundImage: 'linear-gradient(45deg, rgb(62, 130, 83), rgb(62, 130, 83))',
					}
				}else if(type == '6'){
					return {
						backgroundImage: 'linear-gradient(45deg, rgb(239, 150, 24), rgb(239, 150, 24))',
					}
				}else{
					return {
						backgroundImage: 'linear-gradient(45deg, rgb(32, 171, 254), rgb(60, 199, 254))',
					}
				}
			},
			
			color(){
				let type = themeMxins.methods.toggleAppTheme(this.$store.state.appTheme,this.$store.state.appThemeIndex);
				if(type == '1'){
					return "#fff"
				}else if(type == '2'){
					return "#fff"
				}else if(type == '3'){
					return "#fff"
				}else if(type == '4'){
					return "#000"
				}else if(type == '5'){
					return "#fff"
				}else if(type == '6'){
					return "#fff"
				}else{
					return "#fff"
				}
			}
		},
		mounted() {
			// this.background = this.$navColor;
			// this.titleColor = this.$navColor.color;
			// this.backiconcolor = this.$navColor.color;
		}
	}
</script>

<style>
</style>
