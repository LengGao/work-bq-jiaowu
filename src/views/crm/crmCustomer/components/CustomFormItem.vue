<template>
  <component
    v-bind="$attrs"
    v-on="$listeners"
    :is="componentMap[data.field_type]"
    :value="value"
    @change="handleChange"
    :placeholder="`${
      ['select', 'multi_select'].includes(data.field_type) ? '请选择' : '请输入'
    }${data.field_text}`"
  >
    <template v-if="['select', 'multi_select'].includes(data.field_type)">
      <el-option
        v-for="item in data.content"
        :key="item"
        :label="item"
        :value="item"
      >
      </el-option>
    </template>
  </component>
</template>
<script>
export default {
  name: "CustomFormItem",
  props: {
    value: {
      type: String,
      default: "",
    },
    data: {
      type: Object,
      default: () => ({
        type: "text",
        options: [],
      }),
    },
  },
  data() {
    return {
      type: "select",
      componentMap: {
        text: "el-input",
        select: "el-select",
        multi_select: "el-select",
        date: "el-date-picker",
      },
    };
  },
  created() {},
  methods: {
    handleChange(e) {
      console.log(e);
      this.$emit("input", e);
    },
  },
};
</script>