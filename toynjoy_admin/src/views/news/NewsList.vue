<template>
    <el-card class="page-content">
        <!-- 表头工具 -->
        <el-form ref="searchForm" :model="searchFormData" :inline="true">
            <el-form-item prop="title">
                <el-input v-model="searchFormData.title" placeholder="标题"></el-input>
            </el-form-item>
            <el-form-item prop="text">
                <el-input v-model="searchFormData.text" placeholder="内容"></el-input>
            </el-form-item>
            <el-form-item prop="date">
                <el-date-picker v-model="searchFormData.date" type="date" placeholder="更新时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="default" @click="searchFormSubmit()">查询</el-button>
                <el-tooltip content="刷新" placement="top">
                    <el-button icon="Refresh" @click="searchFormReset(searchForm)" />
                </el-tooltip>
            </el-form-item>
        </el-form>
        <el-form-item>
            <el-button type="primary" icon="Plus" @click="openDialog()">新增</el-button>
        </el-form-item>
        <!-- 表格 -->
        <el-table v-loading="other.isloading" :data="newsArry">
            <el-table-column prop="title" label="标题"></el-table-column>
            <el-table-column prop="pageView" label="浏览量" />
            <el-table-column prop="updateTime" label="更新时间" :formatter="getDateStr" />
            <el-table-column fixed="right" label="操作" width="130">
                <template #default="scope">
                    <el-button type="primary" icon="EditPen" @click="openDialog(scope)" />
                    <el-button type="danger" icon="Delete" @click="delNews(scope)" />
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="pagination">
            <el-pagination background layout="prev, pager, next" :total="pagination.total" :page-size="pagination.pageSize"
                :current-page="pagination.currentPage" @update:current-page="changePage" />
        </div>
        <!-- dialog -->
        <el-dialog v-model="other.editDialogVisible" :title="other.editDialogTitle" :close-on-click-modal="false"
            :close-on-press-escape="false" align-center destroy-on-close :before-close="dialogBeforeClose">
            <NewsEdit />
        </el-dialog>
    </el-card>
</template>

<script>
import { reactive, ref, onMounted } from "vue";
import { useStore } from "vuex";
import { ElMessage, ElMessageBox } from 'element-plus';
import { getNews, getNewsCount, deleteNews } from "@/api/news";
import NewsEdit from "@/components/news/NewsEdit.vue";

export default {
    name: 'NewsList',
    components: {
        NewsEdit
    },
    setup() {
        const store = useStore();

        const data = reactive({
            searchFormData: {
                title: null,
                text: null,
                date: null,
                productId: null,
                typeId: null
            },
            newsArry: [],
            pagination: { total: 0, pageSize: 10, currentPage: 1 },
            other: {
                isloading: false,
                editDialogVisible: false,
                editDialogTitle: ''
            }
        });

        const doms = {
            searchForm: ref()
        }

        const eventCallBacks = {
            searchFormSubmit: async () => {
                data.other.isloading = true;
                let params = data.searchFormData;
                data.pagination.total = await getNewsCount(params);
                params.page = data.pagination.currentPage - 1;
                params.count = data.pagination.pageSize;
                data.newsArry.length = 0;
                data.newsArry.push(...await getNews(params));
                data.other.isloading = false;
            },
            searchFormReset: (formRef) => {
                formRef.resetFields();
                eventCallBacks.searchFormSubmit();
            },
            changePage: (currentPage) => {
                data.pagination.currentPage = currentPage;
                eventCallBacks.searchFormSubmit();
            },
            openDialog(scope) {
                if (!!scope) {
                    data.other.editDialogTitle = "编辑";
                    store.commit("news/SET_EDIT_NEWS", scope.row);
                } else {
                    data.other.editDialogTitle = "创建";
                    store.commit("news/SET_EDIT_NEWS", null);
                }
                data.other.editDialogVisible = true;
            },
            dialogBeforeClose(done) {
                eventCallBacks.searchFormSubmit();
                done();
            },
            delNews(scope) {
                ElMessageBox.confirm(
                    `确定要删除《${scope.row.title}》吗？`,
                    '操作确认',
                    {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                    })
                    .then(() => {
                        let response = deleteNews(scope.row.id);
                        if (response) {
                            ElMessage.success("删除成功");
                            eventCallBacks.searchFormSubmit();
                        } else {
                            ElMessage.error("删除失败");
                        }
                    });
            }
        }

        const tableFormatter = {
            getDateStr(row, column, cellValue, index) {
                return cellValue.substring(0, cellValue.indexOf("T"))
            }
        }

        onMounted(() => {
            eventCallBacks.searchFormSubmit();
        });

        return {
            ...data,
            ...doms,
            ...eventCallBacks,
            ...tableFormatter
        }
    }
}
</script>

<style scoped></style>