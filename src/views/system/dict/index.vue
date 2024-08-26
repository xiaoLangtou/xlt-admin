<template>
  <div class="flex">
    <div class="card basis-1/3">
      <DictType @current-row="handleCurrentRow" />
    </div>
    <div class="basis-2"></div>
    <div class="card basis-2/3">
      <DictData ref="dictDataTable"></DictData>
    </div>
  </div>
</template>

<script setup lang="ts">
import DictType from "@/views/system/dict/component/dict-type.vue";

import DictData from "@/views/system/dict/component/dict-data.vue";
import { Dict } from "@/api/interface/dict";
import { useComponentRef } from "@/hooks/useComponentRef";

const dictDataTable = useComponentRef(DictData);

const handleCurrentRow = (row: Dict.IDictType) => {
  dictDataTable.value?.open(row);
};
</script>

<style scoped lang="scss"></style>
