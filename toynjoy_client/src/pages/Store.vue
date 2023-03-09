<template>
    <div class="bodyer">
        <div class="products">
            <div class="productBoxs">
                <product-box v-for="product in products" :product="product" :showPrice="true" />
            </div>
            <pagination :page="page" @updateData="getProducts" />
        </div>
        <filter-sidebar class="filter-sidebar" @updateData="updateFilterParams" />
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
            filterParams: {},
            products: []
        }
    },
    methods: {
        //#region 根据页码，获取分页后的数据
        getProducts(newPage) {
            this.myAxios({
                url: 'product/findCount',
                params: this.filterParams,
                success: (response) => {
                    this.page.dataTotal = response.data;
                    this.page.pageTotal = Math.ceil(this.page.dataTotal / this.page.pageItem);

                    if (newPage)
                        this.page.nowPage = newPage;

                    this.myAxios({
                        url: 'product/find',
                        params: {
                            ...this.filterParams,
                            state: 1,
                            page: this.page.nowPage - 1,
                            count: this.page.pageItem,
                        },
                        success: (response) => {
                            // console.log(response);
                            this.products = response.data;
                        }
                    });
                }
            });
        },
        //#endregion

        //#region 更新查询条件 并 调用查询寻
        updateFilterParams(query) {
            this.filterParams = query;
            this.getProducts(1);
        },
        //#endregion
    },
    mounted() {
        this.getProducts();
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