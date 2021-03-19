<template>
  <section class="mainwrap">
    <!-- <el-dialog title="订单详情" :visible.sync="orderVisible" width="60%"> -->
    <!--订单信息-->
    <div>
      <el-row style="min-width:900px;margin-bottom:20px;">
        <el-col :lg="21" :sm="21" :xs="21" :md="21">
          <div class="order-header">
            <h3 style="height:21px;margin-top:4px">订单信息</h3>
            <el-button type="primary">待入账</el-button>
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
                <el-form-item label="订单编号" prop="order_no">
                  <div class="ruleWord">{{ ruleForm.order_no }}</div>
                </el-form-item>
              </el-col>
              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="订单时间" prop="verify_time">
                  <div class="ruleWord">{{ ruleForm.verify_time }}</div>
                </el-form-item>
              </el-col>
              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="收费学生" prop="surname">
                  <div class="ruleWord">{{ ruleForm.account.surname }}</div>
                </el-form-item>
              </el-col>

              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="订单总价" prop="order_money">
                  <div class="ruleWord">{{ ruleForm.order_money }}</div>
                </el-form-item>
              </el-col> 
              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="优惠 小计" prop="reduction">
                  <div class="ruleWord">{{ ruleForm.reduction }}</div>
                </el-form-item>
              </el-col>
              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="应收金额" prop="order_money">
                  <div class="ruleWord">{{ ruleForm.order_money }}</div>
                </el-form-item>
              </el-col>

              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="已付金额" prop="pay_money">
                  <div class="ruleWord">{{ ruleForm.pay_money }}</div>
                </el-form-item>
              </el-col>
              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="欠费金额" prop="reduction">
                  <div class="ruleWord">{{ ruleForm.reduction }}</div>
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
              <el-button type="primary" @click="dialogVisible = true">入账</el-button>              
            </el-row>
          </el-form>
        </el-col>

         <el-dialog
              title="提示"
              :visible.sync="dialogVisible"
              width="25%"
              >
              <span style="font-size:20px;">是否将此笔订单入账？</span>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
              </span>
            </el-dialog>

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
          prop="pay_money"
          label="价格"
          show-overflow-tooltip
          min-width="90"
        ></el-table-column>
        <el-table-column
          prop="reduction"
          label="优惠金额"
          show-overflow-tooltip
          min-width="90"
        ></el-table-column>
        <el-table-column
          prop="pay_money"
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
          prop="supplement_time"
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
          prop="pay_money"
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
          prop="uiddd"
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
      dialogVisible: false,
      ruleForm: {
          order_no:'',
          verify_time:'',
          surname:'',
          order_money:'',
          reduction:'',
          pay_money:'',
          reduction:'',
          account:{}
        },
      schoolData: [
        {supplement_time:'',
          pay_type:'',
          pay_money:'',
          yingshou:'',
          uid:'',
        }
      ],
    }
  },
  mounted() {
    // let status = 3
    this.$api.orderdetail(this, 'schoolData')
  },

    methods: {
    orderdetail(page) {
      this.page = page
      this.$api.orderdetail(this, 'schoolData', this.datas)
    },

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
/deep/.el-form-item{
  margin-bottom:10px;
}
/deep/.app-main{
  width: 80%;
}
.mainwrap{
  width: 80%;
} 
.orderDetail_bottm {
  margin-top: 10px;
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
