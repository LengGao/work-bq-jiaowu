<template>
    <section class="main-wrap">
        <div class="header">
            <p><strong>班级名称：</strong> 2020春-系统集成学霸2班</p>
            <p><strong>所属分类：</strong> 职称考证</p>
            <p><strong>班主任：</strong> 罗轻</p>
            <p><strong>班级人数：</strong> 160</p>
        </div>
        
        <div class="college-major-container">
          <el-tabs v-model="activeName">
            <el-tab-pane label="微信通知" name="wxNotification"></el-tab-pane>
            <el-tab-pane label="机构通知" name="wxMechanism"></el-tab-pane>
          </el-tabs>
          <component :is="getComponent" />
        </div>
      </section>
</template>
<script>
export default {
  name: "wxMessage",
  data() {
    return {
        activeName: "wxNotification",
    //   value: "",
    //   teacherData: [],
    //   studentData: [],
    //   page: 1,
    //   messVal: true,
    //   dialogVisible: false,
    //   ruleForm: {
    //     title: "",
    //     type: "",
    //     teacher: "",
    //     time: "",
    //     content: "",
    //     address: "",
    //     remarks: "",
    //     uid_arr: [],
    //     wechat_notice: 1,
    //   },
    //   classroom_id: 0,
    //   current: "0",
    //   topfun: [
    //     { name: "上课通知" },
    //     { name: "考试通知" },
    //     { name: "差生提醒" },
    //   ],
    //   schoolData: [],
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
  },

  methods: {

  },
};
</script>

<style lang="scss" scoped>
/deep/.el-table__header th,
.el-table__header tr {
  background-color: #f8f8f8;
  color: #909399;
}
.main-wrap{
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
.header{
    background-color: #f8f8f8;
    border: 1px solid #e2e2e2;
    display: flex;
    justify-content: flex-start;
    padding: 10px;
    color: #888;
    font-size: 14px;
    margin-bottom: 10px;
}
.header p{
    margin-right: 40px;
}
</style>
