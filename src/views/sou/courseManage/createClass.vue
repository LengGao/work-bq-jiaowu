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
          class="class-form"
          :show-message="true"
          label-position="right"
        >
          <!--左边部分-->

          <el-form-item label="课程分类">
            <el-cascader
              :key="selectData.length"
              ref="cascader"
              style="240px"
              @change="changeCategory"
              placeholder="请选择分类"
              :props="{ checkStrictly: true }"
              v-model="formData.course_category_id"
              :options="selectData"
            ></el-cascader>
          </el-form-item>

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

          <el-form-item label="课程名称" prop="course_name">
            <el-input
              style="width:740px;"
              v-model="formData.course_name"
              placeholder="请输入课程名称"
            ></el-input>
          </el-form-item>

          <el-form-item label="课程名称" prop="brief" style="width:100%">
            <el-input
              type="textarea"
              style="width:740px;"
              v-model="formData.brief"
              placeholder="请输入课程简介"
            ></el-input>
          </el-form-item>

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
              onkeypress="return( /[\d]/.test(String.fromCharCode(event.keyCode)))"
              v-model="formData.sort"
              placeholder="排序数字越大课程越靠前"
            ></el-input>
          </el-form-item>
          <el-form-item label="课程价格" prop="course_price">
            <el-input
              placeholder="请输入课程价格"
              v-model="formData.course_price"
              :min="0"
              type="number"
            ></el-input>
          </el-form-item>

          <el-form-item label="课程封面" prop="cover_img" class="upload-cover">
            <el-upload
              name="image"
              :headers="headers"
              :action="uploadImageUrl"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="formData.cover_img"
                :src="formData.cover_img"
                class="img"
              />
              <i v-else class="el-icon-plus upload-cover-icon"></i>
            </el-upload>
            <!-- <div v-show="!haschoose">
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
                :src="formData.cover_img"
                alt=""
              />
            </div> -->
          </el-form-item>

          <el-form-item label="关联视频集" prop="video_collection_id">
            <el-select
              filterable
              v-model="formData.video_collection_id"
              placeholder="请选择关联视频集"
            >
              <el-option
                v-for="item in videoData"
                :key="item.video_collection_id"
                :label="item.video_collection_name"
                :value="item.video_collection_id"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="关联题库" prop="problem_course_id">
            <el-select
              filterable
              v-model="formData.problem_course_id"
              placeholder="请选择关联题库"
            >
              <el-option
                v-for="item in questionBank"
                :key="item.problem_course_id"
                :label="item.course_name"
                :value="item.problem_course_id"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="是否置顶">
            <el-radio-group v-model="formData.is_topping" @change="isReal">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="划线价格" prop="past_price">
            <el-input
              placeholder="请输入划线价格"
              type="number"
              :min="0"
              v-model="formData.past_price"
            ></el-input>
          </el-form-item>

          <el-form-item label="热门推荐" prop="is_hot">
            <el-radio-group v-model="formData.is_hot">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="热门课程排序" prop="hot_sort">
            <el-input
              placeholder="排序数字越大课程越靠前"
              type="number"
              onkeypress="return( /[\d]/.test(String.fromCharCode(event.keyCode)))"
              v-model="formData.hot_sort"
            ></el-input>
          </el-form-item>

          <el-form-item label="售卖方式" prop="sale_type">
            <el-radio-group v-model="formData.sale_type" @change="isFree">
              <el-radio :label="1">付费</el-radio>
              <el-radio :label="2">免费</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item
            label="免费课程排序"
            prop="free_sort"
            v-if="formData.sale_type == 2"
          >
            <el-input
              placeholder="排序数字越大课程越靠前"
              type="number"
              v-model="formData.free_sort"
            ></el-input>
          </el-form-item>

          <el-form-item label="购买数量" prop="is_fictitious">
            <el-radio-group v-model="formData.is_fictitious" @change="isReal">
              <el-radio :label="1">虚拟</el-radio>
              <el-radio :label="0">真实</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item
            label="虚拟数量"
            prop="fictitious_num"
            v-if="formData.is_fictitious == '1'"
          >
            <el-input
              onkeypress="return( /[\d]/.test(String.fromCharCode(event.keyCode)))"
              placeholder="请输入虚拟数量"
              type="number"
              v-model="formData.fictitious_num"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="课程介绍"
            class="textarea_date"
            prop="introduction"
            style="width:100%;height:334px"
          >
            <el-upload
              class="avatar-uploader"
              :action="serverUrl"
              name="image"
              :headers="header"
              :show-file-list="false"
              :on-success="uploadSuccess"
              :on-error="uploadError"
              :before-upload="beforeUpload"
            >
            </el-upload>
            <quill-editor
              v-model="formData.introduction"
              ref="myQuillEditor"
              :options="editorOption"
              @change="onEditorChange($event)"
              style="height:200px"
            >
            </quill-editor>
          </el-form-item>

          <el-form-item> </el-form-item>
          <div class="entybtn">
            <!-- <el-button @click="releaseCourse('ruleForm', 'is_publish')"
        >保存草稿</el-button
      > -->
            <el-button @click="handleCancle">取消</el-button>
            <el-button type="primary" @click="handleSave('ruleForm')"
              >保存</el-button
            >
            <!-- <el-button type="primary" @click="handleSave('ruleForm', 2)"
              >保存并配置</el-button
            > -->
          </div>
        </el-form>
      </el-col>
      <el-col :sm="8" :md="8"></el-col>
    </el-row>

    <imgDialog
      v-if="pictureVisible"
      @closeImg="closeImg"
      @clearUrl="clearUrl"
    ></imgDialog>
  </section>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import { uploadImageUrl } from '@/api/educational'
import Vue from 'vue'
import {
  addCourse,
  getCateList,
  editCourse,
  getCoursesDetail,
  videocollectionlist,
  getProblemCourseList,
} from '@/api/sou'
import axios from 'axios'
import store from '@/store'
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
  [{ direction: 'rtl' }], // text direction
  [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
  //[{ header: [1, 2, 3, 4, 5, 6, false] }],
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
      uploadImageUrl,
      headers: {
        token: this.$store.state.user.token,
      },
      editor: null,
      pictureVisible: false,
      haschoose: false,
      selectData: [],
      homeData: {},
      videoData: {},
      teacherData: {},
      questionBank: {},

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
        class_type: 1,
        brief: '',
        free_sort: 0,
        hot_sort: 0,
      },
      url: '',
      pictureVisible: false,
      haschoose: false,
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
      /***********quillEditor编辑器需要的参数**********/
    }
  },
  created() {
    this.course_id = this.$route.query.course_id
    this.course_id ? this.getCoursesDetail() : ''
    this.getCateList() //获取所属分类
    this.$api.getTeacherSublist(this, 'teacherData') //老师列表
    this.$api.getHomeclassifiList(this, 'homeData') //获取首页分类
    // this.$api.getProblemCourseList(this, 'questionBank') //课程题库列表
    // this.$api.videocollectionlist(this, 'videoData') //视频列表
  },
  mounted() {},

  methods: {
    // getProblemCourseList(category_id) {
    //   let data = { category_id }
    //   const token = store.getters.token || ''
    //   console.log(process.env.VUE_APP_LOACTION)
    //   let baseurl = '/ai/adimn/v2'
    //   // str = baseurl.Substring(0, 10)

    //   console.log(Vue.prototype.rootDir)
    //   let url =
    //     baseurl +
    //     '/problem/getProblemCourseList' +
    //     '?category_id=' +
    //     category_id

    //   $.ajax(url, data, {
    //     headers: {
    //       'Content-type': 'application/x-www-form-urlencoded',
    //       token: token,
    //     },
    //   })
    // },

    changeCategory(ids) {
      console.log(ids)
      const id = ids ? [...ids].pop() : ''
      console.log(id)
      this.videocollectionlist(id)
      this.getProblemCourseList(id)
    },
    // 获取关联题库
    async getProblemCourseList(category_id) {
      const data = {
        category_id,
      }
      const res = await getProblemCourseList(data)
      if (res.code === 0) {
        this.questionBank = res.data.list
      }
    },
    // 获取关联视屏
    async videocollectionlist(category_id) {
      const data = {
        course_category_id: category_id,
        limit: 9999,
      }
      const res = await videocollectionlist(data)
      if (res.code === 0) {
        this.videoData = res.data.data
      }
    },
    handleAvatarSuccess(res, file) {
      console.log(res)
      this.formData.cover_img = res.data?.data?.url || ''
    },
    beforeAvatarUpload(file) {
      const isImg = file.type.indexOf('image') !== -1
      const isLt20M = file.size / 1024 / 1024 < 20
      if (!isImg) {
        this.$message.error('请上传图片')
      }
      if (!isLt20M) {
        this.$message.error('上传图片大小不能超过 20MB!')
      }
      return isLt20M && isImg
    },
    async getCoursesDetail() {
      const data = { id: this.course_id }
      console.log(data)
      const res = await getCoursesDetail(data)
      console.log(res)
      if (res.code === 0) {
        this.formData = res.data.info
        const id = res.data.info.course_category_id
        if (id) {
          this.videocollectionlist(id)
          this.getProblemCourseList(id)
        }
        this.formData.course_category_id = res.data.info.course_category_id
      }
    },
    handleCancle() {
      this.$router.go(-1)
    },
    isReal(ab) {
      console.log(ab)
      if (ab == 0) {
        this.formData.fictitious_num = 0
      }
    },
    isFree(zx) {
      console.log(zx)
      if (zx == 2) {
        this.formData.course_price = 0
        this.formData.past_price = 0
      }
    },
    async submit(num) {
      const data = {
        ...this.formData,
        course_category_id: Array.isArray(this.formData.course_category_id)
          ? this.formData.course_category_id.pop()
          : this.formData.course_category_id,
      }
      if (this.course_id) {
        data.course_id = this.course_id
      }
      const api = this.course_id ? editCourse : addCourse
      const res = await api(data)
      console.log(res)
      if (res.code === 0) {
        this.$message({
          type: 'success',
          message: res.message,
        })
        if (num) {
          //保存并设置
          this.$router.push({
            path: '/sou/configureCourses',
          })
        } else {
          //保存
          this.$router.go(-1)
        }

        // this.hanldeCancel()
        // this.$emit('on-success')
      }
    },
    handleSave(formName, num) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submit(num)
        }
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
      console.log(this.formData)
      // console.log(radioUrl + '我好睡')
      this.pictureVisible = false
      if (radioUrl != undefined) {
        this.haschoose = true
        this.url = radioUrl
        this.formData.cover_img = radioUrl
      } else {
        this.url = ''
        this.haschoose = false
        this.formData.cover_img = ''
      }
    },
    async getCateList() {
      const data = { list: true }
      const res = await getCateList(data)
      console.log(res)
      if (res.code === 0) {
        this.cloneData(res.data, this.selectData)
        console.log(this.selectData)
        // this.searchOptions[0].attrs.options = this.selectData
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
    //跳转配置课程页面
    toConfigureCourses() {
      // this.$router.push({
      //   path: '/sou/configureCourses',
      // })
    },

    /***************quillEditor编辑器事件****************/
    onEditorChange({ editor, html, text }) {
      //内容改变事件
      this.formData.introduction = html
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
      if (res.code == 0) {
        this.$message({
          type: 'success',
          message: res.message,
        })
        // 获取光标所在位置
        let length = quill.getSelection().index
        // 插入图片 res.url为服务器返回的图片地址
        quill.insertEmbed(length, 'image', res.data.data.url)
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
    /***************quillEditor编辑器事件****************/
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
.class-form {
  display: flex;
  flex-wrap: wrap;
  .el-form-item {
    width: 400px;
  }
}
.upload-cover /deep/.el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.upload-cover /deep/.el-upload:hover {
  border-color: #409eff;
}
.upload-cover-icon {
  font-size: 28px;
  color: hsl(215, 8%, 58%);
  width: 240px;
  height: 135px;
  line-height: 135px;
  text-align: center;
}
.img {
  padding: 5px;
  width: 240px;
  height: 135px;
  display: block;
}
</style>
