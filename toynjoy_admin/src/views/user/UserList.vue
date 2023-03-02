<template>
    <el-card class="page-content">
        <!-- 查询表单 -->
        <el-form ref="searchForm" :model="searchFormData" :inline="true">
            <el-row>
                <el-form-item prop="username">
                    <el-input v-model="searchFormData.username" placeholder="账号" />
                </el-form-item>
                <el-form-item prop="nickname">
                    <el-input v-model="searchFormData.nickname" placeholder="昵称" />
                </el-form-item>
                <el-form-item prop="email">
                    <el-input v-model="searchFormData.email" placeholder="邮箱" />
                </el-form-item>
                <el-form-item prop="lv">
                    <el-input v-model="searchFormData.lv" placeholder="等级" />
                </el-form-item>
                <el-form-item prop="typeId">
                    <el-select v-model="searchFormData.typeId" placeholder="类型">
                        <el-option label="全部" :value="null" />
                        <el-option v-for="ut in userTypes" :label="ut.typeName" :value="ut.id" />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="searchFormData.state" placeholder="状态">
                        <el-option label="全部" :value="null" />
                        <el-option label="禁用" :value="0" />
                        <el-option label="启用" :value="1" />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchFormSubmit(searchForm)">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-tooltip content="刷新" placement="top">
                        <el-button icon="Refresh" @click="searchFormReset(searchForm)" />
                    </el-tooltip>
                </el-form-item>
            </el-row>
        </el-form>
        <!-- 表格 -->
        <el-table v-loading="other.isloading" :data="userArry" highlight-current-row>
            <el-table-column prop="typeId" label="类型" :formatter="getTypeStr" />
            <el-table-column prop="username" label="账号" />
            <el-table-column prop="email" label="邮箱" />
            <el-table-column prop="nickname" label="昵称" />
            <el-table-column prop="lv" label="等级" />
            <el-table-column prop="registerTime" label="创建时间" :formatter="getDateStr" />
            <el-table-column prop="state" label="状态" :formatter="getStateStr" />
            <el-table-column fixed="right" label="操作" width="130">
                <template #default="scope">
                    <el-button type="primary" icon="EditPen" @click="openDialog(scope)" />
                    <el-button type="danger" icon="Lock" @click="changeState(scope)" />
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="pagination">
            <el-pagination background layout="prev, pager, next" :total="pagination.total" :page-size="pagination.pageSize"
                :current-page="pagination.currentPage" @update:current-page="changePage" />
        </div>
        <!-- 弹出框 -->
        <el-dialog class="info-dialog" v-model="other.editDialogVisible" width="835px" align-center draggable
            destroy-on-close>
            <UserEdit />
        </el-dialog>
    </el-card>
</template>

<script>
import { reactive, onMounted, ref } from 'vue'
import { getUserTypes, getUsers, getCount } from '@/api/user'
import { useStore } from 'vuex'
import UserEdit from '@/components/user/UserEdit.vue'

export default {
    name: 'UserList',
    components: {
        UserEdit
    },
    setup() {
        const store = useStore();

        const data = reactive({
            searchFormData: {
                username: null,
                nickname: null,
                email: null,
                lv: null,
                typeId: null,
                state: null,
            },
            userArry: [],
            userTypes: [],
            pagination: {
                total: 0,
                pageSize: 10,
                currentPage: 1
            },
            other: {
                isloading: false,
                editDialogVisible: false
            }
        });

        const doms = {
            searchForm: ref()
        }

        const eventCallbacks = {
            searchFormSubmit: (formRef) => {
                formRef.validate(async (valid) => {
                    if (valid) {
                        data.other.isloading = true;

                        let params = data.searchFormData;
                        data.pagination.total = await getCount(params);
                        params.page = data.pagination.currentPage - 1;
                        params.count = data.pagination.pageSize;

                        data.userArry.length = 0;
                        data.userArry.push(...await getUsers(params));

                        data.other.isloading = false;
                    }
                });
            },
            searchFormReset: (formRef) => {
                formRef.resetFields();
                eventCallbacks.searchFormSubmit(formRef);
            },
            changePage(currentPage) {
                data.pagination.currentPage = currentPage;
                eventCallbacks.searchFormSubmit(doms.searchForm.value);
            },
            openDialog(scope) {
                store.commit("user/SET_EDIT_USER", scope.row);
                data.other.editDialogVisible = true;
            }
        }

        const tableFormatter = {
            getTypeStr(rowData) {
                let type = data.userTypes.find(item => item.id === rowData.typeId);
                return type.typeName;
            },
            getStateStr(rowData) {
                return rowData.state == 1 ? '启用' : '禁用';
            },
            getDateStr(rowData) {
                let date = rowData.registerTime;
                return date.substring(0, date.indexOf('T'));
            }
        }

        onMounted(async () => {
            data.userTypes.push(...await getUserTypes());
            eventCallbacks.searchFormSubmit(doms.searchForm.value);
        });

        return {
            ...data,
            ...doms,
            ...tableFormatter,
            ...eventCallbacks
        }
    }
}
</script>

<style scoped>
.pagination {
    padding-top: 20px;
}
</style>