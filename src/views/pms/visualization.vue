<template>
  <div class="workbench">
    <el-tabs
      v-model="activeName"
      class="workbench-tab"
      @tab-click="handleClick"
    >
      <el-tab-pane label="管理员工作台" name="5"></el-tab-pane>
      <el-tab-pane label="招生工作台" name="1"> </el-tab-pane>
      <el-tab-pane label="教务工作台" name="2"></el-tab-pane>
      <el-tab-pane label="老师工作台" name="3"></el-tab-pane>
    </el-tabs>
    <component :is="getComponent" />
  </div>
</template>  
<script>
import { getIdentity } from "@/api/workbench.js";
export default {
  name: "workbench",
  data() {
    return {
      activeName: "5",
      componentNames: {
        //1教务 2招生 3老师 4财务 5管理员
        5: "Administrators",
        1: "RecruitStudents",
        2: "RecruitStudents",
      },
    };
  },
  computed: {
    getComponent() {
      console.log(this.componentNames[this.activeName]);
      return () =>
        import(`./components/${this.componentNames[this.activeName]}/index`);
    },
  },
  created() {
    this.getIdentity();
  },
  methods: {
    //獲取身份
    async getIdentity() {
      const res = await getIdentity();
      this.activeName = res.data?.identity + "";
    },
    handleClick() {
      console.log(2222);
    },
  },
};
</script>
<style lang="scss" scoped>
.workbench {
  padding: 35px;
  /deep/.el-tabs__item {
    font-size: 16px;
  }
}
</style>
