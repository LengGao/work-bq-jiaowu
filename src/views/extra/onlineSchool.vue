<template>
  <section class="mainwrap">
    <!--表格-->
    <div class="userTable">
      <el-table
        ref="multipleTable"
        tooltip-effect="light"
        stripe
        :data="totalConfig"
        style="width: 100%;"
        class="min_table"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column
          prop="name"
          label="页面位置"
          show-overflow-tooltip
          min-width="200"
        ></el-table-column>
        <el-table-column
          prop="update_time"
          label="最后修改时间"
          min-width="200"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column label="操作" min-width="200" max-width="200">
          <template slot-scope="scope">
            <div class="operation_btn">
              <el-button type="text" @click="handleEdit(scope.row)"
                >编辑</el-button
              >
              <!-- <el-button
                style="padding-left:20px"
                type="text"
                @click="handleDelete(scope.row)"
                >删除</el-button
              > -->
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </section>
</template>

<script>
export default {
  name: 'onlineSchool',
  data() {
    return {
      totalConfig: [],
    }
  },
  created() {
    this.$api.getTotalConfigInfo(this, 'totalConfig')
  },
  methods: {
    handleEdit(zx) {
      console.log(zx.keyword)
      // zx.keyword=="home_page"?
      let path = ''
      switch (zx.keyword) {
        case 'home_page':
          path = 'pageDesign'
          break
        case 'page_advert':
          path = 'pageAdvert'
          break
        case 'about_us':
          path = 'aboutUs'
          break
        case 'contact_us':
          path = 'contactUs'
          break
        default:
          path = ''
      }
      console.log(path)
      this.$router.push({
        path: '/extra/' + path,
        query: {
          keyword: zx.keyword,
          config_id: zx.config_id,
        },
      })
    },
  },
}
</script>

<style lang="less" scoped>
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
</style>
