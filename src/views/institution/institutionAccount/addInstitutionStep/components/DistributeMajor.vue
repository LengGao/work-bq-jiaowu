<template>
  <div>
    <SearchList
      :options="searchOptions"
      :data="searchData"
      @on-search="handleSearch"
    />
    <el-table
      ref="multipleTable"
      :data="listData"
      style="width: 100%"
      v-loading="listLoading"
      element-loading-text="loading"
      element-loading-spinner="el-icon-loading"
      element-loading-background="#fff"
      class="table"
      :header-cell-style="{
        'text-align': 'center',
        background: '#f8f8f8',
      }"
      @selection-change="handleSelection"
      height="428"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
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
        min-width="120"
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
          >
          </el-input>
        </template>
      </el-table-column>
      <el-table-column
        prop="rebate_rate"
        label="返点比例"
        min-width="100"
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
            >
              <template slot="append">%</template>
            </el-input>
          </div>
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
    <div class="actions">
      <el-button @click="handlePrev">上一步</el-button>
      <el-button class="cancel" @click="hanldeClose">取 消</el-button>
      <el-button type="primary" :loading="addLoading" @click="assignUniversity"
        >下一步</el-button
      >
    </div>
  </div>
</template>

<script>
import { universityMajorDetailList, assignUniversity } from "@/api/crm";
import {
  getUniversityOptions,
  getUniversityLevelOptions,
  getUniversityMajorOptions,
} from "@/api/sou";
import { universityTypeSelect } from "@/api/crm";
export default {
  name: "DistributeMajor",

  props: {
    institutionId: {
      type: [String, Number],
      default: "",
    },
    value: {
      type: Boolean,
      default: false,
    },
    universityMajorOptions: {
      type: Array,
      default: () => [],
    },
    universityLevelOptions: {
      type: Array,
      default: () => [],
    },
    universityOptions: {
      type: Array,
      default: () => [],
    },
    typeOptions: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      addLoading: false,
      listData: [],
      listLoading: false,
      listTotal: 0,
      pageNum: 1,
      pageSize: 20,
      searchData: {
        search_box: "",
        type_id: "",
      },
      searchOptions: [
        {
          key: "type_id",
          type: "select",
          options: this.typeOptions,
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
      selection: [],
    };
  },
  created() {
    this.universityMajorDetailList();
    this.universityTypeSelect();
    this.getUniversityOptions();
    this.getUniversityLevelOptions();
    this.getUniversityMajorOptions();
  },
  methods: {
    // 获取分类
    async universityTypeSelect() {
      const res = await universityTypeSelect();
      if (res.code === 0) {
        this.searchOptions[0].options = res.data;
      }
    },
    // 获取院校
    async getUniversityOptions() {
      const res = await getUniversityOptions();
      if (res.code === 0) {
        this.searchOptions[1].options = res.data;
      }
    },
    // 获取层次
    async getUniversityLevelOptions() {
      const res = await getUniversityLevelOptions();
      if (res.code === 0) {
        this.searchOptions[2].options = res.data;
      }
    },
    // 获取专业
    async getUniversityMajorOptions() {
      const res = await getUniversityMajorOptions();
      if (res.code === 0) {
        this.searchOptions[3].options = res.data;
      }
    },
    handleSelection(selection) {
      this.selection = selection;
    },
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
      };
      this.universityMajorDetailList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.universityMajorDetailList();
    },
    handleSizeChange(size) {
      this.pageNum = 1;
      this.pageSize = size;
      this.universityMajorDetailList();
    },
    // 学校列表
    async universityMajorDetailList() {
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await universityMajorDetailList(data);
      this.listLoading = false;
      this.listTotal = res.data.total;
      const majorPrice = JSON.parse(localStorage.getItem("majorPrice") || "{}");
      this.listData = res.data.list.map((item) => ({
        ...item,
        apply_price: majorPrice[item.id]?.apply_price || item.apply_price || "",
        year_limit: majorPrice[item.id]?.year_limit || item.year_limit || "",
        rebate_rate: majorPrice[item.id]?.rebate_rate || item.rebate_rate || "",
        price: majorPrice[item.id]?.price || item.price || "",
      }));
    },
    // 分发
    async assignUniversity() {
      if (!this.selection.length) {
        this.$message.warning("请选择院校专业");
        return;
      }

      const id_arr = {};
      this.selection.forEach(
        ({ rebate_rate, price, year_limit, apply_price, id }) => {
          id_arr[id] = {
            price,
            year_limit,
            apply_price,
            rebate_rate,
          };
        }
      );
      const data = {
        org_arr: [this.institutionId],
        id_arr,
      };
      localStorage.setItem("majorPrice", JSON.stringify(id_arr));
      this.addLoading = true;
      const res = await assignUniversity(data).catch(() => {});
      this.addLoading = false;
      if (res.code === 0) {
        this.$message.success(res.message);
        this.$emit("next");
      }
    },
    handlePrev() {
      this.$emit("prev");
    },
    hanldeClose() {
      this.$emit("close");
    },
  },
};
</script>
<style lang="less" scoped>
.percentage {
  /deep/.el-input-group__append {
    padding: 0 5px;
  }
}
.actions {
  display: flex;
  .cancel {
    margin-left: auto;
  }
}
</style>


