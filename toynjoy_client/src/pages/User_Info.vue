<template>
    <div class="bodyer">
        <base-info />
        <div class="other">
            <recent-play :recentPlay="recentPlayData" />
            <div class="infoBox">
                <user-info-management />
                <user-info-show />
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Base_Info from '@/components/UserInfo/Base_Info.vue';
import Recent_Play from '@/components/UserInfo/Recent_Play.vue';
import User_Info_Management from '@/components/UserInfo/User_Info_Management.vue';
import User_Info_Show from '@/components/UserInfo/User_Info_Show.vue';

export default {
    name: 'UserInfo',
    data() {
        return {
            recentPlayData: []
        }
    },
    computed: {
        ...mapState('user', ['userData', 'userInfo'])
    },
    methods: {
        ...mapMutations('user', ['UPDATE_USER_DATA', 'UPDATE_USER_INFO'])
    },
    mounted() {
        let requestPathHelp = '';
        if (this.id)
            requestPathHelp = 'ByName';

        //#region 获取用户信息
        this.myAxios({
            headers: {
                Authorization: `Bearer ${localStorage.getItem('LoginUserToken')}`
            },
            url: `User/get${requestPathHelp}`,
            params: { id: this.id },
            success: (response) => {
                this.UPDATE_USER_DATA(response.data);
            }
        });
        //#endregion

        //#region 获取用户详情
        this.myAxios({
            headers: {
                Authorization: `Bearer ${localStorage.getItem('LoginUserToken')}`
            },
            url: `User/getInfo${requestPathHelp}`,
            params: { id: this.id },
            success: (response) => {
                this.UPDATE_USER_INFO(response.data);
            }
        });
        //#endregion

        //#region 获取最近下载
        this.myAxios({
            headers: {
                Authorization: `Bearer ${localStorage.getItem('LoginUserToken')}`
            },
            url: 'Library/find',
            params: {
                orderby: "LastTime",
                count: 5
            },
            success: (response) => {
                this.recentPlayData = response.data;
            }
        });
        //#endregion
    },
    components: {
        'base-info': Base_Info,
        'recent-play': Recent_Play,
        'user-info-management': User_Info_Management,
        'user-info-show': User_Info_Show
    },
    props: ['name']
}
</script>

<style scoped>
.bodyer {
    margin-top: 5vw;
    /* 与头部导航同高 */
}

.other {
    width: 85vw;
    min-width: 1200px;
    margin: 1vw auto;
    display: flex;
}

.infoBox {
    padding-left: 20px;
}
</style>