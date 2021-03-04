<template>
  <section class="mainwrap">
    <div class="client_head">
      <search
        :hideTime="true"
        :hideOtherOption="true"
        :selectItems="false"
        api="livenumberlist"
        placeholder="课程分类"
        @getTable="getTable"
      ></search>
      <!-- <el-button type="primary" @click="addVideo">添加直播</el-button> -->
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
          prop="live_name"
          label="直播名称"
          min-width="170"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column
          prop="live_type"
          label="直播类型"
          min-width="70"
          show-overflow-tooltip
          align="left"
        ></el-table-column>
        <!-- <el-table-column
          prop="live_class_name"
          label="直播班级"
          min-width="150"
          show-overflow-tooltip
          align="left"
        ></el-table-column> -->
        <el-table-column
          prop="start_push_time"
          label="最早推流时间"
          min-width="120"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column
          prop="end_push_time"
          label="最晚断流时间"
          min-width="120"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column
          prop="total_pople"
          label="总人数"
          min-width="70"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column
          label="直播情况"
          fixed="right"
          min-width="230"
          align="center"
        >
          <template slot-scope="scope">
            <div style="display:flex;justify-content:space-around">
              <el-button type="text" @click="editor(scope.$index, scope.row)"
                >直播链接</el-button
              >
              <el-button type="text" @click="GoDetail(scope.$index, scope.row)"
                >直播详情</el-button
              >
              <el-button
                type="text"
                @click="delbtn(scope.$index, scope.row)"
                style="display:none"
                >关闭直播</el-button
              >
              <el-button type="text" @click="liveBack(scope.$index, scope.row)"
                >回顾视频</el-button
              >
              <el-button
                type="text"
                @click="toliveMaterial(scope.$index, scope.row)"
                >学习资料</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="直播链接" :visible.sync="dialogVisible" width="50%">
      <!-- <p style="padding-left:93px;margin-bottom:20px">
        在OBS直播软件中输入以下的URL与流名称
      </p> -->
      <el-form :model="createVideo" ref="reasonForm" label-width="150px">
        <el-form-item label="网页开播链接">
          <el-input v-model="WebpageUrl" class="input-width"></el-input>
          <a :href="WebpageUrl" target="_blank">
            <el-button
              class="input-width"
              type="success"
              plain
              style="margin-left:20px"
              >打开</el-button
            >
          </a>
        </el-form-item>
        <el-form-item label="启动客户端链接:">
          <el-input v-model="clientUrl" class="input-width"></el-input>
          <a :href="clientUrl" target="_blank">
            <el-button
              class="input-width"
              type="success"
              plain
              style="margin-left:20px"
              >打开</el-button
            >
          </a>
        </el-form-item>
        <el-form-item>
          <div style="display:flex;">
            <div style="padding-right:20px">
              <span style="padding-right:10px">频道号</span>{{ channelId }}
            </div>
            <div>
              <span style="padding-right:10px">登录密码</span
              >{{ channelPasswd }}
            </div>
          </div>
        </el-form-item>
        <el-form-item label="助教后台链接:">
          <el-input v-model="teacherUrl" class="input-width"></el-input>
          <a :href="teacherUrl" target="_blank">
            <el-button
              class="input-width"
              type="success"
              plain
              style="margin-left:20px"
              >打开</el-button
            >
          </a>
        </el-form-item>
        <el-form-item>
          <div>
            <div
              style="display:flex;"
              v-for="(item, index) in channel_accout"
              :key="index"
            >
              <div style="padding-right:20px">
                <span style="padding-right:10px">频道号</span>{{ item.account }}
              </div>
              <div>
                <span style="padding-right:10px">登录密码</span
                >{{ item.passwd }}
              </div>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="添加直播" :visible.sync="addDialogVisible" width="40%">
      <el-form :model="addLiveData" ref="reasonForm" label-width="150px">
        <el-form-item label="直播名称:">
          <el-input
            v-model="addLiveData.live_name"
            class="input-width"
            style="width:60%"
            placeholder="直播名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="任课老师:">
          <el-select
            v-model="addLiveData.live_teacher_id"
            placeholder="请选择任课老师"
            style="width:38%"
          >
            <el-option
              v-for="item in teacherArray"
              :key="item.teacher_id"
              :label="item.teacher_name"
              :value="item.teacher_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="直播类型:">
          <el-radio-group v-model="addLiveData.live_type">
            <el-radio :label="2">班级直播</el-radio>
            <el-radio :label="1">免费公开课</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="关联班级:">
          <div style="display:flex;">
            <ul
              style="list-style:none;width:28%;margin-right:4%;"
              v-show="addLiveData.class_id.length"
            >
              <li
                v-for="item in addLiveData.class_id"
                :key="item.id"
                style="margin-bottom:10px"
              >
                <el-input
                  :value="item.label"
                  placeholder="时长单位是分钟"
                  onfocus="this.blur()"
                  style="color:red !important"
                >
                  <i
                    slot="suffix"
                    class="el-input__icon el-icon-close"
                    style="cursor: pointer;"
                    @click="deleteOption(item)"
                  ></i>
                </el-input>
              </li>
            </ul>
            <el-select
              v-model="value"
              placeholder="请选择关联班级"
              style="width:28%"
              @change="selectOption"
            >
              <el-option
                v-for="item in classArray"
                :key="item.value"
                :label="item.classroom_name"
                :value="{
                  value: item.classroom_id,
                  label: item.classroom_name,
                }"
              ></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="直播时长:">
          <el-input
            v-model="addLiveData.live_long"
            placeholder="时长单位是分钟"
            style="width:60%"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="AddhandleConfirm">确 定</el-button>
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
    <!-- <el-button type="warning" @click="multiDel" style="margin-top:20px"
      >批量删除</el-button
    >-->
  </section>
</template>

<script>
const defaultcreateVideo = {
  name: null,
  sort: 0,
  class: '',
}
const live = {}
export default {
  data() {
    return {
      channel_accout: [],
      Webpage: '',
      teacherUrl: 'https://live.polyv.net/teacher.html',
      clientUrl: '',
      channelPasswd: '',
      WebpageUrl: '',
      channelId: '',
      account: '',
      passwd: '',
      multipleSelection: [],
      datas: {},
      videoData: [
        {
          index: '1',
          nickname: '',
          describe: '',
          order: '0',
          number: '10',
          status: 0,
        },
        {
          index: '2',
          nickname: '',
          describe: '',
          order: '1',
          number: '10',
          status: 1,
        },
      ],
      page: 1,
      dialogVisible: false,
      createVideo: Object.assign({}, defaultcreateVideo),
      videoId: null,
      addDialogVisible: false,
      options: [],
      teacherArray: [],
      classArray: [],
      value: '',
      addLiveData: {
        live_name: '', //直播名称
        class_id: [], //直播班级数组形式
        live_teacher_id: '', //直播讲师ID
        live_teacher_name: '', //直讲师名称
        live_long: '', //直播时长
        live_type: 2, //直播类型：1为免费公开课，2为正常班级直播
        course_id: '', //课程ID
      },
      live: Object.assign({}, live),
    }
  },
  created() {
    console.log(this.$route.query.biaoshi)
    this.$api.livenumberlist(this, 'videoData')
    this.$api.teacherArray(this, 'teacherArray')
    this.$api.classroom(this, 'classArray')
  },
  methods: {
    //跳转到学习资料页面
    toliveMaterial(index, row) {
      console.log(row)
      this.$router.push({
        path: '/eda/liveMaterial',
        query: {
          live_id: row.live_id,
          class_id: row.live_class_id,
          course_id: row.course_id,
        },
      })
    },
    AddhandleConfirm() {
      this.$api.createlive(this, 'addLiveData')
    },
    deleteOption(data) {
      console.log(data)
      this.addLiveData.class_id.forEach((item, index) => {
        if (JSON.stringify(item) == JSON.stringify(data)) {
          console.log(item)
          this.addLiveData.class_id.splice(index, 1)
        }
      })
    },
    selectOption(event, item) {
      console.log(
        JSON.stringify(this.addLiveData.class_id),
        JSON.stringify(event)
      )
      if (
        JSON.stringify(this.addLiveData.class_id).indexOf(
          JSON.stringify(event)
        ) == -1
      ) {
        console.log('不存在')
        this.addLiveData.class_id.push({
          value: event.value,
          label: event.label,
        })
      } else {
        console.log('已存在')
        this.$message({
          type: 'warning',
          message: '不能重复添加同一数据',
        })
      }
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
          that.$api.deletelivevideo(this, data.live_id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
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
    GoDetail(index, row) {
      console.log(index, row)
      this.$router.push({
        name: 'liveDetail',
        query: {
          live_id: row.live_id,
          live_class_id: row.live_class_id,
          course_id: row.course_id,
        },
      })
    },
    doPageChange(page) {
      this.page = page
      this.$api.livenumberlist(this, 'videoData', this.datas)
    },
    addVideo() {
      this.addDialogVisible = true
    },
    editor(index, row) {
      this.clientUrl = ''
      this.WebpageUrl = ''
      this.channelId = ''
      this.channelPasswd = ''
      this.channel_accout = []
      this.dialogVisible = true

      this.$api.getLiveLink(this, row, 'createVideo', 1)
      // this.$api.getLiveInfo(this, row, 'createVideo')
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
/deep/ .el-input {
  width: 60%;
}
/deep/ .el-input--suffix {
  width: 100%;
}
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
