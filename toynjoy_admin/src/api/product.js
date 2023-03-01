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

export async function getProductsCount(params) {
  return await request({
    url: productApi.findCount,
    params,
  });
}

export async function getProducts(params) {
  return await request({
    url: productApi.products,
    params,
  });
}

export async function createProduct(product) {
  return await request({
    method: "post",
    url: productApi.create,
    data: product,
  });
}

export async function updateProduct(product) {
  return await request({
    method: "post",
    url: productApi.update,
    data: product,
  });
}

export async function getTypeCount(params) {
  return await request({
    url: productApi.typeCount,
    params,
  });
}

export async function getProductTypes(params) {
  return await request({
    url: productApi.types,
    params,
  });
}

export async function createProductType(data) {
  return await request({
    method: "post",
    url: productApi.createType,
    data,
  });
}

export async function updateProductType(data) {
  return await request({
    method: "post",
    url: productApi.updateType,
    data,
  });
}

export async function getHardwareRequirement(id) {
  return await request({
    url: productApi.hardwareRequirement,
    params: { id },
  });
}

export async function updateHardwareRequirement(hardwareRequirement) {
  return await request({
    method: "post",
    url: productApi.updateHardwareRequirement,
    data: hardwareRequirement,
  });
}

export async function getPhotoGallery(id) {
  return await request({
    url: productApi.photoGallery,
    params: { id },
  });
}

export async function delgetPhotoGallery(productId, image) {
  return await request({
    url: productApi.delPhotoGallery,
    params: { productId, image },
  });
}

export async function deleteType(id) {
  return await request({
    url: productApi.deleteType,
    params: { id },
  });
}
