<template>
  <div>
    <section>
      <!--搜索模块-->
      <header>
        <el-form
          label-width="100px"
          :model="formData"
          :rules="rules"
          inline
          ref="formData"
        >
          <el-form-item label="机构名称" prop="from_organization_id">
            <el-select
              v-model="formData.from_organization_id"
              filterable
              clearable
              placeholder="请选择机构"
              @change="onOrgChange"
            >
              <el-option
                v-for="item in institutionOptions"
                :key="item.from_organization_id"
                :label="item.institution_name"
                :value="item.from_organization_id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学历形式">
            <el-select
              v-model="formData.type_id"
              filterable
              clearable
              placeholder="请选择学历形式"
              @change="eduTypeChange"
            >
              <el-option
                v-for="item in eduTypeOptions"
                :key="item.type_id"
                :label="item.title"
                :value="item.type_id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="院校">
            <el-select
              v-model="formData.university_id"
              filterable
              clearable
              placeholder="请选择院校"
              @change="eduSchoolChange"
            >
              <el-option
                v-for="item in eduScholOptions"
                :key="item.university_id"
                :label="item.title"
                :value="item.university_id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="层次">
            <el-select
              v-model="formData.level_id"
              filterable
              clearable
              placeholder="请选择层次"
              @change="eduAcademicChange"
            >
              <el-option
                v-for="item in eduAcademicOptions"
                :key="item.level_id"
                :label="item.title"
                :value="item.level_id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="专业">
            <el-select
              v-model="formData.major_id"
              filterable
              clearable
              placeholder="请选择专业"
              @change="eduMajorChange"
            >
              <el-option
                v-for="item in eduMajorOptions"
                :key="item.major_id"
                :label="item.title"
                :value="item.major_id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目名称">
            <el-select
              v-model="formData.project_id"
              filterable
              clearable
              placeholder="请选择项目"
              @change="onProjectChange"
            >
              <el-option
                v-for="item in eduProjectOptions"
                :key="item.project_id"
                :label="item.project_name"
                :value="item.project_id"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="价格" prop="price">
            <el-input v-model="formData.price" placeholder="请输入价格" />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              :loading="restLoading"
              @click="submitForm('formData')"
              >重 设</el-button
            >
          </el-form-item>
        </el-form>
        <SearchList
          :options="searchOptions"
          :data="searchData"
          @on-search="handleSearch"
        />
      </header>
      <!--列表-->
      <div class="userTable">
        <el-table
          ref="multipleTable"
          :data="listData"
          v-loading="listLoading"
          element-loading-text="loading"
          element-loading-spinner="el-icon-loading"
          element-loading-background="#fff"
          :header-cell-style="{ 'text-align': 'center', background: '#f8f8f8' }"
          :cell-style="{ 'text-align': 'center' }"
          @selection-change="handleSelection"
        >
          <el-table-column
            :selectable="(row) => row.ban_selected !== 1"
            type="selection"
            width="55"
          >
          </el-table-column>
          <el-table-column
            prop="order_id"
            label="订单ID"
            show-overflow-tooltip
            min-width="70"
          >
          </el-table-column>
          <el-table-column
            prop="user_name"
            label="客户姓名"
            min-width="100"
            show-overflow-tooltip
          >
          </el-table-column>

          <el-table-column
            prop="order_money"
            label="订单金额"
            min-width="100"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              {{ row.order_money | moneyFormat }}
            </template>
          </el-table-column>
          <el-table-column
            prop="pay_money"
            label="回款金额"
            min-width="90"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              {{ row.pay_money | moneyFormat }}
            </template>
          </el-table-column>
          <el-table-column
            prop="overdue_money"
            label="欠缴金额"
            min-width="90"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              {{ row.overdue_money | moneyFormat }}
            </template>
          </el-table-column>
          <el-table-column
            prop="receivable_num"
            label="回款总数"
            min-width="90"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="booked_num"
            label="入账总数"
            min-width="90"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="创建时间"
            min-width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="project_name"
            label="项目名称"
            min-width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="type_name"
            label="学历形式"
            min-width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="university_name"
            label="院校名称"
            min-width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="level_name"
            label="层次名称"
            min-width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="major_name"
            label="专业名称"
            min-width="100"
            show-overflow-tooltip
          >
          </el-table-column>
        </el-table>
        <div class="table_bottom">
          <page
            :data="listTotal"
            :curpage="pageNum"
            @pageSizeChange="handleSizeChange"
            @pageChange="handlePageChange"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {
  getDegreeOrder,
  getOrgName,
  resetDegreeOrder,
  //--
  getDegreeType,
  getUniversity,
  getAcademicLevel,
  getProfessional,
  getDegreeProject,
  getDegreePrice,
} from "@/api/crm";
export default {
  name: "resetEduOrderPrice",
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      pageSize: 20,
      listTotal: 0,
      orderActionDialog: false,
      institutionOptions: [],
      classTypeOptions: [],
      eduTypeOptions: [],
      eduScholOptions: [],
      eduAcademicOptions: [],
      eduMajorOptions: [],
      eduProjectOptions: [],
      formData: {
        project_id: "",
        from_organization_id: "",
        type_id: "",
        university_id: "",
        level_id: "",
        major_id: "",
        price: "",
      },
      rules: {
        from_organization_id: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        type_id: [{ required: true, message: "请选择", trigger: "change" }],
        university_id: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        level_id: [{ required: true, message: "请选择", trigger: "change" }],
        major_id: [{ required: true, message: "请选择", trigger: "change" }],
        project_id: [{ required: true, message: "请选择", trigger: "change" }],
        price: [{ required: true, message: "请输入", trigger: "blur" }],
      },
      restLoading: false,
      selection: [],
      searchData: {
        str_user_name: "",
      },
      searchOptions: [
        {
          key: "str_user_name",
          width: 600,
          attrs: {
            placeholder: "输入多个姓名时，可用空格隔开",
            type: "textarea",
            autosize: { minRows: 1, maxRows: 4 },
          },
        },
      ],
    };
  },
  created() {
    this.getOrgName();
  },
  methods: {
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
      };
      this.getDegreeOrder();
    },
    handleSelection(selection) {
      this.selection = selection;
    },
    async resetDegreeOrder() {
      let university_major_detail_id = "";
      this.eduProjectOptions.forEach((item) => {
        if (item.project_id === this.formData.project_id) {
          university_major_detail_id = item.university_major_detail_id;
        }
      });
      const data = {
        arr_order_id: this.selection.map((item) => item.order_id),
        price: this.formData.price,
        from_organization_id: this.formData.from_organization_id,
        university_major_detail_id,
      };
      this.restLoading = true;
      const res = await resetDegreeOrder(data).catch(() => {});
      this.restLoading = false;
      if (res.code === 0) {
        this.$message.success(res.message);
        this.getDegreeOrder();
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.selection.length) {
            this.$message.warning("请选择订单");
            return;
          }
          this.resetDegreeOrder();
        }
      });
    },

    // 机构列表
    async getOrgName() {
      const data = { state: 0 };
      const res = await getOrgName(data);
      this.institutionOptions = res.data;
    },
    onOrgChange() {
      this.formData.type_id = "";
      this.formData.university_id = "";
      this.formData.level_id = "";
      this.formData.major_id = "";
      this.formData.project_id = "";
      this.formData.price = "";
      this.listData = [];
      this.listTotal = 0;
      this.pageNum = 1;
      this.getDegreeOrder();
      this.getDegreeType();
    },
    // 学历形式列表
    async getDegreeType() {
      const data = {
        from_organization_id: this.formData.from_organization_id,
      };
      const res = await getDegreeType(data);
      this.eduTypeOptions = res.data;
    },
    eduTypeChange() {
      this.formData.university_id = "";
      this.formData.level_id = "";
      this.formData.major_id = "";
      this.formData.project_id = "";
      this.formData.price = "";
      this.listData = [];
      this.listTotal = 0;
      this.pageNum = 1;
      this.getDegreeOrder();
      this.getUniversity();
    },
    // 院校列表
    async getUniversity() {
      const data = {
        type_id: this.formData.type_id,
        from_organization_id: this.formData.from_organization_id,
      };
      const res = await getUniversity(data);
      this.eduScholOptions = res.data;
    },
    eduSchoolChange() {
      this.formData.level_id = "";
      this.formData.major_id = "";
      this.formData.project_id = "";
      this.formData.price = "";
      this.listData = [];
      this.listTotal = 0;
      this.pageNum = 1;
      this.getDegreeOrder();
      this.getAcademicLevel();
    },
    // 层次列表
    async getAcademicLevel() {
      const data = {
        from_organization_id: this.formData.from_organization_id,
        university_id: this.formData.university_id,
        type_id: this.formData.type_id,
      };
      const res = await getAcademicLevel(data);
      this.eduAcademicOptions = res.data;
    },
    eduAcademicChange() {
      this.formData.major_id = "";
      this.formData.project_id = "";
      this.formData.price = "";
      this.listData = [];
      this.listTotal = 0;
      this.pageNum = 1;
      this.getDegreeOrder();
      this.getProfessional();
    },
    // 专业列表
    async getProfessional() {
      const data = {
        from_organization_id: this.formData.from_organization_id,
        university_id: this.formData.university_id,
        type_id: this.formData.type_id,
        level_id: this.formData.level_id,
      };
      const res = await getProfessional(data);
      this.eduMajorOptions = res.data;
    },
    eduMajorChange() {
      this.formData.project_id = "";
      this.formData.price = "";
      this.listData = [];
      this.listTotal = 0;
      this.pageNum = 1;
      this.getDegreeProject();
    },
    // 项目列表
    async getDegreeProject() {
      const data = {
        from_organization_id: this.formData.from_organization_id,
        university_id: this.formData.university_id,
        type_id: this.formData.type_id,
        level_id: this.formData.level_id,
        major_id: this.formData.major_id,
      };
      const res = await getDegreeProject(data);
      this.eduProjectOptions = res.data;
    },
    onProjectChange() {
      this.formData.price = "";
      this.pageNum = 1;
      this.listData = [];
      this.listTotal = 0;
      this.getDegreePrice();
      this.getDegreeOrder();
    },
    // 价格
    async getDegreePrice() {
      const data = {
        from_organization_id: this.formData.from_organization_id,
        university_id: this.formData.university_id,
        type_id: this.formData.type_id,
        level_id: this.formData.level_id,
        major_id: this.formData.major_id,
        project_id: this.formData.project_id,
      };
      const res = await getDegreePrice(data);
      this.formData.price = res.data.price;
    },
    handleSizeChange(size) {
      this.pageNum = 1;
      this.pageSize = size;
      this.getDegreeOrder();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getDegreeOrder();
    },
    async getDegreeOrder() {
      this.selection = [];
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
        from_organization_id: this.formData.from_organization_id,
        university_id: this.formData.university_id,
        type_id: this.formData.type_id,
        level_id: this.formData.level_id,
        major_id: this.formData.major_id,
        project_id: this.formData.project_id,
        str_user_name: this.searchData.str_user_name,
      };
      this.listLoading = true;
      const res = await getDegreeOrder(data).catch(() => {});
      this.listLoading = false;
      this.listData = res.data.list;
      this.listTotal = res.data.total;
    },
  },
};
</script>

<style lang="scss" scoped>
.approve-status {
  &::before {
    display: inline-block;
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #fd6500;
    vertical-align: middle;
    margin-right: 2px;
  }
  &--success::before {
    background-color: #43d100;
  }
  &--wait::before {
    background-color: #199fff;
  }
  &--none::before {
    background-color: #999;
  }
}
</style>
