<template>
  <el-dialog
    title="申请退款/作废订单"
    :visible="value"
    width="800px"
    @open="handleOpen"
    :close-on-click-modal="false"
    @closed="resetForm('formData')"
    @close="hanldeClose"
    ><el-alert
      title="您可以在此申请作废/退款订单，只有审批通过后才有效。订单作废/退款后将关闭学员的课程，不能再开课和计算业绩。"
      type="error"
      style="margin-bottom: 10px"
    >
    </el-alert>
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
      <el-form-item label="操作类型" prop="type">
        <el-radio-group v-model="formData.type">
          <el-radio label="1">退款</el-radio>
          <el-radio label="2">作废</el-radio>
          <el-radio label="3">退差价</el-radio>
        </el-radio-group>
      </el-form-item>
      <div class="in-line" v-if="['1', '3'].includes(formData.type)">
        <el-form-item label="退款方式" prop="refund_type">
          <el-select
            v-model="formData.refund_type"
            placeholder="请选择退款方式"
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
        <el-form-item label="退款金额" prop="refund_money">
          <el-input
            class="input"
            v-model="formData.refund_money"
            type="number"
            @mousewheel.native.prevent
            placeholder="请输入退款金额"
          />
        </el-form-item>
      </div>
      <el-form-item
        :label="`${['1', '3'].includes(formData.type) ? '退款' : '作废'}原因`"
        prop="reason"
      >
        <el-input
          style="width: 90%"
          v-model="formData.reason"
          type="textarea"
          placeholder="请输入原因"
        />
      </el-form-item>
      <el-form-item
        :label="`${['1', '3'].includes(formData.type) ? '退款' : '作废'}凭证`"
        prop="voucher"
      >
        <el-input v-if="false" v-model="formData.voucher" type="input" />
        <ImgListUpload v-model="formData.voucher" />
        <p style="color: red">请上传钉钉的退款/作废订单的审批凭证</p>
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
import { getCustomfieldOptions, refundInvalid } from "@/api/crm";
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
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      addLoading: false,
      formData: {
        type: "1",
        refund_money: "",
        reason: "",
        refund_type: "",
        voucher: [],
      },
      rules: {
        reason: [{ required: true, message: "请输入", trigger: "blur" }],
        refund_money: [{ required: true, message: "请输入", trigger: "blur" }],
        type: [{ required: true, message: "请选择", trigger: "change" }],
        voucher: [{ required: true, message: "请上传", trigger: "blur" }],
        refund_type: [{ required: true, message: "请选择", trigger: "change" }],
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
      const data = {
        ...this.formData,
        voucher: this.formData.voucher.map(
          (item) => item.response.data.data.url
        ),
        order_id: this.orderInfo.order_id,
      };
      this.addLoading = true;
      const res = await refundInvalid(data).catch(() => {
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
        type: "1",
        refund_type: "",
      };
    },
    hanldeClose() {
      this.$emit("input", false);
    },
  },
};
</script>
<style lang="less" scoped>
/deep/.el-dialog__body {
  padding: 10px 20px;
}
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


