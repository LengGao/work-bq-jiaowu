<template>
  <div>
    <el-form-item label="客户来源" prop="from">
      <!-- <component :is="`el-${}`"></component> -->
      <el-select
        v-model="formData.from"
        filterable
        clearable
        placeholder="请选择"
      >
        <el-option
          v-for="item in fromOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-form-item>
  </div>
</template>