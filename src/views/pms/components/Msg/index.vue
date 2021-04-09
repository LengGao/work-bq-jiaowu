<template>
  <div class="msg">
    <div class="msg-title">
      <h4 class="title">消息中心</h4>
      <span class="msgspan">5</span>
    </div>
    <ul class="msg-content">
      <li class="msg-item" v-for="(item, index) in listdata.slice(0, 8)" :key="index">
        <span class="msg-item-info" :title="item.title" @click="msgclick(item)">
          {{ item.title }}</span>
        <span class="msg-item-date">{{ item.create_time }}</span>
      </li>
    </ul>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum" :page-sizes="[10, 20, 30]" layout="total, prev, pager, next, jumper" :total="total">
    </el-pagination>
    <!-- 弹窗 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="35%">
      <div :model="ruleForm" :rules="rules" ref="ruleForm">
        <h3 class="detailtitle">
          {{ruleForm.title}}
        </h3>
        <div class="notictitle">
          <p>发布时间：{{ruleForm.create_time}}</p>
          <p>发布人：{{ruleForm.staff_name}}</p>
        </div>
        <div class="noticontent">
          <div v-html="ruleForm.content"></div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getSystemAnnouncementList, getAnnouncementInfo, setUnread } from '@/api/workbench'
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
      noticeMap: {
        1: '已读',
        2: '未读',
      },
      pageSize: 8,
      total: 0,
      pageNum: 1,
      dialogVisible: false,
      dialogTitle: '',
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
    }
  },
  created() {
    this.getSystemAnnouncementList()
  },
  methods: {
    //公告列表接口
    async getSystemAnnouncementList() {
      const data = {
        limit: this.pageSize,
        page: this.pageNum,
      }
      const res = await getSystemAnnouncementList(data)
      console.log(res.data.list)
      this.listdata = res.data.list
      this.listTotal = res.data.total
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
        read: this.ruleForm.read,
      }
      console.log(data)
      const res = await getAnnouncementInfo(data)
      if (res.code == 0) {
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
  },
}
</script>
<style lang="scss" scoped>
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
    border-bottom: 1px solid #dcdfe6;
    line-height: 30px;
  }
  .msg-content {
    padding-top: 10px;
    .msg-item {
      display: flex;
      justify-content: space-between;
      line-height: 30px;
      color: #909399;
      .msg-item-info {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: 14px;
        cursor: pointer;
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
  font-size: 30px;
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
}
/deep/.el-pagination {
  margin-top: 10px;
}
</style>