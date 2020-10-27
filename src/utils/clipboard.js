import Vue from "vue";
import Clipboard from "clipboard";

function clipboardSuccess(text) {
  Vue.prototype.$baseMessage(`复制${text}成功`, "success", false);
}

function clipboardError(text) {
  Vue.prototype.$baseMessage(`复制${text}失败`, "error", false);
}

/**
 * @author chuzhixin 1204505056@qq.com
 * @description 复制数据
 * @param text
 * @param event
 */
export default function handleClipboard(text, event) {
  const clipboard = new Clipboard(event.target, {
    text: () => text,
  });
  clipboard.on("success", () => {
    clipboardSuccess(text);
    clipboard.destroy();
  });
  clipboard.on("error", () => {
    clipboardError(text);
    clipboard.destroy();
  });
  clipboard.onClick(event);
}
