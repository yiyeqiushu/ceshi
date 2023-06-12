<template>
    <view class="container">
        <own-Navbar title="看" :isBack="false"></own-Navbar>
        <sousuo></sousuo>
        <view class="header">
            <button class="random-five-button" @click="getRandomFive">随机五篇</button>
        </view>
        <view class="card-list">
            <t-card v-for="(qieyi, index) in qieyiList" :key="index" @click="goToPostDetails(qieyi)">
                <t-card-body>
                    <view class="card-header">
                        <t-card-title>{{ truncateTitle(qieyi.title) }}</t-card-title>
                        <text class="author">{{ qieyi.author }}</text>
                    </view>
                    <text class="text-sm" style="text-indent:30rpx; margin-top: 20rpx;">
                        {{ stripHtmlAndTruncateContent(qieyi.content) }}
                    </text>
                    <t-card-action justify="end">
                        <text class="date">{{ qieyi.timestamp }}</text>
                    </t-card-action>
                </t-card-body>
            </t-card>
        </view>
        <cebian></cebian>
    </view>
</template>

<script>
    import Results from '@/pages/search_results';
    import sousuo from "@/components/sousuo/sousuo";
    import cebian from "@/components/cebian/cebian";
    export default {
        components: {
            Results,
            sousuo,
            cebian,
        },
        data() {
            return {
                options: ['标题', '作者', '内容'],
                selectedOption: 0,
                textInput: '',
                qieyiList: [],
            };
        },
        methods: {
            truncateTitle(title) {
                return title.length > 10 ? title.slice(0, 10) + '…' : title;
            },
            stripHtmlAndTruncateContent(content) {
                const strippedContent = content.replace(/<[^>]*>/g, '');
                return strippedContent.length > 60 ? strippedContent.slice(0, 60) + '…' : strippedContent;
            },
            async getRandomFive() {
                const res = await uniCloud.callFunction({
                    name: "getRandomFive",
                });

                console.log("Received docs:", res.result);

                this.qieyiList = res.result;
            },
            onOptionChange(e) {
                this.selectedOption = e.mp.detail.value;
            },
            async onSubmit() {
                console.log('选项:', this.options[this.selectedOption]);
                console.log('输入框内容:', this.textInput);

                try {
                    const result = await this.cloudFunction(this.options[this.selectedOption], this.textInput);
                    this.$router.push({
                        path: '/pages/search_results',
                        params: {
                            searchResults: result,
                        },
                    });
                } catch (error) {
                    console.error('搜索出错:', error);
                }
            },
            async cloudFunction(type, text) {
                try {
                    const response = await uniCloud.callFunction({
                        name: 'your_cloud_function_name',
                        data: {
                            search: {
                                type: type,
                                text: text,
                            },
                        },
                    });
                    return response.result;
                } catch (error) {
                    throw error;
                }
            },
            goToPostDetails(qieyi) {
                uni.navigateTo({
                    url: `/pages/post_details?postDetails=${encodeURIComponent(JSON.stringify(qieyi))}`,
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
        padding: 20px;
    }

    .random-five-button {
        background-color: #1aad19;
        color: white;
        border: none;
        border-radius: 4px;
        padding: 10px 20px;
        font-size: 18px;
        cursor: pointer;
    }

    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .author {
        font-size: 14px;
        background-color: #55ff7f;
        padding: 4rpx 8rpx;
        border-radius: 4rpx;
        margin-left: 8rpx;
    }

    .cebian-container {
        position: fixed; // 根据需要定位
        z-index: 99999; // 调整此值以确保cebian位于其他内容之上
    }

    .date {
        font-size: 14px;
        color: #999;
    }
</style>