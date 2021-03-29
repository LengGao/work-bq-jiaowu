<template>
  <div>
    <div class="head_remind">
      *本模块展示所有的班级数据，方便教务老师管理班级的日常工作。
    </div>

    <section class="mainwrap">
      <div class="client_head">
        <SearchList
          :options="searchOptions"
          :data="searchData"
          @on-search="handleSearch"
        />
        <div>
          <el-button type="primary">导出数据</el-button>
          <el-button type="primary" @click="addStudent">添加学生</el-button>
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
          style="width: 100%"
          class="min_table"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column
            label="学员编号"
            show-overflow-tooltip
            min-width="90"
            prop="index_category_id"
          >
          </el-table-column>
          <el-table-column
            prop="index_category_name"
            label="学员姓名"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="index_category_name"
            label="手机号码"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="index_category_name"
            label="所属机构"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="index_category_name"
            label="所属校区"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="index_category_name"
            label="学习时长"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="index_category_name"
            label="学习进度"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="index_category_name"
            label="做题总数"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column
            prop="index_category_name"
            label="做题进度"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="index_category_name"
            label="历年真题平均分"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="index_category_name"
            label="模拟考试平均分"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="index_category_name"
            label="自主出题最高分"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="index_category_name"
            label="直播时长"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="操作" fixed="right" min-width="200">
            <template slot-scope="scope">
              <div style="display: flex; justify-content: center">
                <el-button type="text" @click="topayment(scope.row)"
                  >转班</el-button
                >
                <el-button type="text" @click="topayment(scope.row)"
                  >移除</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="footer">
          <div>
            <el-button> 批量转班 </el-button>
            <el-button> 批量移除 </el-button>
          </div>
          <div class="table_bottom">
            <page
              :data="listTotal"
              :curpage="pageNum"
              @pageChange="handlePageChange"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { getClassstudentList } from "@/api/eda";
import { getInstitutionSelectData } from "@/api/sou";
import { cloneOptions } from "@/utils/index";
export default {
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        organization_id: [],
        value: "",
      },
      searchOptions: [
        {
          key: "organization_id",
          type: "cascader",
          attrs: {
            placeholder: "推荐机构",
            clearable: true,
            options: [],
          },
        },
        {
          key: "value",
          attrs: {
            placeholder: "学生姓名/手机号码",
          },
        },
      ],
    };
  },

  created() {
    this.getClassstudentList();
  },

  methods: {
    addStudent() {
      this.$router.push({
        path: "/eda/addStudent",
      });
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getClassstudentList();
    },

    handleSearch(data) {
      const times = data.date || ["", ""];
      delete data.date;
      this.pageNum = 1;
      this.searchData = {
        ...data,
        category_id: data.category_id.pop(),
        organization_id: data.organization_id.pop(),
        start_time: times[0],
        end_time: times[1],
      };
      this.getClassstudentList();
    },
    // 获取机构
    async getInstitutionSelectData() {
      const data = { list: true };
      const res = await getInstitutionSelectData(data);
      if (res.code === 0) {
        this.searchOptions[4].attrs.options = cloneOptions(
          res.data,
          "institution_name",
          "institution_id",
          "children"
        );
      }
    },
    //教材发放列表
    async getClassstudentList() {
      this.checkedIds = [];
      this.projectId = "";
      console.log(this.searchData);
      const data = {
        page: this.pageNum,
        ...this.searchData,
      };
      delete data.date;
      this.listLoading = true;
      const res = await getClassstudentList(data);
      this.listLoading = false;
      this.listData = res.data.list;
      this.listTotal = res.data.total;
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/.el-table__header th,
.el-table__header tr {
  background-color: #f8f8f8;
  color: #909399;
}
.input-width {
  width: 240px;
}
.main {
  padding: 20px;
  margin: 20px;
  background: #fff;
}
.footer {
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
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
.client_head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.userTable {
  margin-top: 20px;
}
.imgBox_warn {
  line-height: 30px;
  padding-top: 10px;
  color: #aaa;
}
.headPortrait {
  width: 87px;
  height: 87px;
  background: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  color: #3333;
  border: 1px solid rgba(220, 223, 230, 1);
  border-radius: 5px;
}
.headPortrait:hover {
  border: 1px solid rgba(240, 240, 240, 1);
  cursor: pointer;
}
.imageBox {
  width: 87px;
  height: 87px;
  position: relative;
}

.iconjia {
  font-size: 40px;
  color: #fff;
  display: none;
  position: absolute;
  width: 87px;
  height: 87px;
  line-height: 87px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.78);
  opacity: 0.5;
}

.imageBox:hover i {
  display: block;
}
.headPortrait {
  width: 240px;
  height: 135px;
  background: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  color: #3333;
  border: 1px solid rgba(220, 223, 230, 1);
  border-radius: 5px;
}
.headPortrait:hover {
  border: 1px solid rgba(240, 240, 240, 1);
  cursor: pointer;
}
</style>
