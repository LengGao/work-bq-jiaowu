<template>
  <section class="mainwrap">
    <!--表单部分-->

    <el-row>
      <el-col :sm="16" :md="16" class="colleft">
        <el-form
          label-width="140px"
          class="demo-ruleForm"
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          :show-message="true"
          label-position="right"
        >
          <!--左边部分-->
          <el-row>
            <el-col :sm="12">
              <el-form-item label="课程分类" prop="course_category_id">
                <el-select
                  filterable
                  v-model="ruleForm.course_category_id"
                  placeholder="请选择课程分类"
                >
                  <el-option
                    v-for="item in classifiData.list"
                    :key="item.category_id"
                    :label="item.category_name"
                    :value="item.category_id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :sm="12">
              <el-form-item label="任课老师" prop="teacher_id">
                <el-select
                  filterable
                  v-model="ruleForm.teacher_id"
                  placeholder="请选择任课老师"
                >
                  <el-option
                    v-for="item in teacherData"
                    :key="item.teacher_id"
                    :label="item.teacher_name"
                    :value="item.teacher_id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <el-form-item label="课程名称" prop="course_name">
                <el-input
                  style="width:740px;"
                  v-model="ruleForm.course_name"
                  placeholder="请输入课程名称"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :sm="12">
              <el-form-item label="首页分类" prop="index_category_id">
                <el-select
                  filterable
                  v-model="ruleForm.index_category_id"
                  placeholder="请选择首页分类"
                >
                  <el-option
                    v-for="item in homeData.list"
                    :key="item.index_category_id"
                    :label="item.index_category_name"
                    :value="item.index_category_id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="全部课程排序" prop="sort">
                <el-input
                  type="number"
                  v-model="ruleForm.sort"
                  placeholder="排序数字越大课程越靠前"
                ></el-input>
              </el-form-item>
              <el-form-item label="课程价格" prop="course_price">
                <el-input
                  placeholder="请输入课程价格"
                  v-model="ruleForm.course_price"
                  type="number"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="12">
              <el-form-item label="课程封面" prop="cover_img">
                <div v-show="!haschoose">
                  <div class="headPortrait el-icon-plus" @click="addIcon"></div>
                  <div style="color:#aaa;ling-height:20px">
                    <p><span> 1. 支持jpg、jpeg、png、gif、bmp格式；</span></p>
                    <p><span> 2. 推荐尺寸750*420px或者16:9</span></p>
                  </div>
                </div>
                <div v-show="haschoose" class=" imageBox ">
                  <i class=" iconjia el-icon-plus" @click="addIcon"></i>
                  <img
                    style="width:100%;height:100%; border-radius: 3px"
                    :src="url"
                    alt=""
                  />
                </div>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row style="z-index:1">
            <el-form-item
              label="课程介绍"
              class="textarea_date"
              prop="introduction"
            >
              <div id="caseAnalyse"></div>
              <!--<kindeditor
                @kindeditorChange="changeParentTitle"
                :content="ruleForm.introduction"
                height="200px"
                id="caseAnalyse"
              />-->
              <!-- <el-input
                type="textarea"
                placeholder="请输入内容"
                v-model="ruleForm.introduction"
              ></el-input> -->
            </el-form-item>
          </el-row>
        </el-form>
      </el-col>
      <el-col :sm="8" :md="8"></el-col>
    </el-row>
    <div class="entybtn">
      <!-- <el-button @click="releaseCourse('ruleForm', 'is_publish')"
        >保存草稿</el-button
      > -->
      <el-button>取消</el-button>
      <el-button type="primary">保存</el-button>
      <el-button type="primary" @click="toConfigureCourses"
        >保存并配置</el-button
      >
    </div>
    <!-- <imgDialog
      v-if="pictureVisible"
      @closeImg="closeImg"
      @clearUrl="clearUrl"
    ></imgDialog> -->
  </section>
</template>

<script>
import E from 'wangeditor'
import Vue from 'vue'

export default {
  name: 'IntentionEntry',
  data() {
    return {
      editor: null,
      setMeal: false,
      form: {
        chapter: [],
        // chaName: '',
      },
      chapterCo: [],
      course_id: '',
      url: '',
      pictureVisible: false,
      haschoose: false,
      ruleForm: {
        is_topping: '',
        course_name: '',
        course_category_id: '',
        teacher_id: '',
        video_collection_id: '',
        problem_course_id: '',
        sale_type: 1,
        is_hot: '',
        course_price: '',
        past_price: '',
        index_category_id: '',
        fictitious_num: null,
        cover_img: '',
        introduction: '',
        edu_qr_code: '',
        is_fictitious: 1,
        sort: '',
        include_course_ids: [],
        class_type: 0,
        brief: '',
        free_sort: 0,
        hot_sort: 0,
      },
      rules: {
        course_name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          {
            min: 1,
            max: 128,
            message: '长度在 1到 32 个字符',
            trigger: 'blur',
          },
        ],
        course_category_id: [
          { required: true, message: '请选择课程分类', trigger: 'change' },
        ],
        teacher_id: [
          { required: true, message: '请选择任课老师', trigger: 'change' },
        ],
        // video_collection_id: [
        //   { required: true, message: '请选择活动区域', trigger: 'change' },
        // ],
        // problem_course_id: [
        //   { required: true, message: '请选择活动区域', trigger: 'change' },
        // ],
        // index_category_id: [
        //   { required: true, message: '请选择活动区域', trigger: 'change' },
        // ],
        sale_type: [
          { required: true, message: '请选择售卖方式', trigger: 'change' },
        ],
        is_hot: [
          { required: true, message: '是否热门推荐', trigger: 'change' },
        ],
        brief: [{ required: true, message: '请输入课程简介', trigger: 'blur' }],
        fictitious_num: [
          { required: true, message: '请输入虚拟数量', trigger: 'change' },
        ],
        past_price: [
          { required: true, message: '请输入划线价格', trigger: 'blur' },
        ],
        course_price: [
          { required: true, message: '请输入课程价格', trigger: 'blur' },
        ],
      },
      classifiData: [],
      teacherData: [],
      homeData: [],
      questionBank: [],
      courseData: [],
      videoData: [],
      radio: '',
      imageUrl: '',
      chapterTags: [],
      taglist: {},
      lastPage: '',
    }
  },
  created() {
    // //课程分类列表
    // this.$api.getCategoryList(this, 'classifiData')
    // //授课老师列表
    // this.$api.getTeacherDrop(this, 'teacherData')
    // //首页分类表
    // this.$api.getHomeclassifiList(this, 'homeData')
  },
  mounted() {
    // let lastPage = this.$route.query.lastPage
    // lastPage ? (this.lastPage = lastPage) : ''
    // let Meal = this.$route.query.setMeal
    // this.course_id = this.$route.query.course_id
    // if (Meal == '2') {
    //   //关联课程
    //   this.$api.getSingleCourses(this, 'courseData')
    //   this.setMeal = true
    //   this.$route.meta.title = '创建套餐班'
    //   this.ruleForm.class_type = 2
    // } else {
    //   this.ruleForm.class_type = 1
    //   this.setMeal = false
    //   this.$route.meta.title = '创建单科班'
    // }
    // if (this.course_id != '') {
    //   this.$api.getCoursesDetail(this, this.course_id)
    // }
    //wangEditor编辑器
    this.editor = new E('#caseAnalyse')
    // editor.config.uploadImgServer = Vue.prototype.rootDir + '/oss/uploadImage'
    this.editor.config.uploadImgShowBase64 = true
    //编辑器中的图片上传到本地
    let that = this
    this.editor.config.customUploadImg = function(files, insert) {
      var formData = new FormData()
      formData.append('image', files[0])
      $.ajax({
        type: 'POST',
        url: Vue.prototype.rootDir + '/oss/uploadImage',
        data: formData,
        contentType: false,
        processData: false,
        success: function(res) {
          if (res.code == 0) {
            that.$message({
              message: res.message,
              type: 'success',
            })
            insert(res.data.data.url)
          } else {
            that.$message.error(res.message)
          }
        },
        error(err) {
          that.$message({
            message: '服务器维护中',
            type: 'warning',
          })
        },
      })
    }
    this.editor.config.onchange = (html) => {
      this.ruleForm.introduction = html
    }
    // 普通的自定义菜单
    this.editor.config.menus = [
      'bold',
      'fontSize',
      'fontName',
      'italic',
      'underline',
      'strikeThrough',
      'foreColor',
      'backColor',
      'list',
      'justify',
      'image',
      'table',
      'undo',
      'redo',
      'qgs',
    ]
    this.editor.create()
  },
  // beforeDestroy() {
  //   eventBus.$off('lastPageNum', this.lastPage)
  // },

  methods: {
    //跳转配置课程页面
    toConfigureCourses() {
      this.$router.push({
        path: '/sou/configureCourses',
      })
    },
    addIcon() {
      this.pictureVisible = true
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
        this.ruleForm.cover_img = radioUrl
      } else {
        this.url = ''
        this.haschoose = false
        this.ruleForm.cover_img = ''
      }
    },
    changeParentTitle(txt) {
      console.log(txt)
      this.ruleForm.introduction = txt
    },
    // changeLeaning() {},
  },
}
</script>

<style lang="scss" scoped>
.main {
  padding: 20px;
  margin: 20px;
  background: #fff;
}
/deep/.el-form-item__label {
  padding: 0 30px 0 0;
}
/deep/.el-textarea__inner {
  height: 127px !important;
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
.el-tag {
  margin-right: 10px;
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
.colleft {
  .el-row {
    padding-bottom: 20px;
  }
}
.imgBox_warn {
  line-height: 30px;
  padding-top: 10px;
  color: #aaa;
}
.signcode {
  width: 135px;
  height: 135px;
  background: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  color: #3333;
  border: 1px solid rgba(220, 223, 230, 1);
  border-radius: 5px;
}
.signcode:hover {
  border: 1px solid rgba(240, 240, 240, 1);
  cursor: pointer;
}

.headPortrait {
  width: 240px;
  height: 135px;
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
  width: 240px;
  height: 135px;
  position: relative;
}

.iconjia {
  font-size: 40px;
  color: #fff;
  display: none;
  position: absolute;
  width: 240px;
  height: 135px;
  line-height: 135px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.78);
  opacity: 0.5;
}

.imageBox:hover i {
  display: block;
}
</style>
