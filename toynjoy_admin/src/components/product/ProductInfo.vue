<template>
  <el-tabs type="border-card">
    <el-tab-pane label="基本信息">
      <ProductEdit />
    </el-tab-pane>
    <el-tab-pane label="配置信息">
      <HardwareRequirement />
    </el-tab-pane>
    <el-tab-pane label="商品图集">
      <PhotoGallery />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import ProductEdit from "./ProductEdit.vue";
import HardwareRequirement from "./HardwareRequirement.vue";
import PhotoGallery from "./PhotoGallery.vue";

export default {
  name: "ProductInfo",
  components: {
    ProductEdit,
    HardwareRequirement,
    PhotoGallery
  },
};
</script>

<style scoped></style>
