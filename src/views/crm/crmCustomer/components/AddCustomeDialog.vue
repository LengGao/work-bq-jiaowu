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

      <el-form-item label="手机号码" prop="mobile">
        <el-input
          class="input"
          type="number"
          v-model="formData.mobile"
          placeholder="请输入手机号码"
        />
      </el-form-item>
      <el-form-item label="客户来源" prop="from">
        <el-select
          v-model="formData.from"
          filterable
          clearable
          placeholder="请选择客户来源"
        >
          <el-option
            v-for="item in fromOptions"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="客户性别" prop="sex">
        <el-radio-group class="input" v-model="formData.sex">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="客户地区">
        <el-cascader
          v-model="formData.address"
          placeholder="请选地区"
          filterable
          clearable
          size="large"
          :options="regionData"
          @change="handleAddressChange"
        >
        </el-cascader>
      </el-form-item>

      <el-form-item label="文化程度" prop="education">
        <el-select
          v-model="formData.education"
          filterable
          clearable
          placeholder="请选择文化程度"
        >
          <el-option
            v-for="item in eduOptions"
            :key="item.value"
            :label="item.label"
            :value="item.label"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item
        :label="item.field_text"
        :prop="item.field_name"
        v-for="item in customFiled"
        :key="item.field_id"
        :rules="[
          {
            required: item.required === 1,
            message: ['select', 'multi_select'].includes(item.field_type)
              ? '请选择'
              : '请输入',
            trigger: ['select', 'multi_select'].includes(item.field_type)
              ? 'change'
              : 'blur',
          },
        ]"
      >
        <CustomFormItem
          filterable
          clearable
          class="input"
          v-model="formData[item.field_name]"
          :data="item"
        />
      </el-form-item> -->
      <el-form-item label="客户标签" prop="tags" class="block">
        <el-tag
          class="customer-tag"
          :type="item.checked ? '' : 'info'"
          v-for="(item, index) in tags"
          :key="index"
          @click="handleTagClick(item)"
          >{{ item.title }}
          <!-- <i
            class="el-icon-circle-close icon-del"
            @click.stop="delConfirm(index)"
          ></i> -->
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
      <el-form-item label="备注信息" prop="tips" class="block">
        <el-input
          class="remark"
          type="textarea"
          v-model="formData.tips"
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
        >保 存</el-button
      >
      <el-button
        type="primary"
        :loading="addLoading"
        @click="submitForm('formData', true)"
        >保存并报名</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import { regionData } from "element-china-area-data";
import { createCrmCustomer, getCrmTags } from "@/api/crm";
import CustomFormItem from "./CustomFormItem";
export default {
  name: "AddCustomeDialog",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    fromOptions: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    CustomFormItem,
  },
  data() {
    return {
      regionData,
      visible: this.value,
      formData: {
        name: "",
        mobile: "",
        sex: 1,
        education: "",
        tags: "",
        tips: "",
        from: "",
        province: "",
        city: "",
        district: "",
        address: [],
      },
      rules: {
        name: [{ required: true, message: "请输入", trigger: "blur" }],
        mobile: [
          { required: true, message: "请输入", trigger: "blur" },
          {
            validator: function (rule, value, callback) {
              if (/^1\d{10}$/.test(value) == false) {
                callback(new Error("请输入正确的手机号"));
              } else {
                callback();
              }
            },
            trigger: "change",
          },
        ],
        from: [{ required: true, message: "请选择", trigger: "change" }],
      },
      addLoading: false,
      fromOptions: [],
      eduOptions: [
        {
          value: 1,
          label: "初中及以下",
        },
        {
          value: 2,
          label: "中专/中技",
        },
        {
          value: 3,
          label: "高中",
        },
        {
          value: 4,
          label: "高中",
        },
        {
          value: 5,
          label: "大专",
        },
        {
          value: 6,
          label: "本科",
        },
        {
          value: 7,
          label: "研究生及以上",
        },
      ],
      tags: [],
      inputVisible: false,
      tagName: "",
      // customFiled: [],
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },
  methods: {
    // // 获取自定义字段
    // async getCustomfieldList() {
    //   const data = {
    //     output_type: 1,
    //   };
    //   const res = await getCustomfieldList(data);
    //   res.data.forEach((item) => {
    //     this.$set(this.formData, item.field_name, "");
    //   });
    //   this.customFiled = res.data;
    // },
    handleOpen() {
      this.getCrmTags();
    },
    async getCrmTags() {
      const data = {
        type: 1,
      };
      const res = await getCrmTags(data);
      if (res.code === 0) {
        this.tags = res.data.tags.map((item) => ({
          title: item,
          checked: false,
        }));
      }
    },

    handleAddressChange(value) {
      console.log(value); // ["110000", "110100", "110101"]
      //CodeToText是个大对象，属性是区域码，属性值是汉字 用法例如：CodeToText['110000']输出北京市
      // console.log(
      //   CodeToText[value[0]],
      //   CodeToText[value[1]],
      //   CodeToText[value[2]]
      // ) //北京市 市辖区 东城区
      this.formData.province = value[0];
      this.formData.city = value[1];
      this.formData.district = value[2];
    },
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
          checked: true,
        });
      }
      this.inputVisible = false;
      this.tagName = "";
    },
    handleTagClick(row) {
      row.checked = !row.checked;
    },
    async submit(isSignUp) {
      const { address, ...data } = this.formData;
      this.addLoading = true;
      const res = await createCrmCustomer({
        ...data,
        tags: this.tags
          .filter((item) => item.checked)
          .map(({ title }) => title)
          .join(","),
      }).catch(() => {
        this.addLoading = false;
      });
      this.addLoading = false;
      if (res.code === 0) {
        this.$message.success(res.message);
        this.visible = false;
        this.$emit("on-success", isSignUp, res.data);
      }
    },
    submitForm(formName, isSignUp) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submit(isSignUp);
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      for (const k in this.formData) {
        this.formData[k] = "";
      }
      this.formData.address = [];
      this.formData.sex = 1;
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