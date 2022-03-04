<template>
  <el-dialog
    title="添加机构"
    :visible="value"
    width="80%"
    @open="handleOpen"
    :close-on-click-modal="false"
    @close="hanldeClose"
    top="5vh"
  >
    <el-steps :active="activeStep" align-center>
      <el-step title="基本信息"></el-step>
      <el-step title="分发项目"></el-step>
      <el-step title="分发专业"></el-step>
      <el-step title="对接老师"></el-step>
      <el-step title="添加用户"></el-step>
    </el-steps>
    <div class="component-wrap">
      <component
        :is="getComponent"
        :institutionId="institutionId"
        @close="hanldeClose"
        @next="handleNext"
        @prev="handlePrev"
        @id-change="handleIdChange"
      />
    </div>
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
      activeStep: 0,
      componentNameMap: {
        0: "BasicInfo",
        1: "DistributeProject",
        2: "DistributeMajor",
        3: "Counterpart",
        4: "AddInstitutionUser",
      },
      institutionId: "",
    };
  },
  computed: {
    getComponent() {
      if (this.activeStep > -1) {
        return () =>
          import(`./components/${this.componentNameMap[this.activeStep]}.vue`);
      }
    },
  },
  methods: {
    handleIdChange(id) {
      this.institutionId = id;
    },
    handleNext() {
      this.activeStep < 4 && this.activeStep++;
    },
    handlePrev() {
      this.activeStep > 0 && this.activeStep--;
    },
    handleOpen() {},
    hanldeClose() {
      this.$emit("input", false);
      this.activeStep = -1;
      this.$nextTick(() => {
        this.activeStep = 0;
      });
    },
  },
};
</script>
<style lang="less" scoped>
/deep/.el-steps {
  margin-bottom: 16px;
}
.component-wrap {
  min-height: 590px;
}
</style>


