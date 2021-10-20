<template>
  <div class="college-student">
    <div class="college-student-container">
      <div class="tree-list">
        <div class="question-bank-list">
          <div class="tree-list">
            <p class="title">课程分类</p>
            <v-tree ref="tree" :tpl="tpl" :data="treeData" />
          </div>
        </div>
      </div>
      <div class="table-list">
        <!--搜索模块-->
        <div class="college-student-search">
          <SearchList :options="searchOptions" :data="searchData" @on-search="handleSearch" />
          <span>*注意：价格为0表示该班型免费，价格为-1表示该班型不能报名
          </span>
          <el-button type="primary" class="addcourse">添加课程</el-button>
        </div>
        <!--列表-->
        <div class="userTable">
          <el-table :data="listData" v-loading="listLoading" element-loading-text="loading"
            element-loading-spinner="el-icon-loading" element-loading-background="#fff" tooltip-effect="light" stripe
            style="width: 100%" :header-cell-style="{
              'text-align': 'center',
              background: '#f8f8f8',
            }" :cell-style="{ 'text-align': 'center' }" height="690" :key="isActiveAll">
            <el-table-column prop="course_id" label="课程ID" min-width="60" show-overflow-tooltip>
            </el-table-column>
            <el-table-column v-if="isActiveAll" prop="course_name" label="课程名称" min-width="160" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="category_name" label="所属分类" min-width="80" show-overflow-tooltip>
            </el-table-column>
            <el-table-column v-if="isActiveAll" prop="lesson_count" label="课时数量" show-overflow-tooltip min-width="80">
            </el-table-column>
            <el-table-column v-if="isActiveAll" prop="user_count" label="购买人数" show-overflow-tooltip min-width="80">
            </el-table-column>
            <el-table-column prop="user_realname" :label="item.title" min-width="70" align="center"
              show-overflow-tooltip v-for="(item, index) in classTypes" :key="index">
              <template slot-scope="{ row }">
                <el-input type="number" size="small" v-model="row[row.course_id][item.id]" placeholder="请输入">
                </el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" min-width="100">
              <template slot-scope="{ row }">
                <el-button type="text" @click="handleDelete(row.id)">
                  移除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="table_bottom">
          <page :data="listTotal" :curpage="pageNum" @pageSizeChange="handleSizeChange"
            @pageChange="handlePageChange" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { updateStudentBasicInfo } from "@/api/eda";
  import { courseCateSelectTree, getCourseList, deleteOrgCourse } from "@/api/institution";
  export default {
    name: "BasicInfo",
    data() {
      return {
        searchData: {
          search_box: "",
        },
        searchOptions: [
          {
            key: "search_box",
            attrs: {
              placeholder: "课程名称",
            },
          },
        ],
        dialogVisible: false,
        listData: [],
        listLoading: false,
        pageNum: 1,
        pageSize: 20,
        listTotal: 0,
        treeData: [],
        treeParams: {
          cate_id: ""
        },
        isActiveAll: true,
        classTypes: [],
      };
    },
    created() {
      this.courseCateSelectTree(),
      this.getCourseList()
      // console.log(this.$route.query.institution_id)
    },
    methods: {
      handleDelete(id) {
        this.$confirm('此操作将永久删除该课程, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            this.deleteOrgCourse(id)
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除',
            })
          })
      },
      tpl(node) {
        return (
          <span
            class={{
              "tree-node": true,
              "tree-node--active": this.treeParams.cate_id === node.id,
            }}
            onClick={() => this.onNodeClick(node)}
          >
            {node.name === "全部" ? node.name : `${node.name} (${node.count})`}
          </span>
        );
      },
      async courseCateSelectTree() {
        const data = {
          org_id: this.$route.query.institution_id,
        };
        console.log(data)
        const res = await courseCateSelectTree(data);
        if (res.code === 0) {
          this.treeData = [
            {
              id: "",
              name: "全部",
              expanded: true,
              children: res.data.map(({ children, ...rest }) => rest),
            },
          ];
        }
      },

      onNodeClick(data) {
        const { id: cate_id } = data;
        this.treeParams = { cate_id };
        this.getCourseList();
      },

      handleSizeChange(size) {
        this.pageSize = size;
        this.getCourseList();
      },

      handleSearch(data) {
        this.pageNum = 1;
        this.searchData = {
          ...data,
        };
        this.getCourseList();
      },

      handlePageChange(val) {
        this.pageNum = val;
        this.getCourseList();
      },

      // 获取列表
      async getCourseList() {
        const data = {
          page: this.pageNum,
          limit: this.pageSize,
          ...this.searchData,
          ...this.treeParams,
          org_id: this.$route.query?.institution_id || "",
        };
        console.log(data)
        this.listLoading = true;
        const res = await getCourseList(data);
        this.listLoading = false;
        this.listTotal = res.data.total;
        const coursePrice = JSON.parse(localStorage.getItem("coursePrice"));
        this.classTypes = res.data.class_type;
        this.listData = res.data.list.map((item) => {
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
      // 移除课程
      async deleteOrgCourse(id) {
        const data = {
          id,
        }
        console.log(data)
        const res = await deleteOrgCourse(data)
        if (res.code == 0) {
          console.log(res)
          this.$message.success(res.message)
          this.getCourseList()
          this.dialogVisible = false
        }
        this.getCourseList()
      },
    },
  };
</script>

<style lang="scss" scoped>
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

  .college-student {
    &-container {
      padding: 10px 20px 20px 0;
      display: flex;
      .tree-list {
        width: 200px;
        flex-shrink: 0;
        border-right: 1px solid #eee;
        margin-right: 20px;
        height: 80vh;
        overflow-x: hidden;
        overflow-y: auto;

        .title {
          color: #444;
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 10px;
        }

        h5 {
          color: #444;
        }
      }

      .table-list {
        flex: 1;
        overflow: hidden;
      }
    }

    .copy-number {
      color: #199fff;
      cursor: pointer;
      margin-left: 8px;
    }

    .table_bottom {
      display: flex;
      justify-content: space-between;
      padding-bottom: 0;
      float: right;
    }
  }

  .college-student-search {
    display: flex;
    justify-content: flex-start;
    span {
      font-size: 14px;
      color: #999;
      line-height: 40px;
    }
  }
  .addcourse {
    margin-left: auto;
    height: 40px;
    line-height: 18px;
  }
</style>