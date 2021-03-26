<template>
  <div>
    <div class="head_remind">
      *本模块主要是招生老师用来进行日常招生数据的跟进管理，包括学员意向录入、课程缴费报名等操作。
    </div>

    <section class="mainwrap">
      <ul class="navigation">
        <li v-for="item in tabFun" :key="item.id" :class="{ tabg: item.id == isTagactive }" @click="statusSwitch(item)">
          {{ item.name }}
        </li>
      </ul>
      <div class="client_head">
        <div class="searchModule">
          <el-date-picker type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" v-model="startend">
          </el-date-picker>
          <el-select filterable style="width:130px;margin:0 10px" v-model="ruleForm.institution_id" slot="prepend" placeholder="财务状态" clearable>
          </el-select>

          <el-input v-model="ruleForm.institution_id" placeholder="学员姓名/手机号码" style="width:200px;margin-right:10px;"></el-input>
          <el-button type="primary">搜索</el-button>
        </div>
        <div>
          <!-- <el-button type="primary" @click="toCreateClass"
            >导出数据</el-button
          > -->
          <el-button type="primary">导出数据</el-button>

        </div>
      </div>
      <!--表格-->
      <div class="userTable" v-show="isTagactive === 1">
        <el-table ref="multipleTable" 
        :data="schoolData.list" 
        tooltip-effect="light" 
        stripe @selection-change="handleSelectionChange" 
        style="width: 100%;" 
        :header-cell-style="{ 'text-align': 'center' }" 
        :cell-style="{ 'text-align': 'center' }" 
        class="min_table">

          <el-table-column type="selection" width="45"> </el-table-column>
          <el-table-column prop="create_time" label="订单时间" show-overflow-tooltip min-width="100"></el-table-column>

          <el-table-column prop="order_no" label="订单编号" min-width="100" column-key="course_id" show-overflow-tooltip>
            <template slot-scope="scope">
              <div class="coursename" @click="orderDetail(scope.row)">
                {{scope.row.order_no}}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="surname" label="学员姓名" min-width="70" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="create_time" label="联系方式" min-width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="tips" label="项目名称" min-width="180" show-overflow-tooltip></el-table-column>

          <el-table-column prop="pay_money" label="实付金额" min-width="80" show-overflow-tooltip>
          </el-table-column>

          <el-table-column prop="pay_status" label="财务状态" min-width="80" show-overflow-tooltip>
          </el-table-column>

          <el-table-column label="操作" fixed="right" min-width="200">
            <template slot-scope="scope">
              <!-- <div style="display: flex; justify-content:center;">
                <el-button type="text" @click="toCreateClass(scope.row)"
                  >入账</el-button>
              </div> -->
              <div>
                <el-button type="text" @click="dialogVisible = true">入账</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>

        <div class="table_bottom">
          <page
            :data="schoolData.total"
            :curpage="page"
            @pageChange="doPageChange"
          />
        </div>

      </div>

      <div class="userTable" v-show="isTagactive === 2">
        <el-table ref="multipleTable" :data="schoolData" tooltip-effect="light" stripe @selection-change="handleSelectionChange" style="width: 100%;" :header-cell-style="{ 'text-align': 'center' }" :cell-style="{ 'text-align': 'center' }" class="min_table">
          <el-table-column type="selection" width="45"> </el-table-column>

          <el-table-column prop="order_no" label="订单编号" min-width="100" column-key="course_id" show-overflow-tooltip>
            <template slot-scope="scope">
              <div class="coursename" @click="orderDetail">
                {{scope.row.order_no}}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="surname" label="学员姓名" min-width="70" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="class_type_name" label="联系方式" min-width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="course_price" label="申请人" min-width="180" show-overflow-tooltip></el-table-column>

          <el-table-column prop="pay_money" label="申请时间" min-width="80" show-overflow-tooltip>
          </el-table-column>

          <el-table-column prop="pay_status" label="退款金额" min-width="80" show-overflow-tooltip>
          </el-table-column>

          <el-table-column prop="pay_status" label="审核状态" min-width="80" show-overflow-tooltip>
          </el-table-column>

          <el-table-column label="操作" fixed="right" min-width="200">
            <template slot-scope="scope">
              <!-- <div style="display: flex; justify-content:center;">
                <el-button type="text" @click="toCreateClass(scope.row)"
                  >入账</el-button>
              </div> -->
              <div>
                <el-button type="text" @click="dialogVisible = true">入账</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>

      </div>

      <div class="userTable" v-show="isTagactive === 3">
        <el-table ref="multipleTable" :data="schoolData" tooltip-effect="light" stripe @selection-change="handleSelectionChange" style="width: 100%;" :header-cell-style="{ 'text-align': 'center' }" :cell-style="{ 'text-align': 'center' }" class="min_table">
          <el-table-column type="selection" width="45"> </el-table-column>

          <el-table-column prop="order_no" label="订单编号" min-width="100" column-key="course_id" show-overflow-tooltip>
            <template slot-scope="scope">
              <div class="coursename" @click="orderDetail">
                {{scope.row.order_no}}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="surname" label="学员姓名" min-width="70" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="class_type_name" label="联系方式" min-width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="course_price" label="申请人" min-width="180" show-overflow-tooltip></el-table-column>

          <el-table-column prop="pay_money" label="申请时间" min-width="80" show-overflow-tooltip>
          </el-table-column>

          <el-table-column prop="pay_status" label="退款金额" min-width="80" show-overflow-tooltip>
          </el-table-column>

          <el-table-column prop="pay_status" label="审核状态" min-width="80" show-overflow-tooltip>
          </el-table-column>

          <el-table-column label="操作" fixed="right" min-width="200">
            <template slot-scope="scope">
              <!-- <div style="display: flex; justify-content:center;">
                <el-button type="text" @click="toCreateClass(scope.row)"
                  >入账</el-button>
              </div> -->
              <div>
                <el-button type="text" @click="dialogVisible = true">入账</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>

      </div>

      <!-- <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog> -->
      <el-dialog
              title="提示"
              :visible.sync="dialogVisible"
              width="25%"
              
             >
              <span style="font-size:20px;">是否将此笔订单入账？</span>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
              </span>
            </el-dialog>
    </section>
  </div>
</template>

<script>
export default {
  name: 'order',

  data() {
    return {
      dialogVisible: false,
      startend: '',
      ruleForm: {
        category_id: '',
      },
      isTagactive: 1,
      tabFun: [
        {
          id: 1,
          name: '入账审批',
        },
        {
          id: 2,
          name: '退费审批',
        },
        {
          id: 3,
          name: '作废审批',
        },
      ],

      page: 1,

      schoolData: [
        {
          // create_time: 1,
          // order_no: '20209090123',
          // class_type_name: 1360000000,
          // course_price: 888,
          // max_num: 888,
          // max_time: '已付款',
        },
        {
          course_id: 1,
          course_name: '20209090123',
          class_type_name: 19805550009,
          course_price: 888,
          max_num: 888,
          max_time: '已付款',
        },
  
      ],
      course_ids: [],
      datas: {},
      selectData: [],
    }
  },
  created() {},
   mounted() {
    this.$api.orderindex(this, 'schoolData')
  },

  methods: {
    orderDetail(ab) {
      this.$router.push({
        path: '/fina/orderDetail',
        query: {
          order_id: ab.order_id,
        },
      })
    },
    doPageChange(page) {
      this.page = page
      this.$api.orderindex(this, 'schoolData', this.datas)
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
   
    statusSwitch(ab) {
      this.isTagactive = ab.id
    },
    getTableList(state, val, datas) {
      if (state == 'page') {
        this.page = val
        this.datas = datas
      } else if (state == 'data') {
        this.schoolData = val
      }
    },
    doPageChange(page) {
      this.page = page
      this.$api.getCourseManage(this, 'schoolData', this.datas)
    },

    handleSelectionChange(val) {
      let multipleSelection = val
      this.course_ids = multipleSelection.map((i) => {
        console.log(i.course_id)
        return i.course_id
      })
    },
    toCreateClass(text) {
      //   console.log(text)
      //   let course_id = ''
      //   let setMeal = ''
      //   if (text == '2') {
      //     setMeal = text
      //   } else if (text.class_type_name == '套餐班') {
      //     setMeal = '2'
      //     course_id = text.course_id
      //   } else if (text.class_type_name == '单科班') {
      //     setMeal = '1'
      //     course_id = text.course_id
      //   } else {
      //     setMeal = '1'
      //   }
      this.$router.push({
        path: '/sou/createClass',
        query: {},
      })
    },

    release(ab, status) {
      let course_id = []
      course_id.push(ab.course_id)
      this.$api.bashPublish(this, course_id, status)
    },
    chapterVideo(index, row) {
      this.$router.push({
        path: '/eda/videoUpload',
        query: { video_collection_id: row.video_collection_id },
      })
    },
    scopes(id, sorts) {
      var regu = /^([1-9]\d*(\.\d*[1-9])?)|(0\.\d*[1-9])$/
      var re = new RegExp(regu)
      if (!re.test(sorts)) {
        this.$message.error('请输入正确的排序！')
        return false
      } else {
        this.$api.updateCourseSort(id, sorts, this)
      }
    },
    batchRelease() {
      if (this.course_ids.length > 0) {
        let status = 2
        this.$api.bashPublish(this, this.course_ids, status)
      } else {
        this.$message({
          type: 'warning',
          message: '请先勾选你想发布的项',
        })
      }
    },
    batchClose() {
      if (this.course_ids.length > 0) {
        let status = 1
        this.$api.bashPublish(this, this.course_ids, status)
      } else {
        this.$message({
          type: 'warning',
          message: '请先勾选你想关闭的项',
        })
      }
    },
    batchDeletion() {
      if (this.course_ids.length > 0) {
        this.$confirm('你正在批量删除该条数据,数据删除后将无法恢复,请谨慎操作?', '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            this.$api.bashDelete(this, this.course_ids)
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除',
            })
          })
      } else {
        this.$message({
          type: 'warning',
          message: '请先勾选你想删除的项',
        })
      }
    },
    handleDelete(ab) {
      console.log(ab)
      let course_id = ab.course_id
      this.$confirm('你正在删除该条数据,数据删除后将无法恢复,请谨慎操作?', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$api.deleteCourses(this, ab.course_id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
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
.main {
  padding: 20px;
  margin: 20px;
  background: #fff;
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
.navigation {
  width: 220px;
  display: flex;
  justify-content: space-between;
  font-family: 'Microsoft YaHei UI', sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 22px;
  margin-bottom: 10px;
  li {
    height: 28px;
    font-size: 15px;

    border-bottom: 2px solid #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    cursor: pointer;
    color: #666666;
  }
  li:last-child {
    margin-right: 0px !important;
  }
  li:hover {
    color: #199fff;
    border-bottom: 2px solid #199fff;
  }
}
.tabg {
  //background: #2798ee;
  color: #2798ee !important;
  border-bottom: 2px solid #199fff !important;
}
.client_head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.userTable {
  margin-top: 20px;
}
.batch_btn {
  padding-top: 20px;
  .el-button {
    margin-right: 25px;
  }
}
/deep/.tablescope {
  .el-switch__label--left {
    position: absolute;
    left: 10px;
    color: #fff;
    z-index: -1;
  }
  .el-switch__label--right {
    position: absolute;
    color: #fff;
    z-index: -1;
  }
  .el-switch__label--right.is-active {
    z-index: 1;
    color: #fff !important;
  }
  .el-switch__label--left.is-active {
    z-index: 1;
    color: #9c9c9c !important;
  }
  .is-checked {
    padding: 0;
  }
}
.coursename {
  color: #2798ee;
}
.dialog-footer {
  display: flex;
  justify-content: center;
}
.table_bottom{
text-align: right;
}
</style>
