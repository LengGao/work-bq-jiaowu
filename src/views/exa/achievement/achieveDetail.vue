<template>
  <section class="mainwrap">
    <header>
      <SearchList :options="searchOptions" :data="searchData" @on-search="handleSearch" />
      <el-button type="primary" @click="openBatch">批量录入</el-button>
    </header>
    <el-table :data="listData" tooltip-effect="light" stripe @selection-change="handleSelectionChange" style="width: 100%" v-loading="listLoading" element-loading-text="loading" element-loading-spinner="el-icon-loading" element-loading-background="#fff" class="min_table" :header-cell-style="{ 'text-align': 'center' }" :cell-style="{ 'text-align': 'center' }">
      <el-table-column type="selection" width="45"> </el-table-column>
      <el-table-column :prop="item.prop" :label="item.title" min-width="100" v-for="item in title" :key="item.prop">
        <template slot-scope="scope">
          <div :class="{
              green: scope.row[scope.column.property] === '通过',
              red: scope.row[scope.column.property] === '补考',
              blue: scope.row[scope.column.property] === '待定',
            }">
            {{ scope.row[scope.column.property] }}
          </div>
        </template>

        <el-table-column min-width="60" v-show="item.children && item.children.length" v-for="i in item.children" :key="i.prop" :prop="i.prop" :label="i.title">
        </el-table-column>
      </el-table-column>

      <el-table-column label="操作" fixed="right" min-width="80">
        <template slot-scope="{ row }">
          <div style="display: flex; justify-content: center">
            <el-button type="text" @click="openScoreDialog(row.id)">
              {{ row.update_time ? '修改' : '录入' }}</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div style="display:flex;justify-content:space-between">
      <div style="margin-top:10px">
        <el-button @click="addRegistration">添加报考</el-button>
        <el-button @click="batchpassStudent">批量通过</el-button>
      </div>
      <div class="table_bottom">
        <page :data="listTotal" :curpage="pageNum" @pageChange="handlePageChange" />
      </div>
    </div>

    <!--添加成绩弹框--->
    <AddScore v-model="dialogVisible" :title="dialogTitle" :id="currentId" :typeOptions="typeOptions" @on-success="getGradeListByPlan" />
    <!--添加报考弹框--->
    <AddRegistration v-model="regisVisible" :userName="userName" :uids="uids" @on-success="getGradeListByPlan" />
    <!--批量录入弹框--->
    <BatchEntry v-model="batchVisible" :pid="pid" />
  </section>
</template>

<script>
import { cloneOptions } from '@/utils/index'
import { getGradeListByPlan, getPlanGradeSelect, batchPass } from '@/api/exa'
import AddScore from './components/AddScore'
import BatchEntry from './components/BatchEntry'
import AddRegistration from './components/AddRegistration'
export default {
  name: 'achieveDetail',
  components: {
    AddScore,
    BatchEntry,
    AddRegistration,
  },
  data() {
    return {
      batchVisible: false,
      dialogVisible: false,
      regisVisible: false,
      dialogTitle: '录入成绩',
      tableData: [],
      listData: [],
      userName: '',
      title: {},
      uids: [],
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
      pid: '',
      currentId: '',
      erid_arr: [],
    }
  },
  created() {
    this.searchData.pid = this.pid = this.$route.query.id
    this.getPlanGradeSelect()
    this.getGradeListByPlan()
  },
  methods: {
    openBatch() {
      this.batchVisible = true
    },
    addRegistration() {
      if (this.erid_arr.length > 0) {
        this.regisVisible = true
      } else {
        this.$message.warning('你还没有选择学生')
      }
    },
    batchpassStudent() {
      if (this.erid_arr.length > 0) {
        this.batchPass()
      } else {
        this.$message.warning('你还没有选择学生')
      }
    },
    async batchPass() {
      const data = {
        pid: this.searchData.pid,
        erid_arr: this.erid_arr,
      }
      delete data.date
      this.listLoading = true
      const res = await batchPass(data)
      this.listLoading = false
      if (res.code == 0) {
        this.$message.success(res.message)
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
      this.uids = val.map((i) => {
        return i.uid
      })
      let erid_arr_name = val.map((i) => {
        return i.user_realname
      })
      let userNameArr = ''
      let len = erid_arr_name.length
      const name = erid_arr_name.slice(0, 2)
      const nameStr = len > 2 ? `  ...等${len}人` : ''
      userNameArr = name.join(',') + nameStr
      this.userName = userNameArr
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
        this.searchOptions[0].options = cloneOptions(res.data.exam_type, 'name', 'id')
        console.log(this.searchOptions[0].options)
        this.searchOptions[1].options = this.typeOptions = cloneOptions(
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
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.green {
  color: #43d100;
}
.unqualified {
  color: #fd6500;
}
.red {
  color: $error_color;
}
.blue {
  color: #199fff;
}
.table_bottom {
  text-align: right;
}
</style>
