<template>
  <div class="distribute-project">
    <div class="container">
      <div class="tab-search">
        <SearchList
          :options="searchOptions"
          :data="searchData"
          @on-search="handleSearch"
        />
        <p class="tips">
          *注意：价格为0表示该班型免费，价格为-1表示该班型不能报名;
          双击班级类型快速输入-1
        </p>
      </div>

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
        height="520"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column
          label="项目名称"
          show-overflow-tooltip
          min-width="240"
          align="left"
          prop="project_name"
        >
        </el-table-column>
        <el-table-column
          label="所属分类"
          show-overflow-tooltip
          min-width="120"
          align="center"
          prop="category_name"
        >
        </el-table-column>
        <el-table-column
          prop="title"
          :label="item.title"
          min-width="100"
          align="center"
          show-overflow-tooltip
          v-for="(item, index) in classTypes"
          :key="index"
        >
          <template slot="header">
            <span @dblclick="handleColumnClick(index)">{{ item.title }}</span>
          </template>
          <template slot-scope="{ row }">
            <el-input
              type="number"
              size="small"
              v-model="row[row.id][index].price"
              placeholder="请输入"
            >
            </el-input>
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
    <div class="container-actions">
      <el-button @click="handlePrev" class="prev">上一步</el-button>
      <el-button @click="handleColse">取消</el-button>
      <el-button type="primary" :loading="submitLoading" @click="sendClassType"
        >下一步</el-button
      >
    </div>
  </div>
</template>
<script>
import { cloneOptions } from "@/utils/index";
import { getCateList } from "@/api/sou";
import { getProjectOrgList, sendClassType } from "@/api/crm";
export default {
  name: "DistributeProject",
  props: {},
  data() {
    return {
      listData: [],
      listLoading: false,
      listTotal: 0,
      pageNum: 1,
      pageSize: 20,
      searchData: {
        keyword: "",
        category_id: [],
      },
      searchOptions: [
        {
          key: "category_id",
          type: "cascader",
          attrs: {
            placeholder: "所属分类",
            props: { checkStrictly: true },
            filterable: true,
            clearable: true,
            options: [],
          },
        },
        {
          key: "keyword",
          attrs: {
            placeholder: "项目名称",
          },
        },
      ],
      classTypes: [],
      selection: [],
      submitLoading: false,
    };
  },
  created() {
    this.getProjectOrgList();
    this.getCateList();
  },
  methods: {
    handleColumnClick(index) {
      this.listData.forEach((item) => {
        if (item[item.id]) {
          item[item.id][index].price =
            item[item.id][index].price === -1 ? "" : -1;
        }
      });
    },
    handleColse() {
      this.$emit("close");
    },
    handlePrev() {
      this.$emit("prev");
    },
    // 分发
    async sendClassType() {
      this.$emit("next");
      return;
      if (!this.selection.length) {
        this.$message.warning("请选择项目");
        return;
      }
      const arr = this.selection.map((item) => ({
        [item.id]: item[item.id],
      }));
      console.log(arr);
      const data = {
        from_organization_id: this.$route.query?.institution_id,
        project: JSON.stringify(arr),
      };
      this.submitLoading = true;
      const res = await sendClassType(data).catch(() => {});
      this.submitLoading = false;
      if (res.code === 0) {
        this.visible = false;
        this.$message.success(res.message);
        this.$emit("success");
      }
    },

    handleSelection(selection) {
      this.selection = selection;
    },
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
        category_id: data.category_id.pop(),
      };
      this.getProjectOrgList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getProjectOrgList();
    },
    handleSizeChange(size) {
      this.pageNum = 1;
      this.pageSize = size;
      this.getProjectOrgList();
    },
    // 项目列表
    async getProjectOrgList() {
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
        org_id: this.$route.query?.institution_id,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await getProjectOrgList(data);
      this.listLoading = false;
      this.listTotal = res.data.total;
      this.classTypes = res.data.class_type;
      this.listData = res.data.list.map((item) => {
        item[item.id] = [];
        res.data.class_type.forEach((child) => {
          item[item.id].push({
            ...child,
            price: "",
          });
        });
        return {
          ...item,
        };
      });
    },
    // 获取教材分类
    async getCateList() {
      const data = { list: true };
      const res = await getCateList(data);
      if (res.code === 0) {
        this.searchOptions[0].attrs.options = cloneOptions(
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

.distribute-project {
  .tips {
    color: #999;
    margin-bottom: 10px;
  }
  .container {
    &-actions {
      display: flex;
      .prev {
        margin-right: auto;
      }
    }
  }
}
</style>