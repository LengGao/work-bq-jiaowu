<template>
  <section class="mainwrap">
    <SearchList
      :options="searchOptions"
      :data="searchData"
      @on-search="handleSearch"
    />
    <!--表格-->
    <div class="userTable">
      <el-table
        ref="multipleTable"
        :data="schoolData.list"
        tooltip-effect="light"
        stripe
        style="width: 100%"
        class="min_table"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column
          prop="uid"
          label="学员编号"
          show-overflow-tooltip
          min-width="90"
        ></el-table-column>
        <el-table-column
          prop="uid"
          label="学员头像"
          show-overflow-tooltip
          min-width="90"
        >
          <template slot-scope="scope">
            <div style="margin:0 auto;width:50px ;height:50px;">
              <img :src="scope.row.user_img" alt class="school_class_box" />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="user_nicename"
          label="微信昵称"
          show-overflow-tooltip
          min-width="90"
        ></el-table-column>
        <el-table-column
          prop="realname"
          label="学生姓名"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="mobile"
          label="手机号码"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="create_time"
          label="加入时间"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          prop="from"
          label="数据来源"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column label="操作" fixed="right" min-width="200">
          <template slot-scope="scope">
            <div style="display:flex;justify-content:center">
              <el-button type="text" disabled v-if="scope.row.aid">
                已报名
              </el-button>
              <el-button v-else type="text" @click="enroll(scope.row)"
                >报名</el-button
              >
              <!-- <el-button
                type="text"
                @click="toStudentDetail(scope.row)"
                style="padding-right:20px"
                >详情</el-button
              >
              <el-button type="text" @click="receiveStudent(scope.row)"
                >领取</el-button
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
    <addCustomeDialog
      :innerVisible="innerVisible"
      :seaUserInfo="seaUserInfo"
      v-on:innerDialog="getInnerStatus($event)"
    />
  </section>
</template>

<script>
import addCustomeDialog from './components/addCustomeDialog'
import { cloneOptions } from '@/utils/index'
import { getCateList } from '@/api/sou'
export default {
  name: 'seaStudent',
  components: {
    addCustomeDialog,
  },
  data() {
    return {
      schoolData: [],
      seaUserInfo: {},
      selectData: [],
      innerVisible: false,
      page: 1,
      status: 3,
      datas: {},
      pageNum: 1,
      listTotal: 0,
      searchData: {
        category_id: '',
        date: '',
      },
      searchOptions: [
        {
          key: 'date',
          type: 'datePicker',
          attrs: {
            type: 'daterange',
            'range-separator': '至',
            'start-placeholder': '开始日期',
            'end-placeholder': '结束日期',
            format: 'yyyy-MM-dd',
            'value-format': 'yyyy-MM-dd',
          },
        },
        {
          key: 'category_id',
          type: 'cascader',
          width: 120,
          attrs: {
            placeholder: '所属分类',
            clearable: true,
            options: [],
          },
        },
        {
          key: 'keyword',
          attrs: {
            placeholder: '客户姓名/手机号码',
          },
        },
      ],
    }
  },
  created() {
    this.getCateList()
  },
  mounted() {
    // let status = 3
    this.$api.getCommonUserList(this, 'schoolData')
  },
  methods: {
    handleSearch(data) {
      console.log(data)
      if (data.date && data.date.length) {
        data.date = data.date[0] + ' - ' + data.date[1]
      }

      this.pageNum = 1
      this.searchData = data
      this.$api.getCommonUserList(this, 'schoolData')
    },
    // 获取所属分类
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
    enroll(ab) {
      this.seaUserInfo = ab
      this.innerVisible = true
    },
    getInnerStatus(status) {
      this.innerVisible = status
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

    receiveStudent(zx) {
      console.log(zx)
      this.$api.receive(this, zx.intent_id)
    },
    doPageChange(page) {
      this.page = page
      // this.$api.getMyclient(this, 'myclient', status)
      this.$api.getCommonUserList(this, 'schoolData', this.datas)
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
/deep/.timeCard {
  color: #666666;
}
/deep/.studentTag ul li {
  color: #666666;
}
</style>
