<template>
  <div class="sales-data">
    <div class="sales-data-item" @click="$emit('item-click', 1)">
      <p class="sales-data-item-title">招生客户</p>
      <p class="sales-data-item-value">{{ data.customerNum || 0 }}</p>
    </div>
    <div class="sales-data-item" @click="$emit('item-click', 2)">
      <p class="sales-data-item-title">招生订单</p>
      <p class="sales-data-item-value">{{ data.orderNum || 0 }}</p>
    </div>
    <div class="sales-data-item" @click="$emit('item-click', 3)">
      <p class="sales-data-item-title">渠道学生</p>
      <p class="sales-data-item-value">{{ data.channelCustomers || 0 }}</p>
    </div>
    <div class="sales-data-item" @click="$emit('item-click', 4)">
      <p class="sales-data-item-title">机构回款</p>
      <p class="sales-data-item-value">{{ data.channelOrder || 0 }}</p>
    </div>
    <div class="sales-data-item" @click="$emit('item-click', 5)">
      <p class="sales-data-item-title">订单金额</p>
      <p class="sales-data-item-value">
        {{ unitFormat(data.orderMoney)
        }}<span class="unit">{{
          data.orderMoney >= 10000 ? "万元" : "元"
        }}</span>
      </p>
    </div>
    <div class="sales-data-item">
      <p class="sales-data-item-title">回款金额</p>
      <p class="sales-data-item-value">
        {{ unitFormat(data.payMoney)
        }}<span class="unit">{{ data.payMoney >= 10000 ? "万元" : "元" }}</span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: "salesData",
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    unitFormat(val) {
      if (!val) {
        return `0.00`;
      }
      if (val / 10000 >= 1) {
        return (val / 10000).toFixed(2);
      }
      return (+val).toFixed(2);
    },
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

      span.unit {
        font-size: 14px;
      }
    }
    &:nth-child(-n + 3) {
      cursor: pointer;
      &:hover {
        .sales-data-item-value {
          color: #199fff;
        }
      }
    }
  }
}
</style>