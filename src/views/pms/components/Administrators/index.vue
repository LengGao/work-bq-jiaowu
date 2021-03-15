<template>
  <div class="admin">
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
            <p class="number" :class="item.type">{{formartNum(item.value ) }}</p>
            <p class="desc" >{{ item.name }}</p>
          </li>
        </ul>
      </div>
      <div class="center-msg">
        <div class="center-msg-title">
          <h3 class="title">消息中心</h3>
          <span class="more">更多</span>
        </div>
        <ul class="center-msg-content">
            <li class="msg-item" v-for="(item,index) in msgList" :key="index">
                <span class="msg-item-info">{{item.info}}</span>
                <span class="msg-item-date">{{item.date}}</span>
            </li>
        </ul>
      </div>
    </div>
    <div class="admin-bottom">
        <ChartHead :tabs="tabs" />
    </div>
  </div>
</template>
<script>
import ChartHead from './components/chartHead'
export default {
  name: "Administrators",
  components:{
      ChartHead
  },
  data() {
    return {
      cards: [
        {
          name: "①设置角色权限",
          desc: "设置好角色人员权限 轻松分配工作",
          status: 1,
        },
        {
          name: "②设置分类名称",
          desc: "将相关对象进行归纳整理，方便后期筛选区分",
          status: 1,
        },
        {
          name: "③设置课程题库",
          desc: "设置后台的课程题库方便学生在线学习",
          status: 1,
        },
        {
          name: "④设置仓库教材",
          desc: "设置机构仓库存储方便教务分发教材",
          status: 1,
        },
        {
          name: "⑤设置收费项目",
          desc: "项目作为售卖的对象，包含课程、教材等配置信息",
          status: 1,
        },
        {
          name: "⑥开始招生录入",
          desc: "跟进管理招生数据，包括客户缴费报名等操作",
          status: 0,
        },
      ],
      dataList: [
        {
          name: "今日销售总额",
          value: 650000,
          type:'primary'
        },
        {
          name: "今日付费订单",
          value: 650000,
          type:'success'
        },
        {
          name: "今日登录用户",
          value: 650000,
          type:'warning'
        },
        {
          name: "今日新增用户",
          value: 650000,
          type:'error'
        },
        {
          name: "学员总数",
          value: 125000,
          type:'primary'
        },
        {
          name: "本月销售总额",
          value: 6589900000,
          type:'error'
        },
        {
          name: "本月直播总数",
          value: 650000,
           type:'warning'
        },
        {
          name: "录播课程总数",
          value: 321,
           type:'primary'
        },
        {
          name: "班级个数",
          value: 233,
          type:'success'
        },
        {
          name: "教师总数",
          value: 22,
           type:'warning'
        },
      ],
      msgList:[
          {
              info:'教务系统V6版本功能功能功能功能',
              date:'2021-01-01'
          },
          {
              info:'教务系统V6版本功能功能功能功能',
              date:'2021-01-01'
          },
          {
              info:'教务系统V6版本功能功能功能功能',
              date:'2021-01-01'
          },
          {
              info:'教务系统V6版本功能功能功能功能',
              date:'2021-01-01'
          }
      ],
      tabs:[
          {
              name:'访问量',
              value:1
          },
          {
              name:'销售额',
              value:2
          }
      ]
    };
  },
  methods:{
      formartNum(val,isMoney){
          if(isMoney){
             val = val.toFixed(2)
          }
          return val.toLocaleString()
      }
  }
};
</script>
<style lang="scss" scoped>
.admin {
  .title {
    font-weight: normal;
    margin-right: 16px;
  }
  .desc{
      color: #909399;
      font-size: 14px;
  }
  .primary{
      color: #199FFF;
  }
  .warning{
      color: #FDC400;
  }
  .error{   
      color: #FD6500;
  }
  .success{
       color: #43D100;
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
          .number{
              font-size: 28px;
          }
        
        }
      }
    }
    .center-msg {
      width: 335px;
      padding: 16px;
      border: 1px solid #dcdfe6;
      .center-msg-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .more {
          color: #199fff;
          font-size: 14px;
          cursor: pointer;
        }
      }
      .center-msg-content{
          padding-top: 10px;
          .msg-item{
              display: flex;
              justify-content: space-between;
              line-height: 30px;
              color: #909399;
              .msg-item-info{
                  text-overflow: ellipsis;
                  overflow: hidden;
                  white-space: nowrap;
                  font-size: 14px;
              }
            .msg-item-date{
                width: 100px;
                flex-shrink: 0;
                text-align: right;
            }
          }
      }
    }
  }
  .admin-bottom{
      margin-top: 16px;
  }
}
</style>