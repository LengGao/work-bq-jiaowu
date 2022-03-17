<template>
  <el-dialog
    title="客户报名"
    :visible="value"
    width="1200px"
    @open="handleOpen"
    :close-on-click-modal="false"
    @close="hanldeClose"
  >
    <el-steps :active="activeStep" align-center>
      <el-step title="订单信息"></el-step>
      <el-step title="回款信息"></el-step>
    </el-steps>
    <div class="component-wrap">
      <keep-alive :include="cacheComponent">
        <component
          :orderInfoParams="orderInfoParams"
          v-bind="$attrs"
          :is="getComponent"
          @close="hanldeClose"
          @next="handleNext"
          @prev="handlePrev"
        />
      </keep-alive>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "CreateOrderDialog",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      activeStep: 0,
      cacheComponent: ["OrderInfo", "PaymentCollectionInfo"],
      componentNameMap: {
        0: "OrderInfo",
        1: "PaymentCollectionInfo",
      },
      orderInfoParams: {},
    };
  },
  computed: {
    getComponent() {
      if (this.activeStep > -1) {
        return () => import(`./${this.componentNameMap[this.activeStep]}.vue`);
      }
    },
  },
  methods: {
    handleOpen() {
      this.activeStep = 0;
      this.cacheComponent = ["OrderInfo", "PaymentCollectionInfo"];
    },
    handleNext(params) {
      if (this.activeStep !== 1) {
        console.log(params);
        this.orderInfoParams = params;
      }
      this.activeStep < 1 && this.activeStep++;
    },
    handlePrev() {
      this.activeStep > 0 && this.activeStep--;
    },
    hanldeClose() {
      this.$emit("input", false);
      this.activeStep = -1;
      this.cacheComponent = [];
    },
  },
};
</script>


