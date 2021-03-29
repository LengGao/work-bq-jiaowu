<template>
  <section>
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
          prop="user_realname"
          label="学生姓名"
          show-overflow-tooltip
          min-width="80"
        ></el-table-column>

        <el-table-column
          prop="telphone"
          label="手机号码"
          min-width="100"
          column-key="course_id"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          prop="create_time"
          label="注册时间"
          min-width="200"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="institution_name"
          label="所属机构"
          min-width="80"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column label="所属校区" min-width="100" show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          label="项目名称"
          min-width="150"
          prop="project"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column label="操作" fixed="right" min-width="200">
          <template slot-scope="{ row }">
            <div style="display: flex; justify-content: center">
              <el-button type="text" @click="toAllResults(row.uid)"
                >全部成绩</el-button
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
  </section>
</template>

<script>
import { cloneOptions } from '@/utils/index'
import { getGradeListByUser } from '@/api/exa'
import { getCateList, getInstitutionSelectData } from '@/api/sou'
import { getproject, getcourseallclass } from '@/api/eda'
export default {
  data() {
    return {
      searchOptions: [
        {
          key: 'date',
          type: 'datePicker',
          attrs: {
            type: 'daterange',
            'range-separator': '至',
            'start-placeholder': '开始日期',
            'end-placeholder': '结束日期',
            'value-format': 'yyyy-MM-dd',
          },
        },

        {
          key: 'cate_id',
          type: 'cascader',
          events: {
            change: this.handleTypeChange,
          },
          attrs: {
            placeholder: '所属分类',
            clearable: true,
            options: [],
          },
        },
        {
          key: 'project_id',
          type: 'select',
          options: [],
          optionValue: 'project_id',
          optionLabel: 'project_name',
          attrs: {
            placeholder: '所属项目',
            clearable: true,
          },
        },
        {
          key: 'class_id',
          type: 'select',
          options: [],
          optionValue: 'classroom_id',
          optionLabel: 'classroom_name',
          attrs: {
            placeholder: '所属班级',
            clearable: true,
          },
        },
        {
          key: 'foid',
          type: 'cascader',
          attrs: {
            placeholder: '推荐机构',
            clearable: true,
            options: [],
          },
        },

        {
          key: 'search_box',
          attrs: {
            placeholder: '学生姓名/手机号码',
          },
        },
      ],
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        type: 0,
        date: '',
        cate_id: '',
        project_id: '',
        class_id: '',
        foid: [],
        search_box: '',
      },
    }
  },
  created() {
    this.getGradeListByUser()
    this.getInstitutionSelectData()
    this.getproject()
    this.getCateList()
  },
  methods: {
    toAllResults(uid) {
      this.$router.push({
        path: '/exa/allResult',
        query: {
          uid: uid,
        },
      })
    },
    // 当分类选择时
    handleTypeChange(ids) {
      const id = ids ? [...ids].pop() : ''

      this.getproject(id)
      this.getcourseallclass(id)
    },
    // 获取班级下拉
    async getcourseallclass(category_id) {
      const data = { category_id }
      const res = await getcourseallclass(data)
      if (res.code === 0) {
        this.classOptions = res.data
        this.searchOptions[3].options = res.data
      }
    },
    // 获取项目下拉
    async getproject(category_id = '') {
      const data = {
        category_id,
      }
      const res = await getproject(data)
      if (res.code === 0) {
        this.searchOptions[2].options = res.data
      }
    },
    handlePageChange(val) {
      this.pageNum = val
      this.getGradeListByUser()
    },
    handleSearch(data) {
      console.log(data)
      const times = data.date || ['', '']
      delete data.date
      this.pageNum = 1
      this.searchData = {
        ...data,
        cate_id: data.cate_id?.pop() || 0,
        foid: data.foid.pop(),
        start_time: times[0],
        end_time: times[1],
      }
      this.getGradeListByUser()
    },
    // 获取教材分类
    async getCateList() {
      const data = { list: true }
      const res = await getCateList(data)
      if (res.code === 0) {
        this.searchOptions[1].attrs.options = cloneOptions(
          res.data,
          'category_name',
          'category_id',
          'son'
        )
      }
    },
    // 获取机构
    async getInstitutionSelectData() {
      const data = { list: true }
      const res = await getInstitutionSelectData(data)
      if (res.code === 0) {
        this.searchOptions[4].attrs.options = cloneOptions(
          res.data,
          'institution_name',
          'institution_id',
          'children'
        )
      }
    },
    // 获学员列表
    async getGradeListByUser() {
      const data = {
        page: this.pageNum,
        ...this.searchData,
      }
      delete data.date
      this.listLoading = true
      const res = await getGradeListByUser(data)
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
</style>
