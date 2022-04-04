<template>
  <div class="sign-up">
    <el-form
      label-width="100px"
      :model="formData"
      :rules="rules"
      inline
      ref="formData"
    >
      <Title text="订单信息"></Title>
      <el-form-item label="客户姓名" prop="surname">
        <el-input
          v-model="formData.surname"
          class="input"
          placeholder="请输入客户姓名"
        />
      </el-form-item>

      <el-form-item label="手机号码" prop="mobile">
        <el-input
          class="input"
          type="number"
          @mousewheel.native.prevent
          v-model="formData.mobile"
          placeholder="请输入手机号码"
        />
      </el-form-item>
      <el-form-item label="身份证号码" prop="id_card_number">
        <el-input
          class="input"
          v-model="formData.id_card_number"
          placeholder="请输入身份证号码"
        />
      </el-form-item>
      <el-form-item label="订单来源" prop="source">
        <el-select
          class="input"
          v-model="formData.source"
          filterable
          clearable
          placeholder="请选择客户来源"
        >
          <el-option
            v-for="item in fromOptions"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="共享业绩" prop="union_staff_id">
        <el-select
          class="input"
          v-model="formData.union_staff_id"
          placeholder="请选择"
          clearable
          filterable
          multiple
        >
          <el-option
            v-for="item in staffOptions"
            :key="item.staff_id"
            :value="item.staff_id"
            :label="item.staff_name"
          >
            <span style="float: left">{{ item.staff_name }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{
              item.group_name
            }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开通网课" prop="online_course">
        <el-radio-group class="input" v-model="formData.online_course">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注信息" prop="tips">
        <el-input
          class="remark"
          type="textarea"
          v-model="formData.tips"
          placeholder="请输入内容"
        />
      </el-form-item>
      <Title text="项目信息"></Title>
      <el-form-item label="报名类型" prop="type">
        <el-radio-group
          class="input"
          @change="resetCheckedParams"
          v-model="formData.type"
        >
          <el-radio :label="0">职业教育</el-radio>
          <el-radio :label="1">学历教育</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        v-if="formData.type === 1"
        label="报名专业"
        prop="selectMajor"
        key="1"
      >
        <el-cascader
          ref="cascaderMajor"
          class="input"
          popper-class="select-project"
          placeholder="请选择专业"
          v-model="formData.selectMajor"
          :props="majorProps"
          :show-all-levels="false"
          collapse-tags
        ></el-cascader>
      </el-form-item>
      <el-form-item v-else key="2" label="报名项目" prop="selectProject">
        <el-cascader
          class="input"
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
      <div class="table">
        <!-- 职业教育 -->
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
            prop="category_name"
          >
          </el-table-column>
          <el-table-column
            prop="price"
            label="项目价格"
            min-width="110"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <div>{{ row.price | moneyFormat }}</div>
            </template>
          </el-table-column>
          <el-table-column min-width="110" show-overflow-tooltip>
            <template slot="header">
              实收学费金额
              <el-tooltip
                class="item"
                effect="dark"
                content="不包含报考费，平台费，教材费等其他杂费。"
                placement="top-start"
              >
                <i class="el-icon-question"></i>
              </el-tooltip>
            </template>
            <template slot-scope="{ row }">
              <el-input
                v-model="row.pay_money"
                type="number"
                @mousewheel.native.prevent
                placeholder="请输入"
              />
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" min-width="200">
            <template slot-scope="{ row }">
              <div style="display: flex; justify-content: center">
                <el-button type="text" @click="handleRemoveProject(row.id)"
                  >删除</el-button
                >
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
          <el-table-column label="序号" min-width="50" type="index">
          </el-table-column>
          <el-table-column
            label="学历形式"
            show-overflow-tooltip
            min-width="100"
            prop="type_name"
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
            min-width="100"
            prop="level_name"
          >
          </el-table-column>
          <el-table-column
            label="专业名称"
            show-overflow-tooltip
            min-width="120"
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
            label="总学费"
            min-width="110"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <div>{{ row.price | moneyFormat }}</div>
            </template>
          </el-table-column>
          <el-table-column min-width="120" show-overflow-tooltip>
            <template slot="header">
              实收学费金额
              <el-tooltip
                class="item"
                effect="dark"
                content="不包含报考费，平台费，教材费等其他杂费。"
                placement="top-start"
              >
                <i class="el-icon-question"></i>
              </el-tooltip>
            </template>
            <template slot-scope="{ row }">
              <el-input
                v-model="row.pay_money"
                type="number"
                @mousewheel.native.prevent
                placeholder="请输入"
              />
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" min-width="100">
            <template slot-scope="{ row }">
              <div style="display: flex; justify-content: center">
                <el-button type="text" @click="handleRemoveMajor(row.id)"
                  >删除</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <Title text="回款计划"></Title>
      <el-form-item label="回款类型" prop="plan_type" class="checkbox-type">
        <el-checkbox-group
          v-model="formData.plan_type"
          @change="handlePlanTypeChange"
        >
          <el-checkbox
            :label="value"
            name="type"
            v-for="(name, value) in expenseType"
            :key="value"
            >{{ name }}</el-checkbox
          >
        </el-checkbox-group>
      </el-form-item>
      <el-table
        class="plan-table"
        :data="formData.tableData"
        :header-cell-style="{
          'text-align': 'center',
          'background-color': '#f8f8f8',
        }"
      >
        <el-table-column
          label="序号"
          show-overflow-tooltip
          min-width="50"
          align="center"
          type="index"
        >
        </el-table-column>
        <el-table-column
          label="回款类型"
          show-overflow-tooltip
          min-width="80"
          align="center"
        >
          <template slot-scope="{ row }">
            <span>
              {{ expenseType[row.type] }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="项目名称"
          show-overflow-tooltip
          min-width="200"
          align="center"
        >
          <template slot-scope="{ row, $index: index }">
            <el-form-item
              v-if="row.type != 1"
              :rules="[
                { required: true, message: `请选择`, trigger: 'change' },
              ]"
              :prop="`tableData[${index}].checkedProjectIds`"
            >
              <el-select
                v-model="row.checkedProjectIds"
                placeholder="请选择项目"
                filterable
                multiple
              >
                <el-option
                  v-for="item in getPlanProjectOptions"
                  :key="item.id"
                  :label="
                    formData.type === 1
                      ? `${item.school_name}-${item.major_name}`
                      : item.project_name
                  "
                  :value="item.id + ''"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <span v-else>{{ getPlanProjectName }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="所属年份"
          show-overflow-tooltip
          min-width="120"
          align="center"
        >
          <template slot-scope="{ row, $index: index }">
            <el-form-item
              :rules="[
                { required: true, message: `请选择`, trigger: 'change' },
              ]"
              :prop="`tableData[${index}].year`"
            >
              <el-select
                v-model="row.year"
                placeholder="请选择"
                @change="getDateByYearMixin($event, row)"
                filterable
              >
                <el-option
                  v-for="item in yearOptions"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          label="计划回款日期"
          min-width="200"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="{ row, $index: index }">
            <el-form-item
              :rules="[
                { required: true, message: `请选择`, trigger: 'change' },
              ]"
              :prop="`tableData[${index}].day`"
            >
              <el-date-picker
                style="width: 100%"
                type="date"
                placeholder="选择日期"
                v-model="row.day"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          label="计划回款金额"
          align="center"
          min-width="160"
          show-overflow-tooltip
        >
          <template slot-scope="{ row, $index: index }">
            <el-form-item
              :rules="[{ required: true, message: `请输入`, trigger: 'blur' }]"
              :prop="`tableData[${index}].money`"
            >
              <el-input
                v-model="row.money"
                placeholder="请输入"
                type="number"
                @mousewheel.native.prevent
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          align="center"
          min-width="100"
        >
          <template slot-scope="{ row, $index: index }">
            <el-button
              @click="handleDelRow(index)"
              class="btn"
              type="text"
              icon="el-icon-remove-outline"
            ></el-button>
            <el-button
              @click="handleAddRow(row.type, index)"
              class="btn"
              type="text"
              icon="el-icon-circle-plus-outline"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <Title text="订单小结"></Title>
      <el-form-item>
        <template slot="label">
          学费金额
          <el-tooltip
            class="item"
            effect="dark"
            content="学费金额=项目实收学费金额总和"
            placement="top-start"
          >
            <i class="el-icon-question"></i>
          </el-tooltip>
        </template>
        <el-input class="input" :value="payMoneyTotal" type="number" disabled />
      </el-form-item>
      <el-form-item>
        <template slot="label">
          其他金额
          <el-tooltip
            class="item"
            effect="dark"
            content="其他金额=回款计划中除学费外的其他类型计划金额总和"
            placement="top-start"
          >
            <i class="el-icon-question"></i>
          </el-tooltip>
        </template>
        <el-input
          class="input"
          :value="otherMoneyTotal"
          type="number"
          disabled
        />
      </el-form-item>
      <el-form-item label="订单总额">
        <template slot="label">
          订单总额
          <el-tooltip
            class="item"
            effect="dark"
            content="订单金额=学费金额+其他金额"
            placement="top-start"
          >
            <i class="el-icon-question"></i>
          </el-tooltip>
        </template>
        <el-input
          class="input"
          :value="orderMoneyTotal"
          type="number"
          disabled
        />
      </el-form-item>
      <Title text="回款信息"></Title>
      <el-form-item prop="pay_day" label="回款日期">
        <el-date-picker
          class="input"
          type="date"
          placeholder="选择日期"
          v-model="formData.pay_day"
          :picker-options="{
            disabledDate: disabledDate,
          }"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item
        label="回款计划"
        prop="pay_plan_ids"
        :rules="[
          {
            required: true,
            message: `请选择`,
            trigger: 'change',
          },
        ]"
      >
        <el-select
          class="input"
          v-model="formData.pay_plan_ids"
          placeholder="请选择回款计划"
          clearable
          multiple
          @change="handleSelectPlan"
        >
          <el-option
            v-for="item in formData.tableData"
            :key="item.temp_id"
            :label="`${item.year}年 ${getProjectNameById(
              item.checkedProjectIds
            )} ${expenseType[item.type]} ￥${(+item.money || 0).toFixed(2)}`"
            :value="item.temp_id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="回款金额" prop="pay_money">
        <el-input
          class="input"
          v-model="formData.pay_money"
          type="number"
          @mousewheel.native.prevent
          placeholder="请输入回款金额"
        />
      </el-form-item>
      <el-form-item label="支付方式" prop="pay_type">
        <el-select
          v-model="formData.pay_type"
          placeholder="请选择支付方式"
          class="input"
          filterable
        >
          <el-option
            v-for="item in payMethodOptions"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="回款凭证">
        <el-select
          v-show="false"
          multiple
          v-model="formData.receipt_file"
        ></el-select>
        <ImgListUpload style="width: 400px" v-model="formData.receipt_file" />
      </el-form-item>
    </el-form>
    <div class="sign-up-footer">
      <span class="tips"
        >*回款时必须保证回款金额等于所选回款计划的总金额，如不相等请先修改回款计划</span
      >
      <el-button @click="hanldeCancel">取 消</el-button>
      <el-button @click="submitForm('formData', true)">预览合同</el-button>
      <el-button
        type="primary"
        :loading="addLoading"
        @click="submitForm('formData')"
        >提 交</el-button
      >
    </div>
    <PreviewContract v-model="previewDialog" :data="previewContractData" />
  </div>
</template>

<script>
import {
  categoryGetSessionList,
  getCustomfieldOptions,
  createOrder,
} from "@/api/crm";
import { getStaffList } from "@/api/set";
import { getUniversityMajorDetailList } from "@/api/sou";
import { getCateProjectOption, getCateProjectDetail } from "@/api/etm";
import { getPlanYearOptions, currentYear, today } from "@/utils/date";
import ImgListUpload from "@/components/imgListUpload";
import PreviewContract from "./components/PreviewContract";
import { mapGetters } from "vuex";
import { accAdd } from "@/utils";
export default {
  name: "signUp",
  components: {
    ImgListUpload,
    PreviewContract,
  },
  data() {
    return {
      tempId: 1,
      addLoading: false,
      formData: {
        id: "",
        surname: "",
        mobile: "",
        online_course: "",
        id_card_number: "",
        order_money: "",
        union_staff_id: [],
        tips: "",
        type: 0,
        selectMajor: [],
        selectProject: [],
        jiebie_id: "",
        source: "",
        plan_type: [],
        tableData: [],
        pay_day: "",
        pay_money: "",
        pay_type: "",
        pay_plan_ids: [],
        receipt_file: [],
      },
      rules: {
        receipt_file: [
          { required: true, message: "请上传", trigger: "change" },
        ],
        plan_type: [{ required: true, message: "请选择", trigger: "change" }],
        pay_type: [{ required: true, message: "请选择", trigger: "change" }],
        pay_day: [{ required: true, message: "请选择", trigger: "change" }],
        pay_money: [{ required: true, message: "请输入", trigger: "blur" }],

        online_course: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        source: [{ required: true, message: "请选择", trigger: "change" }],
        type: [{ required: true, message: "请选择", trigger: "change" }],
        selectMajor: [{ required: true, message: "请选择", trigger: "change" }],
        selectProject: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        order_money: [{ required: true, message: "请输入", trigger: "blur" }],
        surname: [{ required: true, message: "请输入", trigger: "blur" }],
        id_card_number: [
          { required: true, message: "请输入", trigger: "blur" },
          {
            min: 18,
            max: 18,
            message: "请输入18位身份证号码",
            trigger: "change",
          },
        ],
        mobile: [
          { required: true, message: "请输入", trigger: "blur" },
          {
            validator: function (rule, value, callback) {
              if (/^1\d{10}$/.test(value) == false) {
                callback(new Error("请输入正确的手机号"));
              } else {
                callback();
              }
            },
            trigger: "change",
          },
        ],
      },
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
      fromOptions: [],
      staffOptions: [],
      projectOptions: [],
      gradeOptions: [],
      payMethodOptions: [],
      yearOptions: getPlanYearOptions(),
      previewDialog: false,
      previewContractData: {},
    };
  },
  watch: {
    // 根据选中的项目获取项目详情
    "formData.selectProject"(newVal) {
      if (newVal && newVal.length) {
        this.getCateProjectDetail(newVal || []);
        // 根据选中的项目分类获取届别
        const firstChildArr = newVal[0] || [];
        const cateId = firstChildArr[0];
        this.categoryGetSessionList(cateId);
      } else {
        this.projectData = [];
        this.gradeOptions = [];
        this.updatePlanProject();
      }
    },
    // 根据选中的专业获取相关数据
    "formData.selectMajor"() {
      const el = this.$refs.cascaderMajor;
      el &&
        this.$nextTick(() => {
          let checkNodes = el.getCheckedNodes(true);
          this.majorData = checkNodes
            .filter((item) => item.checked)
            .map((item) => ({ ...item.data, pay_money: "" }));
          this.updatePlanProject();
        });
    },
  },
  computed: {
    ...mapGetters(["expenseType"]),
    // 获取当前已选项目
    getPlanProjectOptions() {
      return this.formData.type === 1 ? this.majorData : this.projectData;
    },
    // 获取已选项目名称
    getPlanProjectName() {
      if (this.formData.type === 1) {
        return this.majorData
          .map((item) => `${item.school_name}-${item.major_name}`)
          .join(",");
      } else {
        return this.projectData.map((item) => item.project_name).join(",");
      }
    },
    // 获取已选项目id
    getPlanProjectIds() {
      const data = this.formData.type === 1 ? this.majorData : this.projectData;
      return data.map((item) => item.id + "");
    },
    // 学费金额
    payMoneyTotal() {
      const data = this.formData.type === 1 ? this.majorData : this.projectData;
      return (this.formData.order_money = data.reduce((pre, cur) => {
        return accAdd(pre, cur.pay_money);
      }, 0));
    },
    // 其他金额
    otherMoneyTotal() {
      return this.formData.tableData
        .filter((item) => item.type !== "1")
        .reduce((pre, cur) => {
          return accAdd(pre, cur.money);
        }, 0);
    },
    // 订单总额
    orderMoneyTotal() {
      return accAdd(this.payMoneyTotal, this.otherMoneyTotal);
    },
  },
  created() {
    this.getCateProjectOption();
    this.getStaffList();
    this.getCustomfieldOptions();
    this.getPayTypeOptions();
    const {
      id = "",
      surname = "",
      mobile = "",
      id_card_number = "",
    } = this.$route.query;
    this.formData.id = id;
    this.formData.surname = surname;
    this.formData.mobile = mobile;
    this.formData.id_card_number = id_card_number;
  },
  methods: {
    getProjectNameById(ids) {
      if (this.formData.type === 1) {
        return this.majorData
          .filter((item) => ids.includes(item.id + ""))
          .map((item) => `${item.school_name}-${item.major_name}`)
          .join(",");
      } else {
        return this.projectData
          .filter((item) => ids.includes(item.id + ""))
          .map((item) => item.project_name)
          .join(",");
      }
    },
    // 获取来源
    async getCustomfieldOptions() {
      const data = {
        field_name: "customer_source",
      };
      const res = await getCustomfieldOptions(data);
      if (res.code === 0) {
        this.fromOptions = res.data.field_content;
      }
    },
    // 获取届别选项
    async categoryGetSessionList(category_id) {
      const data = { category_id };
      const res = await categoryGetSessionList(data);
      if (res.code === 0) {
        this.gradeOptions = res.data;
      }
    },
    // 学历报名 删除已选
    handleRemoveMajor(id) {
      this.formData.selectMajor = this.formData.selectMajor.filter(
        (item) => [...item].pop() !== id
      );
    },
    // 职称报名删除已选项目
    handleRemoveProject(id) {
      this.formData.selectProject = this.formData.selectProject.filter(
        (item) => [...item].pop() !== id
      );
    },
    // 已选项目详情
    async getCateProjectDetail(arr) {
      const idStr = arr.map((item) => [...item].pop()).join(",");
      const data = {
        id: idStr,
      };
      const res = await getCateProjectDetail(data);
      if (res.code === 0) {
        this.projectData = res.data.map((item) => ({
          ...item,
          pay_money: "",
        }));
        this.updatePlanProject();
      }
    },
    // 获取项目选项
    async getCateProjectOption() {
      const data = {
        no_edu: 1,
      };
      const res = await getCateProjectOption(data);
      if (res.code === 0) {
        this.projectOptions = res.data || [];
      }
    },
    // 获取业绩共享人
    async getStaffList() {
      const data = {
        limit: 99999,
      };
      const res = await getStaffList(data);
      this.staffOptions = res.data.list;
    },
    //报名类型切换时重置
    resetCheckedParams(type) {
      this.type_id = "";
      this.school_id = "";
      this.level_id = "";
      this.formData.selectMajor = [];
      this.formData.selectProject = [];
      this.formData.pay_plan_ids = [];
      // 获取学历类届别选项
      type === 1 ? this.categoryGetSessionList(6) : (this.gradeOptions = []);
    },
    // 更新计划已选的项目
    updatePlanProject() {
      this.formData.tableData.forEach((item) => {
        item.checkedProjectIds = this.getPlanProjectIds;
      });
    },
    // 学历报名的级联选项
    async getUniversityMajorDetailList() {
      const data = {
        limit: 9999,
        status: 1,
        type_id: this.type_id || 0,
        school_id: this.school_id || 0,
        level_id: this.level_id || 0,
      };
      const res = await getUniversityMajorDetailList(data);
      return res.data.list;
    },
    // 回款计划id
    getTempId() {
      return this.tempId++;
    },

    // 添加回款计划
    handleAddRow(type, index) {
      const item = {
        temp_id: this.getTempId(),
        type,
        year: currentYear,
        day: today,
        money: "",
        checkedProjectIds: this.getPlanProjectIds,
      };
      if (index !== undefined) {
        this.formData.tableData.splice(index + 1, 0, item);
      } else {
        this.formData.tableData.push(item);
      }
    },
    // 删除回款计划
    handleDelRow(index) {
      const [delItem] = this.formData.tableData.splice(index, 1);
      // 删除之后已选的计划要清除
      this.formData.pay_plan_ids = this.formData.pay_plan_ids.filter(
        (item) => item != delItem.temp_id
      );
      // 已选的费用类型清除
      const restData = this.formData.tableData.filter(
        (item) => item.type === delItem.type
      );
      if (!restData.length) {
        this.formData.plan_type = this.formData.plan_type.filter(
          (item) => item != delItem.type
        );
      }
    },
    // 回款计划选择
    handleSelectPlan(checkedIds) {
      if (checkedIds) {
        let totalMoney = 0;
        this.formData.tableData.forEach((item) => {
          if (checkedIds.includes(item.temp_id)) {
            totalMoney = accAdd(totalMoney, item.money);
          }
        });
        this.formData.pay_money = totalMoney;
      }
    },
    // 回款类型选择
    handlePlanTypeChange(checked) {
      checked = checked || [];
      const types = this.formData.tableData.map((item) => item.type);
      types.forEach((type, index) => {
        if (!checked.includes(type)) {
          this.handleDelRow(index);
        }
      });
      checked.forEach((type) => {
        if (!types.includes(type)) {
          this.handleAddRow(type);
        }
      });
    },
    disabledDate(e) {
      return e.getTime() > Date.now();
    },

    // 获取支付方式
    async getPayTypeOptions() {
      const data = {
        field_name: "payment_method",
      };
      const res = await getCustomfieldOptions(data);
      if (res.code === 0) {
        this.payMethodOptions = res.data.field_content;
      }
    },
    // 报名缴费
    async createOrder(isPreview) {
      const {
        union_staff_id,
        selectMajor,
        selectProject,
        tableData,
        plan_type,
        pay_plan_ids,
        receipt_file,
        ...restParams
      } = this.formData;

      const data = {
        ...restParams,
        union_staff_id: (union_staff_id || []).join(","),
        order_token: Date.now(),
        pay_plan_ids: (pay_plan_ids || []).join(","),
        receipt_file: receipt_file.map((item) => item.response.data.data.url),
        pay_plan: tableData.map((item) => {
          const { checkedProjectIds, ...rest } = item;
          return {
            ...rest,
            project_ids: checkedProjectIds.join(","),
          };
        }),
      };

      if (isPreview) {
        // 预览合同
        this.previewContractData = data;
        this.previewDialog = true;
        return;
      }
      this.addLoading = true;
      const res = await createOrder(data).catch(() => {});
      this.addLoading = false;
      if (res.code === 0) {
        this.$message.success(res.message);
        this.hanldeCancel();
      }
    },
    submitForm(formName, isPreview) {
      // 报名项目参数
      const projectData =
        this.formData.type === 1 ? this.majorData : this.projectData;
      this.formData.project_pay_money = {};
      this.formData.project = projectData.map((item) => {
        if (!item.pay_money) {
          this.$message.error(`请输入 ${item.project_name} 的实收学费金额`);
          throw new Error("pay_money is null");
        }
        this.formData.project_pay_money[item.id] = item.pay_money;
        return item.id;
      });
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.createOrder(isPreview);
        } else {
          if (this.formData.online_course === "") {
            this.$message.error("请选择是否开通网课");
          } else {
            this.$message.error("请完善报名资料");
          }
        }
      });
    },
    hanldeCancel() {
      this.$router.back();
    },
  },
};
</script>

<style lang="less" scoped>
.sign-up {
  padding: 20px 20px 100px 20px;
  .input {
    width: 240px;
  }
  .remark {
    width: 590px;
  }
  /deep/.el-select__tags {
    overflow: hidden;
  }
  .plan-table {
    margin-bottom: 20px;
    border: 1px solid #ededed;
    border-bottom: none;
    .btn {
      margin-top: -10px;
      padding: 6px 0;
      font-size: 20px;
    }
  }
  .checkbox-type {
    margin-bottom: 10px;
    /deep/.el-form-item {
      &__content,
      &__label {
        line-height: 20px;
      }
      &__error {
        padding-top: 0px;
      }
    }
  }
  &-footer {
    display: flex;
    align-items: center;
    padding: 20px;
    position: fixed;
    bottom: 0;
    right: 0;
    width: calc(100% - 200px);
    background-color: #fff;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
    .tips {
      color: red;
      margin-right: auto;
    }
  }
}
</style>
<style lang="less">
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