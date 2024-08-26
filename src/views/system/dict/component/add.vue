<template>
  <el-dialog v-model="dialogVisible" title="新增字典" width="500px" class="custom-dialog" @close="closeDialog(formRef)">
    <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
      <el-form-item label="业务类型" prop="systemFlag">
        <el-select v-model="form.systemFlag" placeholder="请选择业务类型">
          <el-option label="系统类" value="SYSTEM"></el-option>
          <el-option label="业务类" value="BUSINESS"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="字典名称" prop="dictName">
        <el-input v-model="form.dictName" placeholder="请输入字典名称"></el-input>
      </el-form-item>
      <el-form-item label="字典标识" prop="dictCode">
        <el-input v-model="form.dictCode" :disabled="!!form.id" placeholder="请输入字典标识"></el-input>
      </el-form-item>
      <el-form-item label="字典描述" prop="dictDesc">
        <el-input type="textarea" v-model="form.dictDesc" placeholder="请输入字典描述"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closeDialog(formRef)">取消</el-button>
        <el-button type="primary" @click="handleSave(formRef)">保存</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ElMessage, FormInstance, FormRules } from "element-plus";

import { Dict } from "@/api/interface/dict";
import { addDict, updateDict } from "@/api/modules/dict";

const dialogVisible = ref(false);

const formRef = ref<FormInstance>();
const form = reactive<Dict.IDictType>({
  systemFlag: "BUSINESS",
  dictName: "",
  dictCode: "",
  dictDesc: ""
});

const activeAction = ref("add");

const emits = defineEmits(["close"]);

const rules = reactive<FormRules<Dict.IDictType>>({
  systemFlag: [{ required: true, message: "请选择业务类型", trigger: "change" }],
  dictName: [{ required: true, message: "请输入字典名称", trigger: "blur" }],
  dictCode: [
    { required: true, message: "请输入字典标识", trigger: "blur" },
    {
      pattern: /^(?![_\W])[\u4e00-\u9fa5a-zA-Z0-9_]+$/,
      message: "字典标识只能由字母、数字和下划线组成",
      trigger: "blur"
    }
  ]
});

const openDialog = (type = "add", dictItem: any = {}) => {
  if (type === "edit") {
    form.systemFlag = dictItem.systemFlag;
    form.dictName = dictItem.dictName;
    form.dictCode = dictItem.dictCode;
    form.dictDesc = dictItem.dictDesc;
    form.id = dictItem.id;
  }
  activeAction.value = "edit";
  dialogVisible.value = true;
};

const handleSave = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid: boolean) => {
    if (valid) {
      const saveURL = activeAction.value === "add" ? addDict : updateDict;
      await saveURL(form);
      ElMessage.success("保存成功");
      closeDialog(formEl);
      emits("close");
    } else {
      ElMessage.error("请填写必填项");
    }
  });
};

const closeDialog = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  console.log("closeDialog");
  formEl.resetFields();
  form.id = "";
  dialogVisible.value = false;
};

defineExpose({ openDialog });
</script>

<style lang="scss">
.dialog-footer {
  text-align: right;
}
</style>
