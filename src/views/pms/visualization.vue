<template>
  <div class="workbench">
    <el-tabs v-model="activeName"  @tab-click="handleClick">
      <el-tab-pane label="管理员工作台" name="1">
        <Administrators/>
      </el-tab-pane>
      <el-tab-pane label="招生工作台" name="2">招生工作台</el-tab-pane>
      <el-tab-pane label="教务工作台" name="3">教务工作台</el-tab-pane>
      <el-tab-pane label="老师工作台" name="4">老师工作台</el-tab-pane>
    </el-tabs>
  </div>
</template>  
<script>
export default {
  name: "workbench",
  components:{
    Administrators: ()=> import('./components/Administrators/index'),
  },
  data() {
    return {
      activeName:'1'
    };
  },
  methods:{
    handleClick(){
      console.log(2222)
    }
  }
};
</script>
<style lang="scss" scoped>
.workbench{
  padding: 35px;
}
</style>
