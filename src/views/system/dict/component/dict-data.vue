<template>
  <div>
    <!-- 数据字典类型列表表格 -->
    <vxe-grid ref="grid" v-bind="gridOptions" :data="tableData">
      <template #toolbarBtnGroup>
        <el-button type="primary" @click="handleAdd">新增</el-button>
      </template>
      <template #action="{ row }">
        <el-button type="text" @click="handleEdit(row)">修改</el-button>
        <el-button type="text" @click="handleDelete(row)">删除</el-button>
      </template>
    </vxe-grid>
  </div>
  <!-- 新增/修改字典的弹窗 -->
  <dict-data-add ref="addDialog"></dict-data-add>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { VxeGridProps } from "vxe-table";
import DictDataAdd from "@/views/system/dict/component/dict-data-add.vue";
import { useComponentRef } from "@/hooks/useComponentRef";
import { Dict } from "@/api/interface/dict";
import { getDictDataList, removeDictData } from "@/api/modules/dict";
import { ElMessage } from "element-plus";

const tableData = ref([]);
const addDialog = useComponentRef(DictDataAdd);

const activeDict = reactive<Dict.IDictType>({
  dictName: "",
  dictCode: "",
  dictDesc: "",
  systemFlag: "BUSINESS"
});

const gridOptions = reactive<VxeGridProps>({
  columns: [
    { type: "checkbox" },
    { field: "dictType", title: "字典类型" },
    { field: "dictValue", title: "数据值" },
    { field: "dictLabel", title: "标签名" },
    { field: "dictRemark", title: "描述" },
    { field: "dictSort", title: "排序" },
    { field: "createTime", title: "创建时间" },
    { field: "操作", title: "操作", slots: { default: "action" } }
  ],
  toolbarConfig: {
    slots: {
      buttons: "toolbarBtnGroup"
    }
  },
  border: true,
  showHeader: true,
  pagerConfig: {
    pageSize: 10,
    currentPage: 1,
    total: 0
  }
});

const getList = async () => {
  const data = await getDictDataList(
    activeDict.id as number,
    gridOptions.pagerConfig?.currentPage as number,
    gridOptions.pagerConfig?.pageSize as number
  );
  console.log(data);
};

const open = (currentDict: Dict.IDictType) => {
  activeDict.id = currentDict.id;
  activeDict.dictCode = currentDict.dictCode;
  activeDict.dictName = currentDict.dictName;
  getList();
};

const handleAdd = () => {
  addDialog.value?.openDialog("add", { dictTypeId: activeDict.id, dictType: activeDict.dictCode });
};

const handleEdit = (row: Dict.IDictData) => {
  addDialog.value?.openDialog("edit", row);
};

const handleDelete = async (row: Dict.IDictData) => {
  try {
    await removeDictData(row.id);
    ElMessage.success("删除成功");
  } catch (e) {
    ElMessage.error("删除失败");
  }
};

defineExpose({
  open
});
</script>

<style scoped>
.dialog-footer {
  text-align: right;
}
</style>
