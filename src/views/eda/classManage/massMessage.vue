<template>
  <div class="main">
    <header>
      <ul>
        <li
          v-for="(item, index) in topfun"
          :key="index"
          :class="{ active: index == current }"
          @click="doActive(index)"
        >
          {{ item.name }}
        </li>
      </ul>
    </header>
    <section v-if="current == 0">
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="通知标题" prop="title">
          <el-input
            v-model="ruleForm.title"
            placeholder="请输入通知标题"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="任课老师" prop="teacher">
          <el-select
            v-model="ruleForm.teacher"
            filterable
            placeholder="请输入任课老师"
          >
            <el-option
              :label="item.teacher_name"
              :value="item.teacher_name"
              v-for="(item, index) in teacherData.list"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="上课时间" prop="time">
          <el-input
            v-model="ruleForm.time"
            placeholder="请输入上课时间"
          ></el-input>
          <!-- <el-date-picker
            v-model="ruleForm.time"
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="请输入上课时间"
          >
          </el-date-picker> -->
        </el-form-item>
        <el-form-item label="上课内容" prop="content">
          <el-input
            v-model="ruleForm.content"
            placeholder="请输入上课内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="上课地点" prop="address	">
          <el-input
            v-model="ruleForm.address"
            placeholder="请输入上课地点"
          ></el-input>
        </el-form-item>
        <el-form-item label="注意事项" prop="remarks">
          <el-input
            v-model="ruleForm.remarks"
            type="textarea"
            placeholder="请输入内容(请携带XX教材)"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="classSend">群发消息</el-button>
          <el-checkbox
            v-model="messVal"
            @change="checkMess"
            style="padding-left:10px"
            >模板消息</el-checkbox
          >
        </el-form-item>
      </el-form>
    </section>
    <section v-if="current == 1">
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="通知标题" prop="title">
          <el-input
            v-model="ruleForm.title"
            placeholder="请输入通知标题"
          ></el-input>
        </el-form-item>
        <el-form-item label="考试科目" prop="content">
          <el-input
            v-model="ruleForm.content"
            placeholder="请输入考试科目"
          ></el-input>
        </el-form-item>
        <el-form-item label="考试时间" prop="time">
          <el-date-picker
            v-model="ruleForm.time"
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="请输入上课时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="考试地点" prop="address">
          <el-input
            v-model="ruleForm.address"
            placeholder="请输入上课内容"
          ></el-input>
        </el-form-item>

        <el-form-item label="注意事项" prop="remarks">
          <el-input
            v-model="ruleForm.remarks"
            type="textarea"
            placeholder="请输入注意事项（请携带身份证,准考证等)"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="testSend">群发消息</el-button>
        </el-form-item>
      </el-form>
    </section>
    <section v-if="current == 2">
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="学生姓名" prop="name">
          <el-select
            v-model="ruleForm.uid_arr"
            class="chapterTag"
            filterable
            @remove-tag="removeStu"
            multiple
            placeholder="请选择输入学生"
          >
            <el-option
              v-for="item in studentData.data"
              :key="item.intent_id"
              :label="item.course_username"
              :value="item.intent_id"
            >
            </el-option>
          </el-select>
          <el-button type="primary" @click="dialogShow" style="margin-left:20px"
            >添加学员</el-button
          >
        </el-form-item>
        <el-form-item label="通知标题" prop="title">
          <el-input
            v-model="ruleForm.title"
            placeholder="请输入通知标题"
          ></el-input>
        </el-form-item>
        <el-form-item label="通知详情" prop="content">
          <el-input
            v-model="ruleForm.content"
            type="textarea"
            placeholder="请输入通知详情"
          ></el-input>
        </el-form-item>
        <el-form-item label="" prop="name">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="poorStuSend">群发消息</el-button>
        </el-form-item>
      </el-form>
    </section>

    <!--表格-->
    <div class="userTable">
      <el-table
        ref="multipleTable"
        :data="schoolData.list"
        style="width: 100%"
        class="min_table"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column
          prop="sms_id"
          label="序号"
          show-overflow-tooltip
          min-width="90"
        ></el-table-column>
        <el-table-column
          prop="type"
          label="消息类型"
          show-overflow-tooltip
          min-width="90"
        ></el-table-column>
        <el-table-column
          prop="title"
          label="通知标题"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="通知内容" min-width="270" show-overflow-tooltip>
          <template slot-scope="scope">
            <div
              v-html="scope.row.content"
              class="text_overflow"
              :title="scope.row.content"
            ></div>
          </template>
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="发送时间"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="total"
          label="发送总数"
          min-width="80"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="success"
          label="发送成功"
          min-width="90"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="fail"
          label="发送失败"
          min-width="90"
          show-overflow-tooltip
        ></el-table-column>
      </el-table>

      <div class="table_bottom">
        <div class="table_bottom">
          <page
            :data="schoolData.total"
            :curpage="page"
            @pageChange="doPageChange"
          />
        </div>
      </div>
    </div>
    <!--弹框-->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="70%"
      height="50%"
    >
      <search2
        :contentShow="true"
        api="getclasstudents"
        inputText="学生名称"
        @getTable="getTableList"
      ></search2>
      <el-table
        ref="multipleTable"
        :data="studentData.data"
        style="width: 100%;margin-top:20px"
        class="min_table"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <!-- <el-table-column
          prop="uid"
          label="学员编号"
          show-overflow-tooltip
          min-width="90"
        ></el-table-column> -->
        <el-table-column
          prop="user_realname"
          label="学员姓名"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="telphone"
          label="手机号码"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        -->
        <el-table-column
          prop="regedit_time"
          label="学习时长"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="sort"
          label="学习进度"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="sort"
          label="做题总数"
          min-width="90"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="sort"
          label="做题进度"
          min-width="90"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          min-width="250"
          align="center"
        >
          <template slot-scope="scope">
            <div style="display:flex;justify-content:space-around">
              <el-button
                type="text"
                @click="handleAdd(scope.row.intent_id)"
                v-if="scope.row.addChose == 0"
                >添加</el-button
              >
              <el-button
                type="text"
                @click="cancelAdd(scope.row.intent_id)"
                v-if="scope.row.addChose == 1"
                >取消添加</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="table_bottom">
        <div class="table_bottom">
          <page
            :data="studentData.total"
            :curpage="page"
            @pageChange="doPageChange2"
          />
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'massMessage',
  data() {
    return {
      value: '',
      teacherData: [],
      studentData: [],
      page: 1,
      messVal: true,
      dialogVisible: false,
      ruleForm: {
        title: '',
        type: '',
        teacher: '',
        time: '',
        content: '',
        address: '',
        remarks: '',
        uid_arr: [],
        wechat_notice: 1,
      },
      classroom_id: 0,
      current: '0',
      topfun: [
        { name: '上课通知' },
        { name: '考试通知' },
        { name: '差生提醒' },
      ],
      schoolData: [],
    }
  },
  mounted() {
    this.classroom_id = this.$route.query.classroom_id
    this.$api.getMessageInfo(this, 'schoolData')
    // this.$api.getTeacherList(this, 'teacherData')
    this.$api.getclasstudents(this, 'studentData')
  },

  methods: {
    //勾选模板消息
    checkMess(val) {
      val
        ? (this.ruleForm.wechat_notice = 1)
        : (this.ruleForm.wechat_notice = 0)
    },
    getTableList(state, val, datas) {
      console.log(state, val)
      if (state == 'page') {
        this.page = val
        this.datas = datas
      } else if (state == 'data') {
        this.studentData = val
      }
    },
    doPageChange(page) {
      this.page = page
      this.$api.getMessageInfo(this, 'schoolData')
    },
    doPageChange2(page) {
      this.page = page
      this.$api.getclasstudents(this, 'studentData', this.datas)
    },
    removeStu(ev) {
      console.log(ev)
      this.studentData.data.forEach((v) => {
        if (ev == v.intent_id) {
          this.$set(v, 'addChose', 0)
        }
      })
    },
    //取消添加
    cancelAdd(ab) {
      console.log(ab)
      var uid_arr = this.ruleForm.uid_arr
      var that = this
      // var data = studentData.data
      if (uid_arr.length > 0) {
        uid_arr.forEach((i, index) => {
          if (i == ab) {
            uid_arr.splice(index, 1)
            console.log(uid_arr, index)
            that.studentData.data.forEach((v) => {
              if (i == v.intent_id) {
                that.$set(v, 'addChose', 0)
              }
            })
          }
        })
      }
      console.log(that.studentData.data)
      this.ruleForm.uid_arr = uid_arr
    },
    handleAdd(zx) {
      let uid_arr = this.ruleForm.uid_arr
      console.log(uid_arr.length)
      this.studentData.data.forEach((v) => {
        if (zx == v.intent_id) {
          this.$set(v, 'addChose', 1)
          this.ruleForm.uid_arr.push(zx)
        }
      })
      console.log(this.ruleForm.uid_arr)
    },
    //显示弹框
    dialogShow() {
      // console.log(this.)
      let uid_arr = this.ruleForm.uid_arr
      if (uid_arr.length > 0) {
        uid_arr.forEach((i) => {
          this.studentData.data.forEach((v) => {
            if (i == v.intent_id) {
              v.addChose = 1
            }
          })
        })
      }

      this.dialogVisible = true
    },
    //差生
    poorStuSend() {
      this.ruleForm.type = 3
      console.log(this.ruleForm)
      this.$confirm('你正在群发差生提醒,是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$api.sendMessage(this, this.ruleForm)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消',
          })
        })
    },
    //上课通知
    classSend() {
      this.ruleForm.type = 1
      console.log(this.ruleForm)
      this.$confirm('你正在群发短信,是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$api.sendMessage(this, this.ruleForm)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消',
          })
        })
    },
    //考试通知
    testSend() {
      console.log(this.ruleForm)
      this.ruleForm.type = 2
      console.log(this.ruleForm)
      this.$confirm('你正在群发考试通知,是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$api.sendMessage(this, this.ruleForm)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消',
          })
        })
    },
    cancel() {
      // this.$router.push({
      //   name: 'classDetail',
      // })
    },
    doActive(index) {
      this.current = index
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
.active {
  color: rgba(25, 159, 255, 1);
  border-bottom: 3px solid rgba(25, 159, 255, 1);
  // background: rgba(25, 159, 255, 1);
}
.text_overflow {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.el-input {
  width: 240px;
}
.el-input--suffix .el-input__inner {
  width: 240px;
}
/deep/.el-textarea__inner {
  max-width: 407px;
  height: 127px;
  padding: 10px 10px;
}
/deep/.el-form-item {
  margin-bottom: 35px;
}
.userTable {
  margin-top: 20px;
}
header {
  border-bottom: 2px solid #d7d7d7;
  width: 100%;
  margin-bottom: 40px;
  padding-left: 10px;
  ul {
    font-size: 16px;
    display: flex;
    width: 230px;
    // padding-left: 20px;
    justify-content: space-between;
    // border-bottom: 2px solid #d7d7d7;
    li {
      list-style: none;
      width: 70px;
      font-size: 13px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      // border: 1px solid #cecece;
      // border-bottom: 0 solid #ffffff;
      // border-top-left-radius: 4px;
      // border-top-right-radius: 4px;
      cursor: pointer;
    }
    li:hover {
      border-bottom: 3px solid rgba(25, 159, 255, 1);
    }
  }
}
</style>
