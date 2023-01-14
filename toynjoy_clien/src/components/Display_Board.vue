<template>
    <div id="display_board">
        <!--最新的前4个游戏-->
        <div v-for="product in products"
            :style="{ 'background-image': `url(${getImage('products/' + product.image)})` }">
            <div :ref="product.id" class="boxClose">
                <p class="titleClose" @click="infoSwitch(product.id)">{{ product.name }}</p>
                <div class="contentClose">
                    <div class="info"> {{ product.intro }} </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Display_Board',
    methods: {
        infoSwitch(ref) {
            let isOpen = this.$refs[ref][0].className === 'boxOpen' ? true : false;
            this.$refs[ref][0].className = isOpen ? 'boxClose' : 'boxOpen';
            this.$refs[ref][0].children[0].className = isOpen ? 'titleClose' : 'titleOpen';
            this.$refs[ref][0].children[1].className = isOpen ? 'contentClose' : 'contentOpen';
        }
    },
    props: ['products']
}
</script>

<style scoped>
#display_board {
    /*商品前4*/
    width: 100%;
    min-width: 1300px;
    /* height: 100vh;
    min-height: 800px; */
    user-select: none;
}

#display_board>div {
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
    /* float: left;
    width: 50%;
    height: 14.5vw;
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

    background-color: rgba(0, 0, 0, 0.6);
}

.contentOpen {
    width: 100%;
    overflow: hidden;
    transition: 0.5s;
    
    height: 70%;
}
</style>