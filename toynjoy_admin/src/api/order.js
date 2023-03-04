import { request } from "@/utils/request";

const orderApi = {
  find: "/api/Order/find",
  findCount: "/api/Order/findCount",
  items: "/api/Order/findItems",
  update: '/api/Order/upd'
};

export function getOrders(params) {
  return request({
    url: orderApi.find,
    params,
  });
}

export function getfindCount(params) {
  return request({
    url: orderApi.findCount,
    params,
  });
}

export function getOrderItems(orderId, hasProduct) {
  return request({
    url: orderApi.items,
    params: { orderId, hasProduct },
  });
}

export function updateOrder(data) {
  return request({
    method: 'post',
    url: orderApi.update,
    data,
  });
}
