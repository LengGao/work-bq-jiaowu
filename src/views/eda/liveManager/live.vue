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
      <!-- <el-button type="primary" @click="addVideo">添加课程</el-button> -->

      <el-button @click="openVideo" style="margin-left:15px;"
        >公开课直播</el-button
      >
      <el-button @click="classVideo">班级直播</el-button>
      <el-button @click="liveMan">直播场次</el-button>
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
          prop="live_class_name"
          label="班级"
          min-width="150"
          show-overflow-tooltip
          align="left"
        ></el-table-column>
        <el-table-column
          prop="start_push_time"
          label="开播时间"
          min-width="80"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column
          prop="end_push_time"
          label="结束时间"
          fixed="right"
          min-width="80"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="live_type"
          label="直播类型"
          fixed="right"
          min-width="60"
          align="center"
        ></el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          min-width="150"
          align="center"
        >
          <template slot-scope="scope">
            <div style="display:flex;justify-content:space-around">
              <el-button type="text" v-if="scope.row.live_status == 0"
                >未直播</el-button
              >
              <el-button type="text" v-if="scope.row.live_status == 1"
                ><span style="color: red"> 直播中</span></el-button
              >
              <el-button
                type="text"
                v-if="scope.row.live_status == 0"
                @click="editor(scope.$index, scope.row)"
                >开始直播</el-button
              >
              <el-button
                type="text"
                @click="delbtn(scope.$index, scope.row)"
                v-if="scope.row.live_status == 1"
                >关闭直播</el-button
              >
              <el-button type="text" @click="editor2(scope.$index, scope.row)"
                >直播场次</el-button
              >
              <el-button type="text" @click="modify(scope.$index, scope.row)"
                >修改</el-button
              >
              <el-button type="text" @click="liveBack(scope.$index, scope.row)"
                >删除</el-button
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
      ],
      page: 1,
      dialogVisible: false,
      createVideo: Object.assign({}, defaultcreateVideo),
      videoId: null,
    }
  },
  created() {
    this.$api.livelist(this, 'courseData')
  },
  methods: {
    handleConfirm() {},
    // 获取数据
    getTable(state, val, datas) {
      console.log(state, val, datas)
      if (state == 'page') {
        this.page = val
        this.datas = datas
      } else if (state == 'data') {
        this.courseData = val
      }
    },
    doPageChange(page) {
      this.page = page
      this.$api.livelist(this, 'courseData', this.datas)
    },
    editor(index, row) {
      this.createVideo = {
        name: '',
        sort: 0,
        class: '',
        url: '',
      }
      this.$confirm('确定要创建直播吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          console.log('创建直播', row)
          this.dialogVisible = true
          this.$api.openlive(this, row, 'createVideo')
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    editor2(index, row) {
      console.log(row)
      this.$router.push({
        path: '/eda/liveMan',
        query: { live_class_id: row.live_class_id },
      })
    },
    modify(index, data) {
      console.log('执行', index, data)

      this.$router.push({
        path: '/eda/openclassVideo',
        query: {
          live_class_id: data.live_class_id,
        },
      })
    },
    classVideo() {
      this.$router.push({
        path: '/eda/live',
        query: { biaoshi: 2 },
      })
    },
    openVideo() {
      this.$router.push({
        path: '/eda/live',
        query: { biaoshi: 1 },
      })
    },
    liveMan() {
      this.$router.push({
        path: '/eda/liveMan',
        // query: { biaoshi: 1},
      })
    },

    delbtn(index, data) {
      console.log(data)
      let that = this
      this.$confirm('确定要关闭当前直播吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          console.log(data)
          that.$api.closeLive(this, data.live_class_id)
          // window.reload();
        })
        .catch(() => {})
    },
    liveBack(index, row) {
      console.log(row)
      this.$router.push({
        path: '/eda/liveBack',
        query: {
          live_id: row.live_id,
          class_id: row.live_class_id,
          course_id: row.course_id,
        },
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
  align-items: center;
}
.userTable {
  margin-top: 20px;
}
</style>
