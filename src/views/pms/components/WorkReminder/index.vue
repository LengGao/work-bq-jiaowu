<template>
  <div class="work-reminder">
    <TableBlock
      title="回款计划提醒"
      :tabs="returnPaymentTabs"
      @tabs-change="receivablePlan"
      :data="returnPaymentData"
      :list-total="returnPaymentTotal"
      @load-more="loadMoreReceivablePlan"
      v-loading="returnPaymentLoading"
    >
      <template slot="left" slot-scope="{ row }">
        <div class="table-left">
          <span class="title">{{ row.nickname }}-{{ row.project_name }}</span>
          <div class="money">
            <span>计划金额￥{{ row.money || 0 }}</span>
            <span>实收金额￥{{ row.pay_money || 0 }}</span>
          </div>
        </div>
      </template>
      <template slot="right" slot-scope="{ row }">
        <div class="table-right">
          <span class="date">{{ row.day }}</span>
        </div>
      </template>
    </TableBlock>
    <TableBlock
      title="工作通知"
      :data="workMsgData"
      :list-total="workMsgTotal"
      @load-more="loadMoreStaffNotice"
      @list-click="handleWorkMsgClick"
      v-loading="workMsgLoading"
    >
      <template slot="left" slot-scope="{ row }">
        <div class="table-work-left">
          <div
            class="avatar"
            :style="{
              backgroundColor:
                '#' + Math.random().toString(16).substr(2, 6).toUpperCase(),
            }"
          >
            <img :src="row.head_photo" alt="" v-if="row.head_photo" />
            <span v-else>
              {{
                (row.staff_name && row.staff_name.substr(-2)) || row.staff_name
              }}</span
            >
          </div>
          <div class="info">
            <span class="info-user">{{ row.staff_name }}</span>
            <span class="info-msg">{{ row.keyword }}</span>
            <p class="info-tips" :class="{ 'is-read': row.is_read === 0 }">
              {{ row.tips }}
            </p>
          </div>
        </div>
      </template>
      <template slot="right" slot-scope="{ row }">
        <div class="table-right">
          <p class="notic-time">{{ row.create_time }}</p>
          <p class="notic-user">通知对象：{{ row.to_staff_name }}</p>
        </div>
      </template>
    </TableBlock>
    <TableBlock
      title="待跟进客户"
      :tabs="staffFollowTabs"
      :tabs-active="1"
      @tabs-change="staffFollow"
      :data="staffFollowData"
      :list-total="staffFollowTotal"
      v-loading="staffFollowLoading"
      @load-more="loadMoreStaffFollow"
      @list-click="handleStaffFollowClick"
    >
      <span slot="header-right" class="tips"
        >*超过30天未跟进的未成交客户将被系统自动划入公海</span
      >
      <template slot="left" slot-scope="{ row }">
        <div class="table-left">
          <span class="title">{{ row.name }}</span>
          <span class="pay-state pay-state--success" v-if="row.pay_state"
            >已成交</span
          >
          <span class="pay-state" v-else>未成交</span>
          <div class="follow-time">
            <span>上次跟进时间：{{ row.last_follow_time }}</span>
          </div>
        </div>
      </template>
      <template slot="right" slot-scope="{ row }">
        <div class="table-right">
          <span>{{ row.follow_title }}</span>
        </div>
      </template>
    </TableBlock>
    <TableBlock
      title="系统通知"
      :data="msgData"
      :list-total="msgTotal"
      v-loading="msgLoading"
      @load-more="loadMoreMsg"
      @list-click="openMsgDialog"
    >
      <template slot="left" slot-scope="{ row }">
        <div class="table-left">
          <div class="msg-title">
            <span class="unread" v-if="row.read === 1"
              >【{{ row.read_name }}】</span
            >
            {{ row.title }}
          </div>
        </div>
      </template>
      <template slot="right" slot-scope="{ row }">
        <div class="table-right">
          <div class="time">{{ row.create_time }}</div>
        </div>
      </template>
    </TableBlock>
    <MsgDialog v-model="msgDialog" :id="msgCurrnetId" @ok="handleMsgOk" />
  </div>
</template>
<script>
import MsgDialog from "./components/MsgDialog";
import TableBlock from "./components/TableBlock";
import { followRoute } from "@/utils/index";
import {
  receivablePlan,
  staffFollow,
  getSystemMsgList,
  getStaffNotice,
  readStaffNotice,
} from "@/api/workbench.js";
export default {
  name: "WorkReminder",
  components: {
    TableBlock,
    MsgDialog,
  },
  props: {
    userIds: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      followRoute,
      //回款计划提醒
      returnPaymentTotal: 0,
      returnPaymentPage: 1,
      returnPaymentType: 0,
      returnPaymentLoading: false,
      returnPaymentData: [],
      returnPaymentTabs: [
        {
          title: "已逾期",
          value: 0,
        },
        {
          title: "未来7天",
          value: 1,
        },
        {
          title: "未来15天",
          value: 2,
        },
        {
          title: "未来30天",
          value: 3,
        },
      ],
      //待跟进客户
      staffFollowData: [],
      staffFollowTotal: 0,
      staffFollowPage: 1,
      staffFollowType: 1,
      staffFollowLoading: false,
      staffFollowTabs: [
        {
          title: "最近7天",
          value: 1,
        },
        {
          title: "最近15天",
          value: 2,
        },
        {
          title: "最近30天",
          value: 3,
        },
      ],
      // 系统通知
      msgData: [],
      msgTotal: 0,
      msgPage: 1,
      msgLoading: false,
      msgDialog: false,
      msgCurrnetId: "",
      // 工作通知
      workMsgData: [],
      workMsgTotal: 0,
      workMsgPage: 1,
      workMsgLoading: false,
    };
  },
  watch: {
    userIds: {
      handler() {
        this.staffFollowPage = 1;
        this.returnPaymentPage = 1;
        this.receivablePlan();
        this.staffFollow();
      },
      deep: true,
    },
  },
  activated() {
    this.workMsgPage = 1;
    this.msgPage = 1;
    this.staffFollowPage = 1;
    this.returnPaymentPage = 1;
    this.receivablePlan();
    this.staffFollow();
    this.getSystemMsgList();
    this.getStaffNotice();
  },
  created() {
    this.receivablePlan();
    this.staffFollow();
    this.getSystemMsgList();
    this.getStaffNotice();
  },
  methods: {
    handleStaffFollowClick(row) {
      this.$router.push({
        name: "cusdetail",
        query: {
          uid: row.uid,
          cid: row.id,
        },
      });
    },
    // 系统通知
    handleMsgOk(read) {
      this.msgData.forEach((item) => {
        if (item.id === this.msgCurrnetId) {
          item.read = read;
          item.read_name = read === 1 ? "未读" : "已读";
        }
      });
    },
    openMsgDialog(row) {
      this.msgCurrnetId = row.id;
      this.msgDialog = true;
    },
    loadMoreMsg() {
      this.msgPage++;
      this.getSystemMsgList();
    },
    async getSystemMsgList() {
      const data = {
        page: this.msgPage,
      };
      this.msgLoading = true;
      const res = await getSystemMsgList(data).catch(() => {});
      this.msgLoading = false;
      if (res.code === 0) {
        if (this.msgPage > 1) {
          this.msgData.push(...res.data.list);
        } else {
          this.msgData = res.data.list;
        }
        this.msgTotal = res.data.total;
      }
    },
    //工作通知
    handleWorkMsgClick(row) {
      this.readStaffNotice(row.id);
      if (row.type === 1) {
        this.linkTo("crmOrderDetail", { id: row.order_id });
      }
      if (row.type === 2) {
        this.linkTo("eduOpenClass");
      }
      if (row.type === 3) {
        this.linkTo("returnPayment");
      }
    },
    async readStaffNotice(id) {
      const data = { id };
      await readStaffNotice(data);
    },
    loadMoreStaffNotice() {
      this.workMsgPage++;
      this.getStaffNotice();
    },
    async getStaffNotice() {
      const data = {
        page: this.workMsgPage,
      };
      this.workMsgLoading = true;
      const res = await getStaffNotice(data).catch(() => {});
      this.workMsgLoading = false;
      if (res.code === 0) {
        if (this.workMsgPage > 1) {
          this.workMsgData.push(...res.data.data);
        } else {
          this.workMsgData = res.data.data;
        }
        this.workMsgTotal = res.data.total;
      }
    },
    //待跟进客户
    loadMoreStaffFollow() {
      this.staffFollowPage++;
      this.staffFollow();
    },
    async staffFollow(type) {
      if (type) {
        this.staffFollowType = type;
        this.staffFollowPage = 1;
      }
      const data = {
        state: this.staffFollowType,
        page: this.staffFollowPage,
        arr_uid: this.userIds,
      };
      this.staffFollowLoading = true;
      const res = await staffFollow(data).catch(() => {});
      this.staffFollowLoading = false;
      if (res.code === 0) {
        if (this.staffFollowPage > 1) {
          this.staffFollowData.push(...res.data.list);
        } else {
          this.staffFollowData = res.data.list;
        }
        this.staffFollowTotal = res.data.total;
      }
    },
    //回款计划提醒
    loadMoreReceivablePlan() {
      this.returnPaymentPage++;
      this.receivablePlan();
    },
    async receivablePlan(type) {
      if (type) {
        this.returnPaymentType = type;
        this.returnPaymentPage = 1;
      }
      const data = {
        type: this.returnPaymentType,
        page: this.returnPaymentPage,
        arr_uid: this.userIds,
      };
      this.returnPaymentLoading = true;
      const res = await receivablePlan(data).catch(() => {});
      this.returnPaymentLoading = false;
      if (res.code === 0) {
        if (this.returnPaymentPage > 1) {
          this.returnPaymentData.push(...res.data.list);
        } else {
          this.returnPaymentData = res.data.list;
        }
        this.returnPaymentTotal = res.data.total;
      }
    },
    linkTo(name, query) {
      this.$router.push({
        name,
        query,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.work-reminder {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .tips {
    color: #999;
    font-size: 12px;
    margin-left: auto;
  }
  .table-block {
    width: calc(50% - 10px);
    @media only screen and (max-width: 1200px) {
      width: 100%;
    }
  }
  .table-left {
    .money {
      color: #999;
      padding-top: 6px;
    }
    .msg-title {
      padding: 10px 0;
      .unread {
        color: #fd6552;
      }
    }
    .pay-state {
      border: 1px solid #fd6500;
      border-radius: 2px;
      font-size: 12px;
      color: #fd6500;
      margin-left: 6px;
      padding: 2px;
      &--success {
        color: #65d92e;
        border-color: #65d92e;
      }
    }
    .follow-time {
      padding-top: 6px;
      color: #999;
    }
  }
  .table-work-left {
    display: flex;
    .avatar {
      flex-shrink: 0;
      border-radius: 50%;
      color: #fff;
      width: 35px;
      height: 35px;
      text-align: center;
      margin-right: 10px;
      img {
        border-radius: 50%;
        width: 100%;
        height: 100%;
      }
      span {
        line-height: 35px;
        font-size: 12px;
      }
    }
    .info {
      &-user {
        color: #199fff;
        margin-right: 6px;
      }
      &-msg {
        color: #999;
      }
      &-tips {
        padding: 6px 0;
      }
      .is-read::before {
        display: inline-block;
        content: "";
        width: 6px;
        height: 6px;
        background-color: #fd6500;
        border-radius: 50%;
      }
    }
  }
  .table-right {
    flex-shrink: 0;
    .date {
      color: #fd6584;
    }
    .time {
      padding: 10px 0;
      color: #999;
    }
    .notic-time,
    .notic-user {
      color: #999;
    }
  }
}
</style>
