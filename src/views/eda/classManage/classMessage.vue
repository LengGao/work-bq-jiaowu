<template>
  <section class="main-wrap">
    <div class="header">
      <p><strong>班级名称：</strong> {{ this.$route.query.classroom_name }}</p>
      <p><strong>所属分类：</strong> {{ this.$route.query.category_name }}</p>
      <p><strong>班主任：</strong> {{ this.$route.query.staff_name }}</p>
      <p><strong>班级人数：</strong> {{ this.$route.query.student_number }}</p>
    </div>

    <div class="college-major-container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="短信通知" name="textMessage"></el-tab-pane>
        <el-tab-pane label="微信通知" name="wxNotification"></el-tab-pane>
        <el-tab-pane label="机构通知" name="wxMechanism"></el-tab-pane>
      </el-tabs>
      <component :is="getComponent" />
    </div>
  </section>
</template>
<script>
export default {
  name: "classMessage",
  data() {
    return {
      activeName: "textMessage",
    };
  },
  computed: {
    getComponent() {
      if (this.activeName) {
        return () => import(`./components/${this.activeName}.vue`);
      }
    },
  },
  mounted() {
    this.classroom_id = this.$route.query.classroom_id;
    this.classroom_name = this.$route.query.classroom_name;
    this.category_name = this.$route.query.category_name;
    this.staff_name = this.$route.query.staff_name;
    this.student_number = this.$route.query.student_number;
    console.log(this.student_number);
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
.main-wrap {
  padding: 20px 30px;
}
.main {
  padding: 20px;
  margin: 20px;
  background: #fff;
}
.active {
  color: rgba(25, 159, 255, 1);
  border-bottom: 3px solid rgba(25, 159, 255, 1);
}
.header {
  background-color: #f8f8f8;
  border: 1px solid #e2e2e2;
  display: flex;
  justify-content: flex-start;
  padding: 10px;
  color: #888;
  font-size: 14px;
  margin-bottom: 10px;
}
.header p {
  margin-right: 40px;
}
</style>
