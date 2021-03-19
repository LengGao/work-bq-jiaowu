<template>
  <div>
    <div class="head_remind">
      *本模块主要是招生老师用来进行日常招生数据的跟进管理，包括学员意向录入、课程缴费报名等操作。
    </div>
    <section class="mainwrap">
      <div class="client_head">
        <SearchList
          :options="searchOptions"
          :data="searchData"
          @on-search="handleSearch"
        />
        <div>
          <el-button type="primary" @click="openAdd">添加教材</el-button>
        </div>
      </div>
      <!--表格-->
      <div class="userTable">
        <el-table
          ref="multipleTable"
          :data="listData"
          v-loading="listLoading"
          element-loading-text="loading"
          element-loading-spinner="el-icon-loading"
          element-loading-background="#fff"
          style="width: 100%"
          class="min_table"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column
            label="ID"
            show-overflow-tooltip
            min-width="90"
            prop="book_id"
          >
          </el-table-column>
          <el-table-column
            prop="book_name"
            label="教材名称"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="book_name"
            label="教材封面"
            min-width="110"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <img
                @click="handlePreview(row.book_cover)"
                class="list-img"
                :src="row.book_cover"
                v-if="row.book_cover"
                alt=""
              />
              <span v-else>--</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="category_name"
            label="所属分类"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="chief_editor"
            label="主编"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="book_price"
            label="价格"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column
            prop="book_isbn"
            label="教材条码ISBN"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column
            prop="number"
            label="库存数量"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="操作" fixed="right" min-width="200">
            <template slot-scope="{ row }">
              <div style="display: flex; justify-content: center">
                <el-button type="text" @click="openEdit(row.book_id)"
                  >编辑</el-button
                >
                <el-button type="text">库存详情</el-button>
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
    </section>
    <AddTeachingMaterial
      v-model="addDialog"
      :title="dialogTitle"
      :selectData="selectData"
      :id="currentId"
      @on-success="getBookList"
    />
    <el-dialog :visible.sync="previewDialog" custom-class="preview-dialog">
      <img width="100%" :src="previewSrc" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import SearchList from "@/components/SearchList/index";
import AddTeachingMaterial from "./components/AddTeachingMaterial";
import { getBookList, getCateList } from "@/api/sou";

export default {
  components: {
    SearchList,
    AddTeachingMaterial,
  },
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        category_id: [],
        keyboard: "",
      },
      searchOptions: [
        {
          key: "category_id",
          type: "cascader",
          attrs: {
            clearable: true,
            options: [{ value: 1, label: "test" }],
          },
        },
        {
          key: "keyboard",
          attrs: {
            placeholder: "教材名称/教材条码",
          },
        },
      ],
      addDialog: false,
      dialogTitle: "添加教材",
      currentId: "",
      previewSrc: "",
      previewDialog: false,
      selectData: [],
    };
  },

  created() {
    this.getBookList();
    this.getCateList();
  },

  methods: {
    async getCateList() {
      const data = { list: true };
      const res = await getCateList(data);
      if (res.code === 0) {
        this.cloneData(res.data, this.selectData);
        this.searchOptions[0].attrs.options = this.selectData;
      }
    },
    cloneData(data, newData) {
      data.forEach((item, index) => {
        newData[index] = {};
        newData[index].value = item.category_id;
        newData[index].label = item.category_name;
        if (item.son && item.son.length) {
          newData[index].children = [];
          this.cloneData(item.son, newData[index].children);
        }
      });
    },
    openEdit(id) {
      this.dialogTitle = "编辑教材";
      this.currentId = id;
      this.addDialog = true;
    },
    openAdd() {
      this.currentId = "";
      this.dialogTitle = "添加教材";
      this.addDialog = true;
    },
    handlePreview(src) {
      this.previewDialog = true;
      this.previewSrc = src;
    },

    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = data;
      this.getBookList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getBookList();
    },
    async getBookList() {
      const data = {
        page: this.pageNum,
        ...this.searchData,
        category_id: this.searchData.category_id.pop(),
      };
      this.listLoading = true;
      const res = await getBookList(data);
      this.listLoading = false;
      this.listData = res.data.data;
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
.input-width {
  width: 240px;
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
}
/deep/.preview-dialog {
  .el-dialog__body {
    text-align: center;
  }
}
.list-img {
  width: 50px;
  height: 50px;
  cursor: pointer;
}
</style>
