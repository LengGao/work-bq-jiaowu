<template>
  <div>
    <section class="mainwrap">
      <div class="client_head">
        <!--搜索模块-->
        <SearchList
          :options="searchOptions"
          :data="searchData"
          @on-search="handleSearch"
        />
        <div>
          <el-button>复位</el-button>
          <el-button type="primary">更新记录</el-button>
        </div>
      </div>
      <ul class="class-info">
        <li class="info-item">
          <span class="info-item-label">班级名称</span>
          <span class="info-item-value">2021系统集成春季1班</span>
        </li>
        <li class="info-item">
          <span class="info-item-label">班主任</span>
          <span class="info-item-value">集成春</span>
        </li>
        <li class="info-item">
          <span class="info-item-label">学生人数</span>
          <span class="info-item-value">10000</span>
        </li>
        <li class="info-item">
          <span class="info-item-label">数据截止时间</span>
          <span class="info-item-value">2020-02-20</span>
        </li>
        <li class="info-item">
          <span class="info-item-label">回访人</span>
          <span class="info-item-value">集成春</span>
        </li>
        <li class="info-item">
          <span class="info-item-label">下次回访时间</span>
          <span class="info-item-value">
            <el-date-picker v-model="date" type="date" placeholder="选择日期">
            </el-date-picker
          ></span>
        </li>
      </ul>
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
          :header-cell-style="{ 'text-align': 'center', background: '#f8f8f8' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column label="学员编号" min-width="80" prop="id">
          </el-table-column>
          <el-table-column
            prop="classroom_name"
            label="学员姓名"
            min-width="110"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="category_name"
            label="手机号码"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="project_name"
            label="所属机构"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="staff_name"
            label="学习进度"
            min-width="140"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="staff_name"
            label="做题进度"
            min-width="140"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="staff_name"
            label="出勤次数"
            min-width="140"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="staff_name"
            label="出勤率"
            min-width="140"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="沟通内容" fixed="right" min-width="180">
            <template slot-scope="{ row }">
              <el-input type="text" placeholder="请输入"></el-input>
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
    </section>
  </div>
</template>

<script>
import { getClassList } from "@/api/eda";
import { getInstitutionSelectData } from "@/api/sou";
import { cloneOptions } from "@/utils/index";
export default {
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      date: "",
      searchData: {
        organization_id: "",
        keyboard: "",
      },
      searchOptions: [
        {
          key: "organization_id",
          type: "cascader",
          attrs: {
            placeholder: "所属机构",
            filterable: true,
            clearable: true,
            options: [],
          },
        },
        {
          key: "keyboard",
          attrs: {
            placeholder: "回访人姓名",
          },
        },
      ],

      currentId: "",
      dialogTitle: "添加班级",
      dialogVisible: false,
      typeOptions: [],
    };
  },

  created() {
    this.getInstitutionSelectData();
    this.getClassList();
  },

  methods: {
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
        organization_id: data.organization_id.pop(),
      };
      this.getClassList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getClassList();
    },
    async getClassList() {
      const data = {
        page: this.pageNum,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await getClassList(data);
      this.listLoading = false;
      this.listData = res.data.list;
      this.listTotal = res.data.total;
    },
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
  },
};
</script>

<style lang="scss" scoped>
.client_head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.class-info {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding-top: 10px;
  .info-item {
    min-width: 120px;
    margin: 0 26px 16px 0;
    &-label {
      color: #909399;
      margin-right: 8px;
    }
    &-value {
      color: #606266;
    }
  }
}
</style>
