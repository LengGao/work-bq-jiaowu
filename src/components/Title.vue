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
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #606266;
  margin-bottom: 16px;
  font-size: 16px;
  .text {
    position: relative;
  }
  .text::before {
    position: absolute;
    left: -8px;
    top: 2px;
    content: "";
    width: 4px;
    height: 18px;
    background-color: #199fff;
  }
}
</style>