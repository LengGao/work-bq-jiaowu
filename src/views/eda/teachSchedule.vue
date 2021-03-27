<template>
  <section>
    <div class="head_remind">
      *本模块展示所有的班级数据，方便教务老师管理班级的日常工作
    </div>
    <section class="mainwrap">
      <div class="head-search">
        <search2
          :courseTypeShow="true"
          :contentShow="true"
          typeTx="punch"
          api="getHomeclassifiList"
          inputText="教材名称"
          @getTable="getTableList"
        ></search2>
        <div>
          <el-button type="primary" @click="toAddSchedule">
            添加排课
          </el-button>
          <el-button type="primary" @click="toAllSchedule">
            查看全部排课
          </el-button>
        </div>
      </div>
      <!--表格-->
      <div class="userTable">
        <el-table
          ref="multipleTable"
          :data="schoolData.list"
          style="width: 100%"
          class="min_table"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column
            label="序号"
            show-overflow-tooltip
            min-width="90"
            prop="project_id"
          >
            <template slot-scope="scope">
              <div>
                {{ scope.$index + 1 }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="classroom_name"
            label="班级名称"
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
            prop="total_people"
            label="学生数"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="frist_class_time"
            label="开课日期"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column label="操作" fixed="right" min-width="200">
            <template slot-scope="scope">
              <div style="display:flex;justify-content:center">
                <el-button type="text" @click="toTimetablePreview(scope.row)"
                  >课表预览</el-button
                >
                <!-- <el-button type="text" @click="handleDelete(scope.row)"
                  >删除</el-button
                > -->
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="table_bottom">
          <div class="table_bottom">
            <page
              :data="schoolData.total"
              :curpage="page"
              @pageChange="doPageChange"
            />
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
// import SearchList from '@/components/SearchList/index'
export default {
  name: 'teachSchedule',
  // components: {
  //   SearchList,
  // },
  data() {
    return {
      schoolData: [],
      page: 1,
    }
  },
  created() {
    this.$api.getTimetableList(this, 'schoolData')
  },
  methods: {
    doPageChange(page) {
      this.page = page
      this.$api.getTimetableList(this, 'schoolData')
    },
    toTimetablePreview(ab) {
      console.log(ab)
      // let time = this.$moment.unix(ab.frist_class_time).format('YYYY-MM-DD')
      // console.log(time)
      this.$router.push({
        path: '/eda/timetablePreview',
        query: {
          time: ab.frist_class_time,
          classroom_id: ab.classroom_id,
          category_id: ab.category_id,
        },
      })
    },
    toAllSchedule() {
      this.$router.push({
        path: '/eda/allSchedule',
      })
    },
    toAddSchedule() {
      this.$router.push({
        path: '/eda/addSchedule',
      })
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
.head_remind {
  padding: 20px;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  color: #909399;
  width: 100%;
  border-bottom: 15px solid #f2f6fc;
}
.head-search {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
}
</style>
