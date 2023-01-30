<template>
    <div class="bodyer">
        <div class="products">
            <div class="productBoxs">
                <product-box v-for="product in products" :product="product" :inStore="true" />
            </div>
            <pagination :page="page" @updateData="getProducts" />
        </div>
        <filter-sidebar @updateData="getProducts" />
    </div>
</template>

<script>
import Product_Box from '@/components/Product_Box.vue';
import Pagination from '@/components/Basic/Pagination.vue';
import Filter_Sidebar from '@/components/Basic/Filter_Sidebar.vue';

export default {
    name: 'Store',
    data() {
        return {
            page: {
                dataTotal: 0,
                pageItem: 15,
                pageTotal: 0,
                nowPage: 1,
                previous: 0,
                next: 2
            },
            products: []
        }
    },
    methods: {
        //#region 根据页码，获取分页后的数据
        getProducts(newPage, query) {
            this.page.nowPage = newPage;
            
            this.myAxios({
                url: 'product/find',
                params: {
                    page: this.page.nowPage - 1,
                    count: this.page.pageItem,
                    ...query
                },
                success: (response) => {
                    // console.log(response);
                    this.products = response.data;
                }
            });
        },
        //#endregion
    },
    components: {
        'product-box': Product_Box,
        'filter-sidebar': Filter_Sidebar,
        'pagination': Pagination
    },
    mounted() {
        //#region 初始化分页数据
        this.myAxios({
            url: 'product/count',
            success: (response) => {
                this.page.dataTotal = response.data;
                this.page.pageTotal = Math.ceil(this.page.dataTotal / this.page.pageItem);
                this.getProducts(1);
            }
        });
        //#endregion
    }
}
</script>

<style scoped>
.bodyer {
    padding: 20px 0px 0px 90px;
    position: relative;
}

.background{
    position: absolute;
    top: 0;
    left: 0;
    width: 99vw;
    height: 100%;
}

.background * {
    height: 100%;
}

.products {
    width: 66vw;
}

.productBoxs {
    width: 100%;
    min-height: 62.65vh;
}
</style>