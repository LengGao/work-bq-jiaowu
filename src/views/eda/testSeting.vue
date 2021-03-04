<template>
  <section class="mainwrap">
    <div class="client_head">
      <search2
        :courseTypeShow="true"
        :contentShow="true"
        placeholder="课程分类"
        api="getExamConfigList"
        inputText="课程名称"
        @getTable="getTableList"
        :selectList="selectList.list"
      ></search2>
      <!-- <search
        :hideTime="true"
        :hideOtherOption="true"
        :selectItems="true"
        placeholder="课程分类"
        :selectList="selectList.list"
        @getTable="getTableList"
        api="getExamConfigList"
      ></search> -->
      <el-button type="primary" @click="addVideo">添加考试</el-button>
    </div>
    <!--表格-->
    <div class="userTable">
      <el-table
        ref="multipleTable"
        :data="schoolData.list"
        style="width: 100%"
        class="min_table"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="30"
          align="center"
        ></el-table-column>
        <el-table-column
          label="题库编号"
          show-overflow-tooltip
          min-width="30"
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
          prop="category_name"
          label="课程分类"
          min-width="100"
          show-overflow-tooltip
          align="left"
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
              <el-button type="text" @click="yearTest(scope.row)"
                >历年真题</el-button
              >
              <el-button type="text" @click="virtualTestSeting(scope.row)"
                >模拟考试</el-button
              >
              <el-button type="text" @click="freedomTest(scope.row)"
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
          :data="schoolData.total"
          :curpage="page"
          @pageChange="doPageChange"
        />
      </div>
    </div>
    <!-- <el-button type="warning" @click="multiDel" style="margin-top:20px">批量删除</el-button> -->
    <el-dialog title="创建题库" :visible.sync="dialogVisible" width="30%">
      <el-form :model="createVideo" ref="reasonForm" label-width="150px">
        <el-form-item label="题库名称：">
          <el-input v-model="createVideo.name" class="input-width"></el-input>
        </el-form-item>
        <el-form-item label="课程分类: ">
          <!-- <el-input v-model="createVideo.class" class="input-width"></el-input> -->
          <el-select v-model="createVideo.class" filterable>
            <el-option
              :label="item.name"
              :value="item.val"
              v-for="(item, index) in selectList"
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
  </section>
</template>

<script>
const defaultcreateVideo = {
  name: null,
  sort: 0,
  class: 1,
}
export default {
  name: 'testSeting',
  data() {
    return {
      datas: {},
      multipleSelection: [],
      page: 1,
      ruleForm: {},
      schoolData: [],
      selectList: [],
      dialogVisible: false,
      createVideo: Object.assign({}, defaultcreateVideo),
      videoId: null,
      ruleForm: { course_category_id: '' },
    }
  },
  created() {
    this.$api.getExamConfigList(this, 'schoolData')
    this.$api.getCategoryList(this, 'selectList')
  },
  mounted() {},
  methods: {
    getTableList(state, val, datas) {
      if (state == 'page') {
        this.page = val
        this.datas = datas
      } else if (state == 'data') {
        this.schoolData = val
      }
    },
    doPageChange(page) {
      if (this.datas) {
        this.ruleForm.course_category_id = this.datas.id
      }
      this.page = page
      this.$api.getProblemCourseList(this, 'questionBank', this.datas)
    },
    addVideo() {
      this.$router.push({ path: '/eda/editor' })
    },
    virtualTestSeting(data) {
      this.$router.push({
        path: '/eda/virtualTestSeting',
        query: { exam_config_id: data.exam_config_id, exam_type: 2 },
      })
    },
    yearTest(data) {
      this.$router.push({
        path: '/eda/yearTestSeting',
        query: { exam_config_id: data.exam_config_id, exam_type: 1 },
      })
    },
    freedomTest(data) {
      this.$router.push({
        path: '/eda/yearTestSeting',
        query: { exam_config_id: data.exam_config_id, exam_type: 3 },
      })
    },

    //跳转自主出题试卷
    // freedomTest(data) {
    //   this.$router.push({
    //     path: '/eda/freedomTestPage',
    //     query: { exam_config_id: data.exam_config_id, exam_type: 3 },
    //   })
    // },
    editor(index, row) {
      this.$router.push({
        path: '/eda/editor',
        query: { id: row.exam_config_id },
      })
    },
    handleConfirm() {
      this.dialogVisible = false
      if (this.videoId == null) {
        //添加操作
        this.$message({
          message: '添加成功！',
          type: 'success',
          duration: 1000,
        })
      } else {
        //编辑操作
        this.$message({
          message: '编辑成功！',
          type: 'success',
          duration: 1000,
        })
      }
    },
    chapterVideo() {},
    delbtn(data) {
      console.log(data)
      this.$confirm('确定要删除当前分类吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$api.deleteExamConfig(this, data.exam_config_id)
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
  //   mounted() {}
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
</style>
