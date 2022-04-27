<template>
  <div class="sales-data">
    <div class="sales-data-item">
      <p class="sales-data-item-title">合作机构总数</p>
      <p class="sales-data-item-value">{{ data.orgNum || 0 }}</p>
    </div>
    <div class="sales-data-item">
      <p class="sales-data-item-title">新增学生人数</p>
      <p class="sales-data-item-value">{{ data.orgStudentNum || 0 }}</p>
    </div>
    <div class="sales-data-item">
      <p class="sales-data-item-title">机构订单金额</p>
      <p class="sales-data-item-value">
        {{ priceFormat(data.orgOrderMoney)
        }}<span class="unit">{{ unitFormat(data.orgOrderMoney) }}</span>
      </p>
    </div>
    <div class="sales-data-item">
      <p class="sales-data-item-title">学费回款金额</p>
      <p class="sales-data-item-value">
        {{ priceFormat(data.orgTuitionPayMoney)
        }}<span class="unit">{{ unitFormat(data.orgTuitionPayMoney) }}</span>
      </p>
    </div>
    <div class="sales-data-item">
      <p class="sales-data-item-title">其他回款金额</p>
      <p class="sales-data-item-value">
        {{ priceFormat(data.orgOtherPayMoney)
        }}<span class="unit">{{ unitFormat(data.orgOtherPayMoney) }}</span>
      </p>
    </div>
    <div class="sales-data-item">
      <p class="sales-data-item-title">机构入账金额</p>
      <p class="sales-data-item-value">
        {{ priceFormat(data.orgEntryMoney)
        }}<span class="unit">{{ unitFormat(data.orgEntryMoney) }}</span>
      </p>
    </div>
    <div class="sales-data-item">
      <p class="sales-data-item-title">机构退款作废金额</p>
      <p class="sales-data-item-value">
        {{ priceFormat(data.orgRefundMoney)
        }}<span class="unit">{{ unitFormat(data.orgRefundMoney) }}</span>
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
      return val >= 10000 ? "万元" : "元";
    },
    priceFormat(val) {
      if (!val) {
        return `0.00`;
      }
      if (val / 10000 >= 1) {
        return (val / 10000).toFixed(4).slice(0, -2);
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
    // cursor: pointer;
    // &:hover {
    //   .sales-data-item-value {
    //     color: #199fff;
    //   }
    // }
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
  }
}
</style>
