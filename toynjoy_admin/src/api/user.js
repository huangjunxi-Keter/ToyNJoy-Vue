import { request } from "@/utils/request";

const userApi = {
  login: "/api/User/login",
  loginUser: "/api/User/get",
  findCount: "/api/User/findCount",
  users: "/api/User/find",
  update: "/api/User/upd",
  info: "/api/User/getInfoByName",
  updateInfo: "/api/User/updInfo",
  userData: "/api/User/getByName",
  typeCount: "/api/UserType/findCount",
  types: "/api/UserType/find",
  createType: "/api/UserType/add",
  updateType: "/api/UserType/upd",
  deleteType: "/api/UserType/del",
};

export function login(params) {
  return request({
    method: "post",
    url: userApi.login,
    data: params,
  });
}

export function getLoginUser() {
  return request({
    url: userApi.loginUser,
  });
}

export function getCount(params) {
  return request({
    url: userApi.findCount,
    params,
  });
}

export function getUsers(params) {
  return request({
    url: userApi.users,
    params,
  });
}

export function updateUser(data) {
  return request({
    method: "post",
    url: userApi.update,
    data,
  });
}

export function updateUserInfo(data) {
  return request({
    method: "post",
    url: userApi.updateInfo,
    data,
  });
}

export function getInfoByName(username) {
  return request({
    url: userApi.info,
    params: {
      name: username,
    },
  });
}

export function getUserData(username) {
  return request({
    url: userApi.userData,
    params: {
      name: username,
    },
  });
}

export function getTypeCount(params) {
  return request({
    url: userApi.typeCount,
    params,
  });
}

export function getUserTypes(params) {
  return request({
    url: userApi.types,
    params,
  });
}

export function createUserType(data) {
  return request({
    method: "post",
    url: userApi.createType,
    data,
  });
}

export function updateUserType(data) {
  return request({
    method: "post",
    url: userApi.updateType,
    data,
  });
}

export function deleteType(id) {
  return request({
    url: userApi.deleteType,
    params: { id },
  });
}
