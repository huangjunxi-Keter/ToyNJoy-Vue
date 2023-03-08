<template>
    <div ref="recent_play" class="recent_play">
        <div class="title">最近游玩</div>
        <a v-for="rp in recentPlay" :key="rp.id" @click="go('product', { id: rp.product.id })"
            :style="{ 'background-image': `url('${getImage('products/' + rp.product.image)}')` }">
            <span class="product_name">{{ rp.product.name }}</span>
            <span class="join_time">购买于{{ rp.joinTime | timeformater }}</span>
            <!-- <span class="total_hours">{{ rp.totalHours }} 小时</span> -->
            <span class="last_time">最后运行日期：{{ rp.lastTime | timeformater }}</span>
        </a>

        <div v-if="recentPlay.length > 0" @click="changHeight" class="recent_play_button"
            :style="{ 'background-image': `url('${getImage('system/' + buttonImage)}')` }"></div>
    </div>
</template>

<script>
export default {
    name: 'Recent_Play',
    data() {
        return {
            isOpen: false,
            buttonImage: 'zxx_darkgray.png'
        }
    },
    methods: {
        changHeight() {
            let height = '35vw';
            if (!this.isOpen) {
                height = `${this.recentPlay.length * 235 + 10}px`;
            }
            this.buttonImage = !this.isOpen ? 'zxs_darkgray.png' : 'zxx_darkgray.png';
            this.$refs.recent_play.style.height = height;
            this.isOpen = !this.isOpen;
        }
    },
    props: ['recentPlay']
}
</script>

<style scoped>
.recent_play {
    width: 80%;
    min-width: 950px;
    height: 35vw;
    min-height: 550px;
    border-radius: 10px;
    padding-top: 10px;
    overflow: hidden;
    background-color: white;
    box-shadow: 0 0 5px 2px #dadada;
    transition: 0.2s;
    /* 供子元素定位 */
    position: relative;
}

.recent_play>.title {
    padding: 5px 20px;
    font-size: 25px;
    font-weight: bolder;
}

.recent_play>a {
    display: block;
    width: 95%;
    height: 10vw;
    min-height: 150px;
    border-radius: 5px;
    background-color: white;
    background-size: auto 100%;
    background-repeat: no-repeat;
    margin: 1vw auto;
    /* box-shadow:0.15vw 0.3vw 0.35vw 0.2vw #afafaf; */
    box-shadow: 0 0 5px 2px #dadada;
    position: relative;
    cursor: pointer;
}

.recent_play>a>* {
    position: absolute;
    font-size: 18px;
    color: #707070;
}

.recent_play .product_name {
    left: 45%;
    top: 5%;
    font-size: 23px;
    font-weight: bold;
    color: #656565;
}

.recent_play .join_time {
    left: 45%;
    top: 25%;
}

.recent_play .total_hours {
    right: 1%;
    bottom: 20%;
}

.recent_play .last_time {
    right: 1%;
    bottom: 5%;
}

.recent_play_button {
    width: 100%;
    height: 40px;
    background-color: white;
    background-size: auto 100%;
    background-repeat: no-repeat;
    background-position: center;
    position: absolute;
    bottom: 0;
    box-shadow: 0 0 0.5vw 0.1vw #aeaeae;
    cursor: pointer;
}
</style>