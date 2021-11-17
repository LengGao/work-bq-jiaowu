<template>
  <el-dialog
    title="添加学生"
    :visible.sync="visible"
    width="1100px"
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
      <Title text="学生信息"></Title>
      <template>
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
        <el-form-item label="身份证号" prop="account">
          <el-input
            class="input"
            type="number"
            v-model="formData.account"
            placeholder="请输入身份证号"
          />
        </el-form-item>
      </template>
      <el-form-item label="机构名称" prop="title">
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
      <el-form-item label="所属老师" prop="title">
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
      <Title text="开课信息"></Title>
      <el-form-item label="报名类型" prop="type">
        <el-radio-group class="input" v-model="formData.type">
          <el-radio :label="1">职业教育</el-radio>
          <el-radio :label="2">学历教育</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="报名项目" prop="account" class="block">
        <el-input v-model="formData.account" placeholder="请输入内容" />
      </el-form-item>
      <div class="table">
        <!-- 职业教育 -->
        <el-table
          v-if="formData.type === 1"
          :data="[{ price: 1 }]"
          :header-cell-style="{
            'text-align': 'center',
            'background-color': '#f8f8f8',
          }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column label="序号" min-width="70" type="index">
          </el-table-column>
          <el-table-column
            label="项目名称"
            show-overflow-tooltip
            min-width="150"
            prop="project_name"
          >
          </el-table-column>
          <el-table-column
            label="所属分类"
            show-overflow-tooltip
            min-width="150"
            prop="project_name"
          >
          </el-table-column>
          <el-table-column
            prop="price"
            label="项目价格"
            min-width="110"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <div>￥{{ row.price }}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" min-width="200">
            <template slot-scope="{ row }">
              <div style="display: flex; justify-content: center">
                <el-button type="text">删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!-- 学历教育 -->
        <el-table
          v-else
          :data="[{ price: 1 }]"
          :header-cell-style="{
            'text-align': 'center',
            'background-color': '#f8f8f8',
          }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column label="序号" min-width="70" type="index">
          </el-table-column>
          <el-table-column
            label="学历形式"
            show-overflow-tooltip
            min-width="150"
            prop="project_name"
          >
          </el-table-column>
          <el-table-column
            label="院校名称"
            show-overflow-tooltip
            min-width="150"
            prop="project_name"
          >
          </el-table-column>
          <el-table-column
            label="层次名称"
            show-overflow-tooltip
            min-width="150"
            prop="project_name"
          >
          </el-table-column>
          <el-table-column
            label="专业名称"
            show-overflow-tooltip
            min-width="150"
            prop="project_name"
          >
          </el-table-column>
          <el-table-column
            label="关联项目"
            show-overflow-tooltip
            min-width="150"
            prop="project_name"
          >
          </el-table-column>
          <el-table-column
            prop="price"
            label="总学费"
            min-width="110"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <div>￥{{ row.price }}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" min-width="200">
            <template slot-scope="{ row }">
              <div style="display: flex; justify-content: center">
                <el-button type="text">删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="info">
        <div class="info-item">
          <span class="info-item-name">课程名称：</span>
          <span class="info-item-value">系统集成项目管理工程师（中级）</span>
        </div>
        <div class="info-item">
          <span class="info-item-name">课程名称：</span>
          <span class="info-item-value"
            >系统集成项目管理工程师（中级）系统集成项目管理工程师（中级）系统集成项目管理工程师（中级）系统集成项目管理工程师（中级）系统集成项目管理工程师（中级）系统集成项目管理工程师（中级）系统集成项目管理工程师（中级）系统集成项目管理工程师（中级）</span
          >
        </div>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hanldeCancel">取 消</el-button>
      <el-button
        type="primary"
        :loading="addLoading"
        @click="submitForm('formData')"
        >开 课</el-button
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