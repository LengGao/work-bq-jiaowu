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
          inputText="课程名称"
          api="getCourseManage"
          @getTable="getTableList"
          :selectList="selectData.list"
        ></search2>
        
        <div>
          <el-button type="primary" @click="dialogVisible = true">添加考试计划</el-button>
          <el-dialog
          title="添加考试计划"
          :visible.sync="dialogVisible"
          width="30%"
          >
          <div>

           <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">

           

            <el-form-item label="所属分类" prop="cate_id">
              <el-select v-model="ruleForm.cate_id" placeholder="请选择所属分类">
                <el-option label="学历教育" value="xueli"></el-option>
                <el-option label="职称考证" value="zhicheng"></el-option>
                <el-option label="特种作业" value="tezhong"></el-option>
              </el-select>
            </el-form-item>

             <el-form-item label="考试计划名称" prop="name">
              <el-input v-model="ruleForm.name" style="width:220px"></el-input>
            </el-form-item>

            <el-form-item label="考试时间" required>

               <el-date-picker
                v-model="value1"
                type="date"
                placeholder="选择日期"
                style="width:125px;margin-right:5px;">
              </el-date-picker>


              <el-time-select
              placeholder="起始时间"
              v-model="start_time"
              :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '18:30',
                
              }"
              style="width:120px;margin-right:5px;">
             
              </el-time-select>
               至
              <el-time-select
                placeholder="结束时间"
                v-model="end_time"
                :picker-options="{
                  start: '08:30',
                  step: '00:15',
                  end: '18:30',
                  minTime: startTime
                }"
                style="width:120px;">
              </el-time-select>

            </el-form-item>

            
            <el-form-item label="报考时间" required>
             

               <div class="block">
              <el-date-picker
                v-model="value1"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </div>
            </el-form-item>
     
             <el-form-item label="计划人数" prop="max_num">
              <el-input v-model="ruleForm.max_num" style="width:220px"></el-input>
            </el-form-item>
            
            <el-form-item label="补考规则" prop="desc">
              分数小于
               <el-input v-model="ruleForm.desc" style="width:50px"></el-input>
               分时需要补考
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>

          </el-form>

          </div>

        </el-dialog>

      
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
            prop="id"
            label="ID"
            show-overflow-tooltip
            min-width="60"
          ></el-table-column>
       
          <el-table-column
            prop="course_name"
            label="考试计划"
            min-width="180"
            column-key="course_id"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="e_name"
            label="所属分类"
            min-width="70"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="create_time"
            label="考试时间"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="start_time"
            label="报考时间"
            min-width="180"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column
            prop="max_num"
            label="计划人数"
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
    name: 'examination',

    data() {
    return {
      end_time:'',
      start_time:'',
      startTime:'',


      pickerOptions: {
          shortcuts: [{
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
         
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        value2: '',

       ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },    
        rules: {
          name: [
            { required: true, message: '请输入考试名称', trigger: 'blur' },
          ],
          cate_id: [
            { required: true, message: '', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
         
          max_num: [
            {type: 'date', required: true, message: '请填写计划人数',  trigger: 'change' }
          ],
          desc: [
            { type: 'date', required: true, message: '请填写分数', trigger: 'blur' }
          ]
        },

      dialogVisible: false,
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
      // {
      //   course_id:1,
      //   course_name:'20209090123',
      //   class_type_name:1360000000,
      //   course_price:888,
      //   max_num:888,
      //   max_time:'已付款',
      //   },
      ],
      course_ids: [],
      datas: {},
      selectData: [],
    }
  },

    mounted() {
    // let status = 3
    this.$api.planList(this, 'schoolData')
  },
    methods: {
      receiveStudent(zx) {
      console.log(zx)
      this.$api.receive(this, zx.intent_id)
    },
    doPageChange(page) {
      this.page = page
      // this.$api.getMyclient(this, 'myclient', status)
      this.$api.planList(this, 'schoolData', this.datas)
    },

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

