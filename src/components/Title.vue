<template>
  <div class="el-title">
    <span class="text">{{ text }}</span>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.el-title {
  color: #606266;
  margin-bottom: 16px;
  font-size: 16px;
  .text {
    display: flex;
    align-items: center;
  }
  .text::before {
    content: "";
    width: 4px;
    height: 18px;
    margin-right: 4px;
    background-color: #199fff;
  }
}
</style>