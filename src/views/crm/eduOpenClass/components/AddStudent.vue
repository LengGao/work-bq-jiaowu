<template>
  <el-dialog
    title="添加学生"
    :visible.sync="visible"
    width="1100px"
    @open="handleOpen"
    :close-on-click-modal="false"
    @closed="resetForm('formData')"
  >
    <el-form
      label-width="100px"
      :model="formData"
      :rules="rules"
      inline
      ref="formData"
    >
      <Title text="学生信息"></Title>
      <div
        v-for="(item, index) in formData.student"
        :key="item.id"
        class="user-form"
      >
        <el-form-item
          label="客户姓名"
          :prop="`student[${index}].surname`"
          :rules="[{ required: true, message: `请输入`, trigger: 'blur' }]"
        >
          <el-input
            :disabled="!!userInfo.surname"
            v-model="formData.student[index].surname"
            class="input"
            placeholder="请输入客户姓名"
          />
        </el-form-item>
        <!-- :prop="`student[${index}].mobile`"
          :rules="[
            { required: false, message: `请输入`, trigger: 'blur' },
            {
              validator: validatorPhone,
              trigger: `change`,
            },
          ]" -->
        <el-form-item label="手机号码">
          <el-input
            :disabled="!!userInfo.surname"
            class="input"
            type="number"
            @mousewheel.native.prevent
            v-model="formData.student[index].mobile"
            placeholder="请输入手机号码"
          />
        </el-form-item>
        <!-- :prop="`student[${index}].id_card_number`"
          :rules="[
            { required: false, message: `请输入`, trigger: 'blur' },
            {
              min: 18,
              max: 18,
              message: `请输入18位身份证号码`,
              trigger: `change`,
            },
          ]" -->
        <el-form-item label="身份证号">
          <el-input
            :disabled="!!userInfo.surname"
            class="input"
            v-model="formData.student[index].id_card_number"
            placeholder="请输入身份证号"
          />
        </el-form-item>
        <span class="from-actions">
          <i
            class="el-icon-remove-outline del"
            v-if="formData.student.length > 1"
            @click="handleDelForm(index)"
          ></i>
          <i
            v-if="!userInfo.surname"
            class="el-icon-circle-plus-outline add"
            @click="handleAddForm"
          ></i>
        </span>
      </div>
      <Title text="开课信息"></Title>
      <el-form-item label="机构名称" prop="from_organization_id">
        <el-select
          v-model="formData.from_organization_id"
          filterable
          clearable
          placeholder="请选择机构"
          @change="resetCheckedParams"
        >
          <el-option
            v-for="item in institutionOptions"
            :key="item.institution_id"
            :label="item.institution_name"
            :value="item.institution_id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="报名类型" prop="type">
        <el-radio-group
          class="input"
          v-model="formData.type"
          @change="resetCheckedParams"
        >
          <el-radio :label="0">职业教育</el-radio>
          <el-radio :label="1">学历教育</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="届别名称">
        <el-select
          class="input"
          v-model="formData.jiebie_id"
          placeholder="请选择届别"
          clearable
          filterable
        >
          <el-option
            v-for="item in gradeOptions"
            :key="item.id"
            :value="item.id"
            :label="item.title"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        prop="selectProject"
        label="报名项目"
        v-if="formData.type === 0"
      >
        <el-cascader
          :disabled="!formData.from_organization_id"
          :key="`${formData.from_organization_id}-${formData.type}`"
          popper-class="select-project"
          placeholder="请选择项目"
          v-model="formData.selectProject"
          :options="projectOptions"
          :props="{ multiple: true }"
          :show-all-levels="false"
          filterable
          collapse-tags
        ></el-cascader>
      </el-form-item>
      <el-form-item prop="selectMajor" label="报名专业" v-else>
        <el-cascader
          :disabled="!formData.from_organization_id"
          :key="`${formData.from_organization_id}-${formData.type}`"
          ref="cascaderMajor"
          popper-class="select-project"
          placeholder="请选择报名专业"
          v-model="formData.selectMajor"
          :props="majorProps"
          :show-all-levels="false"
          collapse-tags
        ></el-cascader>
      </el-form-item>
      <el-form-item label="开通网课" prop="open_course">
        <el-radio-group class="input" v-model="formData.open_course">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <div class="table">
        <el-table
          v-if="formData.type === 0"
          :data="projectData"
          :header-cell-style="{
            'text-align': 'center',
            'background-color': '#f8f8f8',
          }"
          :cell-style="{ 'text-align': 'center' }"
          :key="formData.type"
        >
          <el-table-column label="序号" min-width="70" type="index">
          </el-table-column>
          <el-table-column
            label="项目名称"
            show-overflow-tooltip
            min-width="150"
            prop="project_name"
          >
          </el-table-column>
          <el-table-column
            label="所属分类"
            show-overflow-tooltip
            min-width="150"
            prop="project_name"
          >
          </el-table-column>
          <el-table-column
            prop="price"
            label="项目班型"
            min-width="110"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <el-select
                v-model="row.checked"
                filterable
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="(item, index) in row.classTypes"
                  :key="item.id"
                  :label="item.title"
                  :value="index"
                >
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" min-width="200">
            <template slot-scope="{ row }">
              <div style="display: flex; justify-content: center">
                <el-button type="text" @click="delbtn(row.id)">删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!-- 学历教育 -->
        <el-table
          :key="formData.type"
          v-else
          :data="majorData"
          :header-cell-style="{
            'text-align': 'center',
            'background-color': '#f8f8f8',
          }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column label="序号" min-width="70" type="index">
          </el-table-column>
          <el-table-column
            label="学历形式"
            show-overflow-tooltip
            min-width="150"
            prop="project_name"
          >
          </el-table-column>
          <el-table-column
            label="院校名称"
            show-overflow-tooltip
            min-width="150"
            prop="school_name"
          >
          </el-table-column>
          <el-table-column
            label="层次名称"
            show-overflow-tooltip
            min-width="150"
            prop="level_name"
          >
          </el-table-column>
          <el-table-column
            label="专业名称"
            show-overflow-tooltip
            min-width="150"
            prop="major_name"
          >
          </el-table-column>
          <el-table-column
            label="关联项目"
            show-overflow-tooltip
            min-width="150"
            prop="project_name"
          >
          </el-table-column>
          <el-table-column
            prop="price"
            label="价格"
            min-width="110"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <span>{{ row.price | moneyFormat }}</span>
              <!-- <el-select
                v-model="row.checked"
                filterable
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="(item, index) in row.classTypes"
                  :key="item.id"
                  :label="item.title"
                  :value="index"
                >
                </el-option>
              </el-select> -->
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" min-width="100">
            <template slot-scope="{ row }">
              <div style="display: flex; justify-content: center">
                <el-button type="text" @click="delMajor(row.id)"
                  >删除</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="info" v-if="formData.type === 0">
        <div class="info-item">
          <span class="info-item-name">课程名称：</span>
          <span class="info-item-value">{{ vocationOrderInfo.allCourse }}</span>
        </div>
        <div class="info-item">
          <span class="info-item-name">题库名称：</span>
          <span class="info-item-value">{{
            vocationOrderInfo.allQuestion
          }}</span>
        </div>
        <div class="info-item">
          <span class="info-item-name">教材名称：</span>
          <span class="info-item-value">{{
            vocationOrderInfo.allTeachingMaterial
          }}</span>
        </div>
      </div>
      <div class="info" v-else>
        <div class="info-item">
          <span class="info-item-name">课程名称：</span>
          <span class="info-item-value">{{ majorOrderInfo.allCourse }}</span>
        </div>
        <div class="info-item">
          <span class="info-item-name">题库名称：</span>
          <span class="info-item-value">{{ majorOrderInfo.allQuestion }}</span>
        </div>
        <div class="info-item">
          <span class="info-item-name">教材名称：</span>
          <span class="info-item-value">{{
            majorOrderInfo.allTeachingMaterial
          }}</span>
        </div>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hanldeCancel">取 消</el-button>
      <el-button
        type="primary"
        :loading="addLoading"
        @click="submitForm('formData', true)"
        >开 课</el-button
      >
      <el-button
        type="primary"
        :loading="addLoading"
        @click="submitForm('formData', false)"
        >连续开课</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import { orderOpen, getInstitutionClassType, switchList } from "@/api/crm";
import { getUniversityMajorDetailList, getGradeOptions } from "@/api/sou";
import { getCateProjectOption, getCateProjectDetail } from "@/api/etm";
export default {
  name: "AddCustomeDialog",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    userInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      visible: this.value,
      addLoading: false,
      formData: {
        student: [{ surname: "", mobile: "", id_card_number: "", id: 1 }],
        type: 0,
        from_organization_id: "",
        selectMajor: [],
        selectProject: [],
        open_course: "",
        jiebie_id: "",
      },
      rules: {
        open_course: [{ required: true, message: "请选择", trigger: "change" }],
        selectProject: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        selectMajor: [{ required: true, message: "请选择", trigger: "change" }],
        type: [{ required: true, message: "请选择", trigger: "change" }],
        from_organization_id: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        title: [{ required: true, message: "请选择", trigger: "blur" }],
      },
      projectOptions: [],
      type_id: "",
      school_id: "",
      level_id: "",
      majorProps: {
        multiple: true,
        lazy: true,
        lazyLoad: async (node, resolve) => {
          const { level, value } = node;
          let keyName = "";
          let valName = "";
          switch (level) {
            case 0:
              keyName = "type_name";
              valName = "type_id";
              break;
            case 1:
              this.type_id = value;
              this.school_id = "";
              this.level_id = "";
              keyName = "school_name";
              valName = "school_id";
              break;
            case 2:
              this.school_id = value;
              this.level_id = "";
              keyName = "level_name";
              valName = "level_id";
              break;
            case 3:
              this.level_id = value;
              keyName = "major_name";
              valName = "id";
              break;
          }
          if (level < 4) {
            const children = await this.getUniversityMajorDetailList();
            const nodes = children.map((item) => ({
              ...item,
              value: item[valName],
              label: item[keyName],
              leaf: level >= 3,
            }));
            // 通过调用resolve将子节点数据返回，通知组件数据加载完成
            resolve(nodes);
          } else {
            resolve([]);
          }
        },
      },
      majorData: [],
      projectData: [],
      majorProject: [],
      institutionOptions: [],
      gradeOptions: [],
    };
  },
  computed: {
    // 职业的教材，课程，题库数据
    vocationOrderInfo() {
      let allCourse = []; // 所有课程
      let allQuestion = []; // 所有题库
      let allTeachingMaterial = []; // 所有教材
      this.projectData.forEach((item) => {
        allCourse = allCourse.concat(item.course);
        allQuestion = allQuestion.concat(item.problem);
        allTeachingMaterial = allTeachingMaterial.concat(item.textbooks);
      });
      return {
        allTeachingMaterial: allTeachingMaterial
          .map((item) => item.book_name)
          .join("、"),
        allQuestion: allQuestion.map((item) => item.problem_title).join("、"),
        allCourse: allCourse.map((item) => item.course_name).join("、"),
      };
    },
    // 学历的教材，课程，题库数据
    majorOrderInfo() {
      let allCourse = []; // 所有课程
      let allQuestion = []; // 所有题库
      let allTeachingMaterial = []; // 所有教材
      this.majorProject.forEach((item) => {
        allCourse = allCourse.concat(item.course);
        allQuestion = allQuestion.concat(item.problem);
        allTeachingMaterial = allTeachingMaterial.concat(item.textbooks);
      });
      return {
        allTeachingMaterial: allTeachingMaterial
          .map((item) => item.book_name)
          .join("、"),
        allQuestion: allQuestion.map((item) => item.problem_title).join("、"),
        allCourse: allCourse.map((item) => item.course_name).join("、"),
      };
    },
  },
  watch: {
    value(val) {
      this.visible = val;
    },
    // 根据选中的项目获取项目详情
    "formData.selectProject"(newVal) {
      this.getCateProjectDetail(newVal || []);
    },
    // 根据选中的专业获取相关数据
    "formData.selectMajor"(val) {
      const el = this.$refs.cascaderMajor;
      val &&
        el &&
        this.$nextTick(() => {
          let checkNodes = el.getCheckedNodes(true);
          let tableData = checkNodes
            .filter((item) => item.checked)
            .map((item) => item.data);
          let idStr = tableData.map(({ project_id }) => project_id).join(",");
          this.getTeachingMaterial(idStr);
          console.log(tableData);
          this.majorData = tableData.map((item) => ({
            ...item,
            checked: "",
          }));
          // this.getInstitutionClassType(idStr, tableData);
        });
    },
  },
  methods: {
    handleOpen() {
      this.getCateProjectOption();
      this.getGradeOptions();
      this.switchList();
      if (this.userInfo.surname) {
        this.formData.student = [
          {
            surname: this.userInfo.surname,
            mobile: this.userInfo.mobile,
            id_card_number: this.userInfo.id_card_number,
            id: 1,
          },
        ];
      }
    },
    // 获取届别选项
    async getGradeOptions() {
      const res = await getGradeOptions();
      if (res.code === 0) {
        this.gradeOptions = res.data;
      }
    },
    async switchList() {
      const res = await switchList();
      this.institutionOptions = res.data.list;
    },
    async getInstitutionClassType(project_id, tableData) {
      const { from_organization_id } = this.formData;
      const data = {
        from_organization_id: Array.isArray(from_organization_id)
          ? [...from_organization_id].pop()
          : from_organization_id,
        project_id,
      };
      const res = await getInstitutionClassType(data);
      if (res.code === 0) {
        this.majorData = tableData.map((item) => {
          res.data.forEach((child) => {
            if (item.project_id === child.id) {
              item.classTypes = JSON.parse(child.org_class_type || "[]");
            }
          });
          return {
            ...item,
            checked: "",
          };
        });
      }
    },
    // 当前机构或者学历类型改变是重置学历选项参数
    resetCheckedParams() {
      this.type_id = "";
      this.school_id = "";
      this.level_id = "";
      this.formData.selectMajor = [];
      this.formData.selectProject = [];
    },
    // 学历报名的级联选项
    async getUniversityMajorDetailList() {
      const data = {
        limit: 9999,
        status: 1,
        type_id: this.type_id || 0,
        school_id: this.school_id || 0,
        level_id: this.level_id || 0,
        from_organization_id: this.formData.from_organization_id || 0,
      };
      const res = await getUniversityMajorDetailList(data);
      return res.data.list;
    },
    validatorPhone(rule, value, callback) {
      if (/^1\d{10}$/.test(value) == false) {
        callback(new Error(`请输入正确的手机号`));
      } else {
        callback();
      }
    },
    handleDelForm(index) {
      this.formData.student.splice(index, 1);
    },
    handleAddForm() {
      this.formData.student.push({
        surname: "",
        mobile: "",
        id_card_number: "",
        id: +new Date(),
      });
    },
    async submit(isClose) {
      const data = {
        student: JSON.stringify(this.formData.student),
        type: this.formData.type,
        open_course: this.formData.open_course,
        from_organization_id: this.formData.from_organization_id,
        jiebie_id: this.formData.jiebie_id,
      };
      if (this.formData.type === 0) {
        data.project = JSON.stringify(
          this.projectData.map((item) => {
            if (item.checked === "") {
              this.$message.warning("请选择班型");
              throw new Error("请选择班型");
            }
            return {
              id: item.id,
              project_name: item.project_name,
              class_type_name: item.classTypes[item.checked].title,
              price: item.classTypes[item.checked].price,
              class_type_id: item.classTypes[item.checked].id,
              service_effective: item.service_effective,
              service_period: item.service_period,
              service_type: item.service_type,
            };
          })
        );
      } else {
        data.project = JSON.stringify(
          this.majorData.map((item) => {
            // if (item.checked === "") {
            //   this.$message.warning("请选择班型");
            //   throw new Error("请选择班型");
            // }
            return {
              type: {
                id: item.type_id,
                value: item.type_name,
              },
              university: {
                id: item.school_id,
                value: item.school_name,
              },
              level: {
                id: item.level_id,
                value: item.level_name,
              },
              major: {
                id: item.major_id,
                value: item.major_name,
              },
              project: {
                id: item.project_id,
                value: item.project_name,
              },
              org_university_id: item.org_university_id,
              price: item.price,
              // class_type: {
              //   value: item.classTypes[item.checked].title,
              //   price: item.classTypes[item.checked].price,
              //   id: item.classTypes[item.checked].id,
              // },
            };
          })
        );
      }
      if (data.project === "[]") {
        this.$message.error("请选择有效的项目！");
        return;
      }
      this.addLoading = true;
      const res = await orderOpen(data).catch(() => {
        this.addLoading = false;
      });
      this.addLoading = false;
      if (res.code === 0) {
        this.$message.success(res.message);
        if (isClose) {
          this.visible = false;
        } else {
          this.formData.student = [
            {
              surname: "",
              mobile: "",
              id_card_number: "",
              id: 1,
            },
          ];
        }
        this.$emit("on-success");
      }
    },
    // 学历报名 删除已选
    delMajor(id) {
      this.formData.selectMajor = this.formData.selectMajor.filter(
        (item) => [...item].pop() !== id
      );
    },
    // 职称报名删除已选项目
    delbtn(id) {
      this.formData.selectProject = this.formData.selectProject.filter(
        (item) => [...item].pop() !== id
      );
    },
    // 获取学历报名相关的教材，题库，课程数据
    async getTeachingMaterial(id) {
      if (!id) {
        this.majorProject = [];
        return;
      }
      const data = {
        id,
      };
      const res = await getCateProjectDetail(data);
      if (res.code === 0) {
        this.majorProject = res.data;
      }
    },
    // 已选项目详情
    async getCateProjectDetail(arr) {
      const idStr = arr.map((item) => [...item].pop()).join(",");
      if (!idStr) {
        this.projectData = [];
        return;
      }
      const data = {
        id: idStr,
      };
      const { from_organization_id } = this.formData;
      const classTypeData = {
        from_organization_id: Array.isArray(from_organization_id)
          ? [...from_organization_id].pop()
          : from_organization_id,
        project_id: idStr,
      };

      const [classTypeRes, projectRes] = await Promise.all([
        getInstitutionClassType(classTypeData),
        getCateProjectDetail(data),
      ]);
      if (classTypeRes.code === 0 && projectRes.code === 0) {
        this.projectData = projectRes.data.map((item) => {
          classTypeRes.data.forEach((child) => {
            if (item.id === child.id) {
              item.classTypes = JSON.parse(child.org_class_type || "[]");
            }
          });
          return {
            ...item,
            checked: "",
          };
        });
      }
    },
    // 获取项目选项
    async getCateProjectOption() {
      const data = {
        no_edu: 1,
        level: 1,
      };
      const res = await getCateProjectOption(data);
      if (res.code === 0) {
        this.projectOptions = res.data || [];
      }
    },
    submitForm(formName, isClose) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submit(isClose);
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      for (const k in this.formData) {
        this.formData[k] = "";
      }
      this.formData.student = [
        {
          surname: "",
          mobile: "",
          id_card_number: "",
          id: 1,
        },
      ];
      this.formData.type = 0;
      this.type_id = "";
      this.school_id = "";
      this.level_id = "";
      this.projectData = [];
      this.majorData = [];
      this.majorProject = [];
      this.$emit("input", false);
    },
    hanldeCancel() {
      this.visible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.input {
  width: 217px;
}
.user-form {
  display: flex;
  align-items: center;
  margin-bottom: 22px;
  .el-form-item {
    margin-bottom: 0;
  }
  .from-actions {
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
}

.block {
  width: 100%;
  /deep/.el-form-item__content {
    width: 80%;
  }
}
.info {
  padding-top: 10px;
  &-item {
    display: flex;
    padding: 6px 0;
    &-name {
      flex-shrink: 0;
    }
    &-value {
      color: #199fff;
    }
  }
}
</style>
<style lang="scss">
.select-project {
  .el-cascader-panel {
    & > .el-scrollbar:first-child {
      .el-checkbox {
        display: none;
      }
    }
    .el-cascader-node[aria-owns] {
      .el-checkbox {
        width: 14px;
        span {
          display: none;
        }
      }
    }
  }
}
</style>