<template>
  <section class="mainwrap">
    <!-- <el-dialog title="订单详情" :visible.sync="orderVisible" width="60%"> -->
    <!--订单信息-->
    <div>
      <el-row style="min-width: 900px; margin-bottom: 20px">
        <el-col :lg="21" :sm="21" :xs="21" :md="21">
          <div class="order-header">
            <h3 style="height: 21px; margin-top: 4px">订单信息</h3>
            <!-- <el-button type="primary" plain @click="dialogVisible = true"
              >待入账</el-button
            > -->
            <!-- <span class="Entryicon">已入账</span> -->
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
                  <div class="ruleWord">{{ ruleForm.create_time }}</div>
                </el-form-item>
              </el-col>
              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="收费学生" prop="surname">
                  <div class="ruleWord">{{ ruleForm.account.surname }}</div>
                </el-form-item>
              </el-col>

              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="订单总价" prop="order_money">
                  <div class="ruleWord">¥ {{ ruleForm.order_money }}</div>
                </el-form-item>
              </el-col>
              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="优惠 小计" prop="reduction">
                  <div class="ruleWord">¥ {{ ruleForm.reduction }}</div>
                </el-form-item>
              </el-col>
              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="应收金额" prop="order_money">
                  <div class="ruleWord">¥ {{ ruleForm.order_money }}</div>
                </el-form-item>
              </el-col>

              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="已付金额" prop="pay_money">
                  <div class="ruleWord">¥ {{ ruleForm.pay_money }}</div>
                </el-form-item>
              </el-col>
              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="欠费金额" prop="overdue_money">
                  <div class="ruleWord">¥ {{ ruleForm.overdue_money }}</div>
                </el-form-item>
              </el-col>
              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="退款金额" prop="refund_money">
                  <div class="ruleWord">¥ {{ ruleForm.refund_money }}</div>
                </el-form-item>
              </el-col>
              <!-- <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="订单状态" prop="pay_status">
                  <div class="ruleWord">
                    {{ ruleForm.pay_status == 3 ? "已入账" : "未入账" }}
                  </div>
                </el-form-item>
              </el-col> -->
            </el-row>
            <el-row>
              <el-form-item label="订单备注" prop="tips"> </el-form-item>
            </el-row>
            <el-row> </el-row>
          </el-form>
        </el-col>
        <el-col :lg="3" :sm="3" :xs="3" :md="3"> </el-col>
      </el-row>
    </div>
    <div class="order-status">
      <el-tag :type="ruleForm.pay_status | orderTagType">{{
        ruleForm.pay_status | orderStatus
      }}</el-tag>
    </div>
    <div>
      <el-button
        v-if="excludes(ruleForm, 0)"
        @click="openOrderActions(ruleForm, 1)"
        type="primary"
        plain
        >收款</el-button
      >
      <el-button
        v-if="excludes(ruleForm, 4)"
        @click="openOrderActions(ruleForm, 2)"
        type="danger"
        plain
        >退款</el-button
      >
      <el-button
        v-if="excludes(ruleForm, 5)"
        @click="openOrderActions(ruleForm, 3)"
        type="danger"
        plain
        >作废</el-button
      >
    </div>
    <!--订单详情-->
    <div>
      <h3 style="margin: 15px 0">订单详情</h3>
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
          label="项目名称"
          prop="project_name"
          show-overflow-tooltip
          min-width="90"
        >
        </el-table-column>
        <el-table-column
          prop="order_money"
          label="价格"
          show-overflow-tooltip
          min-width="90"
          >¥ {{ ruleForm.order_money }}</el-table-column
        >
        <el-table-column
          prop="reduction"
          label="优惠金额"
          show-overflow-tooltip
          min-width="90"
          >¥ {{ ruleForm.reduction }}
        </el-table-column>
        <el-table-column
          prop="pay_money"
          label="已付金额"
          show-overflow-tooltip
          min-width="90"
          >¥ {{ ruleForm.pay_money }}
        </el-table-column>
      </el-table>

      <div class="orderDetail_bottm">
        <div class="orderDetail_content">
          <div>
            订单总价: <span>¥ {{ ruleForm.order_money }}</span>
          </div>
          <div>
            优惠总额: <span>¥ {{ ruleForm.reduction }}</span>
          </div>
          <div>
            订单应收:
            <span style="color: #199fff"
              >¥ {{ ruleForm.order_money - ruleForm.reduction }}</span
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
          prop="pay_money"
          label="支付金额"
          show-overflow-tooltip
          min-width="90"
        >
        </el-table-column>
        <el-table-column
          prop="pay_status"
          label="状态"
          show-overflow-tooltip
          min-width="90"
        >
          <template slot-scope="{ row }">
            {{ row.pay_status | orderStatus }}
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" min-width="80">
          <template slot-scope="{ row }">
            <div>
              <el-button
                type="text"
                v-if="!row.verify_uid"
                @click="handleEntryCofirm(row)"
                >入账</el-button
              >
              <span v-else style="color: #ccc">已确认</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--经办信息-->
    <!-- <div style="margin-top: 20px">
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
    </div> -->
    <CollectionOrder
      v-model="orderActionDialog"
      :type="dialogType"
      :orderInfo="dialogInfo"
      @on-success="orderdetail"
    />
  </section>
</template>

<script>
import CollectionOrder from "../components/CollectionOrder";
import { logEntry } from "@/api/fina";
export default {
  components: {
    CollectionOrder,
  },
  data() {
    return {
      projectData: [],
      pay_log: [],
      dialogImageUrl: "",
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
      // projectData:{
      //   id:'',
      //   pay_price:'',
      //   save_price:'',
      //   project_name:'',
      //   project_price:''
      // },
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
    //入账确认框
    handleEntryCofirm(row) {
      this.$confirm("是否将此笔订单入账？", { type: "warning" })
        .then(() => {
          this.logEntry(row);
        })
        .catch(() => {});
    },
    async logEntry(row) {
      const data = { id: row.id };
      const res = await logEntry(data);
      if (res.code === 0) {
        row.verify_uid = 1;
        this.$message.success(res.message);
      }
    },
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
.order-status {
  position: absolute;
  right: 60px;
  top: 70px;
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
.Entryicon {
  position: absolute;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  color: #199fff;
  right: 150px;
  font-size: 28px;
  // font-weight: bold;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 2px dashed #199fff;
}
</style>
