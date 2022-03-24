<template>
  <!-- 异动申请 -->
  <div class="apply-change">
    <el-form
      label-width="100px"
      :model="formData"
      :rules="rules"
      inline
      ref="formData"
      class="apply-change-form"
    >
      <Title text="订单信息"></Title>
      <el-form-item label="客户姓名：">
        <span>{{ detailData.surname }}</span>
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
      <el-form-item label="学费金额" prop="order_money">
        <el-input
          type="number"
          class="input"
          v-model="formData.order_money"
          placeholder="请输入订单金额"
        />
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
      <el-form-item label="报名类型：">
        <span v-if="detailData.type === 1">学历教育</span>
        <span v-else>职业教育</span>
      </el-form-item>
      <el-form-item label="报名项目：">
        <span>{{ detailData.project_name }}</span>
      </el-form-item>

      <el-form-item v-if="detailData.type === 1" label="修改项目" key="666">
        <el-cascader
          ref="cascaderMajor"
          class="input"
          popper-class="select-project"
          placeholder="请选择项目"
          v-model="selectMajor"
          :props="majorProps"
          :show-all-levels="false"
          collapse-tags
        ></el-cascader>
      </el-form-item>
      <el-form-item v-else key="777" label="修改项目">
        <el-cascader
          class="input"
          popper-class="select-project"
          placeholder="请选择项目"
          v-model="selectProject"
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
      <el-form-item class="remark" label="备注信息" prop="tips">
        <el-input
          type="textarea"
          v-model="formData.tips"
          placeholder="请输入内容"
        />
      </el-form-item>
      <el-form-item label="回款凭证" style="width: 90%">
        <ImgListUpload v-model="formData.receipt_file" />
      </el-form-item>
      <template v-if="detailData.type === 1">
        <el-table
          key="1"
          :data="majorData"
          style="border: 1px solid #f1f1f1"
          :header-cell-style="{
            'text-align': 'center',
            'background-color': '#f8f8f8',
          }"
        >
          <el-table-column
            label="序号"
            min-width="70"
            align="center"
            type="index"
          >
          </el-table-column>
          <el-table-column
            label="学历形式"
            show-overflow-tooltip
            min-width="160"
            align="center"
            prop=""
          >
            <template slot-scope="{ row }">
              <span>
                {{ row.type_name || row.type.value }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="university.value"
            label="院校名称"
            min-width="80"
            align="center"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <span>
                {{ row.school_name || row.university.value }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="层次名称"
            align="center"
            prop="level.value"
            min-width="100"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <span>
                {{ row.level_name || row.level.value }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="专业名称"
            align="center"
            prop="major.value"
            min-width="100"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <span>
                {{ row.major_name || row.major.value }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="关联项目"
            align="center"
            min-width="100"
            prop="project_name"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            label="总学费"
            align="center"
            min-width="100"
            prop="total_money"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <span> ￥{{ row.total_money || row.price }} </span>
            </template>
          </el-table-column>
          <el-table-column
            label="实收金额"
            min-width="110"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <el-input
                v-model="row.must_money"
                type="number"
                placeholder="请输入实收金额"
              />
            </template>
          </el-table-column>
        </el-table>
      </template>
      <template v-else>
        <el-table
          key="2"
          :data="projectData"
          style="border: 1px solid #f1f1f1"
          :header-cell-style="{
            'text-align': 'center',
            'background-color': '#f8f8f8',
          }"
        >
          <el-table-column
            label="序号"
            min-width="70"
            align="center"
            type="index"
          >
          </el-table-column>
          <el-table-column
            label="项目名称"
            show-overflow-tooltip
            min-width="160"
            align="center"
            prop="project_name"
          >
          </el-table-column>
          <el-table-column
            prop="category_name"
            label="所属分类"
            min-width="80"
            align="center"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            label="项目价格"
            align="center"
            min-width="100"
            prop="project_price"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <span> ￥{{ row.project_price || row.price }} </span>
            </template>
          </el-table-column>
          <el-table-column
            label="实收金额"
            min-width="110"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <el-input
                v-model="row.must_money"
                type="number"
                placeholder="请输入实收金额"
              />
            </template>
          </el-table-column>
        </el-table>
      </template>
      <Title text="回款计划" class="table-title">
        <el-button type="primary" plain @click="handleAddPlan"
          >配置回款计划</el-button
        >
      </Title>
      <el-table
        :data="detailData.pay_plan"
        style="width: 100%"
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
              {{ expenseType[row.type] || "--" }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="year"
          label="所属年份"
          min-width="100"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="day"
          label="计划回款日期"
          min-width="140"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          label="计划回款金额"
          prop="money"
          align="center"
          min-width="100"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span>{{ row.money | moneyFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="已回款金额"
          prop="money"
          align="center"
          min-width="100"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span>{{ row.pay_money | moneyFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="pay_progress"
          label="回款进度"
          min-width="90"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span
              class="progress"
              :class="{
                'progress--wait': +(row.pay_progress || '').split('%')[0] > 0,
                'progress--success':
                  +(row.pay_progress || '').split('%')[0] >= 100,
              }"
              >{{ row.pay_progress }}</span
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="pay_day"
          label="实际回款时间"
          min-width="140"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
      </el-table>
      <Title text="回款记录" class="table-title">
        <el-button type="primary" plain @click="handleAdd()"
          >添加回款记录</el-button
        >
      </Title>
      <el-table
        :data="detailData.pay_log"
        style="
          width: 100%;
          border: 1px solid #eee;
          border-bottom: none;
          margin-bottom: 16px;
        "
        :header-cell-style="{
          'text-align': 'center',
          'background-color': '#f8f8f8',
        }"
      >
        <el-table-column
          label="序号"
          show-overflow-tooltip
          min-width="70"
          align="center"
          type="index"
        >
        </el-table-column>
        <el-table-column
          prop="pay_date"
          label="回款日期"
          min-width="100"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="relation_plan"
          label="关联计划"
          min-width="200"
          align="left"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          label="回款总金额"
          prop="pay_money"
          align="center"
          min-width="100"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span>{{ row.pay_money | moneyFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="pay_type"
          label="支付方式"
          align="center"
          min-width="100"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          label="收款人员"
          align="center"
          prop="admin_name"
          min-width="100"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          label="回款凭证"
          align="center"
          prop="admin_name"
          min-width="100"
        >
          <template slot-scope="{ row }">
            <template v-if="row.receipt_file && row.receipt_file.length">
              <img
                :src="src"
                @click="handlePreview(src)"
                style="height: 40px; cursor: pointer; margin-left: 10px"
                v-for="(src, index) in row.receipt_file"
                :key="index"
                alt=""
              />
            </template>
            <span v-else>无</span>
          </template>
        </el-table-column>
        <el-table-column
          label="备注信息"
          align="center"
          min-width="100"
          prop="tips"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          label="入账状态"
          prop="pay_status"
          align="center"
          min-width="100"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <el-tag
              v-if="payStatusMap[row.verify_status]"
              size="small"
              :type="payStatusMap[row.verify_status].type"
              >{{ payStatusMap[row.verify_status].text }}</el-tag
            >
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="verify_time"
          label="入账时间"
          min-width="160"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          align="center"
          min-width="160"
        >
          <template slot-scope="{ row, $index: index }">
            <el-button
              type="text"
              v-if="row.verify_status === 0"
              @click="handleAdd(row, index)"
              >编辑</el-button
            >
            <el-button
              type="text"
              v-if="[0, 2].includes(row.verify_status)"
              @click="handleDel(index)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-form-item class="remark" label="异动理由" prop="reason">
        <el-input
          type="textarea"
          v-model="formData.reason"
          placeholder="请输入异动理由"
          maxlength="400"
        />
      </el-form-item>
      <div class="footer-submit">
        <el-button @click="hanldeCancel">取 消</el-button>
        <el-button
          type="primary"
          :loading="addLoading"
          @click="submitForm('formData')"
          >提 交</el-button
        >
      </div>
    </el-form>
    <SetCollectionRecord
      v-model="dialogVisible"
      :title="dialogTitle"
      @on-success="onSetRecordSuccess"
      :staff-options="staffOptions"
      :data="editRecord"
      :planData="detailData.pay_plan"
    />
    <SetCollectionPlan
      v-model="planDialogVisible"
      title="配置回款计划"
      @on-success="onSetPlanSuccess"
      :data="detailData.pay_plan"
    />
    <PreviewImg ref="view" />
  </div>
</template>

<script>
import ImgListUpload from "@/components/imgListUpload";
import {
  getCrmOrderDetail,
  getCustomfieldOptions,
  orderReshuffle,
  categoryGetSessionList,
} from "@/api/crm";
import { getStaffList } from "@/api/set";
import SetCollectionRecord from "./components/SetCollectionRecord.vue";
import SetCollectionPlan from "./components/SetCollectionPlan.vue";
import { getCateProjectOption, getCateProjectDetail } from "@/api/etm";
import { getUniversityMajorDetailList } from "@/api/sou";
import { mapGetters } from "vuex";
export default {
  name: "applyChange",
  components: {
    SetCollectionRecord,
    SetCollectionPlan,
    ImgListUpload,
  },
  data() {
    return {
      detailData: {
        pay_plan: [],
        pay_log: [],
        project: "[]",
        verify_step: [],
        verify_status: 0,
      },
      formData: {
        order_money: "",
        union_staff_id: "",
        jiebie_id: "",
        tips: "",
        reason: "",
        source: "",
        receipt_file: [],
      },
      rules: {
        source: [{ required: true, message: "请选择", trigger: "blur" }],
        order_money: [{ required: true, message: "请输入", trigger: "blur" }],
        reason: [{ required: true, message: "请输入", trigger: "blur" }],
      },
      addLoading: false,
      staffOptions: [],
      payMethodOptions: [],
      dialogTitle: "",
      dialogVisible: false,
      editRecord: {},
      editIndex: null,
      planDialogVisible: false,
      planDialogTitle: "",
      payStatusMap: {
        0: {
          type: "primary",
          text: "待入账",
        },
        1: {
          type: "success",
          text: "已入账",
        },
        2: {
          type: "danger",
          text: "已驳回",
        },
      },
      selectProject: "",
      selectMajor: "",
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
      tableData: [],
      gradeOptions: [],
      fromOptions: [],
    };
  },
  watch: {
    // 根据选中的项目获取项目详情
    selectProject(newVal) {
      if (newVal && newVal.length) {
        this.getCateProjectDetail(newVal);
        // 根据选中的项目分类获取届别
        const firstChildArr = newVal[0] || [];
        const cateId = firstChildArr[0];
        this.categoryGetSessionList(cateId);
      } else {
        this.projectData = this.tableData;
        this.categoryGetSessionList(this.detailData.category_id);
      }
    },
    // 根据选中的专业获取相关数据
    selectMajor() {
      const el = this.$refs.cascaderMajor;
      el &&
        this.$nextTick(() => {
          let checkNodes = el.getCheckedNodes(true);
          this.majorData = checkNodes
            .filter((item) => item.checked)
            .map((item) => item.data);
          if (!this.majorData.length) {
            this.majorData = this.tableData;
          }
        });
    },
  },
  computed: {
    ...mapGetters(["expenseType"]),
  },
  created() {
    this.getCrmOrderDetail();
    this.getStaffList();
    this.getCustomfieldOptions();
    this.getFromOptions();
    this.getCateProjectOption();
  },
  methods: {
    // 获取来源
    async getFromOptions() {
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
    // 已选项目详情
    async getCateProjectDetail(arr) {
      const idStr = arr.map((item) => [...item].pop()).join(",");
      const data = {
        id: idStr,
      };
      const res = await getCateProjectDetail(data);
      if (res.code === 0) {
        this.projectData = res.data;
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
    handlePreview(src) {
      this.$refs.view.show(src);
    },
    hanldeCancel() {
      this.$router.back();
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.orderReshuffle();
        }
      });
    },
    async orderReshuffle() {
      const data = {
        ...this.formData,
        receipt_file: this.formData.receipt_file.map((item) => {
          if (item.url && !item.url.includes("blob:")) {
            return item.url;
          }
          return item.response.data.data.url;
        }),
        union_staff_id: (this.formData.union_staff_id || []).join(","),
        pay_plan: this.detailData.pay_plan,
        pay_log: this.detailData.pay_log,
        order_id: this.detailData.order_id,
        type: this.detailData.type,
      };

      if (this.detailData.type === 1) {
        data.project = JSON.stringify(
          this.majorData.map((item) => {
            if (!item.must_money) {
              this.$message.error(
                `请输入 ${item.project_name || item.project?.value} 的实收金额`
              );
              throw new Error("must_money is null");
            }
            return {
              id: item.id,
              type: {
                id: item.type_id || item.type?.id,
                value: item.type_name || item.type?.value,
              },
              university: {
                id: item.school_id || item.university?.id,
                value: item.school_name || item.university?.value,
              },
              level: {
                id: item.level_id || item.level?.id,
                value: item.level_name || item.level?.value,
              },
              major: {
                id: item.major_id || item.major?.id,
                value: item.major_name || item.major?.value,
              },
              total_money: item.price || item.total_money,
              lower_price: item.lowest_price || item.lower_price,
              service_period: item.service_period,
              service_type: item.service_type,
              service_effective: item.service_effective,
              must_money: item.must_money,
              project: {
                id: item.project_id || item.project?.id,
                value: item.project_name || item.project?.value,
              },
            };
          })
        );
      } else if (this.detailData.type === 0) {
        data.project = JSON.stringify(
          this.projectData.map((item) => {
            if (!item.must_money) {
              this.$message.error(`请输入 ${item.project_name} 的实收金额`);
              throw new Error("must_money is null");
            }
            return {
              id: item.id,
              project_name: item.project_name,
              project_price: item.price || item.project_price,
              lower_price: item.lowest_price || item.lower_price,
              must_price: item.must_price,
              must_money: item.must_money,
              service_effective: item.service_effective,
              service_period: item.service_period,
              service_type: item.service_type,
            };
          })
        );
      }
      const res = await orderReshuffle(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.hanldeCancel();
      }
    },
    onSetRecordSuccess(data) {
      if (this.editIndex || this.editIndex === 0) {
        this.detailData.pay_log.splice(this.editIndex, 1, data);
        return;
      }
      (this.detailData.pay_log || (this.detailData.pay_log = [])).push(data);
    },
    onSetPlanSuccess(data) {
      this.detailData.pay_plan = data;
    },
    handleAddPlan() {
      this.planDialogTitle = "配置回款计划";
      this.planDialogVisible = true;
    },
    handleDel(index) {
      this.detailData.pay_log.splice(index, 1);
    },
    handleAdd(row, index) {
      this.editRecord = row || {};
      this.editIndex = index ?? null;
      this.dialogTitle = `${row ? "编辑" : "添加"}回款记录`;
      this.dialogVisible = true;
    },
    //获取业绩共享人
    async getStaffList() {
      const data = {
        limit: 99999,
      };
      const res = await getStaffList(data);
      this.staffOptions = res.data.list;
    },
    // 获取支付方式
    async getCustomfieldOptions() {
      const data = {
        field_name: "payment_method",
      };
      const res = await getCustomfieldOptions(data);
      if (res.code === 0) {
        this.payMethodOptions = res.data.field_content;
      }
    },
    async getCrmOrderDetail() {
      const data = {
        order_id: this.$route.query.id,
      };
      this.loading = true;
      const res = await getCrmOrderDetail(data).catch(() => {});
      this.loading = false;
      if (res.code === 0) {
        this.detailData = res.data;
        const union_staff_id = res.data.union_staff_id;
        this.formData.union_staff_id = union_staff_id
          ? res.data.union_staff_id.split(",").map((item) => +item)
          : "";
        this.formData.order_money = res.data.order_money;
        this.formData.tips = res.data.tips;
        this.formData.jiebie_id = res.data.jiebie_id || "";
        this.formData.source = res.data.source || "";
        this.formData.receipt_file = (res.data.receipt_file || []).map(
          (item, index) => ({
            name: "回款凭证" + (index + 1),
            url: item,
          })
        );
        this.projectData =
          this.majorData =
          this.tableData =
            JSON.parse(this.detailData.project) || [];
        this.categoryGetSessionList(res.data.category_id);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.apply-change {
  padding: 16px;
  &-form {
    /deep/.el-form-item {
      width: 24%;
      &.remark {
        width: 100%;
        .el-form-item__content {
          width: 88%;
        }
      }
    }
    .progress {
      color: #999;
      &--wait {
        color: #fe7d00;
      }
      &--success {
        color: #43d100;
      }
    }
    .table-title {
      display: flex;
      justify-content: space-between;
      padding-top: 10px;
    }
    .footer-submit {
      text-align: center;
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