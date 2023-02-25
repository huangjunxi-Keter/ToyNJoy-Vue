import request from "@/utils/request";

const productApi = {
  productsCount: "/api/Product/count",
  products: "/api/Product/find",
  types: "/api/ProductType/find",
};

export async function getProductsCount(params) {
  return await request({
    url: productApi.productsCount,
    params,
  });
}

export async function getProducts(params) {
  return await request({
    url: productApi.products,
    params,
  });
}

export async function getProductTypes() {
  return await request({
    url: productApi.types,
  });
}
