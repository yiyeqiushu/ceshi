<template>
  <view class="container">
    <view class="post-details">
      <text class="title">{{ postDetails.title }}</text>
      <text class="author">作者：{{ postDetails.author }}</text>
      <text class="content">{{ postDetails.content }}</text>
    </view>
  </view>
</template>

<script>
export default {
  onLoad(options) {
    if (options.postDetails) {
      this.postDetails = JSON.parse(decodeURIComponent(options.postDetails));
    }
  },
  data() {
    return {
      postDetails: {
        title: "",
        author: "",
        content: "",
      },
    };
  },
};
</script>