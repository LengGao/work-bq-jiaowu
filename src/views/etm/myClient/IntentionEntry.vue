<template>
  <section class="mainwrap">
    <!--表单部分-->
    <el-form
      label-width="110px"
      class="demo-ruleForm"
      :show-message="true"
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
    >
      <el-row>
        <el-row>
          <el-col :sm="8">
            <el-form-item label="学员姓名" prop="realname">
              <el-input
                v-model="ruleForm.realname"
                placeholder="请输入学员姓名"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="8">
            <el-form-item label="手机号码" prop="mobile">
              <el-input
                placeholder="手机号码即为登录账号"
                type="number"
                v-model="ruleForm.mobile"
                :disabled="ruleForm.intent_id ? true : false"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="8">
            <el-form-item label="学员性别" prop="sex">
              <el-radio-group v-model="ruleForm.sex">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="2">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>

          <el-col :sm="8">
            <el-form-item label="渠道来源" prop="sources">
              <el-select
                filterable
                v-model="ruleForm.sources"
                placeholder="请选择渠道来源"
                @change="channelistChange"
              >
                <el-option
                  v-for="item in channelist.field_content"
                  :key="item.field_id"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :sm="8">
            <el-form-item label="所属机构" prop="organization_id">
              <el-select
                filterable
                v-model="ruleForm.organization_id"
                placeholder="请选择所属机构"
                @change="campusShow"
              >
                <el-option
                  v-for="item in organData.list"
                  :key="item.institution_id"
                  :label="item.institution_name"
                  :value="item.institution_id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :sm="8" v-if="ruleForm.organization_id != ''">
            <el-form-item label="所属校区" prop="school_id">
              <el-select
                filterable
                placeholder="请选择所属校区"
                v-model="ruleForm.school_id"
              >
                <el-option
                  v-for="item in campusData.list"
                  :key="item.institution_id"
                  :label="item.institution_name"
                  :value="item.institution_id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :sm="8">
            <el-form-item label="课程类型" prop="class_type_id">
              <el-select
                filterable
                v-model="ruleForm.class_type_id"
                placeholder="请选择课程类型"
                @change="getCournamezx"
              >
                <el-option
                  v-for="item in selectData.list"
                  :key="item.category_id"
                  :label="item.category_name"
                  :value="item.category_id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="8">
            <el-form-item label="课程班型" prop="class_type">
              <el-select
                filterable
                v-model="ruleForm.class_type"
                placeholder="请选择课程班型"
                :disabled="ruleForm.class_type_id == '' ? true : false"
                @change="getCourname"
              >
                <el-option
                  v-for="item in classTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :sm="8">
            <el-form-item label="课程名称">
              <el-select
                filterable
                :disabled="ruleForm.class_type_id == '' ? true : false"
                v-model="ruleForm.course_id"
                placeholder="请选择课程名称"
                @change="getCourseName"
              >
                <el-option
                  v-for="item in Courname.list"
                  :key="item.course_id"
                  :label="item.course_name"
                  :value="item.course_id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :sm="8">
            <el-form-item label="身份证号码" prop="identity_card">
              <el-input
                v-model="ruleForm.identity_card"
                placeholder="请输入身份证号码"
              ></el-input>
            </el-form-item>
          </el-col>

          <template v-if="ruleForm.intent_id">
            <el-col :sm="8">
              <el-form-item label="所属老师" prop="connsultan_id">
                <el-select
                  filterable
                  v-model="ruleForm.connsultan_id"
                  placeholder="请选择所属老师"
                  @change="changeLeaning"
                >
                  <el-option
                    v-for="item in teacherData.list"
                    :key="item.teacher_id"
                    :label="item.teacher_name"
                    :value="item.teacher_id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <el-form-item label="学员编号">
                <el-input v-model="ruleForm.uid" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <el-form-item label="注册时间">
                <el-input v-model="ruleForm.create_time" disabled></el-input>
              </el-form-item>
            </el-col>
          </template>
        </el-row>
        <el-row>
          <el-col :sm="8" v-for="item in course_data" :key="item.field_id">
            <el-form-item :label="item.field_text" prop="">
              <el-input
                v-model="course_Arr[item.field_name]"
                v-if="item.field_type == 'text'"
                placeholder="请输入"
              ></el-input>
              <el-select
                filterable
                :multiple="item.field_type == 'multi_select' ? true : false"
                v-if="
                  item.field_type == 'select' ||
                    item.field_type == 'multi_select'
                "
                v-model="course_Arr[item.field_name]"
                placeholder="请选择"
              >
                <el-option
                  v-for="(conte, index) in item.field_content"
                  :key="index"
                  :label="conte"
                  :value="conte"
                >
                </el-option>
              </el-select>
              <el-date-picker
                v-if="item.field_type == 'date'"
                v-model="course_Arr[item.field_name]"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="学员头像" class="visibility" prop="comment">
          <div v-show="!haschoose">
            <div class="headPortrait el-icon-plus" @click="addIcon"></div>
            <div style="color:#aaa;ling-height:20px">
              <p><span> 1. 支持jpg、jpeg、png、gif、bmp格式；</span></p>
              <p><span> 2. 推荐尺寸200*200px或者1:1</span></p>
            </div>
          </div>
          <div v-show="haschoose" class=" imageBox ">
            <i class=" iconjia el-icon-plus" @click="addIcon"></i>
            <img style="width:100%;height:100%;" :src="url" alt="" />
          </div>
        </el-form-item>
        <el-row>
          <el-form-item label="跟进记录" class="textarea_date" prop="comment">
            <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="ruleForm.comment"
            ></el-input>
          </el-form-item>
        </el-row>
      </el-row>
      <div class="entybtn">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="saveLink('ruleForm')">保存</el-button>
      </div>
    </el-form>
    <imgDialog
      v-if="pictureVisible"
      @closeImg="closeImg"
      @clearUrl="clearUrl"
    ></imgDialog>
  </section>
</template>

<script>
export default {
  name: 'IntentionEntry',
  data() {
    var checkphone = (rule, value, callback) => {
      // let phoneReg = /(^1[3|4|5|6|7|8|9]\d{9}$)|(^09\d{8}$)/;
      if (value == '') {
        callback(new Error('请输入手机号'))
      } else if (!this.isCellPhone(value)) {
        //引入methods中封装的检查手机格式的方法
        callback(new Error('请输入正确的手机号!'))
      } else {
        callback()
      }
    }
    return {
      course_data: [],
      course_Arr: [],
      channelist: [],
      url: '',
      pictureVisible: false,
      haschoose: false,
      ruleForm: {
        intent_id: 0,
        realname: '',
        mobile: '',
        identity_card: '',
        sources: '',
        class_type: '',
        course_name: '',
        course_id: '',
        organization_id: '',
        connsultan_id: '',
        comment: '',
        sex: '',
        user_img: '',
        class_type_id: '',
        school_id: '',
      },
      rules: {
        realname: [
          { required: true, message: '请填写学生姓名', trigger: 'blur' },
          { min: 2, max: 36, message: '长度在 2 到 36 个字符' },
        ],
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          {
            validator: function(rule, value, callback) {
              if (/^1\d\d{9}$/.test(value) == false) {
                callback(new Error('请输入正确的手机号'))
              } else {
                callback()
              }
            },
            trigger: 'blur',
          },
        ],
        // identity_card: [
        //   { required: true, message: '请输入身份证ID', trigger: 'blur' },
        //   {
        //      validator: function(rule, value, callback) {
        //       if (/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value) == false) {
        //         callback(new Error('你的身份证格式不正确'))
        //       } else {
        //         callback()
        //       }
        //     },
        //     trigger: 'blur',
        //   },
        // ],
        // sources: [
        //   { required: true, message: '请填写渠道来源', trigger: 'change' },
        // ],
        class_type: [
          { required: true, message: '请填写课程类型', trigger: 'change' },
        ],
        course_id: [
          { required: true, message: '请填写课程id', trigger: 'change' },
        ],
        organization_id: [
          { required: true, message: '请填写机构id', trigger: 'change' },
        ],
      },

      classTypeList: [
        {
          value: 1,
          label: '单科班',
        },
        {
          value: 2,
          label: '套餐班',
        },
      ],

      // courseTypeList: [
      //   { value: 1, label: '职称类' },
      //   { value: 2, label: '财经类' },
      // ],
      organData: [],
      campusData: [],
      teacherData: [],
      radio: '',
      selectData: [],
      Courname: [],
      // imageUrl: '',
    }
  },
  created() {
    //推荐机构列表
    this.$api.getRecommender(this, 'organData')
    //授课老师列表
    this.$api.getTeacherList(this, 'teacherData')
    this.ruleForm.intent_id = this.$route.query.intent_id
    console.log(this.$route.query.intent_id)
    console.log(this.ruleForm.intent_id)
    //课程分类列表
    this.$api.getCategoryList(this, 'selectData')
  },
  mounted() {
    let way = 'GET'
    this.$api.addintention(this, way)
    let field_text = '渠道来源'
    this.$api.getfieldinfo(this, 'channelist', field_text)
    //get编辑意向学员数据

    if (this.ruleForm.intent_id != undefined) {
      this.$api.editIntendStu(this)
    }
  },
  // activated: function() {
  //   // console.log(JSON.parse(this.$route.query.url))
  //   if (this.$route.query.url != undefined) {
  //     this.url = JSON.parse(this.$route.query.url)
  //     this.ruleForm.user_img = JSON.parse(this.$route.query.url)
  //     this.haschoose = true
  //   }
  // },
  methods: {
    getCourseName(ab) {
      let courseNameList = this.Courname.list
      console.log(courseNameList, '789789')
      let course_Arr = courseNameList.map((i) => {
        if (i.course_id == ab) return i.course_name
      })
      this.ruleForm.course_name = course_Arr.toString()
      console.log(this.ruleForm.course_name)
    },
    campusShow() {
      if (this.ruleForm.organization_id != '') {
        this.ruleForm.school_id = ''
        this.$api.getSubBlock(this, 'campusData')
      }
    },
    clearUrl() {
      // this.url = ''
      // this.haschoose = false
      this.pictureVisible = false
    },
    closeImg(radioUrl) {
      // console.log(radioUrl + '我好睡')
      this.pictureVisible = false
      if (radioUrl != undefined) {
        this.haschoose = true
        this.url = radioUrl
        this.ruleForm.user_img = radioUrl
      } else {
        this.url = ''
        this.ruleForm.user_img = ''
        this.haschoose = false
      }
    },
    cancel() {
      this.$router.go(-1)
      // console.log(this.organData)
      // this.$router.push({
      //   path: '/etm/enrollmentManagement',
      // })
    },
    getCourname() {
      // if (this.ruleForm.intent_id != undefined) {
      this.ruleForm.course_id = ''
      // }

      this.$api.relateCourse(this, 'Courname')
      console.log(this.ruleForm.class_type_id, this.ruleForm.class_type)
    },
    getCournamezx() {
      this.ruleForm.course_id = ''
      if (this.ruleForm.intent_id != undefined) {
        if (this.ruleForm.class_type != '') {
          this.$api.relateCourse(this, 'Courname')
        } else {
          this.$message({
            type: 'warning',
            message: '请选择课程班型!',
          })
        }
      }
    },
    changeLeaning() {},
    channelistChange() {},
    //检查手机号
    isCellPhone(val) {
      if (!/^1(3|4|5|6|7|8)\d{9}$/.test(val)) {
        return false
      } else {
        return true
      }
    },
    addIcon() {
      this.pictureVisible = true
    },
    saveLink(formName) {
      let course_Array = this.course_Arr
      console.log(course_Array)
      for (let i in course_Array) {
        console.log(course_Array[i] instanceof Array)
        if (course_Array[i] instanceof Array == true) {
          let course_str = course_Array[i].join('#')
          course_Array[i] = course_str
        }
      }
      const returnedTarget = Object.assign({}, course_Array, this.ruleForm)
      this.ruleForm = returnedTarget
      console.log(this.ruleForm)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.ruleForm.intent_id) {
            let way = 'POST'
            this.$api.editIntendStu(this, way, this.ruleForm)
          } else {
            console.log(this.ruleForm)
            this.$api.addintention(this, this.ruleForm)
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
/deep/.el-form-item__label {
  padding: 0 30px 0 0;
}
.main {
  padding: 20px;
  margin: 20px;
  background: #fff;
}
.breadcrumb {
  display: flex !important;
  justify-content: flex-start;
}
.el-input {
  width: 238px;
}
.el-select {
  width: 238px;
}
.entybtn {
  display: flex;
  justify-content: flex-start;
  padding-left: 90px;
}
.el-textarea {
  max-width: 850px;
  min-width: 400px;
}
// .colleft {
//   .el-row {
//     padding-bottom: 20px;
//   }
// }
.imgBox {
  width: 87px;
  height: 87px;
  border: 1px solid rgba(220, 223, 230, 1);
  background: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 36px;
  color: #aaa;
  border-radius: 4px;
  cursor: pointer;
}
.imgBox_warn {
  line-height: 30px;
  padding-top: 10px;
  color: #aaa;
}
.headPortrait {
  width: 87px;
  height: 87px;
  background: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  color: #3333;
  border: 1px solid rgba(220, 223, 230, 1);
  border-radius: 5px;
}
.headPortrait:hover {
  border: 1px solid rgba(240, 240, 240, 1);
  cursor: pointer;
}
.imageBox {
  width: 87px;
  height: 87px;
  position: relative;
}
.iconjia {
  font-size: 40px;
  color: #fff;
  display: none;
  position: absolute;
  width: 87px;
  height: 87px;
  line-height: 87px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.78);
  opacity: 0.5;
}

.imageBox:hover i {
  display: block;
}
</style>
