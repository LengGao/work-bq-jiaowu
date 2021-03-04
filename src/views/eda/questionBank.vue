<template>
  <section class="mainwrap">
    <div class="client_head">
      <search
        :hideTime="true"
        :hideOtherOption="true"
        :selectItems="true"
        api="getProblemCourseList"
        placeholder="选择分类"
        @getTable="getTableList"
        :selectList="selectData.list"
      ></search>
      <el-button type="primary" @click="addVideo">创建题库</el-button>
    </div>
    <!--表格-->
    <div class="userTable">
      <el-table
        ref="multipleTable"
        :data="questionBank.list"
        style="width: 100%"
        class="min_table"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="60"
          align="center"
        ></el-table-column>
        <el-table-column
          label="题库编号"
          show-overflow-tooltip
          min-width="70"
          align="center"
        >
          <template slot-scope="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column
          prop="course_name"
          label="题库名称"
          min-width="160"
          show-overflow-tooltip
          align="left"
        ></el-table-column>
        <el-table-column
          label="课程分类"
          min-width="100"
          show-overflow-tooltip
          align="center"
          prop="category_name"
        ></el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          min-width="130"
          align="center"
        >
          <template slot-scope="scope">
            <div style="display:flex;justify-content:space-around">
              <el-button type="text" @click="editor(scope.$index, scope.row)"
                >编辑</el-button
              >
              <el-button
                type="text"
                @click="chapterPractise(scope.$index, scope.row)"
                >章节练习</el-button
              >
              <el-button type="text" @click="yearTest(scope.$index, scope.row)"
                >历年真题</el-button
              >
              <el-button
                type="text"
                @click="freedomTest(scope.$index, scope.row)"
                >自主出题</el-button
              >
              <el-button type="text" @click="delbtn(scope.row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="table_bottom">
      <div class="table_bottom">
        <page
          :data="questionBank.total"
          :curpage="page"
          @pageChange="doPageChange"
        />
      </div>
    </div>
    <el-button type="warning" @click="multiDel" style="margin-top:20px"
      >批量删除</el-button
    >
    <el-dialog title="创建题库" :visible.sync="dialogVisible" width="30%">
      <el-form ref="reasonForm" label-width="150px">
        <el-form-item label="题库名称：" prop="">
          <el-input
            v-model="newbank.category_name"
            class="input-width"
          ></el-input>
        </el-form-item>
        <el-form-item label="课程分类: ">
          <!-- <el-input v-model="createVideo.class" class="input-width"></el-input> -->
          <el-select v-model="newbank.category_id" filterable>
            <el-option
              :label="item.category_name"
              :value="item.category_id"
              v-for="(item, index) in selectData.list"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑题库" :visible.sync="dialogEditorVisible" width="30%">
      <el-form ref="reasonForm" label-width="150px">
        <el-form-item label="题库名称：" prop="">
          <el-input
            v-model="newbank.category_name"
            class="input-width"
          ></el-input>
        </el-form-item>
        <el-form-item label="课程分类: ">
          <!-- <el-input v-model="createVideo.class" class="input-width"></el-input> -->
          <el-select v-model="newbank.category_id" filterable>
            <el-option
              :label="item.category_name"
              :value="item.category_id"
              v-for="(item, index) in selectData.list"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEditorVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEditorConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </section>
</template>
<script>
const defaultcreateVideo = {
  name: null,
  sort: 0,
  class: 0,
}
export default {
  data() {
    return {
      datas: {},
      page: 1,
      dialogEditorVisible: false,
      multipleSelection: [],
      questionBank: Object.assign({}, {}),
      selectList: {},
      selectData: {
        list: {
          category_id: '',
        },
      },
      newbank: {
        category_name: '',
        category_id: '',
        problem_course_id: '',
      },
      courseInfo: {
        info: {
          name: '',
        },
      },
      dialogVisible: false,
      createVideo: Object.assign({}, defaultcreateVideo),
      videoId: null,
      category_id: '',
    }
  },
  created() {
    this.$api.getProblemCourseLists(this, 'questionBank')
    this.$api.getCategoryList(this, 'selectData')
  },
  methods: {
    getTableList(state, val, datas) {
      console.log(state, val)
      if (state == 'page') {
        this.page = val
        this.datas = datas
      } else if (state == 'data') {
        this.questionBank = val
      }
    },
    selectChange(val) {
      console.log(val)
      this.$forceUpdate()
    },
    addVideo() {
      this.dialogVisible = true
      this.newbank = {
        category_name: '',
        category_id: '',
        problem_course_id: '',
      }
    },
    chapterPractise(index, data) {
      console.log(index, data,'456')
      this.$router.push({
        path: '/eda/chapterPractise',
        query: { problem_course_id: data.problem_course_id, chapter_type: 1 },
      })
    },
    yearTest(index, data) {
      this.$router.push({
        path: '/eda/chapterPractise',
        query: { problem_course_id: data.problem_course_id, chapter_type: 2 },
      })
    },
    freedomTest(index, data) {
      this.$router.push({
        path: '/eda/chapterPractise',
        query: { problem_course_id: data.problem_course_id, chapter_type: 3 },
      })
    },
    editor(index, row) {
      this.dialogEditorVisible = true
      this.newbank.category_id = row.category_id
      this.newbank.category_name = row.course_name
      this.newbank.problem_course_id = row.problem_course_id
      console.log(row)
    },
    doPageChange(page) {
      this.page = page
      this.$api.getProblemCourseLists(this, 'questionBank', this.datas)
    },
    handleConfirm() {
      this.dialogVisible = false
      this.$api.insertProblemCourse(this, 'newbank')
    },
    handleEditorConfirm() {
      this.dialogEditorVisible = false
      this.$api.updateProblemCourse(this, 'newbank')
    },
    chapterVideo() {},
    delbtn(data) {
      let that = this
      this.$confirm('确定要删除当前分类吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          console.log(data)
          that.$api.deleteProblemCourse(this, data.problem_course_id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    multiDel() {
      if (this.multipleSelection.length == 0) {
        this.$message({
          message: '请先勾选操作选项！',
          type: 'warning',
        })
      }
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
}
.client_head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.userTable {
  margin-top: 20px;
}
.input-width {
  width: 217px;
}


</style>
