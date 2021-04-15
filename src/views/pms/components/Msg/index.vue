<template>
  <div class="msg">
    <div class="msg-title" v-if="activeName === '5'">
      <h4 class="title">消息中心</h4>
    </div>
    <!-- <div class="msg-title" v-if="activeName !== '5'">
      <h4 class="title">未读</h4>
      <span class="msgspan">{{listdata.length}}</span>
    </div> -->
    <div v-if="activeName !== '5'">
      <el-tabs v-model="activeNames" @tab-click="handleClick">
        <el-tab-pane name="1">
          <span slot="label"
            >未读<el-badge
              v-if="activeNames == 1"
              :value="noreadcount"
            ></el-badge>
          </span>
        </el-tab-pane>
        <el-tab-pane label="已读" name="2"> </el-tab-pane>
      </el-tabs>
    </div>
    <ul class="msg-content">
      <li class="msg-item" v-for="(item, index) in listdata" :key="index">
        <!-- <span class="msg-icon"></span> -->
        <span class="msg-item-info" :title="item.title" @click="msgclick(item)">
          {{ item.title }}</span
        >
        <span class="msg-item-date" style="margin-left: auto;">{{
          item.create_time
        }}</span>
      </li>
    </ul>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="[8, 16, 24]"
      layout="total, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <!-- 弹窗 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="35%"
      :close-on-click-modal="false"
    >
      <div :model="ruleForm" :rules="rules" ref="ruleForm">
        <h3 class="detailtitle">
          {{ ruleForm.title }}
        </h3>
        <div class="notictitle">
          <p>发布时间：{{ ruleForm.create_time }}</p>
          <p>发布人：{{ ruleForm.staff_name }}</p>
        </div>
        <div class="noticontent">
          <div v-html="ruleForm.content"></div>
        </div>
      </div>
    </el-dialog>
    <!-- 弹窗 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="35%"
      v-if="activeName !== '5'"
      :close-on-click-modal="false"
    >
      <div :model="ruleForm" :rules="rules" ref="ruleForm">
        <h3 class="detailtitle">
          {{ ruleForm.title }}
        </h3>
        <div class="notictitle">
          <p>发布时间：{{ ruleForm.create_time }}</p>
          <p>发布人：{{ ruleForm.staff_name }}</p>
        </div>
        <div class="noticontent">
          <div v-html="ruleForm.content"></div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="Markunread" v-if="activeNames == 2"
          >标为未读</el-button
        >
        <el-button type="primary" @click="dialogVisible = false"
          >知道了</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  getSystemAnnouncementList,
  getAnnouncementInfo,
  setUnread,
} from '@/api/workbench'
import { followRoute } from '@/utils/index'
export default {
  name: 'Msg',
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      activeName: '1',
      activeNames: '1',
      readType: '',
      readMap: {
        1: '已读',
        2: '未读',
      },
      pageSize: '7',
      total: 0,
      pageNum: 1,
      dialogVisible: false,
      dialogTitle: '',
      handleSizeChanges: '',
      id: '',
      rules: {},
      ruleForm: {
        id: '',
        datatime: '',
        content: '',
        title: '',
        read: '',
        read_count: '',
        staff_name: '',
      },
      listdata: [],
      noreadcount: '',
    }
  },
  created() {
    this.getSystemAnnouncementList()
  },
  methods: {
    Markunread(id) {
      this.setUnread(id)
      this.dialogVisible = false
    },
    //公告列表接口
    async getSystemAnnouncementList() {
      const data = {
        limit: this.pageSize,
        page: this.pageNum,
        read: this.activeNames,
      }
      const res = await getSystemAnnouncementList(data)
      console.log(res.data.list)
      this.listdata = res.data.list
      this.activeNames == 1 ? (this.noreadcount = res.data.list.length) : ''
      this.total = res.data.total
    },
    msgclick(ab) {
      console.log(ab)
      this.dialogTitle = '公告详情'
      this.ruleForm = ab
      this.dialogVisible = true
      this.id = ab.id
      this.getAnnouncementInfo()
    },
    // 公告详情接口
    async getAnnouncementInfo() {
      const data = {
        id: this.ruleForm.id,
        // read: this.ruleForm.read,
      }
      console.log(data)
      const res = await getAnnouncementInfo(data)
      if (res.code == 0) {
        console.log('未读')
        this.getSystemAnnouncementList()
      }
    },
    // 已读未读接口
    async setUnread() {
      const data = {
        id: this.ruleForm.id,
      }
      console.log(data)
      const res = await setUnread(data)
      if (res.code == 0) {
        this.$message.success(res.message)
        this.getSystemAnnouncementList()
      }
    },
    handleSizeChange(size) {
      this.pageSize = size
      this.pageNum = 1
      this.getSystemAnnouncementList()
    },
    handleCurrentChange(page) {
      this.pageNum = page
      this.getSystemAnnouncementList()
    },

    handleClick(val) {
      console.log(val)
      this.readType = val
      console.log(this.activeNames)
      this.getSystemAnnouncementList()
    },
  },
}
</script>
<style lang="scss" scoped>
/deep/.el-badge {
  position: absolute;
  top: 26px;
  right: 19px;
  transform: translateY(-50%) translateX(100%);
}
.title {
  font-weight: normal;
  margin-right: 5px;
  border-bottom: 2px solid rgb(0, 153, 255);
}
.msg {
  padding: 16px;
  border: 1px solid #dcdfe6;
  .msg-title {
    display: flex;
    align-items: left;
    justify-content: left;
    line-height: 30px;
  }
  .msg-content {
    padding-bottom: 35px;
    .msg-item {
      display: flex;
      justify-content: flex-start;
      line-height: 32px;
      color: #858585;
      border-bottom: 1px dashed rgb(228, 228, 228);
      .msg-icon {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        margin-top: 12px;
        padding: 0;
        // border: 2px solid rgb(185, 185, 185);
      }
      .msg-item-info {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: 14px;
        cursor: pointer;
        padding-left: 3px;
      }
      .msg-item-date {
        width: 100px;
        font-size: 12px;
        flex-shrink: 0;
        text-align: right;
      }
    }
  }
}
.detailtitle {
  font-size: 26px;
  font-weight: normal;
  color: #333;
  text-align: center;
  margin-bottom: 10px;
}
.notictitle {
  display: flex;
  margin: 30px 25px;
  font-size: 16px;
}
.notictitle p {
  width: 33%;
}
.noticontent {
  border: 1px solid rgb(231, 230, 230);
  padding: 40px 30px;
}
.table_bottom {
  padding: 10px 10px 0 10px;
}
.msgdiv {
  position: relative;
  width: 30px;
  height: 30px;
}
.msgspan {
  background: orangered;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  font-size: 14px;
  color: #fff;
  line-height: 22px;
  text-align: center;
  margin-top: 5px;
  position: absolute;
  left: 35px;
  top: 0;
  z-index: 9999;
}
/deep/.el-pagination {
  margin: 20px auto 0 auto;
  width: 95%;
  position: absolute;
  bottom: 4px;
  text-align: center;
}
.table_bottom {
  height: 25px;
  margin: auto;
}
.msg {
  position: relative;
  width: 24%;
  padding-bottom: 5px;
}
.el-tabs__header {
  margin-bottom: 0;
}
/deep/.el-pager li {
  min-width: 0;
}
</style>
