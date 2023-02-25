<template>
  <el-tabs type="border-card">
    <el-tab-pane label="基本信息">
      <ProductEdit />
    </el-tab-pane>
    <el-tab-pane label="配置信息">Config</el-tab-pane>
    <el-tab-pane label="商品图集">Role</el-tab-pane>
  </el-tabs>
</template>

<script>
import ProductEdit from "@/views/product/ProductEdit.vue";

export default {
  name: "ProductInfo",
  components: {
    ProductEdit,
  },
};
</script>

<style scoped></style>
