<template>
  <div class="admin" v-loading="loading">
    <div class="admin-top">
      <div class="admin-top-title">
        <h3 class="title">任务助手</h3>
        <span>六步完成教务系统基本设置</span>
      </div>
      <div class="admin-top-cards">
        <el-card class="card-item" v-for="(item, index) in cards" :key="index">
          <p>{{ item.name }}</p>
          <p class="card-item-desc">{{ item.desc }}</p>
          <el-button round v-if="item.status" type="info" disabled size="mini"
            >已完成</el-button
          >
          <el-button round v-else type="success" size="mini">未完成</el-button>
        </el-card>
      </div>
    </div>
    <div class="admin-center">
      <div class="center-data">
        <div class="center-data-title">
          <h3 class="title">数据概况</h3>
        </div>
        <ul class="center-data-content">
          <li class="data-item" v-for="(item, index) in dataList" :key="index">
            <p class="number" :class="item.type">
              {{ item.value }}
            </p>
            <p class="desc">{{ item.name }}</p>
          </li>
        </ul>
      </div>
      <Msg :data="msgData" />
    </div>
    <div class="admin-bottom">
      <ChartHead
        :tabs="tabs"
        @on-tab-change="tabChange"
        @on-date-change="dateChange"
      />
      <div v-if="tabIndex" class="chart-bar" v-loading="barLoading">
        <Eachertbar :xdata="barXData" :Yseries="barYData" />
        <div class="chart-bar-list">
          <h4 class="list-title">销售排名</h4>
          <ul class="list-content">
            <li
              class="list-item"
              v-for="(item, index) in barData.rank"
              :key="index"
            >
              <span class="list-item-name"
                ><span :class="{ bold: index < 3 }">{{ index + 1 }}</span>
                {{ item.name }}</span
              >
              <span class="list-item-number">{{ item.amount }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div v-else class="chart-line" v-loading="lineLoading">
        <Eachertline :xdata="lineXData" title="在线人数" :Yseries="lineYData" />
        <ul class="chart-line-data">
          <li>
            <p class="desc">累计在线人数</p>
            <p class="value">{{ lineData.total }}</p>
            <p class="percentage">
              上一周期
              <span class="pre-value">{{ lineData.prev_total }}</span>
              同比涨幅
              <span :class="isDown(lineData.total_rate)">{{
                lineData.total_rate
              }}</span>
            </p>
          </li>
          <li>
            <p class="desc">PC端在线人数</p>
            <p class="value">{{ lineData.pc }}</p>
            <p class="percentage">
              上一周期
              <span class="pre-value">{{ lineData.prev_pc }}</span>
              同比涨幅
              <span :class="isDown(lineData.pc_rate)">{{
                lineData.pc_rate
              }}</span>
            </p>
          </li>
          <li>
            <p class="desc">小程序在线人数</p>
            <p class="value">{{ lineData.wechat }}</p>
            <p class="percentage">
              上一周期
              <span class="pre-value">{{ lineData.prev_wechat }}</span>
              同比涨幅
              <span :class="isDown(lineData.wechat_rate)">{{
                lineData.wechat_rate
              }}</span>
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import ChartHead from "./components/chartHead";
import {
  getAdminWorkData,
  getVisitChart,
  getSaleChart,
} from "@/api/workbench.js";
import Msg from "../Msg/index";
export default {
  name: "Administrators",
  components: {
    ChartHead,
    Msg,
  },
  data() {
    return {
      tabIndex: 0,
      dateType: 2,
      loading: false,
      barData: {},
      barXData: [],
      barYData: [],
      barLoading: false,
      lineData: {},
      lineXData: [],
      lineYData: [],
      lineLoading: false,
      cards: [
        {
          name: "①设置角色权限",
          desc: "设置好角色人员权限 轻松分配工作",
          status: false,
        },
        {
          name: "②设置分类名称",
          desc: "将相关对象进行归纳整理，方便后期筛选区分",
          status: false,
        },
        {
          name: "③设置课程题库",
          desc: "设置后台的课程题库方便学生在线学习",
          status: false,
        },
        {
          name: "④设置仓库教材",
          desc: "设置机构仓库存储方便教务分发教材",
          status: false,
        },
        {
          name: "⑤设置收费项目",
          desc: "项目作为售卖的对象，包含课程、教材等配置信息",
          status: false,
        },
        {
          name: "⑥开始招生录入",
          desc: "跟进管理招生数据，包括客户缴费报名等操作",
          status: false,
        },
      ],
      dataList: [
        {
          name: "今日销售总额",
          value: 0,
          type: "primary",
        },
        {
          name: "今日付费订单",
          value: 0,
          type: "success",
        },
        {
          name: "今日登录用户",
          value: 0,
          type: "warning",
        },
        {
          name: "今日新增用户",
          value: 0,
          type: "error",
        },
        {
          name: "学员总数",
          value: 0,
          type: "primary",
        },
        {
          name: "本月销售总额",
          value: 0,
          type: "error",
        },
        {
          name: "本月直播总数",
          value: 0,
          type: "warning",
        },
        {
          name: "录播课程总数",
          value: 0,
          type: "primary",
        },
        {
          name: "班级个数",
          value: 0,
          type: "success",
        },
        {
          name: "教师总数",
          value: 0,
          type: "warning",
        },
      ],
      tabs: [
        {
          name: "访问量",
          value: 1,
        },
        {
          name: "销售额",
          value: 2,
        },
      ],
      msgData: [],
    };
  },
  watch: {
    dateType() {
      this.updateChart();
    },
  },
  created() {
    this.getAdminWorkData();
    this.getVisitChart();
  },
  methods: {
    isDown(val) {
      const reg = /^-/;
      return reg.test(val) ? "down" : "up";
    },
    // 切换时更新图表
    updateChart() {
      if (this.tabIndex) {
        this.getSaleChart();
      } else {
        this.getVisitChart();
      }
    },
    // 获取销售额
    async getSaleChart() {
      const data = {
        type: this.dateType,
      };
      this.barLoading = true;
      const res = await getSaleChart(data);
      this.barLoading = false;
      this.barData = res.data;
      console.log(res.data);
      this.barXData = res.data.x;
      this.barYData = res.data.y;
    },
    //獲取訪問量
    async getVisitChart() {
      const data = {
        type: this.dateType,
      };
      this.lineLoading = true;
      const res = await getVisitChart(data);
      this.lineLoading = false;
      this.lineData = res.data;
      this.lineXData = res.data.x;
      this.lineYData = res.data.y;
    },
    // 獲取工作台信息
    async getAdminWorkData() {
      this.loading = true;
      const res = await getAdminWorkData();
      this.loading = false;
      // 步驟完成情況
      const data = res.data || {};
      const helpes = Object.values(data?.helper || {});
      this.cards.forEach((item, index) => {
        item.status = helpes[index];
      });
      this.dataList[0].value = data.data?.day_amount || 0;
      this.dataList[1].value = data.data?.day_order_count || 0;
      this.dataList[2].value = data.data?.day_user_login || 0;
      this.dataList[3].value = data.data?.day_user_increase || 0;
      this.dataList[4].value = data.data?.user_total_count || 0;
      this.dataList[5].value = data.data?.month_amount || 0;
      this.dataList[6].value = data.data?.month_live_count || 0;
      this.dataList[7].value = data.data?.video_count || 0;
      this.dataList[8].value = data.data?.class_count || 0;
      this.dataList[9].value = data.data?.teacher_count || 0;
      this.msgData = data.message || [];
    },
    dateChange(type) {
      this.dateType = type;
    },
    tabChange(index) {
      this.tabIndex = index;
      this.updateChart();
    },
  },
};
</script>
<style lang="scss" scoped>
.admin {
  .title {
    font-weight: normal;
    margin-right: 16px;
  }
  .desc {
    color: #909399;
    font-size: 14px;
  }
  .primary {
    color: #199fff;
  }
  .warning {
    color: #fdc400;
  }
  .error {
    color: #fd6500;
  }
  .success {
    color: #43d100;
  }
  .admin-top {
    padding: 20px;
    border: 1px solid #dcdfe6;
    .admin-top-title {
      display: flex;
      align-items: center;

      span {
        font-size: 14px;
        color: #909399;
      }
    }
    .admin-top-cards {
      display: flex;
      justify-content: space-around;
      padding-top: 20px;
      .card-item {
        width: 200px;
        min-height: 140px;
        margin-right: 10px;
        &:last-child {
          margin-right: 0;
        }
        text-align: center;
        & /deep/.el-card__body {
          height: 100%;
          padding: 16px 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
        }
        .card-item-desc {
          color: #909399;
          font-size: 13px;
        }
        button {
          padding: 4px 16px;
        }
      }
    }
  }
  .admin-center {
    display: flex;
    margin-top: 10px;
    .center-data {
      border: 1px solid #dcdfe6;
      flex: 1;
      margin-right: 10px;
      padding: 20px;
      .center-data-content {
        display: flex;
        flex-wrap: wrap;
        margin: 15px 20px 0px 20px;
        border-top: 1px solid #e4e7ed;
        border-left: 1px solid #e4e7ed;
        .data-item {
          width: calc(100% / 5);
          padding: 24px 10px;
          text-align: center;
          border-right: 1px solid #e4e7ed;
          border-bottom: 1px solid #e4e7ed;
          .number {
            font-size: 28px;
          }
        }
      }
    }
  }
  .admin-bottom {
    height: 500px;
    margin-top: 16px;
    .chart-line {
      height: 100%;
      display: flex;
      justify-content: space-between;
      .chart-line-data {
        flex: 1;
        text-align: center;
        li {
          text-align: left;
          margin-bottom: 30px;
          .value {
            font-size: 26px;
            color: #606266;
            line-height: 40px;
          }
          .percentage {
            color: #c0c4cc;
            font-size: 14px;
          }
          .pre-value {
            margin: 0 10px;
          }
          .up {
            color: #43d100;
            &::after {
              margin: 0 6px 4px 12px;
              display: inline-block;
              content: "";
              border: 6px solid #fff;
              border-bottom-color: #43d100;
            }
          }
          .down {
            color: #fd6500;
            &::after {
              margin: 0 6px -4px 12px;
              display: inline-block;
              content: "";
              border: 6px solid #fff;
              border-top-color: #fd6500;
            }
          }
        }
      }
    }
    .chart-bar {
      height: 100%;
      display: flex;
      justify-content: space-between;
      .chart-bar-list {
        flex: 1;
        .list-title {
          font-size: 18px;
          font-weight: 500;
          margin-bottom: 25px;
        }
        .list-content {
          .list-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20px;
            color: #606266;
            font-size: 14px;
            .list-item-name {
              span {
                display: inline-block;
                margin-right: 20px;
                width: 22px;
                height: 22px;
                line-height: 22px;
                text-align: center;
                background-color: #f0f2f5;
                border-radius: 50%;
                color: #606266;
              }
              .bold {
                color: #fff;
                background-color: #314659;
              }
            }
          }
        }
      }
    }
  }
}
</style>