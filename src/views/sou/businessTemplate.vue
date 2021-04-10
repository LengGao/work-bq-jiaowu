<template>
  <section>
    <div class="head_remind">
      *不同业务录入信息不同，根据实际业务场景，可创建不同的业务模板以满足不同需要。
    </div>
    <section class="mainwrap">
      <!--教室配置表格-->
      <div class="userTable">
        <el-table ref="multipleTable" :data="schoolData.list" tooltip-effect="light" stripe style="width: 100%;" :header-cell-style="{ 'text-align': 'center' }" :cell-style="{ 'text-align': 'center' }" class="min_table">
          <el-table-column prop="course_id" label="序号" show-overflow-tooltip min-width="90"></el-table-column>

          <el-table-column prop="course_name" label="模板名称" min-width="200" column-key="course_id" show-overflow-tooltip></el-table-column>
          <el-table-column prop="category_name" label="模板类型" min-width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="status" label="是否启用" min-width="150" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-switch active-color="#13ce66" v-model="scope.row.account_status" :active-value="1" :inactive-value="2" @change="changeSwitch(scope.row)">
              </el-switch>
            </template>
          </el-table-column>

          <el-table-column label="操作" fixed="right" min-width="200">
            <template slot-scope="scope">
              <div style="display:flex;justify-content:center">
                <el-button type="text" @click="topayment(scope.row)">查看</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="table_bottom">
          <page :data="schoolData.total" :curpage="page" @pageChange="doPageChange" />
        </div>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  data() {
    return {
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
.head_remind {
  padding: 20px;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  color: #909399;
  width: 100%;
  border-bottom: 15px solid #f2f6fc;
}
.table_bottom {
  text-align: right;
}
</style>
