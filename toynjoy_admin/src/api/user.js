import { request } from "@/utils/request";

const userApi = {
  login: "/api/Administrator/login",
  userData: "/api/Administrator/get",
};

export function login(params) {
    return request({
        method: 'post',
        url: userApi.login,
        data: params
    });
}

export function getUserData() {
  return request({
    url: userApi.userData
  });
}
