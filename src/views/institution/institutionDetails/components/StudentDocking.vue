<template>
  <!-- 学生对接 -->
  <div class="student-docking">
    <!--表格-->
    <el-table
      ref="multipleTable"
      :data="listData"
      style="width: 100%"
      class="min_table"
      v-loading="listLoading"
      element-loading-text="loading"
      element-loading-spinner="el-icon-loading"
      element-loading-background="#fff"
      :header-cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column
        label="分类ID"
        show-overflow-tooltip
        min-width="80"
        align="center"
        prop="category_id"
      >
      </el-table-column>
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
            v-model="row.channel_staff_id"
            placeholder="请选择"
            filterable
            clearable
            @change="setStudentReception(row)"
          >
            <el-option
              v-for="item in channelStaffOptions"
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
            v-model="row.education_staff_id_arr"
            placeholder="请选择"
            filterable
            clearable
            multiple
            @change="setStudentReception(row)"
          >
            <el-option
              v-for="item in eduStaffOptions"
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
  </div>
</template>

<script>
import {
  getOrgStudentReceptionList,
  getStaffSelect,
  setStudentReception,
} from "@/api/institution";
export default {
  name: "StudentDocking",
  data() {
    return {
      listData: [],
      listLoading: false,
      channelStaffOptions: [],
      eduStaffOptions: [],
      lastTime: 0,
    };
  },

  created() {
    this.getOrgStudentReceptionList();
    this.getStaffSelect(1);
    this.getStaffSelect(2);
  },
  methods: {
    async setStudentReception({
      channel_staff_id,
      category_id: cate_id,
      education_staff_id_arr,
    }) {
      const data = {
        org_id: this.$route.query?.institution_id || "",
        channel_staff_id,
        cate_id,
        education_staff_id_arr,
      };
      const res = await setStudentReception(data);
      if (res.code === 0) {
        const currentTime = Date.now();
        if (currentTime - this.lastTime > 1500) {
          this.$message.success(res.message);
          this.lastTime = currentTime;
        }
      }
    },
    async getStaffSelect(status) {
      const data = {
        status,
      };
      const res = await getStaffSelect(data);
      if (res.code === 0) {
        if (status === 1) {
          this.channelStaffOptions = res.data;
        } else if (status === 2) {
          this.eduStaffOptions = res.data;
        }
      }
    },
    // 公海学员
    async getOrgStudentReceptionList() {
      const data = {
        org_id: this.$route.query?.institution_id || "",
      };
      this.listLoading = true;
      const res = await getOrgStudentReceptionList(data);
      this.listLoading = false;
      this.listData = res.data.map((item) => ({
        ...item,
        isEdit: false,
        loading: false,
      }));
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/.el-table__header th,
.el-table__header tr {
  background-color: #f8f8f8;
  color: #909399;
}
.institution-user-manage {
  padding: 20px;
}
</style>
