<template>
  <el-card class="page-content">
    <!-- 表头工具 -->
    <el-row>
      <el-form ref="searchForm" :model="searchFormData" :rules="searchFormRules" :inline="true">
        <el-form-item prop="name">
          <el-input v-model="searchFormData.name" placeholder="名称" />
        </el-form-item>
        <el-form-item prop="maxPrice">
          <el-input v-model.number="searchFormData.maxPrice" placeholder="最高价格" />
        </el-form-item>
        <el-form-item prop="minPrice">
          <el-input v-model.number="searchFormData.minPrice" placeholder="最低价格" />
        </el-form-item>
        <el-form-item prop="typeId">
          <el-select v-model="searchFormData.typeId" placeholder="类型">
            <el-option v-for="pt in productTypes" :label="pt.typeName" :value="pt.id" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="searchFormData.state" placeholder="状态">
            <el-option label="全部状态" :value="null" />
            <el-option label="禁用" :value="0" />
            <el-option label="启用" :value="1" />
          </el-select>
        </el-form-item>
        <el-form-item prop="orderby">
          <el-select v-model="searchFormData.orderby" placeholder="排序方式">
            <el-option v-for="item in productOrderKeys" :label="item.name" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchFormSubmit(searchForm)">查询</el-button>
          <el-tooltip content="刷新" placement="top">
            <el-button icon="Refresh" @click="searchFormReset(searchForm)" />
          </el-tooltip>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <el-form-item>
        <el-button type="primary" icon="Plus" @click="openDialog(false)">新增</el-button>
      </el-form-item>
    </el-row>

    <!-- 表格 -->
    <el-table v-loading="other.loading" :data="productArray" highlight-current-row>
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="typeId" label="类型" :formatter="productType" />
      <el-table-column prop="price" label="价格" :formatter="priceStr" />
      <el-table-column prop="discount" label="折扣" :formatter="discountStr" />
      <el-table-column prop="browse" label="浏览量" />
      <el-table-column prop="purchases" label="销量" />
      <el-table-column prop="state" label="状态" :formatter="stateStr" />
      <el-table-column fixed="right" label="操作" width="130">
        <template #default="scope">
          <el-button type="primary" icon="EditPen" @click="openDialog(true, scope)" />
          <el-button v-if="scope.row.state === 1" type="danger" icon="Lock" @click="changeState(scope, 0)" />
          <el-button v-else type="success" icon="Unlock" @click="changeState(scope, 1)" />
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination background layout="prev, pager, next" :total="pagination.total" :page-size="pagination.pageSize"
        :current-page="pagination.currentPage" @update:current-page="changePage" />
    </div>
    <!-- 弹出框 -->
    <el-dialog class="info-dialog" v-model="other.editDialogVisible" :title="other.dialogTitle" align-center draggable
      destroy-on-close :before-close="dialogBeforeClose">
      <ProductInfo v-if="other.isInfo" />
      <ProductEdit v-else />
    </el-dialog>
  </el-card>
</template>

<script>
import { reactive, ref, onMounted } from "vue";
import { useStore } from 'vuex';
import { ElMessage, ElMessageBox } from "element-plus";
import { getProductsCount, getProducts, getProductTypes, updateProduct } from "@/api/product";
import { cloneObj } from "@/utils/basic";
import ProductInfo from "@/components/product/ProductInfo.vue";
import ProductEdit from "@/components/product/ProductEdit.vue";

export default {
  name: "ProductList",
  components: {
    ProductInfo,
    ProductEdit
  },
  setup() {
    const store = useStore();

    // 绑定数据
    const data = reactive({
      productOrderKeys: [
        { name: "默认排序", key: null },
        { name: "名称排序", key: "Name" },
        { name: "价格排序", key: "Price" },
        { name: "发布排序", key: "ReleaseDate" },
        { name: "热度排序", key: "Browse" },
        { name: "销量排序", key: "Purchases" },
        { name: "折扣排序", key: "Discount" },
      ],
      productArray: [],
      productTypes: [],
      pagination: {
        total: 0,
        pageSize: 10,
        currentPage: 1,
      },
      searchFormData: {
        name: null,
        maxPrice: null,
        minPrice: null,
        typeId: null,
        state: null,
        orderby: null,
      },
      searchFormRules: {
        maxPrice: [{ type: "number", message: "只能输入数字" }],
        minPrice: [{ type: "number", message: "只能输入数字" }],
      },
      other: {
        editDialogVisible: false,
        loading: false,
        isInfo: false,
        dialogTitle: ''
      },
    });

    // DOM
    const doms = {
      searchForm: ref(),
    };

    // 事件回调
    const eventCallbacks = {
      // 当前页改变
      changePage: (currentPage) => {
        data.pagination.currentPage = currentPage;
        eventCallbacks.searchFormSubmit(doms.searchForm.value);
      },
      // 搜索
      searchFormSubmit: (formRef) => {
        // 表单验证
        formRef.validate(async (valid) => {
          if (valid) {
            data.other.loading = true;
            let params = {
              ...data.searchFormData,
              page: data.pagination.currentPage - 1,
              count: data.pagination.pageSize,
            };
            let total = await getProductsCount(params);
            data.pagination.total = total;
            let productArray = await getProducts(params);
            data.productArray.length = 0;
            data.productArray.push(...productArray);
            data.other.loading = false;
          }
        });
      },
      // 表单重置
      searchFormReset(formRef) {
        formRef.resetFields();
        eventCallbacks.searchFormSubmit(doms.searchForm.value);
      },
      // 打开详情
      openDialog(isInfo, rowScope) {
        data.other.isInfo = isInfo;
        data.other.dialogTitle = isInfo ? '详情' : '创建一个商品';
        store.commit('product/SET_PRODUCT_DATA', rowScope ? rowScope.row : null);
        data.other.editDialogVisible = true;
      },
      dialogBeforeClose(done) {
        eventCallbacks.searchFormSubmit(doms.searchForm.value);
        done();
      },
      async changeState(scope, state) {
        if (!!scope.row.fileName || state === 0) {
          let data = cloneObj(scope.row);
          data.state = state;
          if (await updateProduct(data))
            eventCallbacks.searchFormSubmit(doms.searchForm.value);
          else
            ElMessage.error("更新失败");
        } else {
          ElMessageBox.alert('该商品还未上传文件', '警告', {
            confirmButtonText: 'OK',
            type: 'warning',
          });
        }
      }
    };

    // 表格数据格式化
    const tableFormatter = {
      productType: (row, column, cellValue, index) => {
        let result = "";
        let type = data.productTypes.find((item) => item.id === cellValue);
        if (type) {
          result = type.typeName;
        }
        return result;
      },
      priceStr: (row, column, cellValue, index) => {
        let result = "免费";
        if (cellValue > 0) {
          result = `￥${cellValue}.00`;
        }
        return result;
      },
      discountStr: (row, column, cellValue, index) => {
        let result = "无";
        if (cellValue < 1) {
          result = `${cellValue * 10}折`;
        }
        return result;
      },
      stateStr: (row, column, cellValue, index) => {
        return cellValue === 1 ? "启用" : "禁用";
      }
    };

    onMounted(async () => {
      eventCallbacks.searchFormSubmit(doms.searchForm.value);
      data.productTypes.push(...(await getProductTypes()));
      data.productTypes.unshift({ typeName: "全部类型", id: null });
    });

    return {
      ...data,
      ...doms,
      ...eventCallbacks,
      ...tableFormatter,
    };
  },
};
</script>

<style scoped>
.info-dialog {
  width: 10000px;
  max-width: 10000px;
  min-width: 10000px;
}
</style>
