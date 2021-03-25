<template>
  <el-dialog
    title="选择项目"
    :visible.sync="openStatus"
    @close="doClose"
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
          @selection-change="handleSelectionChange"
          ref="multipleTable"
          :data="listData.data"
          v-loading="listLoading"
          element-loading-text="loading"
          element-loading-spinner="el-icon-loading"
          element-loading-background="#fff"
          style="width: 100%"
          class="min_table"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
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
            prop="project_price"
            label="项目价格"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <!-- <el-table-column
            prop="category_name"
            label="适用校区"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column> -->
        </el-table>
        <div class="table_bottom" style="display:flex;justify-content:flex-end">
          <page
            :data="listTotal"
            :curpage="pageNum"
            @pageChange="handlePageChange"
          />
        </div>
      </div>
      <div class="main-right">
        <div class="right-head">
          <div>已选课程:3</div>
          <p>
            清空
          </p>
        </div>
        <ul>
          <li v-for="(item, index) in choseCourse" :key="item.course_id">
            <p>{{ item.project_name }}</p>
            <i class="el-icon-delete" @click="deleteCourse(index)"></i>
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
export default {
  props: {
    projectVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      openStatus: this.projectVisible,
      listData: [],
      listLoading: false,
      dialogVisible: true,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        category_id: [],
        course_name: '',
      },
      choseCourse: [],
      searchOptions: [
        {
          key: 'category_id',
          type: 'cascader',
          attrs: {
            clearable: true,
            options: [{ value: 1, label: 'test' }],
          },
        },
        {
          key: 'course_name',
          attrs: {
            placeholder: '课程名称',
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
  },
  created() {
    this.getCateList()
    // console.log(this.selectData)
    this.$api.getProjectList(this, 'listData')
  },
  methods: {
    doClose() {
      this.$emit('projectDialog', false)
    },
    handleconfirm() {
      this.doClose()
      this.$emit('courseArr', this.choseCourse)
    },
    deleteCourse(index) {
      this.choseCourse.splice(index, 1)
    },
    handleSelectionChange(val) {
      console.log(val)
      this.choseCourse = val
    },
    // closeCourse() {
    //   this.$emit('closeCourse')
    // },
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
      this.$api.getProjectList(this, 'schoolData')
    },
    handleSearch(data) {
      this.pageNum = 1
      this.searchData = data
      this.$api.getProjectList(this, 'schoolData')
    },
    async getCourseList() {
      const data = {
        page: this.pageNum,
        ...this.searchData,
        course_category_id: this.searchData.category_id.pop(),
      }
      console.log(data)
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
  width: 100%;
  display: flex;
  .userTable {
    border: 1px solid rgb(220, 223, 230);
    flex: 1;
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
