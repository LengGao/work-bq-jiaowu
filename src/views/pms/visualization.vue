<template>
  <div class="workbench">
    <div class="workbench-header">
      <div class="avatars">
        <div class="avatar-item" v-if="!checkedData.length">
          <img v-if="userInfo.head_photo" :src="userInfo.head_photo" alt="" />
          <span v-else>{{ (userInfo.staff_name || "").substr(-2) }}</span>
        </div>
        <!-- <div class="user-info">
          <p class="user-info-name">张老师</p>
          <p class="user-info-type">招生主管</p>
        </div> -->
        <div
          class="avatar-item"
          v-for="item in checkedData"
          :key="item.id"
          :style="{
            backgroundColor: item.backgroundColor,
          }"
          :title="item.title"
        >
          <img v-if="item.head_photo" :src="item.head_photo" alt="" />
          <span v-else>{{
            item.type === "user"
              ? (item.title || "").substr(-2)
              : (item.title || "").substr(0, 2)
          }}</span>
        </div>
      </div>

      <div class="actions">
        <el-button
          type="text"
          class="reset"
          @click="handlUserReset"
          v-if="checkedData.length"
          >重置
        </el-button>
        <el-popover
          placement="bottom"
          trigger="manual"
          popper-class="poper-select"
          v-model="userPopver"
        >
          <el-button
            type="text"
            slot="reference"
            @click="userPopver = !userPopver"
            >切换查看范围
            <i class="el-icon-arrow-down"></i>
          </el-button>
          <div class="form-item">
            <el-select
              multiple
              clearable
              v-model="checkedRangeIds"
              filterable
              placeholder="请选择查看范围"
            >
              <el-option
                v-for="(item, index) in rangeOptions"
                :key="index"
                :label="item.title"
                :value="item.id"
              >
                <span style="float: left">{{ item.title }}</span>
                <span
                  style="
                    float: right;
                    color: #8492a6;
                    font-size: 13px;
                    margin: 0 15px 0 10px;
                  "
                  >{{ item.group_tree }}</span
                >
              </el-option>
            </el-select>
          </div>
          <div class="form-item">
            <el-button type="primary" @click="handleOk">确 定</el-button>
          </div>
        </el-popover>
      </div>
      <div class="returned-type">
        <span class="returned-type-title">回款统计方式</span>
        <el-radio-group v-model="returnedType">
          <el-radio :label="1">按回款创建时间</el-radio>
          <el-radio :label="2">按申请入账时间</el-radio>
        </el-radio-group>
      </div>
    </div>
    <el-tabs v-model="activeName" class="workbench-tab">
      <el-tab-pane label="工作提醒" name="WorkReminder"> </el-tab-pane>
      <el-tab-pane label="数据看板" name="DataStatistics"></el-tab-pane>
    </el-tabs>

    <template v-if="activeName">
      <component
        :is="getComponent"
        :user-ids="userIds"
        :returned-type="returnedType"
      />
    </template>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { getUserId, getGroupWithUser } from "@/api/workbench";
export default {
  name: "visualization",
  data() {
    return {
      activeName: "WorkReminder",
      departMentOptions: [],
      rangeOptions: [],
      checkedRangeIds: [],
      checkedData: [],
      userPopver: false,
      userIds: [],
      returnedType: 1,
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    getComponent() {
      if (this.activeName) {
        return () => import(`./components/${this.activeName}/index`);
      }
      return "";
    },
  },
  created() {
    this.getGroupWithUser();
  },
  methods: {
    handlUserReset() {
      this.checkedData = [];
      this.checkedRangeIds = [];
      this.userIds = [];
    },
    handleOk() {
      const checkedData = [];
      const uIds = [];
      const departmentIds = [];
      this.rangeOptions.forEach((item) => {
        if (this.checkedRangeIds.includes(item.id)) {
          checkedData.push({
            ...item,
            backgroundColor:
              "#" + Math.random().toString(16).substr(2, 6).toUpperCase(),
          });
          if (item.type === "user") {
            uIds.push(item.id);
          } else {
            departmentIds.push(item.id);
          }
        }
      });
      this.getUserId(uIds, departmentIds, checkedData);
    },
    async getGroupWithUser() {
      const res = await getGroupWithUser();
      this.rangeOptions = [
        {
          title: "全部数据",
          id: 0,
          type: "group",
          group_tree: "-",
        },
      ].concat(res.data || []);
    },
    async getUserId(arr_uid, arr_group, checkedData) {
      const data = {
        arr_uid,
        arr_group,
      };
      const res = await getUserId(data);
      if (res.code === 0) {
        this.userIds = res.data;
        this.checkedData = checkedData;
        this.userPopver = false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.workbench {
  padding: 35px;
  .workbench-header {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .avatars {
      display: flex;
      align-items: center;
      padding-right: 16px;
      .avatar-item {
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #199f;
        color: #fff;
        cursor: pointer;
        font-size: 14px;
        border-radius: 50%;
        margin-right: 10px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .user-info {
        &-type {
          font-size: 14px;
          color: #666;
        }
      }
    }

    .actions {
      padding-left: 16px;
      position: relative;
      .reset {
        margin-right: 10px;
        color: red;
      }
      &::before {
        position: absolute;
        top: 0;
        left: 0;
        content: "";
        width: 2px;
        height: 100%;
        background-color: #e4e7ed;
      }
    }
    .returned-type {
      margin-left: auto;
      &-title {
        margin-right: 10px;
      }
    }
  }
  .workbench-tab {
    position: relative;
    /deep/.el-tabs__item {
      font-size: 16px;
    }
  }
}
</style>
<style lang="less">
.poper-select {
  padding: 20px;
  .form-item {
    margin-bottom: 16px;
    &-title {
      padding: 10px 0;
    }
    button {
      width: 100%;
    }
  }
}
</style>