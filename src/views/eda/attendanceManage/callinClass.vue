<template>
  <section class="mainwrap">
    <SearchList
      :options="searchOptions"
      :data="searchData"
      @on-search="handleSearch"
    />
    <div class="flex">
      <div class="callinClass-left">
        <p>
          上课日期 <span>{{ classroomData.date }}</span>
        </p>
        <p>
          上课时间 <span>{{ classroomData.start_time }}</span>
        </p>
        <p>
          上课班级 <span>{{ classroomData.classroom_name }}</span>
        </p>
        <p>
          学生人数 <span>{{ classroomData.people_number }}</span>
        </p>
      </div>
      <div>
        <el-button @click="getSignList">
          复位
        </el-button>
        <el-button type="primary" @click="handleSave">
          保存
        </el-button>
      </div>
    </div>
    <div>
      <el-button @click="Attendance(2)">
        批量出勤
      </el-button>
      <el-button type="primary" @click="Attendance(1)">
        批量缺勤
      </el-button>
    </div>
    <div class="userTable">
      <el-table
        ref="multipleTable"
        :data="listData"
        style="width: 100%"
        class="min_table"
        @selection-change="handleSelectionChange"
        v-loading="listLoading"
        element-loading-text="loading"
        element-loading-spinner="el-icon-loading"
        element-loading-background="#fff"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column type="selection" width="45"> </el-table-column>
        <el-table-column
          prop="nickname"
          label="学员姓名"
          min-width="110"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="手机号码"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="classroom_name"
          label="所属班级"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="sign_type"
          label="出勤情况"
          min-width="110"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <div>
              <el-radio-group v-model="row.sign_type">
                <el-radio :label="2">
                  出勤
                </el-radio>
                <el-radio :label="1">
                  缺勤
                </el-radio>
              </el-radio-group>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注信息"
          min-width="110"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <div>
              <el-input
                placeholder="请输入备注信息"
                v-model="row.remark"
              ></el-input>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </section>
</template>

<script>
import { getSignList, batchSign, getcourseallclass } from '@/api/eda'
export default {
  data() {
    return {
      class_hour_id: '',
      arrange_id: '',
      searchOptions: [
        {
          key: 'classroom_id',
          type: 'select',
          options: [],
          optionValue: 'classroom_id',
          optionLabel: 'classroom_name',
          attrs: {
            placeholder: '所属班级',
            clearable: true,
          },
        },
        {
          key: 'value',
          attrs: {
            placeholder: '学生姓名/手机号码',
          },
        },
      ],
      listData: [],
      multipleSelection: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      param_arr: [],
      searchData: {
        classroom_id: '',
        value: '',
      },
    }
  },

  created() {
    this.classroomData = JSON.parse(this.$route.query.param)
    this.class_hour_id = this.$route.query.class_hour_id
    this.arrange_id = this.$route.query.arrange_id
    this.getSignList()
    this.getcourseallclass()
  },
  methods: {
    handleSearch(data) {
      this.pageNum = 1
      this.searchData = {
        ...data,
      }
      this.getSignList()
    },
    // 获取班级下拉
    async getcourseallclass() {
      const data = {}
      const res = await getcourseallclass(data)
      if (res.code === 0) {
        this.searchOptions[0].options = res.data
      }
    },
    Attendance(num) {
      this.param_arr = []
      if (this.multipleSelection && this.multipleSelection.length) {
        this.multipleSelection.forEach((i) => {
          var obj = {
            id: i.id,
            sign_type: num,
            remark: i.remark,
          }
          this.param_arr.push(obj)
        })
        this.batchSign()
      } else {
        this.$message.warning('你还没勾选学生')
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleSave() {
      console.log(this.listData)
      this.param_arr = []
      this.listData.forEach((i) => {
        if (i.sign_type != 0) {
          var obj = {
            id: i.id,
            sign_type: i.sign_type,
            remark: i.remark,
          }
          this.param_arr.push(obj)
        }
      })
      this.batchSign()
    },
    //手动签到
    async batchSign() {
      const data = {
        class_hour_id: this.class_hour_id,
        arrange_id: this.arrange_id,
        param_arr: this.param_arr,
      }
      const res = await batchSign(data)
      if (res.code === 0) {
        this.$message.success(res.message)
        this.getSignList()
      }
    },
    //签到学生列表
    async getSignList() {
      const data = {
        class_hour_id: this.class_hour_id,
        arrange_id: this.arrange_id,
        ...this.searchData,
      }

      this.listLoading = true
      const res = await getSignList(data)
      this.listLoading = false

      this.listData = res.data

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
  align-items: center;
}
.callinClass-left {
  font-family: 'Microsoft YaHei UI', sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  color: #999999;
  width: 80%;
  display: flex;
  justify-content: space-between;
  // padding-top: 20px;
  span {
    margin-left: 10px;
    color: #666666;
  }
}
.userTable {
  margin-top: 20px;
}
</style>
