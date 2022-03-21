<template>
  <el-dialog
    title="添加回款计划"
    :visible="value"
    width="1000px"
    @open="handleOpen"
    :close-on-click-modal="false"
    @close="handleClose"
    @closed="resetForm('formData')"
    append-to-body
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
          label="序号"
          show-overflow-tooltip
          min-width="50"
          align="center"
          type="index"
        >
        </el-table-column>
        <el-table-column
          label="回款类型"
          show-overflow-tooltip
          min-width="80"
          align="center"
        >
          <template slot-scope="{ row, $index: index }">
            <el-form-item
              :rules="[
                { required: true, message: `请选择`, trigger: 'change' },
              ]"
              :prop="`tableData[${index}].type`"
            >
              <el-select v-model="row.type" placeholder="请选择" filterable>
                <el-option
                  v-for="item in typeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          label="所属年份"
          show-overflow-tooltip
          min-width="120"
          align="center"
        >
          <template slot-scope="{ row, $index: index }">
            <el-form-item
              :rules="[
                { required: true, message: `请选择`, trigger: 'change' },
              ]"
              :prop="`tableData[${index}].year`"
            >
              <el-select v-model="row.year" placeholder="请选择" filterable>
                <el-option
                  v-for="item in yearOptions"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          label="计划回款日期"
          min-width="200"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="{ row, $index: index }">
            <el-form-item
              :rules="[
                { required: true, message: `请选择`, trigger: 'change' },
              ]"
              :prop="`tableData[${index}].day`"
            >
              <el-date-picker
                class="input"
                type="date"
                placeholder="选择日期"
                v-model="row.day"
                value-format="yyyy-MM-dd"
                :picker-options="{
                  disabledDate: disabledDate,
                }"
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
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
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
import { createOrderPayPlan } from "@/api/crm";
import { getPlanYearOptions } from "@/utils/date";
export default {
  name: "AddCollectionPlan",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    orderId: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      formData: {
        tableData: [
          {
            type: "",
            year: "",
            day: "",
            money: "",
          },
        ],
      },
      addLoading: false,
      yearOptions: getPlanYearOptions(),
      typeOptions: [
        {
          value: 1,
          label: "学费",
        },
        {
          value: 2,
          label: "报考费",
        },
        {
          value: 3,
          label: "教材费",
        },
        {
          value: 4,
          label: "平台费",
        },
        {
          value: 5,
          label: "考前辅导费",
        },
        {
          value: 6,
          label: "教务服务费",
        },
        {
          value: 7,
          label: "论文指导费",
        },
        {
          value: 8,
          label: "论文答辩费",
        },
      ],
    };
  },
  methods: {
    handleOpen() {},
    disabledDate(e) {
      return Date.now() - 86400000 > e.getTime();
    },
    handleDelRow(index) {
      this.formData.tableData.splice(index, 1);
    },
    handleAddRow() {
      this.formData.tableData.push({
        type: "",
        year: "",
        day: "",
        money: "",
      });
    },
    async submit() {
      const data = {
        data: JSON.stringify(this.formData.tableData),
      };
      if (this.orderId) {
        data.order_id = this.orderId;
      }
      this.addLoading = true;
      const res = await createOrderPayPlan(data).catch(() => {
        this.addLoading = false;
      });
      this.addLoading = false;
      if (res.code === 0) {
        this.$message.success(res.message);
        this.$emit("on-success", res.data);
        this.handleClose();
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
          type: "",
          year: "",
          day: "",
          money: "",
        },
      ];
    },
    handleClose() {
      this.$emit("input", false);
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