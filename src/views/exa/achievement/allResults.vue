<template>
  <section class="mainwrap">
    <header>
      <SearchList
        :options="searchOptions"
        :data="searchData"
        @on-search="handleSearch"
      />
    </header>

    <div class="userTable">
      <el-table
        ref="multipleTable"
        :data="listData"
        tooltip-effect="light"
        v-loading="listLoading"
        element-loading-text="loading"
        element-loading-spinner="el-icon-loading"
        element-loading-background="#fff"
        stripe
        style="width: 100%;"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
        class="min_table"
      >
        <el-table-column type="selection" width="45"> </el-table-column>
        <el-table-column
          prop="subject_name"
          label="考试科目"
          show-overflow-tooltip
          min-width="80"
        ></el-table-column>

        <el-table-column
          prop="category_name"
          label="所属分类"
          min-width="100"
          column-key="course_id"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="exam_type_name"
          label="科目性质"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="total_score"
          label="试卷满分"
          min-width="200"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="max_score"
          label="最高成绩"
          min-width="80"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="考试状态"
          prop=""
          min-width="100"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            {{ row.exam_result | exam_resulType }}
          </template>
        </el-table-column>

        <el-table-column label="操作" fixed="right" min-width="200">
          <template slot-scope="{ row }">
            <div style="display: flex; justify-content: center">
              <el-button type="text" @click="showDialog(row.id)"
                >历史成绩</el-button
              >
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
    <!--弹框-->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="60%">
      <div class="dialog-head">
        <p>学生姓名<span>张小北</span></p>
        <p>学生姓名<span>张小北</span></p>
        <p>学生姓名<span>张小北</span></p>
      </div>
      <el-table
        ref="multipleTable"
        :data="hisData"
        tooltip-effect="light"
        v-loading="hisLoading"
        element-loading-text="loading"
        element-loading-spinner="el-icon-loading"
        element-loading-background="#fff"
        stripe
        style="width: 100%;"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
        class="min_table"
      >
        <el-table-column
          v-for="(item, index) in title"
          :key="index"
          :prop="item.prop"
          :label="item.title"
          show-overflow-tooltip
          min-width="150"
        ></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <div style="display:flex;justify-content:center;width:100%">
          <el-button @click="dialogVisible = false" type="primary"
            >关 闭</el-button
          >
        </div>
      </span>
    </el-dialog>
  </section>
</template>

<script>
import { cloneOptions } from '@/utils/index'
import {
  getPlanGradeSelect,
  getHistoryGradeList,
  getSubjectListByUser,
} from '@/api/exa'
import { getCateList } from '@/api/sou'

export default {
  data() {
    return {
      dialogVisible: false,
      title: [],
      searchOptions: [
        {
          key: 'cate_id',
          type: 'cascader',
          attrs: {
            placeholder: '所属分类',
            clearable: true,
            options: [],
          },
        },
        {
          key: 'exam_type',
          type: 'select',
          options: [],
          attrs: {
            placeholder: '科目性质',
            clearable: true,
          },
        },
        {
          key: 'search_box',
          attrs: {
            placeholder: '考试科目名称',
          },
        },
      ],
      listData: [],
      hisData: [],
      hisLoading: false,
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      project_id: 0,
      searchData: {
        uid: '',
        cate_id: [],
        exam_type: '',
        search_box: '',
      },
    }
  },
  filters: {
    exam_resulType(val) {
      switch (val) {
        case 1:
          return '合格'
          break
        case 2:
          return '不合格'
          break
        case 3:
          return '已过期'
        default:
          return '未知'
      }
    },
  },
  created() {
    this.getPlanGradeSelect()
    this.searchData.uid = this.$route.query.uid
    this.getSubjectListByUser()
    this.getCateList()
  },
  methods: {
    showDialog(project_id) {
      this.project_id = project_id
      this.getHistoryGradeList()
      this.dialogVisible = true
    },
    async getPlanGradeSelect() {
      const data = { list: true }
      const res = await getPlanGradeSelect(data)

      if (res.code === 0) {
        this.searchOptions[1].options = cloneOptions(
          res.data.exam_type,
          'name',
          'id'
        )
      }
    },
    toAchieveDetail(ab) {
      console.log(ab.id)
      this.$router.push({
        path: '/exa/achieveDetails',
        query: {
          id: ab.id,
        },
      })
    },
    handlePageChange(val) {
      this.pageNum = val
      this.getSubjectListByUser()
    },
    handleSearch(data) {
      this.pageNum = 1
      this.searchData = {
        ...data,
        cate_id: data.cate_id?.pop() || 0,
      }
      this.getSubjectListByUser()
    },
    // 获取教材分类
    async getCateList() {
      const data = { list: true }
      const res = await getCateList(data)
      if (res.code === 0) {
        this.searchOptions[0].attrs.options = cloneOptions(
          res.data,
          'category_name',
          'category_id',
          'son'
        )
      }
    },

    // 获取历史成绩
    async getHistoryGradeList() {
      const data = {
        uid: this.$route.query.uid,
        sid: this.project_id,
      }

      this.hisLoading = true
      const res = await getHistoryGradeList(data)
      this.hisLoading = false
      this.hisData = res.data.list
      this.title = res.data.title_field
      //   this.listTotal = res.data.total
    },
    // 获取教材分类
    async getSubjectListByUser() {
      const data = {
        page: this.pageNum,
        ...this.searchData,
        // cate_id: data.cate_id.pop(),
      }
      delete data.date
      this.listLoading = true
      const res = await getSubjectListByUser(data)
      this.listLoading = false
      this.listData = res.data.list
      this.listTotal = res.data.total
    },
  },
}
</script>

<style lang="scss" scoped>
/deep/.el-table__header th,
.el-table__header tr {
  background-color: #f8f8f8;
  color: #909399;
}
.dialog-head {
  color: #606266;
  text-align: right;
  display: flex;
  justify-content: space-between;
  width: 80%;
  font-family: 'Arial Normal', 'Arial', sans-serif;
  font-weight: 400;
  font-style: normal;
  padding-left: 20px;
  margin-bottom: 20px;
  p {
    span {
      margin-left: 7px;
    }
  }
}
</style>
