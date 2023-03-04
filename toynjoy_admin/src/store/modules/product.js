import { createProduct, updateProduct } from "@/api/product";
import { cloneObj } from "@/utils/basic";
export default {
  namespaced: true,
  actions: {
    edit_product: async ({ commit }, { product, editType }) => {
      let result = false;
      let productEntity;
      if (editType === "create") {
        productEntity = await createProduct(product);
      } else if (editType === "update") {
        if (await updateProduct(product)) {
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
      if (state.productData && state.productData.discount <= 1) {
        state.productData.discount *= 10;
      }
    },
  },
  state: {
    productData: null,
  },
};
