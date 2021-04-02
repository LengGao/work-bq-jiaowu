<template>
  <div>
    <div class="head_remind">*本模块主要用来管理学生的报考情况。</div>

    <section class="mainwrap">
      <div class="client_head">
        <!--搜索模块-->
        <SearchList
          :options="searchOptions"
          :data="searchData"
          @on-search="handleSearch"
        />
        <el-button type="primary" @click="openAdd">添加考试计划</el-button>
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
          style="width: 100%"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
          class="min_table"
        >
          <el-table-column
            prop="id"
            label="ID"
            show-overflow-tooltip
            min-width="60"
          ></el-table-column>

          <el-table-column
            prop="plan_name"
            label="考试计划"
            min-width="180"
            column-key="course_id"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="category_name"
            label="所属分类"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="class_type_name"
            label="考试日期"
            min-width="200"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <span>{{ row.exam_start_time }}</span>
              <span> 至 </span>
              <span>{{ row.exam_end_time }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="course_price"
            label="报考时间"
            min-width="180"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <span>{{ row.enroll_start_time }}</span>
              <span> 至 </span>
              <span>{{ row.enroll_end_time }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="max_num"
            label="剩余报考天数"
            min-width="80"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <span v-if="row.remaining_days" style="color: #43d100">{{
                row.remaining_days
              }}</span>
              <span v-else>0</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="max_num"
            label="计划人数"
            min-width="80"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="actual_num"
            label="报考人数"
            min-width="80"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column label="操作" fixed="right" min-width="160">
            <template slot-scope="{ row }">
              <div style="display: flex; justify-content: center">
                <el-button type="text" @click="openEdit(row.id)"
                  >编辑</el-button
                >
                <el-button type="text" @click="linkTo(row.id, row.cate_id)"
                  >报考详情</el-button
                >
                <el-button type="text" @click="deleteConfirm(row.id)"
                  >删除</el-button
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
      </div>
    </section>
    <ApplyDialog
      v-model="dialogVisible"
      :title="dialogTitle"
      :id="currentId"
      :typeOptions="typeOptions"
      @on-success="planList"
    />
  </div>
</template>

<script>
import { planList, deletePlan } from "@/api/exa";
import { cloneOptions } from "@/utils/index";
import { getCateList } from "@/api/sou";
import ApplyDialog from "./components/ApplyDialog";
export default {
  name: "apply",
  components: {
    ApplyDialog,
  },
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        cate_id: [],
        search_box: "",
      },
      searchOptions: [
        {
          key: "date",
          type: "datePicker",
          attrs: {
            type: "daterange",
            "range-separator": "至",
            "start-placeholder": "报考开始日期",
            "end-placeholder": "报考结束日期",
            "value-format": "yyyy-MM-dd",
          },
        },
        {
          key: "cate_id",
          type: "cascader",
          attrs: {
            placeholder: "所属分类",
            clearable: true,
            options: [],
            props: { checkStrictly: true },
          },
        },
        {
          key: "search_box",
          attrs: {
            placeholder: "报考规则",
          },
        },
      ],
      currentId: "",
      dialogTitle: "添加考试计划",
      dialogVisible: false,
      typeOptions: [],
    };
  },
  created() {
    this.planList();
    this.getCateList();
  },
  methods: {
    linkTo(id, cate_id) {
      this.$router.push({ name: "projectDetails", query: { id, cate_id } });
    },
    // 删除计划
    deleteConfirm(id) {
      this.$confirm("确定要删除此计划吗?", { type: "warning" })
        .then(() => {
          this.deletePlan(id);
        })
        .catch(() => {});
    },
    async deletePlan(id) {
      const data = {
        id,
      };
      const res = await deletePlan(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.planList();
      }
    },
    openEdit(id) {
      this.dialogTitle = "编辑考试计划";
      this.currentId = id;
      this.dialogVisible = true;
    },
    openAdd() {
      this.currentId = "";
      this.dialogTitle = "添加考试计划";
      this.dialogVisible = true;
    },
    // 搜索
    handleSearch(data) {
      const times = data.date || ["", ""];
      delete data.date;
      this.pageNum = 1;
      this.searchData = {
        ...data,
        cate_id: data.cate_id.pop(),
        enroll_start_time: times[0],
        enroll_end_time: times[1],
      };
      this.planList();
    },
    // 分页
    handlePageChange(val) {
      this.pageNum = val;
      this.planList();
    },
    // 计划列表
    async planList() {
      const data = {
        rule_id: this.$route.query?.id || "",
        page: this.pageNum,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await planList(data);
      this.listLoading = false;
      this.listData = res.data.list;
      this.listTotal = res.data.total;
    },
    // 获取教材分类
    async getCateList() {
      const data = { list: true };
      const res = await getCateList(data);
      if (res.code === 0) {
        this.searchOptions[1].attrs.options = this.typeOptions = cloneOptions(
          res.data,
          "category_name",
          "category_id",
          "son"
        );
      }
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

.client_head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.userTable {
  margin-top: 20px;
}
</style>

