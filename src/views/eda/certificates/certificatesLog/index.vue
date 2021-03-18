<template>
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
          <el-table-column
            prop="photo_health"
            label="上传记录"
            min-width="350"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <img
                @click="handlePreview(row.portrait)"
                class="list-img"
                :src="row.portrait"
                v-if="row.portrait"
                alt=""
              />
              <img
                @click="handlePreview(row.photo_id_card)"
                class="list-img"
                :src="row.photo_id_card"
                v-if="row.photo_id_card"
                alt=""
              />
              <img
                @click="handlePreview(row.graduation_certificate)"
                :src="row.graduation_certificate"
                v-if="row.graduation_certificate"
                alt=""
                class="list-img"
              />
              <img
                @click="handlePreview(row.photo_residence_permit)"
                :src="row.photo_residence_permit"
                v-if="row.photo_residence_permit"
                alt=""
                class="list-img"
              />
              <img
                class="list-img"
                @click="handlePreview(row.photo_commitment)"
                :src="row.photo_commitment"
                v-if="row.photo_commitment"
                alt=""
              />
              <img
                @click="handlePreview(row.photo_health)"
                title="点击预览大图"
                class="list-img"
                :src="row.photo_health"
                v-if="row.photo_health"
                alt=""
              />
            </template>
          </el-table-column>
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
    <el-dialog :visible.sync="previewDialog" custom-class="preview-dialog">
      <img width="100%" :src="previewSrc" alt="" />
    </el-dialog>
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
      photoData: {
        portrait: "",
        photo_id_card: "",
        photo_residence_permit: "",
        graduation_certificate: "",
        photo_commitment: "",
        photo_health: "",
      },
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

    handleSearch() {
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
.list-img {
  width: 50px;
  height: 50px;
  cursor: pointer;
  margin-right: 10px;
}
/deep/.preview-dialog {
  .el-dialog__body {
    text-align: center;
  }
}
</style>
