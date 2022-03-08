<template>
  <el-dialog
    title="添加机构"
    :visible="value"
    :width="activeStep ? `80%` : '700px'"
    @open="handleOpen"
    :close-on-click-modal="false"
    @close="hanldeClose"
    top="5vh"
  >
    <el-steps v-if="activeStep" :active="activeStep" align-center>
      <!-- <el-step title="基本信息"></el-step> -->
      <el-step title="分发项目"></el-step>
      <el-step title="分发专业"></el-step>
      <el-step title="对接老师"></el-step>
      <el-step title="添加用户"></el-step>
    </el-steps>
    <div class="component-wrap">
      <keep-alive :include="cacheComponent">
        <component
          :is="getComponent"
          :institutionId="institutionId"
          @close="hanldeClose"
          @next="handleNext"
          @prev="handlePrev"
          @id-change="handleIdChange"
        />
      </keep-alive>
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
      cacheComponent: "AddInstitutionUser",
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
    handleOpen() {
      this.activeStep = 0;
      this.cacheComponent = "AddInstitutionUser";
    },
    hanldeClose() {
      this.$emit("input", false);
      this.activeStep = -1;
      this.cacheComponent = "";
      this.institutionId = "";
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


