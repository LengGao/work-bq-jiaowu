<template>
  <div class="change-record">
    <div class="change-record-left">
      <OrderChangeInfo :data="data" />
    </div>
    <i class="line"></i>
    <div class="change-record-right">
      <OrderChangeInfo
        project-title="异动项目信息"
        order-title="异动订单信息"
        pay-title="异动订单回款"
        plan-title="异动回款计划"
        :data="data.reshuffle_list[changeIndex].new_detail"
        isChange
        :originData="data"
      />
    </div>
  </div>
</template>

<script>
import OrderChangeInfo from "./OrderChangeInfo";
export default {
  name: "ChangeRecord",
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
    changeIndex: {
      type: Number,
      default: 0,
    },
  },
  components: {
    OrderChangeInfo,
  },
};
</script>

<style lang="less" scoepd>
.change-record {
  display: flex;
  justify-content: space-between;
  &-left {
    width: 49%;
  }
  .line {
    border: 1px dashed #ededed;
  }
  &-right {
    width: 49%;
  }
}
</style>