<template>
    <div id="header">
        <a id="Logo" href="/HuangJunXi/Admin_Home" :style="{'background-image':`url(${getImage('system/logo_black.png')})`}"></a>
        <ul id="menu">
            <li>
                <a href="" @click.prevent="test()">主页</a>
            </li>
            <li>
                <a href="/HuangJunXi/Store">商店</a>
            </li>
            <li>
                <a href="/HuangJunXi/News">新闻</a>
            </li>
            <li v-if="isLogin">
                <a href="/HuangJunXi/Library">库</a>
            </li>
            <li v-if="isLogin">
                <a href="/HuangJunXi/Wish_List">愿望单</a>
            </li>
            <li v-if="isLogin">
                <a href="/HuangJunXi/ShoppingCar">购物车</a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'HeadNavigation',
    data() {
        return {
            logo: null
        }
    },
    methods: {
        test() {
            this.$bus.$emit('goHome');
        }
    }
}
</script>

<style scoped>
#header {
    width: 100vw;
    height: 6vw;
    position: fixed;
    top: 0;
    z-index: 1;
    background: none;
    transition: 0.5s;
    box-shadow: 0 0 0.03vw 0.08vw rgba(225, 225, 225, 0.5);
}

#Logo {
    /* background-image: url("../Image/system/logo_white.png"); */
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: block;
    height: 60%;
    width: 10%;
    margin: 1% 2%;
    float: left;
}

#menu {
    float: right;
    height: 100%;
    list-style: none;
    margin-right: 2.5%;
}

#menu>li {
    font-size: 1.2vw;
    padding: 0.5vw 1.5vw;
    float: left;
    margin-top: 1.5vw;
}

#menu>li>a {
    /* color: white; */
    font-weight: bold;
    text-decoration-line: none;
}
</style>