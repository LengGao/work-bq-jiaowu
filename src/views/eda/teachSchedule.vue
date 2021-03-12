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
          <el-button type="primary" @click="projectDialog">
            查看全部排课
          </el-button>
        </div>
      </div>
      <!--表格-->
      <div class="userTable">
        <el-table
          ref="multipleTable"
          :data="schoolData.data"
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
          </el-table-column>
          <el-table-column
            prop="project_name"
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
            prop="project_price"
            label="学生数"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column
            label="是否启用"
            min-width="150"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <el-switch
                active-color="#13ce66"
                v-model="scope.row.project_status"
                :active-value="1"
                :inactive-value="2"
                @change="changeSwitch(scope.row)"
              >
              </el-switch>
            </template>
          </el-table-column>

          <el-table-column label="操作" fixed="right" min-width="200">
            <template slot-scope="scope">
              <div style="display:flex;justify-content:center">
                <el-button type="text" @click="handleEdit(scope.row)"
                  >课表预览</el-button
                >
                <!-- <el-button type="text" @click="handleDelete(scope.row)"
                  >删除</el-button
                > -->
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!-- <div class="table_bottom">
        <div class="table_bottom">
          <page
            :data="schoolData.total"
            :curpage="page"
            @pageChange="doPageChange"
          />
        </div>
      </div> -->
      </div>
    </section>
  </section>
</template>

<script>
export default {
  data() {
    return {
      schoolData: [],
    }
  },
  methods: {
    toAddSchedule() {
      this.$router.push({
        path: '/eda/addSchedule',
      })
    },
  },
}
</script>

<style lang="scss" scoped>
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
