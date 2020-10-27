import request from "@/utils/request";

export function getList(params) {
  return request({
    url: "/goods/getList",
    method: "get",
    params,
  });
}

export function getInfo(searchObj = {}, page = 1, pageSize = 20, status = 1) {
  return request({
    url: "http://backend.test/api/products",
    method: "get",
    params: {
      page: page,
      pageSize: pageSize,
      product_name: searchObj.product_name,
      author: searchObj.author,
      jifen1: searchObj.jifen1,
      jifen2: searchObj.jifen2,
      status: searchObj.status,
      timeLimit: searchObj.timeLimit,
      catid: searchObj.catid,
    },
  });
}

export function uploadByImg(data) {
  return request({
    url: "http://backend.test/api/users/uploadAvatar",
    method: "post",
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function addInfo(data) {
  data.updated_at = Math.ceil(data.timeLimit[0].getTime() / 1000);
  data.deleted_at = Math.ceil(data.timeLimit[1].getTime() / 1000);
  return request({
    url: "http://backend.test/api/products",
    method: "post",
    data,
  });
}

export function getInfoById(id) {
  return request({
    url: "http://backend.test/api/products/" + id,
    method: "get",
  });
}
export function batchchange(id) {
  return request({
    url: "http://backend.test/api/products/batchchange",
    method: "post",
    //headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    id,
  });
}
