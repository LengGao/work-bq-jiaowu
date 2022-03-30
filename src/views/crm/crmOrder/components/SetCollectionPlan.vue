<template>
  <el-dialog
    :title="title"
    :visible="value"
    width="1000px"
    @open="handleOpen"
    :close-on-click-modal="false"
    @closed="resetForm('formData')"
    @close="hanldeCancel"
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
          min-width="70"
          align="center"
          type="index"
        >
        </el-table-column>
        <el-table-column
          label="回款类型"
          show-overflow-tooltip
          min-width="120"
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
                  v-for="(item, index) in expenseType"
                  :key="index"
                  :label="item"
                  :value="+index"
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
                  :label="item.project_name"
                  :value="item.id + ''"
                >
                </el-option>
              </el-select>
              <span v-else>{{ row.project_name || allProjectName }}</span>
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
          label="计划回款时间"
          min-width="140"
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
                style="width: 100%"
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
import { getPlanYearOptions, currentYear } from "@/utils/date";
import { mapGetters } from "vuex";
export default {
  name: "SetCollectionPlan",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    signUpType: {
      type: [String, Number],
      default: "",
    },
    planData: {
      type: Array,
      default: () => [],
    },
    projectOptions: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      yearOptions: getPlanYearOptions(),
      formData: {
        tableData: [],
      },
      addLoading: false,
    };
  },
  computed: {
    ...mapGetters(["expenseType"]),
    allProjectName() {
      return this.projectOptions.map((item) => item.project_name).join(",");
    },
  },
  methods: {
    handleOpen() {
      if (this.planData.length) {
        this.formData.tableData = this.planData.map((item) => {
          const { major_detail_ids = "", project_ids = "", ...rest } = item;
          const ids = this.signUpType === 1 ? major_detail_ids : project_ids;
          return {
            ...rest,
            checkedProjectIds: ids.split(ids ? "," : ""),
          };
        });
      } else {
        this.formData.tableData = [
          {
            day: "",
            money: "",
            type: "",
            checkedProjectIds: this.initProjectIds(),
            year: currentYear,
            id: "n" + Date.now(),
          },
        ];
      }
    },
    initProjectIds() {
      return this.projectOptions.map((item) => item.id + "");
    },

    handleDelRow(index) {
      this.formData.tableData.splice(index, 1);
    },
    handleAddRow() {
      this.formData.tableData.push({
        day: "",
        money: "",
        type: "",
        checkedProjectIds: this.initProjectIds(),
        year: currentYear,
        id: "n" + Date.now(),
      });
    },
    addOption() {
      this.formData.options.push({
        label: "",
        id: Date.now(),
      });
    },
    delOption(index) {
      this.formData.options.splice(index, 1);
    },
    // 获取已选项目名称
    getPlanProjectOptions(ids) {
      const names = [];
      this.projectOptions.forEach((item) => {
        if (ids.includes(item.id + "")) {
          names.push(item.project_name);
        }
      });
      return names.join(",");
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit(
            "on-success",
            this.formData.tableData.map(({ checkedProjectIds, ...rest }) => {
              console.log(rest);
              return {
                ...rest,
                [this.signUpType === 1 ? "major_detail_ids" : "project_ids"]:
                  checkedProjectIds.join(","),
                project_name: this.getPlanProjectOptions(checkedProjectIds),
              };
            })
          );
          this.hanldeCancel();
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.formData.tableData = [];
    },
    hanldeCancel() {
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