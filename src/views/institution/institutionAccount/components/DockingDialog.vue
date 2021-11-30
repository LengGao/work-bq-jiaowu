<template>
  <!--学生对接弹窗-->
  <el-dialog
    title="学生对接"
    :visible.sync="visible"
    width="600px"
    @open="handleOpen"
    :close-on-click-modal="false"
    @closed="resetForm('formData')"
  >
    <el-table
      ref="multipleTable"
      :data="tableData"
      style="width: 100%"
      class="min_table"
      v-loading="tableLoading"
      element-loading-text="loading"
      element-loading-spinner="el-icon-loading"
      element-loading-background="#fff"
      :header-cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column
        prop="category_name"
        label="项目分类"
        min-width="160"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="channel_staff_name"
        label="对接渠道"
        min-width="180"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="{ row }">
          <el-select
            v-model="row.channel"
            placeholder="请选择"
            filterable
            clearable
          >
            <el-option
              v-for="item in staffOptions"
              :key="item.staff_id"
              :label="item.staff_name"
              :value="item.staff_id"
            >
              <span style="float: left">{{ item.staff_name }}</span>
              <span
                style="
                  float: right;
                  color: #8492a6;
                  font-size: 13px;
                  margin: 0 15px 0 10px;
                "
                >{{ item.department_name }}</span
              >
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        prop="education_staff_name_str"
        label="对接教务"
        min-width="180"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="{ row }">
          <el-select
            v-model="row.education"
            placeholder="请选择"
            filterable
            clearable
            multiple
          >
            <el-option
              v-for="item in staffOptions"
              :key="item.staff_id"
              :label="item.staff_name"
              :value="item.staff_id + ''"
            >
              <span style="float: left">{{ item.staff_name }}</span>
              <span
                style="
                  float: right;
                  color: #8492a6;
                  font-size: 13px;
                  margin: 0 15px 0 10px;
                "
                >{{ item.department_name }}</span
              >
            </el-option>
          </el-select>
        </template>
      </el-table-column>
    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hanldeCancel">取 消</el-button>
      <el-button
        type="primary"
        :loading="addLoading"
        @click="batchSetStudentReception"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import {
  getOrgCateIdArr,
  getStaffSelect,
  batchSetStudentReception,
} from "@/api/institution";
export default {
  name: "DockingDialog",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    ids: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      visible: this.value,
      staffOptions: [],
      tableData: [],
      addLoading: false,
      tableLoading: false,
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },
  methods: {
    handleOpen() {
      this.getOrgCateIdArr();
      this.getStaffSelect();
    },
    async getOrgCateIdArr() {
      const data = {
        org_id_arr: this.ids,
      };
      this.tableLoading = true;
      const res = await getOrgCateIdArr(data).catch(() => {});
      this.tableLoading = false;
      if (res.code === 0) {
        this.tableData = res.data.map((item) => ({
          ...item,
          education: [],
          channel: "",
        }));
      }
    },
    async getStaffSelect() {
      const res = await getStaffSelect();
      if (res.code === 0) {
        this.staffOptions = res.data;
      }
    },
    async batchSetStudentReception() {
      const data = {
        cate_arr: this.tableData.map(
          ({ category_id: cate_id, education, channel }) => ({
            cate_id,
            education,
            channel,
          })
        ),
        org_id_arr: this.ids,
      };
      this.addLoading = true;
      const res = await batchSetStudentReception(data).catch(() => {});
      this.addLoading = false;
      if (res.code === 0) {
        this.$message.success(res.message);
        this.$emit("on-success");
        this.hanldeCancel();
      }
    },
    resetForm() {
      this.$emit("input", false);
    },
    hanldeCancel() {
      this.visible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.address {
  display: flex;
  .detailed {
    margin-left: 20px;
    flex: 1;
  }
}
</style>