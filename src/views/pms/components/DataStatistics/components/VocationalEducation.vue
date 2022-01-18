<template>
  <div>
    <el-table :data="data" :header-cell-style="{ 'text-align': 'center' }">
      <el-table-column type="index" label="排名" width="50"> </el-table-column>
      <el-table-column
        label="分类名称"
        show-overflow-tooltip
        min-width="70"
        align="center"
        prop="draft_id"
      >
      </el-table-column>
      <el-table-column
        prop="user_version"
        label="订单数量"
        min-width="120"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="user_desc"
        label="订单金额"
        min-width="220"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="回款金额"
        min-width="140"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="回款环比"
        min-width="140"
        align="center"
      >
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        min-width="140"
        align="center"
      >
        <template slot-scope="{ row }">
          <el-button type="text" @click="openDetail(row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <DialogBar v-model="show" title="软考类数据详情" />
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
    };
  },
  methods: {
    openDetail(row) {
      this.show = true;
    },
  },
};
</script>

<style>
</style>