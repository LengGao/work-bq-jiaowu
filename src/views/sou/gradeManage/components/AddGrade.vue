<template>
  <el-dialog
    :title="`${isEdit ? '编辑' : '添加'}届别`"
    :visible="value"
    width="400px"
    @open="handleOpen"
    :close-on-click-modal="false"
    @closed="resetForm('formData')"
    @close="hanldeClose"
  >
    <el-form
      label-width="100px"
      :model="formData"
      :rules="rules"
      inline
      ref="formData"
    >
      <el-form-item label="届别名称" prop="title">
        <el-input
          v-model="formData.title"
          class="input"
          placeholder="请输入届别名称"
        />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hanldeClose">取 消</el-button>
      <el-button
        type="primary"
        :loading="addLoading"
        @click="submitForm('formData')"
        >保 存</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import { addGrade, updateGrade } from "@/api/sou";
export default {
  name: "AddGrade",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    editData: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      addLoading: false,
      formData: {
        title: "",
      },
      rules: {
        title: [{ required: true, message: "请选择", trigger: "change" }],
      },
    };
  },
  computed: {
    isEdit() {
      return !!this.editData.id;
    },
  },
  methods: {
    handleOpen() {
      if (this.isEdit) {
        this.formData.title = this.editData.title;
      }
    },

    async submit() {
      const data = {
        ...this.formData,
      };
      let requestApi = addGrade;
      if (this.isEdit) {
        data.id = this.editData.id;
        requestApi = updateGrade;
      }
      this.addLoading = true;
      const res = await requestApi(data).catch(() => {
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
      for (const k in this.formData) {
        this.formData[k] = "";
      }
    },
    hanldeClose() {
      this.$emit("input", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.input {
  width: 217px;
}
.user-form {
  display: flex;
  align-items: center;
  margin-bottom: 22px;
  .el-form-item {
    margin-bottom: 0;
  }
  .from-actions {
    i {
      font-size: 24px;
      margin-left: 10px;
      cursor: pointer;
      &.add {
        color: #199fff;
      }
      &.del {
        color: #ff4e00;
      }
    }
  }
}

.block {
  width: 100%;
  /deep/.el-form-item__content {
    width: 80%;
  }
}
.info {
  padding-top: 10px;
  &-item {
    display: flex;
    padding: 6px 0;
    &-name {
      flex-shrink: 0;
    }
    &-value {
      color: #199fff;
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
</style>