<template>
  <section>
    <el-dialog title="客户报名" :visible.sync="openStatus" @close="doClose" :close-on-click-modal="false" append-to-body width="60%" class="add-teaching-material" style="min-width: 1070px;">
      <el-form label-width="90px" class="demo-ruleForm" :show-message="true" label-position="left">
        <div class="customer_sum_up">
          <h3>客户信息</h3>
          <div class="coustomer_Detail">
            <el-form-item label="客户姓名">
              <el-input class="input-width" disabled v-model="userInfo.surname"></el-input>
            </el-form-item>

            <el-form-item label="手机号码">
              <el-input disabled class="input-width" v-model="userInfo.mobile"></el-input>
            </el-form-item>
            <el-form-item label="开通网课">
              <el-radio-group v-model="ruleForm.online_course" style="width: 240px">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </div>
        <div class="customer_sum_up">
          <el-row>
            <el-col :sm="24">
              <div class="project-header">
                <h3>报名项目</h3>
                <p @click="choseProject">选择项目</p>
              </div>

              <!--表格-->
              <div class="userTable">
                <el-table ref="multipleTable" :data="projectData" style="width: 100%" class="min_table" :header-cell-style="{ 'text-align': 'center' }" :cell-style="{ 'text-align': 'center' }">
                  <el-table-column label="项目名称" show-overflow-tooltip min-width="90" prop="project_name">
                  </el-table-column>
                  <el-table-column prop="project_price" label="项目价格" min-width="110" show-overflow-tooltip>
                    <template slot-scope="{ row }">
                      <div>￥{{ row.project_price }}</div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="lowest_price" label="最低价格" min-width="150" show-overflow-tooltip>
                    <template slot-scope="{ row }">
                      <div>￥{{ row.lowest_price }}</div>
                    </template>
                  </el-table-column>
                  <el-table-column label="优惠金额" min-width="150" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <el-col :span="12">
                        <el-input v-model="scope.row.save_price" type="number" :controls="false" :min="0" :max="
                            parseFloat(scope.row.project_price) -
                            parseFloat(scope.row.lowest_price)
                          " size="small" @input="
                            changeAmount(
                              scope.$index,
                              scope.row.save_price,
                              projectData
                            )
                          "></el-input>
                      </el-col>
                    </template>
                  </el-table-column>

                  <el-table-column prop="pay_price" label="应收金额" min-width="150" show-overflow-tooltip>
                    <template slot-scope="{ row }">
                      <div>￥{{ row.pay_price }}</div>
                    </template>
                  </el-table-column>

                  <el-table-column label="操作" fixed="right" min-width="200">
                    <template slot-scope="scope">
                      <div style="display: flex; justify-content: center">
                        <el-button type="danger" icon="el-icon-delete" circle plain @click="delbtn(scope.$index, projectData)"></el-button>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="customer_sum_up" style="padding:10px 0 20px 0">
          <h3>费用小结</h3>
          <div>
            <el-row>
              <el-col :sm="4">
                <div class="expense_summary_label">
                  订单总价<span>￥{{
                      ruleForm.order_money ? ruleForm.order_money : ""
                    }}</span>
                </div>
              </el-col>
              <el-col :sm="4">
                <div class="expense_summary_label">
                  优惠总额<span>￥{{ ruleForm.reduction }}</span>
                </div>
              </el-col>
              <el-col :sm="4">
                <div class="expense_summary_label">
                  应收金额<span style="color: #fd6500">￥{{ receivableMoney ? receivableMoney : "" }}</span>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="customer_sum_up">
          <h3>支付信息</h3>
          <div class="coustomer_Detail">
            <el-form-item label="支付方式" style="margin-bottom:0">
              <el-select v-model="ruleForm.pay_type" placeholder="请选择支付方式">
                <el-option v-for="item in payWays" :key="item.value" :label="item.label" :value="item.label">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="支付金额" style="margin-bottom:0">
              <el-input class="input-width" type="number" v-model="ruleForm.pay_money"></el-input>
            </el-form-item>

            <el-form-item label="上传收据" class="receiptUpLoad" style="margin-bottom:0">
              <el-upload name="image" :headers="headers" :action="uploadImageUrl" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                <img v-if="imgSrc" :src="imgSrc" class="img" />
                <i v-else class="el-icon-plus upload-cover-icon"></i>
              </el-upload>
            </el-form-item>
          </div>
        </div>
        <div class="customer_sum_up">
          <h3>备注信息</h3>
          <el-row class="wrap">
            <el-col :sm="8" style="display: flex; margin-top: 10px">
              <div class="expense_summary_label" style="margin-left: 20px">
                实缴金额
                <span style="color: #fd6500">￥{{ ruleForm.pay_money }}</span>
              </div>
              <div class="expense_summary_label">
                欠费金额<span>￥{{
                    receivableMoney - ruleForm.pay_money
                      ? receivableMoney - ruleForm.pay_money
                      : 0
                  }}</span>
              </div>
            </el-col>

            <el-col :sm="8">
              <el-form-item label="补缴时间">
                <el-date-picker v-model="ruleForm.supplement_time" type="date" format="yyyy-MM-dd " value-format="yyyy-MM-dd " class="input-width" placeholder="选择日期" :disabled="receivableMoney <= ruleForm.pay_money">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <el-row>
          <el-form-item>
            <div style="display: flex; justify-content: flex-end">
              <el-button @click="doClose">取消</el-button>
              <el-button type="primary" @click="orderDeatilShow">报名缴费</el-button>
            </div>
          </el-form-item>
        </el-row>
      </el-form>
    </el-dialog>
    <orderDialog :orderVisible="orderVisible" :orderInfo="orderInfo" v-on:orderDialog="getorderStatus($event)"></orderDialog>
    <projectDialog :projectData="projectData" :projectVisible="projectVisible" @courseArr="getCourseArr" v-on:projectDialog="getprojectStatus($event)"></projectDialog>
  </section>
</template>

<script>
import orderDialog from './orderDialog'
import { uploadImageUrl } from '@/api/educational'
import projectDialog from './projectDialog'
import { parsePrice } from '@/utils/index'
// import parsePrice from '@/utils/index'
export default {
  components: {
    orderDialog,
    projectDialog,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    userInfo: {
      type: Object,
      default: {},
    },
  },

  data() {
    return {
      uploadImageUrl,
      orderInfo: {},
      headers: {
        token: this.$store.state.user.token,
      },
      openStatus: this.value,
      schoolData: [],
      payWays: [
        {
          value: 1,
          label: '现金',
        },
        {
          value: 2,
          label: '微信',
        },
        {
          value: 3,
          label: '支付宝',
        },
        {
          value: 4,
          label: '聚合收单',
        },
        {
          value: 5,
          label: '银行转账',
        },
        {
          value: 6,
          label: '收钱吧',
        },
      ],
      ruleForm: {
        online_course: '',
        order_token: 0,
        aid: '',
        uid: '',
        todo_id: '',
        pay_type: '',
        pay_money: '',
        order_money: 0,
        project: '',
        reduction: 0,
        overdue_money: 0,
        surname: '',
        mobile: '',
        id_card_number: '',
        receipt_file: '',
        supplement_time: '',
      },
      customerInfo: {},
      receivableMoney: 0,
      orderVisible: false,
      projectVisible: false,
      projectData: [],
      page: 1,
      imgSrc: '',
    }
  },

  created() {},
  mounted() {},

  watch: {
    value(val) {
      this.openStatus = val
    },
    projectData(newVal, oldVal) {
      var order_money = 0 //订单总价
      var reduction = 0 //优惠总额
      var receivableMoney = 0 //应收金额
      this.projectData.forEach((i) => {
        order_money = order_money + parseFloat(i.project_price)
        reduction = reduction + parseFloat(i.save_price ? i.save_price : 0)
        receivableMoney = receivableMoney + parseFloat(i.pay_price)
      })
      this.ruleForm.order_money = parsePrice(order_money)
      this.ruleForm.reduction = parsePrice(reduction)
      this.ruleForm.pay_money = this.receivableMoney = parsePrice(receivableMoney)

      console.log(order_money, reduction, receivableMoney)
    },
    // },
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imgSrc = res.data?.data?.url || ''
      this.ruleForm.receipt_file = this.imgSrc
    },
    beforeAvatarUpload(file) {
      const isImg = file.type.indexOf('image') !== -1
      const isLt20M = file.size / 1024 / 1024 < 20
      if (!isImg) {
        this.$message.error('请上传图片')
      }
      if (!isLt20M) {
        this.$message.error('上传图片大小不能超过 20MB!')
      }
      return isLt20M && isImg
    },
    getCourseArr(arr) {
      console.log(arr)
      arr.forEach((i) => {
        i.pay_price = i.project_price
        i.id = i.project_id
        i.lower_price = i.lowest_price
        i.save_price = 0
      })
      this.projectData = arr
    },
    getorderStatus(status) {
      this.orderVisible = status
      this.doClose()
    },
    getprojectStatus(status) {
      this.projectVisible = status
    },
    doClose() {
      for (var item in this.ruleForm) {
        this.ruleForm[item] = ''
      }
      this.projectData = []
      this.$emit('input', false)
    },
    changeAmount(av, ab) {
      this.projectData[av].save_price = parseFloat(ab)
      console.log(this.projectData[av].save_price)
      this.projectData[av].pay_price =
        parseFloat(this.projectData[av].project_price) - parseFloat(this.projectData[av].save_price)
      //应收金额小于最低金额
      if (this.projectData[av].pay_price < this.projectData[av].lowest_price) {
        this.$message.error('该项目优惠金额已超')
        this.projectData[av].save_price =
          this.projectData[av].project_price - this.projectData[av].lowest_price
        this.projectData[av].pay_price = this.projectData[av].lowest_price
      }
      var order_money = 0 //订单总价
      var reduction = 0 //优惠总额
      var receivableMoney = 0 //应收金额
      this.projectData.forEach((i) => {
        order_money = order_money + parseFloat(i.project_price)
        receivableMoney = receivableMoney + parseFloat(i.pay_price)
        reduction = reduction + parseFloat(i.save_price || 0)
      })
      console.log(reduction)
      this.ruleForm.order_money = order_money
      this.ruleForm.reduction = reduction
      this.ruleForm.pay_money = this.receivableMoney = receivableMoney
      console.log(order_money, reduction, receivableMoney)
      this.$forceUpdate()
    },
    choseProject() {
      this.projectVisible = true
    },
    //跳转到客户详情页面

    delbtn(index, rows) {
      rows.splice(index, 1)
    },
    orderDeatilShow() {
      // this.orderVisible = true
      this.ruleForm.overdue_money = this.receivableMoney - this.ruleForm.pay_money
      this.ruleForm.order_token = Math.floor(Math.random() * 1000000 + 1) + ''
      this.projectData.forEach((i) => {})
      this.ruleForm.project = JSON.stringify(this.projectData)
      // console.log(this.ruleForm)
      this.$api.createOrder(this, this.ruleForm)
    },
  },
}
</script>

<style lang="scss" scoped>
.receiptUpLoad {
  margin: 0;
  /deep/.el-upload {
    border: 1px dashed #d9d9d9 !important;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .upload-cover /deep/.el-upload:hover {
    border-color: #409eff;
  }
  .upload-cover-icon {
    font-size: 28px;
    color: hsl(215, 8%, 58%);
    width: 120px;
    height: 90px;
    line-height: 90px;
    text-align: center;
  }
  .img {
    padding: 5px;
    width: 130px;
    height: 130px;
    display: block;
  }
}

/deep/.el-button.is-circle {
  padding: 7px;
}
/deep/.el-input__inner {
  // width: 240px;
}
/deep/.el-table__header th,
.el-table__header tr {
  background-color: #f8f8f8;
  color: #909399;
}
.wrap {
  min-width: 1100px;
}
.main {
  padding: 20px;
}
.input-width {
  width: 240px;
}
h3 {
  color: #333333;
  font-size: 16px;
  padding-left: 4px;
  border-left: 4px solid #199fff;
  font-family: 'Arial Normal', 'Arial', sans-serif;
  font-weight: 400;
  font-style: normal;
}
.customer_sum_up {
  margin: 0 0 0 0;
  h3 {
    padding-left: 6px;
    font-family: 'Arial Normal', 'Arial', sans-serif;
    font-weight: 400;
    font-style: normal;
    margin-bottom: 20px;
    border-left: 4px solid #199fff;
  }
}
.expense_summary {
  margin: 30px 0 30px 20px;
  display: flex;
  font-size: 14px;
  color: #606266;
}
.expense_summary_label {
  width: 172px;
  font-size: 14px;
  color: #606266;
  span {
    padding-left: 5px;
  }
  // span:last-child {
  //   color: #fd6500;
  // }
}

.customer_colse {
  width: 100%;
  display: flex;
  justify-content: center;
}
.project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Arial Normal', 'Arial', sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  color: #199fff;
  cursor: pointer;
}
.coustomer_Detail {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
/deep/.el-dialog__body {
  padding: 20px 30px 0 30px;
}
</style>
