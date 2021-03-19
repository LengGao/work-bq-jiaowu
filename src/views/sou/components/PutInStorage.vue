<template>
  <!--入库弹框-->
  <el-dialog
    title="入库"
    :visible.sync="visible"
    width="1200px"
    top="30px"
    class="put-in-storage"
    @open="handleOpen"
    @closed="resetForm('ruleForm')"
  >
    <el-form label-width="100px" :model="formData" ref="ruleForm">
      <el-row>
        <el-col :lg="12" :sm="12" :xs="12" :md="12">
          <el-form-item label="入库备注" prop="category_id">
            <el-input
              maxlength="30"
              placeholder="请输入备注信息"
              v-model.trim="formData.book_name"
              class="input-width"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
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
        @select="handleCurrentSelect"
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
          label="库存数量"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="number"
          label="入库数量"
          min-width="110"
          show-overflow-tooltip
        >
          <el-input size="mini"></el-input>
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
    <span slot="footer" class="dialog-footer">
      <el-button @click="hanldeCancel">取 消</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')"
        >入 库</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import SearchList from "@/components/SearchList/index";
import { getBookList } from "@/api/sou";
export default {
  components: {
    SearchList,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    id: {
      type: [String, Number],
      default: "",
    },
    selectData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      visible: this.value,
      formData: {
        category_id: "",
      },
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
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },
  methods: {
    handleCurrentSelect(selection, row) {
      console.log(row);
    },
    handleOpen() {
      this.getBookList();
    },
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
    handlePageChange(val) {
      this.pageNum = val;
      this.getBookList();
    },
    async getBookList() {
      const data = {
        page: this.pageNum,
        limit: 10,
        ...this.searchData,
        category_id: this.searchData.category_id.pop(),
      };
      this.listLoading = true;
      const res = await getBookList(data);
      this.listLoading = false;
      this.listData = res.data.data;
      this.listTotal = res.data.total;
    },
    async submit() {
      const data = {
        ...this.formData,
      };
      if (this.id) {
        data.book_id = this.id;
      }
      const api = this.id ? editBook : addBook;
      const res = await api(data);
      if (res.code === 0) {
        this.$message.success(`教材${this.id ? "编辑" : "新增"}成功`);
        this.hanldeCancel();
        this.$emit("on-success");
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submit();
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
</style>