<template>
  <el-dialog
    title="退款作废"
    :visible="value"
    width="800px"
    @open="handleOpen"
    :close-on-click-modal="false"
    @closed="resetForm('formData')"
    @close="hanldeClose"
  >
    <Title text="订单信息"></Title>
    <div class="order-info">
      <div class="order-info-item">订单编号：{{ orderInfo.order_no }}</div>
      <div class="order-info-item">订单时间：{{ orderInfo.create_time }}</div>
      <div class="order-info-item">收费学生：{{ orderInfo.surname }}</div>
      <div class="order-info-item">
        应收金额：{{ orderInfo.order_money | moneyFormat }}
      </div>
      <div class="order-info-item">
        已付金额：{{ orderInfo.pay_money | moneyFormat }}
      </div>
      <div class="order-info-item">
        欠费金额：{{ orderInfo.overdue_money | moneyFormat }}
      </div>
    </div>
    <Title text="退款作废"></Title>
    <el-form
      label-width="100px"
      :model="formData"
      :rules="rules"
      ref="formData"
    >
      <el-form-item label="操作类型" prop="dateType">
        <el-radio-group v-model="formData.dateType">
          <el-radio label="1">退款</el-radio>
          <el-radio label="2">作废</el-radio>
        </el-radio-group>
      </el-form-item>
      <div class="in-line" v-if="formData.dateType === '1'">
        <el-form-item label="退费方式" prop="pay_type">
          <el-select
            v-model="formData.pay_type"
            placeholder="请选择退费方式"
            class="input"
            filterable
          >
            <el-option
              v-for="item in payMethodOptions"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="退款金额" prop="pay_money">
          <el-input
            class="input"
            v-model="formData.pay_money"
            type="number"
            placeholder="请输入退款金额"
          />
        </el-form-item>
      </div>
      <el-form-item label="退款原因" prop="tips">
        <el-input
          style="width: 90%"
          v-model="formData.tips"
          type="textarea"
          placeholder="请输入原因"
        />
      </el-form-item>
      <el-form-item label="回款凭证">
        <ImgListUpload v-model="formData.receipt_file" />
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="hanldeClose">取 消</el-button>
      <el-button
        type="primary"
        :loading="addLoading"
        @click="submitForm('formData')"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import { updateProjectUserExpireTime } from "@/api/eda";
import { getCustomfieldOptions } from "@/api/crm";
import ImgListUpload from "@/components/imgListUpload";
export default {
  name: "RefundDialog",
  components: {
    ImgListUpload,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    orderInfo: {
      type: Array,
      default: () => ({}),
    },
  },
  data() {
    return {
      addLoading: false,
      formData: {
        dateType: "1",
        expire_time: "",
        receipt_file: [],
      },
      rules: {
        dateType: [{ required: true, message: "请选择", trigger: "change" }],
        expire_time: [{ required: true, message: "请选择", trigger: "change" }],
      },
      payMethodOptions: [],
    };
  },

  methods: {
    handleOpen() {
      this.getCustomfieldOptions();
    },
    // 获取支付方式
    async getCustomfieldOptions() {
      const data = {
        field_name: "payment_method",
      };
      const res = await getCustomfieldOptions(data);
      if (res.code === 0) {
        this.payMethodOptions = res.data.field_content;
      }
    },
    async submit() {
      const { expire_time } = this.formData;
      const data = {
        expire_time,
      };
      this.addLoading = true;
      const res = await updateProjectUserExpireTime(data).catch(() => {
        this.addLoading = false;
      });
      this.addLoading = false;
      if (res.code === 0) {
        this.$message.success(res.message);
        this.$emit("success");
        this.hanldeClose();
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submit();
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.formData = {
        dateType: "1",
        expire_time: "",
      };
    },
    hanldeClose() {
      this.$emit("input", false);
    },
  },
};
</script>
<style lang="less" scoped>
.order-info {
  padding-left: 20px;
  display: flex;
  flex-wrap: wrap;
  &-item {
    width: 33%;
    margin-bottom: 16px;
  }
}
.in-line {
  display: flex;
  justify-content: space-between;
}
</style>


