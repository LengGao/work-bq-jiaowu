<template>
  <section>
    <!--订单详情弹框-->
    <el-dialog
      title="订单详情"
      :visible.sync="openStatus"
      v-if="openStatus"
      :close-on-click-modal="false"
      @close="doClose"
      append-to-body
      width="60%"
    >
      <!--订单信息-->
      <div>
        <h3>订单信息</h3>
        <el-row style="min-width: 1100px; margin-top: 30px">
          <el-col :lg="21" :sm="21" :xs="21" :md="21">
            <el-form
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
              label-position="left"
            >
              <el-row class="detailLine">
                <el-col :lg="8" :md="8" :sm="8" :xs="8">
                  <el-form-item label="订单编号" prop="order_no">
                    <div class="ruleWord">{{ schoolData.order_no }}</div>
                  </el-form-item>
                </el-col>
                <el-col :lg="8" :md="8" :sm="8" :xs="8">
                  <el-form-item label="订单时间" prop="create_time">
                    <div class="ruleWord">{{ schoolData.create_time }}</div>
                  </el-form-item>
                </el-col>
                <el-col :lg="8" :md="8" :sm="8" :xs="8">
                  <el-form-item label="收费学生" prop="user_img">
                    <div class="ruleWord">
                      {{ schoolData.account ? schoolData.account.surname : "" }}
                    </div>
                  </el-form-item>
                </el-col>

                <el-col :lg="8" :md="8" :sm="8" :xs="8">
                  <el-form-item label="订单总价" prop="order_money">
                    <div class="ruleWord">
                      ￥{{
                        schoolData.order_money ? schoolData.order_money : 0
                      }}
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :lg="8" :md="8" :sm="8" :xs="8">
                  <el-form-item label="优惠 小计" prop="reduction">
                    <div class="ruleWord">
                      ￥{{ schoolData.reduction ? schoolData.reduction : 0 }}
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :lg="8" :md="8" :sm="8" :xs="8">
                  <el-form-item label="应收金额" prop="pay_money">
                    <div class="ruleWord">
                      ￥
                      {{
                        schoolData.order_money - schoolData.reduction
                          ? schoolData.order_money - schoolData.reduction
                          : 0
                      }}
                    </div>
                  </el-form-item>
                </el-col>

                <el-col :lg="8" :md="8" :sm="8" :xs="8">
                  <el-form-item label="已付金额" prop="identity_card">
                    <div class="ruleWord">
                      ￥{{ schoolData.pay_money ? schoolData.pay_money : 0 }}
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :lg="8" :md="8" :sm="8" :xs="8">
                  <el-form-item label="欠费金额" prop="name">
                    <div class="ruleWord">
                      ￥{{
                        schoolData.overdue_money ? schoolData.overdue_money : 0
                      }}
                    </div>
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
                <el-col
                  :lg="8"
                  :md="8"
                  :sm="8"
                  :xs="8"
                  v-if="schoolData.overdue_money"
                >
                  <el-form-item label="补缴时间" prop="name">
                    <div class="ruleWord">{{ schoolData.supplement_time }}</div>
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
                      {{ schoolData.pay_type }}
                      <!-- {{ ruleForm.type == 1 ? '已成交' : '未成交' }} -->
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-form-item label="订单备注" prop="type">
                  <div class="ruleWord">
                    {{ schoolData.tips }}
                    <!-- {{ ruleForm.type == 1 ? '已成交' : '未成交' }} -->
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
        <h3 style="margin-bottom: 15px">订单详情</h3>
        <el-table
          ref="multipleTable"
          :data="projectData"
          tooltip-effect="light"
          stripe
          style="width: 100%"
          class="min_table"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column
            prop="project_name"
            label="项目名称"
            show-overflow-tooltip
            min-width="90"
          ></el-table-column>
          <el-table-column
            prop="project_price"
            label="价格"
            show-overflow-tooltip
            min-width="90"
          >
            <template slot-scope="{ row }">
              <div>￥{{ row.project_price }}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="优惠金额"
            show-overflow-tooltip
            min-width="90"
          >
            <template slot-scope="{ row }">
              <div>￥{{ row.save_price }}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="应收金额"
            show-overflow-tooltip
            min-width="90"
          >
            <template slot-scope="{ row }">
              <div>￥{{ row.pay_price }}</div>
            </template>
          </el-table-column>
        </el-table>
        <div class="orderDetail_bottm">
          <div class="orderDetail_content">
            <div>
              订单总价:
              <span
                >￥{{
                  schoolData.order_money ? schoolData.order_money : 0
                }}</span
              >
            </div>
            <div>
              优惠总额:
              <span
                >￥{{ schoolData.reduction ? schoolData.reduction : 0 }}</span
              >
            </div>
            <div>
              订单应收:
              <span style="color: #199fff"
                >￥{{
                  schoolData.order_money - schoolData.reduction
                    ? schoolData.order_money - schoolData.reduction
                    : 0
                }}</span
              >
            </div>
          </div>
        </div>
      </div>
      <!--缴费记录-->
      <div style="margin-top: 20px">
        <h3 style="margin-bottom: 15px">缴费记录</h3>
        <el-table
          ref="multipleTable"
          :data="pay_log"
          tooltip-effect="light"
          stripe
          style="width: 100%"
          class="min_table"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column
            prop="create_time"
            label="支付时间"
            show-overflow-tooltip
            min-width="90"
          ></el-table-column>
          <el-table-column
            prop="pay_type"
            label="支付方式"
            show-overflow-tooltip
            min-width="90"
          ></el-table-column>
          <el-table-column
            label="支付金额"
            show-overflow-tooltip
            min-width="90"
          >
            <template slot-scope="{ row }">
              <div>￥{{ row.pay_money }}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="pay_status"
            label="状态"
            show-overflow-tooltip
            min-width="90"
          >
            <template slot-scope="scope">
              {{ scope.row.pay_status | payStatusSwich }}
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--经办信息-->
      <div style="margin-top: 20px">
        <h3 style="margin-bottom: 15px">经办信息</h3>
        <el-table
          ref="multipleTable"
          :data="pay_log"
          tooltip-effect="light"
          stripe
          style="width: 100%"
          class="min_table"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column
            prop="admin_name"
            label="操作人"
            show-overflow-tooltip
            min-width="90"
          ></el-table-column>
          <el-table-column
            prop="verify_name"
            label="确认人"
            show-overflow-tooltip
            min-width="90"
          ></el-table-column>
          <el-table-column
            label="操作类型"
            show-overflow-tooltip
            min-width="90"
          >
            <template slot-scope="scope">
              {{ scope.row.pay_status | payStatusSwich }}
            </template></el-table-column
          >
          <el-table-column
            prop="create_time"
            label=" 操作时间"
            show-overflow-tooltip
            min-width="90"
          ></el-table-column>
          <el-table-column
            prop="tips"
            label="备注信息"
            show-overflow-tooltip
            min-width="90"
          ></el-table-column>
        </el-table>
      </div>
      <!--关闭-->
      <div
        class="customer_colse"
        style="display: flex; justify-content: center; margin-top: 20px"
      >
        <el-button type="primary" @click="toCustomerDetail">关 闭</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
export default {
  props: {
    orderVisible: {
      type: Boolean,
      default: false,
    },
    orderInfo: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      projectData: [],
      pay_log: [],
      openStatus: this.orderVisible,
      ruleForm: {},
      schoolData: {},
    };
  },
  watch: {
    orderVisible(val) {
      this.openStatus = val;
    },
    orderInfo() {
      this.$api.getOrderDetail(this, "schoolData");
    },
  },
  filters: {
    payStatusSwich(val) {
      switch (val) {
        case 0:
          return "待验证/等待付款";
          break;
        case 1:
          return "新订单/待入账/已付款";
          break;
        case 2:
          return "部分入账 ";
          break;
        case 3:
          return "已入账 ";
          break;
        case 4:
          return "已作废";
          break;
        case 5:
          return "已退款";
          break;
      }
    },
  },
  created() {},
  methods: {
    toCustomerDetail() {
      this.doClose();
      // this.$router.push({
      //   name: "cusdetail",
      //   query: {
      //     uid: this.schoolData.uid,
      //   },
      // });
    },
    doClose() {
      this.projectData = [];
      this.pay_log = [];
      this.ruleForm = {};
      this.$emit("orderDialog", false);
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/.el-table__header th,
.el-table__header tr {
  background-color: #f8f8f8;
  color: #909399;
}

.orderDetail_bottm {
  margin-top: 20px;
  font-size: 14px;
  color: #909399;
  font-family: "Arial Normal", "Arial", sans-serif;
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
</style>
