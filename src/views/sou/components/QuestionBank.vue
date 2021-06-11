<template>
  <el-dialog
    title="选择题库"
    :visible.sync="visible"
    width="1000px"
    append-to-body
    @open="handleOpen"
    :close-on-click-modal="false"
    @closed="hanldeCancel"
  >
    <SearchList
      :options="searchOptions"
      :data="searchData"
      @on-search="handleSearch"
    />
    <section class="main">
      <div class="userTable">
        <el-table
          @selection-change="handleTableChange"
          ref="multipleTable"
          :data="listData"
          :row-key="getRowKeys"
          v-loading="listLoading"
          element-loading-text="loading"
          element-loading-spinner="el-icon-loading"
          element-loading-background="#fff"
          height="400"
          class="min_table"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column type="selection" width="55" reserve-selection>
          </el-table-column>
          <el-table-column
            label="教材名称"
            show-overflow-tooltip
            min-width="90"
            prop="title"
          >
          </el-table-column>
          <el-table-column
            prop="category_name"
            label="所属分类"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
        </el-table>
        <div
          class="table_bottom"
          style="display: flex; justify-content: flex-end"
        >
          <page
            :data="listTotal"
            :curpage="pageNum"
            @pageChange="handlePageChange"
          />
        </div>
      </div>
      <div class="main-right">
        <div class="right-head">
          <div>已选教材:{{ selection.length }}</div>
          <p @click="hadleResetUser" style="cursor: pointer">清空</p>
        </div>
        <ul>
          <li v-for="(item, index) in selection" :key="item.id">
            <p>{{ item.title }}</p>
            <i class="el-icon-delete" @click="handleRemoveUser(index)"></i>
          </li>
        </ul>
      </div>
    </section>
    <!-- <span>这是一段信息</span> -->

    <span slot="footer" class="dialog-footer">
      <el-button @click="hanldeCancel">取 消</el-button>
      <el-button type="primary" @click="handleconfirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getQuesbank, getCateList } from "@/api/sou";
export default {
  data() {
    return {
      listData: [],
      listLoading: false,
      visible: this.value,
      selection: [],
      pageNum: 1,
      listTotal: 0,
      searchData: {
        category_id: [],
        title: "",
      },
      choseCourse: [],
      searchOptions: [
        {
          key: "category_id",
          type: "cascader",
          attrs: {
            clearable: true,
            props: { checkStrictly: true },
            filterable: true,
            options: [],
          },
        },
        {
          key: "title",
          attrs: {
            placeholder: "课程名称",
          },
        },
      ],
      selectData: [],
      listData: [],
    };
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    quesTag: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },
  created() {},
  methods: {
    handleOpen() {
      this.getCateList();
      this.getQuesbank();
      this.$nextTick(() => {
        this.selection = [...this.quesTag];
        // 替换掉this.$refs.multipleTable.selection上原有的
        const len = this.$refs.multipleTable.selection.length;
        this.$refs.multipleTable.selection.splice(0, len, ...this.quesTag);
      });
    },
    hanldeCancel() {
      this.$emit("input", false);
      this.pageNum = 1;
    },
    handleconfirm() {
      this.$emit("on-quesuccess", [...this.selection]);
      this.hanldeCancel();
    },
    // 切换列表选择状态
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    // 指定一个唯一标识。id或者其他唯一的
    getRowKeys(row) {
      return row.id;
    },

    // 右侧已选删除
    handleRemoveUser(index) {
      this.$refs.multipleTable.selection.splice(index, 1);
      this.selection.splice(index, 1);
    },
    // 右侧已选清空
    hadleResetUser() {
      this.toggleSelection();
    },
    // table选中
    handleTableChange(selection) {
      this.selection = selection ? [...selection] : [];
    },
    // closeMaterial() {
    //   this.$emit('closeMaterial')
    // },
    async getCateList() {
      const data = { list: true };
      const res = await getCateList(data);
      if (res.code === 0) {
        this.cloneData(res.data, this.selectData);
        console.log(this.selectData);
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
      this.searchData = {
        ...data,
      };
      this.getQuesbank();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getQuesbank();
    },
    async getQuesbank() {
      const data = {
        page: this.pageNum,
        ...this.searchData,
        category_id: this.searchData.category_id.pop(),
      };
      this.listLoading = true;
      const res = await getQuesbank(data);
      this.listLoading = false;
      this.listData = res.data.list;
      this.listTotal = res.data.total;
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  display: flex;
  .userTable {
    border: 1px solid rgb(220, 223, 230);
    flex: 1;
    width: 0;
  }
  .main-right {
    width: 317px;
    margin-left: 15px;
    border: 1px solid rgb(220, 223, 230);
    .right-head {
      display: flex;
      font-family: "Arial Negreta", "Arial Normal", "Arial", sans-serif;
      font-weight: 700;
      font-style: normal;
      color: #909399;
      justify-content: space-between;
      padding: 14px 25px;
      background-color: #f8f8f8;
      border-bottom: 1px solid rgb(220, 223, 230);
      p {
        color: #199fff;
        cursor: pointer;
        font-weight: 400;
        font-style: normal;
      }
    }
    ul {
      li {
        display: flex;
        padding: 14px 25px;
        justify-content: space-between;
        font-family: "Arial Normal", "Arial", sans-serif;
        font-weight: 400;
        font-style: normal;
        color: #909399;
        border-bottom: 1px solid rgb(220, 223, 230);
        i {
          color: salmon;
          font-size: 16px;
        }
      }
      li:hover {
        background: #f6fbff;
      }
    }
  }
}
</style>
