<template>
    <div class="bodyer">
        <!-- 此div仅用于展示 粒子背景特效，必须在外层限制特效范围，否则高度会溢出（出现垂直滚动条） -->
        <div>
            <!-- 
                color: String类型。默认’#dedede’。粒子颜色。
                particleOpacity: Number类型。默认0.7。粒子透明度。
                particlesNumber: Number类型。默认80。粒子数量。
                shapeType: String类型。默认’circle’。可用的粒子外观类型有：“circle”,“edge”,“triangle”, “polygon”,“star”。
                particleSize: Number类型。默认80。单个粒子大小。
                linesColor: String类型。默认’#dedede’。线条颜色。
                linesWidth: Number类型。默认1。线条宽度。
                lineLinked: 布尔类型。默认true。连接线是否可用。
                lineOpacity: Number类型。默认0.4。线条透明度。
                linesDistance: Number类型。默认150。线条距离。
                moveSpeed: Number类型。默认3。粒子运动速度。
                hoverEffect: 布尔类型。默认true。是否有hover特效。
                hoverMode: String类型。默认true。可用的hover模式有: “grab”, “repulse”, + “bubble”。
                clickEffect: 布尔类型。默认true。是否有click特效。
                clickMode: String类型。默认true。可用的click模式有: “push”, “remove”, “repulse”, “bubble”。
             -->
            <vue-particles shapeType="triangle" color="#000000" linesColor="#000000" :particlesNumber="120"
                :moveSpeed="3">
            </vue-particles>
        </div>
        <div class="messageBox">
            <span :class="{ 'message': true, 'updateOver': updateOver, 'error': error }">{{ message }}</span>
            <div v-if="!updateOver && !error" class="spinner-border text-primary"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Pay_Callback',
    data() {
        return {
            updateOver: false,
            error: false,
            message: '支付成功！正在跟新库存'
        }
    },
    mounted() {
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

    background-color: white;
    width: 500px;
    text-align: center;
    padding: 80px 0;
    font-size: 25px;
    color: #007bff !important;
    box-shadow: 0 0 10px 0.5px #bbbbbb;
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