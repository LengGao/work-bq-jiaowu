<template>
  <div>
    <div class="head_remind">
      *本模块主要是招生老师用来进行日常招生数据的跟进管理，包括学员意向录入、课程缴费报名等操作。
    </div>

    <section class="mainwrap">
      <el-tabs v-model="activeName">
        <el-tab-pane label="按计划" name="plannedResult"></el-tab-pane>
        <el-tab-pane label="按学员" name="studentResult"></el-tab-pane>
      </el-tabs>
      <component :is="getComponent" />
    </section>
  </div>
</template>

<script>
export default {
  name: 'courseManage',

  data() {
    return {
      activeName: 'plannedResult',
      ruleForm: {
        category_id: '',
      },
      isTagactive: 1,
      tabFun: [
        {
          id: 1,
          name: '学历教育',
        },
        {
          id: 2,
          name: '职称考证',
        },
      ],
    }
  },
  created() {},
  mounted() {},
  computed: {
    getComponent() {
      if (this.activeName) {
        return () => import(`./achievement/components/${this.activeName}.vue`)
      }
    },
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
/deep/.el-table__header th,
.el-table__header tr {
  background-color: #f8f8f8;
  color: #909399;
}
</style>
