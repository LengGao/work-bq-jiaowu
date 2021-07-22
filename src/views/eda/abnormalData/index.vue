<template>
  <div class="abnormal-data">
    <div class="head_remind">
      *本模块可查询意向，班级异常数据，只能删除在一个意向下面同一课程不同的班级数据。
    </div>
    <div class="abnormal-data-container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="班级异常" name="AbnormalClass"></el-tab-pane>
        <el-tab-pane label="意向异常" name="AbnormalIntention"></el-tab-pane>
      </el-tabs>
      <component :is="getComponent" />
    </div>
  </div>
</template>

<script>
export default {
  name: "abnormalData",
  data() {
    return {
      activeName: "AbnormalClass",
    };
  },
  computed: {
    getComponent() {
      if (this.activeName) {
        return () => import(`./components/${this.activeName}.vue`);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.abnormal-data {
  &-container {
    padding: 20px;
  }
}
</style>
