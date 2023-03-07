<template>
    <div id="toolbar" :class="toolbarClass">
        <!--工具栏-->
        <ul>
            <li @click="changeToolbarState"
                :style="{ 'background-image': `url('${getImage('system/' + toolbarStateImage + '.png')}')` }">
            </li>
            <li @click="goUser"
                :style="{ 'background-image': `url('${getImage('user/' + (this.userData.virtualImage || '.png'))}')` }">
            </li>
            <li v-if="isLogin" @click="logout" :style="{ 'background-image': `url('${getImage('system/logout.png')}')` }">
            </li>
            <!-- <li class="find" :style="{ 'background-image': `url('${getImage('system/sel_blue.png')}')` }"></li> -->
            <li @click="goTop" :style="{ 'background-image': `url('${getImage('system/top.png')}')` }"></li>
        </ul>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
    name: 'Toolbar',
    data() {
        return {
            toolbarStateImage: 'zxs_darkgray',
            toolbarState: false,
            toolbarClass: {
                toolOpen: false,
                toolClose: true,
                login: false
            }
        }
    },
    computed: {
        ...mapState('system', ['isLogin']),
        ...mapState('user', ['userData'])
    },
    watch: {
        userData(...a) {
            this.changeToolbarState();
        }
    },
    methods: {
        ...mapMutations('system', ["UPDATE_LOGIN_STATE"]),
        ...mapMutations('user', ["UPDATE_USER_DATA", "UPDATE_USER_INFO"]),
        changeToolbarState() {
            this.toolbarState = !this.toolbarState;
            this.toolbarClass.toolOpen = this.toolbarState;
            this.toolbarClass.toolClose = !this.toolbarState;
            this.toolbarClass.login = this.isLogin;
            this.toolbarStateImage = this.toolbarState ? 'zxx_darkgray' : 'zxs_darkgray';
        },
        goTop() {
            let top = document.documentElement.scrollTop || document.body.scrollTop;
            // 实现滚动效果 
            const timeTop = setInterval(() => {
                document.body.scrollTop = document.documentElement.scrollTop = top -= 50;
                if (top <= 0) {
                    clearInterval(timeTop);
                }
            }, 8);
        },
        goUser() {
            if (this.isLogin)
                this.go('userInfo');
            else
                this.go('login');
        },
        logout() {
            this.UPDATE_LOGIN_STATE(null);
            this.UPDATE_USER_DATA({});
            this.UPDATE_USER_INFO({});
            this.go('home');
        }
    }
}
</script>

<style scoped>
#toolbar {
    /*工具栏*/
    border-radius: 5px;
    position: fixed;
    bottom: 50px;
    right: 50px;
    overflow: hidden;
    transition: 0.5s;
    z-index: 2;
}

#toolbar>ul {
    list-style: none;
    /* li 的 box-shadow 2px */
    margin: 2px;
}

#toolbar li {
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-radius: 5px;
    background-color: white;
    box-shadow: 0 0 3px 1px #888;
    margin-bottom: 20px;
    background-size: auto 100%;
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
    transition: 0.3s;
}

.toolClose {
    /*
        50px li 高度
        2px ul 上边距
        2px ul 下边距
    */
    height: 54px;
}

.toolOpen {
    /* (50px * 3) + (20px * 2) + 4px */
    height: 194px;
}

.toolOpen.login {
    /* (50px * 4) + (20px * 3) + 4px */
    height: 264px;
}
</style>