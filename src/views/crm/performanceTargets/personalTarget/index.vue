<template>
  <div class="personal-target">
    <div class="mainwrap">
      <div class="tree-list">
        <p class="title">部门列表</p>
        <v-tree ref="tree" class="tree-content" :tpl="tpl" :data="treeData" />
      </div>
      <div class="table-list">
        <h2 class="target-value">
          {{ $route.query.title || yearTargetInfo.title }}年回款总金额目标：{{
            yearTargetInfo.target | moneyFormat
          }}
        </h2>
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
          height="78vh"
        >
          <el-table-column
            prop="staff_name"
            label="员工姓名"
            min-width="110"
            align="center"
            show-overflow-tooltip
            fixed="left"
          >
          </el-table-column>
          <el-table-column
            prop="total_performance"
            label="业绩总额"
            min-width="120"
            align="center"
          >
            <template slot-scope="{ row }">
              <span> {{ row.total_performance | moneyFormat }} </span>
            </template>
          </el-table-column>
          <el-table-column
            v-for="item in 12"
            :key="item"
            prop="account"
            :label="`${item}月`"
            min-width="120"
            align="center"
          >
            <template slot-scope="{ row }">
              <el-input
                v-focus
                v-if="row[`edit${item}`]"
                size="small"
                v-model="row[yearMap[item]]"
                placeholder="请输入"
                type="number"
                @mousewheel.native.prevent
                @blur="handleEditBlur(row, `edit${item}`)"
              ></el-input>
              <div v-else class="show-value">
                <span>{{ row[yearMap[item]] | moneyFormat }}</span>
                <el-button
                  @click="handleEditClick(row, `edit${item}`)"
                  class="icon"
                  icon="el-icon-edit"
                  type="text"
                ></el-button>
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
      </div>
    </div>
  </div>
</template>

<script>
import {
  getStaff,
  getGroup,
  getPerformanceTargetsInfo,
  updateStaffTarget,
} from "@/api/crm";
export default {
  name: "UserManage",
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      pageSize: 20,
      listTotal: 0,
      treeData: [],
      treeParams: {
        group_id: "",
      },
      yearTargetInfo: {},
      yearMap: {
        1: "jan",
        2: "feb",
        3: "mar",
        4: "apr",
        5: "may",
        6: "jun",
        7: "jul",
        8: "aug",
        9: "sep",
        10: "otc",
        11: "nov",
        12: "dec",
      },
    };
  },
  created() {
    this.getGroup();
    this.getStaff();
    this.getPerformanceTargetsInfo();
  },
  methods: {
    async updateStaffTarget(params) {
      const data = {
        id: this.$route.query.id,
        arrStaff: [params],
      };
      const res = await updateStaffTarget(data).catch(() => {});
      this.getStaff();
      if (res.code === 0) {
        this.getGroup();
        this.getPerformanceTargetsInfo();
        this.$message.success(res.message);
      }
    },
    handleEditClick(row, isEdit) {
      row[isEdit] = true;
    },
    handleEditBlur(row, isEdit) {
      row[isEdit] = false;
      this.updateStaffTarget(row);
    },
    async getPerformanceTargetsInfo() {
      const data = {
        id: this.$route.query.id,
      };
      const res = await getPerformanceTargetsInfo(data);
      if (res.code === 0) {
        this.yearTargetInfo = res.data;
      }
    },
    tpl(node) {
      return (
        <span
          class={{
            "tree-node": true,
            "tree-node--active": this.treeParams.group_id === node.id,
          }}
          onClick={() => this.onNodeClick(node)}
        >
          <span> {node.title}</span>
          {node.title !== "全部" && (
            <span class="total-price">
              {this.$options.filters.moneyFormat(node.total_performance, true)}
            </span>
          )}
        </span>
      );
    },
    async getGroup() {
      const data = {
        id: this.$route.query.id,
      };
      const res = await getGroup(data);
      if (res.code === 0) {
        this.setChildrenExpanded(res.data);
        this.treeData = [
          {
            id: "",
            title: "全部",
            expanded: true,
            children: res.data,
          },
        ];
      }
    },
    setChildrenExpanded(data) {
      data.forEach((item) => {
        if (item.children && item.children.length) {
          item.expanded = true;
          this.setChildrenExpanded(item.children);
        }
      });
    },
    onNodeClick(data) {
      const { id: group_id } = data;
      this.treeParams = { group_id };
      this.pageNum = 1;
      this.getStaff();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getStaff();
    },
    handleSizeChange(size) {
      this.pageNum = 1;
      this.pageSize = size;
      this.getStaff();
    },
    async getStaff() {
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
        id: this.$route.query.id,
        ...this.treeParams,
      };
      this.listLoading = true;
      const res = await getStaff(data);
      this.listLoading = false;
      this.listData = res.data.list.map((item) => ({
        ...item,
        edit1: false,
        edit2: false,
        edit3: false,
        edit4: false,
        edit5: false,
        edit6: false,
        edit7: false,
        edit8: false,
        edit9: false,
        edit10: false,
        edit11: false,
        edit12: false,
      }));
      this.listTotal = res.data.total;
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

.personal-target {
  .mainwrap {
    padding: 20px;
    display: flex;
  }
  .tree-list {
    min-width: 250px;
    flex-shrink: 0;
    height: 82vh;
    border: 1px solid #eee;
    margin-right: 20px;
    overflow-y: auto;
    .title {
      margin-bottom: 10px;
      border-bottom: 1px solid #eee;
      padding: 10px;
      color: #666;
    }
    .tree-content {
      padding-right: 10px;
    }
  }
  .table-list {
    flex: 1;
    overflow: hidden;
    .target-value {
      color: #999;
      margin-bottom: 10px;
    }
    .show-value {
      cursor: pointer;
      line-height: 32px;
      .icon {
        padding: 0 4px;
        display: none;
      }
      &:hover {
        .icon {
          display: inline-block;
        }
      }
    }
  }
  /deep/.halo-tree li {
    padding-right: 0;
  }
  .total-price {
    float: right;
  }
}
</style>
<style >
/* 去掉number样式 */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type="number"] {
  -moz-appearance: textfield;
}
.min_table .el-table__body-wrapper::-webkit-scrollbar {
  height: 10px;
}
</style>