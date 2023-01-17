<template>
    <div class="bodyer">
        <product-basic-information :product="product" :photoList="photoList" />
        <product-operation :product="product" />
        <div class="intro">
            关于这款游戏
            <div class="content">
                <p>{{ product.intro }}</p>
            </div>
            <div class="button" :style="{ 'background-image': `url('${getImage('system/zxx_darkgray.png')}')` }"></div>
        </div>
        <has-product-friends :hasProductFriends="hasProductFriends" />
        <product-hardware-requirements :hardwareRequirements="hardwareRequirements" />
    </div>
</template>

<script>
import Product_Basic_Information from '@/components/ProductInfo/Product_Basic_Information.vue';
import Product_Operation from '@/components/ProductInfo/Product_Operation.vue';
import Hardware_Requirements from '@/components/ProductInfo/Hardware_Requirements.vue';
import Has_Product_Friends from '@/components/ProductInfo/Has_Product_Friends.vue';

import { mapState } from "vuex";

export default {
    name: 'Product_Info',
    data() {
        return {
            product: {},
            photoList: [],
            hardwareRequirements: {},
            hasProductFriends: []
        }
    },
    computed: {
        ...mapState(['isLogin'])
    },
    mounted() {
        //#region 商品信息
        this.myAxios({
            url: 'Product/get',
            params: { id: this.id },
            success: (response) => {
                this.product = response.data;
            }
        });
        //#endregion

        //#region 商品图集
        this.myAxios({
            url: 'ProductPhotoGallery/getByProductId',
            params: { id: this.id },
            success: (response) => {
                this.photoList = response.data;
            }
        });
        //#endregion

        //#region 配置要求
        this.myAxios({
            url: 'ProductHardwareRequirement/getByProductId',
            params: { id: this.id },
            success: (response) => {
                this.hardwareRequirements = response.data;
            }
        });
        //#endregion

        //#region 拥有游戏的好友
        if (this.isLogin) {
            // this.myAxios({
            //     url: 'Friend/find',
            //     params: { UserName: this.isLogin.user.name },
            //     success: (response) => {
            //         this.hasProductFriends = response.data;
            //     }
            // });
        }
        //#endregion
    },
    components: {
        'product-basic-information': Product_Basic_Information,
        'product-operation': Product_Operation,
        'product-hardware-requirements': Hardware_Requirements,
        'has-product-friends': Has_Product_Friends
    },
    props: ['id']
}
</script>

<style scoped>
.bodyer {
    width: 70vw;
    margin: 6.5vw auto 0 auto;
}

.intro {
    margin-top: 1vw;
    color: black;
    font-size: 1vw;
    font-weight: 700;
    font-family: 'Microsoft YaHei';
    transition: 0.5s;
    user-select: none;
}

.intro>.content {
    margin-top: 0.3vw;
    padding-top: 0.3vw;
    border-top: solid 0.2vw black;
    height: 6.55vw;
    color: #757575;
    overflow: hidden;
    transition: 0.5s;
    user-select: text;
}

.intro>.button {
    height: 2vw;
    /* background-image:url('../Image/system/zxx_darkgray.png'); */
    background-size: auto 100%;
    background-repeat: no-repeat;
    background-position: center;
    transition: 0.5s;
}
</style>