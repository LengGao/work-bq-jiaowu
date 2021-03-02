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
        <el-row>
          <el-col :sm="6">
            <el-form-item label="客户姓名">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="6">
            <el-form-item label="手机号码">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="6">
            <el-form-item label="身份证号">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="customer_sum_up">
        <h3>报名项目</h3>
        <!--表格-->
        <div class="userTable">
          <el-table
            ref="multipleTable"
            :data="schoolData.list"
            style="width: 100%"
            class="min_table"
            :header-cell-style="{ 'text-align': 'center' }"
            :cell-style="{ 'text-align': 'center' }"
          >
            <el-table-column
              label="项目名称"
              show-overflow-tooltip
              min-width="90"
              prop="index_category_id"
            >
            </el-table-column>
            <el-table-column
              prop="index_category_name"
              label="项目价格"
              min-width="110"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="mobile"
              label="最低价格"
              min-width="150"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="mobile"
              label="优惠金额"
              min-width="150"
              show-overflow-tooltip
            ></el-table-column>

            <el-table-column
              prop="mobile"
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
                    @click="delbtn(scope.row)"
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
      </div>
      <div class="customer_sum_up">
        <h3>费用小结</h3>
        <div class="expense_summary">
          <div class="expense_summary_label">优惠总价<span>￥135000</span></div>
          <div class="expense_summary_label">订单总价<span>￥135000</span></div>
          <div class="expense_summary_label">
            订单总价<span style="color: #fd6500">￥135000</span>
          </div>
        </div>
      </div>
      <div class="customer_sum_up">
        <h3>支付信息</h3>
        <el-row>
          <el-col :sm="6">
            <el-form-item label="支付方式">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="6">
            <el-form-item label="支付金額">
              <el-input v-model="ruleForm.name"></el-input>
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
        <el-row>
          <el-col :sm="6">
            <div class="expense_summary_label">
              <span>￥135000</span>
            </div>
          </el-col>
          <el-col :sm="6">
            <div class="expense_summary_label">
              订单总价<span>￥135000</span>
            </div>
          </el-col>
          <el-col :sm="6">
            <el-form-item label="活动名称">
              <el-input v-model="ruleForm.name"></el-input>
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
      ruleForm: {},
      orderVisible: false,
      schoolData: [],
      page: 1,
    }
  },
  methods: {
    //跳转到客户详情页面
    toCustomerDetail() {
      this.$router.push({
        path: '/etm/customeDetail',
      })
    },
    delbtn() {},
    orderDeatilShow() {
      this.orderVisible = true
    },
  },
}
</script>

<style lang="scss" scoped>
/deep/.el-input__inner {
  width: 240px;
}
/deep/.el-table__header th,
.el-table__header tr {
  background-color: #f8f8f8;
  color: #909399;
}
.main {
  padding: 20px;
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
  padding-right: 50px;
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
</style>
