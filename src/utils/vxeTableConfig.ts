import { VxeTable, VxeColumn, VxeColgroup, VxeGrid, VxeToolbar, VxeUI } from "vxe-table";

// 导入主题变量，也可以重写主题变量
import "vxe-table/styles/cssvar.scss";

import zhCN from "vxe-table/lib/locale/lang/zh-CN";
import esES from "vxe-table/lib/locale/lang/es-ES";

// 增加语言
VxeUI.setI18n("zh-CN", zhCN);
VxeUI.setI18n("es-ES", esES);

// 切换语言
VxeUI.setLanguage("zh-CN");

const lazyVxeTable = app => {
  app.use(VxeTable);
  app.use(VxeColumn);
  app.use(VxeColgroup);
  app.use(VxeGrid);
  app.use(VxeToolbar);
};

export default lazyVxeTable;
