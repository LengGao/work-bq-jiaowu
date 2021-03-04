<template>
  <section class="main">
    <div class="client_head">
      <search :hideTime="true" :hideOtherOption="true" :selectItems="false" api="videocollectionlist" :selectList="selectData.list" placeholder="课程分类" @getTable="getTable"></search>
    </div>
    <!--表格-->
    <div class="userTable">
      <el-table ref="multipleTable" :data="dataList.data" style="width: 100%" class="min_table" @selection-change="handleSelectionChange">
        <el-table-column prop="index" label="排序" show-overflow-tooltip min-width="90" align="center">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="video_collection_id" label="学员名称" show-overflow-tooltip min-width="70" align="center"></el-table-column>
        <el-table-column prop="video_collection_name" label="手机号码" min-width="210" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="video_collection_number" label="学习时长" min-width="70" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="video_collection_number" label="学习进度" min-width="70" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="video_collection_number" label="做题总数" min-width="70" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="video_collection_number" label="做题进度" min-width="70" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="video_collection_number" label="直播到课率" min-width="70" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column label="操作" fixed="right" min-width="130" align="center">
          <template slot-scope="scope">
            <div style="display:flex;justify-content:space-around">
              <el-button type="text" @click="editor(scope.$index, scope.row)">学员详情</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="创建视频集" :visible.sync="dialogVisible" width="30%">
      <el-form :model="createVideo" ref="reasonForm" label-width="150px">
        <el-form-item label="视频集名称：">
          <el-input v-model="createVideo.name" class="input-width"></el-input>
        </el-form-item>
        <el-form-item label="课程分类:">
          <!-- <el-input v-model="createVideo.class" class="input-width"></el-input> -->
          <el-select filterable v-model="createVideo.class" placeholder="选择课程分类" clearable>
            <el-option :label="item.category_name" :value="item.category_id" v-for="(item, index) in selectData.list" :key="index"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="编辑视频集" :visible.sync="editdialogVisible" width="30%">
      <el-form :model="etor" ref="reasonForm" label-width="150px">
        <el-form-item label="视频集名称：">
          <el-input v-model="etor.video_collection_name" class="input-width"></el-input>
        </el-form-item>
        <el-form-item label="课程分类:">
          <!-- <el-input v-model="createVideo.class" class="input-width"></el-input> -->
          <el-select v-model="etor.course_category_id" filterable placeholder="选择课程分类" clearable>
            <el-option :label="item.category_name" :value="item.category_id" v-for="(item, index) in selectData.list" :key="index"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editorhandleConfirm">确 定</el-button>
      </span>
    </el-dialog>

    <div class="table_bottom">
      <div class="table_bottom">
        <page :data="dataList.total" :curpage="page" @pageChange="doPageChange" />
      </div>
    </div>
    <!-- <el-button type="warning" @click="multiDel" style="margin-top:20px">批量删除</el-button> -->
  </section>
</template>

<script>
const defaultcreateVideo = {
  name: null,
  sort: 0,
  class: '',
}

export default {
  data() {
    return {
      multipleSelection: [],
      dataList: [],
      selectData: {
        list: {
          category_id: '',
        },
      },
      page: 1,
      dialogVisible: false,
      createVideo: Object.assign({}, defaultcreateVideo),
      videoId: null,
      editVideo: [],
      editdialogVisible: false,
      etor: Object.assign(
        {},
        {
          video_collection_name: '',
          course_category_id: '',
          video_collection_id: '',
          is_fast: '',
        }
      ),
    }
  },
  mounted() {
    this.$api.videocollectionlist(this, 'dataList')
    this.$api.getCategoryList(this, 'selectData')
  },
  methods: {
    switchStatus(data, scop) {
      console.log(scop)
      this.editVideo.length = 0
      this.editVideo = scop.row
      this.$api.editvideocollection(this, 'editVideo')
    },
    // 获取数据
    getTable(state, val) {
      console.log(state, val)
      if (state == 'page') {
        this.page = val
      } else if (state == 'data') {
        this.dataList = val
      }
    },
    doPageChange(page) {
       this.page = page
       this.$api.videocollectionlist(this, 'dataList')
    },
    addVideo() {
      this.dialogVisible = true
      this.createVideo = {
        name: null,
        sort: 0,
        class: '',
      }
    },
    editor(index, row) {
      this.$router.push({
        path: '/org/studentThirdDetail',
        query: 'da',
      })
    },
    editorhandleConfirm() {
      let that = this
      that.$api.editvideocollection(this, 'etor')
    },
    handleConfirm() {
      // this.dialogVisible = false;
      let that = this
      if (this.videoId == null) {
        //添加操作
        // this.$message({
        //   message: "添加成功！",
        //   type: "success",
        //   duration: 1000,
        // });
        that.$api.addvideocollection(this, 'createVideo')
      } else {
        //编辑操作
        this.$message({
          message: '编辑成功！',
          type: 'success',
          duration: 1000,
        })
      }
    },
    chapterVideo(index, row) {
      this.$router.push({
        path: '/eda/videoUpload',
        query: { video_collection_id: row.video_collection_id },
      })
    },
    delbtn(index, data) {
      console.log(data)
      let that = this
      this.$confirm('确定要删除当前分类吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          that.$api.deletevideocollection(that, data.video_collection_id)
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
