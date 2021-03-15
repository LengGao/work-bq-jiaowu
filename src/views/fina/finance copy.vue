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
                  
                  <span>{{ panelData.day }}</span>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :lg="{ span: '4-8' }">
            <div class="timeCard">
              <div>
                <h3>应收金额</h3>
                <div class="time_num">
                    
                  <span>{{ panelData.use_time }}</span>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :lg="{ span: '4-8' }">
            <div class="timeCard">
              <div>
                <h3>实收金额</h3>
                <div class="time_num">
                  <span>{{ panelData.total_problem }}</span>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :lg="{ span: '4-8' }">
            <div class="timeCard">
              <div>
                <h3>欠费金额</h3>
                <div class="time_num">
                  <span>{{ panelData.accuracy }}</span
                  >
                </div>
              </div>
            </div>
          </el-col>
          <el-col :lg="{ span: '4-8' }">
            <div class="timeCard">
              <div>
                <h3>退费金额</h3>
                <div class="time_num">
                  <span>{{ panelData.accuracy }}</span
                  >
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
          :data="schoolData"
          tooltip-effect="light"
          stripe
          style="width: 100%;"
          class="min_table"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
        >
        <el-table-column type="selection" width="45"> </el-table-column>
          <el-table-column
            prop="order_id"
            label="订单编号"
            show-overflow-tooltip
            min-width="90"
          >
          <template slot-scope="scope">
              <div class="coursename" @click="orderDetail">
                2021-03-13
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="surname"
            label="学员姓名"
            min-width="90"
            show-overflow-tooltip
          >
           <template slot-scope="scope">
              <div class="coursename" @click="coursDetail">
                yqq
              </div>
            </template>
          </el-table-column>
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

          <el-table-column label="操作" fixed="right" min-width="200">
            <template slot-scope="scope">
              <div style="display: flex; justify-content:center;">
                <el-button type="text" @click="dialogFormVisible = true">收款</el-button>
               
               
              </div>
            </template>
            
          </el-table-column>
        </el-table>

        <!-- 收款弹出框 -->
        <el-dialog title="收款" :visible.sync="dialogFormVisible">

          <!--订单信息-->
        <div>
          <el-row style="min-width:900px;margin-bottom:20px;">
            <el-col :lg="21" :sm="21" :xs="21" :md="21">
              <div class="order-header">
                <h3 style="height:20px;padding-left:5px;font-size:16px">订单信息</h3>
              </div>

              <el-form
                :model="ruleForm"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
                label-position="left"
              >
                <el-row class="detailLine">
                  <el-col :lg="8" :md="8" :sm="8" :xs="8">
                    <el-form-item label="订单编号：" prop="order_id">
                      <div class="ruleWord">{{ ruleForm.order_id }}</div>
                    </el-form-item>
                  </el-col>
                  <el-col :lg="8" :md="8" :sm="8" :xs="8">
                    <el-form-item label="订单时间：" prop="verify_time">
                      <div class="ruleWord">{{ ruleForm.verify_time }}</div>
                    </el-form-item>
                  </el-col>
                  <el-col :lg="8" :md="8" :sm="8" :xs="8">
                    <el-form-item label="收费学生：" prop="surname">
                      <div class="ruleWord">{{ ruleForm.surname }}</div>
                    </el-form-item>
                  </el-col>

                  <el-col :lg="8" :md="8" :sm="8" :xs="8">
                    <el-form-item label="应收金额：" prop="order_money">
                      <div class="ruleWord">{{ ruleForm.order_money }}</div>
                    </el-form-item>
                  </el-col>

                  <el-col :lg="8" :md="8" :sm="8" :xs="8">
                    <el-form-item label="已付金额：" prop="pay_money">
                      <div class="ruleWord">{{ ruleForm.pay_money }}</div>
                    </el-form-item>
                  </el-col>
                  <el-col :lg="8" :md="8" :sm="8" :xs="8">
                    <el-form-item label="欠费金额：" prop="reduction">
                      <div class="ruleWord">{{ ruleForm.reduction }}</div>
                    </el-form-item>
                  </el-col>
                
                </el-row>
              </el-form>
            </el-col>
            <el-col :lg="3" :sm="3" :xs="3" :md="3">
            </el-col>
          </el-row>
        </div>
        <div class="order-header">
                <h3 style="height:20px;padding-left:5px;">支付信息</h3>
              </div>
          
          <div class="formmoney">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" >

          <el-form-item label="支付方式" prop="cate_id" class="zffs">
              <el-select v-model="ruleForm.cate_id" placeholder="请选择支付方式">
                <el-option label="现金" value="xj"></el-option>
                <el-option label="微信" value="wx"></el-option>
                <el-option label="支付宝" value="zfn"></el-option>
                <el-option label="聚合收单" value="jhsd"></el-option>
              </el-select>
            </el-form-item>
 
          <el-form-item label="支付金额" prop="money" class="zfmoney">
              <el-input v-model="ruleForm.money" style="width:220px" placeholder="请输入支付金额"></el-input>
            </el-form-item>
        </el-form>
          </div>

        <div class="upmoney">
          <span style="padding-right:5px">上传收据</span> 
          <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          style=""
          >
          <i class="el-icon-plus"></i>
        </el-upload>
        <div style="padding-left:10px;color:#aaa;margin-top:40px"> 
        <p style="display:block">1. 支持jpg、jpeg、png、gif、bmp格式；</p>
        <p>2. 单文件大小不能超过5M，最多可上传5个文件</p>
        </div>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        </div>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>

      

      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'finance',

  data() {
    
    return {
      xmname:'',
      inputfl:'',
      startend:'',
      importVisible:false,
      handlePreview:'',
      dialogImageUrl:'',
      dialogVisible: false,
      rules:{
         money: [
            {type: 'date', required: true, message: '请填写支付金额',  trigger: 'change' }
          ],
          cate_id: [
            { required: true, message: '', trigger: 'change' }
          ],
      },
      schoolData: [
       {order_id:11,
       total:9999,
       surname:'yqq',
       }
      ],  
      panelData:{
        day:'',
        use_time:'',
        total_problem:'',
        accuracy:'',

      },   

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


        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
    }
  },
  created() {
    this.status = 1
  },
  // mounted() {
  //   this.$api.orderindex(this, 'schoolData')
  // },
  filters: {

  },
  methods: {
     handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
    coursDetail() {
      this.$router.push({
        path: '/fina/cusdetail',
      })
    },
    orderDetail() {
      this.$router.push({
        path: '/fina/orderDetail',
      })
    },
     statusSwitch(ab) {
       console.log(ab)
      this.isTagactive = ab.id
    },
      receiveStudent(zx) {
      console.log(zx)
      this.$api.receive(this, zx.intent_id)
    },
    // doPageChange(page) {
    //   this.page = page
    //   this.$api.orderindex(this, 'schoolData', this.datas)
    // },

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
/deep/.el-form-item__label{
  font-size: 14px;
}
/deep/.el-dialog__body{
  padding: 15px 30px;
}
/deep/.el-dialog__header{
  background: rgb(241, 241, 241);
}
/deep/.el-form-item{
  margin-bottom: 12px;

}
/deep/.el-upload--picture-card{
  width: 100px;
  height: 100px;
   line-height: 120px;
   margin-left: 18px;
}
/deep/.el-dialog__title{
  font-size: 16px;
}
/deep/.el-dialog{
  width: 45%;
}
.formmoney .zffs{
  width: 40%;
}
.formmoney .zfmoney{
  width: 40%;
}
.el-form{
  display: flex;
}
.upmoney{
  display: flex;
  align-items: center;
  margin-top: 20px;
}
.upmoney p{
  display: block;
  height: 30px;
}
.detailLine .el-form-item{
  width: 380px;
}

.tabg{
  color:#199fff!important;
  border-bottom:2px solid #199fff;
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
.coursename {
  color: #2798ee;
}
.order-header {
  display: flex;
  justify-content: space-between;
  border-left:4px solid #2798ee;
  margin-bottom: 10px;
}
</style>
