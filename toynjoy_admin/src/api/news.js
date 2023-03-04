import { request } from "@/utils/request";

const newsApi = {
    find: "/api/News/find",
    findCount: "/api/News/findCount"
}

export function getNews(params) {
    return request({
        url: newsApi.find,
        params
    });
}

export function getNewsCount(params) {
    return request({
        url: newsApi.findCount,
        params
    });
}