<template>
  <!--订单 收款 退款 作废-->
  <el-dialog
    :title="titleMap[type]"
    :visible.sync="visible"
    width="900px"
    class="collect-dialog"
    :close-on-click-modal="false"
    @closed="resetForm('formData')"
  >
    <div class="order-info">
      <Title text="订单信息" />
      <ul class="info-list">
        <li>订单编号：{{ orderInfo.order_no }}</li>
        <li>订单时间：{{ orderInfo.create_time }}</li>
        <li>
          收费学生：{{
            orderInfo.surname ||
            (orderInfo.account && orderInfo.account.surname) ||
            ""
          }}
        </li>
        <li>
          应收金额：{{
            (orderInfo.order_money - orderInfo.reduction).toFixed(2)
          }}
        </li>
        <li>已付金额：{{ orderInfo.pay_money }}</li>
        <li>欠费金额：{{ orderInfo.overdue_money }}</li>
      </ul>
    </div>
    <Title text="支付信息" />
    <el-form
      label-width="100px"
      :model="formData"
      :rules="rules"
      ref="formData"
    >
      <!-- 收款 -->
      <template v-if="type === 1">
        <el-row>
          <el-col :lg="12" :xs="12" :sm="12" :xl="12">
            <el-form-item label="支付方式" prop="pay_type">
              <el-select
                v-model="formData.pay_type"
                placeholder="请选择支付方式"
              >
                <el-option
                  v-for="(item, index) in payTypes"
                  :key="index"
                  :label="item.name"
                  :value="item.name"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="12" :xs="12" :sm="12" :xl="12">
            <el-form-item label="支付金额" prop="pay_money">
              <el-input
                style="width: 220px"
                placeholder="请输入金额"
                type="number"
                v-model="formData.pay_money"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="上传收据">
          <div class="img-upload">
            <el-upload
              class="upload-item"
              name="image"
              :headers="headers"
              :action="uploadImageUrl"
              :show-file-list="false"
              :on-error="handleUploadError"
              :on-success="handleUploadSuccess"
              :before-upload="beforeUpload"
            >
              <div v-if="formData.receipt_file" class="imgs">
                <img :src="formData.receipt_file" />
                <i class="del el-icon-close" @click.stop="hanldeDelete"></i>
              </div>
              <i
                v-if="!uploadLoading && !formData.receipt_file"
                class="el-icon-plus upload-item-icon"
              ></i>
              <i
                class="el-icon-loading upload-loading"
                v-if="uploadLoading"
              ></i>
            </el-upload>
            <div class="upload-desc">
              <p>支持jpg、jpeg、png、gif、bmp格式；</p>
            </div>
          </div>
        </el-form-item>
      </template>
      <!-- 退款 -->
      <template v-if="type === 2">
        <el-row>
          <el-col :lg="12" :xs="12" :sm="12" :xl="12">
            <el-form-item label="退费方式" prop="pay_type">
              <el-select
                v-model="formData.pay_type"
                placeholder="请选择退费方式"
              >
                <el-option
                  v-for="(item, index) in payTypes"
                  :key="index"
                  :label="item.name"
                  :value="item.name"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="12" :xs="12" :sm="12" :xl="12">
            <el-form-item label="退费金额" prop="money">
              <el-input
                style="width: 220px"
                placeholder="请输入金额"
                type="number"
                v-model="formData.money"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="退费原因" prop="tips">
          <el-input
            style="width: 80%"
            placeholder="请输入退费原因"
            type="textarea"
            v-model="formData.tips"
          ></el-input>
        </el-form-item>
      </template>
      <!-- 作废 -->
      <template v-if="type === 3">
        <el-form-item label="作废原因" prop="tips">
          <el-input
            style="width: 80%"
            placeholder="请输入作废原因"
            type="textarea"
            v-model="formData.tips"
          ></el-input>
        </el-form-item>
      </template>
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
import { uploadImageUrl } from "@/api/educational";
import { orderCollect, orderCancel } from "@/api/fina";
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    orderInfo: {
      type: Object,
      default: () => ({}),
    },
    type: {
      type: [String, Number],
      default: 1,
    },
  },
  data() {
    return {
      titleMap: {
        1: "收款",
        2: "申请退费",
        3: "申请作废",
      },
      uploadImageUrl,
      headers: {
        token: this.$store.state.user.token,
      },
      visible: this.value,
      payTypes: [
        {
          name: "现金",
        },
        {
          name: "微信",
        },
        {
          name: "支付宝",
        },
        {
          name: "聚合收单",
        },
      ],
      formData: {
        pay_type: "",
        pay_money: "",
        receipt_file: "",
        money: "",
        tips: "",
      },
      rules: {
        tips: [{ required: true, message: "请输入原因", trigger: "blur" }],
        money: [{ required: true, message: "请输入金额", trigger: "blur" }],
        pay_money: [{ required: true, message: "请输入金额", trigger: "blur" }],
        pay_type: [{ required: true, message: "请选择", trigger: "change" }],
      },
      addLoading: false,
      uploadLoading: false,
      projectOptions: [],
      staffOptions: [],
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },

  methods: {
    async submit() {
      this.addLoading = true;
      const apiMap = {
        1: orderCollect,
        2: orderCancel,
        3: orderCancel,
      };
      const dataMap = {
        1: {
          order_id: this.orderInfo.order_id,
          pay_type: this.formData.pay_type,
          pay_money: this.formData.pay_money,
          receipt_file: this.formData.receipt_file,
        },
        2: {
          status: 5, //订单状态 5：退费，4： 作废
          order_id: this.orderInfo.order_id,
          pay_type: this.formData.pay_type,
          money: this.formData.money,
          tips: this.formData.tips,
        },
        3: {
          status: 4, //订单状态 5：退费，4： 作废
          order_id: this.orderInfo.order_id,
          tips: this.formData.tips,
        },
      };
      const res = await apiMap[this.type](dataMap[this.type]).catch(() => {
        this.addLoading = false;
      });
      this.addLoading = false;
      if (res.code === 0) {
        this.$message.success(res.message);
        this.resetForm("formData");
        this.$emit("on-success");
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
      for (const k in this.formData) {
        this.formData[k] = "";
      }
      this.hanldeCancel();
    },
    hanldeCancel() {
      this.$emit("input", false);
    },

    handleUploadSuccess(res) {
      console.log(res);
      this.formData.receipt_file = res.data?.data?.url || "";
      this.uploadLoading = false;
    },
    handleUploadError() {
      this.formData.receipt_file = "";
      this.uploadLoading = false;
    },
    hanldeDelete() {
      this.formData.receipt_file = "";
    },
    beforeUpload(file) {
      const isImg = file.type.indexOf("image") !== -1;
      const isLt20M = file.size / 1024 / 1024 < 20;

      if (!isImg) {
        this.$message.error("请上传图片");
        return false;
      }
      if (!isLt20M) {
        this.$message.error("上传图片大小不能超过 20MB!");
        return false;
      }
      this.uploadLoading = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.collect-dialog {
  .img-upload {
    .upload-desc {
      p {
        line-height: 1.5;
        color: #909399;
      }
    }
    .upload-item {
      position: relative;
      width: calc(100% / 4);
    }
    .upload-item /deep/.el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .upload-item /deep/.el-upload:hover {
      border-color: #409eff;
    }
    .upload-item-icon,
    .upload-loading {
      font-size: 28px;
      color: hsl(215, 8%, 58%);
      width: 220px;
      height: 120px;
      line-height: 120px;
      text-align: center;
    }
    .imgs {
      padding: 5px;
      width: 220px;
      height: 120px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      .del {
        display: none;
        position: absolute;
        right: 0;
        top: 0;
        font-size: 20px;
      }
      &:hover {
        .del {
          color: #333;
          display: block;
        }
      }
    }
  }

  .order-info {
    margin-bottom: 10px;
    .info-list {
      display: flex;
      align-items: center;
      justify-content: space-around;
      flex-wrap: wrap;
      li {
        padding-left: 30px;
        width: calc(100% / 3);
        margin-bottom: 10px;
      }
    }
  }
}
</style>