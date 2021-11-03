<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="1000px"
    @open="handleOpen"
    :close-on-click-modal="false"
    @closed="resetForm('formData')"
  >
    <el-form
      class="table-form"
      label-width="0"
      ref="formData"
      :model="formData"
    >
      <el-table
        :data="formData.tableData"
        :header-cell-style="{
          'text-align': 'center',
          'background-color': '#f8f8f8',
        }"
      >
        <el-table-column
          label="回款期次"
          show-overflow-tooltip
          min-width="100"
          align="center"
          type="index"
        >
        </el-table-column>
        <el-table-column
          label="计划回款时间"
          min-width="200"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="{ row, $index: index }">
            <el-form-item
              :rules="[
                { required: true, message: `请选择`, trigger: 'change' },
              ]"
              :prop="`tableData[${index}].date`"
            >
              <el-date-picker
                class="input"
                type="date"
                placeholder="选择日期"
                v-model="row.date"
              ></el-date-picker>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          label="计划回款金额"
          align="center"
          min-width="160"
          show-overflow-tooltip
        >
          <template slot-scope="{ row, $index: index }">
            <el-form-item
              :rules="[{ required: true, message: `请输入`, trigger: 'blur' }]"
              :prop="`tableData[${index}].money`"
            >
              <el-input
                v-model="row.money"
                placeholder="请输入"
                type="number"
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          label="备注信息"
          align="center"
          min-width="200"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <el-form-item>
              <el-input v-model="row.remark" placeholder="请输入" />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          align="center"
          min-width="100"
        >
          <template slot-scope="{ $index: index }">
            <el-button
              @click="handleDelRow(index)"
              class="btn"
              type="text"
              :disabled="formData.tableData.length <= 1"
              icon="el-icon-remove-outline"
            ></el-button>
            <el-button
              @click="handleAddRow"
              class="btn"
              type="text"
              icon="el-icon-circle-plus-outline"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="tips">
        <div class="tips-item tips-type">
          <span>回款提醒：</span>
          <el-select
            v-model="formData.pay_type"
            placeholder="请选择"
            class="input"
            filterable
          >
            <el-option
              v-for="item in tipOptions"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            >
            </el-option>
          </el-select>
        </div>
        <div class="tips-item">
          <span>总计划期次：</span>
          <span>3期</span>
        </div>
        <div class="tips-item">
          <span>总回款金额：</span>
          <span>¥ 7800.00</span>
        </div>
        <div class="tips-item">
          <span>总回款占比：</span>
          <span>100%</span>
        </div>
      </div>
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
import { updateClassType, createClassType } from "@/api/institution";
export default {
  name: "institutionDialog",
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
  },
  data() {
    return {
      visible: this.value,
      formData: {
        pay_type: "",
        tableData: [
          {
            date: "",
            money: "",
            remark: "",
          },
        ],
      },
      addLoading: false,
      tipOptions: [
        {
          label: "准时提醒",
          value: "",
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
    handleDelRow(index) {
      this.formData.tableData.splice(index, 1);
    },
    handleAddRow() {
      this.formData.tableData.push({
        date: "",
        money: "",
        remark: "",
      });
    },
    handleOpen() {},
    addOption() {
      this.formData.options.push({
        label: "",
        id: Date.now(),
      });
    },
    delOption(index) {
      this.formData.options.splice(index, 1);
    },
    async submit() {
      const data = {
        title: this.formData.title,
        remark: this.formData.remark,
      };
      if (this.id) {
        data.id = this.id;
      }
      const api = this.id ? updateClassType : createClassType;
      this.addLoading = true;
      const res = await api(data).catch(() => {
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
      this.formData.tableData = [
        {
          date: "",
          money: "",
          remark: "",
        },
      ];
      this.$emit("input", false);
    },
    hanldeCancel() {
      this.visible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.table-form {
  border: 1px solid #eee;
  /deep/.el-table td {
    padding: 16px 0 0 0;
  }
  .el-form-item {
    margin-bottom: 16px;
  }
  .btn {
    margin-top: -10px;
    padding: 6px 0;
    font-size: 20px;
  }
  .tips {
    display: flex;
    align-items: center;
    padding: 10px 16px 10px 0;
    background-color: #f2f6fc;
    &-item {
      margin-left: 16px;
    }
    &-type {
      margin-right: auto;
    }
  }
}
</style>