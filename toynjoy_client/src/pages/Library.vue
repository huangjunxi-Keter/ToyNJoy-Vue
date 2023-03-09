<template>
    <div class="bodyer">
        <div class="top">
            <ul class="control">
                <li>
                    <dropdowns :dropdownsData="orderDropdowns" @handleChange="changeOrderBy" />
                </li>
                <li>
                    <dropdowns :dropdownsData="typeDropdowns" title="类型：" @handleChange="changeType" />
                </li>
                <li class="refresh" :style="{ 'background-image': `url('${getImage('system/sx_ogy.png')}')` }"
                    @click="renovate">
                </li>
            </ul>
            <search @handleSearch="clickSearch" />
        </div>
        <div class="content">
            <product-box v-for="ld in LibraryData" :product="ld.product" />
        </div>
        <pagination :page="page" @updateData="searchLibrary" />
        <div style="clear:both;"></div>
    </div>
</template>

<script>
import Dropdowns from '@/components/Basic/Dropdowns.vue';
import Search from '@/components/Basic/Search.vue'
import Product_Box from '@/components/Product_Box.vue';
import Pagination from '@/components/Basic/Pagination.vue';

export default {
    name: 'Library',
    components: {
        'dropdowns': Dropdowns,
        'search': Search,
        'product-box': Product_Box,
        'pagination': Pagination
    },
    data() {
        return {
            LibraryData: [],
            orderDropdowns: [
                { name: '默认排序', val: '' },
                { name: '按名称排序', val: 'Name' },
                { name: '按添加日期排序', val: 'JoinTime' },
            ],
            typeDropdowns: [
                { name: '全部', val: '' }
            ],
            typeId: '',
            orderby: '',
            name: '',
            page: {
                dataTotal: 0,
                pageItem: 12,
                pageTotal: 0,
                nowPage: 1,
                previous: 0,
                next: 2
            }
        }
    },
    methods: {
        searchLibrary(newPage) {
            let params = {
                name: this.name,
                typeId: this.typeId,
                orderby: this.orderby,
            };

            this.myAxios({
                url: 'Library/findCount',
                params,
                success: (response) => {
                    this.page.dataTotal = response.data;
                    this.page.pageTotal = Math.ceil(this.page.dataTotal / this.page.pageItem);

                    if (newPage)
                        this.page.nowPage = newPage;

                    this.myAxios({
                        url: 'Library/find',
                        params: {
                            ...params,
                            page: this.page.nowPage - 1,
                            count: this.page.pageItem
                        },
                        success: (response) => {
                            this.LibraryData = response.data;
                        }
                    });
                }
            });
        },
        changeOrderBy(orderbyStr) {
            this.orderby = orderbyStr;
            this.searchLibrary(1);
        },
        changeType(typeId) {
            this.typeId = typeId;
            this.searchLibrary(1);
        },
        renovate() {
            this.$router.go(0);
        },
        clickSearch(searchStr) {
            if (searchStr !== this.name) {
                this.name = searchStr;
                this.searchLibrary(1);
            }
        }
    },
    created() {
        this.myAxios({
            url: 'ProductType/find',
            success: (response) => {
                for (let ptype of response.data) {
                    this.typeDropdowns.push({ name: ptype.typeName, val: ptype.id });
                }
            }
        });
    },
    mounted() {
        this.searchLibrary();
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