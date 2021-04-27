<template>
  <div class="home">
    <header>
      <ul>
        <li
          v-for="(item, index) of topfun"
          :key="index"
          :class="{ active: index == current }"
          @click="doActive(index)"
        >
          {{ item.name }}
        </li>
      </ul>
    </header>
    <section class="main" v-show="current == 0">
      <div class="client_head">
        <search
          :hideTime="true"
          :hideOtherOption="true"
          api="courseScore"
          @getTable="getTableList"
        ></search>
      </div>
      <!--表格-->
      <div class="userTable">
        <el-table
          ref="multipleTable"
          border
          :data="commentData.list"
          style="width: 100%"
          class="min_table"
          @selection-change="handleSelectionChange"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column
            type="selection"
            width="60"
            align="center"
          ></el-table-column>
          <el-table-column
            label="头像"
            min-width="140"
            show-overflow-tooltip
            style="display:flex;justify-content:center"
          >
            <template slot-scope="scope">
              <div>
                <img
                  :src="scope.row.user_img"
                  alt
                  class="school_class_box"
                  style="border-radius:50%;width:50px ;height:50px;"
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="user_realname"
            label="姓名"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="telphone"
            label="手机号码"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="course_name"
            label="所属课程"
            min-width="150"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="star"
            label="课程评分"
            min-width="50"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="content"
            label="评价内容"
            min-width="150"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="add_time"
            label="发表时间"
            min-width="150"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="describe"
            label="状态"
            min-width="100"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span v-show="scope.row.status == 0" style="color:#F56C6C">
                待审核
              </span>
              <span v-show="scope.row.status == 1" style="color:#67C23A">
                已发布
              </span>
              <span v-show="scope.row.status == 2" style="color:#E6A23C">
                已置顶
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" min-width="200">
            <template slot-scope="scope">
              <div style="display:flex;justify-content:center">
                <el-button
                  type="text"
                  @click="publish(scope.row)"
                  v-if="scope.row.status == 0"
                  style="text-align:center;padding-right:40px"
                  >发布</el-button
                >
                <el-button
                  type="text"
                  @click="delbtn(scope.row)"
                  style="text-align:center;"
                  >删除</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="table_bottom">
          <div style="margin-bottom:20px">
            <el-button type="danger" @click="multiDelete">批量删除</el-button>
            <el-button type="success" @click="multiPublish">批量发布</el-button>
          </div>
          <pageConfig
            :data="commentData.total"
            :curpage="page"
            api="courseScore"
            dataName="commentData"
            @pageChange="doPageChange"
          />
        </div>
      </div>
      <el-dialog
        title="添加课程分类"
        :visible.sync="dialogVisible"
        width="30%"
        :close-on-click-modal="false"
      >
        <el-form label-width="100px">
          <el-form-item label="分类名称：">
            <el-input
              v-model="addClassify.category_name"
              class="input-width"
            ></el-input>
          </el-form-item>
          <el-form-item label="分类描述：">
            <el-input
              v-model="addClassify.describe"
              class="input-width"
            ></el-input>
          </el-form-item>
          <el-form-item label="分类图标：" style>
            <p v-show="!haschoose">
              <i
                class="el-icon-folder-opened"
                @click="addIcon"
                style="float:left;line-height:56px"
              ></i>
              <span style="display:block;height:50px;line-height:30px">
                1. 支持jpeg、png、bmp等格式;
                <br />2、推荐尺寸64*64px或者1:1
              </span>
            </p>
            <div v-show="haschoose" style="width:80px;height:80px">
              <img :src="url" alt />
            </div>
          </el-form-item>
          <el-form-item label="分类图排序：">
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
    </section>
    <section class="main" v-show="current == 1">
      <div class="client_head">
        <search
          :hideTime="true"
          :hideOtherOption="true"
          api="optionBack"
          :selectItems="false"
          placeholder="请选择类型"
          :selectList="inter.newselect"
          @getTable="getTableList"
          @selection-change="handleSelectionChange"
        ></search>
      </div>
      <!--表格-->
      <div class="userTable">
        <el-table
          ref="commentMultipleTable"
          :data="noteList.list"
          style="width: 100%"
          class="min_table"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
          @selection-change="handleSelectionChangefornote"
        >
          <el-table-column
            type="selection"
            width="60"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="user_realname"
            label="姓名"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="course_name"
            label="课程名称"
            min-width="150"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="笔记内容"
            min-width="150"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div>
                <span v-html="scope.row.content"></span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="发表时间"
            min-width="150"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="状态" show-overflow-tooltip min-width="90">
            <template slot-scope="scope">
              <div>
                <span>{{ noteList.statusArr[scope.row.status] }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" min-width="200">
            <template slot-scope="scope">
              <div style="display:flex;justify-content:center">
                <!-- <el-button  type="text"  @click="submit(scope.row.note_id)" v-if='scope.row.status == 1'>置顶</el-button> -->
                <el-button
                  type="text"
                  @click="submit(scope.row.note_id)"
                  v-if="scope.row.status != 1"
                  >发布</el-button
                >
                <el-button type="text" @click="dropout(scope.row.note_id)"
                  >删除</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="table_bottom">
          <div>
            <el-button type="warning" @click="multiPublishNote"
              >批量发布</el-button
            >
            <el-button type="danger" @click="multiDelNote">批量删除</el-button>
          </div>
          <page
            :data="noteList.total"
            :curpage="page"
            @pageChange="doPageChangeFornote"
          />
        </div>
      </div>
      <el-dialog
        title="添加课程分类"
        :visible.sync="dialogVisible"
        width="30%"
        :close-on-click-modal="false"
      >
        <el-form label-width="100px">
          <el-form-item label="分类名称：">
            <el-input
              v-model="addClassify.category_name"
              class="input-width"
            ></el-input>
          </el-form-item>
          <el-form-item label="分类描述：">
            <el-input
              v-model="addClassify.describe"
              class="input-width"
            ></el-input>
          </el-form-item>
          <el-form-item label="分类图标：" style>
            <p v-show="!haschoose">
              <i
                class="el-icon-folder-opened"
                @click="addIcon"
                style="float:left;line-height:56px"
              ></i>
              <span style="display:block;height:50px;line-height:30px">
                1. 支持jpeg、png、bmp等格式;
                <br />2、推荐尺寸64*64px或者1:1
              </span>
            </p>
            <div v-show="haschoose" style="width:80px;height:80px">
              <img :src="url" alt />
            </div>
          </el-form-item>
          <el-form-item label="分类图排序：">
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
    </section>
    <section class="main" v-show="current == 2">
      <div class="client_head">
        <search
          :hideTime="true"
          :hideOtherOption="true"
          api="optionBack"
          :selectItems="true"
          placeholder="请选择类型"
          :selectList="inter.newselect"
          @getTable="getTableList"
        ></search>
      </div>
      <!--表格-->
      <div class="userTable">
        <el-table
          ref="commentMultipleTable"
          :data="inter.list"
          style="width: 100%"
          class="min_table"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column
            prop="user_realname"
            label="姓名"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="telphone"
            label="手机号码"
            min-width="150"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="反馈类型"
            min-width="150"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div>
                <span>{{ inter.groupArr[scope.row.group_id] }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="反馈内容"
            min-width="150"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div>
                <p v-html="scope.row.content"></p>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="反馈截图"
            show-overflow-tooltip
            min-width="90"
          >
            <template slot-scope="scope">
              <div>
                <img
                  :src="item"
                  alt=""
                  srcset=""
                  v-for="(item, index) of scope.row.extend"
                  :key="index"
                  style="width:30px;margin-right:8px"
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="发表时间"
            show-overflow-tooltip
            min-width="90"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.create_time }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" min-width="200">
            <template slot-scope="scope">
              <div style="display:flex;justify-content:center">
                <el-radio-group
                  v-model="scope.row.is_lock"
                  @change="
                    (val) => {
                      changelabel(val, scope.row.conversation_id)
                    }
                  "
                >
                  <el-radio :label="0">未解决</el-radio>
                  <el-radio :label="1">已解决</el-radio>
                </el-radio-group>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="table_bottom">
          <div class="table_bottom">
            <page
              :data="inter.total"
              :curpage="page"
              @pageChange="doPageChange"
            />
          </div>
        </div>
      </div>
      <el-dialog
        title="添加课程分类"
        :visible.sync="dialogVisible"
        width="30%"
        :close-on-click-modal="false"
      >
        <el-form label-width="100px">
          <el-form-item label="分类名称：">
            <el-input
              v-model="addClassify.category_name"
              class="input-width"
            ></el-input>
          </el-form-item>
          <el-form-item label="分类描述：">
            <el-input
              v-model="addClassify.describe"
              class="input-width"
            ></el-input>
          </el-form-item>
          <el-form-item label="分类图标：" style>
            <p v-show="!haschoose">
              <i
                class="el-icon-folder-opened"
                @click="addIcon"
                style="float:left;line-height:56px"
              ></i>
              <span style="display:block;height:50px;line-height:30px">
                1. 支持jpeg、png、bmp等格式;
                <br />2、推荐尺寸64*64px或者1:1
              </span>
            </p>
            <div v-show="haschoose" style="width:80px;height:80px">
              <img :src="url" alt />
            </div>
          </el-form-item>
          <el-form-item label="分类图排序：">
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
    </section>
  </div>
</template>
<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
const defaultAddClassifyPicture = {
  name: null,
}
export default {
  name: 'Home',
  data() {
    return {
      commentData: [],
      page: 1,
      dialogVisible: false,
      addClassify: Object.assign({}, defaultAddClassifyPicture),
      haschoose: false,
      url: '',
      topfun: [
        { name: '评论管理' },
        { name: '笔记管理' },
        { name: '意见反馈' },
      ],
      current: '0',
      multipleSelection: [],
      inter: null,
      noteList: null,
      multipleSelectionForNote: [],
      multiDelsForNote: [],
    }
  },
  mounted() {},
  created() {
    this.$api.courseScore(this, 'commentData')
    this.$api.optionBack(this, 'inter')
    this.$api.getNoteList(this, 'noteList')
  },
  activated: function() {
    console.log(JSON.parse(this.$route.query.url))
    if (this.$route.query.url != undefined) {
      this.url = JSON.parse(this.$route.query.url)
      this.haschoose = true
    }
  },
  deactivated: function() {
    console.log(4)
  },
  methods: {
    multiDel() {
      let that = this
      if (this.multipleSelectionForNote.length == 0) {
        this.$message({
          message: '请先勾选操作选项！',
          type: 'warning',
        })
        return
      }
      this.$confirm('确定要删发布所选分类吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          // this.imgId.length = 0
          console.log(this.multipleSelectionForNote)
          let ids = []
          for (let item of this.multipleSelectionForNote) {
            ids.push(item.note_id)
          }
          this.$api.publishNotes(this, ids)
        })
        .catch(() => {})
    },
    multiDelNote() {
      let that = this
      if (this.multipleSelectionForNote.length == 0) {
        this.$message({
          message: '请先勾选操作选项！',
          type: 'warning',
        })
        return
      }
      this.$confirm('确定要删除所选分类吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          // this.imgId.length = 0
          console.log(this.multipleSelectionForNote)
          let ids = []
          for (let item of this.multipleSelectionForNote) {
            ids.push(item.note_id)
          }
          this.$api.deleteNotes(this, ids)
        })
        .catch(() => {})
    },
    handleSelectionChangefornote(val) {
      this.multipleSelectionForNote = val
      this.multiDelsForNote = val
    },
    submit(id) {
      this.$confirm('确定要发布当前笔记吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          console.log(id)
          let ids = []
          ids.push(id)
          this.$api.publishNotes(this, ids)
        })
        .catch(() => {})
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.multiDels = val
      console.log(this.multipleSelection)
    },
    dropout(id) {
      this.$confirm('确定要删除当前笔记吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          console.log(id)
          let ids = []
          ids.push(id)
          this.$api.deleteNotes(this, ids)
        })
        .catch(() => {})
    },
    multiPublishNote() {
      let that = this
      if (this.multipleSelectionForNote.length == 0) {
        this.$message({
          message: '请先勾选操作选项！',
          type: 'warning',
        })
        return
      }
      this.$confirm('确定要发布所选分类吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          // this.imgId.length = 0
          console.log(this.multipleSelectionForNote)
          let ids = []
          for (let item of this.multipleSelectionForNote) {
            ids.push(item.note_id)
          }
          this.$api.publishNotes(this, ids)
        })
        .catch(() => {})
    },
    changelabel(val, id) {
      console.log(val, id)
      this.$api.changeOpinionStatus(this, val, id)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    publish(data) {
      let ids = []
      ids.push(data.id)
      this.$api.courseScoreBashPublish(this, ids)
    },
    multiPublish() {
      if (this.multipleSelection.length != 0) {
        let ids = []
        for (let id of this.multipleSelection) {
          ids.push(id.id)
        }
        this.$api.courseScoreBashPublish(this, ids)
      } else {
        this.$message({
          type: 'error',
          message: '请先选择项目！',
        })
      }
    },
    multiDelete() {
      if (this.multipleSelection.length != 0) {
        let ids = []
        for (let id of this.multipleSelection) {
          ids.push(id.id)
        }
        this.$confirm('确定要删除当前分类吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            this.$api.multiDeleteComment(this, ids)
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除',
            })
          })
      } else {
        this.$message({
          type: 'error',
          message: '请先选择项目！',
        })
      }
    },
    doActive(index) {
      this.current = index
      this.page = 1
    },
    // 获取数据
    getTableList(state, val) {
      console.log(state, val)
      if (state == 'page') {
        this.page = val
      } else if (state == 'data') {
        this.inter = val
      }
    },
    addIcon() {
      this.$router.push({
        path: '/eda/addNewClassify',
        query: { id: '' },
      })
    },
    scopes(id, sorts) {
      var regu = /^([1-9]\d*(\.\d*[1-9])?)|(0\.\d*[1-9])$/
      var re = new RegExp(regu)
      if (!re.test(sorts)) {
        this.$message.error('请输入正确的排序！')
        return false
      } else {
        this.$api.updateCategorySort(id, sorts, this)
      }
    },
    topayment(data) {
      console.log(data)
      this.$router.push(
        // name: 'payMent'
        {
          path: '/eda/lessonDetail',
          query: { id: data.category_id, url: JSON.stringify(data.icon) },
        }
      )
    },
 
    delbtn(id) {
      console.log(id)
      this.$confirm('确定要删除当前分类吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$api.courseScoreBashDelete(id.id, this)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    doPageChange(page, api, dataname) {
      console.log(page, api, dataname)
      this.page = page
      this.$api.optionBack(this, 'inter')
    },
    doPageChangeFornote(page, api, dataname) {
      console.log(page, api, dataname)
      this.page = page
      this.$api.getNoteList(this, 'noteList')
    },
    addClassifion() {
      this.haschoose = false
      this.url = ''
      this.addClassify = {}
      this.dialogVisible = true
    },
    handleConfirm() {
      this.$api.insertCategory(this, 'addClassify')
    },
  },
}
</script>
<style lang="scss" scoped>
.active {
  color: rgb(102, 102, 102);
  // background:#ffffff;
  border: 1px solid #cecece;
  border-bottom: none;
}
.home {
  background: #ffffff;
  // margin: 23px 0px 0px 23px;
  // padding: 23px 23px 23px 23px;
  padding: 30px;
  font-size: 14px;
}
header {
  border-bottom: 2px solid #d7d7d7;
  width: 100%;
  ul {
    display: flex;
    // border-bottom: 2px solid #d7d7d7;
    li {
      list-style: none;
      width: 70px;
      font-size: 13px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      //
      border-bottom: 0 solid #ffffff;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      color: #199fff;
      cursor: pointer;
    }
  }
}
.el-icon-folder-opened {
  font-size: 50px;
  cursor: pointer;
}

/deep/.el-table__header th,
.el-table__header tr {
  background-color: #f8f8f8;
  color: #909399;
}
.main {
  padding: 20px;
  background: #ffffff;
}
.client_head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.userTable {
  margin-top: 20px;
}
.table_bottom {
  display: flex;
  justify-content: space-between;
}
</style>
