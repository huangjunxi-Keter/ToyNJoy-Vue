<template>
    <div class="bodyer">
        <particles-bg type="fountain" :bg="true" />
        <div class="messageBox">
            <span :class="{ 'message': true, 'updateOver': updateOver, 'error': error }">{{ message }}</span>
            <div v-if="!updateOver && !error" class="spinner-border text-primary"></div>
        </div>
    </div>
</template>

<script>
import { ParticlesBg } from "particles-bg-vue";

export default {
    name: 'Pay_Callback',
    data() {
        return {
            updateOver: false,
            error: false,
            message: '支付成功！正在跟新库存'
        }
    },
    components: {
        ParticlesBg
    },
    mounted() {
        if (this.$attrs.app_id) {
            this.myAxios({
            headers: {
                Authorization: `Bearer ${localStorage.getItem('LoginUserToken')}`
            },
            method: 'post',
            url: 'Library/add',
            data: this.$attrs,
            success: (response) => {
                this.updateOver = response.data;
                this.error = !response.data;
                if (this.updateOver)
                    this.message = "更新完成！新的商品已加入您的库存"
                else
                    this.message = "更新出现错误，请联系网站管理员！"
            }
        });
        }
    }
}
</script>

<style scoped>
.bodyer {
    overflow-y: hidden;
    padding: 0;
    margin: 0;
    height: calc(100vh - 195px);
}

.messageBox {
    position: absolute;
    top: calc(50% - 150px);
    left: calc(50% - 250px);

    background-color: rgba(255, 255, 255, 0.9);
    width: 500px;
    text-align: center;
    padding: 80px 0;
    font-size: 25px;
    color: #007bff !important;
    box-shadow: 0 0 5px 2px #ddd;
    border-radius: 10px;
}

.message {
    margin-right: 20px;
    user-select: none;
}

.updateOver {
    color: #28a745 !important;
}

.error {
    color: #dc3545!important;
}
</style>