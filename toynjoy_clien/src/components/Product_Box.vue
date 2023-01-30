<template>
    <div @click="go('product', { id: product.id })" class="product"
        :style="{ backgroundImage: `url('${getImage('products/' + product.image)}')` }">
        <p v-if="inStore">
            <span class="p_name">{{ product.name }}</span>
            <span class="p_price" v-if="product.price == '0'">免费</span>
            <span class="p_price" v-else>￥{{ product.price }}</span>
        </p>
    </div>
</template>

<script>
export default {
    name: 'Product_Box',
    props: ['product', 'inStore'],
}
</script>

<style scoped>
.product{
    display:block;
    float:left;
    width:21vw;
    height:11vw;
    border-radius:0.5vw;
    margin:1vw 0.5vw 1vw 0.5vw;
    background-color: white;
    background-size:100% 100%;
    box-shadow:0 0 0.5vw 0.1vw #aeaeae;
    position:relative;
    cursor: pointer;
    transition:0.2s;
}
.product:hover{
    transform:scale(1.05);
}
.product > p{
    position:absolute;
    bottom:0;
    background-color:white;
    width:21vw;
    height:2.5vw;
    line-height:2.5vw;
    border-radius:0 0 0.5vw 0.5vw;
    color:#808080;
    font-size:1vw;
    margin:0;
}
.product .p_name{
    margin-left:0.5vw;
}
.product .p_price{
    float:right;
    margin-right:0.5vw;
}
</style>