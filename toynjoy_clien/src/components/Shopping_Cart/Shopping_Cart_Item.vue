<template>
    <div class="product" :style="{ backgroundImage: `url('${getImage('products/' + product.image)}')` }">
        <span>{{ product.name }}</span>
        <span class="operation">
            <span v-if="product.price > 0">￥{{ product.price }}</span>
            <span v-else>免费</span>
            <a class="delete" SCid="@item.id">移除</a>
        </span>
    </div>
</template>

<script>
export default {
    name: 'Shopping_Cart_Item',
    props: ['product']
}
</script>

<style scoped>
.product {
    height: 150px;
    padding: 20px;
    background-size: 245px 125px;
    background-repeat: no-repeat;
    background-position: 15px center;
    margin-bottom: 15px;
    font-size: 0.9vw;
    box-shadow: 0 0 4px 0.5px #aeaeae;
    border-radius: 5px;
}

.product>span {
    margin-left: 260px;
    font-size: 20px;
    color: #656565;
}

.product>.operation {
    float: right;
    text-align: right;
}

.product>.operation>* {
    display: block;
}

.product>.operation>span {
    font-size: 20px;
    font-weight: 500;
    color: #808080;
}

.product>.operation>.delete {
    color: #aaaaaa;
    font-size: 15px;
    cursor: pointer;
}

.product>.operation>.delete:hover {
    text-decoration-line: underline;
}
</style>