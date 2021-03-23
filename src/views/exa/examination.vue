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
          
          <!--添加报考规则弹框--->
        <el-dialog
          title="添加报考规则"
          :visible.sync="guizeVisible"
          width="50%"
          style="min-width:1070px"
        >
          <el-form
            label-width="100px"
            class="demo-ruleForm"
            :show-message="true"
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
          >
          <h3>基本信息</h3>
            <el-row>
              <el-col :lg="11">
                <el-form-item label="所属分类" prop="category_name">
              <el-select v-model="ruleForm.category_name" placeholder="请选择所属分类" style="width:100%">
                <el-option label="学历教育" value="1"></el-option>
                <el-option label="职称考证" value="2"></el-option>
                <el-option label="特种作业" value="3"></el-option>
              </el-select>
            </el-form-item>
              </el-col>
              <el-col :lg="12">
                <el-form-item label="规则名称" prop="subject_name">
                  <el-input
                    class="input-width"
                    v-model="ruleForm.subject_name"
                    placeholder="请选择规则名称"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :lg="11">
                 <el-form-item label="考试科目" prop="exam_type">
              <el-select v-model="ruleForm.exam_type" placeholder="请选择考试科目（多选）" style="width:100%">
                <el-option label="系统集成基础知识" value="1"></el-option>
                <el-option label="系统集成应用技术" value="2"></el-option>
              </el-select>
            </el-form-item>
              </el-col>
             <el-col :lg="11">
                <el-form-item label="报考省市" prop="credit_hour">
                  <el-cascader
                    size="large"
                    :options="options"
                    v-model="selectedOptions"
                    @change="handleChange">
                  </el-cascader>
                
                </el-form-item>
              </el-col>
            </el-row>
            
            <el-row>
              <el-col :lg="11">
                <el-form-item label="补考费用" prop="cost">
                  <el-input
                    class="input-width"
                    placeholder="请输入补考费用"
                    v-model="ruleForm.cost"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="8">
                <el-form-item label="成绩有效期" prop="marry">
                  <div style="display:flex;align-items: center;margin-top:8px">
                  <el-radio-group v-model="ruleForm.period" style="width:250px">
                    <el-radio :label="2" value="0">永久</el-radio>
                    <el-radio :label="1">
                      <span>不超过</span>
                       <input class="inputach"></input>
                    <span>年</span>
                      </el-radio>
                  </el-radio-group>
                    </div>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :lg="17" >
                <el-form-item label="考评项目" prop="from_organization_id" v-for="(item,index) in projectData" :key="index">
                  <el-input
                    class="input-width"
                    placeholder="请输入考评项目"
                    v-model="item.from_organization_id"
                  ></el-input>
                     <el-button style="margin-left:10px " @click="deleteOneClass(index)" >删除</el-button>
                </el-form-item>
                 
              </el-col>
        
            </el-row>

            <el-row>
              <el-col>
                 <el-form-item>
                <el-button @click="addOneClass" style="border:1px dashed skyblue;color:skyblue;width:460px">+ 添加考勤项目</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <!-- <span>这是一段信息</span> -->
          <span slot="footer" class="dialog-footer">
            <el-button @click="curstomerVisible = false">取 消</el-button>
            <el-button type="primary" @click="preserve('ruleForm')"
              >保 存</el-button
            >
            <el-button type="primary" @click="preserve('ruleForm', 2)"
              >保存并报名</el-button
            >
          </span>
        </el-dialog>
          <!-- <el-dialog
          title="添加报考规则"
          :visible.sync="guizeVisible"
          width="30%"
          >
          <div>
           <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
            <el-form-item label="所属分类" prop="cate_id">
              <el-select v-model="ruleForm.cate_id" placeholder="请选择所属分类">
                <el-option label="学历教育" value="1"></el-option>
                <el-option label="职称考证" value="2"></el-option>
                <el-option label="特种作业" value="3"></el-option>
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

        </el-dialog> -->
        </div>

        <div v-if="isTagactive === 1">
         <div>
          <el-button type="primary" @click="addSubject">添加科目</el-button>
          <el-dialog
          :title="classTitle"
          :visible.sync="dialogVisible"
          width="43%"
          >

          <el-form
            label-width="100px"
            class="demo-ruleForm"
            :show-message="true"
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
           
          >
            <el-row>
              <el-col :lg="11">
                <el-form-item label="所属分类" prop="category_name">
              <el-select v-model="ruleForm.category_name" placeholder="请选择所属分类" style="width:100%">
                <el-option label="学历教育" value="1"></el-option>
                <el-option label="职称考证" value="2"></el-option>
                <el-option label="特种作业" value="3"></el-option>
              </el-select>
            </el-form-item>
              </el-col>
              <el-col :lg="12">
                <el-form-item label="科目名称" prop="subject_name">
                  <el-input
                    class="input-width"
                    v-model="ruleForm.subject_name"
                    placeholder="请选择科目名称"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :lg="11">
                <el-form-item label="考试总分" prop="total_score" >
                  <el-input
                    class="input-width"
                    v-model="ruleForm.total_score"
                    placeholder="请选择考试总分"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="11" class="pass_score">
                <el-form-item label="合格分数" prop="pass_score">
                  <el-input
                    class="input-width"
                    v-model="ruleForm.pass_score"
                    placeholder="请选择合格分数"
                  ></el-input>
                </el-form-item>
              </el-col>
             
            </el-row>
            <el-row>
              <el-col :lg="11">
                 <el-form-item label="科目性质" prop="exam_type">
              <el-select v-model="ruleForm.exam_type" placeholder="请选择科目性质" style="width:100%">
                <el-option label="必考" value="1"></el-option>
                <el-option label="选考" value="2"></el-option>
              </el-select>
            </el-form-item>
              </el-col>
             <el-col :lg="11">
                <el-form-item label="科目学分" prop="credit_hour">
                  <el-input
                    class="input-width"
                    v-model="ruleForm.credit_hour"
                    placeholder="请选择科目学分"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            
            <el-row>
              <el-col :lg="11">
                <el-form-item label="补考费用" prop="cost">
                  <el-input
                    class="input-width"
                    placeholder="请输入补考费用"
                    v-model="ruleForm.cost"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="8">
                <el-form-item label="成绩有效期" prop="marry">
                  <div style="display:flex;align-items: center;margin-top:8px">
                  <el-radio-group v-model="ruleForm.period" style="width:250px">
                    <el-radio :label="2" value="0">永久</el-radio>
                    <el-radio :label="1">
                      <span>不超过</span>
                       <input class="inputach"></input>
                    <span>年</span>
                      </el-radio>
                  </el-radio-group>
                    </div>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :lg="17" >
                <el-form-item label="考评项目" prop="from_organization_id" v-for="(item,index) in projectData" :key="index">
                  <el-input
                    class="input-width"
                    placeholder="请输入考评项目"
                    v-model="item.from_organization_id"
                  ></el-input>
                     <el-button style="margin-left:10px " @click="deleteOneClass(index)" >删除</el-button>
                </el-form-item>
                 
              </el-col>
        
            </el-row>

            <el-row>
              <el-col>
                 <el-form-item>
                <el-button @click="addOneClass" style="border:1px dashed #199fff;color:#199fff;width:460px">+ 添加考勤项目</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >保 存</el-button
            >
          </span>

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
                <el-button type="text" @click="editNotice(scope.row)"
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
                <el-button type="text" @click="editNotice(scope.row)"
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
import { regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data'

export default {
    name: 'examination',

    data() {
    return {
       options: regionDataPlus,
       selectedOptions: [],
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
      classTitle: '新建科目',
      projectData:[],
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
          id:'',
          category_name:'',
          subject_name:'',
          cate_id: '',
          cost: '',
          total_score: '',
          pass_score: ''
        },    
        rules: {
          
          category_name: [
            { required: true, message: '请选择所属分类', trigger: 'blur' },
          ],
          subject_name: [
            { required: true, message: '请输入科目名称', trigger: 'blur' },
          ],
          total_score: [
            { required: true, message: '请输入考试总分', trigger: 'blur' },
          ],
          pass_score: [
            { required: true, message: '请输入合格分数', trigger: 'blur' },
          ],
          exam_type: [
            { required: true, message: '', trigger: 'blur' },
          ],
          credit_hour: [
            { required: true, message: '请输入科目学分', trigger: 'blur' },
          ],
          cost: [
            { required: true, message: '请输入补考费用', trigger: 'blur' },
          ]
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
    // this.$api.updateSubject(this, 'subjectData')

  },
    methods: {
      handleChange (value) {
        console.log(this.selectedOptions)
        console.log(value)
        console.log(CodeToText[value[0]], CodeToText[value[1]], CodeToText[value[2]]);
      },

      deleteOneClass(index){
        this.projectData.splice(index,1)
      },
    
      addOneClass() {
      var obj = {
      }
      this.projectData.push(obj)
    },

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
            this.$api.updateSubject(this, this.ruleForm)
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
          category_name: '',
          cost: '',
          total_score: '',
          pass_score: ''
      }
      this.dialogVisible = true
    },

    handleDelete(ab) {
      console.log(ab)
      this.$confirm('此操作将删除该通知, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          console.log(ab.id)
          this.$api.deleteSubject(this, ab.id)


        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
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
 

    editNotice(ab) {
      console.log(ab)
      this.classTitle = '编辑科目'
      this.ruleForm = ab
      this.dialogVisible = true
    
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
.colright{
  text-align: right;
}
/deep/.el-radio-group{
  display: flex;
  align-items: center;
}
.inputach{
  width:32px;
  height:28px;
  border:1px solid #ccc;
  text-align: center;
  margin: 0 10px;
}
/deep/.el-form-item__content{
  display: flex;
}
.demo-ruleForm h3{
  border-left: 4px solid #199fff;
  font-size: 16px;
  font-weight: normal;
  padding-left: 8px;
  color: #444;
  margin-bottom: 15px;
  margin-left: 20px;
}
</style>

