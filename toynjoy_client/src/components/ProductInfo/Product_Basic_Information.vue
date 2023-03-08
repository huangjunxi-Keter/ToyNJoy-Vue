<template>
    <div>
        <p id="product_name">{{ product.name }}</p>
        <div id="basic_information">
            <div class="left">
                <div id="Product_Photo_Gallery" class="carousel slide" data-ride="carousel">
                    <ul class="carousel-indicators">
                        <li v-for="(photo, index) in photoList" :key="'min_' + photo.id"
                            data-target="#Product_Photo_Gallery" :data-slide-to="index"
                            :class="index === 0 ? 'active' : ''"
                            :style="{ 'background-image': `url(${getImage('PhotoGallery/' + photo.image)})` }">
                        </li>
                    </ul>
                    <div class="carousel-inner">
                        <div v-for="(photo, index) in photoList" :key="photo.id"
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
                    <li :style="{ 'background-image': `url(${getImage('products/' + product.image)})` }"></li>
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

<style scoped>
#product_name {
    font-size: 1.8vw;
    font-weight: 500;
    padding-top: 1vw;
}

#basic_information {
    width: 70vw;
    min-width: 1000px;
    height: 30vw;
    min-height: 400px;
    margin: 1vw auto 2vw auto;
    box-shadow: 0 0 0.5vw 0.1vw #909090;
    overflow: hidden;
    /*background: linear-gradient(white,#303030);*/
}

#basic_information>.left {
    float: left;
    width: 65%;
    height: 100%;
    box-shadow: 0 0 1vw 0.2vw #aeaeae;
    background-color: white;
}

#basic_information>.left .carousel-item {
    height: 25vw;
    min-height: 330px;
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
    min-height: 60px;
    width: 8vw;
    min-width: 110px;
    margin: 0.25vw 0 0 0.25vw;
    background-size: 100% 100%;
}

#basic_information>.right {
    float: right;
    width: 24vw;
    min-width: 340px;
    height: 30vw;
    min-height: 435px;
    box-shadow: 0 0 0.5vw 0.1vw #aeaeae;
    background-color: white;
}

#basic_information>.right>ul {
    width: 100%;
    list-style: none;
}

#basic_information>.right>ul>li:nth-child(1) {
    height: 12vw;
    min-height: 170px;
    background-size: 100% 100%;
    margin-bottom: 0.5vw;
}

#basic_information>.right>ul>li:nth-child(2) {
    padding: 0 1vw;
    font-size: 1vw;
    height: 10.5vw;
    min-height: 130px;
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
    left: 200px;
    color: lightseagreen;
}
</style>