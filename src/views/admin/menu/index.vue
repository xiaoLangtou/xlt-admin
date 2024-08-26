<template>
  <div class="table-box">
    <ProTable ref="proTable" title="菜单列表" row-key="path" :indent="20" :columns="columns" :data="menuData" :pagination="false">
      <!-- 表格 header 按钮 -->
      <template #tableHeader>
        <el-button type="primary" :icon="CirclePlus">新增菜单</el-button>
      </template>
      <!-- 菜单图标 -->
      <template #icon="scope">
        <el-icon :size="18">
          <component :is="scope.row.meta.icon"></component>
        </el-icon>
      </template>
      <!-- 菜单操作 -->
      <template #operation>
        <el-button type="primary" link :icon="EditPen"> 编辑</el-button>
        <el-button type="primary" link :icon="Delete"> 删除</el-button>
      </template>
    </ProTable>
  </div>
</template>

<script setup lang="ts" name="menuMange">
import { onMounted, ref } from "vue";
import { ColumnProps } from "@/components/ProTable/interface";
import { Delete, EditPen, CirclePlus } from "@element-plus/icons-vue";
import ProTable from "@/components/ProTable/index.vue";
import { getMenuList } from "@/api/modules/menu";

const proTable = ref();

const menuData = ref([] as Menu.MenuOptions[]);

onMounted(() => {
  getList();
});

const getList = async () => {
  // 获取菜单列表
  const { data } = await getMenuList();
  console.log(data);
  menuData.value = data;
};

// 表格配置项
const columns: ColumnProps[] = [
  { prop: "meta.title", label: "菜单名称", align: "left", search: { el: "input" } },
  { prop: "menuType", label: "类型", tag: true },
  { prop: "meta.icon", label: "菜单图标" },
  { prop: "name", label: "英文名称", search: { el: "input" } },
  { prop: "path", label: "菜单路径", width: 300, search: { el: "input" } },
  { prop: "permission", label: "权限标识", tag: true, width: 180, search: { el: "input" } },
  { prop: "sortOrder", label: "排序", width: 80 },
  { prop: "operation", label: "操作", width: 250, fixed: "right" }
];
</script>
