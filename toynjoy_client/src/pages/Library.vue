<template>
    <div class="bodyer">
        <div class="top">
            <ul class="control">
                <li>
                    <order-dropdowns :orderTypes="[{ name: '', val: '' }]" />
                </li>
                <li>
                    <order-dropdowns :orderTypes="[{ name: '', val: '' }]" />
                </li>
                <li class="refresh" :style="{ 'background-image': `url('${getImage('system/sx_ogy.png')}')` }">
                </li>
            </ul>
            <search />
        </div>
        <div class="content">
            <product-box v-for="ld in LibraryData" :product="ld.product" />
        </div>
        <div style="clear:both;"></div>
    </div>
</template>

<script>
import Order_Dropdowns from '@/components/Basic/Order_Dropdowns.vue';
import Search from '@/components/Basic/Search.vue'
import Product_Box from '@/components/Product_Box.vue';

export default {
    name: 'Library',
    data() {
        return {
            LibraryData: []
        }
    },
    components: {
        'order-dropdowns': Order_Dropdowns,
        'search': Search,
        'product-box': Product_Box
    },
    mounted() {
        this.myAxios({
            headers: {
                Authorization: `Bearer ${localStorage.getItem('LoginUserToken')}`
            },
            url: 'Library/find',
            data: {},
            success: (response) => {
                this.LibraryData = response.data;
            }
        });
    }
}
</script>

<style scoped>
.bodyer {
    padding: 40px 40px 20px 40px;
}

.top {
    width: 100%;
    padding: 0 30px 0 25px;
}

.control {
    float: left;
    list-style: none;
    margin: 0;
}

.control>li {
    float: left;
    margin-left: 20px;
}

.refresh {
    height: 40px;
    width: 40px;
    background-size: 100%;
    background-position: center center;
    background-repeat: no-repeat;
    cursor: pointer;
    transition: 0.3s;
}

.refresh:hover {
    transition: 0.2s;
    transform: rotate(540deg);
}

.content {
    padding: 30px 20px 20px 20px;
}

.content>* {
    margin: 20px;
}
</style>