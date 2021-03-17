<template>
  <div class="recruit-students" v-loading="loading">
    <div class="container-left">
      <div class="entry">
        <h4 class="entry-title">常用入口</h4>
        <div class="entry-content">
          <div
            class="entry-item"
            v-for="(item, index) in entrys"
            :key="index"
            @click="handleEntryLink(item.node)"
          >
            <div class="entry-icon" :class="`bc-${index + 1}`">
              <i class="el-icon-tickets"></i>
            </div>
            <span class="entry-name">{{ item.menu_name }}</span>
          </div>
          <div class="entry-item entry-add">
            <el-button type="info" @click="handleOpen" icon="el-icon-plus"
              >编辑入口</el-button
            >
          </div>
        </div>
      </div>
      <div class="remind">
        <h4 class="remind-title">待办提醒</h4>
        <span class="more"> 更多 </span>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <!-- all: 全部, 0：待跟进，1：已跟进/跟进中，2：就读中，3、已毕业 4、放弃跟进 5、复活跟进， 6、复活意向跟进 -->
          <el-tab-pane label="全部" name="all"></el-tab-pane>
          <el-tab-pane label="待跟进" name="0"></el-tab-pane>
          <el-tab-pane label="已跟进/跟进中" name="1"></el-tab-pane>
          <el-tab-pane label="就读中" name="2"></el-tab-pane>
          <el-tab-pane label="已毕业" name="3"></el-tab-pane>
          <el-tab-pane label="放弃跟进" name="4"></el-tab-pane>
          <el-tab-pane label="复活跟进" name="5"></el-tab-pane>
          <el-tab-pane label="复活意向跟进" name="6"></el-tab-pane>
        </el-tabs>
        <div class="remind-content">
          <ul class="remind-list" v-loading="remindLoading">
            <li v-for="(item, index) in remindList" :key="index">
              <span>{{ index + 1 }}、</span>
              <span class="name">{{ item.user_realname }}</span>
              {{ item.desc }}跟进人：
              <span class="name">{{ item.staff_name }}</span
              >， 跟进时间：<span class="date">{{ item.todo_time }}；</span>
            </li>
            <li v-if="!remindList.length" class="no-data">暂无相关提醒</li>
          </ul>
          <!-- :page-size="100" -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="[10, 20, 30]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="container-right">
      <Msg :data="msgData" />
    </div>
    <AddEntry :visible.sync="dialogVisible" @on-ok="setStaffQuickEntry" />
  </div>
</template>
<script>
import Msg from "../Msg/index";
import AddEntry from "./components/addEntry";
import {
  getStaffWorkData,
  getStaffBacklog,
  setStaffQuickEntry,
} from "@/api/workbench.js";
export default {
  name: "RecruitStudents",
  components: {
    Msg,
    AddEntry,
  },
  data() {
    return {
      activeName: "all",
      loading: false,
      msgData: [],
      entrys: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      remindList: [],
      remindLoading: false,
      dialogVisible: false,
    };
  },
  created() {
    this.getStaffWorkData();
    this.getStaffBacklog();
  },
  methods: {
    handleOpen() {
      this.dialogVisible = true;
    },
    handleEntryLink(name) {
      this.$router.push({ name });
    },
    async setStaffQuickEntry(ids) {
      const data = {
        menu_ids_arr: ids,
      };
      const res = await setStaffQuickEntry(data);
      if (res.code === 0) {
        this.$message.success("编辑成功");
        this.getStaffWorkData();
      }
    },
    //获取待办提醒
    async getStaffBacklog() {
      const data = {
        type: this.activeName,
        limit: this.pageSize,
        page: this.pageNum,
      };
      this.remindLoading = true;
      const res = await getStaffBacklog(data);
      this.remindLoading = false;
      if (res.code === 0) {
        this.total = res.data.total;
        this.remindList = res.data.list;
      }
    },
    // 获取招生、教务工作台信息
    async getStaffWorkData() {
      this.loading = true;
      const res = await getStaffWorkData();
      this.loading = false;
      this.msgData = res.data?.message || [];
      this.entrys = res.data?.quick_entry;
    },
    handleClick() {
      this.getStaffBacklog();
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.pageNum = 1;
      this.getStaffBacklog();
    },
    handleCurrentChange(page) {
      this.pageNum = page;
      this.getStaffBacklog();
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
    flex: 1;
  }

  .entry {
    padding: 20px;
    border: 1px solid #dcdfe6;
    margin-bottom: 10px;
    min-height: 220px;
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
        padding: 6px;
        // justify-content: center;
        font-size: 14px;
        cursor: pointer;
        border-radius: 15px;
        transition: all 0.4s;
        &:hover {
          background-color: #ecf5ff;
        }
        .entry-icon {
          border-radius: 50%;
          width: 50px;
          height: 50px;
          margin-right: 16px;
          text-align: center;
          line-height: 50px;
          color: #fff;
          font-size: 25px;
          flex-shrink: 0;
        }
      }
      .entry-add {
        &:hover {
          background-color: #fff;
        }
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
    /deep/.el-tabs__item:last-child {
      margin-right: 40px;
    }
    .more {
      right: 20px;
      top: 52px;
      color: #199fff;
      font-size: 12px;
      z-index: 10;
      cursor: pointer;
      position: absolute;
    }
    .remind-content {
      .remind-list {
        height: 350px;
        overflow-y: auto;
        li {
          font-size: 14px;
          margin-bottom: 12px;
          color: #606266;
          .name {
            color: #199fff;
          }
          .date {
            color: #c0c4cc;
          }
        }
        .no-data {
          font-size: 12px;
          color: #c0c4cc;
          text-align: center;
          padding-top: 100px;
        }
      }
    }
  }
}
</style>