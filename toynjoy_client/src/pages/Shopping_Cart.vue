<template>
    <div class="bodyer">
        <div class="left">
            <p>您的购物车</p>
            <div>
                <shopping-cart-item v-for="sc in ShoppingCart" :id="sc.id" :product="sc.product" />
            </div>
            <settle-accounts :ShoppingCart="ShoppingCart" priceField="price" />
        </div>
        <div class="right">
            <product-box v-for="product in products" :product="product" :showPrice="true" />
        </div>
    </div>
</template>

<script>
import Shopping_Cart_Item from '@/components/Shopping_Cart/Shopping_Cart_Item.vue';
import Settle_Accounts from '@/components/Shopping_Cart/Settle_Accounts.vue';
import Product_Box from '@/components/Product_Box.vue';

export default {
    name: 'Shopping_Cart',
    data() {
        return {
            ShoppingCart: [],
            products: []
        }
    },
    components: {
        'shopping-cart-item': Shopping_Cart_Item,
        'settle-accounts': Settle_Accounts,
        'product-box': Product_Box
    },
    mounted() {
        //#region 获取购物车信息
        this.myAxios({
            headers: {
                Authorization: `Bearer ${localStorage.getItem('LoginUserToken')}`
            },
            url: 'ShoppingCar/find',
            success: (response) => {
                this.ShoppingCart = response.data;
            }
        });
        //#endregion

        //#region 获取推荐商品信息
        this.myAxios({
            url: 'product/find',
            params: {
                orderby: 'Purchases',
                count: 3
            },
            success: (response) => {
                this.products = response.data;
            }
        });
        //#endregion
    }
}
</script>

<style scoped>
.bodyer {
    width: 60vw;
    padding: 50px 30px 0 30px;
    display: flex;
}

.left {
    flex: 2;
    width: 39vw;
    height: 10vw;
    margin-right: 1vw;
}

.left>p {
    font-size: 2vw;
    color: #656565;
    margin-bottom: 1vw;
}

.right {
    flex: 1;
    width: 20vw;
    padding: 4vw 0 0 1vw;
}

.right>* {
    float: none;
    width: 100%;
    min-height: 200px;
    margin: 0 0 20px 0;
    box-shadow: 0 0 0.2vw 0.05vw #cecece;
}
</style>