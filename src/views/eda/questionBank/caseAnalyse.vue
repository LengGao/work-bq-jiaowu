<template>
  <section class="mainwrap">
    <el-form
      :inline="true"
      label-position="right"
      label-width="110px"
    ></el-form>
    <div class="module_box">
      <div class="fenge">
        <el-form
          :inline="true"
          label-position="left"
          :model="parentData"
          label-width="110px"
          ref="dataForm1"
          :rules="rules"
          class="left-container"
        >
          <el-form-item label="所属章节：" prop="problem_chapter_id">
            <el-select
              filterable
              v-model="parentData.problem_chapter_id"
              ref="title"
              test-attrs="$attrs"
              placeholder="请选择所属章节/真题"
              style="width:300px"
            >
              <el-option
                v-for="(it, ind) in testList.list"
                :key="ind"
                :label="it.chapter_name"
                :value="it.problem_chapter_id"
                @click.native="toChooseChapter(it)"
              ></el-option>
            </el-select>
          </el-form-item>
          <br />
          <el-form-item label="索引标题：" prop="problem_title">
            <el-input
              v-model="parentData.problem_title"
              placeholder="请输入内容"
              maxlength="64"
              show-word-limit
              style="width:500px "
            ></el-input>
          </el-form-item>
          <br />
          <el-form-item label="案例材料: " prop="problem_description">
            <kindeditor
              @kindeditorChange="changeParentTitle"
              :content="parentData.problem_description"
              height="200px"
              id="caseAnalyse"
            />
          </el-form-item>
          <br />
          <el-form-item label="案例题目: " prop="list">
            <ul class="wrapper-analyse">
              <li
                v-for="(item, index) of parentData.list"
                :key="index"
                style="cursor: pointer;"
                @click="AnalyseClick(index)"
                :class="{ activeColor: colorIndex === index }"
              >
                <p
                  style="width:450px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;-o-text-overflow: ellipsis;float:left"
                  v-html="item.problem_description"
                >
                  {{ index + 1 }}、{{ item.problem_description }}
                </p>
                <i
                  class="el-icon-close"
                  @click.stop.prevent="AnalyseDelete(item, index)"
                ></i>
              </li>
              <span style="color:#cecece" v-show="!parentData.list.length"
                >请点击下方按钮完善相关内容！</span
              >
            </ul>
          </el-form-item>
          <br />
          <el-form-item label="添加题目: ">
            <el-select
              v-model="value"
              placeholder="添加题目"
              clearable
              filterable
            >
              <el-option
                v-for="(item, index) in selectList"
                :key="index"
                :label="item.label"
                :value="item.value"
                @click.native="toAddChapter(item)"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <el-form
        :inline="true"
        label-position="left"
        :model="subjectData"
        label-width="110px"
        ref="dataForm2"
        :rules="rule"
      >
        <el-form-item label="索引标题：" prop="problem_title">
          <el-input
            v-model="subjectData.problem_title"
            placeholder="请输入内容"
            maxlength="64"
            show-word-limit
            style="width:500px"
          ></el-input>
        </el-form-item>
        <br />
        <el-form-item label="试题题干：" prop="problem_description">
          <kindeditor
            @kindeditorChange="changeTitle"
            :content="subjectData.problem_description"
            height="200px"
          />
        </el-form-item>
        <div
          v-for="(item, index) in subjectData.problem_content"
          :key="index"
          v-show="
            subjectData.problem_type != 3 && subjectData.problem_type != 4
          "
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
          v-show="
            subjectData.problem_type != 3 &&
              subjectData.problem_type != 4 &&
              subjectData.problem_type != 5
          "
        >
          <el-button icon="el-icon-plus" @click="addAnswer"
            >添加答案选项</el-button
          >
        </el-form-item>
        <br />
        <el-form-item
          label="正确答案："
          v-show="
            subjectData.problem_type != 3 &&
              subjectData.problem_type != 4 &&
              subjectData.problem_type != 5
          "
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
          <span
            style="color:#cecece"
            v-show="!subjectData.problem_content.length"
            >请添加答案选项完善相关内容！</span
          >
        </el-form-item>
        <el-form-item label="正确答案：" v-show="subjectData.problem_type == 3">
          <el-button
            :class="defaultbutton == 'A' ? 'btn' : ''"
            @click="clickjudgeAnswer('A')"
            >正确</el-button
          >
          <el-button
            :class="defaultbutton == 'B' ? 'btn' : ''"
            @click="clickjudgeAnswer('B')"
            >错误</el-button
          >
        </el-form-item>
        <el-form-item label="正确答案：" v-show="subjectData.problem_type == 4">
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
        <el-form-item label="正确答案：" v-show="subjectData.problem_type == 5">
          <kindeditor
            @kindeditorChange="SimpleAnswer($event)"
            :content="subjectData.problem_answer"
            id="simpleAnswer"
            height="150px"
            class="fl"
          />
        </el-form-item>
        <br />
        <el-form-item
          label=" "
          class="div_k"
          v-show="subjectData.problem_type == 4"
        >
          <el-button icon="el-icon-plus" @click="addAnswer"
            >添加填空答案</el-button
          >
          <el-switch
            v-model="value1"
            active-text="乱序匹配答案（只需匹配答案的对错，而对答案的顺序不做要求）"
            active-color="#13ce66"
            inactive-color="#ff4949"
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
          <el-button
            class="min_el_btn"
            type="danger"
            @click="resetForm('dataForm2')"
            >重置</el-button
          >
          <el-button
            class="min_el_btn"
            type="primary"
            @click="saveTopics('answer')"
            v-if="!flag"
            >添加</el-button
          >
          <el-button
            class="min_el_btn"
            type="primary"
            @click="editorTopics('answer')"
            v-else
            >修改</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="bottom-wrapper">
      <el-button type="success" @click="goback">取消</el-button>
      <el-button type="primary" style="margin-left:20px" @click="submit"
        >提交</el-button
      >
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
  name: 'caseAnalyse',
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
        problem_type: 1,
        problem_id: '',
        ignore_order: '',
      },
      parentData: {
        problem_title: '',
        problem_description: '',
        problem_chapter_id: '',
        problem_content: [],
        problem_answer: '',
        problem_analysis: '',
        list: [],
        Addlist: [],
      },
      problem: [],
      selectList: [
        {
          value: '1',
          label: '单选',
        },
        {
          value: '2',
          label: '多选',
        },
        {
          value: '3',
          label: '判断',
        },
        {
          value: '4',
          label: '填空',
        },
        {
          value: '5',
          label: '简答',
        },
      ],
      value: '',
      testList: {},
      rule: {
        problem_chapter_id: [
          { required: true, message: '请选择章节', trigger: 'blur' },
        ],
        problem_title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
        ],
        problem_description: [
          { required: true, message: '请输入题干', trigger: 'blur' },
        ],
      },
      rules: {
        problem_chapter_id: [
          { required: true, message: '请选择章节', trigger: 'blur' },
        ],
        problem_title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
        ],
        problem_description: [
          { required: true, message: '请输入案例材料', trigger: 'blur' },
        ],
        list: [{ required: true, message: '请添加案例题目', trigger: 'blur' }],
      },
      problem_type: 1,
      value1: true,
      colorIndex: -1,
      flag: 0,
      delete_child_problem: [],
      problem_id: '',
      bottomSty: 1,
      defaultbutton: '',
    }
  },
  created() {
    let problem_chapter_id = this.$route.query.problem_chapter_id
    problem_chapter_id
      ? (this.parentData.problem_chapter_id = problem_chapter_id)
      : (this.parentData.problem_chapter_id = '')
    this.subjectData.problem_chapter_id = this.$route.query.problem_chapter_id
    this.problem_course_id = this.$route.query.problem_course_id
    this.$api.getChapterList(this, 'testList')
  },
  mounted() {
    if (this.$route.query.problem_id != undefined) {
      console.log('编辑')
      this.bottomSty = 0
      this.flag = 1 // 编辑
      this.$api.getAnalyseProblemInfo(this, 'subjectData', 'parentData')
    }
  },
  methods: {
    editorTopics() {
      if (this.subjectData.problem_type == 4) {
        this.subjectData.problem_answer = ''
        this['subjectData'].problem_content.forEach((item, i) => {
          this.subjectData.problem_answer += item.content + ','
        })
      }
      this.$refs['dataForm1'].validate((valid) => {
        if (valid) {
          this.$api.updatetAnalyseProblem(
            this,
            'subjectData',
            this.colorIndex,
            'update'
          )
        } else {
          this.$message({
            type: 'error',
            message: '请完善相关内容！',
          })
        }
      })
      console.log('点击事件')
    },
    toChooseChapter(data) {
      this.subjectData.problem_chapter_id = data.problem_chapter_id
      console.log(this.subjectData.problem_chapter_id)
    },
    resetForm(name) {
      if (this.flag) {
        this.$message('重置表单后，可增加数据，点击左侧列表可获取数据。')
        this.flag = 0
      }
      this.$refs['dataForm2'].resetFields()
      this.defaultbutton = ''
      this.subjectData = {
        problem_title: '',
        problem_description: '',
        problem_chapter_id:
          this.subjectData.problem_chapter_id == undefined
            ? ''
            : this.subjectData.problem_chapter_id,
        problem_content: [],
        problem_answer: '',
        problem_analysis: '',
        problem_type: this.value,
      }
      console.log(this.parentData.list)
    },
    toAddChapter(item) {
      console.log(item, this.parentData.list)
      this.problem_type = parseInt(item.value)
      this.subjectData.problem_type = item.value
      this.$refs['dataForm2'].resetFields()
      if (this.flag) {
        this.flag = 0
      }
      this.subjectData = {
        problem_title: '',
        problem_description: '',
        problem_chapter_id:
          this.subjectData.problem_chapter_id == undefined
            ? ''
            : this.subjectData.problem_chapter_id,
        problem_content: [],
        problem_answer: '',
        problem_analysis: '',
        problem_type: this.value,
      }
    },
    saveTopics() {
      if (this.subjectData.problem_type == 4) {
        this.subjectData.problem_answer = ''
        this['subjectData'].problem_content.forEach((item, i) => {
          this.subjectData.problem_answer += item.content + ','
        })
      }
      this.$refs['dataForm2'].validate((valid) => {
        if (valid) {
          if (this.$route.query.problem_id != undefined) {
            console.log('点击了添加按钮')
            let op
            op = this._.cloneDeep(this.subjectData) //深拷贝
            this.parentData.Addlist.push(op) // 将深拷贝的内容添加至新的数组中用于区别
            this.parentData.list.push(op) // 反显
            console.log(this.parentData.Addlist)
            return
          }
          let op
          op = this._.cloneDeep(this.subjectData) //深拷贝
          this.parentData.list.push(op)
          console.log(this.parentData.list)
        } else {
          this.$message({
            type: 'error',
            message: '请完善相关内容！',
          })
        }
      })
    },
    submit() {
      let that = this
      console.log(this.parentData)
      this.$refs['dataForm1'].validate((valid) => {
        if (valid) {
          if (that.$route.query.problem_id != undefined) {
            that.$api.updatetAnalyseProblem(
              that,
              'subjectData',
              that.colorIndex
            )
          } else {
            that.$api.insertProblemData(that, 'subjectData')
          }
        } else {
          that.$message({
            type: 'error',
            message: '请完善相关内容！',
          })
        }
      })
    },
    AnalyseDelete(items, index) {
      console.log('点击了删除按钮', this.parentData.Addlist, items)
      this.$confirm('点击下方修改按钮即可删除改题目', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.delete_child_problem.push(items.problem_id)
          this.parentData.list.splice(index, 1)
          //比对problem_description并删除新增数据
          if (this.parentData.Addlist.length != 0) {
            this.parentData.Addlist.forEach((item, i) => {
              if (item.problem_description == items.problem_description) {
                this.parentData.Addlist.splice(i, 1)
              }
            })
          }
          console.log(this.delete_child_problem, this.parentData.Addlist)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消删除',
          })
        })
    },
    AnalyseClick(index) {
      if (this.$route.query.problem_id != undefined) {
        this.flag = 1
      }
      this.colorIndex = index
      this.$api.getAnalyseProblemInfo(this, 'subjectData', 'parentData', index)
    },
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
    },
    changeParentTitle(txt) {
      this.parentData.problem_description = txt
      // this.parentData.problem_title = txt.substring(0, 30)
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
      this.defaultbutton = ''
      this.subjectData.problem_answer = ''
      this.subjectData.problem_answer += answer
      this.defaultbutton = answer
    },
    addJudgeAnswer() {},
    // 选中答案
    clickAnswer(index) {
      console.log(this.subjectData.problem_type)
      if (this.subjectData.problem_type == 2) {
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
.left-container {
  float: left;
}
.bottom-wrapper {
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  bottom: -30px;
}

.el-icon-close {
  float: right;
  font-size: 19px;
  line-height: 42px;
  margin-right: 15px;
}
.main {
  padding-top: 0;
}
.module_box {
  display: flex;
  justify-content: space-around;
}
.module_box::after {
  content: '';
  display: block;
  width: 10px;
  height: calc(100% - 63px);
  background: rgb(213, 215, 218);
  position: absolute;
  top: 0px;
  right: calc(50% - 15px);
}
.module_box::before {
  content: '';
  display: block;
  width: calc(100% - 20px);
  height: 3px;
  background: #0d41ec;
  padding-left: 20px;
  position: absolute;
  bottom: 60px;
  left: 20px;
}
.main {
  margin: 20px 0 0 20px;
  padding: 20px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
}
.activeColor {
  background-color: #f6fbff;
  color: #298adb;
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
.wrapper-analyse {
  list-style: none;
  display: flex;
  flex-direction: column;
  width: 500px;
}
.wrapper-analyse li {
  border: 1px solid rgba(220, 223, 230, 1);
  border-radius: 5px;
  height: 42px;
  padding-left: 10px;
  margin-top: 10px;
}
.isActive {
  background: #ecf5ff !important;
  border-color: #2187e7 !important;
  color: #fff;
}
.btn {
  color: #ffffff;
  background: #2798ee;
  border-color: #2798ee;
}
</style>
