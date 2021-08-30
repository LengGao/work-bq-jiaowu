<template>
  <div class="distribute-question">
    <div class="head_remind">*将题库批量分发给入驻机构</div>
    <div class="container">
      <div class="container-table">
        <div class="table-left">
          <Title text="分发题库" />
          <SearchList
            :options="searchLeftOptions"
            :data="searchLeftData"
            @on-search="handleLeftSearch"
          />
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
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column
              label="题库名称"
              show-overflow-tooltip
              min-width="70"
              align="center"
              prop="id"
            >
            </el-table-column>
            <el-table-column
              label="所属分类"
              show-overflow-tooltip
              min-width="70"
              align="center"
              prop="id"
            >
            </el-table-column>
            <el-table-column
              label="题库价格"
              show-overflow-tooltip
              min-width="70"
              align="center"
              prop="id"
            >
            </el-table-column>
          </el-table>
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
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column
              label="机构名称"
              show-overflow-tooltip
              min-width="70"
              align="center"
              prop="id"
            >
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="container-actions">
        <Title text="分发小结" />
        <p class="tips">
          分发题库数量：<span>30</span> 个，分发机构数量：<span>40</span> 个
        </p>
        <div>
          <el-button>取消</el-button>
          <el-button type="primary">确定分拨</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { cloneOptions } from "@/utils/index";
import { getCateList } from "@/api/sou";
export default {
  name: "distributequestion",
  data() {
    return {
      listLeftData: [],
      listLeftLoading: false,
      searchLeftData: {
        search_box: "",
      },
      searchLeftOptions: [
        {
          key: "course_category_id",
          type: "cascader",
          events: {
            change: this.handleTypeChange,
          },
          attrs: {
            placeholder: "所属分类",
            props: { checkStrictly: true },
            filterable: true,
            clearable: true,
            options: [],
          },
        },
        {
          key: "search_box",
          attrs: {
            placeholder: "题库名称",
          },
        },
      ],
      listRightData: [],
      listRightLoading: false,
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
    };
  },
  created() {
    this.getCateList();
  },
  methods: {
    handleRightSearch(data) {},
    handleLeftSearch(data) {},
    // 获取教材分类
    async getCateList() {
      const data = { list: true };
      const res = await getCateList(data);
      if (res.code === 0) {
        this.searchLeftOptions[0].attrs.options = cloneOptions(
          res.data,
          "category_name",
          "category_id",
          "son"
        );
      }
    },
  },
};
</script>
<style lang="less" scoped>
.distribute-question {
  .container {
    padding: 20px;
    &-table {
      display: flex;
      justify-content: space-between;
      margin-bottom: 16px;
      .table {
        border: 1px solid #ebeef5;
        border-bottom: none;
      }
      .table-left {
        width: 70%;
        flex-shrink: 0;
      }
      .table-right {
        width: 25%;
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
</style>