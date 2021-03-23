<template>
  <el-dialog
    title="选择课程"
    :visible.sync="dialogVisible"
    width="70%"
    append-to-body
  >
    <SearchList
      :options="searchOptions"
      :data="searchData"
      @on-search="handleSearch"
    />
    <section class="main">
      <div class="userTable">
        <el-table
          ref="multipleTable"
          :data="courseData"
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
            label="课程名称"
            show-overflow-tooltip
            min-width="90"
            prop="book_id"
          >
          </el-table-column>
          <el-table-column
            prop="book_name"
            label="所属分类"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column
            prop="category_name"
            label="课程属性"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
        </el-table>
        <div class="table_bottom">
          <page
            :data="listTotal"
            :curpage="pageNum"
            @pageChange="handlePageChange"
          />
        </div>
      </div>
      <div class="main"></div>
    </section>
    <!-- <span>这是一段信息</span> -->

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getCourseList } from '@/api/sou'
export default {
  data() {
    return {
      listData: [],
      listLoading: false,
      dialogVisible: true,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        category_id: [],
        keyboard: '',
      },
      searchOptions: [
        {
          key: 'category_id',
          type: 'cascader',
          attrs: {
            placeholder: '所属分类',
            clearable: true,
            options: [],
          },
        },
        {
          key: 'category_id',
          type: 'select',
          attrs: {
            placeholder: '课程属性',
            clearable: true,
            options: [],
          },
        },
        {
          key: 'keyboard',
          attrs: {
            placeholder: '教材名称/教材条码',
          },
        },
      ],

      selectData: [],
    }
  },
  props: {
    courseData: {
      type: Array,
      default: () => [],
    },
  },
  created() {
    this.getCourseList()
  },
  methods: {
    handlePageChange(val) {
      this.pageNum = val
      this.getCourseList()
    },
    handleSearch() {
      this.getCourseList()
    },
    async getCourseList() {
      const data = {
        page: this.pageNum,

        ...this.searchData,
        category_id: this.searchData.category_id.pop(),
      }
      this.listLoading = true
      const res = await getCourseList(data)
      this.listLoading = false
      this.listData = res.data.list
      this.listTotal = res.data.total
    },
  },
}
</script>

<style lang="scss" scoped>
.main {
  display: flex;
}
</style>
