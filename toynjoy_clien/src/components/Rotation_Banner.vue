<template>
    <div id="rotation_banner">
        <!--购买量最多的前8个-->
        <p>
            <span>{{ title }}</span>
        </p>
        <div :id="`rotation_banner_main_${rid}`" class="carousel slide" data-ride="carousel">
            <ul class="carousel-indicators">
                <li :data-target="`#rotation_banner_main_${rid}`" data-slide-to="0" class="active"></li>
                <li :data-target="`#rotation_banner_main_${rid}`" data-slide-to="1"></li>
            </ul>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <div v-for="product in productsActive" class="product_box"
                        :style="{ 'background-image': `url('${getImage('products/' + product.image)}')` }"
                        @click="go(product.id)">
                        <p>
                            <span> {{ product.name }} </span>
                        </p>
                    </div>
                </div>
                <div class="carousel-item">
                    <div v-for="product in products" class="product_box"
                        :style="{ 'background-image': `url('${getImage('products/' + product.image)}')` }"
                        @click="go(product.id)">
                        <p>
                            <span> {{ product.name }} </span>
                        </p>
                    </div>
                </div>
            </div>
            <a class="carousel-control-prev min" :href="`#rotation_banner_main_${rid}`" data-slide="prev">
                <span class="carousel-control-prev-icon"></span>
            </a>
            <a class="carousel-control-next min" :href="`#rotation_banner_main_${rid}`" data-slide="next">
                <span class="carousel-control-next-icon"></span>
            </a>
        </div>
    </div>
</template>

<script>
import 'bootstrap/js/dist/carousel'

export default {
    name: 'Rotation_Banner',
    props: ['products', 'productsActive', 'title', 'rid']
}
</script>

<style scoped>
#rotation_banner {
    text-align: center;
    height: 18vw;
    width: calc(100vw - 16.6px);
    min-width: 1300px;
}

.carousel-control-prev,
.carousel-control-next{
    background-color: black;
    opacity: 1;
}

#rotation_banner>p {
    font-weight: bold;
    font-size: 25px;
    line-height: 45px;
    padding: 1vw 2vw;
    margin: 0;
}

#rotation_banner>p>span {
    display: block;
    text-align: center;
    width: 105px;
    border-bottom: 6.5px solid red;
    user-select: none;
}

#rotation_banner .carousel-inner {
    padding: 10px 1vw;
}

#rotation_banner .product_box {
    display: block;
    float: left;
    height: 11vw;
    min-height: 150px;
    width: 22.7vw;
    min-width: 305px;
    background-size: 100% 100%;
    margin: 0.75vw;
    position: relative;
    box-shadow: 0 0 0.5vw 0.1vw #aeaeae;
    color: black;
    transition: 0.2s;
    cursor: pointer;
}

.product_box:hover {
    transform: scale(1.07);
}

#rotation_banner .product_box>p {
    width: 100%;
    height: 45px;
    line-height: 45px;
    position: absolute;
    bottom: 0;
    background-color: rgba(0,0,0, 0.5);
    color: white;
    font-size: 20px;
    margin: 0;
    /*解除受父类影响的定位偏移*/
    user-select: none;
}

#rotation_banner .min {
    height: 11vw;
    width: 3vw;
    margin: auto 1vw;
}
</style>