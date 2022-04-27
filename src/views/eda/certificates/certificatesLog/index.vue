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
              <div class="images">
                <div class="list-img" v-if="row.portrait">
                  <img
                    @click="handlePreview(row.portrait)"
                    :src="row.portrait"
                    alt=""
                    title="点击预览大图"
                  />
                </div>
                <div class="list-img" v-if="row.photo_id_card">
                  <img
                    @click="handlePreview(row.photo_id_card)"
                    :src="row.photo_id_card"
                    alt=""
                    title="点击预览大图"
                  />
                </div>
                <div class="list-img" v-if="row.graduation_certificate">
                  <img
                    @click="handlePreview(row.graduation_certificate)"
                    :src="row.graduation_certificate"
                    alt=""
                    title="点击预览大图"
                  />
                </div>
                <div class="list-img" v-if="row.photo_residence_permit">
                  <img
                    @click="handlePreview(row.photo_residence_permit)"
                    :src="row.photo_residence_permit"
                    alt=""
                    title="点击预览大图"
                  />
                </div>
                <div class="list-img" v-if="row.photo_commitment">
                  <img
                    @click="handlePreview(row.photo_commitment)"
                    :src="row.photo_commitment"
                    alt=""
                    title="点击预览大图"
                  />
                </div>
                <div class="list-img" v-if="row.photo_health">
                  <img
                    @click="handlePreview(row.photo_health)"
                    title="点击预览大图"
                    :src="row.photo_health"
                    alt=""
                  />
                </div>
              </div>
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
    <PreviewImg ref="view" />
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
    };
  },
  created() {
    this.getCertificateLog();
  },
  methods: {
    handlePreview(src) {
      this.$refs.view.show(src);
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
.images {
  display: flex;
  align-items: center;
  .list-img {
    height: 50px;
    cursor: pointer;
    margin-right: 16px;
    text-align: center;
  }
}

/deep/.preview-dialog {
  .el-dialog__body {
    text-align: center;
  }
}
</style>
