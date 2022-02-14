<template>
  <div>
    <div class="head_remind"></div>
    <section class="mainwrap">
      <div class="college-major-container">
        <el-tabs v-model="activeName">
          <el-tab-pane label="基本信息" name="Information"></el-tab-pane>
          <el-tab-pane label="通用设置" name="General"></el-tab-pane>
          <!-- <el-tab-pane label="接口设置" name="Interface"></el-tab-pane> -->
          <el-tab-pane label="模板消息" name="Template"></el-tab-pane>
          <el-tab-pane label="分享设置" name="Sharing"></el-tab-pane>
        </el-tabs>
        <component :is="getComponent" />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "institutionConfig",
  data() {
    return {
      activeName: "Information",
    };
  },
  computed: {
    getComponent() {
      if (this.activeName) {
        return () => import(`./components/${this.activeName}.vue`);
      }
    },
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
/deep/.el-table__header th,
.el-table__header tr {
  background-color: #f8f8f8;
  color: #909399;
}
/deep/.el-tabs__item {
  font-size: 15px;
}
.mainwrap {
  padding: 10px 20px;
}
.input-width {
  width: 240px;
}
.main {
  padding: 20px;
  margin: 20px;
  background: #fff;
}
.head_remind {
  padding: 0 20px;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  color: #909399;
  width: 100%;
  border-bottom: 15px solid #f2f6fc;
}
.client_head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
