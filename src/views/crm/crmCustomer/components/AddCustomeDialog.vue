<template>
  <el-dialog
    title="添加客户"
    :visible.sync="visible"
    width="750px"
    @open="handleOpen"
    :close-on-click-modal="false"
    @closed="resetForm('formData')"
  >
    <el-form
      label-width="100px"
      :model="formData"
      :rules="rules"
      inline
      ref="formData"
    >
      <el-form-item label="客户姓名" prop="name">
        <el-input
          v-model="formData.name"
          class="input"
          placeholder="请输入客户姓名"
        />
      </el-form-item>

      <el-form-item label="手机号码" prop="account">
        <el-input
          class="input"
          type="number"
          v-model="formData.account"
          placeholder="请输入手机号码"
        />
      </el-form-item>
      <el-form-item label="客户来源" prop="title">
        <el-select v-model="formData.title" placeholder="请选择">
          <el-option
            v-for="item in fromOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="客户性别" prop="resource">
        <el-radio-group v-model="formData.resource">
          <el-radio label="1">男</el-radio>
          <el-radio label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="客户地区" prop="account">
        <el-input
          class="input"
          v-model="formData.account"
          placeholder="所属省/市/区"
        />
      </el-form-item>
      <el-form-item label="文化程度" prop="title">
        <el-select v-model="formData.title" placeholder="请选择文化程度">
          <el-option
            v-for="item in eduOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="客户标签" prop="account" class="block">
        <el-tag
          class="customer-tag"
          :type="item.checked ? '' : 'info'"
          v-for="(item, index) in tags"
          :key="index"
          @click="handleTagClick(item)"
          >{{ item.title }}
          <i
            class="el-icon-circle-close icon-del"
            @click.stop="delConfirm(index)"
          ></i>
        </el-tag>
        <el-input
          class="tag-input"
          v-focus
          v-if="inputVisible"
          v-model="tagName"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button
          v-else
          class="button-new-tag"
          size="small"
          @click="inputVisible = true"
          >新建标签</el-button
        >
      </el-form-item>
      <el-form-item label="备注信息" prop="account" class="block">
        <el-input
          class="remark"
          type="textarea"
          v-model="formData.account"
          placeholder="请输入内容"
        />
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
import { createClassType } from "@/api/institution";
export default {
  name: "AddCustomeDialog",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      visible: this.value,
      formData: {
        title: "",
      },
      rules: {
        title: [{ required: true, message: "请选择", trigger: "blur" }],
      },
      addLoading: false,
      fromOptions: [],
      eduOptions: [],
      tags: [
        {
          title: "标签1",
          checked: false,
        },
        {
          title: "标签2",
          checked: false,
        },
        {
          title: "标签3",
          checked: false,
        },
      ],
      inputVisible: false,
      tagName: "",
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },
  methods: {
    handleOpen() {},
    //删除
    delConfirm(index) {
      this.$confirm("确定要删除此标签吗?", "提示", {
        type: "warning",
      })
        .then(() => {
          this.handleDelTag(index);
        })
        .catch(() => {});
    },
    handleDelTag(index) {
      this.tags.splice(index, 1);
    },
    handleInputConfirm() {
      let title = this.tagName;
      if (title) {
        this.tags.push({
          title,
          checked: false,
        });
      }
      this.inputVisible = false;
      this.tagName = "";
    },
    handleTagClick(row) {
      row.checked = !row.checked;
    },
    async submit() {
      const data = {
        title: this.formData.title,
        remark: this.formData.remark,
      };
      this.addLoading = true;
      const res = await createClassType(data).catch(() => {
        this.addLoading = false;
      });
      this.addLoading = false;
      if (res.code === 0) {
        this.$message.success(res.message);
        this.visible = false;
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
      this.formData.items = [];
      this.$emit("input", false);
    },
    hanldeCancel() {
      this.visible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.input {
  width: 217px;
}
.customer-tag {
  position: relative;
  margin-right: 10px;
  cursor: pointer;
  .icon-del {
    display: none;
    font-size: 16px;
    position: absolute;
    right: -6px;
    top: -6px;
  }
  &:hover {
    .icon-del {
      display: block;
    }
  }
}
.tag-input {
  width: 120px;
  height: 32px;
}
.block {
  width: 100%;
  /deep/.el-form-item__content {
    width: 80%;
  }
}
</style>