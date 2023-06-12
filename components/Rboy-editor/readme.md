

## RboyEditor 便捷式富文本

> **组件名：Rboy-editor**
> 代码块： `Rboy-editor`


## 属性
- count 类型Number 控制选择图片的数量 （默认 6）
- @uploadFile 选择图片的回调
- this.$refs.RboyEditor.editor_setContents(detail) 设置富文本内容方法  detail为内容
- let detail = await this.$refs.RboyEditor.editor_getcontents() 获取富文本内容方法  detail为获取到的内容（建议使用 async await）




## 使用方法
1. 引入
```js
import RboyEditor from "@/components/Rboy-editor/Rboy-editor.vue"
```

2. 注册组件
```js
components: {
	RboyEditor,
},
```

3. 应用
```html
<Rboy-editor ref="RboyEditor" @uploadFile="uploadFile" :count="6"></Rboy-editor>
<button @click="get_content">获取内容</button>
<button @click="set_content">设置内容</button>
```
```js
data() {
	return {
		detail: "<p>Rboy 设置的内容</p>"
	};
},
methods: {
	// 设置内容
	async set_content() {
		this.$refs.RboyEditor.editor_setContents(this.detail)
	},
	// 获取内容
	async get_content() {
		let detail = await this.$refs.RboyEditor.editor_getcontents()
		console.log(detail)
	},
	// 上传图片
	async uploadFile(event) {
		// event 选择的图片
		for (var item in event.tempFilePaths) {
			// uploadFileApi  为上传到服务端的接口 count大于1 使用 await 
			let src = await uploadFileApi(event.tempFilePaths[item])
			// src.url 是服务端返回的图片地址
			// this.$refs.RboyEditor(Object) 方法是往富文本设置图片内容  src 图片地址
			this.$refs.RboyEditor.editor_insertImage({
				src: src.url,
				alt: "图像",
			})
		}
	},
}
```


