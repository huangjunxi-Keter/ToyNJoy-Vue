<template>
    <div class="bodyer">
        <base-info />
        
        <div id="other">

        </div>

        <!--清除浮动-->
        <div id="clear"></div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Base_Info from '@/components/UserInfo/Base_Info.vue';

export default {
    name: 'UserInfo',
    computed: {
        ...mapState('user', ['userData', 'userInfo'])
    },
    methods: {
        ...mapMutations('user', ['UPDATE_USER_DATA', 'UPDATE_USER_INFO'])
    },
    mounted() {
        let requestPath = 'get';
        if (this.id)
            requestPath = 'getByName';

        //#region 获取用户信息
        this.myAxios({
            url: `User/${requestPath}`,
            params: { id: this.id },
            success: (response) => {
                this.UPDATE_USER_DATA(response.data);
            }
        });
        //#endregion

        //#region 获取用户详情
        this.myAxios({
            url: `UserInfo/${requestPath}`,
            params: { id: this.id },
            success: (response) => {
                this.UPDATE_USER_INFO(response.data);
            }
        });
        //#endregion
    },
    components: {
        'base-info': Base_Info
    },
    props: ['name']
}
</script>

<style scoped>
.bodyer {
    margin-top: 5vw; /* 与头部导航同高 */
}
</style>