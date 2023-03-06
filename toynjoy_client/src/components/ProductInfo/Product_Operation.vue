<template>
    <div id="operation">
        <div class="content">
            <span>购买 {{ product.name }}</span>
            <div v-if="!inLibrary" id="add_Wish_List">
                <button v-if="inWishList">已在愿望单中</button>
                <button v-else>添加至愿望单</button>
            </div>
            <div id="add_Shopping_Car">
                <label v-if="(product.price > 0) && !inLibrary && !inShoppingCar" style="margin-right:0.25vw">
                    ￥{{ product.price }}
                </label>
                <label v-else-if="(product.price <= 0) && !inLibrary">免费</label>
                <button v-if="inLibrary">已在库中</button>
                <button v-else-if="inShoppingCar">已在购物车中</button>
                <button v-else @click="addShoppingCart(product.id)">添加至购物车</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: 'Product_Operation',
    computed: {
        ...mapState('system', ['isLogin'])
    },
    methods: {
        addShoppingCart(productId) {
            this.myAxios({
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('LoginUserToken')}`
                },
                url: 'ShoppingCar/add',
                params: { productId },
                success: (response) => {
                    this.$router.go(0);
                }
            });
        }
    },
    props: ['product', 'inLibrary', 'inWishList', 'inShoppingCar']
}
</script>

<style scoped>
#operation {
    width: 100%;
    min-width: 1000px;
    height: 6.4vw;
    min-height: 90px;
    user-select: none;
}

#operation>.content {
    width: 100%;
    height: 5vw;
    min-height: 70px;
    line-height: 5vw;
    position: relative;
    box-shadow: 0 0 0.35vw 0.05vw #909090;
    padding-left: 1.5vw;
    font-size: 1.45vw;
    font-family: 'Microsoft YaHei';
    color: #656565;
}

#operation>.content>div {
    line-height: initial;
    height: 2.85vw;
    min-height: 40px;
    position: absolute;
    top: 70%;
    background-color: white;
    box-shadow: 0 0 0.2vw 0.05vw #909090;
    font-size: 1.1vw;
    border-radius: 0.2vw;
}

#operation>.content>div>button {
    border: none;
    margin: 0.2vw 0.15vw 0.15vw 0.15vw;
    height: 2.5vw;
    min-height: 36px;
    padding: 0 0.5vw;
    border-radius: 0.2vw;
    outline: none;
}

#add_Wish_List {
    right: 13.5vw;
}

#add_Wish_List>button {
    background-color: rgba(47, 137, 188, 1);
    color: #a4d7f5 !important;
}

#add_Shopping_Car {
    right: 1vw;
    color: #808080;
}

#add_Shopping_Car label {
    margin-left: 0.5vw;
}

#add_Shopping_Car>button {
    background-color: rgba(121, 153, 5, 1);
    color: #d2e885 !important;
}
</style>