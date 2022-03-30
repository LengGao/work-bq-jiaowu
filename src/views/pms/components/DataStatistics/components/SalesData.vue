<template>
  <div class="sales-data">
    <div class="sales-data-item" @click="$emit('item-click', 1)">
      <p class="sales-data-item-value primary">
        {{ data.recruitStudentNum || 0 }}
      </p>
      <p class="sales-data-item-title">招生客户数量</p>
    </div>
    <div class="sales-data-item" @click="$emit('item-click', 3)">
      <p class="sales-data-item-value success">
        {{ priceFormat(data.recruitOrderMoney)
        }}<span class="unit">{{ unitFormat(data.recruitOrderMoney) }}</span>
      </p>
      <p class="sales-data-item-title">招生订单金额</p>
    </div>
    <div class="sales-data-item" @click="$emit('item-click', 3)">
      <p class="sales-data-item-value warning">
        {{ priceFormat(data.recruitTuitionMoney)
        }}<span class="unit">{{ unitFormat(data.recruitTuitionMoney) }}</span>
      </p>
      <p class="sales-data-item-title">招生学费金额</p>
    </div>
    <div class="sales-data-item" @click="$emit('item-click', 3)">
      <p class="sales-data-item-value danger">
        {{ priceFormat(data.recruitOtherMoney)
        }}<span class="unit">{{ unitFormat(data.recruitOtherMoney) }}</span>
      </p>
      <p class="sales-data-item-title">招生其他金额</p>
    </div>

    <div class="sales-data-item" @click="$emit('item-click', 4)">
      <p class="sales-data-item-value primary">
        {{ priceFormat(data.recruitPayMoney)
        }}<span class="unit">{{ unitFormat(data.recruitPayMoney) }}</span>
      </p>
      <p class="sales-data-item-title">招生回款金额</p>
    </div>
    <div class="sales-data-item" @click="$emit('item-click', 5)">
      <p class="sales-data-item-value success">
        {{ priceFormat(data.recruitEntryMoney)
        }}<span class="unit">{{ unitFormat(data.recruitEntryMoney) }}</span>
      </p>
      <p class="sales-data-item-title">招生入账金额</p>
    </div>
    <div class="sales-data-item" @click="$emit('item-click', 9)">
      <p class="sales-data-item-value warning">
        {{ priceFormat(data.recruitRefundMoney)
        }}<span class="unit">{{ unitFormat(data.recruitRefundMoney) }}</span>
      </p>
      <p class="sales-data-item-title">招生退款/作废金额</p>
    </div>
    <div class="sales-data-item" @click="$emit('item-click', 2)">
      <p class="sales-data-item-value primary">{{ data.orgStudentNum || 0 }}</p>
      <p class="sales-data-item-title">机构学生数量</p>
    </div>
    <div class="sales-data-item" @click="$emit('item-click', 6)">
      <p class="sales-data-item-value success">
        {{ priceFormat(data.orgOrderMoney)
        }}<span class="unit">{{ unitFormat(data.orgOrderMoney) }}</span>
      </p>
      <p class="sales-data-item-title">机构订单金额</p>
    </div>
    <div class="sales-data-item" @click="$emit('item-click', 6)">
      <p class="sales-data-item-value warning">
        {{ priceFormat(data.orgTuitionMoney)
        }}<span class="unit">{{ unitFormat(data.orgTuitionMoney) }}</span>
      </p>
      <p class="sales-data-item-title">机构学费金额</p>
    </div>
    <div class="sales-data-item" @click="$emit('item-click', 6)">
      <p class="sales-data-item-value danger">
        {{ priceFormat(data.orgOtherMoney)
        }}<span class="unit">{{ unitFormat(data.orgOtherMoney) }}</span>
      </p>
      <p class="sales-data-item-title">机构其他金额</p>
    </div>
    <div class="sales-data-item" @click="$emit('item-click', 7)">
      <p class="sales-data-item-value primary">
        {{ priceFormat(data.orgPayMoney)
        }}<span class="unit">{{ unitFormat(data.orgPayMoney) }}</span>
      </p>
      <p class="sales-data-item-title">机构回款金额</p>
    </div>
    <div class="sales-data-item" @click="$emit('item-click', 8)">
      <p class="sales-data-item-value success">
        {{ priceFormat(data.orgEntryMoney)
        }}<span class="unit">{{ unitFormat(data.orgEntryMoney) }}</span>
      </p>
      <p class="sales-data-item-title">机构入账金额</p>
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
        return (val / 10000).toFixed(3).slice(0, -1);
      }
      return (+val).toFixed(2);
    },
  },
};
</script>
<style lang="less" scoped>
.primary {
  color: #199fff;
}
.success {
  color: #43d100;
}
.warning {
  color: #fdc400;
}
.danger {
  color: #fd6500;
}
.sales-data {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  &-item {
    flex-shrink: 0;
    text-align: center;
    cursor: pointer;
    width: calc(100% / 7);
    margin-bottom: 26px;
    &:not(:last-child) {
      border-right: 1px solid #f1f2f3;
    }

    &-title {
      font-size: 14px;
      color: #666;
      margin-bottom: 4px;
    }
    &-value {
      font-size: 32px;
      span.unit {
        font-size: 14px;
      }
    }
  }
}
</style>