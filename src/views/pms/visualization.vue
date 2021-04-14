<template>
  <div class="workbench">
    <!-- <el-tabs :value="activeName" class="workbench-tab">
      <el-tab-pane
        label="管理员工作台"
        name="5"
        v-if="activeName === '5'"
      ></el-tab-pane>
      <el-tab-pane label="招生工作台" name="1" v-if="activeName === '1'">
      </el-tab-pane>
      <el-tab-pane
        label="教务工作台"
        name="2"
        v-if="activeName === '2'"
      ></el-tab-pane>
      <el-tab-pane
        label="老师工作台"
        name="3"
        v-if="activeName === '3'"
      ></el-tab-pane>
    </el-tabs> -->
    <template v-if="activeName">
      <component :is="getComponent" />
    </template>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'workbench',
  data() {
    return {
      activeName: this.$store.state.user.identity + '',
      componentNames: {
        //1教务 2招生 3老师 4财务 5管理员
        5: 'Administrators',
        1: 'RecruitStudents',
        4: 'RecruitStudents',
        2: 'RecruitStudents',
      },
    }
  },
  computed: {
    ...mapGetters(['identity']),
    getComponent() {
      if (this.activeName) {
        return () => import(`./components/${this.componentNames[this.activeName]}/index`)
      }
      return ''
    },
  },
  watch: {
    identity(val) {
      this.activeName = val + ''
    },
  },
}
</script>
<style lang="scss" scoped>
.workbench {
  padding: 35px;
  .workbench-tab /deep/.el-tabs__item {
    font-size: 16px;
  }
}
</style>
