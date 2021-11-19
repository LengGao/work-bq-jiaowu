<template>
  <div class="sales-data">
    <div class="sales-data-item">
      <p class="sales-data-item-title">招生客户</p>
      <p class="sales-data-item-value">999</p>
    </div>
    <div class="sales-data-item">
      <p class="sales-data-item-title">招生订单</p>
      <p class="sales-data-item-value">999</p>
    </div>
    <div class="sales-data-item">
      <p class="sales-data-item-title">渠道学生</p>
      <p class="sales-data-item-value">999</p>
    </div>
    <div class="sales-data-item">
      <p class="sales-data-item-title">机构回款</p>
      <p class="sales-data-item-value">999</p>
    </div>
    <div class="sales-data-item">
      <p class="sales-data-item-title">订单金额</p>
      <p class="sales-data-item-value">999</p>
    </div>
    <div class="sales-data-item">
      <p class="sales-data-item-title">回款金额</p>
      <p class="sales-data-item-value">999</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "salesData",
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped>
.sales-data {
  display: flex;
  align-items: center;
  &-item {
    flex: 1;
    flex-shrink: 0;
    text-align: center;
    &:not(:last-child) {
      border-right: 1px solid #f4f5f7;
    }
    &-title {
      font-size: 14px;
      color: #666;
      margin-bottom: 4px;
    }
    &-value {
      font-size: 36px;
      color: #666;
    }
  }
}
</style>