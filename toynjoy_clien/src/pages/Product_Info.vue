<template>
    <div id="bodyer">
        <product-basic-information :product="product" :photoList="photoList" />
        <product-operation :product="product" />
    </div>
</template>

<script>
import Product_Basic_Information from '@/components/ProductInfo/Product_Basic_Information.vue'
import Product_Operation from '@/components/ProductInfo/Product_Operation.vue'

export default {
    name: 'Product_Info',
    data() {
        return {
            product: {},
            photoList: []
        }
    },
    mounted() {
        //#region 商品信息
        this.axiosGet({
            url: 'Product/get',
            params: { id: this.id },
            success: (response) => {
                this.product = response.data;
            }
        });
        //#endregion

        //#region 商品图集
        this.axiosGet({
            url: 'ProductPhotoGallery/getByProductId',
            params: { id: this.id },
            success: (response) => {
                this.photoList = response.data;
            }
        });
        //#endregion
    },
    components: {
        'product-basic-information': Product_Basic_Information,
        'product-operation': Product_Operation,
    },
    props: ['id']
}
</script>

<style scoped>
#bodyer {
    width: 70vw;
    margin: 6.5vw auto 0 auto;
}
</style>