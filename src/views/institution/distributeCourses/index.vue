<template>
  <div class="distribute-courses">
    <div class="head_remind">*将课程批量分发给入驻机构</div>
    <div class="container">
      <div class="container-table">
        <div class="table-left">
          <Title text="分发课程" />
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
              label="课程名称"
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
              prop="user_realname"
              label="录播班"
              min-width="160"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="telphone"
              label="直播特价班"
              min-width="140"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="classroom_name"
              label="直播精英班"
              min-width="140"
              align="center"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="first_time"
              label="面授班"
              min-width="140"
              align="center"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="last_time"
              label="学霸班"
              align="center"
              min-width="140"
              show-overflow-tooltip
            ></el-table-column>
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
          分发课程数量：<span>30</span> 个，分发机构数量：<span>40</span> 个
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
export default {
  name: "distributeCourses",
  data() {
    return {
      listLeftData: [],
      listLeftLoading: false,
      searchLeftData: {
        search_box: "",
      },
      searchLeftOptions: [
        {
          key: "search_box",
          attrs: {
            placeholder: "班型名称",
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
            placeholder: "班型名称",
          },
        },
      ],
    };
  },
  methods: {
    handleRightSearch(data) {},
    handleLeftSearch(data) {},
  },
};
</script>
<style lang="less" scoped>
.distribute-courses {
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
  }
}
</style>