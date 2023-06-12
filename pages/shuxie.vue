<template>
  <view>
    <own-Navbar title="写" :isBack="false"></own-Navbar>
    <view class="form">
      <view class="form-item">
        <text class="form-item-label">标题</text>
        <t-input v-model="form.title" placeholder="请输入标题" rounded="base" />
      </view>
      <view class="form-item">
        <text class="form-item-label">作者</text>
        <t-input v-model="form.author" placeholder="请输入作者" rounded="base" />
      </view>
      <view class="form-item">
        <text class="form-item-label">内容</text>
        <Rboy-editor ref="RboyEditor"></Rboy-editor>
      </view>
      <view class="form-item button-container">
        <t-btn color="warning" @click="resetForm" size="lg" class="button">重置</t-btn>
        <t-btn color="success" @click="submitForm" size="lg" class="button">上传提交</t-btn>
      </view>
    </view>
  </view>
</template>


<script>
import RboyEditor from "@/components/Rboy-editor/Rboy-editor.vue";

import cebian from "@/components/cebian/cebian.vue";
export default {
  components: {
    RboyEditor,
    cebian,
  },
  data() {
    return {
      form: {
        title: "",
        author: "佚名",
        content: ""
      }
    };
  },
  methods: {
    resetForm() {
      this.form.title = "";
      this.form.author = "";
      this.form.content = "";
    },
    // 获取内容
    async get_content() {
      let detail = await this.$refs.RboyEditor.editor_getcontents()
      return detail;
    },
    async submitForm() {
      this.form.content = await this.get_content();

      // 获取当前时间并格式化为 "xxxx年xx月xx日xx:xx"
      const currentDate = new Date();
      const formattedTimestamp =
        currentDate.getFullYear() +
        "年" +
        (currentDate.getMonth() + 1).toString().padStart(2, "0") +
        "月" +
        currentDate.getDate().toString().padStart(2, "0") +
        "日" +
        currentDate.getHours().toString().padStart(2, "0") +
        ":" +
        currentDate.getMinutes().toString().padStart(2, "0");
      
      // 添加时间戳到 JSON 数据
      const formData = {...this.form, timestamp: formattedTimestamp};

      console.log("Form submitted:", JSON.stringify(formData));

      // 上传到数据库
      uni.showLoading();
      uniCloud.callFunction({
        name: 'createqieyi',
        data: formData
      }).then(res => {
        uni.showToast({ title: '提交成功审核中', icon: 'success' });
      });
    }
  }
};
</script>


<style>
.form {
  padding: 20px;
  display: flex;
  flex-direction: column;
}
.form-item {
  margin-bottom: 20px;
}
.form-item-label {
  font-size: 16px;
  margin-bottom: 6px;
}
.button-container {
  display: flex;
  justify-content: center;
}
.button {
  margin: 0 20px;
}
</style>