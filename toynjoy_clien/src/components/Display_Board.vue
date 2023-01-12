<template>
    <div id="new_product_4">
        <!--最新的前4个游戏-->
        <div v-for="product in newProduct_4" href="#" :id="product.id"
            :style="{ 'background-image': `url(${getImage('products/' + product.image)})` }">
            <div :id="`d@(${product.id})`" state="close">
                <p class="title" :href="`#d@(${product.id})`">{{ product.name }}</p>
                <div class="content">
                    <div class="info"> {{ product.intro }} </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Display_Board',
    data() {
        return {
            newProduct_4: []
        }
    },
    mounted() {
        this.axiosGet('Product/find', { orderby: 'ReleaseDate', count: 4 })
            .then((response) => {
                this.newProduct_4 = response.data
                // console.log(this.newProduct_4);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}
</script>

<style scoped>
#new_product_4 {
    /*商品前4*/
    width: 100%;
    min-width: 1300px;
    /* height: 100vh;
    min-height: 800px; */
    user-select: none;
}

#new_product_4>div {
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

#new_product_4>div>div {
    position: absolute;
    bottom: 0;
    width: 100%;
    /* height: 5vw; */
    height: 8vh;
    min-height: 60px;
    transition: 0.5s;
    overflow: hidden;
}

#new_product_4 .title {
    /* height: 3.5vw; */
    /* line-height: 3vw; */
    height: 50px;
    line-height: 50px;
    font-size: 35px;
    color: white;
    padding-left: 2vw;
    cursor: pointer;
}

#new_product_4 .content {
    width: 100%;
    height: 0;
    overflow: hidden;
}

#new_product_4 .content>div {
    float: left;
    width: 50%;
    height: 14.5vw;
    background-color: rgba(255, 255, 255, 0.6);

}

#new_product_4 .info {
    padding: 0.5vw;
    overflow-y: auto;
    text-indent: 2em;
}

#new_product_4 .carousel-item>img {
    height: 14.5vw;
}
</style>