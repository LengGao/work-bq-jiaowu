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
      <el-form-item label="订单编号：">
        <span>{{ detailData.order_no }}</span>
      </el-form-item>
      <el-form-item label="订单时间：">
        <span>{{ detailData.create_time }}</span>
      </el-form-item>
      <el-form-item label="客户姓名：">
        <span>{{ detailData.surname }}</span>
      </el-form-item>
      <el-form-item label="所属老师：">
        <span>{{ detailData.staff_name }}</span>
      </el-form-item>
      <el-form-item label="报名类型：">
        <span v-if="detailData.type === 1">学历教育</span>
        <span v-else>职业教育</span>
      </el-form-item>
      <el-form-item label="报名项目：">
        <span>{{ detailData.project_name }}</span>
      </el-form-item>

      <el-form-item label="订单金额" prop="order_money">
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
      <el-form-item label="优惠金额">
        <el-input
          type="number"
          class="input"
          v-model="formData.reduction"
          placeholder="请输入优惠金额"
        />
      </el-form-item>
      <template v-if="detailData.type === 1">
        <el-form-item label="考前辅导费：">
          <span>{{ detailData.pre_tutor | moneyFormat }}</span>
        </el-form-item>
        <el-form-item label="报考费：">
          <span>{{ detailData.examination | moneyFormat }}</span>
        </el-form-item>
        <el-form-item label="教材费：">
          <span>{{ detailData.textbook | moneyFormat }}</span>
        </el-form-item>
        <el-form-item label="毕设指导费：">
          <span>{{ detailData.graduation_guidance | moneyFormat }}</span>
        </el-form-item>
        <el-form-item label="论文答辩费：">
          <span>{{ detailData.thesis_defense | moneyFormat }}</span>
        </el-form-item>
        <el-form-item label="平台费：">
          <span>{{ detailData.platform_fee | moneyFormat }}</span>
        </el-form-item>
        <el-form-item label="其他费用：">
          <span>{{ detailData.others | moneyFormat }}</span>
        </el-form-item>
      </template>
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
          :data="getTableData"
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
            prop="type.value"
          >
          </el-table-column>
          <el-table-column
            prop="university.value"
            label="院校名称"
            min-width="80"
            align="center"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            label="层次名称"
            align="center"
            prop="level.value"
            min-width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            label="专业名称"
            align="center"
            prop="major.value"
            min-width="100"
            show-overflow-tooltip
          >
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
              <span> ￥{{ row.total_money }} </span>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <template v-else>
        <el-table
          key="2"
          :data="getTableData"
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
              <span> ￥{{ row.project_price }} </span>
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
          label="计划期次"
          show-overflow-tooltip
          min-width="70"
          align="center"
        >
          <template slot-scope="{ $index: index }">
            <span>第{{ index + 1 }}期</span>
          </template>
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
          label="回款时间"
          min-width="140"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
      </el-table>
      <Title text="回款记录" class="table-title">
        <span class="tips"
          >（当回款记录日期与回款计划日期一致时，将自动关联）</span
        >
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
          margin-bottom: 20px;
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
          min-width="140"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          label="回款金额"
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
        <!-- <el-table-column
          prop="pay_plan_sort"
          label="关联期次"
          align="center"
          min-width="100"
          show-overflow-tooltip
        >
        </el-table-column> -->
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
          prop="verify_status"
          align="center"
          min-width="100"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span>{{ payStatusMap[row.verify_status] || "--" }}</span>
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
} from "@/api/crm";
import { getStaffList } from "@/api/set";
import SetCollectionRecord from "./components/SetCollectionRecord.vue";
import SetCollectionPlan from "./components/SetCollectionPlan.vue";
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
        reduction: "",
        order_money: "",
        union_staff_id: "",
        tips: "",
        reason: "",
        receipt_file: [],
      },
      rules: {
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
        0: "待入账",
        1: "已入账",
        2: "已驳回",
        3: "确认入账中",
      },
    };
  },
  computed: {
    getTableData() {
      const tableData = JSON.parse(this.detailData.project) || [];
      return tableData;
    },
  },
  created() {
    this.getCrmOrderDetail();
    this.getStaffList();
    this.getCustomfieldOptions();
  },
  methods: {
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
      };
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
        this.formData.reduction = res.data.reduction;
        this.formData.order_money = res.data.order_money;
        this.formData.tips = res.data.tips;
        this.formData.receipt_file = (res.data.receipt_file || []).map(
          (item, index) => ({
            name: "回款凭证" + (index + 1),
            url: item,
          })
        );
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
      .tips {
        font-size: 12px;
        color: #fd6500;
        margin-right: auto;
        margin-left: 10px;
        align-self: center;
      }
    }
    .footer-submit {
      text-align: center;
    }
  }
}
</style>