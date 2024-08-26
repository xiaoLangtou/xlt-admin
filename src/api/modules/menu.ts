// 获取菜单列表
import http from "@/api";

export const getMenuList = () => {
  return http.get<Menu.MenuOptions[]>("/menu/list", {}, { loading: false });
};
