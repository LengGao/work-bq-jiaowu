<template>
    <section>
       <div>
          <el-button type="primary" @click="addSubject">添加科目</el-button>
          <el-dialog
          :title="classTitle"
          :visible.sync="dialogVisible"
           :close-on-click-modal="false"
          width="43%"
        >
          <el-form
            label-width="100px"
            class="demo-ruleForm"
            :show-message="true"
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm">
            <el-row>
              <el-col :lg="11">
              <el-form-item label="所属分类">
              <el-cascader
              ref="cascader"
              style="width: 100%"
              placeholder="请选择分类"
              v-model="ruleForm.cate_id"
              :options="selectData"
            ></el-cascader>
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
                <el-option 
                v-for="item in oppos"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                ></el-option>
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
                <el-form-item label="考评项目" 
                prop="sub_subject"
                v-for="(item,index) in data"
                :key="index">
                  <el-input
                    class="input-width"
                    placeholder="请输入考评项目"
                    v-model="item.sub_subject"
                  ></el-input>
                  <el-button style="margin-left:10px" @click="deleteOneClass(index)">删除</el-button>
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
              >保 存</el-button>
          </span>
            </el-dialog>
              </div>

    </section>
</template>

<script>
import SearchList from '@/components/SearchList/index'
import { getCateList } from '@/api/sou'
import { provinceAndCityData } from 'element-china-area-data'

export default {
    name: 'examination',

    data() {
    return {
      subjectData:[],
      data:[],
      classTitle:'',
       changeSwitch:'',
       kmdata: [
        {
          value: '选项1',
          label: '系统集成基础知识',
        },
        {
          value: '选项2',
          label: '系统集成应用技术',
        },

      ],
      oppos:[{
        value:'1',
        label:'必考',
      },
      {
        value:'2',
        label:'选考',
      }
      ],
      searchData: {
        category_id: [],
        keyboard: '',
      },
      searchDatas: {
        category_id: [],
        keyboard: '',
      },
      searchOptions: [
        {
          key: 'category_id',
          type: 'cascader',
          attrs: {
            placeholder: '所属分类',
            clearable: true,
            options: [],
          },
        },

      ],

    ruleForm: {
          rule_name:'',
          photo_limit:'',
          id_card_limit:'',
          place_limit:'',
          age_limit:'',
          edu_limit:'',
          work_limit:'',
          health_limit:'',

          region:'',
          desc:'',
          id:'',
          category_name:'',
          subject_name:'',
          cate_id: '',
          cost: '',
          total_score: '',
          pass_score: ''
        },  

    rules: {
          cate_id: [
            { required: true, message: '', trigger: 'blur' },
          ],
          id_card_limit: [
            { required: true, message: '', trigger: 'blur' },
          ],
          place_limit: [
            { required: true, message: '', trigger: 'blur' },
          ],
          age_limit: [
            { required: true, message: '', trigger: 'blur' },
          ],
          edu_limit: [
            { required: true, message: '', trigger: 'blur' },
          ],
          work_limit: [
            { required: true, message: '', trigger: 'blur' },
          ],
          health_limit: [
            { required: true, message: '', trigger: 'blur' },
          ],

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
    this.$api.subjectList(this, 'subjectData')  //考试科目列表
    this.getCateList()
    // this.$api.updateSubject(this, 'subjectData')
    // this.$api.createRule(this, 'schoolData')  //添加规则
  },
    methods: {

      handleSearch(data) {
      this.pageNum = 1
      this.searchData = data
      this.$api.subjectList(this, 'subjectData')
    },
    handleSearchs(data) {
      this.pageNum = 1
      this.searchDatas = data
      console.log(this.isTagactive)
      if(this.isTagactive === 2){
      this.$api.ruleList(this, 'schoolData')
      }else{
   this.$api.subjectList(this, 'subjectData')  //考试科目列表
      }

    },

      //考试科目search
      async getCateList() {
      const data = { list: true }
      const res = await getCateList(data)
      if (res.code === 0) {
        this.cloneData(res.data, this.selectData)
        this.searchOptions[0].attrs.options = this.selectData
        this.searchOptionss[0].attrs.options = this.selectData
      }
    },
    cloneData(data, newData) {
      data.forEach((item, index) => {
        newData[index] = {}
        newData[index].value = item.category_id
        newData[index].label = item.category_name
        if (item.son && item.son.length) {
          newData[index].children = []
          this.cloneData(item.son, newData[index].children)
        }
      })
    },

    async subjectList() {
      const data = {
        page: this.pageNum,
        ...this.searchData,
        category_id: this.searchData.category_id.pop(),
      }
      this.listLoading = true
      const res = await subjectList(data)
      this.listLoading = false
      this.listData = res.data.data
      this.listTotal = res.data.total
    },

      deleteOneClass(index){
        this.data.splice(index,1)
      },
      addOneClass() {
      var obj = {}
      this.data.push(obj)
    },

      submitForm(formName) {
        console.log(this.ruleForm)
        this.$refs[formName].validate((valid) => {
          if (valid) {
           if (this.ruleForm.id) {
            //修改
            this.$api.updateSubject(this, this.ruleForm)
            this.$api.subjectList(this, 'subjectData') 
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
      this.classTitle = '添加科目'
      this.dialogVisible = true
       this.ruleForm = {
        subject_name:'',
          category_name: '',
          cost: '',
          total_score: '',
          pass_score: ''
      }
      
    },
    addRegistration(){
      this.ruleTitle = '添加报考规则'
      this.guizeVisible = true
       this.ruleForm = {
        subject_name:'',

      }
      
    },

    handleDelete(ab) {
      console.log(ab)
      this.$confirm('此操作将删除, 是否继续?', '提示', {
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

    deleterule(ab) {
      console.log(ab)
      this.$confirm('此操作将删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          console.log(ab.id)
          this.$api.deleteRule(this, ab.id)

        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
      editNotice(id) {
      this.classTitle = '编辑科目'
      this.ruleForm = id
      this.dialogVisible = true
      this.$api.updateSubject(this, this.ruleForm, 'GET')
    },

  },

}
</script>

<style lang="scss" scoped>
.userTable {
  margin-top: 20px;
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
  width:25px;
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
.gztitle{
  border-left: 4px solid #199fff;
  font-size: 16px;
  margin: 0 0 20px 20px;
  padding-left: 8px;
}
.radiocss{
  margin-top: 12px;
}

</style>

