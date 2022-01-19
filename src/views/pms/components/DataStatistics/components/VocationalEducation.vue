<template>
  <div>
    <el-table :data="data" :header-cell-style="{ 'text-align': 'center' }">
      <el-table-column type="index" label="排名" width="50"> </el-table-column>
      <el-table-column
        label="分类名称"
        show-overflow-tooltip
        min-width="100"
        align="center"
        prop="category_name"
      >
      </el-table-column>
      <el-table-column
        prop="order_count"
        label="订单数量"
        min-width="100"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="order_money"
        label="订单金额"
        min-width="100"
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
        min-width="100"
        align="center"
      >
        <template slot-scope="{ row }">
          <span>{{ row.order_returned_money_this_month | moneyFormat }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="ratio"
        label="回款环比"
        min-width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        min-width="100"
        align="center"
      >
        <template slot-scope="{ row }">
          <el-button type="text" @click="openDetail(row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <DialogBar
      v-model="show"
      v-bind="$attrs"
      :data="clickData"
      :title="`${clickData.category_name}数据详情`"
    />
  </div>
</template>

<script>
import DialogBar from "./DialogBar";
export default {
  name: "VocationalEducation",
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
    openDetail(row) {
      this.show = true;
      this.clickData = row;
    },
  },
};
</script>

<style>
</style>