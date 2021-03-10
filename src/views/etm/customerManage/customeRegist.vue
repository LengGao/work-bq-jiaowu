<template>
  <section class="main">
    <el-form
      label-width="90px"
      class="demo-ruleForm"
      :show-message="true"
      label-position="left"
    >
      <div class="customer_sum_up">
        <h3>客户信息</h3>
        <el-row class="wrap">
          <el-col :sm="6">
            <el-form-item label="客户姓名">
              <el-input
                class="input-width"
                disabled
                v-model="ruleForm.surname"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="6">
            <el-form-item label="手机号码">
              <el-input
                disabled
                class="input-width"
                v-model="ruleForm.mobile"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="6">
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
          <el-col :sm="18">
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
        <div class="expense_summary">
          <div class="expense_summary_label">
            订单总价<span>￥{{ ruleForm.order_money }}</span>
          </div>
          <div class="expense_summary_label">
            优惠总额<span>￥{{ ruleForm.reduction }}</span>
          </div>
          <div class="expense_summary_label">
            应收金额<span style="color: #fd6500">￥{{ receivableMoney }}</span>
          </div>
        </div>
      </div>
      <div class="customer_sum_up">
        <h3>支付信息</h3>
        <el-row class="wrap">
          <el-col :sm="6">
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
          <el-col :sm="6">
            <el-form-item label="支付金额">
              <el-input
                class="input-width"
                type="number"
                v-model="ruleForm.pay_money"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="6">
            <!-- <el-form-item label="活动名称">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item> -->
          </el-col>
        </el-row>
      </div>
      <div class="customer_sum_up">
        <h3>备注信息</h3>
        <el-row class="wrap">
          <el-col :sm="6" style="display:flex;margin-top:10px">
            <div class="expense_summary_label" style="margin-left:20px">
              实缴金额
              <span style="color: #fd6500">￥{{ ruleForm.pay_money }}</span>
            </div>
            <div class="expense_summary_label">
              欠费金额<span>￥{{ receivableMoney - ruleForm.pay_money }}</span>
            </div>
          </el-col>

          <el-col :sm="6">
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
      <el-row style="dispay:flex;justify-content:flex-end">
        <el-form-item>
          <el-button>取消</el-button>
          <el-button type="primary" @click="orderDeatilShow"
            >报名缴费</el-button
          >
        </el-form-item>
      </el-row>
    </el-form>
    <!--订单详情弹框-->
    <el-dialog title="订单详情" :visible.sync="orderVisible" width="60%">
      <!--订单信息-->
      <div>
        <h3>订单信息</h3>
        <el-row style="min-width:1100px;margin-top:30px">
          <el-col :lg="21" :sm="21" :xs="21" :md="21">
            <el-form
              :model="ruleForm"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
              label-position="left"
            >
              <el-row class="detailLine">
                <el-col :lg="8" :md="8" :sm="8" :xs="8">
                  <el-form-item label="订单编号" prop="uid">
                    <div class="ruleWord">{{ ruleForm.uid }}</div>
                  </el-form-item>
                </el-col>
                <el-col :lg="8" :md="8" :sm="8" :xs="8">
                  <el-form-item label="订单时间" prop="create_time">
                    <div class="ruleWord">{{ ruleForm.create_time }}</div>
                  </el-form-item>
                </el-col>
                <el-col :lg="8" :md="8" :sm="8" :xs="8">
                  <el-form-item label="收费学生" prop="user_img">
                    <div class="ruleWord">{{ ruleForm.create_time }}</div>
                  </el-form-item>
                </el-col>

                <el-col :lg="8" :md="8" :sm="8" :xs="8">
                  <el-form-item label="订单总价" prop="user_nicename">
                    <div class="ruleWord">{{ ruleForm.user_nicename }}</div>
                  </el-form-item>
                </el-col>
                <el-col :lg="8" :md="8" :sm="8" :xs="8">
                  <el-form-item label="优惠 小计" prop="realname">
                    <div class="ruleWord">{{ ruleForm.realname }}</div>
                  </el-form-item>
                </el-col>
                <el-col :lg="8" :md="8" :sm="8" :xs="8">
                  <el-form-item label="应收金额" prop="mobile">
                    <div class="ruleWord">{{ ruleForm.mobile }}</div>
                  </el-form-item>
                </el-col>

                <el-col :lg="8" :md="8" :sm="8" :xs="8">
                  <el-form-item label="已付金额" prop="identity_card">
                    <div class="ruleWord">{{ ruleForm.identity_card }}</div>
                  </el-form-item>
                </el-col>
                <el-col :lg="8" :md="8" :sm="8" :xs="8">
                  <el-form-item label="欠费金额" prop="name">
                    <div class="ruleWord">{{ ruleForm.identity_card }}</div>
                    <!-- <div class="ruleWord">
                      {{
                        ruleForm.sex == 1
                          ? '男'
                          : ruleForm.sex == 2
                          ? '女'
                          : '未知'
                      }}
                    </div> -->
                  </el-form-item>
                </el-col>
                <el-col :lg="8" :md="8" :sm="8" :xs="8">
                  <el-form-item label="订单来源" prop="type">
                    <div class="ruleWord">
                      {{ ruleForm.type == 1 ? '已成交' : '未成交' }}
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-form-item label="订单备注" prop="type">
                  <div class="ruleWord">
                    {{ ruleForm.type == 1 ? '已成交' : '未成交' }}
                  </div>
                </el-form-item>
              </el-row>
            </el-form>
          </el-col>

          <el-col :lg="3" :sm="3" :xs="3" :md="3">
            <!-- <el-button type="primary" @click="toStudyReport"
            >生成学习报告</el-button
          >
          <el-button type="primary" style="margin-top:10px">导出数据</el-button> -->
          </el-col>
        </el-row>
      </div>
      <!--订单详情-->
      <div>
        <h3 style="margin-bottom:15px">订单详情</h3>
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
            label="项目名称"
            show-overflow-tooltip
            min-width="90"
          ></el-table-column>
          <el-table-column
            prop="uid"
            label="价格"
            show-overflow-tooltip
            min-width="90"
          ></el-table-column>
          <el-table-column
            prop="uid"
            label="优惠金额"
            show-overflow-tooltip
            min-width="90"
          ></el-table-column>
          <el-table-column
            prop="uid"
            label="应收金额"
            show-overflow-tooltip
            min-width="90"
          ></el-table-column>
        </el-table>
        <div class="orderDetail_bottm">
          <div class="orderDetail_content">
            <div>订单总价: <span>3244.00</span></div>
            <div>优惠总额: <span>3244.00</span></div>
            <div>订单应收: <span style="color:#199fff">3244.00</span></div>
          </div>
        </div>
      </div>
      <!--缴费记录-->
      <div style="margin-top:20px">
        <h3 style="margin-bottom:15px">缴费记录</h3>
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
            label="支付时间"
            show-overflow-tooltip
            min-width="90"
          ></el-table-column>
          <el-table-column
            prop="uid"
            label="支付方式"
            show-overflow-tooltip
            min-width="90"
          ></el-table-column>
          <el-table-column
            prop="uid"
            label="支付金额"
            show-overflow-tooltip
            min-width="90"
          ></el-table-column>
          <el-table-column
            prop="uid"
            label="状态"
            show-overflow-tooltip
            min-width="90"
          ></el-table-column>
        </el-table>
      </div>
      <!--经办信息-->
      <div style="margin-top:20px">
        <h3 style="margin-bottom:15px">经办信息</h3>
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
            label="操作人"
            show-overflow-tooltip
            min-width="90"
          ></el-table-column>
          <el-table-column
            prop="uid"
            label="操作类型"
            show-overflow-tooltip
            min-width="90"
          ></el-table-column>
          <el-table-column
            prop="uid"
            label=" 操作时间"
            show-overflow-tooltip
            min-width="90"
          ></el-table-column>
          <el-table-column
            prop="uid"
            label="备注信息"
            show-overflow-tooltip
            min-width="90"
          ></el-table-column>
        </el-table>
      </div>
      <!--关闭-->
      <div
        class="customer_colse"
        style="display:flex;justify-content:center;margin-top:20px"
      >
        <el-button type="primary" @click="toCustomerDetail">关 闭</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
export default {
  data() {
    return {
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
    toCustomerDetail() {
      this.$router.push({
        path: '/etm/customeDetail',
      })
    },
    delbtn(index, rows) {
      rows.splice(index, 1)
    },
    orderDeatilShow() {
      this.ruleForm.order_token = Math.floor(Math.random() * 1000000 + 1) + ''
      this.ruleForm.project = JSON.stringify(this.projectData)
      console.log(this.ruleForm)
      this.$api.createOrder(this, this.ruleForm)
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
.orderDetail_bottm {
  margin-top: 20px;
  font-size: 14px;
  color: #909399;
  font-family: 'Arial Normal', 'Arial', sans-serif;
  font-weight: 400;
  font-style: normal;
  display: flex;
  line-height: 30px;
  justify-content: flex-end;
  .orderDetail_content {
    padding-right: 80px;
    span {
      padding-left: 60px;
    }
  }
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
