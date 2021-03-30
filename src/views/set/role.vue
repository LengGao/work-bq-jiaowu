<template>
  <div>
    <div class="head_remind">
      *角色权限定义了用户可访问的功能模块和可执行操作。
    </div>

    <section class="mainwrap">
      <div class="main-header">
        <SearchList
          :options="searchOptions"
          :data="searchData"
          @on-search="handleSearch"
        />
        <el-button type="primary" @click="addrole">添加角色</el-button>
      </div>

      <!--表格-->
      <div class="userTable">
        <el-table
          ref="multipleTable"
          :data="listData"
          tooltip-effect="light"
          stripe
          style="width: 100%;"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
          class="min_table"
        >
          <el-table-column
            prop="role_id"
            label="角色编号"
            min-width="180"
            column-key="role_id"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="role_name"
            label="角色名称"
            min-width="150"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="update_time"
            label="修改时间"
            min-width="150"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="remarks"
            label="备注"
            min-width="180"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column label="操作" fixed="right" min-width="200">
            <template slot-scope="scope">
              <div style="display: flex; justify-content:center;">
                <el-button type="text" @click="addrole">编辑权限</el-button>
              </div>
            </template>
          </el-table-column>

          <el-pagination background layout="prev, pager, next" :total="1000">
          </el-pagination>
        </el-table>
      </div>
      <div class="table_bottom">
        <page
          :data="listTotal"
          :curpage="pageNum"
          @pageChange="handlePageChange"
        />
      </div>
    </section>
  </div>
</template>

<script>
import { getRoleList } from '@/api/set'
export default {
  name: 'role',

  data() {
    return {
      searchOptions: [
        {
          key: 'search_box',
          attrs: {
            placeholder: '角色名称',
          },
        },
      ],
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        search_box: '',
      },
    }
  },

  created() {
    this.getRoleList()
  },
  methods: {
    addrole() {
      this.$router.push({
        path: '/set/roledetail',
      })
    },
    // 获取教材分类
    async getRoleList() {
      const data = {
        page: this.pageNum,
        ...this.searchData,
      }
      delete data.date
      this.listLoading = true
      const res = await getRoleList(data)
      this.listLoading = false
      this.listData = res.data.list
      this.listTotal = res.data.total
    },
    handlePageChange(val) {
      this.pageNum = val
      this.getRoleList()
    },
    handleSearch(data) {
      this.pageNum = 1
      this.searchData = {
        ...data,
      }
      this.getRoleList()
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
/deep/.el-form-item {
  margin-bottom: 10px;
}
.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.main {
  padding: 20px;
  margin: 20px;
  background: #fff;
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
.add-role {
  float: right;
  margin-bottom: 20px;
}
</style>
