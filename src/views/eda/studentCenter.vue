<template>
  <section>
    <div class="head_remind">
      *本模块主要是教务老师用来进行日常学生数据的跟进管理。
    </div>
    <div class="mainPart">
      <!-- <ul class="customer_navigation">
        <li v-for="item in tabFun" :key="item.id">{{ item.name }}</li>
      </ul> -->
      <!--搜索模块-->
      <header>
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
            style="width:130px;margin:0 10px"
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
            v-model="ruleForm.institution_id"
            placeholder="客户姓名/手机号码"
            style="width:200px;margin-right:10px;"
          ></el-input>
          <el-button type="primary">搜索</el-button>
        </div>
        <el-button type="primary" style="height:40px" @click="batchImport">
          批量导入</el-button
        >
      </header>
      <!--列表-->
      <div class="userTable">
        <el-table
          ref="multipleTable"
          :data="schoolData"
          tooltip-effect="light"
          stripe
          style="width: 100%;"
          class="min_table"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column
            prop="uid"
            label="ID"
            show-overflow-tooltip
            min-width="90"
          ></el-table-column>
          <el-table-column
            prop="realname"
            label="学生姓名"
            min-width="110"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div class="realname" @click="toStudentDetail">
                {{ scope.row.realname }}
              </div>
            </template>
          </el-table-column>

          <el-table-column
            prop="mobile"
            label="手机号码"
            min-width="150"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="create_time"
            label="推荐机构"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="category_name"
            label="所属校区"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="course_name"
            label="所属老师"
            min-width="150"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="institution_name"
            label="数据来源"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="teacher_name"
            label="创建时间"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>
        </el-table>
        <!--添加客户弹框-->
        <el-dialog
          title="批量导入"
          :visible.sync="importVisible"
          width="50%"
          style="min-width:1070px"
        >
          <el-form
            label-width="110px"
            class="demo-ruleForm"
            :show-message="true"
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
          >
            <h3 style="margin-bottom:20px">下载模板</h3>
            <div style="display:flex">
              <div class="student-btn">
                <div>
                  <i class="el-icon-upload el-icon--right"></i>
                  <span>下载模板</span>
                </div>
              </div>
              <p style="margin:11px 0 0 17px;color:#999">
                点击按钮下载模版，
                并按照规定格式填写数据，黄色表头表示的列为必选项。
              </p>
            </div>
            <h3 style="margin:20px 0">数据配置</h3>
            <el-row>
              <el-col :lg="12" :xs="12" :sm="12" :md="12">
                <el-form-item label="所属分类" prop="name">
                  <el-select class="input-width" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :lg="12" :xs="12" :sm="12" :md="12">
                <el-form-item label="项目名称" prop="name">
                  <el-select class="input-width" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :lg="12" :xs="12" :sm="12" :md="12">
                <el-form-item label="所属班级" prop="name">
                  <el-select class="input-width" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <h3 style="margin:20px 0">上传文件</h3>
          <div style="display:flex">
            <div class="student-btn">
              <div>
                <i class="el-icon-upload el-icon--right"></i>
                <span>上传文件</span>
              </div>
            </div>
            <p style="margin:11px 0 0 17px;color:#999">
              上传文件格式仅支持xIs， 且文件大小不得超过5M。
            </p>
          </div>
          <!-- <span>这是一段信息</span> -->
          <span slot="footer" class="dialog-footer">
            <el-button @click="importVisible = false">取 消</el-button>
            <el-button type="primary" @click="toOrderManage">提 交</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'myClients',

  data() {
    return {
      schoolData: [{ realname: '张小北' }],
      rules: {},
      ruleForm: {},
      importVisible: false,

      page: 1,
      status: 1,
      datas: {},
    }
  },
  created() {
    this.status = 1
  },
  mounted() {},

  methods: {
    toOrderManage() {
      this.$router.push({
        path: '/eda/orderManage',
      })
    },
    toStudentDetail() {
      this.$router.push({
        path: '/eda/studentDetail',
      })
    },
    batchImport() {
      this.importVisible = true
    },
    //保存
    preserve() {
      console.log(this.ruleForm)
      this.$api.addCustomers(this, this.ruleForm)
    },

    toCustomeRegist() {
      this.$router.push({
        path: '/etm/customeRegist',
      })
    },

    addCustomer() {
      //添加用户弹框打开
      this.importVisible = true
    },
  },
}
</script>

<style lang="scss" scoped>
/deep/.el-input__inner {
  // width: 240px;
}
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
header {
  display: flex;
  justify-content: space-between;
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
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  margin-bottom: 10px;
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
.dataPanel {
  margin-top: 20px;
}
.el-col-lg-4-8 {
  width: 20%;
}
.client_head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.userTable {
  margin-top: 20px;
}
.timeCard {
  width: 90%;
  height: 90px;
  border: 1px solid #ccc;
  float: left;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 14px;
  h3 {
    font-weight: 400;
    font-style: normal;
    color: #606266;
    text-align: center;
  }
  .time_num {
    padding-top: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
    font-family: 'Microsoft YaHei UI', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 24px;
    color: #606266;
    text-align: center em {
      font-size: 20px;
    }
  }
}
.flexfr {
  display: flex;
  justify-content: flex-end;
}
.student-btn {
  border-radius: 2px;
  width: 87px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #199fff;
  color: #fff;
}
.demo-ruleForm {
  h3 {
    padding-left: 4px;
    border-left: 4px solid #199fff;
    font-family: 'Arial Normal', 'Arial', sans-serif;
    font-weight: 400;
    letter-spacing: normal;
    color: #333333;
    font-size: 16x;
    font-style: normal;
  }
}
.input-width {
  width: 240px;
}
.realname {
  color: #199fff;
  cursor: pointer;
}
</style>
