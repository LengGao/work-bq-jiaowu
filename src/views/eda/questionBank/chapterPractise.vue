<template>
  <div class="home">
    <section>
      <ul class="left-container">
        <li style="color:#909399">
          章节名称
          <i class="el-icon-circle-plus-outline" @click="addPaper"></i>
        </li>
        <li style="cursor: pointer;" @click="toAllDetail()">
          全部题目({{ testList.problem_total }})
        </li>
        <li
          v-for="(item, index) of testList.list"
          :key="index"
          :class="{ activeColor: colorIndex === index }"
        >
          <span
            style="width:195px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;display:block;float:left;cursor: pointer;"
            @click="toDetail(item, index)"
            >{{ item.chapter_name }}--{{ item.problem_total }}</span
          >
          <i class="el-icon-delete" @click.stop.prevent="sapceDelete(item)"></i>
          <i class="el-icon-edit" @click.stop.prevent="sapceEditor(item)"></i>
        </li>
      </ul>
    </section>
    <section class="right-container">
      <header>
        <div class="left-zoom">
          <search
            :hideTime="true"
            :hideOtherOption="true"
            :searchType="info"
            api="getProblemList"
            @getTable="getTableList"
          ></search>
          <div>
            <el-dropdown split-button type="primary">
              选择题目
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="(item, index) in selectList"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  @click.native="toAddChapter(item)"
                >
                  {{ item.label }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <!-- <el-select v-model="value" placeholder="添加题目" clearable>
              <el-option
                v-for="(item, index) in selectList"
                :key="index"
                :label="item.label"
                :value="item.value"
                @click.native="toAddChapter(item)"
              ></el-option>
            </el-select> -->
            <el-button type="primary" style="margin-left:20px"
              >批量录入</el-button
            >
          </div>
        </div>
        <div class="userTable">
          <el-table
            ref="multipleTable"
            :data="chapterData.list"
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
              label="题目序号"
              show-overflow-tooltip
              min-width="70"
              align="center"
            >
              <template slot-scope="scope">{{ scope.$index + 1 }}</template>
            </el-table-column>

            <el-table-column
              prop="nickname"
              label="题干"
              min-width="210"
              show-overflow-tooltip
              align="center"
            >
              <template slot-scope="scope">
                <p v-html="scope.row.problem_description">
                  {{ scope.row.problem_description }}
                </p>
              </template>
            </el-table-column>
            <el-table-column
              label="题目类型"
              min-width="150"
              show-overflow-tooltip
              align="center"
            >
              <template slot-scope="scope">{{
                scope.row.problem_type == 1
                  ? '单选题'
                  : scope.row.problem_type == 2
                  ? '多选题'
                  : scope.row.problem_type == 3
                  ? '判断题'
                  : scope.row.problem_type == 4
                  ? '填空题'
                  : scope.row.problem_type == 5
                  ? '简答题'
                  : scope.row.problem_type == 6
                  ? '场景'
                  : '未知类型'
              }}</template>
            </el-table-column>
            <el-table-column label="排序" min-width="100" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-col :span="12">
                  <el-input
                    v-model="scope.row.sort"
                    placeholder
                    size="small"
                    @input="scopes(scope.row, scope.row.sort)"
                  ></el-input>
                </el-col>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              fixed="right"
              min-width="130"
              align="center"
            >
              <template slot-scope="scope">
                <div style="display:flex;justify-content:space-around">
                  <el-button
                    type="text"
                    @click="editor(scope.$index, scope.row)"
                    >编辑</el-button
                  >
                  <el-button
                    type="text"
                    @click="transform(scope.$index, scope.row)"
                    >转移</el-button
                  >
                  <el-button
                    type="text"
                    @click="delbtn(scope.$index, scope.row)"
                    >删除</el-button
                  >
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </header>
      <main class="table_bottom">
        <div>
          <el-button
            type="success"
            @click="multiTranser"
            style="margin-top:20px"
            >批量移动</el-button
          >
          <el-button type="primary" @click="multiDel" style="margin-top:20px"
            >批量删除</el-button
          >
        </div>
        <page
          :data="chapterData.total"
          :pageSize="20"
          :curpage="page"
          @pageChange="doPageChange"
        />
      </main>
    </section>
    <el-dialog title="添加章节" :visible.sync="dialogVisible" width="30%">
      <el-form label-width="100px">
        <el-form-item label="章节名称：">
          <el-input
            v-model="addClassify.category_name"
            class="input-width"
          ></el-input>
        </el-form-item>
        <el-form-item label="章节排序：">
          <el-input
            v-model="addClassify.sort"
            class="input-width"
            type="number"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑章节" :visible.sync="dialogEditorVisible" width="30%">
      <el-form label-width="100px">
        <el-form-item label="章节名称：">
          <el-input
            v-model="addClassify.category_name"
            class="input-width"
          ></el-input>
        </el-form-item>
        <el-form-item label="章节排序：">
          <el-input
            v-model="addClassify.sort"
            class="input-width"
            type="number"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEditorVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEditorConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="章节名称" :visible.sync="dialogAddVisible" width="30%">
      <el-form label-width="100px">
        <el-form-item label="章节名称：">
          <el-select v-model="chapter_id" placeholder="章节名称" clearable>
            <el-option
              v-for="(item, index) in testList.list"
              :key="index"
              :label="item.chapter_name"
              :value="item.problem_chapter_id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAddVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'chapterPractise',
  data() {
    return {
      info: 'info',
      selectList: [
        {
          value: '1',
          label: '单选题',
        },
        {
          value: '2',
          label: '多选题',
        },
        {
          value: '3',
          label: '判断题',
        },
        {
          value: '4',
          label: '填空题',
        },
        {
          value: '5',
          label: '简答题',
        },
        {
          value: '6',
          label: '场景题',
        },
      ],
      datas: {},
      value: '',
      chapterData: [],
      addClassify: {
        category_name: '',
        sort: '',
        problem_chapter_id: '',
      },
      multipleSelection: [],
      list: '23',
      testList: {},
      dialogVisible: false,
      dialogEditorVisible: false,
      problem_course_id: '',
      page: 1,
      problem_chapter_id: '',
      colorIndex: -1,
      arrayId: [],
      dialogAddVisible: false,
      chapter_id: '',
    }
  },
  activated: function() {
    this.$api.getProblemList(this, 'chapterData')
    this.$api.getChapterList(this, 'testList')
  },
  created() {
    this.problem_course_id = this.$route.query.problem_course_id
    // this.problem_chapter_id = "";
  },
  mounted() {
    this.$api.getChapterList(this, 'testList')
    this.$api.getProblemList(this, 'chapterData')
  },
  methods: {
    scopes(ab, sorts) {
      console.log(ab.problem_id)
      var obj = {}
      var key = ab.problem_id + ''
      var value = sorts - 0
      obj[key] = value
      // eval('obj.' + key + "='" + value + "'")
      console.info(obj)

      console.log(obj)
      var regu = /^([1-9]\d*(\.\d*[1-9])?)|(0\.\d*[1-9])$/
      var re = new RegExp(regu)
      if (!re.test(sorts)) {
        this.$message.error('请输入正确的排序！')
        return false
      } else {
        this.$api.problemChapterSort(obj, this)
      }
    },
    multiTranser() {
      if (this.multipleSelection.length == 0) {
        this.$message({
          message: '请先勾选操作选项！',
          type: 'warning',
        })
        return
      }
      this.$confirm('确定要转移当前分类吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.arrayId.length = 0
          for (let item of this.multipleSelection) {
            this.arrayId.push(item.problem_id)
          }
          this.dialogAddVisible = true
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消转移',
          })
        })
    },
    toAddChapter(item) {
      console.log(item)
      if (item.value == 6) {
        this.$router.push({
          path: '/eda/caseAnalyse',
          query: {
            problem_chapter_id: this.problem_chapter_id,
            problem_course_id: this.$route.query.problem_course_id,
            problem_type: item.value,
            chapter_type: this.$route.query.chapter_type,
          },
        })
        return
      }
      this.$router.push({
        path: '/eda/addObject',
        query: {
          problem_chapter_id: this.problem_chapter_id,
          problem_course_id: this.$route.query.problem_course_id,
          problem_type: item.value,
          chapter_type: this.$route.query.chapter_type,
        },
      })
    },
    toDetail(data, index) {
      console.log(data)
      this.colorIndex = index
      this.problem_chapter_id = data.problem_chapter_id
      this.$api.getProblemList(this, 'chapterData')
    },
    toAllDetail() {
      this.colorIndex = -1
      this.problem_chapter_id = ''
      this.$api.getProblemList(this, 'chapterData')
    },
    sapceDelete(data) {
      console.log(data)
      this.$confirm('删除章节后章节包含的题目也会被删除，请谨慎操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$api.deleteChapter(this, data.problem_chapter_id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    sapceEditor(item) {
      console.log(item)
      this.addClassify.category_name = ''
      this.addClassify.sort = ''
      this.addClassify.problem_chapter_id = ''
      this.addClassify.category_name = item.chapter_name
      this.addClassify.problem_chapter_id = item.problem_chapter_id
      this.addClassify.sort = item.sort
      this.dialogEditorVisible = true
    },
    addPaper() {
      this.dialogVisible = true
      this.addClassify = {
        category_name: '',
        sort: '',
        problem_chapter_id: '',
      }
    },
    handleConfirm() {
      this.dialogVisible = false
      this.$api.insertChapter(this, 'addClassify')
    },
    handleEditorConfirm() {
      this.dialogEditorVisible = false
      this.$api.updateChapterInfo(this, 'addClassify')
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    transform(index, item) {
      this.arrayId.length = 0
      this.arrayId.push(item.problem_id)
      this.dialogAddVisible = true
      console.log(index, item)
    },
    multiDel() {
      if (this.multipleSelection.length == 0) {
        this.$message({
          message: '请先勾选操作选项！',
          type: 'warning',
        })
        return
      }
      this.$confirm('确定要删除当前分类吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          for (let item of this.multipleSelection) {
            this.arrayId.push(item.problem_id)
          }
          this.$api.deleteProblem(this, 'arrayId')
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    delbtn(index, item) {
      console.log(index, item)
      this.$confirm('确定要删除当前题目吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.arrayId.length = 0
          this.arrayId.push(item.problem_id)
          this.$api.deleteProblem(this, 'arrayId')
          // this.$message({
          //   type: "success",
          //   message: "删除成功!",
          // });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    doPageChange(page) {
      this.page = page
      this.$api.getProblemList(this, 'chapterData', this.datas)
    },
    handleAddConfirm() {
      this.dialogAddVisible = false
      this.$api.moveProblem(this, 'arrayId')
      console.log(this.chapter_id)
    },
    editor(index, item) {
      console.log(item)
      if (item.problem_type == 6) {
        this.$router.push({
          path: '/eda/caseAnalyse',
          query: {
            problem_chapter_id: this.problem_chapter_id,
            problem_course_id: this.$route.query.problem_course_id,
            problem_type: item.problem_type,
            chapter_type: this.$route.query.chapter_type,
            problem_id: item.problem_id,
          },
        })
        return
      }
      this.$router.push({
        path: '/eda/addObject',
        query: {
          problem_chapter_id: this.problem_chapter_id,
          problem_course_id: this.$route.query.problem_course_id,
          problem_type: item.problem_type,
          chapter_type: this.$route.query.chapter_type,
          problem_id: item.problem_id,
        },
      })
    },
    // 获取数据
    getTableList(state, val, datas) {
      console.log(state, val)
      if (state == 'page') {
        this.page = val
        this.datas = datas
      } else if (state == 'data') {
        this.chapterData = val
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.el-select .el-input__inner:nth-child(1) {
  color: #fff;
  //  background: #199FFF;
  width: 110px;
}
.home {
  display: flex;
  background: #ffffff;
  // margin: 23px 0px 0px 23px;
  // padding: 23px 0px 23px 23px;
  padding: 30px;
  font-size: 14px;
}
.left-container {
  width: 287px;
  height: 100%;
  min-height: 500px;
  border: 1px solid rgba(215, 215, 215, 1);
  .activeColor {
    background-color: #f6fbff;
    color: #298adb;
  }
  li {
    list-style: none;
    height: 48px;
    border-bottom: 1px solid rgba(215, 215, 215, 1);
    line-height: 48px;
    padding-left: 20px;
    color: #7f7f7f;
    .el-icon-delete {
      font-size: 16px;
      float: right;
      line-height: 48px;
      padding-right: 20px;
      cursor: pointer;
    }
    .el-icon-edit {
      font-size: 16px;
      float: right;
      line-height: 48px;
      padding-right: 10px;
      cursor: pointer;
    }
  }
}
.el-icon-circle-plus-outline {
  font-size: 20px;
  float: right;
  line-height: 48px;
  color: #199fff;
  padding-right: 20px;
  cursor: pointer;
}
.right-container {
  margin-left: 23px;
  width: 100%;
  margin-right: 35px;
}
header {
  width: 100%;
  display: flex;
  flex-direction: column;
  .left-zoom {
    display: flex;
    justify-content: space-between;
  }
}
.table_bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
