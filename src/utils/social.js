import router from "@/router";
import qs from "qs";

let _win;
let _winTime;

export async function login(url, options) {
  return new Promise((resolve, reject) => {
    _win = window.open(`${url}?${qs.stringify(options)}`);
    _winTime = setInterval(() => {
      if (_win && _win.closed) {
        clearInterval(_winTime);
        const data = JSON.parse(localStorage.getItem("socialData"));
        localStorage.removeItem("socialData");
        // 触发变更通知
        if (data) {
          resolve(data);
        } else {
          reject(data);
        }
      }
    }, 100);
  });
}

export function callback() {
  let data = router.currentRoute.query;
  if (JSON.stringify(data) === "{}")
    data = qs.parse(document.location.search.slice(1));
  localStorage.setItem("socialData", JSON.stringify(data));
}
