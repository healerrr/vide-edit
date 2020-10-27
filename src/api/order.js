import request from "@/utils/request";

export function getInfo(searchObj = {}, page = 1, pageSize = 10, id) {
  return request({
    url: "http://backend.test/api/orders",
    method: "get",
    params: {
      page: page,
      pageSize: pageSize,
      order_number: searchObj.order_number,
      timeLimit: searchObj.timeLimit,
      status: searchObj.status,
    },
  });
}
export function getInfoById(id) {
  return request({
    url: "http://backend.test/api/orders/" + id,
    method: "get",
  });
}

export function updateInfo(id, data) {
  return request({
    url: "http://backend.test/api/orders/" + id,
    method: "PATCH",
    data,
  });
}

export function exportxls(searchObj = {}) {
  return request({
    url: "http://backend.test/api/orders/export",
    method: "get",
    params: {
      order_number: searchObj.order_number,
      good_name: searchObj.good_name,
      status: searchObj.status,
    },
  });
}
