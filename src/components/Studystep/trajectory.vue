<template>
  <div class="trajectory">
    <div class="userTable">
      <el-table
        ref="multipleTable"
        :data="schoolData.list"
        tooltip-effect="light"
        stripe
        style="width: 100%"
        class="min_table"
      >
        <el-table-column
          prop="id"
          label="序号"
          show-overflow-tooltip
          min-width="90"
        ></el-table-column>
        <el-table-column
          prop="create_time"
          label="操作时间"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="source"
          label="来源"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="description"
          label="操作详情"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
      </el-table>
      <div class="table_bottom">
        <div class="table_bottom">
          <page
            :data="schoolData.total"
            :curpage="page"
            @pageChange="doPageChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
      schoolData: [],
    }
  },
  props: {
    uid: {
      type: Number,
    },
    course_id: {
      type: Number,
    },
  },
  created() {
    this.$api.getTrackList(this, 'schoolData')
  },
  methods: {
    doPageChange(page) {
      this.page = page
      this.$api.getTrackList(this, 'schoolData')
    },
  },
}
</script>

<style></style>
