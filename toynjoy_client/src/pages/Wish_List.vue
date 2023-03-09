<template>
    <div class="bodyer">
        <div class="title">
            <div class="userBox">
                <div class="virtualImage"
                    :style="{ 'background-image': `url('${getImage('user/' + userData.virtualImage)}')` }">
                </div>
                <span class="nickname">{{ userData.nickname }} 的愿望单</span>
            </div>
            <div class="controls">
                <input v-model="name" class="search" placeholder="按名称搜索">
                <dropdowns :dropdownsData="dropdownsData" @handleChange="getWishList" class="orderComponent" />
            </div>
        </div>

        <product-box-long v-for="wishlist in wishLists" :wishlist="wishlist" />
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Product_Box_Long from '@/components/Product_Box_Long.vue';
import Dropdowns from '@/components/Basic/Dropdowns.vue';

export default {
    name: 'Wish_List',
    components: {
        'product-box-long': Product_Box_Long,
        'dropdowns': Dropdowns
    },
    data() {
        return {
            name: '',
            wishLists: [],
            dropdownsData: [
                { name: '默认排序', val: '' },
                { name: '根据名称排序', val: 'product.Name' },
                { name: '根据价格排序', val: 'product.Price' },
                { name: '根据添加日期排序', val: 'JoinDate' },
                { name: '根据发行日期排序', val: 'product.ReleaseDate' }
            ]
        }
    },
    computed: {
        ...mapState('user', ['userData'])
    },
    watch: {
        name(newVal, oldVal) {
            this.getWishList();
        }
    },
    methods: {
        getWishList(orderby) {
            this.myAxios({
                url: 'WishList/find',
                params: { 
                    name: this.name,
                    orderby
                },
                success: (response) => {
                    this.wishLists = response.data;
                }
            });
        }
    },
    mounted() {
        this.getWishList();
    }
}
</script>

<style scoped>
.bodyer {
    width: 1300px;
    padding-bottom: 20px;
}

.title {
    padding: 20px;
    background-color: white;
    box-shadow: 0 0 0.2vw 0.05vw #aeaeae;
    border-radius: 0 0 10px 10px;
}

.userBox {
    position: relative;
}

.virtualImage {
    height: 100px;
    width: 100px;
    display: inline-block;
    border-radius: 5px;
    background-repeat: no-repeat;
    background-size: auto 100%;
    background-position: center;
    box-shadow: 0 0 0.2vw 0.02vw #808080;
}

.nickname {
    font-size: 35px;
    color: #454545;
    padding-left: 20px;
    position: absolute;
    top: 25px
}

.controls {
    margin-top: 10px;
    position: relative;
}

.search {
    width: 70%;
    padding: 5px 10px;
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    background-color: rgba(150, 150, 150, 0.1);
    box-shadow: 0 0 3px rgb(255 255 255 / 50%) inset, 1px 1px 0 0 rgb(0 0 0 / 0%);
    outline: none;
}

.orderComponent {
    position: absolute;
    right: 0;
}
</style>