<template>
  <div class="refund-only">
    <Title text="订单信息"></Title>
    <div class="info-block">
      <div class="info-item">
        <span class="info-item__name">订单编号：</span>
        <span class="info-item__value">65464875432131</span>
      </div>
      <div class="info-item">
        <span class="info-item__name">订单时间：</span>
        <span class="info-item__value">fdsafdsafdsaf2424</span>
      </div>
      <div class="info-item">
        <span class="info-item__name">客户姓名：</span>
        <span class="info-item__value">fdsafdsafdsaf2424</span>
      </div>
      <div class="info-item">
        <span class="info-item__name">报名项目：</span>
        <span class="info-item__value">fdsafdsafdsaf2424</span>
      </div>
      <div class="info-item">
        <span class="info-item__name">订单金额：</span>
        <span class="info-item__value">fdsafdsafdsaf2424</span>
      </div>
      <div class="info-item">
        <span class="info-item__name">已回款金额：</span>
        <span class="info-item__value">fdsafdsafdsaf2424</span>
      </div>
      <div class="info-item">
        <span class="info-item__name">扣款金额：</span>
        <span class="info-item__value">范德萨范德萨</span>
      </div>
      <div class="info-item">
        <span class="info-item__name">订单结余：</span>
        <span class="info-item__value">fdsafdsafdsaf2424</span>
      </div>
      <div class="info-item">
        <span class="info-item__name">开通课程：</span>
        <span class="info-item__value"
          >范德萨发的范德萨范德萨阿范德萨范德萨范德萨范德萨
        </span>
      </div>
      <div class="info-item">
        <span class="info-item__name">开通题库：</span>
        <span class="info-item__value">fdsafdsafdsaf2424</span>
      </div>
    </div>
    <Title text="退费信息"></Title>
    <el-form
      label-width="100px"
      :model="formData"
      :rules="rules"
      ref="formData"
      inline
    >
      <el-form-item label="应退金额" prop="title">
        <el-input
          class="input"
          v-model="formData.title"
          type="number"
          placeholder="请输入应退金额"
        />
      </el-form-item>
      <el-form-item label="退款方式" prop="pay_type">
        <el-select
          v-model="formData.pay_type"
          placeholder="请选择退款方式"
          class="input"
          filterable
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
      <el-form-item label="收款账号" prop="title">
        <el-input
          class="input"
          v-model="formData.title"
          type="number"
          placeholder="请输入收款账号"
        />
      </el-form-item>
      <el-form-item label="备注信息" prop="resource">
        <el-input
          style="width: 800px"
          v-model="formData.title"
          type="textarea"
          placeholder="请输入备注信息"
        />
      </el-form-item>
    </el-form>
    <div class="submit">
      <el-button>取 消</el-button>
      <el-button
        type="primary"
        :loading="addLoading"
        @click="submitForm('formData')"
        >确 定</el-button
      >
    </div>
  </div>
</template>
<script>
import { payWays } from "@/utils";
export default {
  name: "RefundOnly",
  data() {
    return {
      payWays,
      addLoading: false,
      formData: {
        title: "",
        items: [],
        remark: "",
        options: [
          {
            label: "",
            id: 1,
          },
        ],
      },
      rules: {
        title: [{ required: true, message: "请输入", trigger: "blur" }],
      },
    };
  },
  methods: {
    async submit() {
      const data = {
        title: this.formData.title,
        remark: this.formData.remark,
      };
      const api = {};
      this.addLoading = true;
      const res = await api(data).catch(() => {
        this.addLoading = false;
      });
      this.addLoading = false;
      if (res.code === 0) {
        this.$message.success(res.message);
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submit();
        }
      });
    },
  },
};
</script>
<style lang="less">
.refund-only {
  .info-block {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;
    .info-item {
      padding: 16px 10px;
      color: #666;
      display: flex;
      &__name {
        min-width: 100px;
      }
      &__value {
        min-width: 300px;
        line-height: 1.5;
      }
    }
  }
  .input {
    width: 300px;
  }
  .submit {
    position: relative;
    padding: 30px 0;
    text-align: center;
    button {
      margin-right: 20px;
      padding: 12px 40px;
    }
    &::before {
      content: "";
      height: 10px;
      position: absolute;
      background-color: #f2f6fc;
      top: 0;
      left: -16px;
      right: -16px;
    }
  }
}
</style>