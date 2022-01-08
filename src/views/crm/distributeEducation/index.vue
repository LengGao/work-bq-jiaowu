<template>
  <div class="distribute-courses">
    <div class="head_remind">*将院校专业批量分发给入驻机构</div>
    <div class="container">
      <div class="container-table">
        <div class="table-left">
          <Title text="分发院校专业" />
          <div class="tab-search">
            <SearchList
              :options="searchLeftOptions"
              :data="searchLeftData"
              @on-search="handleLeftSearch"
            />
            <p class="tips"></p>
          </div>

          <el-table
            ref="multipleTable"
            :data="listLeftData"
            style="width: 100%"
            v-loading="listLeftLoading"
            element-loading-text="loading"
            element-loading-spinner="el-icon-loading"
            element-loading-background="#fff"
            class="table"
            :header-cell-style="{
              'text-align': 'center',
              background: '#f8f8f8',
            }"
            @selection-change="handleLeftSelection"
            height="520"
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
              min-width="70"
              align="center"
              prop="type_title"
            >
            </el-table-column>
            <el-table-column
              label="层次名称"
              show-overflow-tooltip
              min-width="70"
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
              min-width="90"
              align="center"
              show-overflow-tooltip
            >
              <template slot-scope="{ row }">
                <el-input
                  type="number"
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
                <div class="percen">
                <el-input
                  type="number"
                  size="small"
                  v-model="row.rebate_rate"
                  placeholder="请输入"
                >
                </el-input>
                </div>
              </template>
           
            </el-table-column>
          </el-table>
          <div class="table_bottom">
            <page
              :data="listLeftTotal"
              :curpage="pageLeftNum"
              @pageChange="handleLeftPageChange"
              @pageSizeChange="handleLeftSizeChange"
            />
          </div>
        </div>
        <div class="table-right">
          <Title text="分发机构" />
          <SearchList
            :options="searchRightOptions"
            :data="searchRightData"
            @on-search="handleRightSearch"
          />
          <el-table
            ref="multipleTable"
            :data="listRightData"
            style="width: 100%"
            class="table"
            v-loading="listRightLoading"
            element-loading-text="loading"
            element-loading-spinner="el-icon-loading"
            element-loading-background="#fff"
            :header-cell-style="{
              'text-align': 'center',
              background: '#f8f8f8',
            }"
            height="520"
            @selection-change="handleRightSelection"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column
              label="机构名称"
              show-overflow-tooltip
              min-width="70"
              align="left"
              prop="institution_name"
            >
            </el-table-column>
          </el-table>
          <div class="table_bottom">
            <page
              :data="listRightTotal"
              :curpage="pageRightNum"
              @pageChange="handleRightPageChange"
              @pageSizeChange="handleRightSizeChange"
            />
          </div>
        </div>
      </div>
      <div class="container-actions">
        <Title text="分发小结" />
        <p class="tips">
          分发院校专业数量：<span>{{ leftSelection.length }}</span>
          个，分发机构数量：<span>{{ rightSelection.length }}</span> 个
        </p>
        <div>
          <el-button @click="handleReset">取消</el-button>
          <el-button
            type="primary"
            :loading="submitLoading"
            @click="assignUniversity"
            >确定分发</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getOrgList } from "@/api/institution";
import {
  universityMajorDetailList,
  assignUniversity,
  universityTypeSelect,
} from "@/api/crm";
export default {
  name: "distributeProject",
  data() {
    return {
      listLeftData: [],
      listLeftLoading: false,
      listLeftTotal: 0,
      pageLeftNum: 1,
      pageLeftSize: 20,
      searchLeftData: {
        search_box: "",
        type_id: "",
      },
      searchLeftOptions: [
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
          key: "search_box",
          attrs: {
            placeholder: "学校名称",
          },
        },
      ],
      listRightData: [],
      listRightLoading: false,
      listRightTotal: 0,
      pageRightNum: 1,
      pageRightSize: 20,
      searchRightData: {
        search_box: "",
      },
      searchRightOptions: [
        {
          key: "search_box",
          attrs: {
            placeholder: "机构名称",
          },
        },
      ],
      leftSelection: [],
      rightSelection: [],
      submitLoading: false,
    };
  },
  created() {
    this.universityMajorDetailList();
    this.getOrgList();
    this.universityTypeSelect();
  },
  methods: {
    handleReset() {
      this.getOrgList();
      this.universityMajorDetailList();
    },
    // 分发
    async assignUniversity() {
      if (!this.leftSelection.length) {
        this.$message.warning("请选择院校专业");
        return;
      }
      if (!this.rightSelection.length) {
        this.$message.warning("请选择机构");
        return;
      }
      const id_arr = {};
      this.leftSelection.forEach(({ price, year_limit, apply_price,rebate_rate, id }) => {
        id_arr[id] = {
          price,
          year_limit,
          apply_price,
          rebate_rate,
        };
      });
      const data = {
        org_arr: this.rightSelection,
        id_arr,
      };
      this.submitLoading = true;
      const res = await assignUniversity(data).catch(() => {});
      this.submitLoading = false;
      if (res.code === 0) {
        this.$message.success(res.message);
        this.handleReset();
      }
    },
    handleRightSelection(selection) {
      this.rightSelection = selection.map((item) => item.institution_id);
    },
    handleLeftSelection(selection) {
      this.leftSelection = selection;
    },
    handleLeftSearch(data) {
      this.pageLeftNum = 1;
      this.searchLeftData = {
        ...data,
      };
      this.universityMajorDetailList();
    },
    handleLeftPageChange(val) {
      this.pageLeftNum = val;
      this.universityMajorDetailList();
    },
    handleLeftSizeChange(size) {
      this.pageLeftNum = 1;
      this.pageLeftSize = size;
      this.universityMajorDetailList();
    },
    // 学校列表
    async universityMajorDetailList() {
      const data = {
        page: this.pageLeftNum,
        limit: this.pageLeftSize,
        ...this.searchLeftData,
      };
      this.listLeftLoading = true;
      const res = await universityMajorDetailList(data);
      this.listLeftLoading = false;
      this.listLeftTotal = res.data.total;
      this.listLeftData = res.data.list.map((item) => ({
        ...item,
        apply_price: "",
        year_limit: "",
        rebate_rate:"",
      }));
    },
    handleRightSearch(data) {
      this.pageRightNum = 1;
      this.searchRightData = {
        ...data,
      };
      this.getOrgList();
    },
    handleRightPageChange(val) {
      this.pageRightNum = val;
      this.getOrgList();
    },
    handleRightSizeChange(size) {
      this.pageRightNum = 1;
      this.pageRightSize = size;
      this.getOrgList();
    },
    // 机构列表
    async getOrgList() {
      const data = {
        page: this.pageRightNum,
        limit: this.pageRightSize,
        ...this.searchRightData,
      };
      this.listRightLoading = true;
      const res = await getOrgList(data);
      this.listRightLoading = false;
      this.listRightTotal = res.data.total;
      this.listRightData = res.data.list;
    },
    // 获取分类
    async universityTypeSelect() {
      const res = await universityTypeSelect();
      if (res.code === 0) {
        this.searchLeftOptions[0].options = res.data;
      }
    },
  },
};
</script>
<style lang="less" scoped>
/* 去掉number样式 */
/deep/.el-input {
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }
}

.distribute-courses {
  .container {
    padding: 20px;
    &-table {
      display: flex;
      justify-content: space-between;
      .table_bottom {
        padding-bottom: 0;
      }
      .tips {
        color: #606266;
      }
      .table {
        border: 1px solid #ebeef5;
        border-bottom: none;
      }
      .tab-search {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .table-left {
        width: 75%;
        flex-shrink: 0;
      }
      .table-right {
        width: 23%;
        flex-shrink: 0;
      }
    }
    &-actions {
      .tips {
        color: #606266;
        margin-bottom: 16px;
        span {
          color: #196ff1;
        }
      }
    }
  }
}
// .percen{
//   display: flex;
//   .percentage{
//   margin-right: 3px;
//   margin-left: 3px;
//   line-height: 30px;
//   display: block;
// }
// }

</style>