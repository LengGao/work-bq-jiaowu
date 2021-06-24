<template>
  <section>
    <el-dialog
      title="客户报名"
      :visible.sync="openStatus"
      @close="doClose"
      :close-on-click-modal="false"
      append-to-body
      width="1000px"
      top="5vh"
      class="create-order"
    >
      <el-form
        label-width="90px"
        class="create-order-form"
        :rules="rules"
        inline
        ref="ruleForm"
        :model="ruleForm"
        :show-message="true"
        label-position="left"
      >
        <Title text="客户信息" />
        <el-form-item label="客户姓名">
          <el-input
            class="input-width"
            disabled
            v-model="userInfo.surname"
          ></el-input>
        </el-form-item>

        <el-form-item label="手机号码">
          <el-input
            disabled
            class="input-width"
            v-model="userInfo.mobile"
          ></el-input>
        </el-form-item>
        <el-form-item label="开通网课" prop="online_course">
          <el-radio-group v-model="ruleForm.online_course" style="width: 240px">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <Title text="报名项目">
          <el-form-item prop="selectProject">
            <el-cascader
              placeholder="请选择项目"
              style="width: 400px"
              v-model="ruleForm.selectProject"
              :options="projectOptions"
              :props="{ multiple: true }"
              filterable
            ></el-cascader>
          </el-form-item>
        </Title>

        <!--表格-->
        <div class="project-table">
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
              min-width="150"
              prop="project_name"
            >
            </el-table-column>
            <el-table-column
              prop="price"
              label="项目价格"
              min-width="110"
              show-overflow-tooltip
            >
              <template slot-scope="{ row }">
                <div>￥{{ row.price }}</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="lowest_price"
              label="最低价格"
              min-width="150"
              show-overflow-tooltip
            >
              <template slot-scope="{ row }">
                <div>￥{{ row.lowest_price }}</div>
              </template>
            </el-table-column>
            <el-table-column
              label="优惠金额"
              min-width="150"
              show-overflow-tooltip
            >
              <template slot-scope="{ row }">
                <el-input
                  v-model="row.save_price"
                  type="number"
                  size="small"
                  placeholder="请输入"
                  @input="savePriceChange($event, row)"
                ></el-input>
              </template>
            </el-table-column>

            <el-table-column
              prop="pay_price"
              label="应收金额"
              min-width="150"
              show-overflow-tooltip
            >
              <template slot-scope="{ row }">
                <div>￥{{ parsePrice(row.price - row.save_price) }}</div>
              </template>
            </el-table-column>

            <el-table-column label="操作" fixed="right" min-width="200">
              <template slot-scope="{ row }">
                <div style="display: flex; justify-content: center">
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    circle
                    plain
                    @click="delbtn(row.id)"
                  ></el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <Title text="报名小结" />
        <div class="sign-up">
          <div class="sign-up-item">
            <span class="sign-up-item-label">课程名称</span>
            <span class="sign-up-item-content">{{
              allOrderInfo.allCourse
            }}</span>
          </div>
          <div class="sign-up-item">
            <span class="sign-up-item-label">题库名称</span>
            <span class="sign-up-item-content">{{
              allOrderInfo.allQuestion
            }}</span>
          </div>
          <div class="sign-up-item">
            <span class="sign-up-item-label">教材名称</span>
            <span class="sign-up-item-content">{{
              allOrderInfo.allTeachingMaterial
            }}</span>
          </div>
        </div>
        <div class="customer_sum_up" style="padding: 10px 0 20px 0">
          <Title text="费用小结" />
          <div>
            <el-row>
              <el-col :sm="4">
                <div class="expense_summary_label">
                  订单总价<span>￥{{ allOrderInfo.totalPrice }}</span>
                </div>
              </el-col>
              <el-col :sm="4">
                <div class="expense_summary_label">
                  优惠总额<span>￥{{ allOrderInfo.totalDiscount }}</span>
                </div>
              </el-col>
              <el-col :sm="4">
                <div class="expense_summary_label">
                  应收金额<span style="color: #fd6500"
                    >￥{{ allOrderInfo.totalReceivable }}</span
                  >
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <Title text="支付信息" />
        <el-form-item label="支付方式" prop="pay_type">
          <el-select v-model="ruleForm.pay_type" placeholder="请选择支付方式">
            <el-option
              v-for="item in payWays"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="支付金额" prop="pay_money">
          <el-input
            placeholder="请输入支付金额"
            class="input-width"
            type="number"
            v-model="ruleForm.pay_money"
            @input="payMoneyChange"
          ></el-input>
        </el-form-item>
        <div class="customer_sum_up">
          <Title text="备注信息" />
          <el-row class="wrap">
            <el-col :sm="8" style="display: flex; margin-top: 10px">
              <div class="expense_summary_label">
                实缴金额
                <span style="color: #fd6500"
                  >￥{{ parsePrice(ruleForm.pay_money) }}</span
                >
              </div>
              <div class="expense_summary_label">
                欠费金额<span>￥{{ parsePrice(arrearsMoney) }}</span>
              </div>
            </el-col>

            <el-col :sm="8">
              <el-form-item label="补缴时间">
                <el-date-picker
                  v-model="ruleForm.supplement_time"
                  type="date"
                  format="yyyy-MM-dd "
                  value-format="yyyy-MM-dd "
                  class="input-width"
                  placeholder="选择日期"
                  :disabled="!arrearsMoney"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <el-form-item label="备注信息">
          <el-input
            style="width: 700px"
            type="textarea"
            placeholder="请输入订单备注信息"
            v-model="ruleForm.remark"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="form-footer">
        <el-button @click="doClose">取消</el-button>
        <el-button type="primary" @click="orderDeatilShow('ruleForm')"
          >报名缴费</el-button
        >
      </div>
    </el-dialog>
    <AddPhoto :visible.sync="addCertificatesDialog" :uid="userInfo.uid" />
  </section>
</template>

<script>
import {
  getCateProjectOption,
  getCateProjectDetail,
  createOrder,
} from "@/api/etm";
import { parsePrice } from "@/utils/index";
import AddPhoto from "@/views/eda/certificates/components/AddPhoto";
export default {
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
  components: {
    AddPhoto,
  },
  data() {
    return {
      parsePrice,
      openStatus: this.value,
      payWays: [
        {
          value: 1,
          label: "现金",
        },
        {
          value: 2,
          label: "微信",
        },
        {
          value: 3,
          label: "支付宝",
        },
        {
          value: 4,
          label: "聚合收单",
        },
        {
          value: 5,
          label: "银行转账",
        },
        {
          value: 6,
          label: "收钱吧",
        },
        {
          value: 7,
          label: "机构签约订单",
        },
      ],
      ruleForm: {
        online_course: "",
        pay_type: "",
        pay_money: "",
        supplement_time: "",
        selectProject: "",
        remark: "",
      },
      rules: {
        selectProject: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        online_course: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        pay_type: [
          { required: true, message: "请选择支付方式", trigger: "change" },
        ],
        pay_money: [
          { required: true, message: "请选择支付金额", trigger: "change" },
        ],
      },
      projectVisible: false,
      projectData: [],
      projectOptions: [],
      addCertificatesDialog: false,
    };
  },
  computed: {
    // 欠缴金额
    arrearsMoney() {
      const money = this.allOrderInfo.totalReceivable - this.ruleForm.pay_money;
      const result = money > 0 ? money : 0;
      // 欠缴金额为0要清空欠缴时间
      if (!result) {
        this.ruleForm.supplement_time = "";
      }
      return result;
    },
    allOrderInfo() {
      let totalPrice = 0; // 订单总价
      let totalDiscount = 0; // 订单优惠总价
      let totalReceivable = 0; // 订单应收总金额
      let allCourse = []; // 所有课程
      let allQuestion = []; // 所有题库
      let allTeachingMaterial = []; // 所有教材
      this.projectData.forEach((item) => {
        totalPrice += +item.price || 0;
        totalDiscount += +item.save_price || 0;
        allCourse = allCourse.concat(item.course);
        allQuestion = allQuestion.concat(item.problem);
        allTeachingMaterial = allTeachingMaterial.concat(item.textbooks);
      });
      totalReceivable = totalPrice - totalDiscount;
      this.ruleForm.pay_money = parsePrice(totalReceivable);
      return {
        totalPrice: parsePrice(totalPrice),
        totalDiscount: parsePrice(totalDiscount),
        totalReceivable: parsePrice(totalReceivable),
        allTeachingMaterial: allTeachingMaterial
          .map((item) => item.book_name)
          .join("、"),
        allQuestion: allQuestion.map((item) => item.problem_title).join("、"),
        allCourse: allCourse.map((item) => item.course_name).join("、"),
      };
    },
  },

  watch: {
    value(val) {
      this.openStatus = val;
      val && this.getCateProjectOption();
    },
    "ruleForm.selectProject"(newVal) {
      this.getCateProjectDetail(newVal || []);
    },
  },
  methods: {
    payMoneyChange(val) {
      if (val > parseInt(this.allOrderInfo.totalReceivable)) {
        this.ruleForm.pay_money = +this.allOrderInfo.totalReceivable;
        this.$message.warning("支付金额不能大于应收金额！");
      }
    },
    // 优惠金额输入时
    savePriceChange(val, row) {
      let maxSavePrice = (+row.price || 0) - (+row.lowest_price || 0);
      if (val > maxSavePrice) {
        row.save_price = maxSavePrice;
        this.$message.warning("优惠后金额不能低于最低金额！");
      }
    },
    // 已选项目详情
    async getCateProjectDetail(arr) {
      const idStr = arr.map((item) => [...item].pop()).join(",");
      if (!idStr) {
        this.projectData = [];
        return;
      }
      const data = {
        id: idStr,
      };
      const res = await getCateProjectDetail(data);
      if (res.code === 0) {
        const oldSavePrice = {};
        this.projectData.forEach((item) => {
          oldSavePrice[item.id] = item.save_price;
        });
        this.projectData =
          res.data.map((item) => ({
            ...item,
            save_price: oldSavePrice[item.id] || "",
          })) || [];
      }
    },
    // 获取项目选项
    async getCateProjectOption() {
      const res = await getCateProjectOption();
      if (res.code === 0) {
        this.projectOptions = res.data || [];
      }
    },
    // 报名缴费
    async createOrder() {
      const data = {
        order_token: Date.now(),
        uid: this.userInfo.uid,
        aid: this.userInfo.id,
        pay_type: this.ruleForm.pay_type,
        pay_money: this.ruleForm.pay_money,
        order_money: this.allOrderInfo.totalPrice,
        reduction: this.allOrderInfo.totalDiscount,
        overdue_money: this.arrearsMoney,
        surname: this.userInfo.surname,
        mobile: this.userInfo.mobile,
        id_card_number: this.userInfo.id_card_number,
        supplement_time: this.ruleForm.supplement_time,
        online_course: this.ruleForm.online_course,
        tips: this.ruleForm.remark,
        project: JSON.stringify(
          this.projectData.map((item) => ({
            id: item.id,
            project_name: item.project_name,
            project_price: item.price,
            lower_price: item.lowest_price,
            save_price: item.save_price || 0,
            pay_price: parsePrice(item.price - item.save_price),
            service_effective: item.service_effective,
            service_period: item.service_period,
            service_type: item.service_type,
          })) || []
        ),
      };
      const res = await createOrder(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.doClose();
        this.addCertificatesDialog = true;
      }
    },
    doClose() {
      this.$refs.ruleForm.resetFields();
      for (var item in this.ruleForm) {
        this.ruleForm[item] = "";
      }
      this.projectData = [];
      this.$emit("input", false);
    },
    delbtn(id) {
      console.log(id);
      this.ruleForm.selectProject = this.ruleForm.selectProject.filter(
        (item) => [...item].pop() !== id
      );
    },
    orderDeatilShow(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.createOrder();
        } else {
          this.$message.error("资料未完善！");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.create-order {
  /deep/.el-dialog__body {
    padding: 0;
  }
  .create-order-form {
    padding: 20px 30px 0 30px;
    height: 600px;
    overflow-y: auto;
    overflow-x: hidden;
  }
}
.project-table {
  margin-bottom: 16px;
}
.form-footer {
  width: 100%;
  padding: 20px;
  text-align: right;
}
.zZindex {
  z-index: 3000000000000000 !important;
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
  font-family: "Arial Normal", "Arial", sans-serif;
  font-weight: 400;
  font-style: normal;
}
.customer_sum_up {
  margin: 0 0 0 0;
  h3 {
    padding-left: 6px;
    font-family: "Arial Normal", "Arial", sans-serif;
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
  font-family: "Arial Normal", "Arial", sans-serif;
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

.sign-up {
  display: flex;
  margin-bottom: 8px;
  &-item {
    flex: 1;
    margin-right: 16px;
    display: flex;
    &-label {
      flex-shrink: 0;
      margin-right: 8px;
    }
    &-content {
      color: #199fff;
    }
  }
}
</style>
