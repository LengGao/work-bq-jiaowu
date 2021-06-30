<template>
  <section>
    <el-dialog
      title="客户报名"
      :visible.sync="openStatus"
      @close="doClose"
      :close-on-click-modal="false"
      append-to-body
      width="1200px"
      top="5vh"
      class="create-order"
    >
      <el-form
        label-width="90px"
        class="create-order-form"
        :rules="rules"
        label-position="right"
        inline
        ref="ruleForm"
        :model="ruleForm"
        :show-message="true"
      >
        <Title text="客户信息" />
        <div class="user-info">
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
            <el-radio-group
              v-model="ruleForm.online_course"
              class="input-width"
            >
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="报名类型" prop="type">
            <el-select
              v-model="ruleForm.type"
              placeholder="请选择"
              class="input-width"
            >
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </div>

        <Title text="报名项目">
          <el-form-item prop="selectProject">
            <el-cascader
              popper-class="select-project"
              placeholder="请选择项目"
              style="width: 400px"
              v-model="ruleForm.selectProject"
              :options="projectOptions"
              :props="{ multiple: true }"
              :show-all-levels="false"
              filterable
              collapse-tags
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
              prop="pay_price"
              label="应收金额"
              min-width="150"
              show-overflow-tooltip
            >
              <template slot-scope="{ row }">
                <el-input
                  v-model="row.pay_price"
                  type="number"
                  size="small"
                  placeholder="请输入"
                  @input="payPriceChange($event, row)"
                  @blur="payPriceBlur($event, row)"
                ></el-input>
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
        <Title text="支付信息" />
        <div class="pay-info">
          <el-form-item label="应收总额">
            <span style="color: #fd6500"
              >￥{{ allOrderInfo.totalReceivable }}</span
            >
          </el-form-item>
          <el-form-item label="支付方式" prop="pay_type">
            <el-select
              v-model="ruleForm.pay_type"
              placeholder="请选择支付方式"
              class="input-width"
            >
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
          <el-form-item label="欠费金额">
            <span style="color: #fd6500">￥{{ parsePrice(arrearsMoney) }}</span>
          </el-form-item>
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
        </div>
        <Title text="学费信息" v-if="ruleForm.type === 2" />
        <div class="tuition-info" v-if="ruleForm.type === 2">
          <el-form-item label="第一学年学费">
            <el-input
              class="input-width"
              placeholder="请输入"
              v-model="ruleForm.remark"
            ></el-input>
          </el-form-item>
          <el-form-item label="第二学年学费">
            <el-input
              class="input-width"
              placeholder="请输入"
              v-model="ruleForm.remark"
            ></el-input>
          </el-form-item>
          <el-form-item label="第三学年学费">
            <el-input
              class="input-width"
              placeholder="请输入"
              v-model="ruleForm.remark"
            ></el-input>
          </el-form-item>
          <el-form-item label="报考费">
            <el-input
              class="input-width"
              placeholder="请输入"
              v-model="ruleForm.remark"
            >
              <template slot="append">元/科</template>
            </el-input>
          </el-form-item>
          <el-form-item label="教材费">
            <el-input
              class="input-width"
              placeholder="请输入"
              v-model="ruleForm.remark"
            >
              <template slot="append">元/年</template>
            </el-input>
          </el-form-item>
          <el-form-item label="毕设指导费">
            <el-input
              class="input-width"
              placeholder="请输入"
              v-model="ruleForm.remark"
            ></el-input>
          </el-form-item>
          <el-form-item label="论文答辩费">
            <el-input
              class="input-width"
              placeholder="请输入"
              v-model="ruleForm.remark"
            ></el-input>
          </el-form-item>
          <el-form-item label="其他费用">
            <el-input
              class="input-width"
              placeholder="请输入"
              v-model="ruleForm.remark"
            ></el-input>
          </el-form-item>
        </div>
        <Title text="备注信息" />
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
    <AddPhoto
      title="上传用户资料"
      :visible.sync="addCertificatesDialog"
      :uid="userInfo.uid"
    />
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
        type: 1,
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
      typeOptions: [
        {
          value: 1,
          label: "软考安监",
        },
        {
          value: 2,
          label: "学历教育",
        },
      ],
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
      let totalReceivable = 0; // 订单应收总金额
      let allCourse = []; // 所有课程
      let allQuestion = []; // 所有题库
      let allTeachingMaterial = []; // 所有教材
      this.projectData.forEach((item) => {
        totalReceivable += +item.pay_price || 0;
        totalPrice += +item.price || 0;
        allCourse = allCourse.concat(item.course);
        allQuestion = allQuestion.concat(item.problem);
        allTeachingMaterial = allTeachingMaterial.concat(item.textbooks);
      });
      this.ruleForm.pay_money = totalReceivable;
      return {
        totalPrice: parsePrice(totalPrice),
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
    // 应收金额输入时
    payPriceChange(val, row) {
      let price = +row.price || 0;
      if (val > price) {
        row.pay_price = price;
        this.$message.warning("应收金额不能大于项目价格！");
      }
    },
    payPriceBlur(e, row) {
      let lowest_price = +row.lowest_price || 0;
      let val = e.target.value;
      if (val < lowest_price) {
        row.pay_price = lowest_price;
        this.$message.warning("应收金额不能小于最低价格！");
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
        const oldPayPrice = {};
        this.projectData.forEach((item) => {
          oldPayPrice[item.id] = item.pay_price;
        });
        this.projectData =
          res.data.map((item) => ({
            ...item,
            pay_price: oldPayPrice[item.id] || +item.price || 0,
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
        // order_money: this.allOrderInfo.totalPrice,
        // reduction: this.allOrderInfo.totalDiscount,
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
            pay_price: item.pay_price,
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
    .user-info {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
    }
    .project-table {
      margin-bottom: 16px;
    }
    .pay-info {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      & > div {
        width: calc(100% / 3.1);
        &:nth-of-type(3n - 2) {
          width: 200px;
        }
        &:last-child {
          margin-right: auto;
          margin-left: 86px;
        }
      }
    }
    .sign-up {
      margin-bottom: 8px;
      &-item {
        margin-bottom: 16px;
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
    .tuition-info {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      /deep/.el-form-item__label {
        width: 100px !important;
      }
      & > div {
        &:last-child {
          margin-right: auto;
          margin-left: 42px;
        }
        /deep/.el-input-group__append {
          padding: 0 6px;
        }
      }
    }
  }
  .form-footer {
    width: 100%;
    padding: 20px;
    text-align: right;
  }
}

/deep/.el-table__header th,
.el-table__header tr {
  background-color: #f8f8f8;
  color: #909399;
}

.input-width {
  width: 240px;
}
</style>
<style lang="scss">
.select-project {
  .el-cascader-panel {
    & > .el-scrollbar:first-child {
      .el-checkbox {
        display: none;
      }
    }
    .el-cascader-node[aria-owns] {
      .el-checkbox {
        width: 14px;
        span {
          display: none;
        }
      }
    }
  }
}
</style>