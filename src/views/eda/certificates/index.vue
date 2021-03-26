<template>
  <section>
    <div class="head-certificates">
      *本模块展示所有的班级数据，方便教务老师管理班级的日常工作
    </div>
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
          <el-table-column
            label="学生编号"
            show-overflow-tooltip
            min-width="90"
            prop="uid"
          >
          </el-table-column>
          <el-table-column
            prop="surname"
            label="学生姓名"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="mobile"
            label="手机号码"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="project_price"
            label="免冠正面照"
            min-width="110"
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
              <span v-else>--</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="portrait"
            label="身份证扫描件"
            min-width="150"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <img
                @click="handlePreview(row.photo_id_card)"
                class="list-img"
                :src="row.photo_id_card"
                v-if="row.photo_id_card"
                alt=""
              />
              <span v-else>--</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="graduation_certificate"
            label="毕业证扫描件"
            min-width="150"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <img
                @click="handlePreview(row.graduation_certificate)"
                :src="row.graduation_certificate"
                v-if="row.graduation_certificate"
                alt=""
                class="list-img"
              />
              <span v-else>--</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="photo_residence_permit"
            label="社保卡/居住证"
            min-width="150"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <img
                @click="handlePreview(row.photo_residence_permit)"
                :src="row.photo_residence_permit"
                v-if="row.photo_residence_permit"
                alt=""
                class="list-img"
              />
              <span v-else>--</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="photo_commitment"
            label="工作年限承诺书"
            min-width="150"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <img
                class="list-img"
                @click="handlePreview(row.photo_commitment)"
                :src="row.photo_commitment"
                v-if="row.photo_commitment"
                alt=""
              />
              <span v-else>--</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="photo_health"
            label="个人健康承诺书"
            min-width="150"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <img
                @click="handlePreview(row.photo_health)"
                title="点击预览大图"
                class="list-img"
                :src="row.photo_health"
                v-if="row.photo_health"
                alt=""
              />
              <span v-else>--</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" fixed="right" min-width="200">
            <template slot-scope="{ row }">
              <div style="display: flex; justify-content: center">
                <el-button type="text" @click="openAddPhoto(row.uid)"
                  >编辑资料</el-button
                >
                <el-button type="text" @click="zipDownload(row.uid)"
                  >打包下载</el-button
                >
                <el-button type="text" @click="hanldeLink(row.uid)"
                  >日志</el-button
                >
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
    <AddPhoto
      :visible.sync="addDialog"
      :uid="currentUid"
      @on-success="getCertificates"
    />

    <PreviewImg ref="view" />
  </section>
</template>

<script>
import { getCertificates, zipDownload } from "@/api/educational";
import SearchList from "@/components/SearchList/index";
import AddPhoto from "./components/AddPhoto";
export default {
  name: "certificates",
  components: {
    SearchList,
    AddPhoto,
  },
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        value: "",
      },
      searchOptions: [
        {
          key: "value",
          attrs: {
            placeholder: "学生姓名/手机号码",
          },
        },
      ],
      addDialog: false,
      currentUid: "",
      previewSrc: "",
    };
  },
  created() {
    this.getCertificates();
  },
  methods: {
    hanldeLink(id) {
      this.$router.push({ name: "certificatesLog", query: { id } });
    },
    // 下载
    async zipDownload(uid) {
      const data = {
        uid,
      };
      const res = await zipDownload(data);
      if (res.code === 0) {
        window.open(res.data.url);
      }
    },
    handlePreview(src) {
      this.$refs.view.show(src);
    },
    openAddPhoto(id) {
      this.currentUid = id;
      this.addDialog = true;
    },
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = data;
      this.getCertificates();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getCertificates();
    },
    async getCertificates() {
      const data = {
        from_organization_id: 0,
        page: this.pageNum,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await getCertificates(data);
      this.listLoading = false;
      this.listData = res.data.list;
      this.listTotal = res.data.total;
    },
  },
};
</script>

<style lang="scss" scoped>
.head-certificates {
  padding: 20px;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  color: #909399;
  width: 100%;
  border-bottom: 15px solid #f2f6fc;
}

.list-img {
  width: 50px;
  height: 50px;
  cursor: pointer;
}
</style>
