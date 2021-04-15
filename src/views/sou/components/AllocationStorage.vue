<template>
  <!--调拨弹框-->
  <el-dialog
    title="调拨"
    :visible.sync="visible"
    width="1000px"
    top="30px"
    class="allocation-storage"
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
          prop="number"
          label="库存数量"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="number"
          label="调拨数量"
          min-width="110"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <el-input
              type="number"
              v-model="row.putNumber"
              placeholder="请输入调拨数量"
              v-if="row.isChecked"
              size="mini"
            ></el-input>
            <span v-else>--</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="table-remark">
        <el-form
          label-width="80px"
          :model="formData"
          :rules="rules"
          ref="ruleForm"
        >
          <el-row>
            <el-col :lg="12" :sm="12" :xs="12" :md="12">
              <el-form-item label="调入仓库" prop="to_storage_id">
                <el-select
                  clearable
                  filterable
                  style="width: 100%"
                  placeholder="请选择关联机构"
                  v-model="formData.to_storage_id"
                >
                  <el-option
                    v-for="item in storageOptions"
                    :key="item.id"
                    :label="item.storage_name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :lg="12" :sm="12" :xs="12" :md="12">
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
        />
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hanldeCancel">取 消</el-button>
      <el-button
        type="primary"
        :loading="btnLoading"
        @click="submitForm('ruleForm')"
        >调 拨</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import SearchList from "@/components/SearchList/index";
import {
  getstoragebook,
  getCateList,
  mobilizestorage,
  getStorageOptions,
} from "@/api/sou";
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
        to_storage_id: "",
        common: "",
      },
      rules: {
        to_storage_id: [
          { required: true, message: "请选择仓库", trigger: "change" },
        ],
      },
      listData: [],
      listLoading: false,
      pageNum: 1,
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
            placeholder: "教材名称",
          },
        },
      ],
      selection: [],
      storageOptions: [],
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
      this.getStorageOptions();
      this.getstoragebook();
      this.getCateList();
    },
    // 调拨
    async mobilizestorage() {
      const books = this.selection.map((item) => {
        return {
          book_id: item.book_id,
          number: item.putNumber,
        };
      });
      const data = {
        storage_id: this.id,
        ...this.formData,
        book: JSON.stringify(books),
      };
      this.btnLoading = true;
      const res = await mobilizestorage(data).catch(() => {
        this.btnLoading = false;
      });
      this.btnLoading = false;
      if (res.code === 0) {
        this.$message.success(`调拨成功`);
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
    //获取仓库下拉
    async getStorageOptions() {
      const res = await getStorageOptions();
      if (res.code === 0) {
        this.storageOptions = res.data?.data || [];
      }
    },
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = data;
      this.getstoragebook();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getstoragebook();
    },
    async getstoragebook() {
      this.selection = [];
      const data = {
        storage_id: this.id,
        page: this.pageNum,
        limit: 10,
        ...this.searchData,
        category_id: this.searchData.category_id.pop(),
      };
      this.listLoading = true;
      const res = await getstoragebook(data);
      this.listLoading = false;
      this.listData = res.data.data.map((item) => ({ ...item, putNumber: "" }));
      this.listTotal = res.data.total;
    },

    submitForm(formName) {
      if (!this.selection.length) {
        this.$message.warning("请选择需要调拨的教材!");
        return false;
      }
      if (this.selection.some((item) => item.putNumber < 1)) {
        this.$message.warning("请填写正确的调拨数量!");
        return false;
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.mobilizestorage();
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