<template>
    <view class="container">
        <view class="header">
            <picker mode="selector" :range="options" v-model="selectedOptionIndex" @change="onOptionChange"
                class="picker">
                <view class="picker-text">{{ options[selectedOptionIndex] }}</view>
            </picker> <input v-model="textInput" class="input" placeholder="请输入内容..." /> <button class="submit-btn"
                @click="onSubmit">搜索</button>
        </view>
    </view>
</template>
<script>
    export default {
        data() {
            return {
                options: ['标题', '作者', '内容'],
                selectedOptionIndex: 0,
                textInput: '',
            };
        },
        methods: {
            onOptionChange(e) {
                this.selectedOptionIndex = e.mp.detail.value;
            },
            async onSubmit() {
                console.log('选项:', this.options[this.selectedOptionIndex]);
                console.log('输入框内容:', this.textInput);
                try {
                    const result = await this.cloudFunction(this.options[this.selectedOptionIndex], this.textInput);
                    console.log('搜索结果：', result.data);
                    uni.navigateTo({
                        url: `/pages/search_results?searchResults=${encodeURIComponent(JSON.stringify(result.data))}`
                    });
                } catch (error) {
                    console.error('搜索出错:', error);
                }
            },
            async cloudFunction(type, text) {
                try {
                    const response = await uniCloud.callFunction({
                        name: 'conditional_query',
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
        },
    };
</script>
<style>
    .container {
        display: flex;
        flex-direction: column;
    }

    .header {
        display: flex;
        align-items: center;
    }

    .picker {
        border: 1px solid #ccc;
        padding: 5px;
    }

    .picker-text {
        font-size: 14px;
    }

    .input {
        flex: 1;
        border: 1px solid #ccc;
        padding: 5px;
        margin-left: 10px;
        margin-right: 10px;
    }

    .submit-btn {
        background-color: #1e90ff;
        color: #fff;
        padding: 6px 12px;
        font-size: 14px;
        border: none;
        border-radius: 4px;
    }
</style>