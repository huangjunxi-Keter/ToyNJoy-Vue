<template>
  <el-card class="page-content">
    <!-- 表头工具 -->
    <el-form
      ref="searchForm"
      :model="searchFormData"
      :rules="searchFormRules"
      :inline="true"
    >
      <el-form-item prop="name">
        <el-input v-model="searchFormData.name" placeholder="名称" />
      </el-form-item>
      <el-form-item prop="maxPrice">
        <el-input
          v-model.number="searchFormData.maxPrice"
          placeholder="最高价格"
        />
      </el-form-item>
      <el-form-item prop="minPrice">
        <el-input
          v-model.number="searchFormData.minPrice"
          placeholder="最低价格"
        />
      </el-form-item>
      <el-form-item prop="typeId">
        <el-select v-model="searchFormData.typeId" placeholder="类型">
          <el-option
            v-for="pt in productTypes"
            :label="pt.typeName"
            :value="pt.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="typeId">
        <el-select v-model="searchFormData.orderby" placeholder="排序方式">
          <el-option
            v-for="item in productOrderKeys"
            :label="item.name"
            :value="item.key"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-tooltip content="搜索" placement="top">
          <el-button
            type="primary"
            icon="Search"
            @click="searchFormSubmit(searchForm)"
          ></el-button>
        </el-tooltip>
      </el-form-item>
      <el-form-item>
        <el-tooltip content="刷新" placement="top">
          <el-button
            icon="Refresh"
            @click="searchFormReset(searchForm)"
          ></el-button>
        </el-tooltip>
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <el-table v-loading="other.loading" :data="productArray" highlight-current-row>
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="typeId" label="类型" :formatter="productType" />
      <el-table-column prop="price" label="价格" :formatter="priceStr" />
      <el-table-column prop="discount" label="折扣" :formatter="discountStr" />
      <el-table-column prop="browse" label="浏览量" />
      <el-table-column prop="purchases" label="销量" />
      <el-table-column fixed="right" label="操作" width="130">
        <template #default="scope">
          <el-button
            type="primary"
            icon="InfoFilled"
            @click="other.editDialogVisible = true"
          />
          <el-button type="danger" icon="Delete" />
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="pagination.total"
        :page-size="pagination.pageSize"
        :current-page="pagination.currentPage"
        @update:current-page="changePage"
      />
    </div>
    <!-- 详情 -->
    <el-dialog
      class="info-dialog"
      v-model="other.editDialogVisible"
      title="详情"
      align-center
      draggable
    >
      <ProductInfo />
    </el-dialog>
  </el-card>
</template>

<script>
import { reactive, ref, onMounted } from "vue";
import { getProductsCount, getProducts, getProductTypes } from "@/api/product";
import ProductInfo from "@/components/product/ProductInfo.vue";

export default {
  name: "ProductList",
  components: {
    ProductInfo,
  },
  setup() {
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
        orderby: null,
      },
      searchFormRules: {
        maxPrice: [{ type: "number", message: "只能输入数字" }],
        minPrice: [{ type: "number", message: "只能输入数字" }],
      },
      other: {
        editDialogVisible: false,
        loading: false,
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
        data.other.loading = true;
        // 表单验证
        formRef.validate(async (valid) => {
          if (valid) {
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
    };

    //#region 表格数据格式化
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
        if (cellValue * 100 > 100) {
          result = `${cellValue * 100}%`;
        }
        return result;
      },
    };
    //#endregion

    onMounted(async () => {
      eventCallbacks.searchFormSubmit(doms.searchForm.value);
      data.productTypes.push(...(await getProductTypes()));
      data.productTypes.unshift({ typeName: "全部", id: null });
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
.page-content {
  border: 0;
  min-height: 100%;
}

.pagination {
  padding-top: 20px;
}

.info-dialog {
  width: 10000px;
  max-width: 10000px;
  min-width: 10000px;
}
</style>
