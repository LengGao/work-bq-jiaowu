<template>
  <div>
    <div class="head_remind">
      *本模块主要是招生老师用来进行日常招生数据的跟进管理，包括学员意向录入、课程缴费报名等操作。
    </div>

    <section class="mainwrap">
      <ul class="navigation">
        <li
          v-for="item in tabFun"
          :key="item.id"
          :class="{ tabg: item.id == isTagactive }"
          @click="statusSwitch(item)"
        >
          {{ item.name }}
        </li>
      </ul>
      <div class="client_head">
        <search2
          :contentShow="true"
          api="getHomeclassifiList"
          inputText="学生姓名/手机号"
          @getTable="getTableList"
        ></search2>

        <div v-if="isTagactive === 2">
          <el-button type="primary" @click="toCreateClass">资源中心</el-button>
        </div>
        <div v-if="isTagactive === 1">
          <el-button type="primary" @click="toCreateClass">导入</el-button>
          <el-button type="primary" @click="toCreateClass('2')">添加</el-button>
        </div>
      </div>
      <!--表格-->
      <div class="userTable">
        <el-table
          ref="multipleTable"
          :data="schoolData"
          tooltip-effect="light"
          stripe
          @selection-change="handleSelectionChange"
          style="width: 100%;"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
          class="min_table"
        >
          <el-table-column type="selection" width="45"> </el-table-column>
          <el-table-column
            prop="course_id"
            label="学员编号"
            show-overflow-tooltip
            min-width="80"
          ></el-table-column>

          <el-table-column
            prop="course_name"
            label="学员姓名"
            min-width="100"
            column-key="course_id"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="category_name"
            label="手机号码"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="class_type_name"
            label="项目名称"
            min-width="200"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="course_price"
            label="学期"
            min-width="80"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column
            label="课程代码"
            min-width="100"
            show-overflow-tooltip
          >
          </el-table-column>

          <el-table-column
            label="课程名称"
            min-width="150"
            show-overflow-tooltip
          >
          </el-table-column>

          <el-table-column label="学分" min-width="100" show-overflow-tooltip>
          </el-table-column>

          <el-table-column
            label="总评成绩"
            min-width="100"
            show-overflow-tooltip
          >
          </el-table-column
          >\
          <el-table-column label="操作" fixed="right" min-width="200">
            <template slot-scope="{ row }">
              <div style="display: flex; justify-content: center">
                <el-button type="text" @click="toAchieveDetail(row.book_id)"
                  >成绩详情</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'courseManage',

  data() {
    return {
      ruleForm: {
        category_id: '',
      },
      isTagactive: 1,
      tabFun: [
        {
          id: 1,
          name: '学历教育',
        },
        {
          id: 2,
          name: '职称考证',
        },
        {
          id: 3,
          name: '特种作业',
        },
      ],

      page: 1,

      schoolData: [{ course_price: 132323 }],
      course_ids: [],
      datas: {},
      selectData: [],
    }
  },
  created() {},
  mounted() {
    // this.$api.getCourseManage(this, 'schoolData')
    // this.$api.getCategoryList(this, 'selectData')
  },

  methods: {
    toAchieveDetail() {
      this.$router.push({
        path: '/exa/achieveDetail',
      })
    },
    statusSwitch(ab) {
      this.isTagactive = ab.id
    },
    getTableList(state, val, datas) {
      if (state == 'page') {
        this.page = val
        this.datas = datas
      } else if (state == 'data') {
        this.schoolData = val
      }
    },
    doPageChange(page) {
      this.page = page
      this.$api.getCourseManage(this, 'schoolData', this.datas)
    },

    handleSelectionChange(val) {
      let multipleSelection = val
      this.course_ids = multipleSelection.map((i) => {
        console.log(i.course_id)
        return i.course_id
      })
    },
    toCreateClass(text) {
      //   console.log(text)
      //   let course_id = ''
      //   let setMeal = ''
      //   if (text == '2') {
      //     setMeal = text
      //   } else if (text.class_type_name == '套餐班') {
      //     setMeal = '2'
      //     course_id = text.course_id
      //   } else if (text.class_type_name == '单科班') {
      //     setMeal = '1'
      //     course_id = text.course_id
      //   } else {
      //     setMeal = '1'
      //   }
      this.$router.push({
        path: '/sou/createClass',
        query: {},
      })
    },

    release(ab, status) {
      let course_id = []
      course_id.push(ab.course_id)
      this.$api.bashPublish(this, course_id, status)
    },
    chapterVideo(index, row) {
      this.$router.push({
        path: '/eda/videoUpload',
        query: { video_collection_id: row.video_collection_id },
      })
    },
    scopes(id, sorts) {
      var regu = /^([1-9]\d*(\.\d*[1-9])?)|(0\.\d*[1-9])$/
      var re = new RegExp(regu)
      if (!re.test(sorts)) {
        this.$message.error('请输入正确的排序！')
        return false
      } else {
        this.$api.updateCourseSort(id, sorts, this)
      }
    },
    batchRelease() {
      if (this.course_ids.length > 0) {
        let status = 2
        this.$api.bashPublish(this, this.course_ids, status)
      } else {
        this.$message({
          type: 'warning',
          message: '请先勾选你想发布的项',
        })
      }
    },
    batchClose() {
      if (this.course_ids.length > 0) {
        let status = 1
        this.$api.bashPublish(this, this.course_ids, status)
      } else {
        this.$message({
          type: 'warning',
          message: '请先勾选你想关闭的项',
        })
      }
    },
    batchDeletion() {
      if (this.course_ids.length > 0) {
        this.$confirm(
          '你正在批量删除该条数据,数据删除后将无法恢复,请谨慎操作?',
          '提示',
          {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'warning',
          }
        )
          .then(() => {
            this.$api.bashDelete(this, this.course_ids)
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除',
            })
          })
      } else {
        this.$message({
          type: 'warning',
          message: '请先勾选你想删除的项',
        })
      }
    },
    handleDelete(ab) {
      console.log(ab)
      let course_id = ab.course_id
      this.$confirm(
        '你正在删除该条数据,数据删除后将无法恢复,请谨慎操作?',
        '提示',
        {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
        .then(() => {
          this.$api.deleteCourses(this, ab.course_id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
  },
  //   mounted() {}
}
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
  width: 220px;
  display: flex;
  justify-content: space-between;
  font-family: 'Microsoft YaHei UI', sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 22px;
  margin-bottom: 10px;
  li {
    height: 28px;
    font-size: 15px;

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
</style>
