<template>
  <section class="mainwrap">
    <search2
      api="getRecommendList"
      :contentShow="true"
      @getTable="getTableList"
      inputText="章节名称"
    ></search2>
    <!--表格-->
    <div class="userTable">
      <el-table
        ref="multipleTable"
        :data="schoolData.list"
        tooltip-effect="light"
        row-key="institution_id"
        :tree-props="{ children: 'Blocks' }"
        stripe
        style="width: 100%"
        class="min_table"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <!-- <el-table-column type="selection" width="30"></el-table-column> -->
        <el-table-column
          prop="institution_name"
          label="机构名称"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="host_man"
          label="负责人"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="telephone"
          label="联系方式"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="recommend_num"
          label="学生人数"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              v-if="scope.row.parent_id == '0'"
              @click="toCourseType(scope.row)"
              >课程管理</el-button
            >
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
</template>

<script>
export default {
  name: 'realTopic',
  data() {
    return {
      page: 1,
      datas: {},

      schoolData: [],
    }
  },
  created() {
    this.$api.getRecommendList(this, 'schoolData')
  },
  methods: {
    doPageChange(page) {
      this.page = page
      this.$api.getRecommendList(this, 'schoolData', this.datas)
    },
    getTableList(state, val, datas) {
      console.log(state, val)
      if (state == 'page') {
        this.page = val
        this.datas = datas
      } else if (state == 'data') {
        this.schoolData = val
      }
    },
    toCourseType(zx) {
      this.$router.push({
        path: '/sts/courseType',
        // query: {
        //   institution_id: zx.institution_id,
        // },
        query: {
          institution_id: 3,
        },
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
.main {
  padding: 20px;
  margin: 20px;
  background: #fff;
}

.userTable {
  margin-top: 20px;
}
</style>
