<template>
  <div class="el-title">
    <span>{{ text }}</span>
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
  color: #606266;
  margin-bottom: 16px;
  &::before {
    display: block;
    content: "";
    width: 4px;
    height: 16px;
    background-color: #199fff;
    margin-right: 10px;
  }
}
</style>