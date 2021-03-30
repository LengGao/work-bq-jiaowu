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
      @selection-change="handleSelectionChange"
      style="width: 100%"
      v-loading="listLoading"
      element-loading-text="loading"
      element-loading-spinner="el-icon-loading"
      element-loading-background="#fff"
      class="min_table"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column type="selection" width="45"> </el-table-column>
      <el-table-column
        :prop="item.prop"
        :label="item.title"
        min-width="90"
        v-for="item in title"
        :key="item.prop"
      >
        <template slot-scope="scope">
          <div
            :class="{
              green: scope.row[scope.column.property] === '通过',
            }"
          >
            <!-- {{ scope.column.property }} -->
            {{ scope.row[scope.column.property] }}
          </div>

          <!-- <span v-if="scope.row[scope.column.property] == 'grade_status'">
            <el-link type="primary">{{
              scope.row[scope.column.property]
            }}</el-link> -->
          <!--          {{scope.row}}&#45;&#45;{{scope.column}}-->
          <!-- </span> -->
        </template>

        <!-- <template slot-scope="{ row }">
          <div :class="row.grade_status == 1 ? 'qualified' : 'unqualified'">
            {{ row }}
          </div>
        </template> -->
        <el-table-column
          min-width="60"
          v-show="item.children && item.children.length"
          v-for="i in item.children"
          :key="i.prop"
          :prop="i.prop"
          :label="i.title"
        >
        </el-table-column>
      </el-table-column>

      <el-table-column label="操作" fixed="right" min-width="100">
        <template slot-scope="{ row }">
          <div style="display: flex; justify-content: center">
            <el-button type="text" @click="openScoreDialog(row.id)">
              {{ row.update_time ? '修改成绩' : '录入成绩' }}</el-button
            >
            <!-- <el-button type="text" @click="link(row.book_id)"
              >库存详情</el-button
            > -->
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div style="display:flex;justify-content:space-between">
      <div style="margin-top:10px">
        <el-button>添加报考</el-button>
        <el-button @click="batchPass">批量通过</el-button>
      </div>
      <div class="table_bottom">
        <page
          :data="listTotal"
          :curpage="pageNum"
          @pageChange="handlePageChange"
        />
      </div>
    </div>

    <!--弹框--->
    <AddScore
      v-model="dialogVisible"
      :title="dialogTitle"
      :id="currentId"
      :typeOptions="typeOptions"
      @on-success="getGradeListByPlan"
    />
  </section>
</template>

<script>
import { cloneOptions } from '@/utils/index'
import { getGradeListByPlan, getPlanGradeSelect, batchPass } from '@/api/exa'
import AddScore from './components/AddScore'
export default {
  name: 'achieveDetail',
  components: {
    AddScore,
  },
  data() {
    return {
      dialogVisible: false,
      dialogTitle: '录入成绩',
      tableData: [],
      listData: [],
      title: {},
      typeOptions: [],
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
      currentId: '',
    }
  },
  created() {
    this.searchData.pid = this.$route.query.id
    this.getPlanGradeSelect()
    this.getGradeListByPlan()
  },
  methods: {
    batchPass() {
      this.batchPass()
    },
    async batchPass() {
      const data = {
        pid: this.searchData.pid,
        erid_arr: this.erid_arr,
        // page: this.pageNum,
        // ...this.searchData,
        // pid: this.$route.query.id,
      }
      delete data.date
      this.listLoading = true
      const res = await batchPass(data)
      this.listLoading = false
      if (res.code == 0) {
        this.getGradeListByPlan()
      }
      // this.title = res.data.title_field
      // this.listData = res.data.list
      // this.listTotal = res.data.total
    },
    handleSelectionChange(val) {
      console.log(val)
      this.erid_arr = val.map((i) => {
        return i.id
      })
    },
    handlePageChange(val) {
      this.pageNum = val
      this.getGradeListByPlan()
    },
    openScoreDialog(id) {
      this.currentId = id
      this.dialogVisible = true
    },
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
        this.searchOptions[0].options = this.typeOptions = cloneOptions(
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
.green {
  color: #43d100;
}
.unqualified {
  color: #fd6500;
}
.red {
  color: red;
}
.blue {
  color: blue;
}
</style>
