import { request } from "@/utils/request";

const productApi = {
  findCount: "/api/Product/findCount",
  products: "/api/Product/find",
  create: "/api/Product/add",
  update: "/api/Product/upd",
  typeCount: "/api/ProductType/findCount",
  types: "/api/ProductType/find",
  createType: "/api/ProductType/add",
  updateType: "/api/ProductType/upd",
  deleteType: "/api/ProductType/del",
  hardwareRequirement: "/api/ProductHardwareRequirement/getByProductId",
  updateHardwareRequirement: "/api/ProductHardwareRequirement/upd",
  photoGallery: "/api/ProductPhotoGallery/getByProductId",
  delPhotoGallery: "/api/ProductPhotoGallery/del",
};

export function getProductsCount(params) {
  return request({
    url: productApi.findCount,
    params,
  });
}

export function getProducts(params) {
  return request({
    url: productApi.products,
    params,
  });
}

export function createProduct(product) {
  return request({
    method: "post",
    url: productApi.create,
    data: product,
  });
}

export function updateProduct(product) {
  return request({
    method: "post",
    url: productApi.update,
    data: product,
  });
}

export function getTypeCount(params) {
  return request({
    url: productApi.typeCount,
    params,
  });
}

export function getProductTypes(params) {
  return request({
    url: productApi.types,
    params,
  });
}

export function createProductType(data) {
  return request({
    method: "post",
    url: productApi.createType,
    data,
  });
}

export function updateProductType(data) {
  return request({
    method: "post",
    url: productApi.updateType,
    data,
  });
}

export function deleteType(id) {
  return request({
    url: productApi.deleteType,
    params: { id },
  });
}

export function getHardwareRequirement(id) {
  return request({
    url: productApi.hardwareRequirement,
    params: { id },
  });
}

export function updateHardwareRequirement(hardwareRequirement) {
  return request({
    method: "post",
    url: productApi.updateHardwareRequirement,
    data: hardwareRequirement,
  });
}

export function getPhotoGallery(id) {
  return request({
    url: productApi.photoGallery,
    params: { id },
  });
}

export function delPhotoGallery(productId, image) {
  return request({
    url: productApi.delPhotoGallery,
    params: { productId, image },
  });
}
