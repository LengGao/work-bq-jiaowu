<template>
  <div class="sales-data">
    <div class="sales-data-item" @click="$emit('item-click', 1)">
      <p class="sales-data-item-title">招生客户数量</p>
      <p class="sales-data-item-value">{{ data.zhaoShengRenShu || 0 }}</p>
    </div>
    <div class="sales-data-item" @click="$emit('item-click', 2)">
      <p class="sales-data-item-title">渠道学生数量</p>
      <p class="sales-data-item-value">{{ data.quDaoRenShu || 0 }}</p>
    </div>
    <div class="sales-data-item" @click="$emit('item-click', 3)">
      <p class="sales-data-item-title">招生订单金额</p>
      <p class="sales-data-item-value">
        {{ priceFormat(data.zhaoShengDingdan)
        }}<span class="unit">{{ unitFormat(data.zhaoShengDingdan) }}</span>
      </p>
    </div>
    <div class="sales-data-item" @click="$emit('item-click', 4)">
      <p class="sales-data-item-title">招生回款金额</p>
      <p class="sales-data-item-value">
        {{ priceFormat(data.zhaoShengHuiKuan)
        }}<span class="unit">{{ unitFormat(data.zhaoShengHuiKuan) }}</span>
      </p>
    </div>
    <div class="sales-data-item" @click="$emit('item-click', 5)">
      <p class="sales-data-item-title">招生入账金额</p>
      <p class="sales-data-item-value">
        {{ priceFormat(data.zhaoShengRuZhang)
        }}<span class="unit">{{ unitFormat(data.zhaoShengRuZhang) }}</span>
      </p>
    </div>
    <div class="sales-data-item" @click="$emit('item-click', 6)">
      <p class="sales-data-item-title">机构订单金额</p>
      <p class="sales-data-item-value">
        {{ priceFormat(data.jiGouDingdan)
        }}<span class="unit">{{ unitFormat(data.jiGouDingdan) }}</span>
      </p>
    </div>
    <div class="sales-data-item" @click="$emit('item-click', 7)">
      <p class="sales-data-item-title">机构回款金额</p>
      <p class="sales-data-item-value">
        {{ priceFormat(data.jiGouHuiKuan)
        }}<span class="unit">{{ unitFormat(data.jiGouHuiKuan) }}</span>
      </p>
    </div>
    <div class="sales-data-item" @click="$emit('item-click', 8)">
      <p class="sales-data-item-title">机构入账金额</p>
      <p class="sales-data-item-value">
        {{ priceFormat(data.jiGouRuZhang)
        }}<span class="unit">{{ unitFormat(data.jiGouRuZhang) }}</span>
      </p>
    </div>
    <div class="sales-data-item" @click="$emit('item-click', 9)">
      <p class="sales-data-item-title">退款作废金额</p>
      <p class="sales-data-item-value">
        {{ priceFormat(data.zuoFei)
        }}<span class="unit">{{ unitFormat(data.zuoFei) }}</span>
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
        return (val / 10000).toFixed(3).slice(0, -1);
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
    cursor: pointer;
    &:hover {
      .sales-data-item-value {
        color: #199fff;
      }
    }
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