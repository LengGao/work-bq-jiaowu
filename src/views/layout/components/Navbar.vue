<template>
  <header class="header" mode="horizontal">
    <div class="header-left">
      <hamburger
        class="btn"
        :toggleClick="toggleSideBar"
        :isActive="sidebar.opened"
      ></hamburger>
      <breadcrumb></breadcrumb>
    </div>
    <div class="header-right">
      <!-- <div class="top-function-wrapper"> -->
      <!-- <span style="color: #199FFF;" @click="huanfu('theme1')">换肤</span> -->
      <!-- </div> -->
      <!-- 刷新按钮 -->
      <!-- <div class="top-function-wrapper" @click="clearStorage">
        <svg-icon icon-class="clearStorage"></svg-icon>
        <span>清除缓存</span>
      </div> -->
      <div class="message-container">
        <el-popover
          trigger="click"
          placement="bottom"
          width="370"
          popper-class="msg-popover"
          @show="handlePopoverShow"
          @after-leave="handlePopoverColse"
        >
          <el-badge
            slot="reference"
            :value="msgCount || ''"
            class="message-badge"
          >
            <i class="el-icon-bell message-bell"></i>
          </el-badge>
          <div class="message-content">
            <div class="message-content-head">
              <h4>任务中心</h4>
              <el-button
                circle
                @click="handleMsgRefresh"
                icon="el-icon-refresh"
                size="mini"
                :loading="refershLoading"
              ></el-button>
            </div>
            <ul class="message-content-list" v-infinite-scroll="loadMore">
              <li class="msg-list-item" v-for="msg in msgList" :key="msg.id">
                <div class="item-icon">
                  <i class="iconfont iconlaba"></i>
                </div>
                <div class="item-content">
                  <div class="content-top">
                    <div class="msg-info">
                      <p class="msg-content" :title="msg.queue_name">
                        {{ msg.queue_name }}
                      </p>
                      <span class="msg-date">{{ msg.create_time }}</span>
                    </div>
                    <div class="msg-actions" v-if="msg.download">
                      <span @click.stop="handleDownload(msg.download)"
                        >下载</span
                      >
                    </div>
                    <div class="msg-actions" v-if="msg.queue_status == 1">
                      <span>执行中</span>
                    </div>
                  </div>
                  <div class="content-bottom">
                    <span class="download__status download__status--primary"
                      >总条数：{{ msg.count }}</span
                    >
                    <span class="download__status download__status--success"
                      >成功：{{ msg.success }}</span
                    >
                    <span class="download__status download__status--error"
                      >失败：{{ msg.fail }}</span
                    >
                  </div>
                </div>
              </li>
              <li>
                <p v-if="msgLoading" class="load-status">加载中...</p>
                <p v-if="msgNoMore && !msgLoading" class="load-status">
                  没有更多了
                </p>
              </li>
            </ul>
          </div>
        </el-popover>
      </div>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img
            class="user-avatar"
            :src="userInfo.head_photo ? userInfo.head_photo : touxiang"
          />
          <span>{{ userInfo.staff_name }}</span>
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu class="user-dropdown" slot="dropdown">
          <el-dropdown-item @click.native="modifyPassword">
            <span> 修改密码</span>
          </el-dropdown-item>

          <el-dropdown-item divided @click.native="logout">
            <span>退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog
      title="修改个人密码"
      :visible.sync="dialog"
      :append-to-body="true"
      :close-on-click-modal="false"
      width="600px"
      @close="$refs['rulef'].resetFields()"
    >
      <el-form
        :model="form"
        :rules="ru"
        ref="rulef"
        label-width="95px"
        label-position="left"
      >
        <el-form-item label="原密码：" prop="origin">
          <el-input v-model="form.origin" type="passWord"></el-input>
        </el-form-item>
        <el-form-item label="新密码：" prop="password">
          <el-input v-model="form.password" type="passWord"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="confirm">
          <el-input v-model="form.confirm" type="passWord"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('rulef')">确 定</el-button>
      </div>
    </el-dialog>
  </header>
</template>

<script>
let timeId = null
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import touxiang from '@/assets/images/touxiang.png'
import { getAdminQueueList, baseUrl } from '@/api/login'
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error('密码不能小于3位'))
      } else {
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      touxiang,
      dialog: false,
      form: {
        origin: '',
        password: '',
        confirm: '',
      },
      ru: {
        origin: [
          { required: true, message: '请填写原密码', trigger: 'blur' },
          { min: 6, message: '密码最少6位数', trigger: 'blur' },
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePass },
        ],
        confirm: [
          { required: true, validator: validatePass2, trigger: 'blur' },
        ],
      },
      msgList: [],
      msgPageNum: 1,
      msgPageSize: 10,
      msgTotal: 0,
      msgLoading: false,
      msgNoMore: false,
      refershLoading: false,
    }
  },
  components: {
    Breadcrumb,
    Hamburger,
  },
  computed: {
    ...mapGetters(['sidebar', 'msgCount', 'userInfo']),
  },
  created() {
    this.getUnreadCount()
    const time = 1000 * 30
    timeId = setInterval(this.getUnreadCount, time)
  },
  beforeDestroy() {
    clearInterval(timeId)
  },
  methods: {
    //getUnreadCount：获取未读数量
    ...mapActions(['getUnreadCount']),
    // msg 下载
    handleDownload(url) {
      console.log(baseUrl + url)
      window.location.href = baseUrl + url
    },
    // msg 加载更多
    loadMore() {
      const leng = this.msgList.length
      if (leng < this.msgTotal) {
        this.msgPageNum++
        this.getAdminQueueList()
      } else {
        this.msgNoMore = true
      }
    },
    // msg 刷新
    async handleMsgRefresh() {
      this.msgPageNum = 1
      this.refershLoading = true
      await this.getAdminQueueList()
      this.refershLoading = false
    },

    // 弹窗关闭时
    handlePopoverColse() {
      this.msgNoMore = false
      this.msgTotal = 0
      this.msgList = []
    },
    // 弹窗打开时
    async handlePopoverShow() {
      this.msgPageNum = 1
      await this.getAdminQueueList()
      this.getUnreadCount()
    },
    // msg 列表
    async getAdminQueueList() {
      const data = {
        page: this.msgPageNum,
        limit: this.msgPageSize,
      }
      this.msgLoading = true
      const res = await getAdminQueueList(data).catch(() => {
        this.msgLoading = false
      })
      this.msgLoading = false
      if (this.msgPageNum === 1) {
        this.msgList = res.data.list
      } else {
        this.msgList.push(...res.data.list)
      }
      this.msgTotal = res.data.total
    },
    // 刷新按钮
    handclick() {
      console.log('点了我')
      window.location.reload()
    },
    modifyPassword() {
      this.dialog = true
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.resetPassword(this, this.form)
          // if (this.$cookies.get('organization_id')) {
          //   this.$api.resetOrgPassword(this)
          // } else {
          //   this.$api.resetAdminPassword(this)
          // }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    huanfu(theme) {
      window.document.documentElement.setAttribute('data-theme', theme)
    },
    clearStorage() {
      this.$api.clearCache(this)
    },
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('logout').then((res) => {
        this.$message.success(res.message)
        this.$router.push('/login')
      })
    },
  },
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  border-bottom: 1px solid #e6e6e6;
  .header-left {
    display: flex;
    align-items: center;
    .btn {
      margin-top: 5px;
    }
  }
  .header-right {
    display: flex;
    align-items: center;
  }
  .message-container {
    padding: 0 25px;
    .message-badge {
      padding-top: 7px;
      /deep/.el-badge__content.is-fixed {
        top: 3px;
      }
      .message-bell {
        font-size: 20px;
        cursor: pointer;
        &:hover {
          color: #2798ee;
        }
      }
    }
  }

  .avatar-container {
    display: flex;
    span {
      position: relative;
      right: -0px;
      font-size: 16px;
    }
    .avatar-wrapper {
      cursor: pointer;
      position: relative;
      display: flex;
      align-items: center;
      .user-avatar {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        margin-right: 10px;
      }
      span {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.65);
        line-height: 14px;
      }
      .el-icon-caret-bottom {
        margin: 0 10px;
        font-size: 12px;
      }
    }
  }
}

.msg-popover {
  .message-content {
    .message-content-head {
      padding: 12px;
      border-bottom: 1px solid #e4e7ed;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      button {
        i {
          font-size: 18px;
        }
      }
    }
    .message-content-list {
      height: 400px;
      overflow-y: auto;
      padding-right: 4px;
      margin-right: -4px;
      .msg-list-item {
        padding: 12px 0;
        display: flex;
        border-bottom: 1px solid #e4e7ed;
        .item-icon {
          i {
            font-size: 12px;
            padding: 3px;
            color: #fff;
            background-color: #199fff;
            border-radius: 50%;
          }
        }
        .item-content {
          flex: 1;
          margin-left: 10px;
          .content-top {
            display: flex;
            justify-content: space-between;
            margin-bottom: 4px;
            .msg-info {
              overflow: hidden;
              margin-right: 6px;
              .msg-content {
                color: #606266;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                cursor: pointer;
              }
              .msg-date {
                font-size: 12px;
                color: #909399;
              }
            }
            .msg-actions {
              flex-shrink: 0;
              span {
                padding: 2px 6px;
                color: #199fff;
                border: 1px solid #199fff;
                border-radius: 2px;
                cursor: pointer;
              }
            }
          }
          .content-bottom {
            .download__status {
              margin-right: 10px;
              &--primary {
                color: #199fff;
              }
              &--success {
                color: #43d100;
              }
              &--error {
                color: #fd6500;
              }
            }
          }
        }
      }
    }
    .load-status {
      text-align: center;
      color: #909399;
      padding: 8px;
    }
  }
}
</style>
