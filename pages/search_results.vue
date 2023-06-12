<template>
  <view class="container">
    <view v-for="(result, index) in searchResults" :key="index" class="card-container">
      <t-card color="center" size="w-68" @click="goToPostDetails(result)">
        <t-card-body>
          <view class="title-and-author">
            <t-card-title>{{ truncate(result.title, 9) }}</t-card-title>
            <view class="author">{{ result.author }}</view>
          </view>
          <text class="text-sm" style="text-indent: 30rpx;">
            {{ truncate(removeTags(result.content), 60) }}
          </text>
          <t-card-action justify="end">
            <text>{{ result.timestamp }}</text>
          </t-card-action>
        </t-card-body>
      </t-card>
    </view>
  </view>
</template>

<script>
export default {
  onLoad(options) {
    if (options.searchResults) {
      this.searchResults = JSON.parse(decodeURIComponent(options.searchResults));
    }
  },
  data() {
    return {
      searchResults: [],
    };
  },
  methods: {
    truncate(text, maxLength) {
      return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    },
    removeTags(text) {
      return text.replace(/<[^>]*>/g, "");
    },
    goToPostDetails(result) {
      uni.navigateTo({
        url: `/pages/post_details?postDetails=${encodeURIComponent(JSON.stringify(result))}`,
      });
    },
  },
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.card-container {
  width: 100%;
  display: flex;
  justify-content: center;
}
.action-item {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.title-and-author {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.author {
  margin-left: 12px;
}
</style>