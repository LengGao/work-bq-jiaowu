<template>
  <section>
    <div class="head_remind">
      *本模块主要是招生老师用来进行日常招生数据的跟进管理，包括学员意向录入、课程缴费报名等操作。
    </div>
    <div class="mainPart">
      <ul class="customer_navigation">
        <li v-for="item in tabFun" :key="item.id">{{ item.name }}</li>
      </ul>
      <!--搜索模块-->
      <div class="searchModule">
        <el-date-picker
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
        <el-select
          filterable
          v-if="campusShow"
          style="width:130px;margin-right:10px"
          v-model="ruleForm.institution_id"
          slot="prepend"
          placeholder="所属分类"
          clearable
        >
          <!-- <el-option
            :label="item.institution_name"
            :value="item.institution_id"
            v-for="(item, index) in campusData.list"
            :key="index"
          ></el-option> -->
        </el-select>
        <el-select
          filterable
          style="width:130px;margin-right:10px"
          v-model="ruleForm.institution_id"
          slot="prepend"
          placeholder="所属项目"
          clearable
        >
          <!-- <el-option
            :label="item.institution_name"
            :value="item.institution_id"
            v-for="(item, index) in campusData.list"
            :key="index"
          ></el-option> -->
        </el-select>
        <el-select
          filterable
          style="width:130px;margin-right:10px"
          v-model="ruleForm.institution_id"
          slot="prepend"
          placeholder="推荐机构"
          clearable
        >
          <!-- <el-option
            :label="item.institution_name"
            :value="item.institution_id"
            v-for="(item, index) in campusData.list"
            :key="index"
          ></el-option> -->
        </el-select>
        <el-select
          filterable
          style="width:130px;margin-right:10px"
          v-model="ruleForm.institution_id"
          slot="prepend"
          placeholder="渠道来源"
          clearable
        >
          <!-- <el-option
            :label="item.institution_name"
            :value="item.institution_id"
            v-for="(item, index) in campusData.list"
            :key="index"
          ></el-option> -->
        </el-select>
        <el-select
          filterable
          style="width:130px;margin-right:10px"
          v-model="ruleForm.institution_id"
          slot="prepend"
          placeholder="成交状态"
          clearable
        >
          <!-- <el-option
            :label="item.institution_name"
            :value="item.institution_id"
            v-for="(item, index) in campusData.list"
            :key="index"
          ></el-option> -->
        </el-select>
        <el-select
          filterable
          style="width:130px;margin-right:10px"
          v-model="ruleForm.institution_id"
          slot="prepend"
          placeholder="所属校区"
          clearable
        >
          <!-- <el-option
            :label="item.institution_name"
            :value="item.institution_id"
            v-for="(item, index) in campusData.list"
            :key="index"
          ></el-option> -->
        </el-select>
        <el-input
          v-model="input"
          placeholder="客户姓名/手机号码"
          style="width:200px"
        ></el-input>
        <el-button type="primary">搜索</el-button>
      </div>
      <div class="userTable">
        <el-table
          ref="multipleTable"
          :data="schoolData.list"
          tooltip-effect="light"
          stripe
          style="width: 100%;"
          class="min_table"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column
            prop="uid"
            label="学员编号"
            show-overflow-tooltip
            min-width="90"
          ></el-table-column>
          <el-table-column
            prop="realname"
            label="学生姓名"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column
            prop="mobile"
            label="手机号码"
            min-width="150"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="create_time"
            label="注册时间"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="category_name"
            label="课程类型"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="course_name"
            label="课程名称"
            min-width="150"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="institution_name"
            label="所属机构"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="teacher_name"
            label="所属老师"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="sources"
            label="渠道来源"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="成交状态"
            min-width="100"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              {{ scope.row.type | dealType }}
            </template>
          </el-table-column>

          <el-table-column label="操作" fixed="right" min-width="200">
            <template slot-scope="scope">
              <div style="display: flex;">
                <el-button
                  type="text"
                  v-if="scope.row.type != '3'"
                  @click="toIntentionEntry(scope.row)"
                  >编辑</el-button
                >
                <el-button
                  type="text"
                  v-if="scope.row.type == '1' || scope.row.type == '3'"
                  @click="topayment(scope.row)"
                  >缴费</el-button
                >
                <el-button
                  type="text"
                  v-if="scope.row.type == '1'"
                  @click="jumpSea(scope.row)"
                  >跳海</el-button
                >
                <el-button
                  type="text"
                  v-if="scope.row.type == '1'"
                  @click="toSwapStudent"
                  >转交</el-button
                >
                <el-button
                  type="text"
                  @click="topayment(scope.row, (refund = 'refund'))"
                  v-if="scope.row.type == '2'"
                  >退费</el-button
                >
                <el-button
                  type="text"
                  @click="toRefundDetail(scope.row)"
                  v-if="scope.row.type == '3'"
                  >退费情况</el-button
                >
                <el-button type="text" @click="toStudentDetail(scope.row)"
                  >详情</el-button
                >
              </div>
            </template>
          </el-table-column>
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
  </section>
</template>

<script>
export default {
  name: 'myClients',
  data() {
    return {
      schoolData: [],
      ruleForm: {},
      tabFun: [
        {
          id: 1,
          name: '全部客户',
        },
        {
          id: 2,
          name: '我的客户',
        },
      ],
      page: 1,
      status: 1,
      datas: {},
    }
  },
  created() {
    this.status = 1
  },
  mounted() {
    // this.$api.getMyclient(this, 'schoolData')
  },
  filters: {
    dealType(type) {
      if (type == '2') {
        return '已成交'
      } else if (type == '3') {
        return '已退费'
      } else {
        return '未成交'
      }
    },
  },
  methods: {
    getTableList(state, val, datas) {
      console.log(state, val, datas)
      if (state == 'page') {
        this.page = val
        this.datas = datas
        console.log(this.datas)
      } else if (state == 'data') {
        this.schoolData = val
      }
    },
    toSwapStudent() {
      this.$router.push({
        path: '/etm/swapStudent',
      })
    },
    topayment(yz, zx) {
      this.$router.push({
        path: '/etm/payMent',
        query: { intent_id: yz.intent_id, refund: zx, lastPage: this.page },
      })
    },
    toRefundDetail(ab) {
      console.log(ab)
      this.$router.push({
        path: '/etm/refundDetail',
        query: { intent_id: ab.intent_id },
      })
    },
    toStudentDetail(zx) {
      console.log(zx)
      let intent_id = zx.intent_id
      let uid = zx.uid
      this.$router.push({
        path: '/etm/studentDetail',
        query: { intent_id: intent_id, uid: uid },
      })
    },
    toIntentionEntry(ab) {
      console.log(ab)
      let intent_id = ab.intent_id
      this.$router.push({
        path: '/etm/IntentionEntry',
        query: { intent_id: intent_id, lastPage: this.page },
      })
    },
    jumpSea(ab) {
      let intent_id = ab.intent_id
      this.$confirm('确定要把学员转交到公海吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$api.jumpSea(this, intent_id)
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!',
          // })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    doPageChange(page) {
      this.page = page
      this.$api.getMyclient(this, 'schoolData', this.datas)
    },
  },
  //
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
.mainPart {
  padding: 20px;
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
.customer_navigation {
  width: 133px;
  display: flex;
  justify-content: space-between;
  li {
    height: 28px;
    font-size: 14px;

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
.searchModule {
}
.client_head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.userTable {
  margin-top: 20px;
}
</style>
