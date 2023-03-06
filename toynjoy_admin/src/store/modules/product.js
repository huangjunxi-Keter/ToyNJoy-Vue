import { createProduct, updateProduct } from "@/api/product";
import { cloneObj } from "@/utils/basic";
export default {
  namespaced: true,
  actions: {
    edit_product: async ({ commit }, { product, editType }) => {
      let result = false;
      let productEntity;
      if (editType === "create") {
        // 新增会返回获得Id后的 Product 实体
        productEntity = await createProduct(product);
      } else if (editType === "update") {
        // 更新返回布尔值
        if (await updateProduct(product)) {
          // 直接将表单提交的数据更新到vuex
          productEntity = product;
        }
      }
      if (productEntity) {
        commit("SET_PRODUCT_DATA", productEntity);
        result = true;
      }
      return result;
    },
  },
  mutations: {
    SET_PRODUCT_DATA: (state, productData) => {
      state.productData = cloneObj(productData);
      if (state.productData && state.productData.discount < 1) {
        state.productData.discount *= 10;
      }
    },
  },
  state: {
    productData: null,
  },
};
