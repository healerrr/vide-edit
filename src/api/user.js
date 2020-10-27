import request from "@/utils/request";
import { encryptedData } from "@/utils/encrypt";
import { loginRSA, tokenName } from "@/config/settings";

export async function login(data) {
  if (loginRSA) {
    data = await encryptedData(data);
  }
  return request({
    url: "/login",
    method: "post",
    data,
  });
}

export async function socialLogin(data) {
  if (loginRSA) {
    data = await encryptedData(data);
  }
  return request({
    url: "/socialLogin",
    method: "post",
    data,
  });
}

export function getInfo(searchObj = {}, page = 1, pageSize = 20) {
  return request({
    url: "http://backend.test/api/users",
    method: "get",
    params: {
      page: page,
      pageSize: pageSize,
      name: searchObj.name,
      phone: searchObj.phone,
      status: searchObj.status,
    },
  });
}

export function getUserInfo(accessToken) {
  //此处为了兼容mock.js使用data传递accessToken，如果使用mock可以走headers
  return request({
    url: "/userInfo",
    method: "post",
    data: {
      [tokenName]: accessToken,
    },
  });
}

export function updateStatus(id, type) {
  return request({
    url: "http://backend.test/api/users/updateStatus",
    method: "post",
    data: {
      id: id,
      type: type,
    },
  });
}

export function updateInfo(id, data) {
  return request({
    url: "http://backend.test/api/users/" + id,
    method: "PATCH",
    data,
  });
}

export function logout() {
  return request({
    url: "/logout",
    method: "post",
  });
}

export function register() {
  return request({
    url: "/register",
    method: "post",
  });
}
