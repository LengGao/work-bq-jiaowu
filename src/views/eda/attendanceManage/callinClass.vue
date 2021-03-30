<template>
  <section class="mainwrap">
    <!-- <div class="flex">
      <search
        :organHide="false"
        :schoolHide="false"
        :classNameHide="false"
        :dealStatusHide="false"
        :teacherHide="false"
        api="getMyclient"
        :statusNum="3"
      ></search>
      <el-checkbox v-model="checked">只显示未点名学生</el-checkbox>
    </div> -->
    <div class="flex">
      <div class="callinClass-left">
        <el-row>
          <el-col :lg="6" :xs="6" :sm="6" :xl="6">
            上课日期 <span>2021-04-14</span>
          </el-col>
          <el-col :lg="6" :xs="6" :sm="6" :xl="6">
            上课时间 <span>2021-04-14</span>
          </el-col>
          <el-col :lg="6" :xs="6" :sm="6" :xl="6">
            上课班级 <span>2021-04-14</span>
          </el-col>
          <el-col :lg="6" :xs="6" :sm="6" :xl="6">
            学生人数 <span>200人</span>
          </el-col>
        </el-row>
      </div>
      <div>
        <el-button>
          复位
        </el-button>
        <el-button type="primary">
          保存
        </el-button>
      </div>
    </div>
    <div class="userTable">
      <el-table
        ref="multipleTable"
        :data="schoolData"
        style="width: 100%"
        class="min_table"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <!-- <el-table-column
          label="编号"
          show-overflow-tooltip
          min-width="90"
          prop="classroom_id"
        >
        </el-table-column> -->
        <el-table-column
          prop="classroom_name"
          label="学员姓名"
          min-width="110"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="category_name"
          label="手机号码"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="index_category_name"
          label="所属班级"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="teacher_name"
          label="出勤情况"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="student_number"
          label="备注信息"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="student_number"
          label="出勤情况"
          min-width="110"
          show-overflow-tooltip
        >
          <template>
            <div>
              <el-checkbox-group v-model="checkList">
                <el-checkbox label="复选框 A"></el-checkbox>
                <el-checkbox label="复选框 B"></el-checkbox>
              </el-checkbox-group>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="student_number"
          label="备注信息"
          min-width="110"
          show-overflow-tooltip
        >
          <template>
            <div>
              <el-input placeholder="请输入备注信息"></el-input>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- <div class="table_bottom">
        <div class="table_bottom">
          <page
            :data="schoolData.total"
            :curpage="page"
            @pageChange="doPageChange"
          />
        </div>
      </div> -->
    </div>
  </section>
</template>

<script>
import { getSignList } from '@/api/eda'
export default {
  data() {
    return {}
  },

  created() {
    this.getSignList()
  },
  methods: {
    //签到学生列表
    async getSignList() {
      const data = {
        page: this.pageNum,
        ...this.searchData,
      }
      delete data.date
      this.listLoading = true
      const res = await getSignList(data)
      this.listLoading = false
      // for (var item of res.data.list) {
      //   // console.log(item)
      //   if (item.start_time != 0 || item.start_time != '') {
      //     item.start_time = this.$moment
      //       .unix(item.start_time)
      //       .format('YYYY-MM-DD HH:mm:ss')
      //   } else {
      //     item.start_time = '---'
      //   }
      // }
      this.listData = res.data.list

      console.log(this.listData)
      this.listTotal = res.data.total
    },
  },
}
</script>

<style lang="scss" scoped>
/deep/.el-table__header th,
.el-table__header tr {
  background-color: #f8f8f8;
  color: #909399;
}
.flex {
  display: flex;
  justify-content: space-between;
}
.callinClass-left {
  font-family: 'Microsoft YaHei UI', sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  color: #999999;
  width: 1000px;
  padding-top: 20px;
  span {
    color: #666666;
  }
}
.userTable {
  margin-top: 20px;
}
</style>
