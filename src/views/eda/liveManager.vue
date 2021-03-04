<template>
  <section class="mainwrap">
     <div class="client_head">
      <search
        :hideTime="true"
        :hideOtherOption="true"
        :selectItems="false"
        api="livecourselist"
        placeholder="课程分类"
        @getTable="getTable"
      ></search>

       <el-button @click="openVideo" style="margin-left:15px;">公开课直播</el-button>
       <el-button  @click="classVideo">班级直播</el-button>
       <el-button  @click="liveMan">直播场次</el-button>
    </div>
    <!--表格-->
    <div class="userTable">
      <el-table
        ref="multipleTable"
        :data="courseData.data"
        style="width: 100%"
        class="min_table"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="30"
          align="center"
        ></el-table-column>
        <el-table-column label="序号" max-width="30">
          <template slot-scope="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column
          prop="course_name"
          label="课程名称"
          min-width="210"
          show-overflow-tooltip
          align="left"
        ></el-table-column>
        <el-table-column
          prop="category_name"
          label="课程分类"
          min-width="150"
          show-overflow-tooltip
          align="left"
        ></el-table-column>
        <el-table-column
          prop="live_number"
          label="当前直播个数"
          min-width="70"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column
          label="直播场次"
          fixed="right"
          min-width="100"
          align="center"
        >
          <template slot-scope="scope">
            <div style="display:flex;justify-content:space-around">
              <el-button
                type="text"
                @click="editor(scope.$index, scope.row, '2')"
                >班级直播</el-button
              >
              <el-button
                type="text"
                @click="editor(scope.$index, scope.row, '1')"
                >公开课直播</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="添加课程" :visible.sync="dialogVisible" width="30%">
      <el-form :model="createVideo" ref="reasonForm" label-width="150px">
        <el-form-item label="课程名称:">
          <el-input v-model="createVideo.name" class="input-width"></el-input>
        </el-form-item>
        <el-form-item label="课程分类:">
          <el-input v-model="createVideo.class" class="input-width"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <div class="table_bottom">
      <div class="table_bottom">
        <page
          :data="courseData.total"
          :curpage="page"
          @pageChange="doPageChange"
        />
      </div>
    </div>
  </section>
</template>

<script>
const defaultcreateVideo = {
  name: null,
  sort: 0,
  class: 'haha',
}
export default {
  data() {
    return {
      multipleSelection: [],
      datas: {},
      courseData: [
        {
          index: '1',
          nickname: '明天会更好',
          describe: '世界上没有完全相同的两个人，生活的再平凡，也是限量版。',
          order: '0',
          number: '10',
          status: 0,
        },
        {
          index: '2',
          nickname: '过好每一天',
          describe: '世界上没有完全相同的两个人，生活的再平凡，也是限量版。',
          order: '1',
          number: '10',
          status: 1,
        },
      ],
      page: 1,
      dialogVisible: false,
      createVideo: Object.assign({}, defaultcreateVideo),
      videoId: null,
    }
  },
  created() {
    this.$api.livecourselist(this, 'courseData')
  },
  methods: {
    // 获取数据
    getTable(state, val, datas) {
      console.log(state, val)
      if (state == 'page') {
        this.page = val
        this.datas = datas
      } else if (state == 'data') {
        this.courseData = val
      }
    },
    doPageChange(page) {
      this.page = page
      this.$api.livecourselist(this, 'courseData', this.datas)
    },
    addVideo() {
      this.dialogVisible = true
    },
    classVideo(){
      this.$router.push({
        path: '/eda/live',
        query: { biaoshi: 2},
      })
    },
    openVideo(){
      this.$router.push({
        path: '/eda/live',
        query: { biaoshi: 1},
      })
    },
    liveMan(){
      this.$router.push({
        path: '/eda/liveMan',
        // query: { biaoshi: 1},
      })
    },
    editor(index, row, biaoshi) {
      this.$router.push({
        path: '/eda/liveMiddle',
        query: { course_id: row.course_id, biaoshi: biaoshi },
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
    delbtn() {
      this.$confirm('确定要删除当前分类吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!',
          })
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
  padding: 20px 20px;
}
.client_head {
  display: flex;
  //justify-content: space-between;
  align-items: center;
}
.userTable {
  margin-top: 20px;
}

</style>
