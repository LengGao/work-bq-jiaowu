<template>
  <div class="distribute-courses">
    <div class="head_remind">*将课程批量分发给入驻机构</div>
    <div class="container">
      <div class="container-table">
        <div class="table-left">
          <Title text="分发课程" />
          <div class="tab-search">
            <SearchList
              :options="searchLeftOptions"
              :data="searchLeftData"
              @on-search="handleLeftSearch"
            />
            <p class="tips">
              *注意：价格为0表示该班型免费，价格为-1表示该班型不能报名
            </p>
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
              label="课程名称"
              show-overflow-tooltip
              min-width="240"
              align="left"
              prop="course_name"
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
              <template slot-scope="{ row }">
                <el-input
                  type="number"
                  size="small"
                  v-model="row[row.course_id][item.id]"
                  placeholder="请输入"
                >
                </el-input>
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
          分发课程数量：<span>{{ leftSelection.length }}</span>
          个，分发机构数量：<span>{{ rightSelection.length }}</span> 个
        </p>
        <div>
          <el-button @click="handleReset">取消</el-button>
          <el-button
            type="primary"
            :loading="submitLoading"
            @click="assignOrgCourse"
            >确定分发</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { cloneOptions } from "@/utils/index";
import { getCateList } from "@/api/sou";
import {
  getDistributeCourseList,
  getOrgList,
  assignOrgCourse,
} from "@/api/institution";
export default {
  name: "distributeCourses",
  data() {
    return {
      listLeftData: [],
      listLeftLoading: false,
      listLeftTotal: 0,
      pageLeftNum: 1,
      pageLeftSize: 20,
      searchLeftData: {
        search_box: "",
        cate_id: [],
      },
      searchLeftOptions: [
        {
          key: "cate_id",
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
          key: "search_box",
          attrs: {
            placeholder: "课程名称",
          },
        },
      ],
      classTypes: [],
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
    this.getDistributeCourseList();
    this.getOrgList();
    this.getCateList();
  },
  methods: {
    handleReset() {
      this.getOrgList();
      this.getDistributeCourseList();
    },
    // 把输入的价格存到本地
    setCoursePrice(newData) {
      const oldData = JSON.parse(localStorage.getItem("coursePrice"));
      localStorage.setItem(
        "coursePrice",
        JSON.stringify({
          ...oldData,
          ...newData,
        })
      );
    },
    // 分发
    async assignOrgCourse() {
      if (!this.leftSelection.length) {
        this.$message.warning("请选择课程");
        return;
      }
      if (!this.rightSelection.length) {
        this.$message.warning("请选择机构");
        return;
      }
      const coursePriceMap = {};
      const arr = this.leftSelection.map((item) => ({
        [item.course_id]: item[item.course_id],
      }));
      arr.forEach((item) => {
        for (const key in item) {
          coursePriceMap[key] = item[key];
        }
      });
      const data = {
        org_arr: this.rightSelection,
        course_id_arr: coursePriceMap,
      };
      this.submitLoading = true;
      const res = await assignOrgCourse(data).catch(() => {});
      this.submitLoading = false;
      if (res.code === 0) {
        this.$message.success(res.message);
        this.handleReset();
        this.setCoursePrice(coursePriceMap);
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
        cate_id: data.cate_id.pop(),
      };
      this.getDistributeCourseList();
    },
    handleLeftPageChange(val) {
      this.pageLeftNum = val;
      this.getDistributeCourseList();
    },
    handleLeftSizeChange(size) {
      this.pageLeftNum = 1;
      this.pageLeftSize = size;
      this.getDistributeCourseList();
    },
    // 课程列表
    async getDistributeCourseList() {
      const data = {
        page: this.pageLeftNum,
        limit: this.pageLeftSize,
        ...this.searchLeftData,
      };
      this.listLeftLoading = true;
      const res = await getDistributeCourseList(data);
      const coursePrice = JSON.parse(localStorage.getItem("coursePrice"));
      this.listLeftLoading = false;
      this.listLeftTotal = res.data.total;
      this.classTypes = res.data.class_type;
      this.listLeftData = res.data.list.map((item) => {
        item[item.course_id] = {};
        res.data.class_type.forEach((child) => {
          // 默认价格为本地缓存的价格
          if (
            coursePrice &&
            coursePrice[item.course_id] &&
            coursePrice[item.course_id][child.id]
          ) {
            item[item.course_id][child.id] =
              coursePrice[item.course_id][child.id];
          } else {
            item[item.course_id][child.id] = "";
          }
        });
        return {
          ...item,
        };
      });
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
        width: 70%;
        flex-shrink: 0;
      }
      .table-right {
        width: 28%;
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