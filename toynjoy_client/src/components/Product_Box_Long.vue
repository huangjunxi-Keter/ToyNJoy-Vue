<template>
    <div class="product">
        <div class="image toProductPage" @click="go('product', { id: wishlist.product.id })"
            :style="{ backgroundImage: `url('${getImage('products/' + wishlist.product.image)}')` }"></div>
        <div class="left">
            <ul>
                <li class="prodictName toProductPage" @click="go('product', { id: wishlist.product.id })">
                    {{ wishlist.product.name }}
                </li>
                <li>
                    发行日期：
                    <span>{{ wishlist.product.releaseDate | timeformater }}</span>
                </li>
            </ul>
        </div>
        <div class="right">
            <div class="buttonBox">
                {{ wishlist.product.price > 0 ? `￥${wishlist.product.price}` : "免费" }}
                <button v-if="inShoppingCar || hasOrder">{{ inShoppingCar ? "已在购物车中" : "已存在订单" }}</button>
                <button v-else v-on:click="addCar(wishlist.product.id)">添加至购物车</button>
            </div>
            <p>
                添加日期：{{ wishlist.joinDate | timeformater }}
                (<span v-on:click="del(wishlist.id)">移除</span>)
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Product_Box_Long',
    props: ['wishlist'],
    data() {
        return {
            inShoppingCar: false,
            hasOrder: false
        }
    },
    methods: {
        addCar(id) {
            this.myAxios({
                url: "ShoppingCar/add",
                params: { productId: id },
                success: (response) => {
                    this.$router.go(0);
                }
            });
        },
        del(id) {
            this.myAxios({
                url: 'WishList/del',
                params: { id },
                success: (response) => {
                    this.$router.go(0);
                }
            });
        }
    },
    mounted() {
        //#region 查询是否在购物车中
        this.myAxios({
            url: `ShoppingCar/find`,
            params: { productId: this.wishlist.productId },
            success: (response) => {
                this.inShoppingCar = response.data.length > 0;
            }
        });
        //#endregion

        //#region 是否存在订单
        this.myAxios({
            url: `Order/findItems`,
            params: { productId: this.wishlist.productId },
            success: (response) => {
                this.hasOrder = response.data.length > 0;
            }
        });
        //#endregion
    }
}
</script>

<style scoped>
.toProductPage {
    cursor: pointer;
}

.product {
    margin-top: 1vw;
    width: 100%;
    height: 200px;
    background-color: white;
    box-shadow: 0 0 0.2vw 0.05vw #aeaeae;
    border-radius: 5px;
}

.product>div {
    float: left;
    margin: 0;
}

.product>.image {
    height: 100%;
    width: 35%;
    background-size: 100% 100%;
    box-shadow: 0 0 0.2vw 0.02vw #aaaaaa;
    border-radius: 5px 0 0 5px;
}

.left {
    padding: 20px;
    height: 100%;
    width: 35%;
}

.left>ul {
    list-style: none;
}

.left li {
    color: #606060;
    margin-bottom: 0.5vw;
}

.left .prodictName {
    font-size: 28px;
    font-weight: bold;
    color: #454545;
    margin-bottom: 2vw;
}

.right {
    height: 100%;
    width: 30%;
    font-size: 0.55vw;
    color: #606060;
    position: relative;
}

.right>.buttonBox {
    position: absolute;
    top: 20%;
    right: 10%;

    height: 45px;
    line-height: 45px;
    width: 200px;
    background-color: #eaeaea;
    box-shadow: inset 0 0 1px 2px #cccccc;
    border-radius: 5px;
    font-weight: bold;
    font-size: 15px;
    text-align: center;
    color: #707070;
    user-select: none;
}

.buttonBox>button {
    border: none;
    padding: 0 15px;
    border-radius: 5px;
    outline: none;
    background-color: rgba(121, 153, 5, 1);
    color: #d2e885 !important;
    font-size: 18px;
    float: right;
    cursor: pointer;
    height: 100%;
    line-height: initial;
}

.right>p {
    position: absolute;
    bottom: 10%;
    right: 10%;
    margin: 2.5vw 0 0 0.9vw;
}

.right>p>span {
    border-bottom: dotted 0.05vw #606060;
    cursor: pointer;
}

.right>p>span:hover {
    border-bottom: dotted 0.05vw #909090;
    color: #909090;
}
</style>