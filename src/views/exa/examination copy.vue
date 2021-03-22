<template>
    <div>
     <div class="head_remind">
      *本模块展示所有的班级数据，方便教务老师管理班级的日常工作。
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
          :courseTypeShow="true"
          :contentShow="true"
          typeTx="punch"
          inputText="考试科目名称"
          api="getCourseManage"
          @getTable="getTableList"
          :selectList="selectData.list"
          v-if="isTagactive === 1"
        ></search2>

        <search2
          :courseTypeShow="true"
          :contentShow="true"
          typeTx="punch"
          inputText="报考规则"
          api="getCourseManage"
          @getTable="getTableList"
          :selectList="selectData.list"
          v-if="isTagactive === 2"
        ></search2>

        
        <div v-if="isTagactive === 2">
          <el-button type="primary" @click="guizeVisible = true">添加报考规则</el-button>
          
          <el-dialog
          title="添加报考规则"
          :visible.sync="guizeVisible"
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

             <el-form-item label="规则名称" prop="name">
              <el-input v-model="ruleForm.name" style="width:220px"></el-input>
            </el-form-item>

             <el-form-item label="报考省市" prop="max_num">
              省  市
            </el-form-item>

            <el-form-item label="个人照片" prop="photo">
               <el-radio v-model="radio" label="1">白底一寸照</el-radio>
               <el-radio v-model="radio" label="2">蓝底一寸照</el-radio>
            </el-form-item>

            <el-form-item label="身份证件" prop="ID">
               <el-radio v-model="radio1" label="1">无限制</el-radio>
               <el-radio v-model="radio1" label="2">中国公民</el-radio>
            </el-form-item>

            <el-form-item label="年龄要求" prop="age">
               <el-radio v-model="radio2" label="1">无限制</el-radio>
               <el-radio v-model="radio2" label="2" class="agecon">年满
                 <el-input v-model="ruleForm.age" class="inputage"></el-input>周岁
               不超过
                 <el-input v-model="ruleForm.age" class="inputage"></el-input>周岁
               </el-radio>
            </el-form-item>

            <el-form-item label="籍贯生源" prop="place">
               <el-radio v-model="radio3" label="1">无限制</el-radio>
               <el-radio v-model="radio3" label="2">本地生源</el-radio>
            </el-form-item>

             <el-form-item label="学历要求" prop="edu">
               <el-radio v-model="radio4" label="1">无限制</el-radio>
               <el-radio v-model="radio4" label="2">

                 <el-select v-model="ruleForm.edu" placeholder="文化程度" style="width:140px">
                <el-option label="小学" value="primary"></el-option>
                <el-option label="初中" value="junior"></el-option>
                <el-option label="高中" value="high"></el-option>
                <el-option label="专科" value="specialty"></el-option>
                <el-option label="本科" value="undergraduate"></el-option>
              </el-select>

               </el-radio>
            </el-form-item>

             <el-form-item label="工作年限" prop="years">
               <el-radio v-model="radio5" label="1">无限制</el-radio>
               <el-radio v-model="radio5" label="2" class="agecon">从事相关工作满
                 <el-input v-model="ruleForm.age" class="inputage"></el-input>年
               </el-radio>
            </el-form-item>

            <el-form-item label="个人健康" prop="healthy">
               <el-radio v-model="radio6" label="1">无限制</el-radio>
               <el-radio v-model="radio6" label="2">身体状况良好</el-radio>
            </el-form-item>

             <el-form-item label="备注信息" prop="remarks">
                 <el-input v-model="ruleForm.remarks" style="width:80%"></el-input>
            </el-form-item>

            <el-form-item>
               <el-button @click="guizeVisible = false">取 消</el-button>
              <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
            </el-form-item>
          </el-form>

          </div>

        </el-dialog>
        </div>

        <div v-if="isTagactive === 1">
         <div>
          <el-button type="primary" @click="addSubject">添加科目</el-button>
          <el-dialog
          title="添加科目"
          :visible.sync="dialogVisible"
          width="50%"
          >
          <div>
           <el-form :model="ruleForm" 
           :rules="rules" 
           ref="ruleForm" 
           label-width="300px" 
           class="demo-ruleForm"
          
           >
            <el-form-item label="所属分类" prop="cate_id">
              <el-select v-model="ruleForm.cate_id" placeholder="请选择所属分类">
                <el-option label="学历教育" value="1"></el-option>
                <el-option label="职称考证" value="2"></el-option>
                <el-option label="特种作业" value="3"></el-option>
              </el-select>
            </el-form-item>

             <el-form-item label="科目名称">
              <el-input v-model="ruleForm.subject_name" placeholder="请输入科目名称" style="width:220px"></el-input>
            </el-form-item>

             <el-form-item label="补考费用" prop="cost">
              <el-input v-model="ruleForm.cost" placeholder="请输入补考费用" style="width:220px"></el-input>
            </el-form-item>

            <el-form-item label="考试总分" prop="total_score">
              <el-input v-model="ruleForm.total_score" placeholder="请输入考试总分" style="width:220px"></el-input>
            </el-form-item>

            <el-form-item label="合格分数" prop="pass_score">
              <el-input v-model="ruleForm.pass_score" placeholder="请输入合格分数" style="width:220px"></el-input>
            </el-form-item>
            
            <!-- <el-form-item label="补考规则" prop="desc">
              分数小于
               <el-input v-model="ruleForm.desc" style="width:50px"></el-input>
               分时需要补考
            </el-form-item> -->
            
          </el-form>
          <span slot="footer" class="dialog-footer">
               <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
            </span>
          </div>

        </el-dialog>
        </div>
        </div>
      </div>
   
      <!--表格-->
      <div class="userTable" v-if="isTagactive === 1">
        <el-table
          ref="multipleTable"
          :data="subjectData.list"
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
            prop="category_name"
            label="所属分类"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="subject_name"
            label="考试科目"
            min-width="160"
            column-key="subject_name"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="exam_type"
            label="科目性质"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="total_score"
            label="考试总分"
            min-width="180"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="pass_score"
            label="合格分数"
            min-width="80"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="credit_hour"
            label="科目学分"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="cost"
            label="补考费用"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>
          
          <el-table-column

            label="是否启用"
            min-width="80"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <el-switch
                active-color="#13ce66"
                v-model="scope.row.status"
                :active-value="1"
                :inactive-value="2"
                @change="changeSwitch(scope.row)"
              >
              </el-switch>
            </template>
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
        <div class="table_bottom">
          <page
            :data="subjectData.total"
            :curpage="page"
            @pageChange="doPageChange"
          />
        </div>
      </div>

       <!--表格-->
      <div class="userTable" v-if="isTagactive === 2">
        <el-table
          ref="multipleTable"
          :data="schoolData.list"
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
            prop="rule_name"
            label="报考规则"
            min-width="160"
            column-key="rule_name"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="category_name	"
            label="所属分类"
            min-width="120"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="region"
            label="报考省市"
            min-width="120"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="comment"
            label="备注信息"
            min-width="290"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="是否启用"
            min-width="80"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <el-switch
                active-color="#13ce66"
                v-model="scope.row.status"
                :active-value="1"
                :inactive-value="2"
                @change="changeSwitch(scope.row)"
              >
              </el-switch>
            </template>
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

         <div class="table_bottom">
          <page
            :data="schoolData.total"
            :curpage="page"
            @pageChange="doPageChange"
          />
        </div>

      </div>
    </section>
    </div>

</template>

<script>
export default {
    name: 'examination',

    data() {
      
    return {
      radio: '0',
      radio1: '0',
      radio2: '0',
      radio3: '0',
      radio4: '0',
      radio5: '0',
      radio6: '0',
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
          // name: '',
          // exam: '',
          // score: '',
          // delivery: false,
          // type: [],
          // qualified: '',
          // desc: '',

          cate_id:'',
          subject_name: '',
          total_score: '',
          pass_score: '',
          exam_type: '',
          credit_hour: '',
          cost: '',
          period: '',
          from_organization_id: ''

        },    
        rules: {
          cate_id: [
            { required: true, message: '请选择所属分类', trigger: 'blur' },
          ],
          subject_name: [
            { required: true, message: '请输入科目名称', trigger: 'blur' },
          ],
          cost: [
            { required: true, message: '请输入补考费用', trigger: 'change' }
          ],
          total_score: [
            { required: true, message: '请输入考试总分', trigger: 'change' }
          ],
          pass_score: [
            { message: '请输入合格分数', trigger: 'change' }
          ],

          max_num: [
            {required: true, message: '请选择报考省市', trigger: 'blur' }
          ],
          photo: [
            {required: true, message: '请选择个人照片', trigger: 'blur' }
          ],
          ID: [
            {required: true, message: '请选择身份证件', trigger: 'blur' }
          ],
          age: [
            {required: true, message: '请选择年龄段', trigger: 'blur' }
          ],
          place: [
            {required: true, message: '请选择籍贯', trigger: 'blur' }
          ],
          edu: [
            {required: true, message: '请选择学历', trigger: 'blur' }
          ],
          years: [
            {required: true, message: '请选择', trigger: 'blur' }
          ],
          healthy: [
            {required: true, message: '请选择', trigger: 'blur' }
          ],
       
        },

      dialogVisible: false,
      guizeVisible:false,
      isTagactive: 1,
      tabFun: [
        {
          id: 1,
          name: '考试科目',
        },
        {
          id: 2,
          name: '报考规则',
        },
      ],
      page: 1,
      schoolData: [],
      subjectData: [],
      createData: [],
      course_ids: [],
      datas: {},
      selectData: [],
    }
  },

  mounted() {
    this.$api.ruleList(this, 'schoolData'),
    this.$api.subjectList(this, 'subjectData')
  },
    methods: {
      
      receiveStudent(zx) {
      console.log(zx)
      this.$api.receive(this, zx.intent_id)
    },
    doPageChange(page) {
      this.page = page
      this.$api.subjectList(this, 'subjectData', this.datas)
    },
    doPageChange(page) {
      this.page = page
      this.$api.createSubject(this, 'createData', this.datas)
    },
    doPageChange(page) {
      this.page = page
      this.$api.ruleList(this, 'schoolData', this.datas)
    },

      submitForm(formName) {
        console.log(this.ruleForm)
        this.$refs[formName].validate((valid) => {
          if (valid) {
           if (this.ruleForm.id) {
            //修改
            this.$api.updateRoom(this, this.ruleForm)
          } else {
            //添加科目
            this.$api.createSubject(this, this.ruleForm)
          }
          }else {
            console.log('error submit!!');
            return false;
          }
        });
      },

    addSubject(){
       this.ruleForm = {
        subject_name:'',
          cate_id: '',
          cost: '',
          total_score: '',
          pass_score: ''
      }
      this.dialogVisible = true
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

/deep/.inputage .el-input__inner {
  width: 30px;
  height: 30px;
  margin: 0;
  padding: 0;
  text-align: center;
}
.agecon{
  width: 40px;
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
.table_bottom{
  text-align: right;
}


</style>

