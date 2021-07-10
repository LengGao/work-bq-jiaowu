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
                  @change="chooseCate"
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
              <el-form-item label="课程简介" prop="brief">
                <el-input
                  type="textarea"
                  style="width:740px;"
                  v-model="ruleForm.brief"
                  placeholder="请输入课程简介"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="setMeal == true">
            <el-form-item
              label="关联课程"
              prop="include_course_ids"
              style="max-width:1400px"
            >
              <el-select
                v-model="form.chapter"
                filterable
                placeholder="请选择关联课程"
                @change="pushtag"
                style="margin-right:10px"
              >
                <el-option
                  v-for="item in courseData"
                  :key="item.course_id"
                  :label="item.course_name"
                  :value="item.course_id"
                >
                </el-option>
              </el-select>

              <el-tag
                class="tags"
                v-for="tag in taglist"
                :key="tag.course_id"
                v-show="tag == '' ? false : true"
                closable
                @close="handleClose(tag)"
              >
                {{ tag.course_name }}
              </el-tag>
            </el-form-item>
          </el-row>
          <el-row v-if="setMeal == false">
            <el-col :sm="12">
              <el-form-item label="关联视频集" prop="video_collection_id">
                <el-select
                  filterable
                  v-model="ruleForm.video_collection_id"
                  placeholder="请选择关联视频集"
                >
                  <el-option
                    v-for="item in videoData.data"
                    :key="item.video_collection_id"
                    :label="item.video_collection_name"
                    :value="item.video_collection_id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :sm="12">
              <el-form-item label="关联题库" prop="problem_course_id">
                <el-select
                  filterable
                  v-model="ruleForm.problem_course_id"
                  placeholder="请选择关联题库"
                >
                  <el-option
                    v-for="item in questionBank.list"
                    :key="item.problem_course_id"
                    :label="item.course_name"
                    :value="item.problem_course_id"
                  >
                  </el-option>
                </el-select>
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
            </el-col>
            <el-col :sm="12">
              <el-form-item label="全部课程排序" prop="sort">
                <el-input
                  type="number"
                  v-model="ruleForm.sort"
                  placeholder="排序数字越大课程越靠前"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <el-form-item label="是否置顶">
                <el-radio-group v-model="ruleForm.is_topping" @change="isReal">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="2">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <!-- <el-col :sm="12">
              <el-form-item
                label="虚拟数量"
                prop="fictitious_num"
                v-if="ruleForm.is_fictitious == '1'"
              >
                <el-input
                  placeholder="请输入虚拟数量"
                  type="number"
                  v-model="ruleForm.fictitious_num"
                ></el-input>
              </el-form-item>
            </el-col> -->
          </el-row>
          <el-row>
            <el-col :sm="12">
              <el-form-item label="热门推荐" prop="is_hot">
                <el-radio-group v-model="ruleForm.is_hot">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="2">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :sm="12">
              <el-form-item label="热门课程排序" prop="hot_sort">
                <el-input
                  placeholder="排序数字越大课程越靠前"
                  type="number"
                  v-model="ruleForm.hot_sort"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <el-form-item label="售卖方式" prop="sale_type">
                <el-radio-group v-model="ruleForm.sale_type" @change="isFree">
                  <el-radio :label="1">付费</el-radio>
                  <el-radio :label="2">免费</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :sm="12">
              <el-form-item
                label="免费课程排序"
                prop="free_sort"
                v-if="ruleForm.sale_type == 2"
              >
                <el-input
                  placeholder="排序数字越大课程越靠前"
                  type="number"
                  v-model="ruleForm.free_sort"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="ruleForm.sale_type == 1">
            <el-col :sm="12">
              <el-form-item label="课程价格" prop="course_price">
                <el-input
                  placeholder="请输入课程价格"
                  v-model="ruleForm.course_price"
                  type="number"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="12">
              <el-form-item label="划线价格" prop="past_price">
                <el-input
                  placeholder="请输入划线价格"
                  type="number"
                  v-model="ruleForm.past_price"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <el-form-item label="购买数量" prop="is_fictitious">
                <el-radio-group
                  v-model="ruleForm.is_fictitious"
                  @change="isReal"
                >
                  <el-radio :label="1">虚拟</el-radio>
                  <el-radio :label="0">真实</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :sm="12">
              <el-form-item
                label="虚拟数量"
                prop="fictitious_num"
                v-if="ruleForm.is_fictitious == '1'"
              >
                <el-input
                  placeholder="请输入虚拟数量"
                  type="number"
                  v-model="ruleForm.fictitious_num"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
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
            <el-col :sm="12">
              <!-- <el-form-item label="教务处二维码" prop="edu_qr_code">
                <div class="signcode el-icon-plus"></div>
                <div style="color:#aaa;">
                  <p><span> 1. 支持jpg、jpeg、png、gif、bmp格式；</span></p>
                  <p><span> 2. 推荐尺寸400*400px或者1:1</span></p>
                </div>
              </el-form-item> -->
            </el-col>
          </el-row>
          <el-row style="z-index:1">
            <el-form-item
              label="课程介绍"
              class="textarea_date"
              prop="introduction"
            >
              <div id="caseAnalyse"></div>
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
      <el-button @click="releaseCourse('ruleForm', 'is_publish')"
        >保存草稿</el-button
      >
      <el-button type="primary" @click="releaseCourse('ruleForm')"
        >发布课程</el-button
      >
    </div>
    <imgDialog
      v-if="pictureVisible"
      @closeImg="closeImg"
      @clearUrl="clearUrl"
    ></imgDialog>
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
    //课程分类列表
    this.$api.getCategoryList(this, 'classifiData')
    //授课老师列表
    this.$api.getTeacherDrop(this, 'teacherData')
    //首页分类表
    this.$api.getHomeclassifiList(this, 'homeData')
  },
  mounted() {
    let lastPage = this.$route.query.lastPage
    lastPage ? (this.lastPage = lastPage) : ''
    let Meal = this.$route.query.setMeal
    this.course_id = this.$route.query.course_id
    if (Meal == '2') {
      //关联课程
      this.$api.getSingleCourses(this, 'courseData')
      this.setMeal = true
      this.$route.meta.title = '创建套餐班'
      this.ruleForm.class_type = 2
    } else {
      this.ruleForm.class_type = 1
      this.setMeal = false
      this.$route.meta.title = '创建单科班'
    }
    if (this.course_id != '') {
      this.$api.getCoursesDetail(this, this.course_id)
    }
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
  watch: {
    taglist: {
      handler(newName, oldName) {
        console.log(Object.keys(newName).length)
        let arry = []
        if (Object.keys(newName).length > 0) {
          console.log(this.taglist)
          for (let i in this.taglist) {
            console.log(this.taglist[i].course_id)
            arry.push(this.taglist[i].course_id)
          }
          this.ruleForm.include_course_ids = arry
        }
        console.log(this.ruleForm.include_course_ids)
      },
      // deep: true,
    },
  },
  methods: {
    isReal(ab) {
      console.log(ab)
      if (ab == 0) {
        this.ruleForm.fictitious_num = 0
      }
    },
    isFree(zx) {
      console.log(zx)
      if (zx == 2) {
        this.ruleForm.course_price = 0
        this.ruleForm.past_price = 0
      }
    },
    //课程分类下拉事件
    chooseCate(val) {
      console.log(this.ruleForm.course_category_id != '')
      if (this.ruleForm.course_category_id != '' && this.setMeal == false) {
        //课程题库列表
        this.$api.getProblemCourseList(this, 'questionBank')
        //视频列表
        this.$api.videocollectionlist(this, 'videoData')
      }
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
    releaseCourse(formName, a) {
      console.log(this.ruleForm)
      if (a !== undefined) {
        this.ruleForm.is_publish = 2
      } else {
        this.ruleForm.is_publish = 1
      }
      // console.log(this.ruleForm)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.course_id != '') {
            this.$api.modifyCourse(this, this.ruleForm)
          } else {
            this.$api.addCourses(this, this.ruleForm)
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    //关联章节push到tags标签中
    pushtag(val) {
      console.log(val)
      var _this = this
      if (0 == _this.chapterTags.length) {
        _this.chapterTags.push(val)
      }
      let status = 0
      _this.chapterTags.forEach((item, index) => {
        if (item == val) {
          status = 1
        }
      })

      if (0 == status) {
        _this.chapterTags.push(val)
      }
      // this.ruleform.course_ids = this.chapterTags
      let _obj = {}
      let i = 0
      _this.chapterTags.forEach((v, k) => {
        _this.courseData.forEach((vo, key) => {
          if (v == vo.course_id) {
            var _temp = {}
            _temp['course_id'] = vo.course_id
            _temp['course_name'] = vo.course_name
            //console.log(_temp)
            _obj[i] = _temp
            i++
          }
        })
      })
      this.taglist = _obj
      // console.log(this.taglist)
    },
    //tags删除
    handleClose(tag) {
      console.log(tag.course_id)
      let av = tag.course_id
      var _this = this
      for (let i in this.taglist) {
        // _this.$nextTick(() => {
        if (this.taglist[i].course_id == av) {
          this.taglist[i] = ''
          this.chapterTags.forEach((item, index) => {
            if (item == av) {
              _this.chapterTags.splice(_this.chapterTags.indexOf(av), 1)
            }
          })
        }
      }
    },
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
