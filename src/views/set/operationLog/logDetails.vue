<template>
  <section class="mainwrap">
    <!-- <div class="logDetailTop">
      <div>
        操作账号: <span>{{ schoolData[0].staff_name }}</span>
      </div>
      <div>
        操作时间: <span>{{ schoolData[0].create_time }}</span>
      </div>
      <div>
        操作 ip: <span>{{ schoolData[0].staff_name }}</span>
      </div>
    </div> -->
    <!--表格-->
    <div class="userTable">
      <el-table
        ref="multipleTable"
        :data="schoolData"
        tooltip-effect="light"
        stripe
        style="width: 100%"
        class="min_table"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <!-- <el-table-column type="selection" width="30"></el-table-column> -->

        <el-table-column
          prop="action"
          label="操作类型"
          min-width="120"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="staff_name"
          label="操作账号"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          prop="table_name"
          label="操作表名"
          min-width="120"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          prop="create_time"
          label="操作时间"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="update_time"
          label="回滚时间"
          min-width="200"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="rollBack(scope.row)">回滚</el-button>
            <!-- <el-button type="text" @click="toLogDetails(scope.row)"
              >详情</el-button
            > -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <h3>详细代码详情</h3>
    <div class="logDetailbox">
      <div class="oldDataBox">
        <h4>原有数据</h4>
        <div class="oldData">{{ origin_data }}</div>
      </div>
      <div class="oldDataBox">
        <h4>更新数据</h4>
        <div class="oldData">{{ new_data }}</div>
      </div>
      <!-- <div class="updateDataBox"></div> -->
    </div>
  </section>
</template>

<script>
export default {
  name: 'logDetails',
  data() {
    return {
      schoolData: [],
      origin_data: {},
      new_data: {},
    }
  },
  created() {
    // this.$api.getadminLogList(this, 'schoolData')
    this.$api.getAdminOperationDetail(this, 'schoolData')
  },
  methods: {
    rollBack(ab) {
      console.log(ab)
      this.$confirm('此操作将会数据回滚,请谨慎操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$api.rollBackOperation(this, ab.id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消回滚',
          })
        })
    },
  },
}
</script>

<style lang="less" scoped>
/deep/.el-table__header th,
.el-table__header tr {
  background-color: #f8f8f8;
  color: #909399;
}
.logDetailTop {
  display: flex;
  font-family: 'Arial Normal', 'Arial', sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
  letter-spacing: normal;
  color: #333333;
  div {
    padding-right: 100px;
    span {
    }
  }
}
h3 {
  font-family: 'Microsoft YaHei UI', sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  color: #199fff;
  margin: 20px 0;
}
.logDetailbox {
  display: flex;
}
.oldDataBox {
  width: 780px;
  height: 400;
  border: 1px solid rgba(215, 215, 215);
  margin-right: 40px;
  h4 {
    height: 50px;
    background-color: #f8f8f8;
    color: #909399;
    font-family: '微软雅黑', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 16px;
    line-height: 50px;
    padding-left: 20px;
  }
  .oldData {
    font-family: '微软雅黑', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 16px;
    color: #333333;
    overflow-y: auto;
  }
}
.updateDataBox {
  width: 780px;
}
</style>
