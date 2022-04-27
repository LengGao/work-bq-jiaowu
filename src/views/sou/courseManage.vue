<template>
  <div>
    <!-- <div class="head_remind">
      *本模块主要是招生老师用来进行日常招生数据的跟进管理，包括学员意向录入、课程缴费报名等操作。
    </div> -->

    <section class="mainwrap">
      <!-- <ul class="navigation">
        <li
          v-for="item in tabFun"
          :key="item.id"
          :class="{ tabg: item.id == isTagactive }"
          @click="statusSwitch(item)"
        >
          {{ item.name }}
        </li>
      </ul> -->
      <div class="client_head">
        <SearchList
          :options="searchOptions"
          :data="searchData"
          @on-search="handleSearch"
        />
        <!-- <div v-if="isTagactive === 2">
          <el-button type="primary" @click="toCreateClass">资源中心</el-button>
        </div> -->
        <div v-if="isTagactive === 1">
          <el-button type="primary" @click="toCreateClass">添加课程</el-button>
        </div>
      </div>
      <!--表格-->
      <div class="userTable">
        <el-table
          ref="multipleTable"
          :data="listData"
          v-loading="listLoading"
          element-loading-text="loading"
          element-loading-spinner="el-icon-loading"
          element-loading-background="#fff"
          tooltip-effect="light"
          stripe
          style="width: 100%"
          :header-cell-style="{ 'text-align': 'center' }"
          class="min_table"
        >
          <!-- :cell-style="{ 'text-align': 'center' }" -->

          <el-table-column type="selection" width="45"> </el-table-column>
          <el-table-column
            prop="course_id"
            label="课程编号"
            show-overflow-tooltip
            min-width="90"
            align="center"
          ></el-table-column>

          <el-table-column
            prop="course_name"
            label="课程名称"
            min-width="240"
            column-key="course_name"
            align="left"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="category_name"
            label="课程分类"
            min-width="100"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="class_type_name"
            label="课程班型"
            align="center"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="course_price"
            label="课程价格"
            align="center"
            min-width="80"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="detect_info"
            label="总时长"
            align="center"
            min-width="80"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <span class="circle"
                ><span
                  class="circle-value primary"
                  :class="{ info: !row.duration }"
                  >{{ row.duration }}</span
                ></span
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="detect_info"
            label="视频信息"
            align="center"
            min-width="220"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <span class="circle"
                >视频<span
                  class="circle-value"
                  :class="{ info: !row.videoCount }"
                  >({{ row.videoCount }})</span
                ></span
              >
              <span class="circle"
                >免费<span
                  class="circle-value"
                  :class="{ info: !row.freeCount }"
                  >({{ row.freeCount }})</span
                ></span
              >
              <span class="circle"
                >禁快进<span
                  class="circle-value"
                  :class="{ info: !row.progressOffCount }"
                  >({{ row.progressOffCount }})</span
                ></span
              >
              <span class="circle"
                >实名<span
                  class="circle-value"
                  :class="{ info: !row.detectCount }"
                  >({{ row.detectCount }})</span
                ></span
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="user_count"
            label="购买人数"
            align="center"
            min-width="80"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="user_count"
            label="是否为监管课程"
            align="center"
            min-width="90"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <span>{{ row.is_regulatory ? "是" : "否" }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="监管校验"
            align="center"
            min-width="100"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <el-switch
                v-if="row.is_regulatory"
                v-model="row.regulatory_detect_status"
                active-color="#2798ee"
                inactive-color="#eaeefb"
                :active-value="1"
                :inactive-value="0"
                @change="updateForCourseJgDetect(row)"
              >
              </el-switch>
              <span v-else>--</span>
            </template>
          </el-table-column>
          <el-table-column
            label="是否上架"
            align="center"
            min-width="100"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.is_publish"
                active-color="#2798ee"
                inactive-color="#eaeefb"
                :active-value="1"
                :inactive-value="2"
                @change="release(scope.row, $event)"
              >
              </el-switch>
            </template>
          </el-table-column>

          <el-table-column
            label="操作"
            fixed="right"
            align="center"
            min-width="200"
          >
            <template slot-scope="scope">
              <div style="display: flex; justify-content: center">
                <el-button
                  type="text"
                  v-if="scope.row.class_type == 1"
                  @click="toConfigureCourses(scope.row)"
                  >配置</el-button
                >
                <el-button type="text" @click="toCourseStudent(scope.row)"
                  >统计</el-button
                >
                <el-button
                  type="text"
                  v-if="scope.row.class_type == 1"
                  @click="toCreateClass(scope.row)"
                  >编辑</el-button
                >
                <el-button type="text" @click="handleDelete(scope.row)"
                  >删除</el-button
                >
              </div>
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
import SearchList from "@/components/SearchList/index";
import {
  getCourseList,
  getCateList,
  bashPublish,
  deleteCourses,
  updateForCourseJgDetect,
} from "@/api/sou";
export default {
  course_id: "",
  components: {
    SearchList,
  },
  name: "courseManage",
  data() {
    return {
      ruleForm: {
        category_id: "",
      },
      isTagactive: 1,
      tabFun: [
        {
          id: 1,
          name: "自建课程",
        },
        {
          id: 2,
          name: "公共课程",
        },
      ],
      selectData: [],
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        course_category_id: [],
        course_name: "",
      },
      searchOptions: [
        {
          key: "course_category_id",
          type: "cascader",
          attrs: {
            clearable: true,
            options: [{ value: 1, label: "test" }],
          },
        },
        {
          key: "course_name",
          attrs: {
            placeholder: "课程名称",
          },
        },
      ],
    };
  },
  created() {
    this.getCourseList();
    this.getCateList();
  },
  mounted() {},

  methods: {
    // 监管校验开关
    async updateForCourseJgDetect(row) {
      const data = {
        regulatory_detect_status: row.regulatory_detect_status,
        course_id: row.course_id,
      };
      const res = await updateForCourseJgDetect(data).catch(() => {
        row.regulatory_detect_status = row.regulatory_detect_status ? 0 : 1;
      });
      if (res.code === 0) {
        this.$message.success(res.message);
      }
    },
    toCourseStudent(row) {
      this.$router.push({
        name: "studentList",
        query: {
          course_id: row.course_id,
        },
      });
    },
    handleDelete(row) {
      this.$confirm("你正在删除该课程,,请谨慎操作?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteCourses(row.course_id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    toConfigureCourses(row) {
      this.$router.push({
        path: "/sou/configureCourses",
        query: {
          course_name: row.course_name,
          course_id: row.course_id,
        },
      });
    },
    async bashPublish(ab) {
      const data = { course_ids: [ab.course_id], is_publish: ab.is_publish };
      const res = await bashPublish(data);
      console.log(res);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.getCourseList();
      }
    },
    async deleteCourses(course_id) {
      const data = { course_id: course_id };
      const res = await deleteCourses(data);
      console.log(res);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.getCourseList();
      }
    },
    release(ab, status) {
      this.bashPublish(ab);
    },
    statusSwitch(ab) {
      console.log(ab.id);
      this.isTagactive = ab.id;
    },

    async getCateList() {
      const data = { list: true };
      const res = await getCateList(data);
      if (res.code === 0) {
        this.cloneData(res.data, this.selectData);
        this.searchOptions[0].attrs.options = this.selectData;
      }
    },
    cloneData(data, newData) {
      data.forEach((item, index) => {
        newData[index] = {};
        newData[index].value = item.category_id;
        newData[index].label = item.category_name;
        if (item.son && item.son.length) {
          newData[index].children = [];
          this.cloneData(item.son, newData[index].children);
        }
      });
    },
    toCreateClass(ab) {
      this.$router.push({
        path: "/sou/createClass",
        query: {
          course_id: ab.course_id,
        },
      });
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getCourseList();
    },
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
        course_category_id: data.course_category_id.pop(),
      };
      this.getCourseList();
    },
    async getCourseList() {
      const data = {
        page: this.pageNum,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await getCourseList(data);
      this.listLoading = false;
      this.listData = res.data.list;
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
.main {
  padding: 20px;
  margin: 20px;
  background: #fff;
}

.head_remind {
  padding: 20px;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  color: #909399;
  width: 100%;
  border-bottom: 15px solid #f2f6fc;
}
.navigation {
  width: 133px;
  display: flex;
  justify-content: space-between;
  font-family: "Microsoft YaHei UI", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  margin-bottom: 10px;
  li {
    height: 28px;
    font-size: 14px;

    border-bottom: 2px solid #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    cursor: pointer;
    color: #666666;
  }
  li:last-child {
    margin-right: 0px !important;
  }
  li:hover {
    color: #199fff;
    border-bottom: 2px solid #199fff;
  }
}
.tabg {
  //background: #2798ee;
  color: #2798ee !important;
  border-bottom: 2px solid #199fff !important;
}
.client_head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.userTable {
  margin-top: 20px;
}
.batch_btn {
  padding-top: 20px;
  .el-button {
    margin-right: 25px;
  }
}
/deep/.tablescope {
  .el-switch__label--left {
    position: absolute;
    left: 10px;
    color: #fff;
    z-index: -1;
  }
  .el-switch__label--right {
    position: absolute;
    color: #fff;
    z-index: -1;
  }
  .el-switch__label--right.is-active {
    z-index: 1;
    color: #fff !important;
  }
  .el-switch__label--left.is-active {
    z-index: 1;
    color: #9c9c9c !important;
  }
  .is-checked {
    padding: 0;
  }
}
.table_bottom {
  text-align: right;
}
.circle {
  margin-right: 8px;
  &-value {
    display: inline-block;
    margin-left: 3px;
    text-align: center;
    color: #6dd152;
    &.info {
      color: #bbb;
    }
  }
}
</style>
