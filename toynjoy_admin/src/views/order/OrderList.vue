<template>
    <el-card class="page-content">
        <!-- 表头工具 -->
        <el-form ref="searchForm" :inline="true" :model="searchFormData" :rules="searchFormRules">
            <el-form-item prop="orderId">
                <el-input v-model="searchFormData.orderId" placeholder="订单号" />
            </el-form-item>
            <el-form-item prop="username">
                <el-input v-model="searchFormData.username" placeholder="用户名" />
            </el-form-item>
            <el-form-item prop="minTotalAmount">
                <el-input v-model.number="searchFormData.minTotalAmount" placeholder="最小总价" />
            </el-form-item>
            <el-form-item prop="maxTotalAmount">
                <el-input v-model.number="searchFormData.maxTotalAmount" placeholder="最大总价" />
            </el-form-item>
            <el-form-item prop="state">
                <el-select v-model="searchFormData.state" placeholder="状态">
                    <el-option label="全部" :value="null" />
                    <el-option label="未支付" :value="0" />
                    <el-option label="已支付" :value="1" />
                    <el-option label="已关闭" :value="2" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchFormSubmit(searchForm)">查询</el-button>
                <el-tooltip content="刷新" placement="top">
                    <el-button icon="Refresh" @click="searchFormReset(searchForm)" />
                </el-tooltip>
            </el-form-item>
        </el-form>
        <!-- 表格 -->
        <el-table v-loading="other.isloading" :data="orderArry" stripe @expand-change="loadOrderItems">
            <el-table-column type="expand" #default="props" childBorder>
                <el-table :data="orderItems[props.row.id]" :border="true">
                    <el-table-column type="index" />
                    <el-table-column label="商品名称" prop="product.name" />
                    <el-table-column label="商品封面" prop="product.image" #default="{ row }">
                        <el-image loading="lazy" :src="getImageUrl(`/products/${row.product.image}`)" />
                    </el-table-column>
                    <el-table-column label="当前价格" prop="product.price" :formatter="getPriceStr" />
                    <el-table-column label="售价" prop="originalPrices" :formatter="getPriceStr" />
                    <el-table-column label="折扣" prop="discount" :formatter="getDiscountStr" />
                    <el-table-column label="实付" prop="payment" :formatter="getPriceStr" />
                </el-table>
            </el-table-column>
            <el-table-column prop="id" label="订单号"></el-table-column>
            <el-table-column prop="username" label="用户名" />
            <el-table-column prop="totalAmount" label="总价" :formatter="getPriceStr" />
            <el-table-column prop="createDate" label="创建时间" :formatter="getDateStr" />
            <el-table-column prop="state" label="状态" :formatter="getStateStr" />
            <el-table-column fixed="right" label="操作" width="130">
                <template #default="scope">
                    <block v-if="scope.row.state === 0">
                        <el-button type="warning" icon="Message" @click="SendEmail(scope)" />
                        <el-button type="danger" icon="Lock" @click="chnageOrderState(scope, 2)" />
                    </block>
                    <el-button v-if="scope.row.state === 2" type="success" icon="Unlock"
                        @click="chnageOrderState(scope, 0)" />
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="pagination">
            <el-pagination background layout="prev, pager, next" :total="pagination.total" :page-size="pagination.pageSize"
                :current-page="pagination.currentPage" @update:current-page="changePage" />
        </div>
    </el-card>
</template>

<script>
import { reactive, ref, onMounted } from "vue";
import { ElMessage } from 'element-plus';
import { getImageUrl } from '@/utils/request';
import { cloneObj } from '@/utils/basic';
import { getfindCount, getOrders, getOrderItems, updateOrder } from '@/api/order';
import { getUserData } from '@/api/user';
import { sendEmail } from "@/api/system";

export default {
    name: 'OrderList',
    setup() {
        const data = reactive({
            searchFormData: {
                orderId: null,
                username: null,
                minTotalAmount: null,
                maxTotalAmount: null,
                state: null
            },
            searchFormRules: {
                minTotalAmount: [{ type: 'number', message: '只输入数字' }],
                maxTotalAmount: [{ type: 'number', message: '只输入数字' }]
            },
            orderArry: [],
            orderItems: {},// key 为 orderId，value 为 items
            pagination: { total: 0, pageSize: 10, currentPage: 1 },
            other: { isloading: false }
        });

        const doms = {
            searchForm: ref()
        }

        const eventCallBacks = {
            searchFormSubmit: (formRef) => {
                formRef.validate(async (valid) => {
                    if (valid) {
                        data.other.isloading = true;
                        let params = data.searchFormData;
                        data.pagination.total = await getfindCount(params);
                        params.page = data.pagination.currentPage - 1;
                        params.count = data.pagination.pageSize;
                        data.orderArry.length = 0;
                        data.orderArry.push(...await getOrders(params));
                        data.other.isloading = false;
                    }
                });
            },
            searchFormReset: (formRef) => {
                formRef.resetFields();
                eventCallBacks.searchFormSubmit(doms.searchForm.value);
            },
            loadOrderItems: async (row, rows) => {
                /*
                    row：当前行
                    rows：所有展开的行
                    判断展开的行是否包含当前行数据，以实现判断展开和关闭
                */
                const isExpend = rows.some(r => r.id === row.id);
                if (isExpend && !data.orderItems[row.id]) {
                    data.orderItems[row.id] = [...await getOrderItems(row.id, true)];
                }
            },
            SendEmail: async (scope) => {
                let user = await getUserData(scope.row.username);
                let response = false;
                if (!!user) {
                    response = await sendEmail(user.email, "关于订单", `您还有一笔未支付的订单，订单号：${scope.row.id}`);
                }
                if (response)
                    ElMessage.success("发送成功");
                else
                    ElMessage.error("发送失败");
            },
            chnageOrderState: async (scope, state) => {
                let order = cloneObj(scope.row);
                order.state = state;
                let response = await updateOrder(order);
                if (response) {
                    eventCallBacks.searchFormSubmit(doms.searchForm.value);
                    ElMessage.success(!state ? "恢复成功" : "已关闭交易");
                }
                else
                    ElMessage.error(!state ? "恢复失败" : "关闭失败");
            }
        }

        const tableFormatter = {
            getPriceStr(row, column, cellValue, index) {
                return `￥${cellValue}.00`
            },
            getDateStr(row, column, cellValue, index) {
                return cellValue.substring(0, cellValue.indexOf("T"))
            },
            getStateStr(row, column, cellValue, index) {
                let result = "未知";
                switch (cellValue) {
                    case 0:
                        result = "未支付";
                        break;
                    case 1:
                        result = "已支付";
                        break;
                    case 2:
                        result = "已关闭";
                        break;
                }
                return result;
            },
            getDiscountStr(row, column, cellValue, index) {
                let result = "无";
                if (cellValue < 1) {
                    result = `${cellValue * 10}折`;
                }
                return result;
            }
        }

        onMounted(() => {
            eventCallBacks.searchFormSubmit(doms.searchForm.value);
        });

        return {
            ...data,
            ...doms,
            ...eventCallBacks,
            ...tableFormatter,
            getImageUrl
        }
    }
}
</script>

<style scoped></style>