<template>
  <section>
    <div class="head_remind">
      *用户中心用来显示访问过东培学堂的所有用户，当出现修改手机号提示<span
        style="color: #f56c6c"
        >“
        该用户已经使用了您要修改的新手机号（uid）访问过小程序，系统有了这个手机用户记录，无法直接改成该手机号。
        ”</span
      >可在本页面禁用该用户。
    </div>
    <div class="mainPart">
      <!--搜索模块-->
      <header>
        <SearchList
          :options="searchOptions"
          :data="searchData"
          @on-search="handleSearch"
        />
      </header>
      <!--列表-->
      <div class="userTable">
        <el-table
          ref="multipleTable"
          :data="listData"
          v-loading="listLoading"
          element-loading-text="loading"
          element-loading-spinner="el-icon-loading"
          element-loading-background="#fff"
          :header-cell-style="{ 'text-align': 'center', background: '#f8f8f8' }"
        >
          <el-table-column
            prop="uid"
            label="uid"
            show-overflow-tooltip
            width="70"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="user_realname"
            label="学生姓名"
            min-width="120"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <img
                class="avatar"
                v-if="row.user_img"
                :src="row.user_img"
                alt=""
              />
              <el-button type="text" @click="toStudentDetail(row.uid)">
                {{ row.user_realname }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="user_nicename"
            label="昵称"
            show-overflow-tooltip
            width="100"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="sex"
            label="性别"
            min-width="80"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <span v-if="row.sex === 1">男</span>
              <span v-else-if="row.sex === 2">女</span>
              <span v-else>未知</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="telphone"
            label="手机号码"
            min-width="130"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <PartiallyHidden :value="row.telphone" />
            </template>
          </el-table-column>
          <el-table-column
            prop="order_count"
            align="center"
            label="订单数"
            min-width="70"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="course_count"
            label="开课数"
            align="center"
            min-width="70"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="class_count"
            label="班级数"
            align="center"
            min-width="70"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="pc_openid"
            label="PC端"
            min-width="100"
            align="center"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <el-button
                v-if="row.pc_openid"
                type="text"
                @click="clearStudentInfo(row, 'pc')"
                >清除登录信息</el-button
              >
              <span v-else style="color: #999">未登录</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="apple_openid"
            label="小程序端"
            min-width="100"
            align="center"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <el-button
                v-if="row.apple_openid"
                @click="clearStudentInfo(row, 'mini')"
                type="text"
                >清除登录信息</el-button
              >
              <span v-else style="color: #999">未登录</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="from_organization_name"
            label="所属机构"
            align="center"
            min-width="140"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="staff_name"
            label="归属人"
            align="center"
            min-width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="state"
            label="状态"
            align="center"
            min-width="80"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <el-switch
                v-model="row.state"
                active-color="#2798ee"
                inactive-color="#eaeefb"
                :active-value="1"
                :inactive-value="2"
                @change="
                  clearStudentInfo(row, row.state === 1 ? 'open' : 'close')
                "
              >
              </el-switch>
            </template>
          </el-table-column>

          <el-table-column
            label="操作"
            align="center"
            fixed="right"
            min-width="80"
          >
            <template slot-scope="{ row }">
              <el-button type="text" @click="toStudentDetail(row.uid)"
                >学生详情</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div class="table_bottom">
          <page
            :data="listTotal"
            :curpage="pageNum"
            @pageChange="handlePageChange"
            @pageSizeChange="handleSizeChange"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import PartiallyHidden from "@/components/PartiallyHidden/index";
import { getStudentUsersList, clearStudentInfo } from "@/api/eda";
export default {
  name: "userCenter",
  components: {
    PartiallyHidden,
  },
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      pageSize: 20,
      listTotal: 0,
      searchData: {
        keyword: "",
      },
      searchOptions: [
        {
          key: "keyword",
          attrs: {
            placeholder: "姓名/手机号",
          },
        },
      ],
    };
  },
  created() {
    this.getStudentUsersList();
  },
  methods: {
    // 清除信息
    async clearStudentInfo({ uid }, type) {
      const data = {
        uid,
        type,
      };
      const res = await clearStudentInfo(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        ["mini", "pc"].includes(type) && this.getStudentUsersList();
      }
    },
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
      };
      this.getStudentUsersList();
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.pageNum = 1;
      this.getStudentUsersList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getStudentUsersList();
    },
    async getStudentUsersList() {
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await getStudentUsersList(data);
      this.listLoading = false;
      this.listData = res.data.list;
      this.listTotal = res.data.total;
    },
  },
};
</script>

<style lang="less" scoped>
.mainPart {
  padding: 20px;
}
.head_remind {
  padding: 0 20px 20px 20px;
}
.avatar {
  height: 25px;
  border-radius: 50%;
  margin-right: 10px;
  vertical-align: middle;
}
</style>

