<template>
  <section class="mainwrap">
    <header>
      <SearchList
        :options="searchOptions"
        :data="searchData"
        @on-search="handleSearch"
      />
    </header>
    <el-table
      :data="listData"
      tooltip-effect="light"
      stripe
      style="width: 100%"
      class="min_table"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column
        :prop="item.prop"
        :label="item.title"
        width="150"
        v-for="item in title"
        :key="item.prop"
      >
        <el-table-column
          width="120"
          v-show="item.children && item.children.length"
          v-for="i in item.children"
          :key="i.prop"
          :prop="i.prop"
          :label="i.title"
        >
        </el-table-column>
      </el-table-column>

      <el-table-column label="操作" fixed="right" min-width="200">
        <template slot-scope="{ row }">
          <div style="display: flex; justify-content: center">
            <el-button type="text" @click="openEdit(row.book_id)"
              >录入成绩</el-button
            >
            <!-- <el-button type="text" @click="link(row.book_id)"
              >库存详情</el-button
            > -->
          </div>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
import { cloneOptions } from '@/utils/index'
import { getGradeListByPlan, getPlanGradeSelect } from '@/api/exa'
export default {
  name: 'achieveDetail',
  data() {
    return {
      tableData: [],
      listData: [],
      title: {},
      searchOptions: [
        {
          key: 'exam_type',
          type: 'select',
          attrs: {
            placeholder: '考试性质',
            clearable: true,
          },
          options: [],
        },
        {
          key: 'grade_status',
          type: 'select',
          attrs: {
            placeholder: '成绩状态',
            clearable: true,
          },
          options: [],
        },
        {
          key: 'search_box',
          attrs: {
            placeholder: '考试计划名称',
          },
        },
      ],
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        cate_id: [],
        date: '',
        exam_type: '',
        grade_status: '',
        search_box: '',
        pid: '',
      },
    }
  },
  created() {
    this.searchData.pid = this.$route.query.id
    this.getPlanGradeSelect()
    this.getGradeListByPlan()
  },
  methods: {
    handleSearch(data) {
      const times = data.date || ['', '']
      delete data.date
      this.pageNum = 1
      this.searchData = {
        ...data,
      }
      this.getGradeListByPlan()
    },
    // 获取教材分类
    async getPlanGradeSelect() {
      const data = { list: true }
      const res = await getPlanGradeSelect(data)

      if (res.code === 0) {
        this.searchOptions[0].options = cloneOptions(
          res.data.exam_type,
          'name',
          'id'
        )
        console.log(this.searchOptions[0].options)
        this.searchOptions[1].options = cloneOptions(
          res.data.grade_status,
          'name',
          'id'
        )
        console.log(this.searchOptions[1].options)
      }
    },
    async getGradeListByPlan() {
      const data = {
        page: this.pageNum,
        ...this.searchData,
        // pid: this.$route.query.id,
      }
      delete data.date
      this.listLoading = true
      const res = await getGradeListByPlan(data)
      this.listLoading = false
      this.title = res.data.title_field
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
