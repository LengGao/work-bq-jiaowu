<template>
  <div>
    <div class="head_remind">
      *项目作为售卖的对象，包含课程、题库、教材等配置信息。
    </div>
    <section class="mainwrap">
      <div class="head-search">
        <SearchList
          :options="searchOptions"
          :data="searchData"
          @on-search="handleSearch"
        />
        <el-button type="primary" @click="projectDialog"> 添加项目 </el-button>
      </div>
      <!--表格-->
      <div class="userTable">
        <el-table
          ref="multipleTable"
          :data="schoolData"
          v-loading="listLoading"
          element-loading-text="loading"
          element-loading-spinner="el-icon-loading"
          element-loading-background="#fff"
          style="width: 100%"
          class="min_table"
          :header-cell-style="{ 'text-align': 'center' }"
          row-key="treeId"
          lazy
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          :load="loadTableChildren"
        >
          <el-table-column
            label="项目ID"
            show-overflow-tooltip
            min-width="90"
            prop="project_id"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="project_name"
            label="项目名称"
            min-width="200"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <span v-if="row.isChild" style="margin-left: 20px"
                >|- {{ row.project_name }}</span
              >
              <span v-else style="font-weight: bold">{{
                row.project_name
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="category_name"
            label="所属分类"
            min-width="110"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="project_price"
            label="价格"
            align="center"
            min-width="110"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <span v-if="row.isChild">{{ row.price }}</span>
              <span v-else>{{ row.project_price }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="lowest_price"
            label="最低价格"
            min-width="110"
            align="center"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column
            prop="buy_number"
            label="购买人数"
            align="center"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column
            label="是否启用"
            min-width="150"
            align="center"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <el-switch
                v-if="row.isChild"
                active-color="#13ce66"
                v-model="row.status"
                :active-value="1"
                :inactive-value="2"
                @change="updateChildProjectStatus(row)"
              >
              </el-switch>
              <el-switch
                v-else
                active-color="#13ce66"
                v-model="row.project_status"
                :active-value="1"
                :inactive-value="2"
                @change="changeSwitch(row)"
              >
              </el-switch>
            </template>
          </el-table-column>

          <!-- <el-table-column
            prop="1"
            label="合同模板"
            min-width="100"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <el-button
                type="text"
                class="templatebtn"
                @click="templatebtn(row)"
                :class="row.template_id == null ? 'entry1' : 'entry2'"
                >关联模板</el-button
              >
              <el-button
                type="text"
                class="templatebtn"
                @click="templatebtn(row)"
                :class="row.template_id == null ? 'entry2' : 'entry1'"
                >更改模板</el-button
              >
            </template>
          </el-table-column> -->

          <el-table-column
            label="操作"
            fixed="right"
            align="center"
            min-width="260"
          >
            <template slot-scope="{ row }">
              <div
                style="display: flex; justify-content: center"
                v-if="row.isChild"
              >
                <el-button type="text" @click="openChildEdit(row)"
                  >编辑</el-button
                >
                <el-button type="text" @click="deleteConfirm(row)"
                  >删除</el-button
                >
                <el-button type="text" @click="handleMove(row)">移动</el-button>
              </div>
              <div style="display: flex; justify-content: center" v-else>
                <el-button type="text" @click="openChildAdd(row.project_id)"
                  >添加子项目</el-button
                >
                <el-button type="text" @click="toStatistics(row.project_id)"
                  >统计</el-button
                >
                <el-button type="text" @click="handleEdit(row)">编辑</el-button>
                <el-button type="text" @click="handleMove(row)">移动</el-button>
                <el-button type="text" @click="handleDelete(row)"
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
      <!--添加项目弹框-->
      <el-dialog
        :title="dialogTitle"
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
        width="1000px"
      >
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <h3 class="project-h3" style="margin-bottom: 20px">基本信息</h3>
          <el-row>
            <el-col :lg="12" :sm="12" :xs="12" :md="12">
              <el-form-item label="项目名称" prop="project_name">
                <el-input
                  placeholder="请输入项目名称"
                  v-model="ruleForm.project_name"
                  class="input-width"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="12" :sm="12" :xs="12" :md="12">
              <el-form-item label="所属分类">
                <el-cascader
                  filterable
                  clearable
                  class="common-width"
                  v-model="ruleForm.category_id"
                  :options="selectData"
                  :props="{ checkStrictly: true }"
                ></el-cascader>
                <!-- <el-input
                  placeholder="请输入分类名称"
                  v-model="ruleForm.category_id"
                  class="input-width"
                ></el-input> -->
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :lg="12" :sm="12" :xs="12" :md="12">
              <el-form-item label="项目价格" prop="price">
                <el-input
                  type="number"
                  placeholder="请输入项目价格"
                  v-model="ruleForm.price"
                  class="input-width"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="12" :sm="12" :xs="12" :md="12">
              <el-form-item label="最低价格" prop="lowest_price">
                <el-input
                  type="number"
                  placeholder="请输入最低价格"
                  v-model="ruleForm.lowest_price"
                  class="input-width"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :lg="12" :sm="12" :xs="12" :md="12">
              <el-form-item label="项目周期">
                <el-radio-group
                  v-model="ruleForm.service_type"
                  @change="choseServicetype"
                >
                  <el-radio :label="1">服务时长</el-radio>
                  <el-radio :label="2">有效期限</el-radio>
                </el-radio-group>
                <el-select
                  v-if="ruleForm.service_type == 1"
                  v-model="ruleForm.service_period"
                  placeholder="请选择服务时长"
                  filterable
                  clearable
                >
                  <el-option
                    v-for="item in timeOptions"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
                <el-date-picker
                  v-if="ruleForm.service_type == 2"
                  v-model="ruleForm.service_effective"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <!-- <el-col :lg="12" :sm="12" :xs="12" :md="12">
              <el-form-item label="适用范围">
                <el-radio-group v-model="ruleForm.applay">
                  <el-radio :label="1">当前校区</el-radio>
                  <el-radio :label="2">全部校区</el-radio>
              
                </el-radio-group>
              </el-form-item>
            </el-col> -->
          </el-row>

          <el-row>
            <el-col :lg="12" :sm="12" :xs="12" :md="12">
              <el-form-item label="是否启用">
                <el-radio-group v-model="ruleForm.status">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="2">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :lg="12" :sm="12" :xs="12" :md="12"> </el-col>
          </el-row>
        </el-form>
        <h3 class="project-h3" style="margin-bottom: 20px">项目配置</h3>
        <ul class="project-ul">
          <li>课程</li>
          <li class="project-tag">
            <el-tag
              v-for="item in courseTag"
              :key="item.course_id"
              style="margin: 0 5px 5px 0"
              >{{ item.course_name }}</el-tag
            >
          </li>
          <li @click="courseDialogShow(courseTag)" style="cursor: pointer">
            选择
          </li>
        </ul>
        <ul class="project-ul">
          <li>题库</li>
          <li class="project-tag">
            <el-tag
              v-for="item in quesTag"
              :key="item.id"
              style="margin: 0 5px 5px 0"
              >{{ item.title }}</el-tag
            >
          </li>
          <li style="cursor: pointer" @click="questionShow">选择</li>
        </ul>
        <ul class="project-ul">
          <li>教材</li>
          <li class="project-tag">
            <el-tag
              v-for="item in materialTag"
              :key="item.book_id"
              style="margin: 0 5px 5px 0"
              >{{ item.book_name }}</el-tag
            >
          </li>
          <li @click="materialDialogShow" style="cursor: pointer">选择</li>
        </ul>
        <h3 class="project-h3" style="margin: 20px 0">教务负责人</h3>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="序号" width="70" type="index">
          </el-table-column>
          <el-table-column prop="date" label="归属部门" min-width="180">
            <template slot-scope="{ row }">
              <el-select
                v-model="row.department_id"
                filterable
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in departMentData"
                  :key="item.id"
                  :label="item.title"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="负责老师" min-width="180">
            <template slot-scope="{ row }">
              <el-select
                v-model="row.staff_id"
                filterable
                clearable
                multiple
                placeholder="请选择"
              >
                <el-option
                  v-for="item in staffOptions"
                  :key="item.staff_id"
                  :label="item.staff_name"
                  :value="item.staff_id + ''"
                >
                  <span style="float: left">{{ item.staff_name }}</span>
                  <span
                    style="
                      float: right;
                      color: #8492a6;
                      font-size: 13px;
                      margin: 0 16px 0 10px;
                    "
                    >{{ item.group_name }}</span
                  >
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column min-width="120" label="操作">
            <template slot-scope="{ $index: index }">
              <div class="table-actions">
                <i
                  class="el-icon-remove-outline del"
                  v-if="tableData.length > 1"
                  @click="tableData.splice(index, 1)"
                ></i>
                <i
                  class="el-icon-circle-plus-outline add"
                  @click="handleTableAdd"
                ></i>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleConfirm('ruleForm')"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <CourseDialog
        v-model="showCourse"
        @on-coursesuccess="handlecourse"
        :courseTag="courseTag"
      />
      <MaterialDialog
        v-model="showMaterial"
        @on-materialsuccess="handleMaterial"
        :materialTag="materialTag"
      />
      <QuestionBank
        v-model="showQues"
        :quesTag="quesTag"
        @on-quesuccess="handleQuestion"
      />

      <Asstemplate
        v-model="assdialog"
        :project_id="project_id"
        :contractInfo="contractInfo"
        @on-success="handleSuccess"
        :template_id="template_id"
      />
      <!--添加子项目弹框-->
      <AddProjectChild
        v-model="dialogChildVisible"
        :title="dialogChildTitle"
        :id="currentChildId"
        :parentId="currentProjectId"
        @on-success="updateTableChildren"
      />
      <MoveProjectDialog
        v-model="moveDialogVisible"
        :id="project_id"
        @on-success="getProjectList"
      />
    </section>
  </div>
</template>

<script>
import AddProjectChild from "./components/addProjectChild";
import MoveProjectDialog from "./components/moveProjectDialog";
import {
  getCateList,
  getChildSubList,
  getProjectList,
  deleteSubProject,
  updateChildProjectStatus,
} from "@/api/sou";
import CourseDialog from "./components/courseDialog";
import MaterialDialog from "./components/materialDialog";
import QuestionBank from "./components/QuestionBank";
import Asstemplate from "./components/asstemplate";
import { getStaffList, getDepartmentlists } from "@/api/set";
export default {
  name: "projectManage",
  components: {
    CourseDialog,
    MaterialDialog,
    QuestionBank,
    Asstemplate,
    AddProjectChild,
    MoveProjectDialog,
  },
  data() {
    return {
      template_id: "",
      project_id: "",
      contractInfo: {},
      assdialog: false,
      id: "",
      dialogTitle: "添加项目",
      selectData: [],
      pageNum: 1,
      listTotal: 0,
      searchData: {
        category_id: [],
        keyword: "",
      },
      ruleForm: {
        project_name: "",
        category_id: "",
        price: "",
        lowest_price: "",
        service_period: "",
        service_type: 1,
        service_effective: "",
        course: [1, 2, 3],
        problem: [1, 2, 3],
        textbooks: [1, 2, 3],
        status: "",
        school: "",
      },
      searchOptions: [
        {
          key: "category_id",
          type: "cascader",
          attrs: {
            clearable: true,
            placeholder: "选择类别",
            options: [{ value: 1, label: "test" }],
          },
        },
        {
          key: "keyword",
          attrs: {
            placeholder: "项目名称",
            clearable: true,
          },
        },
      ],
      rules: {
        project_name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
        ],
        category_id: [
          { required: true, message: "请输入活动名称", trigger: "change" },
        ],
        price: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        lowest_price: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
        ],
      },

      timeOptions: [
        {
          id: 1,
          value: "1年",
        },
        {
          id: 2,
          value: "2年",
        },
        {
          id: 3,
          value: "3年",
        },
        {
          id: 4,
          value: "4年",
        },
        {
          id: 8,
          value: "考过为止",
        },
        {
          id: 99,
          value: "永久",
        },
      ],
      schoolData: [],
      listLoading: false,
      dialogVisible: false,
      showCourse: false,
      courseTag: [],
      materialTag: [],
      quesTag: [],
      showMaterial: false,
      showQues: false,
      dialogChildVisible: false,
      dialogChildTitle: "添加子项目",
      currentProjectId: "",
      currentChildId: "",
      treeId: 0,
      treeLoadMap: new Map(),
      moveDialogVisible: false,
      tableData: [
        {
          department_id: "",
          staff_id: [],
        },
      ],
      staffOptions: [],
      departMentData: [],
    };
  },
  created() {
    this.getCateList();
    this.getProjectList();
    this.getStaffList();
    this.getDepartmentlists();
  },

  methods: {
    handleTableAdd() {
      this.tableData.push({
        department_id: "",
        staff_id: [],
      });
    },
    async getDepartmentlists() {
      const res = await getDepartmentlists();
      if (res.code === 0) {
        this.departMentData = res.data;
      }
    },
    async getStaffList() {
      const data = {
        limit: 99999,
      };
      const res = await getStaffList(data);
      this.staffOptions = res.data.list;
    },
    toStatistics(project_id) {
      this.$router.push({ name: "projectStatistics", query: { project_id } });
    },
    handleMove(row) {
      this.project_id = row.project_id;
      this.moveDialogVisible = true;
    },
    async updateChildProjectStatus(row) {
      const data = {
        status: row.status,
        project_id: row.project_id,
      };
      const res = await updateChildProjectStatus(data).catch(() => {
        row.status = row.status === 2 ? 1 : 2;
      });
      if (res.code === 0) {
        this.$message.success("操作成功");
      }
    },
    // 删除子项目
    deleteConfirm(row) {
      this.$confirm("确定要删除此项目吗?", { type: "warning" })
        .then(() => {
          this.deleteSubProject(row);
        })
        .catch(() => {});
    },
    async deleteSubProject(row) {
      const data = {
        project_id: row.project_id,
      };
      const res = await deleteSubProject(data);
      if (res.code === 0) {
        this.updateTableChildren(row.parent_id);
      }
    },
    setId() {
      return (this.treeId += 1);
    },
    // 根据父节点更新字节点
    async updateTableChildren(parentId) {
      if (this.treeLoadMap.has(parentId)) {
        const children = await this.getChildSubList(parentId);
        const { resolve } = this.treeLoadMap.get(parentId);
        this.$set(
          this.$refs.multipleTable.store.states.lazyTreeNodeMap,
          parentId,
          []
        );
        if (children.length > 1) {
          resolve(children);
        } else {
          this.getProjectList();
        }
      } else {
        this.getProjectList();
      }
    },
    // table懒加载子节点
    async loadTableChildren(tree, treeNode, resolve) {
      // 保留当前加载节点用的参数，更新时复用
      this.treeLoadMap.set(tree.project_id, { tree, treeNode, resolve });
      const children = await this.getChildSubList(tree.project_id);
      resolve(children);
    },
    // 子项目列表
    async getChildSubList(parent_id) {
      const data = {
        parent_id,
        limit: 9999,
      };
      const res = await getChildSubList(data);
      const children = res.data.map((item, index) => ({
        ...item,
        isChild: true,
        treeId: this.setId(),
        loading: false,
      }));
      return children;
    },
    async getProjectList() {
      const data = {
        page: this.pageNum,
        ...this.searchData,
        category_id: [...this.searchData.category_id].pop(),
      };
      this.listLoading = true;
      const res = await getProjectList(data).catch(() => {});
      this.listLoading = false;
      if (res.code === 0) {
        this.listTotal = res.data?.total || 0;
        this.schoolData = res.data.data.map((item, index) => ({
          ...item,
          treeId: this.setId(),
          hasChildren: !!item.child,
          children: [],
        }));
      }
    },
    openChildEdit(row) {
      this.dialogChildTitle = "编辑子项目";
      this.currentChildId = row.project_id;
      this.currentProjectId = row.parent_id;
      this.dialogChildVisible = true;
    },
    openChildAdd(projectid) {
      this.currentProjectId = projectid;
      this.currentChildId = "";
      this.dialogChildTitle = "添加子项目";
      this.dialogChildVisible = true;
    },
    handleSuccess(id) {
      this.template_id = id;
      this.getProjectList();
    },
    templatebtn(row) {
      this.assdialog = true;
      this.project_id = row.project_id;
      this.template_id = row.template_id;
      this.contractInfo = row;
      this.getProjectList();
    },
    handlecourse(selection) {
      this.courseTag = selection;
    },
    handleMaterial(selection) {
      this.materialTag = selection;
    },
    handleQuestion(selection) {
      this.quesTag = selection;
    },
    questionShow() {
      this.showQues = true;
    },
    materialDialogShow() {
      this.showMaterial = true;
    },

    courseDialogShow() {
      this.showCourse = true;

      // this.courseTag  = courseTag
    },
    changeSwitch(ab) {
      let formData = {
        project_id: ab.project_id,
        project_name: ab.project_name,
        category_id: ab.category_id,
        price: ab.project_price,
        lowest_price: ab.lowest_price,
        status: ab.project_status,
      };
      this.$api.editProject(this, formData, "POST");
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getProjectList();
    },
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = data;
      this.getProjectList();
    },
    async getCateList() {
      const data = { list: true };
      const res = await getCateList(data);
      if (res.code === 0) {
        this.cloneData(res.data, this.selectData);
        this.searchOptions[0].attrs.options = this.selectData;
      }
    },
    cloneData(data, newData) {
      data.forEach((item, index) => {
        newData[index] = {};
        newData[index].value = item.category_id;
        newData[index].label = item.category_name;
        if (item.son && item.son.length) {
          newData[index].children = [];
          this.cloneData(item.son, newData[index].children);
        }
      });
    },
    choseServicetype(ab) {
      switch (ab) {
        case 1:
          this.ruleForm.service_effective = "";
          break;
        case 2:
          this.ruleForm.service_period = "";
          break;
      }
    },
    handleEdit(ab) {
      // for (var item in this.ruleForm) {
      //   this.ruleForm[item] = ''
      // }
      this.ruleForm.project_id = ab.project_id;
      this.tableData = [
        {
          department_id: "",
          staff_id: [],
        },
      ];
      this.dialogTitle = "编辑项目";
      this.dialogVisible = true;
      this.$api.editProject(this, this.ruleForm, "GET");
    },
    handleDelete(ab) {
      this.$confirm("此操作将删除该项目, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api.deleteproject(this, ab.project_id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    getTableList() {},
    projectDialog() {
      this.courseTag = [];
      this.materialTag = [];
      this.quesTag = [];
      this.dialogTitle = "添加项目";
      this.dialogVisible = true;
      //初始化参数
      this.tableData = [
        {
          department_id: "",
          staff_id: [],
        },
      ];
      this.ruleForm = {
        project_name: "",
        category_id: "",
        price: "",
        lowest_price: "",
        service_period: "",
        service_type: 1,
        service_effective: "",
        course: [],
        problem: [],
        textbooks: [],
        status: "",
        school: "",
      };
    },
    handleConfirm(formName) {
      //所选课程
      this.ruleForm.course = this.courseTag.map((i) => {
        return i.course_id;
      });
      //所选教材
      this.ruleForm.textbooks = this.materialTag.map((i) => {
        return i.book_id;
      });
      //所选题库
      this.ruleForm.problem = this.quesTag.map((i) => {
        return i.id;
      });
      // console.log(this.quesTag)
      // console.log(this.ruleForm)
      if (this.ruleForm.category_id.length) {
        this.ruleForm.category_id = [...this.ruleForm.category_id].pop();
      }
      const edu = [];
      this.tableData.forEach((item) => {
        if (!item.department_id || !item.staff_id || !item.staff_id.length) {
          this.$message.warning("请完善教务负责人");
          throw new Error("error");
        }
        edu.push({
          department_id: item.department_id,
          staff_id: item.staff_id.join(","),
        });
      });
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.ruleForm.id) {
            this.$api.editProject(
              this,
              { ...this.ruleForm, edu: JSON.stringify(edu) },
              "POST"
            );
          } else {
            this.$api.createProject(this, {
              ...this.ruleForm,
              edu: JSON.stringify(edu),
            });
          }
        } else {
          return false;
        }
      });
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
.head_remind {
  padding: 20px;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  color: #909399;
  width: 100%;
  border-bottom: 15px solid #f2f6fc;
}
.head-search {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.project-h3 {
  font-family: "Microsoft YaHei UI", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.580392156862745);
  line-height: 16px;
  border-left: 3px solid #199fff;
  padding-left: 5px;
}
.project-ul {
  width: 100%;
  border-top: 1px solid rgba(235, 238, 245, 1);
  border-left: 1px solid rgba(235, 238, 245, 1);
  border-right: 1px solid rgba(235, 238, 245, 1);
  display: flex;
  align-items: center;
  min-height: 45px;

  li:first-child {
    list-style: none;
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  li:last-child {
    list-style: none;
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-left: 1px solid rgba(235, 238, 245, 1);
    color: #199fff;
  }
}
.project-ul:last-child {
  border-bottom: 1px solid rgba(235, 238, 245, 1);
}
.project-tag {
  min-width: 45px;
  width: 100%;
  margin-top: 4px;
  list-style: none;
  padding-left: 20px;
  overflow: hidden;
}
.table_bottom {
  text-align: right;
}
.templatebtn {
  background: #f5fcff;
  border: 1px solid #cbe9f6;
  padding: 10px 8px;
}
.entry1 {
  display: inline;
  margin: 0;
}
.entry2 {
  display: none;
  margin: 0;
}
.table-actions {
  i {
    font-size: 24px;
    margin-left: 10px;
    cursor: pointer;
    &.add {
      color: #199fff;
    }
    &.del {
      color: #ff4e00;
    }
  }
}
</style>
