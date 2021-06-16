<template>
  <!--添加子项目-->
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="800px"
    class="live-dialog"
    @open="handleOpen"
    :close-on-click-modal="false"
    @closed="resetForm('formData')"
  >
    <el-form
      label-width="80px"
      :model="formData"
      :rules="rules"
      ref="formData"
      v-loading="detaiLoading"
      class="question-bank-form"
    >
      <el-form-item label="项目名称" prop="project_name">
        <el-input
          v-model="formData.project_name"
          placeholder="请输入项目名称"
          type="text"
          maxlength="30"
        />
      </el-form-item>
      <el-form-item label="项目价格" prop="price">
        <el-input
          v-model="formData.price"
          placeholder="请输入项目价格"
          type="number"
        />
      </el-form-item>

      <el-form-item label="最低价格" prop="lowest_price">
        <el-input
          v-model="formData.lowest_price"
          placeholder="请输入项目最低价格"
          type="number"
        />
      </el-form-item>
      <el-form-item label="是否启用">
        <el-radio-group v-model="formData.status">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="2">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="服务类型">
        <el-radio-group
          v-model="formData.service_type"
          @change="handleTypeChange"
        >
          <el-radio :label="1">服务时长</el-radio>
          <el-radio :label="2">有效期限</el-radio>
          <p style="height: 10px"></p>
          <el-select
            v-if="formData.service_type == 1"
            v-model="formData.service_period"
            placeholder="请选择服务时长"
            filterable
            clearable
          >
            <el-option
              v-for="item in timeOptions"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            >
            </el-option>
          </el-select>
          <el-date-picker
            v-else
            v-model="formData.service_effective"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-radio-group>
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
import { getChildSubDetail, updateChildSub, createChildSub } from "@/api/sou";
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    id: {
      type: [String, Number],
      default: "",
    },
    parentId: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      visible: this.value,
      formData: {
        project_name: "",
        price: "",
        lowest_price: "",
        service_type: 1,
        service_period: "",
        service_effective: "",
        status: 2,
      },
      rules: {
        project_name: [
          { required: true, message: "请输入项目名称", trigger: "blur" },
        ],
        price: [{ required: true, message: "请输入项目价格", trigger: "blur" }],
        lowest_price: [
          { required: true, message: "请输入项目最低价格", trigger: "blur" },
        ],

        parent_id: [{ required: true, message: "请选择", trigger: "change" }],
      },
      addLoading: false,
      detaiLoading: false,
      timeOptions: [
        {
          id: 1,
          value: "1年",
        },
        {
          id: 2,
          value: "2年",
        },
        {
          id: 3,
          value: "3年",
        },
        {
          id: 4,
          value: "永久",
        },
      ],
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },

  methods: {
    handleTypeChange() {
      this.formData.service_period = "";
      this.formData.service_effective = "";
    },
    // dialog 打开时
    handleOpen() {
      if (this.id) {
        this.getChildSubDetail();
      }
    },

    // 项目详情
    async getChildSubDetail() {
      const data = {
        project_id: this.id,
      };
      this.detaiLoading = true;
      const res = await getChildSubDetail(data).catch(() => {
        this.detaiLoading = false;
      });
      this.detaiLoading = false;
      if (res.code === 0) {
        for (const k in this.formData) {
          this.formData[k] = res.data[k];
        }
      }
    },
    async submit() {
      const data = {
        ...this.formData,
        parent_id: Array.isArray(this.formData.parent_id)
          ? [...this.formData.parent_id].pop()
          : this.formData.parent_id,
      };
      if (this.id) {
        data.project_id = this.id;
      } else {
        data.parent_id = this.parentId;
      }
      const api = this.id ? updateChildSub : createChildSub;
      this.addLoading = true;
      const res = await api(data).catch(() => {
        this.addLoading = false;
      });
      this.addLoading = false;
      if (res.code === 0) {
        this.$message.success(res.message);
        this.resetForm("formData");
        this.$emit("on-success", this.parentId);
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
      for (const k in this.formData) {
        this.formData[k] = "";
      }
      this.$refs[formName].resetFields();
      this.hanldeCancel();
    },
    hanldeCancel() {
      this.$emit("input", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.live-dialog {
  .w-100 {
    width: 100%;
  }
  .question-bank-form {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .el-form-item {
      width: 48%;
    }
  }
}
</style>