<template>
  <section class="mainwrap">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-position="left"
      label-width="80px"
      class="demo-ruleForm"
    >
      <el-form-item label="班级名称" prop="classroom_name">
        <el-input
          v-model="ruleForm.classroom_name"
          placeholder="请输入班级名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="任课老师" prop="teacher_id">
        <el-select
          v-model="ruleForm.teacher_id"
          placeholder="请选择任课老师"
          filterable
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
      <el-form-item label="班主任" prop="master_teacher_id">
        <el-select
          filterable
          v-model="ruleForm.master_teacher_id"
          placeholder="请选择班主任"
        >
          <el-option
            v-for="item in headMaster.list"
            :key="item.staff_id"
            :label="item.staff_name"
            :value="item.staff_id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="name" label="班级封面">
        <div v-show="!haschoose">
          <div class="headPortrait el-icon-plus" @click="addIcon"></div>
          <div style="color:#aaa;ling-height:20px">
            <p><span> 1. 支持jpg、jpeg、png、gif、bmp格式；</span></p>
            <p><span> 2. 推荐尺寸750*422px</span></p>
          </div>
        </div>
        <div v-show="haschoose" class=" imageBox ">
          <i class=" iconjia el-icon-plus" @click="addIcon"></i>
          <img style="width:100%;height:100%;" :src="url" alt="" />
        </div>
      </el-form-item>
      <el-form-item label="班级介绍" prop="describe">
        <el-input
          v-model="ruleForm.describe"
          type="textarea"
          placeholder="请输入内容"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="preserve('ruleForm')">保存</el-button>
      </el-form-item>
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
  data() {
    return {
      url: '',
      classroom_id: null,
      pictureVisible: false,
      haschoose: false,
      page: 1,
      value: '',
      haschoose: false,
      headMaster: [],
      teacherData: [],

      rules: {
        classroom_name: [
          { required: true, message: '请输入班级名称', trigger: 'blur' },
          {
            min: 2,
            max: 128,
            message: '长度在 2 到 32 个字符',
            trigger: 'blur',
          },
        ],
        teacher_id: [
          { required: true, message: '请输入任课老师', trigger: 'change' },
        ],
        master_teacher_id: [
          { required: true, message: '请输入班主任', trigger: 'change' },
        ],
        describe: [{ required: true, message: '请输入内容', trigger: 'blur' }],
      },
      url: '',
      way: '',
      ruleForm: {
        classroom_name: '',
        teacher_id: '',
        master_teacher_id: '',
        course_id: '',
        class_icon: '',
        describe: '',
      },
    }
  },
  mounted() {
    this.classroom_id = this.$route.query.classroom_id
    console.log(this.classroom_id)
    this.$route.meta.title = '添加班级'
    if (this.classroom_id != undefined) {
      this.$route.meta.title = '编辑班级'
      this.$api.getClassInfo(this, 'GET')
    }
    this.$api.getHeadMaster(this, 'headMaster')
    this.$api.getTeacherDrop(this, 'teacherData')
  },

  methods: {
    clearUrl() {
      this.pictureVisible = false
    },
    closeImg(radioUrl) {
      // console.log(radioUrl + '我好睡')
      this.pictureVisible = false
      if (radioUrl != undefined) {
        this.haschoose = true
        this.url = radioUrl
        this.ruleForm.class_icon = radioUrl
      } else {
        this.url = ''
        this.haschoose = false
      }
    },
    addIcon() {
      this.pictureVisible = true
      // let way = ''
      // if (this.classroom_id != undefined) {
      //   way = '/eda/editClasses?' + 'way=' + this.classroom_id
      // } else {
      //   way = '/eda/editClasses'
      // }
      // this.$router.push({
      //   path: '/eda/addNewClassify',
      //   query: {
      //     pathRoute: way,
      //   },
      // })
    },
    cancel() {
      this.$router.push({
        name: 'classDetail',
      })
    },
    preserve(formName) {
      console.log(this.classroom_id)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.classroom_id == undefined || this.classroom_id == '') {
            this.$api.addClass(this, this.ruleForm)
          } else {
            this.$api.getClassInfo(this, 'POST')
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
.main {
  padding: 20px;
  margin: 20px;
  background: #fff;
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
  border: 1px solid rgba(220, 223, 230, 1);
}

.imageBox:hover i {
  display: block;
}
.el-input {
  width: 240px;
}
.el-input--suffix .el-input__inner {
  width: 240px;
}
/deep/.el-textarea__inner {
  max-width: 740px;
  height: 127px;
  padding: 10px 10px;
}
/deep/.el-form-item {
  margin-bottom: 35px;
}
</style>
