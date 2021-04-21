<template>
  <div>
    <div class="head_remind">*本模块可以开通公开课直播。</div>
    <section class="mainwrap">
      <div class="client_head">
        <!--搜索模块-->
        <SearchList
          :options="searchOptions"
          :data="searchData"
          @on-search="handleSearch"
        />
        <el-button type="primary" @click="openAdd">添加直播</el-button>
      </div>
      <!--表格-->
      <div class="userTable">
        <el-table
          ref="multipleTable"
          :data="listData"
          style="width: 100%"
          class="min_table"
          v-loading="listLoading"
          element-loading-text="loading"
          element-loading-spinner="el-icon-loading"
          element-loading-background="#fff"
          :header-cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column
            label="编号"
            show-overflow-tooltip
            min-width="70"
            align="center"
            prop="live_class_id"
          >
          </el-table-column>
          <el-table-column
            prop="live_class_name"
            label="直播名称"
            min-width="220"
            align="left"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="category_name"
            label="所属分类"
            min-width="130"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="teacher_name"
            label="任课老师"
            align="center"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="live_time"
            label="上课时间"
            min-width="180"
            align="left"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="staff_name"
            label="状态"
            align="center"
            min-width="100"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <el-link
                type="success"
                class="live-status live-status-active"
                v-if="row.live_status"
                @click="openLinkDetail(row.live_class_id)"
                >直播中</el-link
              >
              <span class="live-status" v-else>无直播</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            fixed="right"
            min-width="240"
          >
            <template slot-scope="{ row }">
              <div style="display: flex; justify-content: center">
                <el-button
                  v-if="row.live_status"
                  type="text"
                  @click="closeLiveConfirm(row.live_class_id)"
                  >关闭直播</el-button
                >
                <el-button
                  type="text"
                  v-if="!row.live_status"
                  @click="openLiveConfirm(row.live_class_id)"
                  >开始直播</el-button
                >
                <el-button type="text" @click="linkTo(row.live_class_id)"
                  >直播场次</el-button
                >
                <el-button
                  v-if="!row.live_status"
                  type="text"
                  @click="openEdit(row.live_class_id)"
                  >编辑</el-button
                >
                <el-button
                  type="text"
                  v-if="!row.live_status"
                  @click="deleteConfirm(row.live_class_id)"
                  >删除</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="table_bottom">
          <page
            :data="listTotal"
            :curpage="pageNum"
            @pageChange="handlePageChange"
          />
        </div>
      </div>
      <!--弹框-->
      <LivePublicDialog
        v-model="dialogVisible"
        :title="dialogTitle"
        :id="currentId"
        :typeOptions="typeOptions"
        @on-success="publicLiveList"
      />
      <LiveLinkDialog
        v-model="liveDetailDialog"
        :id="currentId"
        :title="liveDetailTitle"
        :datas="liveDetail"
      />
    </section>
  </div>
</template>

<script>
import {
  publicLiveList,
  deleteClassLive,
  livestart,
  closelive,
} from "@/api/eda";
import { cloneOptions } from "@/utils/index";
import { getCateList } from "@/api/sou";
import LivePublicDialog from "./components/LivePublicDialog";
import LiveLinkDialog from "../liveSessions/components/LiveLinkDialog";
export default {
  components: {
    LivePublicDialog,
    LiveLinkDialog,
  },
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        live_class_name: "",
        cate_id: [],
        date: [],
      },
      searchOptions: [
        {
          key: "cate_id",
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
          key: "date",
          type: "datePicker",
          attrs: {
            type: "daterange",
            "range-separator": "至",
            "start-placeholder": "开始日期",
            "end-placeholder": "结束日期",
            "value-format": "yyyy-MM-dd",
          },
        },
        {
          key: "live_class_name",
          attrs: {
            placeholder: "直播名称/班级名称",
          },
        },
      ],
      currentId: "",
      dialogTitle: "添加直播",
      dialogVisible: false,
      typeOptions: [],
      liveDetail: {},
      liveDetailDialog: false,
      liveDetailTitle: "",
    };
  },

  created() {
    this.getCateList();
    this.publicLiveList();
  },
  methods: {
    openLinkDetail(id) {
      this.currentId = id;
      this.liveDetailTitle = "直播链接";
      this.liveDetailDialog = true;
    },
    // 关闭直播
    closeLiveConfirm(id) {
      this.$confirm("确定要关闭直播吗?", { type: "warning" })
        .then(() => {
          this.closelive(id);
        })
        .catch(() => {});
    },
    async closelive(live_class_id) {
      const data = { live_class_id };
      const res = await closelive(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.publicLiveList();
      }
    },
    // 开始直播
    openLiveConfirm(id) {
      this.$confirm("确定要开始直播吗?", { type: "warning" })
        .then(() => {
          this.livestart(id);
        })
        .catch(() => {});
    },
    async livestart(live_class_id) {
      const data = { live_class_id };
      const res = await livestart(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        const data = res.data.data || {};
        this.liveDetail = {
          webUrl:
            "https://live.polyv.net/web-start/classroom?channelId=" +
            data.channelId,
          clientUrl:
            "https://live.polyv.net/start-client.html?channelId=" +
            data.channelId,
          channelId: data.channelId,
          channelPasswd: data.channelPasswd,
          channel_account: data.channel_account,
          teacherUrl: "https://live.polyv.net/teacher.html",
        };
        this.liveDetailDialog = true;
        this.liveDetailTitle = "发布成功";
        this.currentId = "";
        this.publicLiveList();
      }
    },
    // 删除直播
    deleteConfirm(id) {
      this.$confirm("确定要删除此直播吗?", { type: "warning" })
        .then(() => {
          this.deleteClassLive(id);
        })
        .catch(() => {});
    },
    async deleteClassLive(id) {
      const data = { id };
      const res = await deleteClassLive(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.publicLiveList();
      }
    },
    openEdit(id) {
      this.dialogTitle = "编辑直播";
      this.currentId = id;
      this.dialogVisible = true;
    },
    openAdd() {
      this.currentId = "";
      this.dialogTitle = "添加直播";
      this.dialogVisible = true;
    },
    handleSearch(data) {
      const times = data.date || ["", ""];
      delete data.date;
      this.pageNum = 1;
      this.searchData = {
        ...data,
        cate_id: data.cate_id ? data.cate_id.pop() : "",
        start_time: times[0],
        end_time: times[1],
      };
      this.publicLiveList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.publicLiveList();
    },
    // 获取所属分类
    async getCateList() {
      const data = { list: true };
      const res = await getCateList(data);
      if (res.code === 0) {
        this.searchOptions[0].attrs.options = this.typeOptions = cloneOptions(
          res.data,
          "category_name",
          "category_id",
          "son"
        );
      }
    },
    async publicLiveList() {
      const data = {
        page: this.pageNum,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await publicLiveList(data);
      this.listLoading = false;
      this.listData = res.data.list;
      this.listTotal = res.data.total;
    },
    linkTo(live_class_id) {
      this.$router.push({ name: "liveSessions", query: { live_class_id } });
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
.head_remind {
  padding: 20px;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  color: #909399;
  width: 100%;
  border-bottom: 15px solid #f2f6fc;
}
.client_head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.userTable {
  margin-top: 20px;
  .live-status {
    color: #999999;
    &::before {
      display: inline-block;
      content: "";
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background-color: #999999;
      vertical-align: middle;
      margin-right: 4px;
    }
    &-active {
      color: #00c297;
      &::before {
        background-color: #00c297;
      }
    }
  }
}
.table_bottom {
  text-align: right;
}
</style>
