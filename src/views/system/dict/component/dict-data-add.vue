<template>
  <!-- 新增/修改字典的弹窗 -->
  <el-dialog :title="dialogTitle" v-model="dialogVisible" width="700px" class="custom-dialog" @close="closeDialog(dictDataForm)">
    <el-form ref="dictDataForm" :model="formData" :rules="rules" :label-width="120">
      <el-form-item label="字典类型" prop="dictType">
        <el-input v-model="formData.dictType" disabled placeholder="请输入字典类型"></el-input>
      </el-form-item>
      <el-form-item label="标签名" prop="dictLabel">
        <el-input v-model="formData.dictLabel" placeholder="请输入标签名"></el-input>
      </el-form-item>
      <el-form-item label="数据值" prop="dictValue">
        <el-input v-model="formData.dictValue" placeholder="请输入数据值"></el-input>
      </el-form-item>

      <el-form-item label="描述" prop="dictDesc">
        <el-input v-model="formData.dictDesc" placeholder="请输入描述"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="dictSort">
        <el-input v-model="formData.dictSort" type="number" placeholder="请输入排序"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="dictRemark">
        <el-input v-model="formData.dictRemark" type="textarea" placeholder="请输入备注"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closeDialog(dictDataForm)">取消</el-button>
        <el-button type="primary" @click="handleSave(dictDataForm)">保存</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { Dict } from "@/api/interface/dict";
import { ElMessage, FormInstance, FormRules } from "element-plus";
import { addDictData, updateDictData } from "@/api/modules/dict";

const emits = defineEmits(["close"]);
const dialogTitle = ref("新增字典");
const activeAction = ref("add");
const dictDataForm = ref<FormInstance>();
const formData = reactive<Dict.IDictData>({
  dictLabel: "",
  dictValue: "",
  dictType: "",
  dictSort: 0,
  dictRemark: "",
  dictTypeId: undefined,
  dictDesc: ""
});

const rules = reactive<FormRules<Dict.IDictData>>({
  dictLabel: [{ required: true, message: "请输入标签名", trigger: "blur" }],
  dictValue: [{ required: true, message: "请输入数据值", trigger: "blur" }],
  dictType: [{ required: true, message: "请输入字典类型", trigger: "blur" }],
  dictRemark: [{ required: true, message: "请输入描述", trigger: "blur" }],
  dictSort: [{ required: true, message: "请输入排序", trigger: "blur" }],
  dictDesc: [{ required: true, message: "请输入描述", trigger: "blur" }]
});

const dialogVisible = ref(false);

const openDialog = (type = "add", data = {}) => {
  dialogTitle.value = type === "add" ? "新增字典" : "修改字典";
  activeAction.value = type;
  Object.assign(formData, data);
  dialogVisible.value = true;
};

const handleSave = (formRef: FormInstance | undefined) => {
  if (!formRef) return;
  formRef.validate(async valid => {
    if (!valid) return;

    const saveURL = activeAction.value === "add" ? addDictData : updateDictData;

    await saveURL(formData);

    ElMessage.success("保存成功");
    closeDialog(formRef);
    emits("close");
  });
};

const closeDialog = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  console.log("closeDialog");
  formEl.resetFields();
  formData.id = undefined;
  dialogVisible.value = false;
};

defineExpose({
  openDialog
});
</script>

<style scoped lang="scss"></style>
