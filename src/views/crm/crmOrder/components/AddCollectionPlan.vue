<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="1000px"
    @open="handleOpen"
    :close-on-click-modal="false"
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
import { createOrderPayPlan } from "@/api/crm";
export default {
  name: "AddCollectionPlan",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    orderId: {
      type: [String, Number],
      default: "",
    },
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      visible: this.value,
      formData: {
        tableData: [
          {
            day: "",
            money: "",
          },
        ],
      },
      addLoading: false,
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },
  methods: {
    disabledDate(e) {
      return Date.now() - 86400000 > e.getTime();
    },
    handleDelRow(index) {
      this.formData.tableData.splice(index, 1);
    },
    handleAddRow() {
      this.formData.tableData.push({
        day: "",
        money: "",
      });
    },
    handleOpen() {
      if (this.data.length) {
        this.formData.tableData = this.data.map(({ day, money }) => ({
          day,
          money,
        }));
      }
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
        this.visible = false;
        this.$emit("on-success", res.data);
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
          day: "",
          money: "",
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