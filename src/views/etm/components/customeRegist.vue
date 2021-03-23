<template>
  <section>
    <el-dialog
      title="添加客户"
      :visible.sync="openStatus"
      @close="doClose"
      append-to-body
      width="70%"
      style="min-width:1070px"
    >
      <el-form
        label-width="90px"
        class="demo-ruleForm"
        :show-message="true"
        label-position="left"
      >
        <div class="customer_sum_up">
          <h3>客户信息</h3>
          <el-row class="wrap">
            <el-col :sm="8">
              <el-form-item label="客户姓名">
                <el-input
                  class="input-width"
                  disabled
                  v-model="ruleForm.surname"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <el-form-item label="手机号码">
                <el-input
                  disabled
                  class="input-width"
                  v-model="ruleForm.mobile"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <el-form-item label="身份证号">
                <el-input
                  class="input-width"
                  disabled
                  v-model="ruleForm.id_card_number"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
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
                <el-table
                  ref="multipleTable"
                  :data="projectData"
                  style="width: 100%"
                  class="min_table"
                  :header-cell-style="{ 'text-align': 'center' }"
                  :cell-style="{ 'text-align': 'center' }"
                >
                  <el-table-column
                    label="项目名称"
                    show-overflow-tooltip
                    min-width="90"
                    prop="project_name"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="project_price"
                    label="项目价格"
                    min-width="110"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    prop="lower_price"
                    label="最低价格"
                    min-width="150"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    prop="save_price"
                    label="优惠金额"
                    min-width="150"
                    show-overflow-tooltip
                  >
                    <template slot-scope="scope">
                      <el-col :span="12">
                        <el-input
                          v-model="scope.row.save_price"
                          placeholder
                          size="small"
                          @blur="
                            changeAmount(
                              scope.$index,
                              scope.row.save_price,
                              projectData
                            )
                          "
                        ></el-input>
                      </el-col>
                    </template>
                    <!-- <template slot-scope="scope">
                    <el-input
                      @change="changeAmount"
                      style="width:70px"
                      v-model="scope.row.save_price"
                    ></el-input>
                  </template> -->
                  </el-table-column>

                  <el-table-column
                    prop="pay_price"
                    label="应收金额"
                    min-width="150"
                    show-overflow-tooltip
                  ></el-table-column>

                  <el-table-column label="操作" fixed="right" min-width="200">
                    <template slot-scope="scope">
                      <div style="display:flex;justify-content:center">
                        <el-button
                          type="danger"
                          icon="el-icon-delete"
                          circle
                          plain
                          @click="delbtn(scope.$index, projectData)"
                        ></el-button>
                        <!-- <el-button
                    type="text"
                    style="padding-left:40px"
                    @click="delbtn(scope.row)"
                    >删除</el-button
                  > -->
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
            </el-col>
          </el-row>
        </div>
        <div class="customer_sum_up">
          <h3>费用小结</h3>
          <div>
            <el-row>
              <el-col :sm="4">
                <div class="expense_summary_label">
                  订单总价<span>￥{{ ruleForm.order_money }}</span>
                </div>
              </el-col>
              <el-col :sm="4">
                <div class="expense_summary_label">
                  优惠总额<span>￥{{ ruleForm.reduction }}</span>
                </div>
              </el-col>
              <el-col :sm="4">
                <div class="expense_summary_label">
                  应收金额<span style="color: #fd6500"
                    >￥{{ receivableMoney }}</span
                  >
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="customer_sum_up">
          <h3>支付信息</h3>
          <el-row class="wrap">
            <el-col :sm="8">
              <el-form-item label="支付方式">
                <el-select v-model="ruleForm.pay_type" placeholder="请选择">
                  <el-option
                    v-for="item in payWays"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <!-- <el-input class="input-width" v-model="ruleForm.name"></el-input> -->
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <el-form-item label="支付金额">
                <el-input
                  class="input-width"
                  type="number"
                  v-model="ruleForm.pay_money"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <el-form-item label="上传收据">
                <el-upload></el-upload>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="customer_sum_up">
          <h3>备注信息</h3>
          <el-row class="wrap">
            <el-col :sm="8" style="display:flex;margin-top:10px">
              <div class="expense_summary_label" style="margin-left:20px">
                实缴金额
                <span style="color: #fd6500">￥{{ ruleForm.pay_money }}</span>
              </div>
              <div class="expense_summary_label">
                欠费金额<span
                  >￥{{ receivableMoney - ruleForm.pay_money }}</span
                >
              </div>
            </el-col>

            <el-col :sm="8">
              <el-form-item label="补缴时间">
                <el-date-picker
                  v-model="ruleForm.birthday"
                  type="date"
                  format="yyyy-MM-dd "
                  value-format="yyyy-MM-dd "
                  class="input-width"
                  placeholder="选择日期"
                  :disabled="receivableMoney <= ruleForm.pay_money"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <el-row>
          <el-form-item>
            <div style="display:flex;justify-content:flex-end">
              <el-button>取消</el-button>
              <el-button type="primary" @click="orderDeatilShow"
                >报名缴费</el-button
              >
            </div>
          </el-form-item>
        </el-row>
      </el-form>
    </el-dialog>
    <orderDialog
      :orderVisible="orderVisible"
      v-on:orderDialog="getorderStatus($event)"
    ></orderDialog>
  </section>
</template>

<script>
import orderDialog from './orderDialog'
export default {
  components: {
    orderDialog,
  },
  props: {
    addVisible: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      openStatus: this.addVisible,
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
      ],
      ruleForm: {
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
      projectData: [],
      page: 1,
    }
  },

  created() {
    // this.customerInfo = JSON.parse(this.$route.query)
    let query = this.$route.query
    let customerInfo = JSON.parse(query.param)
    console.log(customerInfo)
    this.ruleForm.id_card_number = customerInfo.id_card_number
    this.ruleForm.mobile = customerInfo.mobile
    this.ruleForm.surname = customerInfo.surname
    this.ruleForm.todo_id = customerInfo.todo_id
    this.ruleForm.uid = customerInfo.uid
    this.ruleForm.aid = customerInfo.id
  },

  watch: {
    addVisible(val) {
      this.openStatus = val
    },
    projectData(newVal, oldVal) {
      // if (this.projectData.length > 1) {
      var order_money = 0 //订单总价
      var reduction = 0 //优惠总额
      var receivableMoney = 0 //应收金额
      this.projectData.forEach((i) => {
        order_money = order_money + i.project_price
        reduction = reduction + i.save_price
        receivableMoney = receivableMoney + i.pay_price
      })
      this.ruleForm.order_money = order_money
      this.ruleForm.reduction = reduction
      this.receivableMoney = receivableMoney

      console.log(order_money, reduction, receivableMoney)
    },
    // },
  },
  methods: {
    getorderStatus(status) {
      this.orderVisible = status
    },
    doClose() {
      this.$emit('addDialog', false)
    },
    changeAmount(av, ab) {
      this.projectData[av].save_price = parseFloat(ab)
      this.projectData[av].pay_price =
        parseFloat(this.projectData[av].project_price) -
        parseFloat(this.projectData[av].save_price)

      var order_money = 0 //订单总价
      var reduction = 0 //优惠总额
      var receivableMoney = 0 //应收金额
      this.projectData.forEach((i) => {
        order_money = order_money + i.project_price
        receivableMoney = receivableMoney + i.pay_price
        reduction = reduction + parseFloat(i.save_price)
      })
      this.ruleForm.order_money = order_money
      this.ruleForm.reduction = reduction
      this.receivableMoney = receivableMoney
    },
    choseProject() {
      let obj = {
        id: 4,
        project_name: '北区教育系统集成专用教',
        project_price: 20,
        lower_price: 20,
        save_price: 0,
        pay_price: 20,
      }
      this.projectData.push(obj)
    },
    //跳转到客户详情页面

    delbtn(index, rows) {
      rows.splice(index, 1)
    },
    orderDeatilShow() {
      this.orderVisible = true
      // this.overdue_money = this.receivableMoney - this.ruleForm.pay_money
      // this.ruleForm.order_token = Math.floor(Math.random() * 1000000 + 1) + ''
      // this.ruleForm.project = JSON.stringify(this.projectData)
      // console.log(this.ruleForm)
      // this.$api.createOrder(this, this.ruleForm)
    },
  },
}
</script>

<style lang="scss" scoped>
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
  margin: 30px 0;
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
</style>
