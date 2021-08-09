<template>
  <!-- 人脸扫描记录列表 -->
  <div class="face-scanning-record">
    <div class="head_remind">*本模块展示所有的人脸识别数据，方便管理查询。</div>
    <div class="container">
      <div class="client_head">
        <!--搜索模块-->
        <SearchList
          :options="searchOptions"
          :data="searchData"
          @on-search="handleSearch"
        />
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
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column label="ID" width="70" prop="id"> </el-table-column>
          <el-table-column
            label="识别时间"
            show-overflow-tooltip
            min-width="140"
            prop="create_time"
          >
          </el-table-column>
          <el-table-column
            prop="surname"
            label="学员姓名"
            min-width="80"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <el-button type="text" @click="toStudentDetail(row.uid)">
                {{ row.surname }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="手机号码"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="course_name"
            label="课程名称"
            min-width="200"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="title"
            label="课时名称"
            min-width="140"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="time_point"
            label="视频关键秒"
            min-width="110"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="best_frame"
            label="抓拍图片"
            min-width="80"
            align="center"
          >
            <template slot-scope="{ row }">
              <div class="best-frame" v-if="row.best_frame">
                <img
                  @click="handlePreview(row.best_frame)"
                  :src="row.best_frame"
                  alt=""
                />
              </div>
              <span v-else>--</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="status_name"
            label="核验结果"
            min-width="100"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <el-tag size="small" :type="statusMap[row.status]">{{
                row.status_name
              }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="live_msg"
            label="核验信息1"
            min-width="120"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="err_msg"
            label="核验信息2"
            min-width="230"
            show-overflow-tooltip
          >
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
    </div>
    <PreviewImg ref="view" />
  </div>
</template>

<script>
import { getShortcuts } from "@/utils/date";
import { getFaceDetectList, getFaceCourseSelect } from "@/api/eda";
export default {
  name: "faceScanningRecord",
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        date: [],
        course_id: "",
        search_box: "",
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
          key: "course_id",
          type: "select",
          options: [],
          optionValue: "course_id",
          optionLabel: "course_name",
          attrs: {
            placeholder: "课程名称",
            clearable: true,
            filterable: true,
          },
        },
        {
          key: "search_box",
          attrs: {
            placeholder: "学员姓名/手机号码",
          },
        },
      ],
      statusMap: {
        1: "info",
        2: "success",
        3: "danger",
      },
    };
  },

  created() {
    this.getFaceDetectList();
    this.getFaceCourseSelect();
  },

  methods: {
    async getFaceCourseSelect() {
      const data = {};
      const res = await getFaceCourseSelect(data);
      this.searchOptions[1].options = res.data;
    },
    handlePreview(src) {
      this.$refs.view.show(src);
    },
    // 搜索
    handleSearch(data) {
      this.pageNum = 1;
      const date = data.date || ["", ""];
      delete data.date;
      this.searchData = {
        ...data,
        start_time: date[0],
        end_time: date[1],
      };
      this.getFaceDetectList();
    },
    // 分页
    handlePageChange(val) {
      this.pageNum = val;
      this.getFaceDetectList();
    },
    // 列表
    async getFaceDetectList() {
      const data = {
        page: this.pageNum,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await getFaceDetectList(data);
      this.listLoading = false;
      this.listData = res.data.list;
      this.listTotal = res.data.total;
    },
  },
};
</script>

<style lang="scss" scoped>
.face-scanning-record {
  /deep/.el-table__header th,
  .el-table__header tr {
    background-color: #f8f8f8;
    color: #909399;
  }
  .container {
    padding: 20px;
    .client_head {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .userTable {
      margin-top: 20px;
      .best-frame {
        width: 100%;
        height: 70px;
        text-align: center;
        img {
          width: 60px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
