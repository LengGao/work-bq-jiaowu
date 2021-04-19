<template>
  <el-dialog
    title="选择项目"
    :visible.sync="openStatus"
    @close="doClose"
    @open="handleOpen"
    :close-on-click-modal="false"
    width="1000px"
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
          @selection-change="handleSelectionChange"
          ref="multipleTable"
          :data="listData"
          :row-key="getRowKeys"
          @row-click="handleRowClick"
          v-loading="listLoading"
          element-loading-text="loading"
          element-loading-spinner="el-icon-loading"
          element-loading-background="#fff"
          style="width: 100%"
          class="min_table"
          height="400"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column
            type="selection"
            :reserve-selection="true"
            width="55"
          >
          </el-table-column>
          <el-table-column
            label="项目名称"
            show-overflow-tooltip
            min-width="90"
            prop="project_name"
          >
          </el-table-column>
          <el-table-column
            prop="category_name"
            label="所属分类"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column
            label="项目价格"
            min-width="110"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <div>￥{{ row.project_price }}</div>
            </template>
          </el-table-column>
        </el-table>
        <div class="table_bottom" style="display:flex;justify-content:flex-end">
          <page
            :data="listTotal"
            :pageSize="pageSize"
            :curpage="pageNum"
            @pageChange="handlePageChange"
          />
        </div>
      </div>
      <div class="main-right">
        <div class="right-head">
          <div>已选课程:{{ choseCourse.length }}</div>
          <p @click="clearData">
            清空
          </p>
        </div>
        <ul>
          <li v-for="(item, index) in choseCourse" :key="item.course_id">
            <p>{{ item.project_name }}</p>
            <i class="el-icon-delete" @click="handleRowClick(item)"></i>
          </li>
        </ul>
      </div>
    </section>
    <!-- <span>这是一段信息</span> -->

    <span slot="footer" class="dialog-footer">
      <el-button @click="doClose">取 消</el-button>
      <el-button type="primary" @click="handleconfirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getCourseList, getCateList } from '@/api/sou'
import { getProject } from '@/api/etm'
export default {
  props: {
    projectVisible: {
      type: Boolean,
      default: false,
    },
    projectData: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      pageSize: 10,
      dialogWidth: 0,
      openStatus: this.projectVisible,
      listData: [],
      choseCourse: [],
      listLoading: false,
      dialogVisible: true,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        category_id: [],
        course_name: '',
      },

      searchOptions: [
        {
          key: 'category_id',
          type: 'cascader',
          attrs: {
            clearable: true,
            placeholder: '请选择所属分类',
            options: [{ value: 1, label: 'test' }],
          },
        },
        {
          key: 'course_name',
          attrs: {
            placeholder: '请输入项目名称',
          },
        },
      ],
      selectData: [],
      listData: [],
    }
  },
  watch: {
    projectVisible(val) {
      this.openStatus = val
    },
    projectData(val) {},
  },
  created() {},
  mounted() {},
  methods: {
    handleRowClick(row, column, event) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    handleOpen() {
      this.getProject()
      this.getCateList()
      // 把已经选择的回显上
      this.$nextTick(() => {
        this.choseCourse = [...this.projectData]
        console.log(this.selection)
        // 替换掉this.$refs.multipleTable.selection上原有的
        const len = this.$refs.multipleTable.selection.length
        this.$refs.multipleTable.selection.splice(0, len, ...this.projectData)
      })
    },
    //项目列表
    async getProject() {
      const data = {
        page: this.pageNum,
        ...this.searchData,
        status: 1,
        limit: 10,
      }
      console.log(data)
      this.listLoading = true
      const res = await getProject(data)
      this.listLoading = false
      this.listData = res.data.data
      this.listTotal = res.data.total

      console.log(this.listTotal)
      console.log(this.projectData)
    },
    // 指定一个唯一标识。id或者其他唯一的
    getRowKeys(row) {
      return row.project_id
    },
    // 切换列表选择状态
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    clearData() {
      this.toggleSelection()
    },
    doClose() {
      this.pageNum = 1
      // this.choseCourse = []
      // this.$refs.multipleTable.clearSelection()
      this.$emit('projectDialog', false)
    },
    resetForm() {},
    handleconfirm() {
      this.$emit('courseArr', [...this.choseCourse])
      this.doClose()
    },
    deleteCourse(index) {
      this.choseCourse.splice(index, 1)
    },
    handleSelectionChange(choseCourse) {
      this.choseCourse = choseCourse ? [...choseCourse] : []
    },

    async getCateList() {
      const data = { list: true }
      const res = await getCateList(data)
      if (res.code === 0) {
        this.cloneData(res.data, this.selectData)
        console.log(this.selectData)
        this.searchOptions[0].attrs.options = this.selectData
      }
    },
    cloneData(data, newData) {
      data.forEach((item, index) => {
        newData[index] = {}
        newData[index].value = item.category_id
        newData[index].label = item.category_name
        if (item.son && item.son.length) {
          newData[index].children = []
          this.cloneData(item.son, newData[index].children)
        }
      })
    },
    handlePageChange(val) {
      this.pageNum = val
      this.getProject()
    },
    handleSearch(data) {
      this.pageNum = 1
      this.searchData = {
        ...data,
        category_id: data.category_id ? data.category_id.pop() : '',
      }
      this.getProject()
    },
  },
}
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
      font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
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
        font-family: 'Arial Normal', 'Arial', sans-serif;
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
