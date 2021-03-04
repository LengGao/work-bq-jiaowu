<template>
  <section class="mainwrap">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="面授课名称" prop="subscribe_classroom_name">
        <el-input v-model="ruleForm.subscribe_classroom_name"></el-input>
      </el-form-item>
      <el-form-item label="任课老师" prop="teacher_id">
        <el-select
          v-model="ruleForm.teacher_id"
          filterable
          @change="chooseTeacher"
          placeholder="请选择任课老师"
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
      <el-form-item label=" 上课时间" hide-required-asterisk="true">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="alldate"
          format="yyyy-MM-dd"
          @change="dateChoice"
          value-format="yyyy-MM-dd"
          style="width: 240px;padding-right:10px"
        ></el-date-picker>

        <el-time-picker
          is-range
          arrow-control
          v-model="allTime"
          @change="timeChoice"
          format="HH:mm:ss"
          value-format="HH:mm:ss"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
        >
        </el-time-picker>
      </el-form-item>
      <el-form-item label="关联章节" prop="chapter_ids">
        <el-select
          v-model="form.chapter"
          filterable
          multiple
          placeholder="请选择关联章节"
          @change="pushtag"
        >
          <el-option
            v-for="item in chapterData.list"
            :key="item.problem_chapter_id"
            :label="item.chapter_name"
            :value="item.problem_chapter_id"
          >
          </el-option>
        </el-select>

        <!-- <el-tag
          class="tags"
          v-for="tag in taglist"
          :key="tag.problem_chapter_id"
          v-show="tag == '' ? false : true"
          closable
          @close="handleClose(tag)"
        >
          {{ tag.chapter_name }}
        </el-tag> -->
      </el-form-item>
      <div style="display:flex!important">
        <el-form-item label="上课地点" prop="address">
          <el-input v-model="ruleForm.address"></el-input>
        </el-form-item>

        <el-form-item
          label="可容纳人数"
          prop="max_num"
          style="padding-left:100px"
        >
          <el-input
            v-model="ruleForm.max_num"
            type="number"
            style="width:90px"
          ></el-input
          >人
        </el-form-item>
      </div>

      <div style="display:flex!important">
        <el-form-item label="定时发布" hide-required-asterisk="true">
          <el-date-picker
            v-model="ruleForm.show_time"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="定时关闭"
          hide-required-asterisk="true"
          style="padding-left:100px"
        >
          <el-date-picker
            v-model="ruleForm.close_time"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
      </div>

      <el-form-item label="关联班级" prop="classroom_ids">
        <el-checkbox-group v-model="ruleForm.classroom_ids">
          <el-checkbox
            v-for="item in classroom"
            :label="item.classroom_id"
            :key="item.classroom_id"
            >{{ item.classroom_name }}</el-checkbox
          >
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button @click="onCancel">取消</el-button>
        <el-button type="primary" @click="saveLink('ruleForm')">保存</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
export default {
  name: 'editFaceCourse',
  data() {
    return {
      ruleForm: {
        subscribe_classroom_name: '',
        teacher_id: '',
        teacher_name: '',
        start_time: '',
        end_time: '',
        course_id: 0,
        chapter_ids: [],
        classroom_ids: [1, 2, 3],
        address: '',
        max_num: 0,
        show_time: '',
        close_time: '',
      },
      teacherData: [],
      chapterData: [],
      form: {
        chapter: '',
        chaName: '',
      },
      rules: {
        subscribe_classroom_name: [
          { required: true, message: '请选择面授课名称', trigger: 'blur' },
          { min: 2, max: 14, message: '课程名称建议不超过14字' },
        ],

        teacher_id: [
          { required: true, message: '请选择任课老师', trigger: 'change' },
        ],
        chapter_ids: [
          { required: true, message: '请选择关联章节', trigger: 'change' },
        ],
        address: [
          { required: true, message: '请填写上课地点', trigger: 'blur' },
        ],
        max_num: [
          { required: true, message: '请填写可容纳人数', trigger: 'blur' },
        ],

        teacherId: [
          { required: true, message: '请选择任课老师', trigger: 'change' },
        ],
      },

      chapterid: '',
      chapterTags: [],
      taglist: {},
      chapter: '',
      teacherList: [],
      alldate: '',
      allTime: '',
      classroom: [],
      editShow: false,
      subscribe_classroom_id: 0,
    }
  },
  created() {
    this.$api.getPracticeList(this, 'chapterData')
    this.$api.getTeacherList(this, 'teacherData')
    // this.$api.getCourseAllclass(this, 'classroom')
    this.subscribe_classroom_id = this.$route.query.subscribe_classroom_id
  },
  mounted() {
    if (this.subscribe_classroom_id != undefined) {
      this.$api.getSubscribeClassroomInfo(this)
    }
  },
  watch: {
    taglist: {
      handler(newName, oldName) {
        console.log(Object.keys(newName).length)
        let arry = []
        if (Object.keys(newName).length > 0) {
          console.log(this.taglist)
          for (let i in this.taglist) {
            console.log(this.taglist[i].problem_chapter_id)
            arry.push(this.taglist[i].problem_chapter_id)
          }
          this.ruleForm.chapter_ids = arry.toString()
        }
        console.log(this.ruleForm.chapter_ids)
      },
      deep: true,
    },
  },
  methods: {
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
      let _obj = {}
      let i = 0
      _this.chapterTags.forEach((v, k) => {
        _this.chapterData.list.forEach((vo, key) => {
          if (v == vo.problem_chapter_id) {
            var _temp = {}
            _temp['problem_chapter_id'] = vo.problem_chapter_id
            _temp['chapter_name'] = vo.chapter_name
            //console.log(_temp)
            _obj[i] = _temp
            i++
          }
        })
      })
      this.taglist = _obj
      console.log(this.taglist)
    },
    //tags删除
    handleClose(tag) {
      console.log(tag.problem_chapter_id)
      let av = tag.problem_chapter_id
      var _this = this
      for (let i in this.taglist) {
        if (this.taglist[i].problem_chapter_id == av) {
          this.taglist[i] = ''
          this.chapterTags.forEach((item, index) => {
            if (item == av) {
              _this.chapterTags.splice(_this.chapterTags.indexOf(av), 1)
            }
          })
        }
      }
      // console.log(this.taglist)
    },
    //年月日重新格式
    dateChoice() {
      // this.ruleForm.dateTime = this.alldate.split('-').join('')
      // console.log(this.ruleForm.dateTime)
    },
    // 获取时间并分别
    timeChoice() {
      // if (this.alldate == '') {
      //   this.$message({
      //     message: '请先选择日期',
      //     type: 'warning',
      //   })
      // }
      this.ruleForm.start_time = this.alldate + ' ' + this.allTime[0]
      this.ruleForm.end_time = this.alldate + ' ' + this.allTime[1]
    },
    chooseTeacher(val) {
      console.log(this.teacherData)
      let teacherData = this.teacherData.list
      teacherData.forEach((i) => {
        console.log(i)
        if (i.teacher_id == val) {
          this.ruleForm.teacher_name = i.teacher_name
          return
        }
      })
      // console.log(this.ruleForm.teacher_name)
    },

    onCancel() {},
    saveLink(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.addSubscribeClassroom(this, this.ruleForm)
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
.main {
  padding: 20px;
  margin: 20px;
  background: #fff;
}
.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.userTable {
  margin-top: 20px;
}
.el-input {
  width: 260px;
}
</style>
