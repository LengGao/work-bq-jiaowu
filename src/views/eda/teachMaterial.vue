<template>
  <div>
    <div class="head_remind">*管理不同机构的仓库和仓库出入库。</div>
    <section class="mainwrap">
      <div class="header">
        <SearchList
          :options="searchOptions"
          :data="searchData"
          @on-search="handleSearch"
        />
        <div>
          <el-button style="margin-right: 20px" @click="handleBatchAdd"
            >批量发放</el-button
          >
          <el-checkbox v-model="checked" @change="handleChecked"
            >显示欠教材学生</el-checkbox
          >
        </div>
      </div>

      <!--表格-->
      <div class="userTable">
        <el-table
          ref="multipleTable"
          :data="listData"
          tooltip-effect="light"
          v-loading="listLoading"
          element-loading-text="loading"
          element-loading-spinner="el-icon-loading"
          element-loading-background="#fff"
          stripe
          style="width: 100%"
          class="min_table"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
          @selection-change="handleSeletChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column
            prop="id"
            label="学员编号"
            show-overflow-tooltip
            min-width="90"
          ></el-table-column>
          <el-table-column
            prop="nickname"
            label="学生姓名"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="mobile"
            label="手机号码"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column
            prop="category_name"
            label="所属分类"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column
            prop="project_name"
            label="所属项目"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="classroom_id"
            label="所属班级"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="total_books"
            label="应发教材"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="not_issued"
            label="欠发教材"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="update_time"
            label="最后更新时间"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column
            label="操作"
            fixed="right"
            min-width="200"
            max-width="200"
          >
            <template slot-scope="{ row }">
              <div class="operation_btn">
                <el-button
                  type="text"
                  @click="handleAdd(row.id, row.project_id)"
                  >教材发放</el-button
                >
                <el-button type="text" @click="toMaterialJournal(row.id)"
                  >日志</el-button
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
      <!-- 发放教材 -->
      <GrantTeachMaterials
        v-model="dialogVisible"
        :ids="checkedIds"
        :projectId="projectId"
        @on-success="dispenseList"
      />
    </section>
  </div>
</template>

<script>
import SearchList from "@/components/SearchList/index";
import GrantTeachMaterials from "./components/GrantTeachMaterials";
import { dispenseList, getproject, getcourseallclass } from "@/api/eda";
import { getCateList, getInstitutionSelectData } from "@/api/sou";
import { cloneOptions } from "@/utils/index";
export default {
  name: "teachMaterial",
  components: {
    SearchList,
    GrantTeachMaterials,
  },
  data() {
    return {
      dialogVisible: false,
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      checkedIds: [],
      searchData: {
        date: "",
        category_id: [],
        project_id: "",
        classroom_id: "",
        organization_id: [],
        value: "",
      },
      searchOptions: [
        {
          key: "date",
          type: "datePicker",
          attrs: {
            type: "daterange",
            "range-separator": "至",
            "start-placeholder": "开始日期",
            "end-placeholder": "结束日期",
            "value-format": "yyyy-MM-dd",
          },
        },
        {
          key: "category_id",
          type: "cascader",
          events: {
            change: this.handleTypeChange,
          },
          attrs: {
            placeholder: "所属分类",
            clearable: true,
            options: [],
          },
        },
        {
          key: "project_id",
          type: "select",
          options: [],
          optionValue: "project_id",
          optionLabel: "project_name",
          attrs: {
            placeholder: "所属项目",
            clearable: true,
          },
        },
        {
          key: "classroom_id",
          type: "select",
          options: [],
          optionValue: "classroom_id",
          optionLabel: "classroom_name",
          attrs: {
            placeholder: "所属班级",
            clearable: true,
          },
        },
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
      datas: {},
      checked: "",
    };
  },
  created() {
    this.getInstitutionSelectData();
    this.getCateList();
    this.dispenseList();
    this.getproject();
  },
  methods: {
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
      this.dispenseList();
    },
    handleSeletChange(selection) {
      this.projectId = selection[0]?.project_id || "";
      this.checkedIds = selection.map((item) => item.id);
    },
    handleChecked() {
      this.dispenseList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.dispenseList();
    },
    toMaterialJournal(ab) {
      console.log(ab);
      this.$router.push({
        path: "/eda/materialJournal",
        query: { id: ab.id },
      });
    },
    handleBatchAdd() {
      if (!this.projectId) {
        this.$message.warning("请先选择项目！");
        return;
      }
      if (!this.checkedIds.length) {
        this.$message.warning("请选择学生！");
        return;
      }
      this.dialogVisible = true;
    },
    handleAdd(id, projectId) {
      this.projectId = projectId;
      this.checkedIds = [id];
      this.dialogVisible = true;
    },
    // 当分类选择时
    handleTypeChange(ids) {
      const id = ids ? [...ids].pop() : "";
      this.getcourseallclass(id);
      this.getproject(id);
    },
    // 获取班级下拉
    async getcourseallclass(category_id) {
      const data = { category_id };
      const res = await getcourseallclass(data);
      if (res.code === 0) {
        this.searchOptions[3].options = res.data;
      }
    },
    // 获取项目下拉
    async getproject(category_id = "") {
      const data = {
        category_id,
      };
      const res = await getproject(data);
      if (res.code === 0) {
        this.searchOptions[2].options = res.data;
      }
    },
    // 获取教材分类
    async getCateList() {
      const data = { list: true };
      const res = await getCateList(data);
      if (res.code === 0) {
        this.searchOptions[1].attrs.options = cloneOptions(
          res.data,
          "category_name",
          "category_id",
          "son"
        );
      }
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
    async dispenseList() {
      this.checkedIds = [];
      this.projectId = "";
      console.log(this.searchData);
      const data = {
        page: this.pageNum,
        ...this.searchData,
      };
      delete data.date;
      this.listLoading = true;
      const res = await dispenseList(data);
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
