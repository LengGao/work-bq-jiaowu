<template>
  <section class="mainwrap">
    <!-- <el-dialog title="订单详情" :visible.sync="orderVisible" width="60%"> -->
    <!--订单信息-->
    <div>
      <el-row style="min-width: 900px; margin-bottom: 20px">
        <el-col :lg="21" :sm="21" :xs="21" :md="21">
          <div class="order-header">
            <h3 style="height: 21px; margin-top: 4px">订单信息</h3>
            <el-button type="primary" plain @click="dialogVisible = true"
              >待入账</el-button
            >
          </div>

          <el-form
            :model="ruleForm"
            ref="ruleForm"
            label-width="90px"
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
                <el-form-item label="订单状态" prop="pay_status">
                  <div class="ruleWord">
                    {{ ruleForm.pay_status == 3 ? "已入账" : "未入账" }}
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-form-item label="订单备注" prop="tips">
               
              </el-form-item>
            </el-row>
            <el-row>
              <!-- <el-button type="primary" @click="dialogVisible = true">入账</el-button>               -->
              <!-- <div style="display: flex; justify-content: left">
                <el-button
                  type="primary"
                  v-if="excludes(ruleForm, 0)"
                  @click="openOrderActions(ruleForm, 1)"
                  >收款</el-button
                >
                <el-button
                  type="danger"
                  plain
                  v-if="excludes(ruleForm, 5)"
                  @click="openOrderActions(ruleForm, 2)"
                  >退款</el-button
                >
                <el-button
                  type="danger"
                  plain
                  v-if="excludes(ruleForm, 4)"
                  @click="openOrderActions(ruleForm, 3)"
                  >作废</el-button
                >
              </div> -->
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
      <h3 style="margin: 15px 0">订单详情</h3>
      <el-table
        ref="multipleTable"
        :data="schoolData"
        tooltip-effect="light"
        stripe
        style="width: 100%"
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
          <div>
            订单总价: <span>{{ ruleForm.order_money }}</span>
          </div>
          <div>
            优惠总额: <span>{{ ruleForm.reduction }}</span>
          </div>
          <div>
            订单应收:
            <span style="color: #199fff">{{ ruleForm.order_money }}</span>
          </div>
        </div>
      </div>
    </div>
    <!--缴费记录-->
    <div style="margin-top: 20px">
      <h3 style="margin-bottom: 15px">缴费记录</h3>
      <el-table
        ref="multipleTable"
        :data="schoolData"
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
        <el-table-column label="操作" fixed="right" min-width="80">
          <template slot-scope="scope">
            <div>
              <el-button type="primary" plain @click="dialogVisible = true"
                >入账</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
   
    </div>
    <!--经办信息-->
    <div style="margin-top: 20px">
      <h3 style="margin-bottom: 15px">经办信息</h3>
      <el-table
        ref="multipleTable"
        :data="schoolData"
        tooltip-effect="light"
        stripe
        style="width: 100%"
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
import CollectionOrder from "../components/CollectionOrder";
export default {
  components: {
    CollectionOrder,
  },
  data() {
    return {
      statusMap: {
        0: "待付款",
        1: "已付款",
        2: "部分入账",
        3: "已入账",
        4: "已作废",
        5: "已退款",
      },
      dialogImageUrl:'',
      dialogFormVisible: false,
      refundFormVisible: false,
      voidFormVisible: false,
      dialogVisible: false,
      order_id: "",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      ruleForm: {
        order_no: "",
        verify_time: "",
        surname: "",
        order_money: "",
        reduction: "",
        pay_money: "",
        reduction: "",
        account: {},
      },
      schoolData: [
        {
          supplement_time: "",
          pay_type: "",
          pay_money: "",
          yingshou: "",
          uid: "",
        },
      ],

      rules: {
        pay_money: [
          { type: "date", required: true, message: "", trigger: "change" },
        ],
        pay_type: [{ required: true, message: "", trigger: "change" }],
        money: [
          {
            type: "date",
            required: true,
            message: "请填写支付金额",
            trigger: "change",
          },
        ],
        cate_id: [{ required: true, message: "", trigger: "change" }],
      },
      panelData: {},
      orderActionDialog: false,
      dialogInfo: {},
      dialogType: 1,
    };
  },
  mounted() {
    // let status = 3
    this.order_id = this.$route.query.order_id;
    this.$api.orderdetail(this, "schoolData");
  },

  methods: {
    // 按钮操作
    excludes(row, type) {
      const auth = {
        0: row.overdue_money > 0, // 收款
        4: ![4, 5].includes(row.pay_status) && row.pay_money > 0, // 退款
        5: ![4, 5].includes(row.pay_status), // 作废
      };
      return auth[type];
    },
    // 收款，作废，退款弹窗
    openOrderActions(row, type) {
      this.dialogType = type;
      this.dialogInfo = row;
      this.orderActionDialog = true;
    },
    orderdetail(page) {
      this.page = page;
      this.$api.orderdetail(this, "schoolData", this.datas);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
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
/deep/.el-button {
  padding: 9px 25px;
}
/deep/.el-form-item {
  margin-bottom: 10px;
}
/deep/.app-main {
  width: 80%;
}
/deep/.el-dialog__body {
  padding: 30px;
}
.mainwrap {
  width: 98%;
}
.orderDetail_bottm {
  margin-top: 10px;
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
.order-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
h3 {
  color: #333333;
  font-family: "Arial Normal", "Arial", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  padding-left: 4px;
  border-left: 4px solid #199fff;
}

/deep/.el-dialog__header {
  background: rgb(241, 241, 241);
}
.upmoney {
  display: flex;
  align-items: center;
  margin-top: 20px;
}
.upmoney p {
  display: block;
  height: 30px;
}
.detailLine .el-form-item {
  width: 380px;
}
.formmoney {
  display: flex;
}
.formmoney .zffs {
  width: 40%;
}
.formmoney .zfmoney {
  margin-left: 50px;
  display: flex;
}
</style>
