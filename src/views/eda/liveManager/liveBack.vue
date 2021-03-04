<template>
  <section class="mainwrap">
    <div class="client_head">
      <search
        :hideTime="true"
        :hideOtherOption="true"
        :selectItems="false"
        api="livelist"
        placeholder="课程分类"
        @getTable="getTable"
      ></search>
      <el-button type="primary" @click="addVideo">添加视频</el-button>
    </div>
    <!--表格-->
    <div class="userTable">
      <el-table
        ref="multipleTable"
        :data="videoData.data"
        style="width: 100%"
        class="min_table"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="60"
          align="center"
        ></el-table-column>
        <el-table-column label="序号" max-width="50">
          <template slot-scope="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column
          prop="live_video_name"
          label="视频名称"
          min-width="170"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column
          label="视频缩略图"
          min-width="150"
          show-overflow-tooltip
          align="center"
        >
          <template slot-scope="scope">
            <div style="width:50px ;height:50px;">
              <img :src="scope.cover_url" alt class="school_class_box" />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="media_duration"
          label="时长"
          min-width="170"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          min-width="100"
          align="center"
        >
          <template slot-scope="scope">
            <div style="display:flex;justify-content:space-around">
              <el-button type="text" @click="editor(scope.$index, scope.row)"
                >编辑</el-button
              >
              <el-button type="text" @click="delbtn(scope.$index, scope.row)"
                >删除</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="添加课时" :visible.sync="dialogUpload" width="30%">
      <el-form :model="editcreateVideo" ref="reasonForm" label-width="150px">
        <el-form-item label="视频名称:">
          <el-input
            v-model="editcreateVideo.live_video_name"
            class="input-width"
            placeholder="视频名称"
          ></el-input>
          <!-- <input value="复制" class="input-width"></el-input> -->
        </el-form-item>
        <el-form-item label="视频简介:">
          <el-input
            v-model="editcreateVideo.live_video_des"
            class="input-width"
            type="textarea"
            placeholder="视频简介"
          ></el-input>
        </el-form-item>
        <el-form-item label="视频上传：">
          <videoUpload
            ref="mychild"
            :videoName="editcreateVideo.media_name"
            back="back"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogUpload = false">取 消</el-button>
        <el-button type="primary" @click="addHandleConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑视频" :visible.sync="editorDialogVisible" width="30%">
      <el-form :model="editcreateVideo" ref="reasonForm" label-width="150px">
        <el-form-item label="视频名称:">
          <el-input
            v-model="editcreateVideo.live_video_name"
            class="input-width"
            placeholder="视频名称"
          ></el-input>
          <!-- <input value="复制" class="input-width"></el-input> -->
        </el-form-item>
        <el-form-item label="视频简介:">
          <el-input
            v-model="editcreateVideo.live_video_des"
            class="input-width"
            type="textarea"
            placeholder="视频简介"
          ></el-input>
        </el-form-item>
        <el-form-item label="视频上传：">
          <videoUpload
            ref="mychild"
            :videoName="editcreateVideo.media_name"
            editor="ediotr"
            api="editlivevideoUpload"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editorDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editorHandleConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <div class="table_bottom">
      <div class="table_bottom">
        <page
          :data="videoData.total"
          :curpage="page"
          @pageChange="doPageChange"
        />
      </div>
    </div>
    <el-button type="warning" @click="multiDel" style="margin-top:20px"
      >批量删除</el-button
    >
  </section>
</template>
<script>
const defaultcreateVideo = {
  name: null,
  sort: 0,
  class: 'haha',
}
const editcreateVideo = {}
export default {
  data() {
    return {
      ruleForm: {
        video_chapter_id: '',
      },
      datas: {},
      video_chapter_id: '',
      video_class_sort: '',
      multipleSelection: [],
      videoData: [],
      page: 1,
      dialogUpload: false,
      createVideo: Object.assign({}, defaultcreateVideo),
      videoId: null,
      editorDialogVisible: false,
      editcreateVideo: Object.assign({}, editcreateVideo),
    }
  },
  created() {
    this.$api.livevideolist(this, 'videoData')
  },
  methods: {
    addHandleConfirm() {
      console.log('hahahah')
      this.$refs.mychild.submitUpload('哈哈哈')
    },
    editorHandleConfirm() {
      this.$refs.mychild.submitUpload('嘿嘿嘿')
    },
    // 获取数据
    getTable(state, val, datas) {
      console.log(state, val)
      if (state == 'page') {
        this.page = val
        this.datas = datas
      } else if (state == 'data') {
        this.videoData = val
      }
    },
    GoDetail() {
      this.$router.push({
        name: 'liveDetail',
      })
    },
    doPageChange(page) {
      this.page = page
      this.$api.livevideolist(this, 'videoData', this.datas)
    },
    addVideo() {
      this.editcreateVideo = {}
      this.dialogUpload = true
    },
    editor(index, row) {
      this.$api.editlivevideo(this, row.live_video_id)
      this.editorDialogVisible = true
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
    delbtn(index, row) {
      this.$confirm('确定要删除当前分类吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$api.deletelivevideo(this, row.live_video_id)
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!',
          // })
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
      } else {
        this.$confirm('确定要删除当前分类吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            this.$api.multiDeletelivevideo(this, this.multipleSelection)
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除',
            })
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
