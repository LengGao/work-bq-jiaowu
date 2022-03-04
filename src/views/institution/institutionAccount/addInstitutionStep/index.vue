<template>
  <el-dialog
    :title="`届别`"
    :visible="value"
    width="800px"
    @open="handleOpen"
    :close-on-click-modal="false"
    @close="hanldeClose"
  >
    <el-steps :active="activeStep" align-center>
      <el-step title="基本信息"></el-step>
      <el-step title="分发项目"></el-step>
      <el-step title="分发专业"></el-step>
      <el-step title="对接老师"></el-step>
      <el-step title="添加用户"></el-step>
    </el-steps>
    <component
      :is="getComponent"
      :institutionId="institutionId"
      @close="hanldeClose"
      @id-change="handleIdChange"
    />
  </el-dialog>
</template>

<script>
export default {
  name: "addInstitutionStep",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      activeStep: 1,
      componentNameMap: {
        1: "BasicInfo",
      },
      institutionId: "",
    };
  },
  computed: {
    getComponent() {
      if (this.activeStep) {
        return () =>
          import(`./components/${this.componentNameMap[this.activeStep]}.vue`);
      }
    },
  },
  methods: {
    handleIdChange(id) {
      this.institutionId = id;
    },
    handleOpen() {},
    hanldeClose() {
      this.$emit("input", false);
      this.activeStep = 0;
      this.$nextTick(() => {
        this.activeStep = 1;
      });
    },
  },
};
</script>
<style lang="less" scoped>
/deep/.el-steps {
  margin-bottom: 16px;
}
</style>


