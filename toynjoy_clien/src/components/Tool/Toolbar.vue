<template>
    <div id="toolbar" :class="toolbarState ? 'toolOpen' : 'toolClose'">
        <!--工具栏-->
        <ul>
            <li @click="changeToolbarState"
                :style="{ 'background-image': `url('${getImage('system/' + toolbarStateImage + '.png')}')` }">
            </li>
            <li @click="go('userInfo')" :style="{ 'background-image': `url('${getImage('user/' + userImage)}')` }"></li>
            <li v-if="isLogin" :style="{ 'background-image': `url('${getImage('system/friend.png')}')` }">
            </li>
            <li class="find" :style="{ 'background-image': `url('${getImage('system/sel_yellow.png')}')` }"></li>
            <li @click="goTop" :style="{ 'background-image': `url('${getImage('system/top.png')}')` }"></li>
        </ul>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: 'Toolbar',
    data() {
        return {
            userImage: '.png',
            toolbarState: false,
            toolbarStateImage: 'zxs_darkgray',
        }
    },
    computed: {
        ...mapState('system', ['isLogin'])
    },
    methods: {
        changeToolbarState() {
            this.toolbarState = !this.toolbarState;
            this.toolbarStateImage = this.toolbarState ? 'zxx_darkgray' : 'zxs_darkgray'
        },
        goTop() {
            document.documentElement.scrollTop = 0;
        }
    },
    mounted() {
        if (this.isLogin) {
            this.myAxios({
                url: 'User/userImageName',
                success: (response) => {
                    // console.log(response.data);
                    this.userImage = response.data;
                }
            });
        }
    }
}
</script>

<style scoped>
#toolbar {
    /*工具栏*/
    width: 55px;
    border-radius: 5px;
    position: fixed;
    bottom: 50px;
    right: 50px;
    overflow: hidden;
    transition: 0.5s;
    z-index: 2;
}

.toolClose {
    height: 55px;
}

.toolOpen {
    height: 335px;
}

#toolbar>ul {
    list-style: none;
    margin: 0.1vw;
}

#toolbar li {
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-radius: 5px;
    background-color: white;
    box-shadow: 0 0 2px 1px rgb(99, 99, 99);
    margin-bottom: 1vw;
    background-size: auto 100%;
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
    transition: 0.3s;
}
</style>