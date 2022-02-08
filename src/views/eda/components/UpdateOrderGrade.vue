<template>
  <el-dialog
    title="修改届别"
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
      <el-form-item label="届别名称" prop="jiebie_id">
        <el-select v-model="formData.jiebie_id" placeholder="请选届别">
          <el-option
            v-for="item in gradeOptions"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          >
          </el-option>
        </el-select>
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
import { getGradeOptions, updateBatchOrderGrade } from "@/api/sou";
export default {
  name: "UpdateOrderGrade",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    orderIds: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      addLoading: false,
      gradeOptions: [],
      formData: {
        jiebie_id: "",
      },
      rules: {
        jiebie_id: [{ required: true, message: "请选择", trigger: "change" }],
      },
    };
  },

  methods: {
    handleOpen() {
      this.getGradeOptions();
    },
    // 获取届别选项
    async getGradeOptions() {
      const res = await getGradeOptions();
      if (res.code === 0) {
        this.gradeOptions = res.data;
      }
    },
    async submit() {
      const data = {
        ...this.formData,
        order_id_arr: this.orderIds,
      };
      this.addLoading = true;
      const res = await updateBatchOrderGrade(data).catch(() => {
        this.addLoading = false;
      });
      this.addLoading = false;
      if (res.code === 0) {
        this.$message.success(res.message);
        this.$emit("on-success");
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