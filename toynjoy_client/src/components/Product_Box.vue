<template>
    <div @click="go('product', { id: product.id })" class="product"
        :style="{ backgroundImage: `url('${getImage('products/' + product.image)}')` }">
        <p v-if="showPrice">
            <span class="p_name">{{ product.name }}</span>
            <span class="p_price" v-if="product.price == '0'">免费</span>
            <span class="p_price" v-else>￥{{ product.price }}</span>
        </p>
    </div>
</template>

<script>
export default {
    name: 'Product_Box',
    props: ['product', 'showPrice'],
}
</script>

<style scoped>
.product {
    display: block;
    float: left;
    width: 21vw;
    min-width: 350px;
    height: 11vw;
    min-height: 170px;
    border-radius: 5px;
    margin: 1vw 0.5vw 1vw 0.5vw;
    background-color: white;
    background-size: 100% 100%;
    box-shadow: 0 0 5px 2px #aeaeae;
    position: relative;
    cursor: pointer;
    transition: 0.2s;
}

.product:hover {
    transform: scale(1.05);
}

.product>p {
    position: absolute;
    bottom: 0;
    background-color: white;
    width: 100%;
    height: 35px;
    line-height: 35px;
    border-radius: 0 0 5px 5px;
    color: #808080;
    font-size: 15px;
    margin: 0;
}

.product .p_name {
    margin-left: 10px;
}

.product .p_price {
    float: right;
    margin-right: 10px;
}
</style>