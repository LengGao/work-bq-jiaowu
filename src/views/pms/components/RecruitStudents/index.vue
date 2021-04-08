<template>
  <div class="recruit-students" v-loading="loading">
    <div class="container-top">
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
    </div>
    <div class="container-bottom">
      <div class="remind">
        <h4 class="remind-title">待办提醒</h4>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <!-- 代办类型 -1 全部 0 驳回 1未开始 2 进行中 3已经完成 -->
          <el-tab-pane label="全部" name="-1"></el-tab-pane>
          <el-tab-pane label="未开始" name="1"></el-tab-pane>
          <el-tab-pane label="进行中" name="2"></el-tab-pane>
          <el-tab-pane label="已完成" name="3"></el-tab-pane>
        </el-tabs>
        <div class="remind-content">
          <el-table
            ref="multipleTable"
            :data="remindList"
            v-loading="remindLoading"
            element-loading-text="loading"
            element-loading-spinner="el-icon-loading"
            element-loading-background="#fff"
            :header-cell-style="{
              'text-align': 'center',
              background: '#f8f8f8',
            }"
            height="430"
            :cell-style="{ 'text-align': 'center' }"
            style="margin-bottom: 10px"
          >
            <el-table-column label="编号" width="50" type="index">
            </el-table-column>
            <el-table-column
              prop="create_time"
              label="创建时间"
              min-width="140"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="type_name"
              label="待办类型"
              min-width="110"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="describe"
              label="待办事项"
              min-width="180"
              show-overflow-tooltip
            >
              <template slot-scope="{ row }">
                <div>
                  <span>{{ row.describe }}</span>
                  <el-button
                    style="margin-left: 6px"
                    v-if="followRoute[row.follow_type]"
                    type="text"
                    @click="
                      linkTo(followRoute[row.follow_type], row.param_list || {})
                    "
                    >去跟进></el-button
                  >
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="update_time"
              label="完成状态"
              min-width="140"
              show-overflow-tooltip
            >
              <template slot-scope="{ row }">
                <el-popover placement="bottom" width="40" trigger="click">
                  <el-button
                    slot="reference"
                    type="text"
                    :style="{ color: statusMap[row.follow_state].color }"
                    >{{ statusMap[row.follow_state].text }}</el-button
                  >
                  <ul class="status-list">
                    <li
                      style="color: #fd6500"
                      v-if="row.follow_state !== 1"
                      @click="updateState(row, 1)"
                    >
                      未开始
                    </li>
                    <li
                      style="color: #fdc400"
                      v-if="row.follow_state !== 2"
                      @click="updateState(row, 2)"
                    >
                      进行中
                    </li>
                    <li
                      style="color: #43d100"
                      v-if="row.follow_state !== 3"
                      @click="updateState(row, 3)"
                    >
                      已完成
                    </li>
                  </ul>
                </el-popover>
                <!-- <el-select
                  v-model="row.follow_state"
                  placeholder="请选择"
                  style="width: 80px"
                >
                  <el-option label="未开始" value="1"> </el-option>
                  <el-option label="进行中" value="2"> </el-option>
                  <el-option label="已完成" value="3"> </el-option>
                </el-select> -->
              </template>
            </el-table-column>
          </el-table>
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
      <Msg :data="msgData" />
    </div>
    <AddEntry :visible.sync="dialogVisible" @on-ok="setStaffQuickEntry" />
  </div>
</template>
<script>
import Msg from "../Msg/index";
import AddEntry from "./components/addEntry";
import { followRoute } from "@/utils/index";
import {
  getStaffWorkData,
  getFollowPage,
  setStaffQuickEntry,
  updateState,
} from "@/api/workbench.js";
export default {
  name: "RecruitStudents",
  components: {
    Msg,
    AddEntry,
  },
  data() {
    return {
      followRoute,
      activeName: "-1",
      loading: false,
      msgData: [],
      entrys: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      remindList: [],
      remindLoading: false,
      dialogVisible: false,
      statusMap: {
        //代办类型 -1 全部 0 驳回 1未开始 2 进行中 3已经完成
        0: {
          text: "驳回",
          color: "#FD6500",
        },
        1: {
          text: "未开始",
          color: "#FD6500",
        },
        2: {
          text: "进行中",
          color: "#FDC400",
        },
        3: {
          text: "已完成",
          color: "#43D100",
        },
      },
    };
  },
  created() {
    this.getStaffWorkData();
    this.getFollowPage();
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
    // 更新待办状态
    async updateState(row, follow_state) {
      document.body.click();
      const data = {
        id: row.id,
        follow_state,
      };
      const res = await updateState(data);
      if (res.code === 0) {
        row.follow_state = follow_state;
        this.$message.success(res.message);
      }
    },
    //获取待办提醒
    async getFollowPage() {
      const data = {
        follow_state: this.activeName,
        limit: this.pageSize,
        page: this.pageNum,
      };
      this.remindLoading = true;
      const res = await getFollowPage(data);
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
      this.getFollowPage();
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.pageNum = 1;
      this.getFollowPage();
    },
    handleCurrentChange(page) {
      this.pageNum = page;
      this.getFollowPage();
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
.recruit-students {
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

  .container-top {
    .entry {
      padding: 20px;
      border: 1px solid #dcdfe6;
      margin-bottom: 20px;
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
  }

  .container-bottom {
    display: flex;
    justify-content: space-between;
    .remind {
      padding: 20px;
      border: 1px solid #dcdfe6;
      flex: 2;
      margin-right: 20px;
      .remind-title {
        font-weight: normal;
      }
      /deep/.el-tabs__item:last-child {
        margin-right: 40px;
      }
      .remind-content {
      }
    }
    .msg {
      flex: 1;
    }
  }
}
.status-list {
  text-align: center;
  li {
    padding: 6px 12px;
    cursor: pointer;
    &:hover {
      background-color: #ecf5ff;
    }
  }
}
</style>