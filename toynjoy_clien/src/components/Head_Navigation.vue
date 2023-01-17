<template>
    <div id="header" ref="header">
        <a id="Logo" @click.prevent="go('home')" :style="{ 'background-image': `url(${getImage(logo)})` }"></a>
        <ul ref="menu">
            <li>
                <a @click.prevent="go('home')">主页</a>
            </li>
            <li>
                <a @click.prevent="go('store')">商店</a>
            </li>
            <li>
                <a @click.prevent="go('sews')">新闻</a>
            </li>
            <li v-if="isLogin">
                <a @click.prevent="go('library')">库</a>
            </li>
            <li v-if="isLogin">
                <a @click.prevent="go('wishList')">愿望单</a>
            </li>
            <li v-if="isLogin">
                <a @click.prevent="go('shoppingCar')">购物车</a>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: 'HeadNavigation',
    data() {
        return {
            logo: 'system/logo_black.png',
        }
    },
    computed: {
        ...mapState(['isLogin'])
    },
    methods: {
        // 修改样式（Class）
        changClass(className) {
            // console.log(className);
            this.$refs.header.className = className;
            for (let li of this.$refs.menu.children) {
                li.className = className;
                li.children[0].className = className;
            }
        },
        // 窗体滚动事件
        windowOnScroll() {
            let isOnTop = document.documentElement.scrollTop === 0;
            this.changClass(isOnTop ? 'forHome' : 'default');
        },
        updateHead() {
            let isHome = (this.$route.name === 'home');
            this.changClass(isHome ? 'forHome' : 'default');
            if (isHome)
                window.addEventListener('scroll', this.windowOnScroll);
            else
                window.removeEventListener('scroll', this.windowOnScroll);
        }
    },
    watch: {
        '$route.name'(newName, oldName) {
            this.updateHead();
        }
    },
    mounted() {
        this.updateHead();
    }
}
</script>

<style scoped>
#Logo {
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: block;
    height: 60%;
    width: 10%;
    margin: 1% 2%;
    float: left;
}

#header {
    width: 100vw;
    position: fixed;
    top: 0;
    z-index: 1;
    transition: 0.5s;
}

#header>ul {
    float: right;
    height: 100%;
    list-style: none;
    margin-right: 2.5%;
}

#header li {
    font-size: 1.2vw;
    padding: 0.5vw 1.5vw;
    float: left;
}

#header a {
    font-weight: bold;
    text-decoration-line: none;
    cursor: pointer;
}

div.default {
    height: 5vw;
    background-color: white;
    box-shadow: 0 0 0.03vw 0.08vw rgba(225, 225, 225, 0.5);
}

li.default {
    margin-top: 1vw;
}

a.default {
    color: black;
}

div.forHome {
    height: 6vw;
    background: none;
}

li.forHome {
    margin-top: 1.5vw;
}

a.forHome {
    color: white;
}
</style>