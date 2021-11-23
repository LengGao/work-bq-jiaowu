<template>
  <div class="workbench">
    <div class="workbench-header">
      <div class="avatars">
        <div class="avatar-item">
          <img v-if="userInfo.head_photo" :src="userInfo.head_photo" alt="" />
          <span v-else>{{ userInfo.staff_name.substr(-2) }}</span>
        </div>
        <!-- <div class="user-info">
          <p class="user-info-name">张老师</p>
          <p class="user-info-type">招生主管</p>
        </div> -->
        <div
          class="avatar-item"
          v-for="item in checkedUser"
          :key="item.staff_id"
        >
          <span>{{ item.staff_name.substr(-2) }}</span>
        </div>
      </div>

      <div class="actions">
        <el-button
          type="text"
          class="reset"
          @click="handlUserReset"
          v-if="checkedUser.length"
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
            <p class="form-item-title">部门数据</p>
            <el-cascader
              :options="departMentOptions"
              placeholder="请选择部门"
              clearable
              filterable
              :props="{
                value: 'id',
                label: 'title',
                multiple: true,
              }"
              v-model="departmentIds"
              @change="getBindUser"
            ></el-cascader>
          </div>
          <div class="form-item">
            <p class="form-item-title">人员数据</p>
            <el-select
              multiple
              clearable
              v-model="checkedUserIds"
              filterable
              placeholder="请选择人员"
            >
              <el-option
                v-for="(item, index) in userOptions"
                :key="index"
                :label="item.staff_name"
                :value="item.staff_id"
              >
              </el-option>
            </el-select>
          </div>
          <div class="form-item">
            <el-button type="primary" @click="handleOk">确 定</el-button>
          </div>
        </el-popover>
      </div>
    </div>
    <el-tabs v-model="activeName" class="workbench-tab">
      <el-tab-pane label="数据看板" name="DataStatistics"></el-tab-pane>
      <el-tab-pane label="工作提醒" name="WorkReminder"> </el-tab-pane>
    </el-tabs>
    <template v-if="activeName">
      <component :is="getComponent" :user-ids="userIds" />
    </template>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { terminalGroup, getBindUser } from "@/api/workbench";
export default {
  name: "visualization",
  data() {
    return {
      activeName: "DataStatistics",
      departMentOptions: [],
      userOptions: [],
      departmentIds: [],
      checkedUserIds: [],
      checkedUser: [],
      userPopver: false,
      userIds: [],
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
    this.terminalGroup();
  },
  methods: {
    handlUserReset() {
      this.checkedUser = [];
      this.checkedUserIds = [];
      this.userIds = [];
    },
    handleOk() {
      this.checkedUser = this.userOptions.filter((item) =>
        this.checkedUserIds.includes(item.staff_id)
      );
      this.userPopver = false;
      this.userIds = this.checkedUserIds;
    },
    async getBindUser() {
      this.userOptions = [];
      this.checkedUserIds = [];
      const data = {
        group_id: this.departmentIds.map((item) =>
          Array.isArray(item) ? [...item].pop() : item
        ),
      };
      const res = await getBindUser(data);
      this.userOptions = res.data;
    },
    async terminalGroup() {
      const res = await terminalGroup();
      if (res.code === 0) {
        this.departMentOptions = res.data;
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
  }
  .workbench-tab /deep/.el-tabs__item {
    font-size: 16px;
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