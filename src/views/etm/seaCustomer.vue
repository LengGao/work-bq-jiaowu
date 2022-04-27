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
            <div v-if="row.realname">
              {{ row.realname }}
            </div>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column label="手机号码" min-width="150" show-overflow-tooltip
          ><template slot-scope="{ row }">
            <span>
              {{ row.mobile | filterPhone }}
            </span>
            <i
              class="el-icon-document-copy copy-number"
              @click="handleCopy(row.mobile)"
              title="复制"
            ></i>
          </template>
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="加入时间"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          prop="from"
          label="数据来源"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column label="操作" fixed="right" min-width="200">
          <template slot-scope="scope">
            <div style="display: flex; justify-content: center">
              <el-button type="text" disabled v-if="scope.row.aid">
                已报名
              </el-button>
              <el-button v-else type="text" @click="enroll(scope.row)"
                >报名</el-button
              >
              <el-button
                v-if="!scope.row.aid"
                type="text"
                @click="deleteConfirm(scope.row.uid)"
                >删除</el-button
              >
              <!-- <el-button
                type="text"
                @click="toStudentDetail(scope.row)"
                style="padding-right:20px"
                >详情</el-button
              >
              <el-button type="text" @click="receiveStudent(scope.row)"
                >领取</el-button
              > -->
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
    <addCustomeDialog
      :innerVisible="innerVisible"
      :seaUserInfo="seaUserInfo"
      v-on:innerDialog="getInnerStatus($event)"
    />
  </section>
</template>

<script>
import { getShortcuts } from "@/utils/date";
import addCustomeDialog from "./components/addCustomeDialog";
import { cloneOptions } from "@/utils/index";
import { getCateList } from "@/api/sou";
import { getCommonUserList, delUser } from "@/api/etm";
export default {
  name: "seaStudent",
  components: {
    addCustomeDialog,
  },
  data() {
    return {
      schoolData: [],
      seaUserInfo: {},
      selectData: [],
      innerVisible: false,
      page: 1,
      status: 3,
      datas: {},
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        category_id: "",
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
          key: "category_id",
          type: "cascader",
          width: 120,
          attrs: {
            placeholder: "所属分类",
            clearable: true,
            props: { checkStrictly: true },
            filterable: true,
            options: [],
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
    this.getCateList();
    this.getCommonUserList();
  },
  mounted() {
    // let status = 3
    // this.$api.getCommonUserList(this, 'schoolData')
  },
  methods: {
    // 删除用户
    deleteConfirm(id) {
      this.$confirm("确定要删除此用户吗?", { type: "warning" })
        .then(() => {
          this.handleDelUser(id);
        })
        .catch(() => {});
    },
    async handleDelUser(uid) {
      const data = { uid };
      const res = await delUser(data);
      if (res.code === 0) {
        this.getCommonUserList();
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
      this.getCommonUserList();
    },
    handlePageSizeChange(val) {
      this.pageSizeNum = val;
      this.getCommonUserList();
    },
    //客户列表
    async getCommonUserList() {
      console.log(this.searchData.date);
      this.checkedIds = [];
      this.intent_id = "";
      
      const data = {
        page: this.pageNum,
        limit: this.pageSizeNum,
        ...this.searchData,
        status: 3,
      };
      console.log(data);
      this.listLoading = true;
      const res = await getCommonUserList(data);
      this.listLoading = false;
      this.listData = res.data.list;
      this.listTotal = res.data.total;
    },
    handleSearch(data) {
      const times = data.date || ["", ""];
      console.log(times);
      delete data.date;
      this.pageNum = 1;
      this.searchData = {
        ...data,
        start_time: times[0],
        end_time: times[1],
        category_id: data.category_id ? data.category_id.pop() : "",
      };
      this.getCommonUserList();
    },
    // 获取所属分类
    async getCateList() {
      const data = { list: true };
      const res = await getCateList(data);
      if (res.code === 0) {
        this.searchOptions[1].attrs.options = cloneOptions(
          res.data,
          "category_name",
          "category_id",
          "son"
        );
      }
    },
    enroll(ab) {
      this.seaUserInfo = ab;
      this.innerVisible = true;
    },
    getInnerStatus(status) {
      this.innerVisible = status;
    },
    getTableList(state, val, datas) {
      console.log(state, val);
      if (state == "page") {
        this.page = val;
        this.datas = datas;
      } else if (state == "data") {
        this.schoolData = val;
      }
    },
    receiveStudent(zx) {
      console.log(zx);
      this.$api.receive(this, zx.intent_id);
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
