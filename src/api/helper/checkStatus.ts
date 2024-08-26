import { ElMessage } from "element-plus";

/**
 * @description: 校验网络请求状态码
 * @param {Number} status
 * @return void
 */
export const checkStatus = (status: number, data: any = {}) => {
  const statusMap: Record<number | string, string> = {
    400: "请求失败！请您稍后重试",
    401: "登录失效！请您重新登录",
    403: "当前账号无权限访问！",
    404: `你所访问的资源不存在！`,
    405: "请求方式错误！请您稍后重试",
    408: "请求超时！请您稍后重试",
    500: "服务异常！",
    501: "网络未实现",
    502: "网关错误！",
    503: "服务不可用！",
    504: "网络超时",
    505: "http版本不支持该请求",
    default: "请求失败！"
  };
  const statusText = data.message && [400, 401].includes(status) ? data.message : statusMap[status] || statusMap.default;
  ElMessage.error(statusText);
};
