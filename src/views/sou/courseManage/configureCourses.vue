<template>
  <div>
    <section class="mainwrap">
      <div class="head-nav">
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
      </div>
      <!--章节视频-->
      <div v-if="isTagactive == 1">
        <div class="chapter-video-head">
          <search2
            :contentShow="true"
            api="getHomeclassifiList"
            inputText="章节名称"
            @getTable="getTableList"
          ></search2>
          <div>
            <el-button type="primary">添加章节</el-button>
            <el-button type="primary">添加课时</el-button>
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
              label="章节名称"
              show-overflow-tooltip
              min-width="90"
              prop="index_category_id"
            >
            </el-table-column>
            <el-table-column
              prop="index_category_name"
              label="视频缩略图"
              min-width="110"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="index_category_name"
              label="时长"
              min-width="110"
              show-overflow-tooltip
            ></el-table-column>

            <el-table-column
              prop="status"
              label="免费试看"
              min-width="150"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <el-switch
                  active-color="#13ce66"
                  v-model="scope.row.account_status"
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
                  <el-button type="text" @click="topayment(scope.row)"
                    >编辑</el-button
                  >
                  <el-button type="text" @click="topayment(scope.row)"
                    >删除</el-button
                  >
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="chapter-video-foot">
            <el-button style="height:44px">批量删除</el-button>
            <div class="table_bottom">
              <page
                :data="schoolData.total"
                :curpage="page"
                @pageChange="doPageChange"
              />
            </div>
          </div>
        </div>
      </div>
      <!--课程资料-->
      <div v-if="isTagactive == 2">
        <div class="chapter-video-head">
          <search2
            :contentShow="true"
            api="getHomeclassifiList"
            inputText="资料名称"
            @getTable="getTableList"
          ></search2>

          <el-button type="primary">添加资料</el-button>
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
              label="资料编号"
              show-overflow-tooltip
              min-width="90"
              prop="index_category_id"
            >
            </el-table-column>
            <el-table-column
              prop="index_category_name"
              label="资料名称"
              min-width="110"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="index_category_name"
              label="文件格式"
              min-width="110"
              show-overflow-tooltip
            ></el-table-column>

            <el-table-column
              prop="status"
              label="文件大小"
              min-width="150"
              show-overflow-tooltip
            >
            </el-table-column>

            <el-table-column label="操作" fixed="right" min-width="200">
              <template slot-scope="scope">
                <div style="display:flex;justify-content:center">
                  <el-button type="text" @click="topayment(scope.row)"
                    >编辑</el-button
                  >
                  <el-button type="text" @click="topayment(scope.row)"
                    >删除</el-button
                  >
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="chapter-video-foot">
            <el-button style="height:44px">批量删除</el-button>
            <div class="table_bottom">
              <page
                :data="schoolData.total"
                :curpage="page"
                @pageChange="doPageChange"
              />
            </div>
          </div>
        </div>
      </div>
      <!--通用配置-->
      <div v-if="isTagactive == 3"></div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isTagactive: 1,
      schoolData: [],
      tabFun: [
        {
          id: 1,
          name: '章节视频',
        },
        {
          id: 2,
          name: '课程资料',
        },
        {
          id: 3,
          name: '通用配置',
        },
      ],
    }
  },
  methods: {
    statusSwitch(ab) {
      this.isTagactive = ab.id
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
.head-nav {
  width: 100%;
  border-bottom: 1px solid #ccc;
}
.navigation {
  width: 210px;
  display: flex;
  justify-content: space-between;
  font-family: 'Microsoft YaHei UI', sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;

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
  //   background: #2798ee;
  color: #2798ee !important;
  border-bottom: 2px solid #199fff !important;
}
.chapter-video-head {
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
}
.chapter-video-foot {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
