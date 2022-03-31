<template>
  <div class="sales-data">
    <el-table
      :data="tabaleData"
      :header-cell-style="{ 'text-align': 'center' }"
      border
    >
      <el-table-column prop="title" width="50"> </el-table-column>
      <el-table-column label="学生数量" min-width="170" align="center">
        <template slot-scope="{ row, $index: index }">
          <span
            class="value primary"
            @click="$emit('item-click', index ? 2 : 1)"
            >{{ row.studentCount }}</span
          >
        </template>
      </el-table-column>
      <el-table-column label="订单金额" min-width="170" align="center">
        <template slot-scope="{ row, $index: index }">
          <span
            class="value success"
            @click="$emit('item-click', index ? 5 : 3)"
          >
            {{ priceFormat(row.orderAmount)
            }}<span class="unit">{{ unitFormat(row.orderAmount) }}</span></span
          >
        </template>
      </el-table-column>
      <el-table-column label="回款金额" min-width="170" align="center">
        <template slot-scope="{ row, $index: index }">
          <span
            class="value warning"
            @click="$emit('item-click', index ? 6 : 4)"
          >
            {{ priceFormat(row.payAmount)
            }}<span class="unit">{{ unitFormat(row.payAmount) }}</span></span
          >
        </template>
      </el-table-column>
      <el-table-column label="学费金额" min-width="170" align="center">
        <template slot-scope="{ row, $index: index }">
          <span
            class="value danger"
            @click="$emit('item-click', index ? 5 : 3)"
          >
            {{ priceFormat(row.tuitionAmount)
            }}<span class="unit">{{
              unitFormat(row.tuitionAmount)
            }}</span></span
          >
        </template>
      </el-table-column>
      <el-table-column label="其他金额" min-width="170" align="center">
        <template slot-scope="{ row, $index: index }">
          <span
            class="value primary"
            @click="$emit('item-click', index ? 5 : 3)"
          >
            {{ priceFormat(row.otherAmount)
            }}<span class="unit">{{ unitFormat(row.otherAmount) }}</span></span
          >
        </template>
      </el-table-column>
      <el-table-column label="入账金额" min-width="170" align="center">
        <template slot-scope="{ row, $index: index }">
          <span
            class="value success"
            @click="$emit('item-click', index ? 6 : 4)"
          >
            {{ priceFormat(row.recordedAmount)
            }}<span class="unit">{{
              unitFormat(row.recordedAmount)
            }}</span></span
          >
        </template>
      </el-table-column>
      <el-table-column label="官网缴费订单金额" min-width="170" align="center">
        <template slot-scope="{ row, $index: index }">
          <span
            class="value warning"
            @click="$emit('item-click', index ? 6 : 4)"
          >
            {{ priceFormat(row.officialWebsiteOrderAmount)
            }}<span class="unit">{{
              unitFormat(row.officialWebsiteOrderAmount)
            }}</span></span
          >
        </template>
      </el-table-column>
      <el-table-column label="官网缴费回款金额" min-width="170" align="center">
        <template slot-scope="{ row, $index: index }">
          <span
            class="value danger"
            @click="$emit('item-click', index ? 6 : 4)"
          >
            {{ priceFormat(row.officialWebsitePayAmount)
            }}<span class="unit">{{
              unitFormat(row.officialWebsitePayAmount)
            }}</span></span
          >
        </template>
      </el-table-column>
      <el-table-column label="退款作废金额" min-width="170" align="center">
        <template slot-scope="{ row, $index: index }">
          <span
            class="value primary"
            @click="$emit('item-click', index ? 5 : 3)"
          >
            {{ priceFormat(row.refundAmount)
            }}<span class="unit">{{ unitFormat(row.refundAmount) }}</span></span
          >
        </template>
      </el-table-column>
    </el-table>
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

  computed: {
    tabaleData() {
      return [
        {
          title: "招生",
          studentCount: this.data.recruitStudentNum,
          orderAmount: this.data.recruitOrderMoney,
          payAmount: this.data.recruitPayMoney,
          tuitionAmount: this.data.recruitTuitionMoney,
          otherAmount: this.data.recruitOtherMoney,
          recordedAmount: this.data.recruitEntryMoney,
          officialWebsiteOrderAmount: this.data.recruitWebsiteMoney,
          officialWebsitePayAmount: this.data.recruitWebsitePayMoney,
          refundAmount: this.data.recruitRefundMoney,
        },
        {
          title: "机构",
          studentCount: this.data.orgStudentNum,
          orderAmount: this.data.orgOrderMoney,
          payAmount: this.data.orgPayMoney,
          tuitionAmount: this.data.orgTuitionMoney,
          otherAmount: this.data.orgOtherMoney,
          recordedAmount: this.data.orgEntryMoney,
          officialWebsiteOrderAmount: this.data.orgWebsiteMoney,
          officialWebsitePayAmount: this.data.orgWebsitePayMoney,
          refundAmount: this.data.orgRefundMoney,
        },
      ];
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
  .value {
    display: inline-block;
    padding: 10px 0;
    font-size: 32px;
    cursor: pointer;
    .unit {
      font-size: 12px;
    }
  }
}
</style>