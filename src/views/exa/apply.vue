<template>
    <div>
     <div class="head_remind">
      *本模块展示所有的班级数据，方便教务老师管理班级的日常工作。
    </div>

    <section class="mainwrap">
      
      <div class="client_head">
        <search2
          :courseTypeShow="true"
          :contentShow="true"
          typeTx="punch"
          inputText="学生姓名/手机号码"
          api="getCourseManage"
          @getTable="getTableList"
          :selectList="selectData.list"
        ></search2>
 
            <div>
          <el-button type="primary" @click="toCreateClass"
            >添加报考</el-button
          >
          <el-button type="primary" @click="toCreateClass('2')"
            >批量报考</el-button
          >
      
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
            label="ID"
            show-overflow-tooltip
            min-width="60"
          ></el-table-column>
       
          <el-table-column
            prop="course_name"
            label="学生姓名"
            min-width="180"
            column-key="course_id"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="category_name"
            label="手机号码"
            min-width="70"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="class_type_name"
            label="所属分类"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="course_price"
            label="课程名称"
            min-width="180"
            show-overflow-tooltip
          ></el-table-column>
       
          <el-table-column
            prop="max_num"
            label="考期"
            min-width="80"
            show-overflow-tooltip
          >
          </el-table-column>

          <el-table-column
            prop="max_time"
            label="报考时间"
            min-width="80"
            show-overflow-tooltip
          >
          </el-table-column>

          <el-table-column label="操作" fixed="right" min-width="200">
            <template slot-scope="scope">
              <div style="display: flex; justify-content:center;">
                <el-button type="text" @click="toCreateClass(scope.row)"
                  >编辑</el-button
                >
                
                <el-button type="text" @click="toCreateClass(scope.row)"
                  >删除</el-button
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
    name: 'apply',

     data() {
    return {
      toCreateClass:'',
      click:'',


      ruleForm: {
        category_id: '',
      },
      isTagactive: 1,
      tabFun: [
        {
          id: 1,
          name: '自建课程',
        },
        {
          id: 2,
          name: '公共课程',
        },
      ],
      page: 1,
      schoolData: [
        {
        course_id:1,
        course_price:8888,
        course_name:'中级经济师',
        category_name:'中级经济师',
        class_type_name:'2021年',
        max_num:200,
        max_time:2021,
        },
        {
        course_id:2,    
        course_price:8888,
        course_name:'信息系统项目管理师',
        category_name:'软考',
        class_type_name:'2021年',
        max_num:200,
        max_time:2021,
        }
      ],
      course_ids: [],
      datas: {},
      selectData: [],
    }
  },

    methods: {

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
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
    // tocreatePlan(text) {
 
    //   this.$router.push({
    //     path: '/exa/createplan',
    //     query: {},
    //   })
    // },


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
  width: 133px;
  display: flex;
  justify-content: space-between;
  font-family: 'Microsoft YaHei UI', sans-serif;
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
</style>

