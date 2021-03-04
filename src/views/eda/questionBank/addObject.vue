<template>
  <section class="mainwrap">
    <el-form
      :inline="true"
      label-position="right"
      label-width="110px"
    ></el-form>

    <div class="module_box">
      <el-form
        :inline="true"
        label-position="left"
        :model="subjectData"
        label-width="110px"
        ref="dataForm"
        :rules="rule"
      >
        <el-form-item label="所属章节：" prop="problem_chapter_id">
          <el-select
            v-model="subjectData.problem_chapter_id"
            ref="title"
            filterable
            test-attrs="$attrs"
            placeholder="请选择所属章节/真题"
            style="width:300px"
          >
            <el-option
              v-for="(it, ind) in testList.list"
              :key="ind"
              :label="it.chapter_name"
              :value="it.problem_chapter_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item label="索引标题：" prop="problem_title">
          <el-input
            v-model="subjectData.problem_title"
            placeholder="请输入内容"
            maxlength="64"
            show-word-limit
            style="width:500px "
          ></el-input>
        </el-form-item>
        <br />
        <el-form-item label="试题题干：">
          <kindeditor
            @kindeditorChange="changeTitle"
            :content="subjectData.problem_description"
            height="200px"
          />
        </el-form-item>
        <div
          v-for="(item, index) in subjectData.problem_content"
          :key="index"
          v-show="problem_type != 3 && problem_type != 4"
        >
          <el-form-item :label="'答案选项(' + zm[index] + ')：'">
            <kindeditor
              @kindeditorChange="changeAnswer($event, index)"
              :content="item.content"
              :id="'kin' + index"
              height="150px"
              class="fl"
            />
            <i
              class="el-icon-delete-solid fl delete_i"
              @click="deleteAnswer(index)"
              v-show="subjectData.problem_type != 3"
            ></i>
          </el-form-item>
        </div>
        <br />
        <el-form-item
          label=" "
          class="div_k"
          v-show="problem_type != 3 && problem_type != 4 && problem_type != 5"
        >
          <el-button icon="el-icon-plus" @click="addAnswer"
            >添加答案选项</el-button
          >
        </el-form-item>
        <br />
        <el-form-item
          label="正确答案："
          v-show="problem_type != 3 && problem_type != 4 && problem_type != 5"
        >
          <el-button
            v-for="(item, index) in subjectData.problem_content"
            :key="index"
            @click="clickAnswer(index)"
            :type="
              subjectData.problem_answer.includes(zm[index]) ? 'primary' : ''
            "
            >（{{ zm[index] }}）</el-button
          >
        </el-form-item>
        <el-form-item label="正确答案：" v-show="problem_type == 3">
          <el-button
            @click="clickjudgeAnswer('A')"
            :class="defaultbutton == 'A' ? 'btn' : ''"
            >正确</el-button
          >
          <el-button
            @click="clickjudgeAnswer('B')"
            :class="defaultbutton == 'B' ? 'btn' : ''"
            >错误</el-button
          >
        </el-form-item>
        <el-form-item label="正确答案：" v-show="problem_type == 4">
          <p
            style="font-weight: 400;font-style: normal; font-size: 13px;letter-spacing: normal;color: #999999"
          >
            如果一个空有多个正确答案，可以用分号分隔，答案匹配任意一个都算正确
          </p>
          <div
            v-for="(item, index) in subjectData.problem_content"
            :key="index"
            style="margin-top:20px"
          >
            <el-input
              v-model="item.content"
              placeholder="请输入空格的内容"
              style="width:500px "
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item label="正确答案：" v-show="problem_type == 5">
          <kindeditor
            @kindeditorChange="SimpleAnswer($event)"
            :content="subjectData.problem_answer"
            id="simpleAnswer"
            height="150px"
            class="fl"
          />
        </el-form-item>
        <br />
        <el-form-item label=" " class="div_k" v-show="problem_type == 4">
          <el-button icon="el-icon-plus" @click="addAnswer"
            >添加填空答案</el-button
          >
          <el-switch
            v-model="value1"
            active-text="乱序匹配答案（只需匹配答案的对错，而对答案的顺序不做要求）"
            active-color="#13ce66"
            inactive-color="#ccc"
            style="margin-left:20px"
            @change="switchStatus"
          ></el-switch>
        </el-form-item>
        <br />
        <el-form-item label="题目解析：">
          <kindeditor
            @kindeditorChange="changeAnalysis"
            :content="subjectData.problem_analysis"
            height="200px"
            id="analysis"
          />
        </el-form-item>
        <br />
        <el-form-item label=" ">
          <el-button class="min_el_btn" type="success" @click="goback"
            >取消</el-button
          >
          <el-button
            class="min_el_btn"
            type="primary"
            @click="saveTopic('answer')"
            >保存</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>

<script>
let zm = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
]
export default {
  name: 'addObject',
  data() {
    return {
      dialogVisible: false,
      zm: zm,
      title: '',
      tigan: '',
      chapTopList: [],
      realList: [],
      chapLis: [
        {
          name: '',
          list: [],
        },
        {
          name: '',
          list: [],
        },
      ],
      // 题目类型
      subjectData: {
        problem_title: '',
        problem_description: '',
        problem_chapter_id: '',
        problem_content: [],
        problem_answer: '',
        problem_analysis: '',
      },
      defaultbutton: '',
      testList: {},
      rule: {
        problem_chapter_id: [
          { required: true, message: '请选择章节', trigger: 'blur' },
        ],
        problem_title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
        ],
      },
      problem_type: 0,
      value1: false,
    }
  },
  created() {
    this.problem_course_id = this.$route.query.problem_course_id
    let problem_chapter_id = this.$route.query.problem_chapter_id
    problem_chapter_id
      ? (this.subjectData.problem_chapter_id = problem_chapter_id)
      : (this.subjectData.problem_chapter_id = '')
    this.problem_type = this.$route.query.problem_type
    this.problem_type != 5
      ? (this.subjectData.problem_content = [
          {
            content: '',
          },
          {
            content: '',
          },
          {
            content: '',
          },
          {
            content: '',
          },
        ])
      : (this.subjectData.problem_content = [])

    this.$api.getChapterList(this, 'testList')
  },
  mounted() {
    if (this.$route.query.problem_id != undefined) {
      console.log('编辑')
      this.$api.getProblemInfo(this, 'subjectData')
    }
  },
  methods: {
    switchStatus() {
      console.log(this.value1)
    },
    goback() {
      this.$router.go(-1)
    },
    // 选择题目类型
    editSubjectClass(index) {
      this.subjectData.problem_type = index
      this.subjectData.problem_answer = ''
      if (this.subjectData.problem_type == 3) {
        let problem_content = this.subjectData.problem_content
        this.subjectData.problem_content = []
        this.subjectData.problem_content[0] = problem_content[0] || {
          content: '',
        }
        this.subjectData.problem_content[1] = problem_content[1] || {
          content: '',
        }
      }
    },
    // 富文本题目
    changeTitle(txt) {
      this.subjectData.problem_description = txt
      // this.subjectData.problem_title = txt.substring(0, 30)
      // console.log(txt)
      // console.log(this.subjectData.problem_title)
    },
    // 答案
    changeAnswer(txt, index) {
      this.subjectData.problem_content[index].content = txt
    },
    SimpleAnswer(txt) {
      this.subjectData.problem_answer = txt
    },
    // 删除答案
    deleteAnswer(index) {
      this.subjectData.problem_content.splice(index, 1)
    },
    // 添加答案
    addAnswer() {
      let obj = {
        content: '',
      }
      this.subjectData.problem_content.push(obj)
    },
    clickjudgeAnswer(answer) {
      this.defaultbutton = answer
      this.subjectData.problem_answer = ''
      this.subjectData.problem_answer += answer
    },
    addJudgeAnswer() {},
    // 选中答案
    clickAnswer(index) {
      if (this.$route.query.problem_type == 2) {
        // 多选
        if (this.subjectData.problem_answer.includes(this.zm[index])) {
          this.subjectData.problem_answer = this.subjectData.problem_answer.replace(
            this.zm[index] + ',',
            ''
          )
        } else {
          this.subjectData.problem_answer += this.zm[index] + ','
        }
      } else {
        this.subjectData.problem_answer = this.zm[index]
      }
    },
    // 题目解析
    changeAnalysis(txt) {
      this.subjectData.problem_analysis = txt
    },
    // 保存题目
    saveTopic(formName) {
      if (this.$route.query.problem_type == 4) {
        this.subjectData.problem_answer = ''
        this['subjectData'].problem_content.forEach((item, i) => {
          this.subjectData.problem_answer += item.content + ','
        })
      }
      console.log(this.subjectData)
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if (this.$route.query.problem_id != undefined) {
            this.$api.updateProblem(this, 'subjectData')
          } else {
            this.$api.insertProblemData(this, 'subjectData')
          }
        } else {
          this.$message({
            type: 'error',
            message: '请完善相关内容！',
          })
        }
      })
    },
    // 开启预览
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
  },
}
</script>

<style scoped lang="scss">
.module_box {
  display: flex;
}
.main {
  margin: 20px 0 0 20px;
  padding: 20px;
  background: #ffffff;
}
.delete_i {
  font-size: 18px;
  padding: 10px;
  margin: 10px;
  cursor: pointer;
  color: #807676;
}
.delete_i:hover {
  color: red;
}
.fl {
  float: left;
}
// /deep/ .el-form-item__content{
//     width: 550px !important;
// }
.preview {
  padding: 20px;
  width: 500px;
  height: 500px;
  border: 1px solid pink;
  background: #cecece;
  overflow: auto;
  position: absolute;
  right: 100px;
  top: calc(50% - 100px);
  p {
    margin-top: 10px;
    padding-left: 35px;
    font-size: '18px';
    span {
      color: '#cecece';
      font-size: '18px';
    }
  }
  h3 {
    margin-top: 10px;
    padding-left: 20px;
  }
}
.btn {
  color: #ffffff;
  background: #2798ee;
  border-color: #2798ee;
}
</style>
