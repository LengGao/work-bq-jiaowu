<template>
  <section class="mainwrap">
    <!--表格-->
    <header style="margin-bottom:20px">
      <el-date-picker
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
      <el-select
        v-model="value"
        placeholder="请选择"
        style="width:200px;margin-left:10px"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-input style="width:200px;margin: 0 10px"> </el-input>
      <el-button>搜索</el-button>
    </header>

    <div class="userTable">
      <el-table
        ref="multipleTable"
        :data="schoolData.list"
        tooltip-effect="light"
        stripe
        @selection-change="handleSelectionChange"
        style="width: 100%;"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
        class="min_table"
      >
        <el-table-column type="selection" width="45"> </el-table-column>
        <el-table-column
          prop="course_id"
          label="序号"
          show-overflow-tooltip
          min-width="90"
        ></el-table-column>
        <el-table-column
          prop="course_name"
          label="操作时间"
          min-width="200"
          column-key="course_id"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="category_name"
          label="操作类型"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="class_type_name"
          label="操作数量"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="course_price"
          label="更新库存数量"
          min-width="80"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="course_price"
          label="操作人"
          min-width="80"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="course_price"
          label="备注信息"
          min-width="80"
          show-overflow-tooltip
        ></el-table-column>
      </el-table>
      <div class="table_bottom">
        <page
          :data="schoolData.total"
          :curpage="page"
          @pageChange="doPageChange"
        />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'textbookRecord',
  data() {
    return {
      ruleForm: {
        category_id: '',
      },

      page: 1,
      schoolData: [],
    }
  },
}
</script>

<style lang="scss" scoped>
/deep/.el-table__header th,
.el-table__header tr {
  background-color: #f8f8f8;
  color: #909399;
}
</style>
