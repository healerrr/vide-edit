import request from "@/utils/request";

export function getInfo(
  searchObj = {},
  page = 1,
  pageSize = 10,
  status = "<=3"
) {
  return request({
    url: "http://backend.test/api/productscat",
    method: "get",
    params: {
      page: page,
      pageSize: pageSize,
      //status: status
    },
  });
}

export function addInfo(data) {
  return request({
    url: "http://backend.test/api/productscat",
    method: "post",
    data,
  });
}
export function getCatId() {
  return request({
    url: "http://backend.test/api/getCatId",
    method: "get",
  });
}

export function getInfoById(id) {
  return request({
    url: "http://backend.test/api/getCatId/" + id,
    method: "get",
  });
}

export function updateInfo(id, data) {
  return request({
    url: "http://backend.test/api/productscat/" + id,
    method: "PATCH",
    data,
  });
}

export function deleteInfoById(id) {
  return request({
    url: "http://backend.test/api/productscat/" + id,
    method: "delete",
  });
}
