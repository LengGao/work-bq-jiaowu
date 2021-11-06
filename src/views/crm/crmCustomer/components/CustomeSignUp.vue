<template>
  <el-dialog
    title="客户报名"
    :visible.sync="visible"
    width="1200px"
    @open="handleOpen"
    :close-on-click-modal="false"
    @closed="resetForm('formData')"
    top="5vh"
  >
    <el-form
      label-width="100px"
      :model="formData"
      :rules="rules"
      inline
      ref="formData"
    >
      <Title text="订单信息"></Title>
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
      <el-form-item label="身份证号码" prop="account">
        <el-input
          class="input"
          type="number"
          v-model="formData.account"
          placeholder="请输入身份证号码"
        />
      </el-form-item>
      <el-form-item label="报名类型" prop="type">
        <el-radio-group class="input" v-model="formData.type">
          <el-radio :label="1">职业教育</el-radio>
          <el-radio :label="2">学历教育</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="报名项目" prop="resource">
        <el-cascader
          class="input"
          v-model="formData.project"
          :options="[]"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="订单金额" prop="resource">
        <el-input
          type="number"
          class="input"
          v-model="formData.account"
          placeholder="请输入订单金额"
        />
      </el-form-item>
      <el-form-item label="共享业绩" prop="title">
        <el-select class="input" v-model="formData.title" placeholder="请选择">
          <el-option
            v-for="item in eduOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <tempalte v-if="formData.type === 2">
        <el-form-item label="考前辅导费" prop="title">
          <el-input
            class="input"
            v-model="formData.title"
            type="number"
            placeholder="请输入考前辅导费"
          />
        </el-form-item>
        <el-form-item label="报考费" prop="title">
          <el-input
            class="input"
            v-model="formData.title"
            type="number"
            placeholder="请输入报考费"
          >
            <template slot="append">元/科</template>
          </el-input>
        </el-form-item>
        <el-form-item label="教材费" prop="title">
          <el-input
            class="input"
            v-model="formData.title"
            type="number"
            placeholder="请输入教材费"
          >
            <template slot="append">元/年</template>
          </el-input>
        </el-form-item>
        <el-form-item label="毕设指导费" prop="title">
          <el-input
            class="input"
            v-model="formData.title"
            type="number"
            placeholder="请输入毕设指导费"
          />
        </el-form-item>
        <el-form-item label="论文答辩费" prop="title">
          <el-input
            class="input"
            v-model="formData.title"
            type="number"
            placeholder="请输入论文答辩费"
          />
        </el-form-item>
        <el-form-item label="平台费" prop="title">
          <el-input
            class="input"
            v-model="formData.title"
            type="number"
            placeholder="请输入平台费"
          />
        </el-form-item>
        <el-form-item label="其他费用" prop="title">
          <el-input
            class="input"
            v-model="formData.title"
            type="number"
            placeholder="请输入其他费用"
          />
        </el-form-item>
      </tempalte>

      <el-form-item label="备注信息" prop="account" class="block">
        <el-input
          class="remark"
          type="textarea"
          v-model="formData.account"
          placeholder="请输入内容"
        />
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
      <div>
        <Title text="回款信息"></Title>
        <el-form-item label="回款期次" prop="region">
          <el-select
            class="input"
            v-model="formData.region"
            placeholder="请选择回款期次"
          >
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
          <el-button type="text" style="margin-left: 10px" title="配置回款计划"
            >配置</el-button
          >
        </el-form-item>
        <el-form-item label="回款金额" prop="title">
          <el-input
            class="input"
            v-model="formData.title"
            type="number"
            placeholder="请输入回款金额"
          />
        </el-form-item>
        <el-form-item label="支付方式" prop="pay_type">
          <el-select
            v-model="formData.pay_type"
            placeholder="请选择支付方式"
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
      </div>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="hanldeCancel">取 消</el-button>
      <el-button
        type="primary"
        :loading="addLoading"
        @click="submitForm('formData')"
        >提 交</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import { payWays } from "@/utils";
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
      payWays,
      visible: this.value,
      formData: {
        title: "",
        type: "",
      },
      rules: {
        title: [{ required: true, message: "请选择", trigger: "blur" }],
      },
      addLoading: false,
      fromOptions: [],
      eduOptions: [],
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
  width: 240px;
}
.table {
  margin-bottom: 20px;
}
/deep/.el-form-item {
  margin-right: 30px;
}
.block {
  width: 100%;
  /deep/.el-form-item__content {
    width: 80%;
  }
}
</style>