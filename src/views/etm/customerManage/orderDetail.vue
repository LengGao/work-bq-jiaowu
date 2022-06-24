<template>
  <section class="mainwrap">
    <!-- <el-dialog title="订单详情" :visible.sync="orderVisible" width="60%"> -->
    <!--订单信息-->
    <div>
      <el-row style="min-width:1100px;margin-top:30px">
        <el-col :lg="21" :sm="21" :xs="21" :md="21">
          <div class="order-header">
            <h3 style="height:21px;margin-top:4px">订单信息</h3>
            <el-button>待付款</el-button>
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
            <el-row>
              <el-button>收 款</el-button>
              <el-button>退 费</el-button>
              <el-button>作 废</el-button>
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
      <h3 style="margin:15px 0">订单详情</h3>
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
    <!-- <div
      class="customer_colse"
      style="display:flex;justify-content:center;margin-top:20px"
    >
      <el-button type="primary" @click="toCustomerDetail">关 闭</el-button>
    </div> -->
    <!-- </el-dialog> -->
  </section>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {},
      schoolData: [],
    }
  },
}
</script>

<style lang="scss" scoped>
/deep/.el-table__header th,
.el-table__header tr {
  background-color: #f8f8f8;
  color: #909399;
}
/deep/.el-button {
  padding: 9px 25px;
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
.order-header {
  display: flex;
  justify-content: space-between;
}
h3 {
  color: #333333;
  font-family: 'Arial Normal', 'Arial', sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  padding-left: 4px;
  border-left: 4px solid #199fff;
}
</style>
