<template>
    <div class="bodyer">
        <div class="products">
            <div class="productBoxs">
                <product-box v-for="product in products" :product="product" :showPrice="true" />
            </div>
            <pagination :page="page" @updateData="getProducts" />
        </div>
        <filter-sidebar class="filter-sidebar" @updateData="getProducts" />
    </div>
</template>

<script>
import Product_Box from '@/components/Product_Box.vue';
import Pagination from '@/components/Basic/Pagination.vue';
import Filter_Sidebar from '@/components/Basic/Filter_Sidebar.vue';

export default {
    name: 'Store',
    components: {
        'product-box': Product_Box,
        'filter-sidebar': Filter_Sidebar,
        'pagination': Pagination
    },
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
                    ...query,
                    state: 1
                },
                success: (response) => {
                    // console.log(response);
                    this.products = response.data;
                }
            });
        },
        //#endregion
    },
    mounted() {
        //#region 初始化分页数据
        this.myAxios({
            url: 'product/findCount',
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
    padding: 20px 80px 0px 80px;
    display: flex;
}

.products {
    flex: 1;
    margin: 20px;
    padding: 20px 0 20px 25px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 0 4px 0.5px #aeaeae;
}

.filter-sidebar {
    padding: 20px 0;
}
</style>