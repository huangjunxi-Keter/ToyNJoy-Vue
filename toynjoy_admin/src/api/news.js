import { request } from "@/utils/request";

const newsApi = {
  find: "/api/News/find",
  findCount: "/api/News/findCount",
  get: "/api/News/get",
  update: "/api/News/upd",
  create: "/api/News/add",
  delete: "/api/News/del"
};

export function getNews(params) {
  return request({
    url: newsApi.find,
    params,
  });
}

export function getNewsCount(params) {
  return request({
    url: newsApi.findCount,
    params,
  });
}

export function getNewsById(id) {
  return request({
    url: newsApi.findCount,
    params: { id },
  });
}

export function updateNews(data) {
  return request({
    method: "post",
    url: newsApi.update,
    data,
  });
}

export function createNews(data) {
  return request({
    method: "post",
    url: newsApi.create,
    data,
  });
}

export function deleteNews(id) {
  return request({
    url: newsApi.delete,
    params: { id }
  });
}
