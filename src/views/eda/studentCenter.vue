<template>
  <section>
    <div class="head_remind">
      *本模块主要是教务老师用来进行日常学生数据的跟进管理。
    </div>
    <div class="mainPart">
      <!--搜索模块-->
      <SearchList
        :options="searchOptions"
        :data="searchData"
        @on-search="handleSearch"
      />
      <div>
        <!-- <el-button style="margin-right: 20px" @click="handleBatch"
          >批量分班</el-button
        > -->
        <el-checkbox v-model="checked" @change="handleChecked"
          >未分班学生</el-checkbox
        >
      </div>
      <!--列表-->
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
          class="min_table"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
          @selection-change="handleSeletChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column
            prop="uid"
            label="ID"
            show-overflow-tooltip
            min-width="90"
          ></el-table-column>
          <el-table-column
            prop="realname"
            label="学生姓名"
            min-width="100"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <div class="realname" @click="toStudentDetail(row.uid)">
                {{ row.realname }}
              </div>
            </template>
          </el-table-column>

          <el-table-column
            prop="mobile"
            label="手机号码"
            min-width="130"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <span>{{ row.mobile | filterPhone }}</span>
              <i
                class="el-icon-document-copy copy-number"
                @click="handleCopy(row.mobile)"
                title="复制"
              ></i>
            </template>
          </el-table-column>
          <el-table-column
            prop="institution_name"
            label="推荐机构"
            min-width="150"
            show-overflow-tooltip
          ></el-table-column>
          <!-- <el-table-column
            prop="schoole_name"
            label="所属校区"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column> -->
          <el-table-column
            prop="classroom_name"
            label="所属班级"
            min-width="230"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <span>{{
                row.classroom.map((item) => item.classroom_name).join("，")
              }}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="create_time"
            label="创建时间"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="操作" fixed="right" min-width="200">
            <template slot-scope="{ row }">
              <div style="display: flex; justify-content: center">
                <el-button type="text" @click="toStudentDetail(row.uid)"
                  >学生详情</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="table_bottom">
        <page
          :data="listTotal"
          :curpage="pageNum"
          @pageChange="handlePageChange"
        />
      </div>
    </div>
    <!-- <el-dialog
      title="批量分班"
      :visible.sync="dialogVisible"
      width="500px"
      class="add-warehouse"
      @closed="resetForm('ruleForm')"
    >
      <el-form
        label-width="100px"
        :model="formData"
        :rules="rules"
        ref="ruleForm"
      >
        <el-form-item label="班级名称" prop="classroom_id">
          <el-select
            placeholder="请选择"
            v-model.trim="formData.classroom_id"
            class="input-width"
          >
            <el-option
              v-for="item in classOptions"
              :key="item.classroom_id"
              :label="item.classroom_name"
              :value="item.classroom_id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          :loading="submitLoading"
          @click="submitForm('ruleForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog> -->
  </section>
</template>

<script>
import { cloneOptions } from "@/utils/index";
import { getStudentList, getproject, addstudents } from "@/api/eda";
import { getCateList, getInstitutionSelectData } from "@/api/sou";
export default {
  name: "myClients",

  data() {
    return {
      importVisible: false,
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      checkedIds: [],
      searchData: {
        type: 0,
        date: "",
        course_category_id: [],
        project_id: "",
        classroom_id: "",
        organization_id: [],
        keyword: "",
        student_type: 1,
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
          key: "student_type",
          type: "select",
          options: [
            { label: "网课", value: 1 },
            { label: "非网课", value: 2 },
          ],
          attrs: {
            placeholder: "学生类型",
            clearable: true,
          },
        },
        {
          key: "course_category_id",
          type: "cascader",
          events: {
            change: this.handleTypeChange,
          },
          attrs: {
            placeholder: "所属分类",
            props: { checkStrictly: true },
            filterable: true,
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
            filterable: true,
          },
        },
        {
          key: "organization_id",
          type: "cascader",
          attrs: {
            placeholder: "推荐机构",
            filterable: true,
            clearable: true,
            options: [],
          },
        },
        {
          key: "keyword",
          attrs: {
            placeholder: "学生姓名/手机号码",
          },
        },
      ],
      checked: "",
      submitLoading: false,
      dialogVisible: false,
      classOptions: [], // 班级选项
      formData: {
        classroom_id: "",
      },
      rules: {
        classroom_id: [{ required: true, message: "请选择", trigger: "blur" }],
      },
    };
  },

  created() {
    this.getInstitutionSelectData();
    this.getproject();
    this.getCateList();
    this.getStudentList();
  },

  methods: {
    // 复制
    handleCopy(val) {
      const input = document.createElement("input");
      document.body.appendChild(input);
      input.setAttribute("value", val);
      input.select();
      if (document.execCommand("copy")) {
        document.execCommand("copy");
        document.body.removeChild(input);
        this.$message.success("复制成功");
      }
    },
    handleBatch() {
      if (!this.searchData.course_category_id) {
        this.$message.warning("请先按照 所属分类 搜索！");
        return;
      }
      if (!this.checkedIds.length) {
        this.$message.warning("请选择需要分班的学生！");
        return;
      }
      this.dialogVisible = true;
    },
    handleSeletChange(selection) {
      this.intent_id = selection[0]?.intent_id || "";
      this.checkedIds = selection.map((item) => item.uid);
    },
    async addstudents() {
      const data = {
        ...this.formData,
        intent_id: this.intent_id,
        course_students_id: this.checkedIds,
      };
      const res = await addstudents(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.getStudentList();
      }
    },
    handleChecked(val) {
      this.searchData.type = val ? 2 : 0;
      this.getStudentList();
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addstudents();
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      for (const k in this.formData) {
        this.formData[k] = "";
      }
      this.dialogVisible = false;
    },
    // 当分类选择时
    handleTypeChange(ids) {
      const id = ids ? [...ids].pop() : "";
      this.getproject(id);
    },
    // 获取项目下拉
    async getproject(category_id = "") {
      const data = {
        category_id,
      };
      const res = await getproject(data);
      if (res.code === 0) {
        this.searchOptions[3].options = res.data;
      }
    },
    //  // 获取班级下拉
    // async getcourseallclass(category_id) {
    //   const data = { category_id };
    //   const res = await getcourseallclass(data);
    //   if (res.code === 0) {
    //     this.classOptions = res.data;
    //     this.searchOptions[5].options = res.data;
    //   }
    // },
    handleSearch(data) {
      const times = data.date || ["", ""];
      delete data.date;
      this.pageNum = 1;
      this.searchData = {
        ...data,
        organization_id: data.organization_id.pop(),
        course_category_id: data.course_category_id.pop(),
        start_time: times[0],
        end_time: times[1],
      };
      this.getStudentList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getStudentList();
    },
    //学生列表
    async getStudentList() {
      this.checkedIds = [];
      this.intent_id = "";
      const data = {
        page: this.pageNum,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await getStudentList(data);
      this.listLoading = false;
      this.listData = res.data.data;
      this.listTotal = res.data.total;
    },
    // 获取教材分类
    async getCateList() {
      const data = { list: true };
      const res = await getCateList(data);
      if (res.code === 0) {
        this.searchOptions[2].attrs.options = cloneOptions(
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
    toStudentDetail(id) {
      this.$router.push({
        name: "studentDetail",
        query: { id },
      });
    },
    batchImport() {
      this.importVisible = true;
    },
    //保存
    preserve() {
      console.log(this.ruleForm);
      this.$api.addCustomers(this, this.ruleForm);
    },
    addCustomer() {
      //添加用户弹框打开
      this.importVisible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/.el-input__inner {
  // width: 240px;
}
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
.mainPart {
  padding: 20px;
}
header {
  display: flex;
  justify-content: space-between;
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
.customer_navigation {
  width: 133px;
  display: flex;
  justify-content: space-between;
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
.dataPanel {
  margin-top: 20px;
}
.el-col-lg-4-8 {
  width: 20%;
}
.client_head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.userTable {
  margin-top: 20px;
}
.timeCard {
  width: 90%;
  height: 90px;
  border: 1px solid #ccc;
  float: left;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 14px;
  h3 {
    font-weight: 400;
    font-style: normal;
    color: #606266;
    text-align: center;
  }
  .time_num {
    padding-top: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
    font-family: "Microsoft YaHei UI", sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 24px;
    color: #606266;
    text-align: center em {
      font-size: 20px;
    }
  }
}
.flexfr {
  display: flex;
  justify-content: flex-end;
}
.student-btn {
  border-radius: 2px;
  width: 87px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #199fff;
  color: #fff;
}
.demo-ruleForm {
  h3 {
    padding-left: 4px;
    border-left: 4px solid #199fff;
    font-family: "Arial Normal", "Arial", sans-serif;
    font-weight: 400;
    letter-spacing: normal;
    color: #333333;
    font-size: 16x;
    font-style: normal;
  }
}
.input-width {
  width: 240px;
}
.realname {
  color: #199fff;
  cursor: pointer;
}
.copy-number {
  color: #199fff;
  cursor: pointer;
  margin-left: 8px;
}
.table_bottom {
  text-align: right;
}
</style>
