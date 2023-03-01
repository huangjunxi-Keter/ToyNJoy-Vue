<template>
    <el-card v-loading="other.loading" class="page-content">
        <!-- 查询表单 -->
        <el-form ref="searchForm" :model="searchFormData" :inline="true">
            <el-row>
                <el-form-item prop="name">
                    <el-input v-model="searchFormData.name" placeholder="名称" />
                </el-form-item>
                <el-form-item>
                    <el-select v-model="searchFormData.state" placeholder="状态">
                        <el-option label="全部" :value="null" />
                        <el-option label="禁用" :value="0" />
                        <el-option label="启用" :value="1" />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchFormSubmit()">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-tooltip content="刷新" placement="top">
                        <el-button icon="Refresh" @click="searchFormReset()" />
                    </el-tooltip>
                </el-form-item>
            </el-row>
            <el-row>
                <el-button type="primary" icon="Plus" @click="openDialog(true)">新增</el-button>
            </el-row>
        </el-form>
        <!-- 表格 -->
        <el-table :data="productTypeArry" highlight-current-row>
            <el-table-column prop="typeName" label="名称" />
            <el-table-column prop="state" label="状态" :formatter="getStateStr" />
            <el-table-column prop="productCount" label="商品数量" />
            <el-table-column prop="averagePrice" label="均价" :formatter="getPriceStr" />
            <el-table-column prop="browse" label="相关商品浏览量" />
            <el-table-column prop="purchases" label="相关商品销量" />
            <el-table-column fixed="right" label="操作" width="130">
                <template #default="scope">
                    <el-button type="primary" icon="EditPen" @click="openDialog(false, scope)" />
                    <el-button type="danger" icon="Delete" @click="deleteType(scope)" />
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="pagination">
            <el-pagination background layout="prev, pager, next" :total="pagination.total" :page-size="pagination.pageSize"
                :current-page="pagination.currentPage" @update:current-page="changePage" />
        </div>
        <!-- 弹出框 -->
        <el-dialog class="info-dialog" v-model="other.editDialogVisible" :title="other.dialogTitle" width="255px"
            align-center draggable>
            <el-form ref="editForm" :model="editFormData" :rules="editFormRules">
                <el-form-item prop="typeName">
                    <el-input placeholder="类型名称" v-model="editFormData.typeName" />
                </el-form-item>
                <el-form-item>
                    <el-select v-model="editFormData.state" placeholder="状态">
                        <el-option label="禁用" :value="0" />
                        <el-option label="启用" :value="1" />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="editFormSubmit()">保存</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </el-card>
</template>

<script>
import { reactive, ref, onMounted } from 'vue'
import { getProductTypes, getTypeCount, createProductType, updateProductType, getProducts, deleteType } from '@/api/product'
import { ElMessage, ElMessageBox } from 'element-plus'

export default {
    name: 'ProductTypeList',
    setup() {
        const data = reactive({
            searchFormData: {
                name: null,
                state: null
            },
            editFormData: {
                id: null,
                state: 0,
                typeName: null
            },
            editFormRules: {
                typeName: [{ required: true, message: "请填写类型名称" }]
            },
            productTypeArry: [],
            pagination: {
                total: 0,
                pageSize: 10,
                currentPage: 1
            },
            other: {
                loading: false,
                dialogTitle: '',
                editDialogVisible: false
            }
        });

        const doms = {
            searchForm: ref(),
            editForm: ref()
        }

        const eventCallbacks = {
            searchFormSubmit: async () => {
                data.other.loading = true;
                // 获取表单查询条件
                let params = data.searchFormData;
                // 获取符合条件的总条数
                data.pagination.total = await getTypeCount(params);
                // 往查询条件中插入分页数据
                params.page = data.pagination.currentPage - 1;
                params.count = data.pagination.pageSize;
                // 获取符合条件的分页数据
                let productTypes = await getProductTypes(params);
                // 重置表格数据
                data.productTypeArry.length = 0;
                // 遍历符合条件的数据，查询相关商品
                for (let item of productTypes) {
                    // 获取当前遍历的元素的相关商品
                    let products = await getProducts({ typeId: item.id });
                    // 初始化变量
                    let averagePrice = 0; // 平均价格
                    let browse = 0; // 浏览量
                    let purchases = 0; // 销量
                    // 累加
                    for (let item of products) {
                        averagePrice += item.price;
                        browse += item.browse;
                        purchases += item.purchases;
                    }
                    // 复制到当前遍历项
                    item.productCount = products.length;
                    item.averagePrice = Math.ceil(averagePrice / products.length) || 0;
                    item.browse = browse;
                    item.purchases = purchases;
                    // 插入表格数据
                    data.productTypeArry.push(item);
                }
                data.other.loading = false;
            },
            changePage: (currentPage) => {
                data.pagination.currentPage = currentPage;
                eventCallbacks.searchFormSubmit();
            },
            searchFormReset: () => {
                doms.searchForm.value.resetFields();
                eventCallbacks.searchFormSubmit();
            },
            openDialog: (isCreate, scope) => {
                data.other.dialogTitle = isCreate ? '创建' : '编辑';
                if (!isCreate) {
                    data.editFormData.id = scope.row.id;
                    data.editFormData.typeName = scope.row.typeName;
                    data.editFormData.state = scope.row.state;
                } else {
                    data.editFormData.id = null;
                    data.editFormData.typeName = null;
                    data.editFormData.state = 0;
                }
                data.other.editDialogVisible = true;
            },
            editFormSubmit() {
                doms.editForm.value.validate(async (valid) => {
                    if (valid) {
                        let result = false;
                        if (!data.editFormData.id) {
                            result = await createProductType(data.editFormData);
                        } else {
                            result = updateProductType(data.editFormData);
                        }

                        if (result) {
                            ElMessage.success("保存成功");
                            data.other.editDialogVisible = false;
                            eventCallbacks.searchFormSubmit();
                        } else {
                            ElMessage.error("保存失败");
                        }
                    }
                });
            },
            deleteType(scope) {
                let productCount = scope.row.productCount;
                if (productCount > 0) {
                    ElMessage.warning("该分类已被使用，无法删除");
                } else {
                    ElMessageBox.confirm(
                        `确定要删除【${scope.row.typeName}】类型吗？`,
                        '操作确认',
                        {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning',
                        })
                        .then(() => {
                            let response = deleteType(scope.row.id);
                            if (response) {
                                ElMessage.success("删除成功");
                                eventCallbacks.searchFormSubmit();
                            } else {
                                ElMessage.error("删除失败");
                            }
                        });
                }
            }
        }

        const tableFormatter = {
            getPriceStr(row, column, cellValue, index) {
                return `￥${cellValue}.00`;
            },
            getStateStr(row, column, cellValue, index) {
                return cellValue === 0 ? '禁用' : '启用';
            }
        }

        onMounted(() => {
            eventCallbacks.searchFormSubmit();
        });

        return {
            ...data,
            ...doms,
            ...tableFormatter,
            ...eventCallbacks,
        }
    }
}
</script>

<style scoped>
.pagination {
    padding-top: 20px;
}
</style>