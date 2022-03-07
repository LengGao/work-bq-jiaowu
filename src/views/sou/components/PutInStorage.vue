<template>
  <!--入库弹框-->
  <el-dialog
    title="入库"
    :visible.sync="visible"
    width="80%"
    top="30px"
    class="put-in-storage"
    @open="handleOpen"
    :close-on-click-modal="false"
    @closed="resetForm('ruleForm')"
  >
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
        style="width: 100%"
        class="min_table"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
        @selection-change="handleAllSelect"
        height="550"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column
          prop="book_name"
          label="教材名称"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="category_name"
          label="所属分类"
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
          label="入库数量"
          min-width="110"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <el-input
              type="number"
              v-model="row.putNumber"
              placeholder="请输入入库数量"
              v-if="row.isChecked"
              size="mini"
            ></el-input>
            <span v-else>--</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="table-remark">
        <el-form label-width="80px" :model="formData" ref="ruleForm">
          <el-row>
            <el-col :lg="24" :sm="24" :xs="24" :md="24">
              <el-form-item label="调拨备注">
                <el-input
                  maxlength="30"
                  placeholder="请输入备注信息"
                  v-model.trim="formData.common"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="number">
          <span>合计：</span>
          <span>{{ getAllNumber }}</span>
        </div>
      </div>
      <div class="table_bottom">
        <page
          :data="listTotal"
          :curpage="pageNum"
          @pageChange="handlePageChange"
          @pageSizeChange="handleSizeChange"
        />
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hanldeCancel">取 消</el-button>
      <el-button
        type="primary"
        :loading="btnLoading"
        @click="submitForm('ruleForm')"
        >入 库</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import SearchList from "@/components/SearchList/index";
import { getBookList, getCateList, textbooksputstorage } from "@/api/sou";
export default {
  components: {
    SearchList,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    id: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      selectData: [], // 搜索项
      visible: this.value,
      formData: {
        common: "",
      },
      listData: [],
      listLoading: false,
      pageNum: 1,
      pageSize: 20,
      listTotal: 0,
      searchData: {
        category_id: [],
        keyword: "",
      },
      searchOptions: [
        {
          key: "category_id",
          type: "cascader",
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
            placeholder: "教材名称/教材条码",
          },
        },
      ],
      selection: [],
      btnLoading: false,
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
    selection(data) {
      const ids = data.map((child) => child.book_id);
      this.listData.forEach((item) => {
        item.isChecked = ids.includes(item.book_id);
      });
    },
  },
  computed: {
    getAllNumber() {
      return this.listData.reduce((pre, next) => {
        return pre + next.putNumber * 1;
      }, 0);
    },
  },
  methods: {
    handleAllSelect(selection) {
      this.selection = selection;
    },
    handleOpen() {
      this.getBookList();
      this.getCateList();
    },
    // 入库
    async textbooksputstorage() {
      const books = this.selection.map((item) => {
        return {
          book_id: item.book_id,
          number: item.putNumber,
        };
      });
      const data = {
        storage_id: this.id,
        ...this.formData,
        book_info: JSON.stringify(books),
      };
      this.btnLoading = true;
      const res = await textbooksputstorage(data).catch(() => {
        this.btnLoading = false;
      });
      this.btnLoading = false;
      if (res.code === 0) {
        this.$message.success(`入库成功`);
        this.hanldeCancel();
        this.$emit("on-success");
      }
    },
    // 获取搜索选项
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
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = data;
      this.getBookList();
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.pageNum = 1;
      this.getBookList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getBookList();
    },
    async getBookList() {
      this.selection = [];
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
        ...this.searchData,
        category_id: this.searchData.category_id.pop(),
      };
      this.listLoading = true;
      const res = await getBookList(data);
      this.listLoading = false;
      this.listData = res.data.data.map((item) => ({ ...item, putNumber: "" }));
      this.listTotal = res.data.total;
    },

    submitForm() {
      if (!this.selection.length) {
        this.$message.warning("请选择需要入库的教材!");
        return false;
      }
      if (this.selection.some((item) => item.putNumber < 1)) {
        this.$message.warning("请填写正确的入库数量!");
        return false;
      }
      this.textbooksputstorage();
    },
    resetForm() {
      for (const k in this.formData) {
        this.formData[k] = "";
      }
      this.hanldeCancel();
    },
    hanldeCancel() {
      this.$emit("input", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.table-remark {
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .remark {
    width: 300px;
  }
  .number {
    margin-right: 20px;
  }
}
</style>