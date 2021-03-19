<template>
  <section class="mainwrap">
    <!--表单部分-->

    <el-row>
      <el-col :sm="16" :md="16" class="colleft">
        <el-form
          label-width="140px"
          :model="formData"
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
                  v-model="formData.course_category_id"
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
                  v-model="formData.teacher_id"
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
                  v-model="formData.course_name"
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
                  v-model="formData.index_category_id"
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
                  v-model="formData.sort"
                  placeholder="排序数字越大课程越靠前"
                ></el-input>
              </el-form-item>
              <el-form-item label="课程价格" prop="course_price">
                <el-input
                  placeholder="请输入课程价格"
                  v-model="formData.course_price"
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
              <quill-editor
                v-model="content"
                ref="myQuillEditor"
                :options="editorOption"
                @change="onEditorChange($event)"
                style="height:300px"
              >
              </quill-editor>
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
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import { uploadImageUrl } from '@/api/educational'
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
  [{ direction: 'rtl' }], // text direction
  [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],
  ['link', 'image'],
  ['clean'],
]
export default {
  name: 'IntentionEntry',
  components: {
    quillEditor,
  },
  data() {
    return {
      editor: null,
      setMeal: false,
      formData: {},
      form: {
        chapter: [],
        // chaName: '',
      },
      chapterCo: [],
      course_id: '',
      url: '',
      pictureVisible: false,
      haschoose: false,
      formData: {
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

      /***********quillEditor编辑器需要的参数**********/

      quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
      content: null,
      editorOption: {
        placeholder: '',
        theme: 'snow', // or 'bubble'
        modules: {
          toolbar: {
            container: toolbarOptions,
            handlers: {
              image: function(value) {
                if (value) {
                  // 触发input框选择图片文件
                  document.querySelector('.avatar-uploader input').click()
                } else {
                  this.quill.format('image', false)
                }
              },
            },
          },
        },
      },
      serverUrl: uploadImageUrl, // 这里写你要上传的图片服务器地址
      header: {
        token: this.$store.state.user.token,
      }, // 有的图片服务器要求请求头需要有token
    }
  },
  created() {},
  mounted() {},

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
    /***************quillEditor编辑器事件****************/
    onEditorChange({ editor, html, text }) {
      //内容改变事件
      this.content = html
    },
    // 富文本图片上传前
    beforeUpload() {
      // 显示loading动画
      this.quillUpdateImg = true
    },

    uploadSuccess(res, file) {
      // res为图片服务器返回的数据
      // 获取富文本组件实例
      console.log(res)
      let quill = this.$refs.myQuillEditor.quill
      // 如果上传成功
      if (res.code == 200) {
        // 获取光标所在位置
        let length = quill.getSelection().index
        // 插入图片 res.url为服务器返回的图片地址
        quill.insertEmbed(length, 'image', res.url)
        // 调整光标到最后
        quill.setSelection(length + 1)
      } else {
        this.$message.error('图片插入失败')
      }
      // loading动画消失
      this.quillUpdateImg = false
    },
    // 富文本图片上传失败
    uploadError() {
      // loading动画消失
      this.quillUpdateImg = false
      this.$message.error('图片插入失败')
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
