<template>
  <el-dialog
    :title="`${planEditData.id ? '编辑' : '配置'}回款计划`"
    :visible="value"
    width="1200px"
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
                  v-for="(label, value) in expenseType"
                  :key="value"
                  :label="label"
                  :value="+value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip min-width="200" align="center">
          <template slot="header">
            <span>所属项目 </span>
            <el-tooltip
              class="item"
              effect="dark"
              content="除学费外的其他费用都必须选择费用所属项目"
              placement="top-start"
            >
              <i class="el-icon-question"></i>
            </el-tooltip>
          </template>
          <template slot-scope="{ row, $index: index }">
            <el-form-item
              :rules="[
                {
                  required: row.type != 1,
                  message: `请选择`,
                  trigger: 'change',
                },
              ]"
              :prop="`tableData[${index}].checkedProjectIds`"
            >
              <el-select
                v-if="row.type != 1"
                v-model="row.checkedProjectIds"
                placeholder="请选择项目"
                filterable
                multiple
              >
                <el-option
                  v-for="item in projectOptions"
                  :key="item.id"
                  :label="
                    data.type
                      ? `${item.project.value}-${item.major.value}`
                      : item.project_name
                  "
                  :value="item.id + ''"
                >
                </el-option>
              </el-select>
              <span v-else>{{ row.project_name }}</span>
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
              <el-select
                v-model="row.year"
                placeholder="请选择"
                @change="getDateByYearMixin($event, row)"
                filterable
              >
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
          min-width="180"
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
                type="date"
                placeholder="选择日期"
                v-model="row.day"
                value-format="yyyy-MM-dd"
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
                @mousewheel.native.prevent
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          align="center"
          min-width="100"
          v-if="!planEditData.id"
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
import { createOrderPayPlan, updateOrderPayPlan } from "@/api/crm";
import { getPlanYearOptions, currentYear, today } from "@/utils/date";
import { mapGetters } from "vuex";
export default {
  name: "AddCollectionPlan",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: () => ({}),
    },
    planEditData: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      formData: {
        tableData: [],
      },
      addLoading: false,
      yearOptions: getPlanYearOptions(),
    };
  },
  computed: {
    ...mapGetters(["expenseType"]),
    projectOptions() {
      return JSON.parse(this.data?.project || "[]");
    },
  },
  methods: {
    handleOpen() {
      if (this.planEditData.id) {
        const {
          major_detail_ids = "",
          project_ids = "",
          ...rest
        } = this.planEditData;
        const ids = this.data.type === 1 ? major_detail_ids : project_ids;
        this.formData.tableData = [
          {
            ...rest,
            checkedProjectIds: ids.split(ids ? "," : ""),
          },
        ];
      } else {
        this.formData.tableData = [
          {
            type: "",
            year: currentYear,
            checkedProjectIds: this.initProjectIds(),
            day: today,
            money: "",
          },
        ];
      }
    },
    initProjectIds() {
      return JSON.parse(this.data?.project || "[]").map((item) => item.id + "");
    },
    // 修改计划
    async updateOrderPayPlan(row) {
      const { id, type, year, day, money, checkedProjectIds } = row;
      const data = {
        id,
        type,
        year,
        day,
        money,
        project_ids: checkedProjectIds.join(","),
      };
      this.addLoading = true;
      const res = await updateOrderPayPlan(data).catch(() => {});
      this.addLoading = false;
      if (res.code === 0) {
        this.$message.success(res.message);
        this.$emit("on-success");
        this.handleClose();
      }
    },
    handleDelRow(index) {
      this.formData.tableData.splice(index, 1);
    },
    handleAddRow() {
      this.formData.tableData.push({
        type: "",
        year: currentYear,
        checkedProjectIds: this.initProjectIds(),
        day: today,
        money: "",
      });
    },
    async createOrderPayPlan() {
      const data = {
        data: JSON.stringify(
          this.formData.tableData.map((item) => {
            const { checkedProjectIds, ...restParams } = item;
            return {
              ...restParams,
              project_ids: checkedProjectIds.join(","),
            };
          })
        ),
      };
      if (this.data.order_id) {
        data.order_id = this.data.order_id;
      }
      this.addLoading = true;
      const res = await createOrderPayPlan(data).catch(() => {});
      this.addLoading = false;
      if (res.code === 0) {
        this.$message.success(res.message);
        this.$emit("on-success");
        this.handleClose();
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.planEditData.id) {
            this.updateOrderPayPlan(this.formData.tableData[0]);
          } else {
            this.createOrderPayPlan();
          }
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.formData.tableData = [];
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