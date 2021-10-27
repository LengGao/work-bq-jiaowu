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
        label="课程分类"
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
            v-if="row.isEdit"
            v-model="row.value2"
            placeholder="请选择"
            filterable
            clearable
          >
            <el-option
              v-for="item in cities"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
              <span style="float: left">{{ item.label }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{
                item.value
              }}</span>
            </el-option>
          </el-select>
          <span v-else>{{ row.channel_staff_name }}</span>
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
            v-if="row.isEdit"
            v-model="row.value1"
            placeholder="请选择"
            filterable
            clearable
          >
            <el-option
              v-for="item in cities"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
              <span style="float: left">{{ item.label }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{
                item.value
              }}</span>
            </el-option>
          </el-select>
          <span v-else>{{ row.education_staff_name_str }}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        min-width="180"
        align="center"
      >
        <template slot-scope="{ row }">
          <el-button type="text" v-if="row.isEdit" @click="handleSave(row)"
            >保存</el-button
          >
          <el-button type="text" v-if="row.isEdit" @click="row.isEdit = false"
            >取消</el-button
          >
          <el-button type="text" v-else @click="row.isEdit = true"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getOrgStudentReceptionList } from "@/api/institution";
export default {
  name: "InsitutionSeas",
  data() {
    return {
      listData: [],
      listLoading: false,
      cities: [
        {
          value: "Beijing",
          label: "北京",
        },
        {
          value: "Shanghai",
          label: "上海",
        },
        {
          value: "Nanjing",
          label: "南京",
        },
        {
          value: "Chengdu",
          label: "成都",
        },
        {
          value: "Shenzhen",
          label: "深圳",
        },
        {
          value: "Guangzhou",
          label: "广州",
        },
      ],
    };
  },

  created() {
    this.getOrgStudentReceptionList();
  },
  methods: {
    handleSave(row) {
      console.log(row);
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
        value1: "",
        value2: "",
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
