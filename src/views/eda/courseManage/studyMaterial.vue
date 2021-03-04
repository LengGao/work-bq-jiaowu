<template>
  <section class="main">
    <div class="study_head">
      <search2
        api="getPracticeList"
        :contentShow="true"
        @getTable="getTableList"
        inputText="资料名称"
      ></search2>
      <el-button type="primary" @click="addMaterial">添加资料</el-button>
    </div>
    <!--表格-->
    <div class="userTable">
      <el-table
        ref="multipleTable"
        :data="schoolData"
        tooltip-effect="light"
        stripe
        style="width: 100%"
        class="min_table"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <!-- <el-table-column type="selection" width="30"></el-table-column> -->
        <el-table-column
          prop="course_file_id"
          label="资料编号"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="file_name"
          label="资料名称"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="suffix"
          label="文件格式"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="size"
          label="文件大小"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
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
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button type="text" @click="delbtn(scope.row)">删除</el-button>
          </template>
        </el-table-column>
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
      :title="dialogTitle"
      :visible.sync="dialogUpload"
      width="576px"
      :before-close="handleClose"
    >
      <el-form label-width="100px">
        <el-form-item label="资料名称：">
          <el-input
            placeholder="请输入资料名称"
            v-model="ruleForm.file_name"
            class="input-width"
          ></el-input>
        </el-form-item>

        <el-form-item label="上传资料：" style>
          <FileUpload
            ref="mychild"
            :ruleForm="ruleForm"
            :course_id="course_id"
            @fileSuccess="fileSuccess"
            :recordEdit="recordEdit"
            :icon="icon"
          />
        </el-form-item>
        <el-form-item label="已上传：" style v-show="submit">
          <el-button
            round
            style=" margin-bottom: 20px;"
            @click="handclick"
            v-show="buttonON"
            >{{
              synthesize.indexOf(ruleForm.suffix) != -1 ? '查看' : '下载查看'
            }}</el-button
          >
          <!-- 上传文件名 -->
          <el-table
            v-show="inputUp"
            :data="tableData"
            style="width: 100%"
            :show-header="false"
          >
            <el-table-column v-show="isShow" prop="date" label="" width="150">
              <template>
                <img
                  v-if="picture.indexOf(ruleForm.suffix) != -1"
                  :src="ruleForm.oss_url"
                  alt=""
                  style="width: 150px;height: 150px"
                />
                <video
                  v-else-if="video.indexOf(ruleForm.suffix) != -1"
                  :src="ruleForm.oss_url"
                  controls="controls"
                  style="width: 150px;height: 150px"
                >
                  您的浏览器暂不支持此功能
                </video>
                <audio
                  v-else-if="frequency.indexOf(ruleForm.suffix) != -1"
                  :src="ruleForm.oss_url"
                  controls="controls"
                >
                  您的浏览器暂不支持此功能
                </audio>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="资料排序：">
          <el-input
            v-model="ruleForm.sort"
            class="input-width"
            type="number"
          ></el-input>
          <p style="color:#aaa;ling-height:20px">
            排序数字越大分类越靠前,最小值为1
          </p>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogUpload = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
import Vue from 'vue'
import { getToken } from '@/utils/auth'
export default {
  name: 'practice',
  data() {
    return {
      recordEdit: '',
      limitNumber: 1,
      page: 1,
      course_id: 0,
      file_id: '',
      dialogTitle: '',
      dialogUpload: false,
      isShow: false,
      inputUp: false,
      buttonON: false,
      submit: false,
      schoolData: [],
      tableData: [{}],
      ruleForm: {
        file_name: '',
        sort: '',
        course_id: '',
        oss_name: '',
        oss_url: '',
        suffix: '',
        course_file_id: '',
        file: '',
      },
      picture: ['png', 'jpg', 'jpeg', 'bmp', 'gif'],
      video: ['mp4', 'm2v', 'mkv'],
      frequency: ['mp3', 'wav', 'wmv'],
      synthesize: [
        'png',
        'jpg',
        'jpeg',
        'bmp',
        'gif',
        'mp4',
        'm2v',
        'mkv',
        'mp3',
        'wav',
        'wmv',
      ],
      icon: '',
    }
  },
  created() {
    this.course_id = this.$route.query.course_id
    this.$api.getFileList(this, 'schoolData')
  },
  mounted() {},
  methods: {
    scopes(ab, sorts) {
      console.log(ab.course_file_id)
      var obj = {}
      var key = ab.course_file_id + ''
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
        this.$api.courseFileSort(obj, this)
      }
    },
    //上传文件
    handclick() {
      if (this.synthesize.indexOf(this.ruleForm.suffix) != -1) {
        this.inputUp = !this.inputUp
      } else {
        this.inputUp = false
        window.location.href = this.ruleForm.oss_url
      }
    },
    delbtn(zx) {
      console.log(zx)
      this.$confirm('确定要删除当前资料吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$api.deleteFile(this, zx.course_file_id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    fileSuccess(res, file) {
      this.dialogUpload = false
      if (!res) {
        console.log(this.icon, 2222)
        this.ruleForm.file = this.icon
        this.$api.alterFileList(this)
      }
      this.$api.getFileList(this, 'schoolData')
    },
    handleConfirm() {
      this.inputUp = false
      this.$refs.mychild.submitUpload('嘿嘿嘿')
      this.$api.getFileList(this, 'schoolData')
    },
    fileChange(e) {
      this.ruleForm.file = e.target.files[0]
      console.log(this.file)
    },
    addMaterial() {
      this.recordEdit = 1
      this.dialogTitle = '添加资料'
      for (let key in this.ruleForm) {
        this.ruleForm[key] = ''
      }
      this.icon = ''
      this.dialogUpload = true
      this.$api.getFileList(this, 'schoolData')
      this.isShow = false
      this.buttonON = false
      this.inputUp = false
      this.submit = false
    },
    doPageChange(page) {
      this.page = page
      this.$api.getFileList(this, 'schoolData')
    },
    getTableList(state, val) {
      console.log(state, val)
      if (state == 'page') {
        this.page = val
      } else if (state == 'data') {
        this.schoolData = val
      }
    },
    handleEdit(zx) {
      console.log(zx)
      this.recordEdit = 2
      this.dialogUpload = true
      this.file_id = zx.course_file_id
      this.$api.flieInfo(this, this.file_id)
      this.isShow = true
      this.buttonON = true
      this.submit = true
      // this.$router.push({
      //   path: '/sts/practitioner',
      //   query: {
      //     problem_chapter_id: zx.problem_chapter_id,
      //   },
      // })
    },
    handleClose(done) {
      this.inputUp = false
      done()
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
// .file_input {
//   visibility: hidden;
//   position: absolute;
//   left: 0;
//   top: 0;
//   z-index: -1;
// }
.main {
  padding: 20px;
  margin: 20px;
  background: #fff;
}

.userTable {
  margin-top: 20px;
}
.study_head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
