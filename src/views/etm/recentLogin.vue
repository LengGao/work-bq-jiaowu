<template>
  <section class="mainwrap">
    <SearchList
      :options="searchOptions"
      :data="searchData"
      @on-search="handleSearch"
    />
    <!--表格-->
    <div class="userTable">
      <el-table
        ref="multipleTable"
        :data="listData"
        v-loading="listLoading"
        element-loading-text="loading"
        element-loading-spinner="el-icon-loading"
        element-loading-background="#fff"
        tooltip-effect="light"
        stripe
        style="width: 100%"
        class="min_table"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column
          prop="uid"
          label="学员编号"
          show-overflow-tooltip
          min-width="90"
        ></el-table-column>
        <el-table-column
          prop="uid"
          label="学员头像"
          show-overflow-tooltip
          min-width="90"
        >
          <template slot-scope="scope">
            <div style="margin: 0 auto; width: 50px; height: 50px">
              <img :src="scope.row.user_img" alt class="school_class_box" />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="user_nicename"
          label="微信昵称"
          show-overflow-tooltip
          min-width="90"
        ></el-table-column>
        <el-table-column label="学生姓名" min-width="110" show-overflow-tooltip>
          <template slot-scope="{ row }">
            <span> {{ row.user_realname || "--" }}</span>
          </template>
        </el-table-column>
        <el-table-column label="性别" min-width="110" show-overflow-tooltip>
          <template slot-scope="{ row }">
            <span v-if="row.sex === 1"> 男</span>
            <span v-else-if="row.sex === 2"> 女</span>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column label="手机号码" min-width="150" show-overflow-tooltip
          ><template slot-scope="{ row }">
            <span>
              {{ row.telphone | filterPhone }}
            </span>
            <i
              class="el-icon-document-copy copy-number"
              @click="handleCopy(row.telphone)"
              title="复制"
            ></i>
          </template>
        </el-table-column>
        <el-table-column
          prop="course_name"
          label="课程"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="aid"
          label="是否录入"
          min-width="150"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span> {{ row.aid > 0 ? "是" : "否" }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="最近登录时间"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          prop="source"
          label="数据来源"
          min-width="100"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span>
              {{
                row.source === 2 ? "小程序" : row.source === 1 ? "PC" : "--"
              }}</span
            >
          </template>
        </el-table-column>

        <el-table-column label="操作" fixed="right" min-width="200">
          <template slot-scope="{ row }">
            <div style="display: flex; justify-content: center">
              <el-button
                v-if="row.apple_openid"
                type="text"
                @click="clearConfirm(row.uid)"
                >清除登录信息</el-button
              >
              <span v-else>--</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="table_bottom" v-if="listData.length">
        <page
          :data="listTotal"
          :curpage="pageNum"
          @pageChange="handlePageChange"
          @pageSizeChange="handlePageSizeChange"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { getShortcuts } from "@/utils/date";
import { getRecentLoginUser, clearlogininfo } from "@/api/etm";
export default {
  name: "seaStudent",
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        date: "",
        keyword: "",
      },
      searchOptions: [
        {
          key: "date",
          type: "datePicker",
          attrs: {
            type: "daterange",
            "range-separator": "至",
            "start-placeholder": "开始日期",
            "end-placeholder": "结束日期",
            format: "yyyy-MM-dd",
            "value-format": "yyyy-MM-dd",
            pickerOptions: {
              shortcuts: getShortcuts([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
            },
          },
        },
        {
          key: "keyword",
          attrs: {
            placeholder: "客户姓名/手机号码",
          },
        },
      ],
    };
  },
  created() {
    this.getRecentLoginUser();
  },
  methods: {
    // 清除用户登录信息
    clearConfirm(id) {
      this.$confirm("清除后,用户需要重新授权登录,需谨慎操作！", {
        type: "warning",
      })
        .then(() => {
          this.handleclearlogininfo(id);
        })
        .catch(() => {});
    },
    async handleclearlogininfo(uid) {
      const data = {
        uid,
        login_clear: 1, //1为清除，0 不作操作
      };
      const res = await clearlogininfo(data);
      if (res.code === 0) {
        this.getRecentLoginUser();
        this.$message.success(res.message);
      }
    },
    // 复制
    handleCopy(val) {
      const input = document.createElement("input");
      document.body.appendChild(input);
      input.setAttribute("value", val);
      input.select();
      if (document.execCommand("copy")) {
        document.execCommand("copy");
        document.body.removeChild(input);
        this.$message.success("复制成功");
      }
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getRecentLoginUser();
    },
    handlePageSizeChange(val) {
      this.pageSizeNum = val;
      this.getRecentLoginUser();
    },
    handleSearch(data) {
      const times = data.date || ["", ""];
      this.pageNum = 1;
      this.searchData = {
        ...data,
        date: Array.isArray(data.date) ? data.date.join(" - ") : "",
      };
      this.getRecentLoginUser();
    },
    //客户列表
    async getRecentLoginUser() {
      this.checkedIds = [];
      this.intent_id = "";
      console.log(this.searchData.date);
      const data = {
        page: this.pageNum,
        limit: this.pageSizeNum,
        ...this.searchData,
      };
      console.log(data);
      this.listLoading = true;
      const res = await getRecentLoginUser(data);
      this.listLoading = false;
      this.listData = res.data.list;
      this.listTotal = res.data.total;
    },
  },
};
</script>
<style lang="scss" scoped>
/deep/.el-table__header th,
.el-table__header tr {
  background-color: #f8f8f8;
  color: #909399;
}
.main {
  padding: 20px;
  margin: 20px;
  background: #fff;
}
.userTable {
  margin-top: 20px;
}
/deep/.timeCard {
  color: #666666;
}
/deep/.studentTag ul li {
  color: #666666;
}
.table_bottom {
  text-align: right;
}
.copy-number {
  color: #199fff;
  cursor: pointer;
  margin-left: 8px;
}
</style>
