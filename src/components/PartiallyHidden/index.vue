<template>
  <div>
    <span v-if="type === 'idcard'">
      {{ value | ilterIdCard }}
    </span>
    <span v-else> {{ value | filterPhone }} </span>
    <i
      v-if="copy"
      class="el-icon-document-copy copy-number"
      @click="handleCopy(value)"
      title="复制"
    ></i>
  </div>
</template>
<script>
export default {
  name: "PartiallyHidden",
  props: {
    value: {
      type: [Number, String],
      default: "",
      required: true,
    },
    type: {
      type: String,
      default: "phone",
      validator: function (value) {
        return ["phone", "idcard"].indexOf(value) !== -1;
      },
    },
    copy: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    // 复制
    handleCopy(val) {
      const input = document.createElement("input");
      document.body.appendChild(input);
      input.setAttribute("value", val);
      input.select();
      if (document.execCommand("copy")) {
        document.execCommand("copy");
        document.body.removeChild(input);
        this.$message.success("复制成功");
      }
    },
  },
};
</script>
<style lang="less" scoped>
.copy-number {
  color: #199fff;
  cursor: pointer;
  margin-left: 4px;
}
</style>