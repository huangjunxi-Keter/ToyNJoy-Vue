<template>
    <div @click="boxClick" class="product" :style="{ backgroundImage: `url('${getImage('products/' + product.image)}')` }">
        <p v-if="showPrice">
            <span class="name">{{ product.name }}</span>
            <span class="price" v-if="product.price == '0'">免费</span>
            <span class="price" v-else>￥{{ product.price }}</span>
        </p>
        <div v-else class="tool-box" @click="download">
            <div class="left">
                <span>下载游戏</span>
            </div>
            <div class="right" @click="go('product', { id: product.id })">
                <span>查看商店</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Product_Box',
    props: ['product', 'showPrice'],
    methods: {
        boxClick() {
            if (this.showPrice) {
                this.go('product', { id: this.product.id });
            }
        },
        download() {
            if (this.product.fileName) {
                this.myAxios({
                    config: {
                        responseType: "blob"
                    },
                    url: 'System/download',
                    params: {
                        path: '/Games',
                        fileName: this.product.fileName
                    },
                    success: (response) => {
                        const { data } = response
                        let url = window.URL.createObjectURL(data);
                        let file = document.createElement('a');
                        document.body.appendChild(file);
                        file.href = url;
                        file.download = `${this.product.name}.exe`;
                        file.click();
                        window.URL.revokeObjectURL(url);
                    }
                });
            } else {
                console.error("获取文件失败");
            }
        }
    }
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
    overflow: hidden;
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
    user-select: none;
}

.product>p>.name {
    margin-left: 10px;
}

.product>p>.price {
    float: right;
    margin-right: 10px;
}

/* 库 浮动工具 */
.tool-box {
    position: relative;
    height: 100%;
    width: 100%;
}

.tool-box>.left,
.tool-box>.right {
    width: 0;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    letter-spacing: 0.5em;
    user-select: none;
    background-color: rgba(0, 0, 0, 0.6);
    transition: 0.4s;
}

.tool-box>.left {
    position: absolute;
    top: 0;
    left: 0;
}

.tool-box>.right {
    position: absolute;
    top: 0;
    right: 0;
}

.tool-box:hover .left,
.tool-box:hover .right {
    width: 50%;
}

.tool-box:hover .left:hover,
.tool-box:hover .right:hover {
    background-color: rgba(0, 0, 0, 0.85);
}

.tool-box>.left>*,
.tool-box>.right>* {
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    opacity: 0;
    transition: 0.4s;
}

.tool-box:hover .left *,
.tool-box:hover .right * {
    opacity: 1;
}

.tool-box:hover .left:hover *,
.tool-box:hover .right:hover * {
    color: #ccc;
}
</style>