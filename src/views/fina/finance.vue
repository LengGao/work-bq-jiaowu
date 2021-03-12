<template>
  <section>
    <div class="head_remind">
      *本模块主要是招生老师用来进行日常招生数据的跟进管理，包括学员意向录入、课程缴费报名等操作。
    </div>
    <div class="mainPart">
      <ul class="customer_navigation">
        <li
          v-for="item in tabFun"
          :key="item.id"
          :class="{ tabg: item.id == isTagactive }"
          @click="statusSwitch(item)"
          
        >
          {{ item.name }}
        </li>
      </ul>
      <!--搜索模块-->
      <header>
        <div class="searchModule">
          <el-date-picker
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="margin-right:10px;"
            v-model="startend"
          >
          </el-date-picker>

          <el-input
            v-model="ruleForm.institution_id"
            placeholder="客户姓名/手机号码"
            style="width:200px;margin-right:10px;"
          ></el-input>
          <el-button type="primary">搜索</el-button>
        </div>
        <div>
          <el-button type="primary" style="height:40px" @click="batchImport">
          导入订单</el-button
        >
          <el-button type="primary" style="height:40px">
            导出</el-button
          >
        </div>
      </header>
      
        <div>
            <!--添加客户弹框-->
        <el-dialog
          title="导入订单"
          :visible.sync="importVisible"
          width="40%"
          style="min-width:600px;"
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
                  <el-select class="input-width" placeholder="请选择类型" v-model="inputfl">
                    <el-option label="职称考证" value="shanghai"></el-option>
                    <el-option label="学历教育" value="edu"></el-option>
                    <el-option label="特种作业" value="tzzy"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :lg="12" :xs="12" :sm="12" :md="12">
                <el-form-item label="项目名称" prop="name">
                  <el-select class="input-width" placeholder="请选择项目名称" v-model="xmname">
                    <el-option label="系统集成项目管理工程师" value="xtjc"></el-option>
                    <el-option label="系统规划与管理师" value="xtgh"></el-option>
                    <el-option label="中级经济师" value="jjs"></el-option>
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

      <el-row class="dataPanel" style="">
        <template>
          <el-col :lg="{ span: '4-8' }">
            <div class="timeCard">
              <div>
                <h3>订单总价</h3>
                <div class="time_num">
                  2000000
                  <!-- <span>{{ panelData.day }}</span -->
                </div>
              </div>
            </div>
          </el-col>
          <el-col :lg="{ span: '4-8' }">
            <div class="timeCard">
              <div>
                <h3>应收金额</h3>
                <div class="time_num">
                    10000000
                  <!-- <span>{{ panelData.use_time }}</span> -->
                </div>
              </div>
            </div>
          </el-col>
          <el-col :lg="{ span: '4-8' }">
            <div class="timeCard">
              <div>
                <h3>实收金额</h3>
                <div class="time_num">
                    6000
                  <!-- <span>{{ panelData.total_problem }}</span> -->
                </div>
              </div>
            </div>
          </el-col>
          <el-col :lg="{ span: '4-8' }">
            <div class="timeCard">
              <div>
                <h3>欠费金额</h3>
                <div class="time_num">
                    9800.00
                  <!-- <span>{{ panelData.accuracy }}</span
                  ><em>%</em> -->
                </div>
              </div>
            </div>
          </el-col>
          <el-col :lg="{ span: '4-8' }">
            <div class="timeCard">
              <div>
                <h3>退费金额</h3>
                <div class="time_num">
                    1298800
                  <!-- <span>{{ panelData.accuracy }}</span
                  ><em>%</em> -->
                </div>
              </div>
            </div>
          </el-col>
        </template>
      </el-row>
      <!--列表-->
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
            prop="order_id"
            label="订单编号"
            show-overflow-tooltip
            min-width="90"
          ></el-table-column>
          <el-table-column
            prop="surname"
            label="学员姓名"
            min-width="90"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="total"
            label="订单总价"
            min-width="90"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="reduction"
            label="优惠金额"
            min-width="90"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="order_money"
            label="应收金额"
            min-width="90"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column
            prop="pay_money"
            label="实收金额"
            min-width="90"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column
            prop="overdue_money"
            label="欠交金额"
            min-width="90"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column
            prop="pay_status"
            label="订单状态"
            min-width="100"
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
    </div>
  </section>
</template>

<script>
import { getBirth, getSex } from '@/utils/index'
export default {
  name: 'finance',

  data() {
    
    return {
      xmname:'',
      inputfl:'',
      startend:'',
      importVisible:false,
      rules:[],
      schoolData: [],     
      ruleForm: {
        surname: '',
        mobile: '',
        id_card_number: '',
        sex: 0,
        birthday: '',
        marry: 0,
        qq: '',
        email: '',
        culture: '',
        province: '',
        city: '',
        from_organization_id: '',
        sources: '',
        tips: '',
      },
      curstomerVisible: false,
      
      isTagactive: 1,
      tabFun: [
        {
          id: 1,
          name: '全部订单',
        },
        {
          id: 2,
          name: '待付款',
        },
        {
          id: 3,
          name: '已付款',
        },
        {
          id: 4,
          name: '已作废',
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
    this.$api.orderindex(this, 'schoolData')
  },
  filters: {

  },
  methods: {
     statusSwitch(ab) {
      this.isTagactive = ab.id
    },
      receiveStudent(zx) {
      console.log(zx)
      this.$api.receive(this, zx.intent_id)
    },
    doPageChange(page) {
      this.page = page
      // this.$api.getMyclient(this, 'myclient', status)
      this.$api.orderindex(this, 'schoolData', this.datas)
    },

      addCustomer() {
      //添加用户弹框打开
      this.importVisible = true
    },
    batchImport() {
      this.importVisible = true
    },
      doPageChange(){

      },
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
  width: 300px;
  display: flex;
  justify-content: space-between;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  margin-bottom: 10px;
  li {
    height: 28px;
    font-size: 16px;
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
.realname {
  color: #199fff;
  cursor: pointer;
}
</style>
