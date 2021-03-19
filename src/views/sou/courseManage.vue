<template>
  <div>
    <div class="head_remind">
      *本模块主要是招生老师用来进行日常招生数据的跟进管理，包括学员意向录入、课程缴费报名等操作。
    </div>

    <section class="mainwrap">
      <ul class="navigation">
        <li
          v-for="item in tabFun"
          :key="item.id"
          :class="{ tabg: item.id == isTagactive }"
          @click="statusSwitch(item)"
        >
          {{ item.name }}
        </li>
      </ul>
      <div class="client_head">
        <SearchList
          :options="searchOptions"
          :data="searchData"
          @on-search="handleSearch"
        />
        <div v-if="isTagactive === 2">
          <el-button type="primary" @click="toCreateClass">资源中心</el-button>
        </div>
        <div v-if="isTagactive === 1">
          <el-button type="primary" @click="toCreateClass">添加课程</el-button>
          <!-- <el-button type="primary" @click="toCreateClass('2')"
            >创建套餐班</el-button
          > -->
        </div>
      </div>
      <!--表格-->
      <div class="userTable">
        <el-table
          ref="multipleTable"
          :data="listData"
          v-loading="listLoading"
          element-loading-text="loading"
          element-loading-spinner="el-icon-loading"
          element-loading-background="#fff"
          tooltip-effect="light"
          stripe
          style="width: 100%;"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
          class="min_table"
        >
          <el-table-column type="selection" width="45"> </el-table-column>
          <el-table-column
            prop="course_id"
            label="课程编号"
            show-overflow-tooltip
            min-width="90"
          ></el-table-column>
          <!-- <el-table-column
            prop="cover_img"
            label="缩略图"
            min-width="80"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div style="width:50px ;height:50px;">
                <img :src="scope.row.cover_img" alt class="school_class_box" />
              </div>
            </template>
          </el-table-column> -->
          <el-table-column
            prop="course_name"
            label="课程名称"
            min-width="200"
            column-key="course_id"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="category_name"
            label="课程分类"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="class_type_name"
            label="课程班型"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="course_price"
            label="课程价格"
            min-width="80"
            show-overflow-tooltip
          ></el-table-column>
          <!-- <el-table-column
            prop="keshi"
            label="视频个数"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="is_publish_status"
            label="状态"
            min-width="50"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="课程排序"
            min-width="100"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <el-col :span="12">
                <el-input
                  v-model="scope.row.sort"
                  placeholder
                  size="small"
                  @blur="scopes(scope.row.course_id, scope.row.sort)"
                ></el-input>
              </el-col>
            </template>
          </el-table-column>
          -->
          <el-table-column
            label="是否上架"
            min-width="100"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.is_publish"
                class="tablescope"
                active-color="#2798ee"
                inactive-color="#eaeefb"
                :active-value="1"
                :inactive-value="2"
                active-text="发布"
                inactive-text="关闭"
                @change="release(scope.row, $event)"
                :width="50"
              >
              </el-switch>
            </template>
          </el-table-column>

          <el-table-column label="操作" fixed="right" min-width="200">
            <template slot-scope="scope" v-if="isTagactive === 1">
              <div style="display: flex; justify-content:center;">
                <el-button type="text" @click="toCreateClass(scope.row)"
                  >编辑</el-button
                >
                <el-button type="text" @click="toCreateClass(scope.row)"
                  >配置</el-button
                >
                <el-button type="text" @click="toCreateClass(scope.row)"
                  >复制</el-button
                >
              </div>
            </template>
            <template slot-scope="scope" v-if="isTagactive === 2">
              <div style="display: flex; justify-content:center;">
                <el-button type="text" @click="toCreateClass(scope.row)"
                  >查看详情</el-button
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
        <!-- <div style="display:flex;justify-content:space-between">
          <div class="batch_btn" style="padding-top:40px">
            <el-button @click="batchRelease">批量发布</el-button>
            <el-button @click="batchClose">批量关闭</el-button>
            <el-button @click="batchDeletion">批量删除</el-button>
          </div>
          <div class="table_bottom">
            <div class="table_bottom">
              <page
                :data="schoolData.total"
                :curpage="page"
                @pageChange="doPageChange"
              />
            </div>
          </div>
        </div> -->
      </div>
    </section>
  </div>
</template>

<script>
import SearchList from '@/components/SearchList/index'
import { getCourseList, getCateList } from '@/api/sou'
export default {
  components: {
    SearchList,
  },
  name: 'courseManage',
  data() {
    return {
      ruleForm: {
        category_id: '',
      },
      isTagactive: 1,
      tabFun: [
        {
          id: 1,
          name: '自建课程',
        },
        {
          id: 2,
          name: '公共课程',
        },
      ],
      selectData: [],
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        category_id: [],
        course_name: '',
      },
      searchOptions: [
        {
          key: 'category_id',
          type: 'cascader',
          attrs: {
            clearable: true,
            options: [{ value: 1, label: 'test' }],
          },
        },
        {
          key: 'course_name',
          attrs: {
            placeholder: '课程名称',
          },
        },
      ],
    }
  },
  created() {
    this.getCourseList()
    this.getCateList()
  },
  mounted() {
    // this.$api.getCourseManage(this, 'schoolData')
    // this.$api.getCategoryList(this, 'selectData')
  },

  methods: {
    async getCateList() {
      const data = { list: true }
      const res = await getCateList(data)
      if (res.code === 0) {
        this.cloneData(res.data, this.selectData)
        this.searchOptions[0].attrs.options = this.selectData
      }
    },
    cloneData(data, newData) {
      data.forEach((item, index) => {
        newData[index] = {}
        newData[index].value = item.category_id
        newData[index].label = item.category_name
        if (item.son && item.son.length) {
          newData[index].children = []
          this.cloneData(item.son, newData[index].children)
        }
      })
    },
    toCreateClass() {
      this.$router.push({
        path: '/sou/createClass',
      })
    },
    handlePageChange(val) {
      this.pageNum = val
      this.getCourseList()
    },
    handleSearch() {
      this.getCourseList()
    },
    async getCourseList() {
      const data = {
        page: this.pageNum,

        ...this.searchData,
        category_id: this.searchData.category_id.pop(),
      }
      this.listLoading = true
      const res = await getCourseList(data)
      this.listLoading = false
      this.listData = res.data.data
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
.navigation {
  width: 133px;
  display: flex;
  justify-content: space-between;
  font-family: 'Microsoft YaHei UI', sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  margin-bottom: 10px;
  li {
    height: 28px;
    font-size: 14px;

    border-bottom: 2px solid #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    cursor: pointer;
    color: #666666;
  }
  li:last-child {
    margin-right: 0px !important;
  }
  li:hover {
    color: #199fff;
    border-bottom: 2px solid #199fff;
  }
}
.tabg {
  //background: #2798ee;
  color: #2798ee !important;
  border-bottom: 2px solid #199fff !important;
}
.client_head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.userTable {
  margin-top: 20px;
}
.batch_btn {
  padding-top: 20px;
  .el-button {
    margin-right: 25px;
  }
}
/deep/.tablescope {
  .el-switch__label--left {
    position: absolute;
    left: 10px;
    color: #fff;
    z-index: -1;
  }
  .el-switch__label--right {
    position: absolute;
    color: #fff;
    z-index: -1;
  }
  .el-switch__label--right.is-active {
    z-index: 1;
    color: #fff !important;
  }
  .el-switch__label--left.is-active {
    z-index: 1;
    color: #9c9c9c !important;
  }
  .is-checked {
    padding: 0;
  }
}
</style>
