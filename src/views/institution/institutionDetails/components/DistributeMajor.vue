<template>
  <div>
    <!--搜索模块-->
    <header>
      <SearchList
        :options="searchOptions"
        :data="searchData"
        @on-search="handleSearch"
      />
      <div>
        <el-button type="primary" @click="dialogVisible = true"
          >添加专业</el-button
        >
      </div>
    </header>
    <!--列表-->
    <div class="userTable">
      <el-table
        ref="multipleTable"
        :data="listData"
        v-loading="listLoading"
        element-loading-text="loading"
        element-loading-spinner="el-icon-loading"
        element-loading-background="#fff"
        :header-cell-style="{ 'text-align': 'center', background: '#f8f8f8' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column prop="id" label="ID" show-overflow-tooltip width="70">
        </el-table-column>
        <el-table-column
          label="院校名称"
          show-overflow-tooltip
          min-width="100"
          align="center"
          prop="university_title"
        >
        </el-table-column>
        <el-table-column
          label="学历形式"
          show-overflow-tooltip
          min-width="80"
          align="center"
          prop="type_title"
        >
        </el-table-column>
        <el-table-column
          label="层次名称"
          show-overflow-tooltip
          min-width="75"
          align="center"
          prop="level_title"
        >
        </el-table-column>
        <el-table-column
          label="专业名称"
          show-overflow-tooltip
          min-width="100"
          align="center"
          prop="major_title"
        >
        </el-table-column>
        <el-table-column
          label="项目名称"
          show-overflow-tooltip
          min-width="240"
          align="left"
          prop="project_name"
        >
        </el-table-column>
        <el-table-column
          prop="apply_price"
          label="报考费"
          min-width="90"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <el-input
              type="number"
              @mousewheel.native.prevent
              size="small"
              v-model="row.apply_price"
              placeholder="请输入"
              @blur="orgUniversityModify(row)"
            >
            </el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="year_limit"
          label="收费年限"
          min-width="90"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <el-input
              type="number"
              @mousewheel.native.prevent
              size="small"
              v-model="row.year_limit"
              placeholder="请输入"
              @blur="orgUniversityModify(row)"
            >
            </el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="price"
          label="分发价格"
          min-width="100"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <el-input
              type="number"
              @mousewheel.native.prevent
              size="small"
              v-model="row.price"
              placeholder="请输入"
              @blur="orgUniversityModify(row)"
            >
            </el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="rebate_rate"
          label="返点比例"
          min-width="110"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <div class="percentage">
              <el-input
                type="number"
                @mousewheel.native.prevent
                size="small"
                v-model="row.rebate_rate"
                placeholder="0-100"
                @blur="orgUniversityModify(row)"
              >
                <template slot="append">%</template>
              </el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" min-width="100">
          <template slot-scope="{ row }">
            <el-button type="text" @click="delConfirm(row, 1)">移除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="table_bottom">
        <page
          :data="listTotal"
          :curpage="pageNum"
          @pageChange="handlePageChange"
          @pageSizeChange="handleSizeChange"
        />
      </div>
    </div>
    <AddMajor
      v-model="dialogVisible"
      :universityMajorOptions="universityMajorOptions"
      :universityLevelOptions="universityLevelOptions"
      :universityOptions="universityOptions"
      :typeOptions="typeOptions"
      @success="getInstitutionMajor"
    />
  </div>
</template>

<script>
import AddMajor from "./AddMajor";
import { getInstitutionMajor, orgUniversityModify } from "@/api/institution";
import {
  getUniversityOptions,
  getUniversityLevelOptions,
  getUniversityMajorOptions,
} from "@/api/sou";
import { universityTypeSelect } from "@/api/crm";
export default {
  name: "DistributeMajor",
  components: {
    AddMajor,
  },
  data() {
    return {
      universityMajorOptions: [],
      universityLevelOptions: [],
      universityOptions: [],
      typeOptions: [],
      listData: [],
      listLoading: false,
      pageNum: 1,
      pageSize: 20,
      listTotal: 0,
      searchData: {
        type_id: "",
        school_id: "",
        level_id: "",
        major_id: "",
      },
      searchOptions: [
        {
          key: "type_id",
          type: "select",
          options: [],
          optionValue: "id",
          optionLabel: "title",
          attrs: {
            placeholder: "学历形式",
            clearable: true,
            filterable: true,
          },
        },
        {
          key: "school_id",
          type: "select",
          options: [],
          optionValue: "id",
          optionLabel: "title",
          attrs: {
            placeholder: "院校名称",
            clearable: true,
            filterable: true,
          },
        },
        {
          key: "level_id",
          type: "select",
          options: [],
          optionValue: "id",
          optionLabel: "title",
          attrs: {
            placeholder: "层次名称",
            clearable: true,
            filterable: true,
          },
        },
        {
          key: "major_id",
          type: "select",
          options: [],
          optionValue: "id",
          optionLabel: "title",
          attrs: {
            placeholder: "专业名称",
            clearable: true,
            filterable: true,
          },
        },
      ],
      dialogVisible: false,
    };
  },
  created() {
    this.getInstitutionMajor();
    this.universityTypeSelect();
    this.getUniversityOptions();
    this.getUniversityLevelOptions();
    this.getUniversityMajorOptions();
  },
  methods: {
    // 删除，修改
    async orgUniversityModify(
      { price, apply_price, year_limit, rebate_rate, id },
      del = 0
    ) {
      const data = {
        price,
        apply_price,
        year_limit,
        rebate_rate,
        id,
        del,
      };
      const res = await orgUniversityModify(data);
      if (res.code === 0) {
        this.getInstitutionMajor();
      }
    },
    // 删除
    delConfirm(row, del) {
      this.$confirm("确定要移除该专业吗？", "提醒", {
        type: "warning",
      })
        .then(() => {
          this.orgUniversityModify(row, del);
        })
        .catch(() => {});
    },
    // 获取分类
    async universityTypeSelect() {
      const res = await universityTypeSelect();
      if (res.code === 0) {
        this.searchOptions[0].options = res.data;
        this.typeOptions = res.data;
      }
    },
    // 获取院校
    async getUniversityOptions() {
      const res = await getUniversityOptions();
      if (res.code === 0) {
        this.searchOptions[1].options = res.data;
        this.universityOptions = res.data;
      }
    },
    // 获取层次
    async getUniversityLevelOptions() {
      const res = await getUniversityLevelOptions();
      if (res.code === 0) {
        this.searchOptions[2].options = res.data;
        this.universityLevelOptions = res.data;
      }
    },
    // 获取专业
    async getUniversityMajorOptions() {
      const res = await getUniversityMajorOptions();
      if (res.code === 0) {
        this.searchOptions[3].options = res.data;
        this.universityMajorOptions = res.data;
      }
    },
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
      };
      this.getInstitutionMajor();
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.pageNum = 1;
      this.getInstitutionMajor();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getInstitutionMajor();
    },
    async getInstitutionMajor() {
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
        from_organization_id: this.$route.query.institution_id,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await getInstitutionMajor(data);
      this.listLoading = false;
      this.listData = res.data.list;
      this.listTotal = res.data.total;
    },
  },
};
</script>

<style lang="less" scoped>
header {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}
.percentage {
  /deep/.el-input-group__append {
    padding: 0 5px;
  }
}
</style>

