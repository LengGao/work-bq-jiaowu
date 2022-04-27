<template>
  <el-dialog
    title="返点审批"
    :visible.sync="visible"
    width="790px"
    @open="handleOpen"
    :close-on-click-modal="false"
    @closed="resetForm('formData')"
    class="add-collection"
  >
    <el-form
      label-width="110px"
      :model="formData"
      :rules="rules"
      inline
      ref="formData"
    >
      <el-form-item label="机构名称" prop="institution_name">
        <el-input disabled class="input" v-model="formData.institution_name" />
      </el-form-item>
      <el-form-item label="关联订单数" prop="order_count">
        <el-input class="input" v-model="formData.order_count" disabled />
      </el-form-item>
      <el-form-item label="申请返点金额" prop="apply_rebate_price">
        <el-input
          class="input"
          v-model="formData.apply_rebate_price"
          disabled
        />
      </el-form-item>
      <el-form-item label="支付方式" prop="pay_type">
        <el-input class="input" v-model="formData.pay_type" disabled />
      </el-form-item>
      <el-form-item label="实际返点金额" prop="real_rebate_price">
        <el-input
          class="input"
          v-model="formData.real_rebate_price"
          type="number"
          @mousewheel.native.prevent
          placeholder="实际返点金额"
        />
      </el-form-item>
      <el-form-item prop="rebate_time" label="返点日期">
        <el-date-picker
          class="input"
          type="date"
          placeholder="选择日期"
          v-model="formData.rebate_time"
          value-format="yyyy-MM-dd"
          :picker-options="{
            disabledDate: disabledDate,
          }"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="审批理由" prop="reason" class="block">
        <el-input
          class="remark"
          type="textarea"
          v-model="formData.reason"
          placeholder="请输入内容"
        />
      </el-form-item>
      <el-form-item label="支付凭证" class="block">
        <ImgListUpload v-model="formData.pay_proof" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hanldeCancel">取 消</el-button>
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
import { approveRebate } from "@/api/rebate";
import ImgListUpload from "@/components/imgListUpload";
export default {
  name: "AdoptRebate",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    contractInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  components: {
    ImgListUpload,
  },
  data() {
    return {
      addLoading: false,
      uploadLoading: false,
      detailLoading: false,
      visible: this.value,
      addLoading: false,
      formData: {
        id: "",
        institution_name: "",
        pay_type: "",
        order_count: "",
        apply_rebate_price: "",
        rebate_time: "",
        reason: "",
        pay_proof: [],
      },
      rules: {
        real_rebate_price: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        rebate_time: [{ required: true, message: "请选择", trigger: "change" }],
      },
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },

  methods: {
    disabledDate(e) {
      return e.getTime() > Date.now();
    },
    handleOpen() {
      if (this.contractInfo.id) {
        for (var i in this.formData) {
          if (i !== "pay_proof") {
            this.formData[i] = this.contractInfo[i] || "";
          }
        }
      }
      console.log(this.formData.id);
    },
    //审核返点
    async approveRebate() {
      const data = {
        id: this.formData.id,
        institution_name: this.formData.institution_name,
        real_rebate_price: this.formData.real_rebate_price,
        rebate_time: this.formData.rebate_time,
        reason: this.formData.reason,
        status: 1,

        pay_proof: this.formData.pay_proof.map(
          (item) => item.response.data.data.url
        ),
      };

      const res = await approveRebate(data);
      if (res.code == 0) {
        this.$message.success(res.message);
        this.$emit("on-success");
        this.visible = false;
      }
    },
    submitForm(formName) {
      console.log(this.ruleForm);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.approveRebate();
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      for (const k in this.formData) {
        this.formData[k] = "";
      }
      this.formData.pay_proof = [];
      this.$emit("input", false);
    },
    hanldeCancel() {
      this.visible = false;
      this.$emit("input", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.input {
  width: 244px;
}
.block {
  width: 100%;
  /deep/.el-form-item__content {
    width: 80%;
  }
}
.tables {
  display: flex;
  justify-content: space-between;
  /deep/.el-table {
    // border: 1px solid #efefef;
    border-bottom: none;
  }
  .again-table {
    flex: 1;
  }
  .order-table {
    width: 55%;
    border: 1px solid #efefef;
    margin-bottom: 20px;
    .table_bottom {
      padding-bottom: 0;
    }
  }
  .checked-table {
    border: 1px solid #efefef;
    width: 44%;
    margin-bottom: 20px;
    .money-total {
      text-align: right;
      padding: 16px 0;
      & > span {
        margin-left: 40px;
        .price {
          color: #fd6552;
        }
      }
    }
    .header-money {
      display: flex;
      align-items: center;
      padding: 0;
      &-actions {
        width: 40px;
        flex-shrink: 0;
        font-size: 12px;
        font-weight: normal;
        display: flex;
        flex-direction: column;
        line-height: 1.5;
        padding: 0;
        .btn-fill {
          color: #fcc850;
          cursor: pointer;
        }
        .btn-distribution {
          color: #43d100;
          cursor: pointer;
        }
      }
    }
  }
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
.add-collection {
  .el-dialog__body {
    padding: 10px 16px 0;
  }
}
.el-dialog__footer {
  padding: 10px 60px 30px 0;
}
.el-pagination {
  padding: 0 5px 10px 0;
}

.el-form--inline .el-form-item {
  margin-top: 15px;
  margin-bottom: 20px;
}
</style>