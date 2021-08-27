<template>
  <div class="project-statistics-list">
    <div class="course-info">
      <div class="course-info-item">
        <span class="name">项目名称</span>
        <span class="value">{{ projectData.project_name }}</span>
      </div>
      <div class="course-info-item">
        <span class="name">所属分类</span>
        <span class="value">{{ projectData.category_name }}</span>
      </div>
      <div class="course-info-item">
        <span class="name">购买人数</span>
        <span class="value">{{ projectData.buy_number }}</span>
      </div>
    </div>
    <div class="client_head">
      <!--搜索模块-->
      <SearchList
        :options="searchOptions"
        :data="searchData"
        @on-search="handleSearch"
      />
    </div>
    <!--表格-->
    <div class="userTable">
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
          label="ID"
          show-overflow-tooltip
          min-width="70"
          align="center"
          prop="id"
        >
        </el-table-column>
        <el-table-column
          prop="surname"
          label="学生姓名"
          min-width="120"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <el-button type="text" @click="toStudentDetail(row.uid)">
              {{ row.surname }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="性别"
          show-overflow-tooltip
          min-width="70"
          align="center"
          prop="id"
        >
          <template slot-scope="{ row }">
            <span>{{ sexMap[row.sex] }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="手机号码"
          min-width="140"
          align="center"
        >
          <template slot-scope="{ row }">
            <PartiallyHidden :value="row.mobile" />
          </template>
        </el-table-column>
        <el-table-column
          prop="from_institution_name"
          label="推荐机构"
          min-width="180"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="staff_name"
          label="所属老师"
          min-width="140"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="create_time"
          label="报名时间"
          align="center"
          min-width="140"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          align="center"
          min-width="100"
        >
          <template slot-scope="{ row }">
            <el-button type="text" @click="toStudentDetail(row.uid)"
              >学生详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="table_bottom">
        <page
          :data="listTotal"
          :curpage="pageNum"
          @pageChange="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getProjectStatisticsList, getInstitutionSelectData } from "@/api/sou";
import { getAdminSelect } from "@/api/eda";
import { cloneOptions } from "@/utils/index";
import PartiallyHidden from "@/components/PartiallyHidden/index";
export default {
  name: "projectStatistics",
  components: {
    PartiallyHidden,
  },
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        keyword: "",
        staff_id: "",
        from_organization_id: "",
      },
      searchOptions: [
        {
          key: "from_organization_id",
          type: "cascader",
          attrs: {
            placeholder: "推荐机构",
            clearable: true,
            filterable: true,
            options: [],
          },
        },
        {
          key: "staff_id",
          type: "select",
          options: [],
          optionValue: "staff_id",
          optionLabel: "staff_name",
          attrs: {
            placeholder: "所属老师",
            clearable: true,
            filterable: true,
          },
        },
        {
          key: "keyword",
          attrs: {
            placeholder: "学员姓名/手机号码",
          },
        },
      ],
      projectData: {},
      sexMap: {
        1: "男",
        2: "女",
        0: "未知",
      },
    };
  },

  created() {
    this.getProjectStatisticsList();
    this.getInstitutionSelectData();
    this.getAdminSelect();
  },
  methods: {
    // 获取机构
    async getInstitutionSelectData() {
      const data = { list: true };
      const res = await getInstitutionSelectData(data);
      if (res.code === 0) {
        this.searchOptions[0].attrs.options = cloneOptions(
          res.data,
          "institution_name",
          "institution_id",
          "children"
        );
      }
    },
    // 获取所属老师
    async getAdminSelect() {
      const data = { list: true };
      const res = await getAdminSelect(data);
      if (res.code === 0) {
        this.searchOptions[1].options = res.data;
      }
    },
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
        from_organization_id: Array.isArray(data.from_organization_id)
          ? data.from_organization_id.pop()
          : "",
      };
      this.getProjectStatisticsList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getProjectStatisticsList();
    },

    async getProjectStatisticsList() {
      const data = {
        page: this.pageNum,
        project_id: this.$route.query.project_id,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await getProjectStatisticsList(data);
      this.listLoading = false;
      this.listData = res.data.list;
      this.listTotal = res.data.total;
      this.projectData = res.data.project;
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
.project-statistics-list {
  padding: 20px;
}

.course-info {
  display: flex;
  align-items: center;
  &-item {
    margin-right: 30px;
    padding: 16px 0;
    .name {
      color: #909399;
      margin-right: 8px;
    }
    .value {
      color: #666;
    }
  }
}
</style>
