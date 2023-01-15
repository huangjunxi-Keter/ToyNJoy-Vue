<template>
    <div>
        <p id="product_name">{{ product.name }}</p>
        <div id="basic_information">
            <div class="left">
                <div id="Product_Photo_Gallery" class="carousel slide" data-ride="carousel">
                    <ul class="carousel-indicators">
                        <li v-for="(photo, index) in photoList" :key="photo.id"
                            data-target="#Product_Photo_Gallery" data-slide-to="0" :class="index === 0 ? 'active' : ''"
                            :style="{ 'background-image': `url(${getImage('PhotoGallery/' + photo.image)})` }">
                        </li>
                    </ul>
                    <div class="carousel-inner">
                        <div v-for="(photo, index) in photoList" :key="'min_' + photo.id"
                            :class="index === 0 ? 'carousel-item active' : 'carousel-item'"
                            :style="{ 'background-image': `url(${getImage('PhotoGallery/' + photo.image)})` }">
                        </div>
                    </div>
                    <a class="carousel-control-prev" href="#Product_Photo_Gallery" data-slide="prev">
                        <span class="carousel-control-prev-icon"></span>
                    </a>
                    <a class="carousel-control-next" href="#Product_Photo_Gallery" data-slide="next">
                        <span class="carousel-control-next-icon"></span>
                    </a>
                </div>
            </div>
            <div class="right">
                <ul>
                    <li :style="{'background-image':`url(${getImage('products/' + product.image)})`}"></li>
                    <li>{{ product.intro }}</li>
                    <li class="key-value">
                        <label>发行日期：</label>
                        <span>{{ product.releaseDate | timeformater }}</span>
                    </li>
                    <li class="key-value">
                        <label>开发商：</label>
                        <span>{{ product.developers }}</span>
                    </li>
                    <li class="key-value">
                        <label>发行商：</label>
                        <span>{{ product.publisher }}</span>
                    </li>
                    <!-- <li class="key-value">
                        <label>待定：</label>
                        <span>---</span>
                    </li>
                    <li class="key-value">
                        <label>待定：</label>
                        <span>---</span>
                    </li> -->
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import 'bootstrap/js/dist/carousel'

export default {
    name: 'Product_Basic_Information',
    props: ['product', 'photoList']
}
</script>

<style>
#product_name {
    font-size: 1.8vw;
    font-weight: 500;
}

#basic_information {
    width: 70vw;
    height: 30vw;
    margin: 1vw auto 2vw auto;
    box-shadow: 0 0 0.5vw 0.1vw #909090;
    overflow: hidden;
    /*background: linear-gradient(white,#303030);*/
}

#basic_information>.left {
    float: left;
    width: 45vw;
    height: 30vw;
    box-shadow: 0 0 1vw 0.2vw #aeaeae;
}

#basic_information>.left .carousel-item {
    height: 25vw;
    background-size: 100% 100%;
}

#basic_information>.left .carousel-indicators {
    margin: 0;
    bottom: -5vw;
    height: 5vw;
    right: initial;
}

#basic_information>.left .carousel-indicators>li {
    border: 0;
    height: 4.5vw;
    width: 8vw;
    margin: 0.25vw 0 0 0.25vw;
    background-size: 100% 100%;
}

#basic_information>.right {
    float: right;
    width: 24vw;
    height: 30vw;
    box-shadow: 0 0 0.5vw 0.1vw #aeaeae;
}

#basic_information>.right>ul {
    width: 100%;
    list-style: none;
}

#basic_information>.right>ul>li:nth-child(1) {
    height: 12vw;
    background-size: 100% 100%;
    margin-bottom: 0.5vw;
}

#basic_information>.right>ul>li:nth-child(2) {
    padding: 0 1vw;
    font-size: 1vw;
    height: 7.3vw;
    overflow: hidden;
    margin-bottom: 1vw;
}

#basic_information>.right>ul>.key-value {
    padding: 0 1.5vw;
    font-size: 0.9vw;
    position: relative;
}

#basic_information>.right>ul>.key-value>label {
    color: #808080;
}

#basic_information>.right>ul>.key-value>span {
    position: absolute;
    left: 10vw;
    color: lightseagreen;
}
</style>