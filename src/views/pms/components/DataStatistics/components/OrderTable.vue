<template>
  <div>
    <el-table :data="data" :header-cell-style="{ 'text-align': 'center' }">
      <el-table-column type="index" label="排名" width="50"> </el-table-column>
      <el-table-column
        label="分类名称"
        show-overflow-tooltip
        min-width="120"
        align="center"
        prop="category_name"
      >
        <template slot-scope="{ row }">
          {{ row.category_name || row.title || "" }}
        </template>
      </el-table-column>
      <el-table-column
        prop="order_count"
        label="招生/机构订单数"
        min-width="90"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="{ row }">
          <span>{{
            `${row.zhaosheng_order_count} / ${row.jigou_order_count}`
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="order_money"
        label="订单金额"
        min-width="120"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="{ row }">
          <span>{{ row.order_money | moneyFormat }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="order_returned_money_this_month"
        label="回款金额"
        min-width="120"
        align="center"
      >
        <template slot-scope="{ row }">
          <span>{{ row.order_returned_money_this_month | moneyFormat }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="order_refund_money"
        label="退款金额"
        min-width="100"
        align="center"
      >
        <template slot-scope="{ row }">
          <span>{{ row.order_refund_money | moneyFormat }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="ratio"
        label="回款环比"
        min-width="100"
        align="center"
      >
        <template slot-scope="{ row }">
          <span :class="`ratio${isDown(row.ratio) ? '--down' : ''}`">
            <span class="ratio-value">{{ row.ratio }}</span>
            <i class="el-icon-bottom" v-if="isDown(row.ratio)"></i>
            <i class="el-icon-top" v-else></i>
          </span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" min-width="50" align="center">
        <template slot-scope="{ row }">
          <el-button type="text" @click="openDetail(row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <DialogBar
      v-model="show"
      v-bind="$attrs"
      :data="clickData"
      :title="`${clickData.category_name || clickData.title || ''}数据详情`"
    />
  </div>
</template>

<script>
import DialogBar from "./DialogBar";
export default {
  name: "OrderTable",
  props: {
    data: {
      type: Array,
      default: () => [{}],
    },
  },
  components: {
    DialogBar,
  },
  data() {
    return {
      show: false,
      clickData: {},
    };
  },

  methods: {
    isDown(val) {
      return val.includes("-");
    },
    openDetail(row) {
      this.show = true;
      this.clickData = row;
    },
  },
};
</script>

<style lang="less" scoped>
.ratio {
  color: #43d100;
  &--down {
    color: #fd6500;
  }
}
</style>