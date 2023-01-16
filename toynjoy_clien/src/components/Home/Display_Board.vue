<template>
    <!--最新的前4个游戏-->
    <div class="display_board" :style="{ 'background-image': `url(${getImage('products/' + product.image)})` }">
        <div :ref="product.id" class="boxClose">
            <p class="titleClose" @click="infoSwitch(product.id)">{{ product.name }}</p>
            <div class="contentClose">
                <div class="info"> {{ product.intro }} </div>
                <div class="photo_gallery">
                    <div :id="`product_photo_${product.id}`" class="carousel slide" data-ride="carousel">
                        <div class="carousel-inner">
                            <div v-for="(photo, index) in photoList" :class="(index === 0) ? 'carousel-item active' : 'carousel-item'">
                                <img :src="getImage(`PhotoGallery/${photo.image}`)">
                            </div>
                        </div>
                        <a class="carousel-control-prev" :href="`#product_photo_${product.id}`" data-slide="prev">
                            <span class="carousel-control-prev-icon"></span>
                        </a>
                        <a class="carousel-control-next" :href="`#product_photo_${product.id}`" data-slide="next">
                            <span class="carousel-control-next-icon"></span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import 'bootstrap/js/dist/carousel'

export default {
    name: 'Display_Board',
    data() {
        return {
            photoList: []
        }
    },
    methods: {
        infoSwitch(ref) {
            let isOpen = this.$refs[ref].className === 'boxOpen' ? true : false;
            this.$refs[ref].className = isOpen ? 'boxClose' : 'boxOpen';
            this.$refs[ref].children[0].className = isOpen ? 'titleClose' : 'titleOpen';
            this.$refs[ref].children[1].className = isOpen ? 'contentClose' : 'contentOpen';
        }
    },
    mounted() {
        //#region 商品图集
        this.myAxios({
            url: 'ProductPhotoGallery/getByProductId',
            params: { id: this.product.id },
            success: (response) => {
                this.photoList = response.data;
            }
        });
        //#endregion
    },
    props: ['product']
}
</script>

<style scoped>
.display_board {
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    display: block;
    width: 50%;
    height: 50vh;
    min-height: 400px;
    float: left;
    position: relative;
}

.info {
    float: left;
    width: 50%;
    /* height: 14.5vw;
    background-color: rgba(255, 255, 255, 0.6); */
    padding: 0.5vw;
    overflow-y: auto;
    text-indent: 2em;
    color: white;
    font-size: 18px;
}

.boxClose {
    position: absolute;
    bottom: 0;
    width: 100%;
    min-height: 60px;
    overflow: hidden;
    transition: 0.5s;

    background-color: rgba(0, 0, 0, 0.65);
    height: 50px;
}

.titleClose {
    color: white;
    height: 50px;
    line-height: 50px;
    font-size: 35px;
    padding-left: 2vw;
    transition: 0.5s;
    cursor: pointer;

    background-color: transparent;
}

.contentClose {
    width: 100%;
    overflow: hidden;
    transition: 0.5s;

    height: 0%;
}

.boxOpen {
    position: absolute;
    bottom: 0;
    width: 100%;
    min-height: 60px;
    overflow: hidden;
    transition: 0.5s;

    background: rgba(0, 0, 0, 0.65);
    height: 70%;
}

.titleOpen {
    color: white;
    height: 50px;
    line-height: 50px;
    font-size: 35px;
    padding-left: 2vw;
    transition: 0.5s;
    cursor: pointer;

    background: rgba(0, 0, 0, 0.8);
}

.contentOpen {
    width: 100%;
    overflow: hidden;
    transition: 0.5s;

    height: 70%;
    background: rgba(0, 0, 0, 0.8);
}

.contentOpen>div,
.contentClose>div {
    float: left;
    width: 50%;
    height: 14.5vw;
    /* background-color:rgba(255,255,255,0.6); */
}

.carousel-item>img {
    width: 100%;
    height: 10vh;
    min-height: 228px;
}
</style>