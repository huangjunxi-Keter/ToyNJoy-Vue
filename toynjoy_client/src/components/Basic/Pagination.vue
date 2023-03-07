<template>
    <ul class="pagination" :style="{ 'width': `${34.09 * (pageList.length + 2)}px` }">
        <li class="page-item">
            <a @click.prevent="changePage(1)" class="page-link" aria-label="Previous">
                <span>&laquo;</span>
            </a>
        </li>
        <li class="page-item" v-for="pageNum in pageList">
            <a @click.prevent="changePage(pageNum)" :class="`page-link ${page.nowPage === pageNum ? 'active' : ''}`">
                {{ pageNum }}
            </a>
        </li>
        <li class="page-item">
            <a @click.prevent="changePage(page.pageTotal)" class="page-link" aria-label="Next">
                <span>&raquo;</span>
            </a>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'Pagination',
    computed: {
        //#region 计算分页组件要显示的页码
        pageList() {
            let result = [];
            let basicNumber = 0;

            if (this.page.nowPage == 1) {
                basicNumber = 1;
            } else if (this.page.nowPage == this.page.pageTotal) {
                basicNumber = this.page.pageTotal - 2;
            } else {
                basicNumber = this.page.nowPage - 1;
            }

            for (let i = basicNumber; i < basicNumber + 3; i++) {
                if (i > 0 && i <= this.page.pageTotal) {
                    result.push(i);
                }
            }

            return result;
        },
        //#endregion
    },
    methods: {
        changePage(page) {
            this.$emit('updateData', page);
        }
    },
    props: ['page']
}
</script>

<style scoped>
.pagination {
    margin: 0 auto;
    clear: both;
}

.page-link {
    color: #666;
    user-select: none;
    cursor: pointer;
}

.page-link.active {
    color: #111;
}
</style>