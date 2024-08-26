<template>
  <div>
    <el-input
      :suffix-icon="Search"
      v-model="dataObj.nameOrCode"
      placeholder="请输入字典名称或字典编码"
      @keydown.enter="handleSearchDictType"
    ></el-input>
    <div class="mt-3.5">
      <el-button type="primary" @click="openAddDialog">
        <el-icon>
          <Plus />
        </el-icon>
        新增字典类型
      </el-button>
      <el-button type="primary">
        <el-icon>
          <Download />
        </el-icon>
        导出
      </el-button>
    </div>
  </div>
  <div class="table-container mt-3">
    <el-table
      :data="dictList"
      :border="false"
      :show-header="false"
      highlight-current-row
      current-row-key="id"
      @current-change="handleCurrentChange"
    >
      <el-table-column prop="dictName" label="字典名称" />
      <el-table-column prop="dictCode" label="字典标识" class-name="identifier-column" />
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <div class="action-buttons">
            <el-button type="text" @click="editItem(row)">
              <el-icon>
                <Edit />
              </el-icon>
            </el-button>
            <el-button :disabled="row.systemFlag === 'SYSTEM'" type="text" @click="deleteItem(row)">
              <el-icon>
                <Delete />
              </el-icon>
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <dict-add ref="dictAddRef" @close="getList"></dict-add>
</template>

<script setup lang="ts">
import { Edit, Delete, Search } from "@element-plus/icons-vue";
import { Dict } from "@/api/interface/dict";
import { getDictDetail, getDictList, removeDict } from "@/api/modules/dict";
import DictAdd from "@/views/system/dict/component/add.vue";
import { useComponentRef } from "@/hooks/useComponentRef";
import { ElMessage } from "element-plus";

const dictList = ref<Dict.IDictType[]>([]);
const dictAddRef = useComponentRef(DictAdd);
const dataObj = reactive({
  nameOrCode: ""
});

const emits = defineEmits(["currentRow"]);

const getList = async () => {
  const { data } = await getDictList(dataObj.nameOrCode);
  dictList.value = data;
};

const editItem = async (item: Dict.IDictType) => {
  const { data } = await getDictDetail(item.id);
  dictAddRef.value?.openDialog("edit", data);
};

const deleteItem = async (item: Dict.IDictType) => {
  try {
    await removeDict(item.id);
    await getList();
    ElMessage.success("删除成功");
  } catch (e) {
    ElMessage.error("删除失败");
  }
};

const handleCurrentChange = (row: Dict.IDictType) => {
  console.log(row);
  emits("currentRow", row);
};

const handleSearchDictType = () => {
  getList();
};
const openAddDialog = () => {
  dictAddRef.value?.openDialog();
};

onMounted(() => {
  getList();
});
defineExpose({
  getList
});
</script>

<style scoped lang="scss">
.table-container {
  display: flex;
  justify-content: flex-end;

  ::v-deep .identifier-column .cell {
    font-size: 14px;
    color: #999;
  }

  .action-buttons {
    width: 100%;
    text-align: right;
  }
}
</style>
