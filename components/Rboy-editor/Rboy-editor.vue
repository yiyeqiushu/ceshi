<template>
	<div>
		<view class="fu_box">
			<editor id="editor" :show-img-toolbar="true" :show-img-resize="true" :show-img-size="true" class=""
				placeholder="请输入商品商品详情"></editor>
		</view>
		<view class="icons_box">
			<text class="iconfont icon-zuoduiqi" @click="editor_format_btn('align','left')"></text>
			<text class="iconfont icon-juzhongduiqi" @click="editor_format_btn('align','center')"></text>
			<text class="iconfont icon-youduiqi" @click="editor_format_btn('align','right')"></text>
			<text class="iconfont icon-zuoyouduiqi" @click="editor_format_btn('align','justify')">
			</text>
			<text class="iconfont icon-zitijiacu" @click="editor_format_btn('bold')"></text>
			<text class="iconfont icon-zitixieti" @click="editor_format_btn('italic')"></text>
			<!-- <text class="iconfont icon-charutupian" @click="editor_img_btn"></text> -->  
		</view>
	</div>
</template>

<script>
	export default {
		name: "Rboy-editor",
		props: {
			count: {
				type: Number,
				default: 6
			}
		},
		data() {
			return {
				editorCtx: '',
			}
		},
		created() {

		},
		mounted() {
			// #ifdef APP-PLUS || H5 ||MP-WEIXIN
			uni.createSelectorQuery().in(this).select('#editor').context((res2) => {
				this.editorCtx = res2.context
			}).exec()
			// #endif
		},
		methods: {
			// 获取内容
			editor_getcontents() {
				return new Promise((resove, reject) => {
					this.editorCtx.getContents({
						success: (res) => {
							resove(res.html)
						}
					})
				})
			},
			// 设置内容
			editor_setContents(text = "") {
				this.editorCtx.setContents({
					html: text //this.EditGoodsDetail.content为赋值内容。    
				})
			},
			// 设置属性
			editor_format_btn(name, value) {
				this.editorCtx.format(name, value)
			},
			// 设置图片
			editor_insertImage(data) {
				if (!data) return false
				this.editorCtx.insertImage(data)
			},
			// 上传图片
			editor_img_btn() {
				uni.chooseImage({
					count: this.count || 6, // 控制上传图片的数量 默认 6
					type: 'image',
					success: async (res) => {
						this.$emit("uploadFile", res)
					}
				});
			},
		}
	}
</script>

<style scoped lang="less">
	@import './editor-icon.css';

	.fu_box {
		min-height: 35px !important;
		border: 1px solid #000000;
		border-radius: 4px;
		font-size: 14px;
		width: 100%;
		box-sizing: border-box;
		text-align: left;
		color: #333;
		padding: 7px;

		editor {
			width: 100%;
		}
	}


	.icons_box {
		.iconfont {
			margin: 5rpx 10rpx;
		}
	}
</style>
