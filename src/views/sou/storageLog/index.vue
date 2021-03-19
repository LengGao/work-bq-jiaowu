<template>
  <!-- 仓库日志 -->
  <section>
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
          v-loading="listLoading"
          element-loading-text="loading"
          element-loading-spinner="el-icon-loading"
          element-loading-background="#fff"
          :data="listData"
          style="width: 100%"
          class="min_table"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column label="序号" type="index" width="50">
          </el-table-column>
          <el-table-column
            prop="staff_name"
            label="操作人"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="create_time"
            label="操作时间"
            min-width="110"
            sortable
            show-overflow-tooltip
          ></el-table-column>
        </el-table>
      </div>
    </section>
    <div class="table_bottom">
      <page
        :data="listTotal"
        :curpage="pageNum"
        @pageChange="handlePageChange"
      />
    </div>
  </section>
</template>

<script>
import { getCertificateLog } from "@/api/educational";
import SearchList from "@/components/SearchList/index";
export default {
  name: "certificates",
  components: {
    SearchList,
  },
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        staff_name: "",
        date: [],
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
            "value-format": "yyyy-MM-dd",
          },
        },
        {
          key: "type",
          type: "select",
          options: [
            { label: "入库", value: 1 },
            { label: "调拨", value: 2 },
          ],
          attrs: {
            placeholder: "操作类型",
          },
        },
        {
          key: "staff_name",
          attrs: {
            placeholder: "操作人",
          },
        },
      ],
      addDialog: false,
      currentUid: "",
      previewSrc: "",
      previewDialog: false,
    };
  },
  created() {
    this.getCertificateLog();
  },
  methods: {
    handlePreview(src) {
      this.previewDialog = true;
      this.previewSrc = src;
    },

    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = data;
      this.getCertificateLog();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getCertificateLog();
    },
    async getCertificateLog() {
      const date = this.searchData.date || [];
      const data = {
        uid: this.$route.query.id,
        page: this.pageNum,
        staff_name: this.searchData.staff_name,
        start_time: date[0] || "",
        end_time: date[1] || "",
      };
      this.listLoading = true;
      const res = await getCertificateLog(data);
      this.listLoading = false;
      this.listData = res.data.list;
      this.listTotal = res.data.total;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
