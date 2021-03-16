<template>
  <div class="recruit-students">
    <div class="container-left">
      <div class="entry">
        <h3 class="entry-title">常用入口</h3>
        <div class="entry-content">
          <div class="entry-item" v-for="(item, index) in entrys" :key="index">
            <div class="entry-icon" :class="`bc-${index + 1}`">
              <i class="el-icon-tickets"></i>
            </div>
            <span class="entry-name">{{ item.name }}</span>
          </div>
          <div class="entry-item entry-add">
            <el-button type="info" icon="el-icon-plus">编辑入口</el-button>
          </div>
        </div>
      </div>
      <div class="remind">
        <h3 class="remind-title">待办提醒</h3>
        <span class="more"> 更多 </span>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="全部" name="1"></el-tab-pane>
          <el-tab-pane label="待跟进" name="2"></el-tab-pane>
          <el-tab-pane label="待回访" name="3"></el-tab-pane>
          <el-tab-pane label="待续费" name="4"></el-tab-pane>
        </el-tabs>
        <div class="remind-content">
          <ul class="remind-list">
            <li>
              对 天河校区 客户 林伽伽 在 2021-01-09 10:00 进行跟进回访，去处理
            </li>
            <li>
              对 天河校区 客户 林伽伽 在 2021-01-09 10:00 进行跟进回访，去处理
            </li>
            <li>
              对 天河校区 客户 林伽伽 在 2021-01-09 10:00 进行跟进回访，去处理
            </li>
            <li>
              对 天河校区 客户 林伽伽 在 2021-01-09 10:00 进行跟进回访，去处理
            </li>
            <li>
              对 天河校区 客户 林伽伽 在 2021-01-09 10:00 进行跟进回访，去处理
            </li>
            <li>
              对 天河校区 客户 林伽伽 在 2021-01-09 10:00 进行跟进回访，去处理
            </li>
            <li>
              对 天河校区 客户 林伽伽 在 2021-01-09 10:00 进行跟进回访，去处理
            </li>
            <li>
              对 天河校区 客户 林伽伽 在 2021-01-09 10:00 进行跟进回访，去处理
            </li>
            <li>
              对 天河校区 客户 林伽伽 在 2021-01-09 10:00 进行跟进回访，去处理
            </li>
            <li>
              对 天河校区 客户 林伽伽 在 2021-01-09 10:00 进行跟进回访，去处理
            </li>
            <li>
              对 天河校区 客户 林伽伽 在 2021-01-09 10:00 进行跟进回访，去处理
            </li>
            <li>
              对 天河校区 客户 林伽伽 在 2021-01-09 10:00 进行跟进回访，去处理
            </li>
            <li>
              对 天河校区 客户 林伽伽 在 2021-01-09 10:00 进行跟进回访，去处理
            </li>
            <li>
              对 天河校区 客户 林伽伽 在 2021-01-09 10:00 进行跟进回访，去处理
            </li>
            <li>
              对 天河校区 客户 林伽伽 在 2021-01-09 10:00 进行跟进回访，去处理
            </li>
            <li>
              对 天河校区 客户 林伽伽 在 2021-01-09 10:00 进行跟进回访，去处理
            </li>
            <li>
              对 天河校区 客户 林伽伽 在 2021-01-09 10:00 进行跟进回访，去处理
            </li>
          </ul>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="container-right">
      <Msg />
    </div>
  </div>
</template>
<script>
import Msg from "../Msg/index";
export default {
  name: "RecruitStudents",
  components: {
    Msg,
  },
  data() {
    return {
      activeName: "1",
      entrys: [
        {
          name: "客户管理",
        },
        {
          name: "收费管理",
        },
        {
          name: "客户管理",
        },
        {
          name: "课程管理",
        },
        {
          name: "客户管理",
        },
        {
          name: "客户管理",
        },
        {
          name: "客户管理",
        },
        {
          name: "客户管理",
        },
        {
          name: "客户管理",
        },
      ],
      currentPage: 1,
    };
  },
  created() {
    console.log("created ---------------");
  },
  methods: {
    handleClick() {
      console.log(2222);
    },
    handleSizeChange(size) {
      console.log(size);
    },
    handleCurrentChange(page) {
      console.log(page);
    },
  },
};
</script>
<style lang="scss" scoped>
.recruit-students {
  display: flex;
  justify-content: space-between;
  .bc-1 {
    background-color: #199fff;
  }
  .bc-2 {
    background-color: #43d100;
  }
  .bc-3 {
    background-color: #fd6500;
  }
  .bc-4 {
    background-color: #cc4eff;
  }
  .bc-5 {
    background-color: #199fff;
  }
  .bc-6 {
    background-color: #43d100;
  }
  .bc-7 {
    background-color: #fd6500;
  }
  .bc-8 {
    background-color: #cc4eff;
  }
  .bc-9 {
    background-color: #199fff;
  }
  .container-left {
    margin-right: 10px;
  }
  .entry {
    padding: 20px;
    border: 1px solid #dcdfe6;
    margin-bottom: 10px;
    .entry-title {
      font-weight: normal;
    }
    .entry-content {
      display: flex;
      flex-wrap: wrap;
      padding: 15px 20px 5px 20px;
      .entry-item {
        width: calc(100% / 5);
        display: flex;
        align-items: center;
        margin-bottom: 16px;
        justify-content: center;
        .entry-icon {
          border-radius: 50%;
          width: 50px;
          height: 50px;
          margin-right: 16px;
          text-align: center;
          line-height: 50px;
          color: #fff;
          font-size: 25px;
        }
      }
      .entry-add {
        button {
          border-radius: 30px;
        }
      }
    }
  }
  .remind {
    padding: 20px;
    border: 1px solid #dcdfe6;
    height: 500px;
    position: relative;
    .remind-title {
      font-weight: normal;
    }
    .more {
      right: 20px;
      top: 55px;
      color: #199fff;
      font-size: 14px;
      z-index: 10;
      cursor: pointer;
      position: absolute;
    }
    .remind-content {
      .remind-list {
        height: 350px;
        overflow-y: auto;
        li {
          line-height: 30px;
        }
      }
    }
  }
}
</style>