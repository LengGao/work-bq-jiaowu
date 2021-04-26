<template>
  <div>
    <div class="head_remind">
      *项目作为售卖的对象，包含课程、题库、教材等配置信息。
    </div>
    <section class="mainwrap">
      <div class="head-search">
        <SearchList :options="searchOptions" :data="searchData" @on-search="handleSearch" />
        <el-button type="primary" @click="projectDialog"> 添加项目 </el-button>
      </div>
      <!--表格-->
      <div class="userTable">
        <el-table ref="multipleTable" :data="schoolData.data" style="width: 100%" class="min_table" :header-cell-style="{ 'text-align': 'center' }" :cell-style="{ 'text-align': 'center' }">
          <el-table-column label="项目ID" show-overflow-tooltip min-width="90" prop="project_id">
          </el-table-column>
          <el-table-column prop="project_name" label="项目名称" min-width="200" show-overflow-tooltip></el-table-column>
          <el-table-column prop="category_name" label="所属分类" min-width="110" show-overflow-tooltip></el-table-column>
          <el-table-column prop="project_price" label="价格" min-width="110" show-overflow-tooltip></el-table-column>
          <el-table-column prop="lowest_price" label="最低价格" min-width="110" show-overflow-tooltip></el-table-column>

          <el-table-column prop="buy_number" label="购买人数" min-width="110" show-overflow-tooltip></el-table-column>

          <el-table-column label="是否启用" min-width="150" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-switch active-color="#13ce66" v-model="scope.row.project_status" :active-value="1" :inactive-value="2" @change="changeSwitch(scope.row)">
              </el-switch>
            </template>
          </el-table-column>

          <el-table-column prop="1" label="合同模板" min-width="100" show-overflow-tooltip>
            <template slot-scope="{row}">
              <el-button type="text" class="templatebtn" @click="templatebtn(row)">关联模板</el-button>
            </template>
          </el-table-column>

          <el-table-column label="操作" fixed="right" min-width="200">
            <template slot-scope="scope">
              <div style="display: flex; justify-content: center">
                <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
                <el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="table_bottom">
          <page :data="listTotal" :curpage="pageNum" @pageChange="handlePageChange" />
        </div>
      </div>
      <!--添加项目弹框-->
      <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" :close-on-click-modal="false" width="1000px">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <h3 class="project-h3" style="margin-bottom: 20px">基本信息</h3>
          <el-row>
            <el-col :lg="12" :sm="12" :xs="12" :md="12">
              <el-form-item label="项目名称" prop="project_name">
                <el-input placeholder="请输入项目名称" v-model="ruleForm.project_name" class="input-width"></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="12" :sm="12" :xs="12" :md="12">
              <el-form-item label="所属分类">
                <el-cascader class="common-width" v-model="ruleForm.category_id" :options="selectData" :props="{ checkStrictly: true }" @change="handleChange"></el-cascader>
                <!-- <el-input
                  placeholder="请输入分类名称"
                  v-model="ruleForm.category_id"
                  class="input-width"
                ></el-input> -->
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :lg="12" :sm="12" :xs="12" :md="12">
              <el-form-item label="项目价格" prop="price">
                <el-input type="number" placeholder="请输入项目价格" v-model="ruleForm.price" class="input-width"></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="12" :sm="12" :xs="12" :md="12">
              <el-form-item label="最低价格" prop="lowest_price">
                <el-input type="number" placeholder="请输入最低价格" v-model="ruleForm.lowest_price" class="input-width"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :lg="12" :sm="12" :xs="12" :md="12">
              <el-form-item label="项目周期">
                <el-radio-group v-model="ruleForm.service_type" @change="choseServicetype">
                  <el-radio :label="1">服务时长</el-radio>
                  <el-radio :label="2">有效期限</el-radio>
                </el-radio-group>
                <el-select v-if="ruleForm.service_type == 1" v-model="ruleForm.service_period" placeholder="请选择服务时长">
                  <el-option v-for="item in timeOptions" :key="item.id" :label="item.value" :value="item.id">
                  </el-option>
                </el-select>
                <el-date-picker v-if="ruleForm.service_type == 2" v-model="ruleForm.service_effective" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <!-- <el-col :lg="12" :sm="12" :xs="12" :md="12">
              <el-form-item label="适用范围">
                <el-radio-group v-model="ruleForm.applay">
                  <el-radio :label="1">当前校区</el-radio>
                  <el-radio :label="2">全部校区</el-radio>
              
                </el-radio-group>
              </el-form-item>
            </el-col> -->
          </el-row>

          <el-row>
            <el-col :lg="12" :sm="12" :xs="12" :md="12">
              <el-form-item label="是否启用">
                <el-radio-group v-model="ruleForm.status">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="2">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :lg="12" :sm="12" :xs="12" :md="12"> </el-col>
          </el-row>
        </el-form>
        <h3 class="project-h3" style="margin-bottom: 20px">项目配置</h3>
        <ul class="project-ul">
          <li>课程</li>
          <li class="project-tag">
            <el-tag v-for="item in courseTag" :key="item.course_id" style="margin: 0 5px 5px 0">{{ item.course_name }}</el-tag>
          </li>
          <li @click="courseDialogShow(courseTag)" style="cursor: pointer">
            选择
          </li>
        </ul>
        <ul class="project-ul">
          <li>题库</li>
          <li class="project-tag">
            <el-tag v-for="item in quesTag" :key="item.id" style="margin: 0 5px 5px 0">{{ item.title }}</el-tag>
          </li>
          <li style="cursor: pointer" @click="questionShow">选择</li>
        </ul>
        <ul class="project-ul">
          <li>教材</li>
          <li class="project-tag">
            <el-tag v-for="item in materialTag" :key="item.book_id" style="margin: 0 5px 5px 0">{{ item.book_name }}</el-tag>
          </li>
          <li @click="materialDialogShow" style="cursor: pointer">选择</li>
        </ul>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleConfirm('ruleForm')">确 定</el-button>
        </span>
      </el-dialog>
      <CourseDialog v-model="showCourse" @on-coursesuccess="handlecourse" :courseTag="courseTag" />
      <MaterialDialog v-model="showMaterial" @on-materialsuccess="handleMaterial" :materialTag="materialTag" />
      <QuestionBank v-model="showQues" :quesTag="quesTag" @on-quesuccess="handleQuestion" />

      <Asstemplate v-model="assdialog" :id="currentId" :project_id='project_id' @on-success="getCateList" :contractInfo="contractInfo" />

    </section>
  </div>
</template>

<script>
import { getCateList } from '@/api/sou'
import CourseDialog from './components/courseDialog'
import MaterialDialog from './components/materialDialog'
import QuestionBank from './components/QuestionBank'
import Asstemplate from './components/asstemplate'

export default {
  name: 'projectManage',
  components: {
    CourseDialog,
    MaterialDialog,
    QuestionBank,
    Asstemplate,
  },
  data() {
    return {
      project_id: '',
      contractInfo: {},
      currentId: '',
      assdialog: false,
      id: '',
      dialogTitle: '添加项目',
      selectData: [],
      pageNum: 1,
      listTotal: 0,
      searchData: {
        category_id: [],
        keyword: '',
      },
      ruleForm: {
        project_name: '',
        category_id: '',
        price: '',
        lowest_price: '',
        service_period: '',
        service_type: 1,
        service_effective: '',
        course: [1, 2, 3],
        problem: [1, 2, 3],
        textbooks: [1, 2, 3],
        status: '',

        school: '',
      },
      searchOptions: [
        {
          key: 'category_id',
          type: 'cascader',

          attrs: {
            clearable: true,
            placeholder: '选择类别',
            options: [{ value: 1, label: 'test' }],
          },
        },
        {
          key: 'keyword',
          attrs: {
            placeholder: '项目名称',
            clearable: true,
          },
        },
      ],
      rules: {
        project_name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        category_id: [{ required: true, message: '请输入活动名称', trigger: 'change' }],
        price: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        lowest_price: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
      },

      timeOptions: [
        {
          id: 1,
          value: '1年',
        },
        {
          id: 2,
          value: '2年',
        },
        {
          id: 3,
          value: '3年',
        },
        {
          id: 4,
          value: '永久',
        },
      ],
      schoolData: [],
      dialogVisible: false,
      showCourse: false,
      courseTag: [],
      materialTag: [],
      quesTag: [],
      showMaterial: false,
      showQues: false,
    }
  },
  created() {
    this.getCateList()
    this.$api.getProjectList(this, 'schoolData')
  },

  methods: {
    templatebtn(row) {
      this.assdialog = true
      this.project_id = row.project_id
      // this.currentId = id
      this.contractInfo = row
      console.log(row)
    },
    handlecourse(selection) {
      console.log(selection)
      this.courseTag = selection
    },
    handleMaterial(selection) {
      this.materialTag = selection
    },
    handleQuestion(selection) {
      this.quesTag = selection
    },
    questionShow() {
      this.showQues = true
    },
    materialDialogShow() {
      this.showMaterial = true
    },

    courseDialogShow() {
      this.showCourse = true

      // this.courseTag  = courseTag
    },
    handleChange() {
      console.log(this.ruleForm.category_id)
    },
    changeSwitch(ab) {
      console.log(ab)
      let formData = {
        project_id: ab.project_id,
        project_name: ab.project_name,
        category_id: ab.category_id,
        price: ab.project_price,
        lowest_price: ab.lowest_price,
        status: ab.project_status,
      }
      this.$api.editProject(this, formData, 'POST')
    },
    handlePageChange(val) {
      this.pageNum = val
      this.$api.getProjectList(this, 'schoolData')
    },
    handleSearch(data) {
      this.pageNum = 1
      this.searchData = data
      this.$api.getProjectList(this, 'schoolData')
    },
    async getCateList() {
      const data = { list: true }
      const res = await getCateList(data)
      if (res.code === 0) {
        this.cloneData(res.data, this.selectData)
        console.log(this.selectData)
        this.searchOptions[0].attrs.options = this.selectData
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
    choseServicetype(ab) {
      switch (ab) {
        case 1:
          this.ruleForm.service_effective = ''
          break
        case 2:
          this.ruleForm.service_period = ''
          break
      }
    },
    handleEdit(ab) {
      // for (var item in this.ruleForm) {
      //   this.ruleForm[item] = ''
      // }
      this.ruleForm.project_id = ab.project_id
      this.dialogTitle = '编辑项目'
      this.dialogVisible = true
      this.$api.editProject(this, this.ruleForm, 'GET')
    },
    handleDelete(ab) {
      this.$confirm('此操作将删除该项目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$api.deleteproject(this, ab.project_id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    getTableList() {},
    projectDialog() {
      this.courseTag = []
      this.materialTag = []
      this.quesTag = []
      this.dialogTitle = '添加项目'
      this.dialogVisible = true
      //初始化参数
      this.ruleForm = {
        project_name: '',
        category_id: '',
        price: '',
        lowest_price: '',
        service_period: '',
        service_type: 1,
        service_effective: '',
        course: [],
        problem: [],
        textbooks: [],
        status: '',
        school: '',
      }
    },
    handleConfirm(formName) {
      //所选课程
      this.ruleForm.course = this.courseTag.map((i) => {
        return i.course_id
      })
      //所选教材
      this.ruleForm.textbooks = this.materialTag.map((i) => {
        return i.book_id
      })
      //所选题库
      this.ruleForm.problem = this.quesTag.map((i) => {
        return i.id
      })
      // console.log(this.quesTag)
      // console.log(this.ruleForm)
      if (this.ruleForm.category_id.length) {
        this.ruleForm.category_id = this.ruleForm.category_id.pop()
      }
      console.log(this.ruleForm.course_id)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.ruleForm.id) {
            this.$api.editProject(this, this.ruleForm, 'POST')
          } else {
            this.$api.createProject(this, this.ruleForm)
          }
        } else {
          console.log('error submit!!')
          return false
        }
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
.input-width {
  width: 240px;
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
.head-search {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.project-h3 {
  font-family: 'Microsoft YaHei UI', sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.580392156862745);
  line-height: 16px;
  border-left: 3px solid #199fff;
  padding-left: 5px;
}
.project-ul {
  width: 100%;
  border-top: 1px solid rgba(235, 238, 245, 1);
  border-left: 1px solid rgba(235, 238, 245, 1);
  border-right: 1px solid rgba(235, 238, 245, 1);
  display: flex;
  align-items: center;
  min-height: 45px;

  li:first-child {
    list-style: none;
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  li:last-child {
    list-style: none;
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-left: 1px solid rgba(235, 238, 245, 1);
    color: #199fff;
  }
}
.project-ul:last-child {
  border-bottom: 1px solid rgba(235, 238, 245, 1);
}
.project-tag {
  min-width: 45px;
  width: 100%;
  margin-top: 4px;
  list-style: none;
  padding-left: 20px;
  overflow: hidden;
}
.table_bottom {
  text-align: right;
}
.templatebtn {
  background: #f5fcff;
  border: 1px solid #cbe9f6;
  padding: 10px 8px;
}
</style>
