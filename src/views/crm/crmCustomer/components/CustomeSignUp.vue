<template>
  <el-dialog
    title="客户报名"
    :visible.sync="visible"
    width="1200px"
    @open="handleOpen"
    :close-on-click-modal="false"
    @closed="resetForm('formData')"
    top="5vh"
  >
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
      <template v-if="formData.type === 1">
        <el-form-item label="考前辅导费">
          <el-input
            class="input"
            v-model="formData.pre_tutor"
            type="number"
            placeholder="请输入考前辅导费"
          />
        </el-form-item>
        <el-form-item label="报考费">
          <el-input
            class="input"
            v-model="formData.examination"
            type="number"
            placeholder="请输入报考费"
          >
            <template slot="append">元/科</template>
          </el-input>
        </el-form-item>
        <el-form-item label="教材费">
          <el-input
            class="input"
            v-model="formData.textbook"
            type="number"
            placeholder="请输入教材费"
          >
            <template slot="append">元/年</template>
          </el-input>
        </el-form-item>
        <el-form-item label="毕设指导费">
          <el-input
            class="input"
            v-model="formData.graduation_guidance"
            type="number"
            placeholder="请输入毕设指导费"
          />
        </el-form-item>
        <el-form-item label="论文答辩费">
          <el-input
            class="input"
            v-model="formData.thesis_defense"
            type="number"
            placeholder="请输入论文答辩费"
          />
        </el-form-item>
        <el-form-item label="平台费">
          <el-input
            class="input"
            v-model="formData.platform_fee"
            type="number"
            placeholder="请输入平台费"
          />
        </el-form-item>
        <el-form-item label="其他费用">
          <el-input
            class="input"
            v-model="formData.others"
            type="number"
            placeholder="请输入其他费用"
          />
        </el-form-item>
      </template>

      <el-form-item label="备注信息" prop="tips" class="block">
        <el-input
          class="remark"
          type="textarea"
          v-model="formData.tips"
          placeholder="请输入内容"
        />
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
            prop="project_name"
          >
          </el-table-column>
          <el-table-column
            prop="price"
            label="项目价格"
            min-width="110"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <div>￥{{ row.price }}</div>
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
            label="总学费"
            min-width="110"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <div>￥{{ row.price }}</div>
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
      <div>
        <Title text="回款信息"></Title>
        <el-form-item
          label="回款期次"
          prop="planIndex"
          :rules="[
            {
              required: !!planOptions.length,
              message: `请选择`,
              trigger: 'change',
            },
          ]"
        >
          <el-select
            class="input"
            v-model="formData.planIndex"
            placeholder="请选择回款期次"
            clearable
          >
            <el-option
              v-for="(item, index) in planOptions"
              :key="item.id"
              :label="`第${index + 1}期 ${item.day} ￥${(
                +item.money || 0
              ).toFixed(2)}`"
              :value="index"
            >
            </el-option>
          </el-select>
          <el-button
            type="text"
            @click="openPlanDialog"
            style="margin-left: 10px"
            title="配置回款计划"
            >配置</el-button
          >
        </el-form-item>
        <el-form-item label="回款金额" prop="pay_money">
          <el-input
            class="input"
            v-model="formData.pay_money"
            type="number"
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
        <el-form-item prop="pay_day" label="支付日期">
          <el-date-picker
            class="input"
            type="date"
            placeholder="选择日期"
            v-model="formData.pay_day"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="回款凭证" style="margin-left: 40px">
          <el-upload
            :headers="headers"
            :action="uploadImageUrl"
            :on-remove="handleRemoveImg"
            :before-remove="beforeRemoveImg"
            :on-success="handleUploadSuccess"
            :on-error="handleUploadError"
            multiple
            name="image"
            accept="image/*"
            list-type="picture-card"
            :file-list="formData.receipt_file"
          >
            <i class="el-icon-plus" style="font-size: 14px"></i>
          </el-upload>
        </el-form-item>
      </div>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="hanldeCancel">取 消</el-button>
      <el-button
        type="primary"
        :loading="addLoading"
        @click="submitForm('formData')"
        >提 交</el-button
      >
    </span>
    <AddCollectionPlan
      v-model="planDialogVisible"
      title="配置回款计划"
      @on-success="getPlanOptions"
      :data="planDialogData"
    />
  </el-dialog>
</template>

<script>
import { uploadImageUrl } from "@/api/educational";
import { createCrmOrder, getCustomfieldOptions } from "@/api/crm";
import { getStaffList } from "@/api/set";
import { getUniversityMajorDetailList } from "@/api/sou";
import { getCateProjectOption, getCateProjectDetail } from "@/api/etm";
import AddCollectionPlan from "@/views/crm/crmOrder/components/AddCollectionPlan";
import { today } from "@/utils/date";
export default {
  name: "CustomeSignUp",
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
  components: {
    AddCollectionPlan,
  },
  data() {
    return {
      visible: this.value,
      uploadImageUrl,
      headers: {
        token: this.$store.state.user.token,
      },
      formData: {
        surname: "",
        mobile: "",
        id_card_number: "",
        order_money: "",
        union_staff_id: "",
        tips: "",
        type: 0,
        selectMajor: "",
        selectProject: "",
        pay_day: "",
        pay_money: "",
        pay_type: "",
        planIndex: "",
        receipt_file: [],
      },
      rules: {
        pay_type: [{ required: true, message: "请选择", trigger: "change" }],
        pay_day: [{ required: true, message: "请选择", trigger: "change" }],
        pay_money: [{ required: true, message: "请输入", trigger: "blur" }],
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
      addLoading: false,
      fromOptions: [],
      staffOptions: [],
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
      planDialogVisible: false,
      planDialogData: [],
      planOptions: [],
      payMethodOptions: [],
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
    // 根据选中的项目获取项目详情
    "formData.selectProject"(newVal) {
      console.log(newVal);
      this.getCateProjectDetail(newVal || []);
    },
    // 根据选中的专业获取相关数据
    "formData.selectMajor"(val) {
      const el = this.$refs.cascaderMajor;
      val &&
        this.$nextTick(() => {
          let checkNodes = el.getCheckedNodes(true);
          this.majorData = checkNodes
            .filter((item) => item.checked)
            .map((item) => item.data);
        });
    },
  },
  methods: {
    handleOpen() {
      this.getCateProjectOption();
      this.getStaffList();
      this.getCustomfieldOptions();
      this.formData.surname = this.userInfo.name || this.userInfo.surname;
      this.formData.mobile = this.userInfo.mobile;
      this.formData.id_card_number = this.userInfo.id_card_number || "";
      this.formData.pay_day = today;
    },
    handleUploadError(response, file, fileList) {
      this.$message.error("上传失败");
    },
    handleUploadSuccess(response, file, fileList) {
      this.formData.receipt_file = fileList;
    },
    handleRemoveImg(file, fileList) {
      this.formData.receipt_file = fileList;
    },
    beforeRemoveImg(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    openPlanDialog() {
      this.planDialogData = [...this.planOptions];
      this.planDialogVisible = true;
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
    getPlanOptions(options) {
      this.planOptions = options;
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
    async getStaffList() {
      const data = {
        limit: 99999,
      };
      const res = await getStaffList(data);
      this.staffOptions = res.data.list;
    },
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
      };
      const res = await getUniversityMajorDetailList(data);
      return res.data.list;
    },
    // 报名缴费
    async createCrmOrder() {
      const union_staff_id = this.formData.union_staff_id;
      let data = {
        order_token: Date.now(),
        id: this.userInfo.id,
        order_money: this.formData.order_money,
        surname: this.formData.surname,
        mobile: this.formData.mobile,
        id_card_number: this.formData.id_card_number,
        tips: this.formData.tips,
        union_staff_id: Array.isArray(union_staff_id)
          ? [...union_staff_id].join(",")
          : union_staff_id,
        type: this.formData.type,
        receipt_file: this.formData.receipt_file.map(
          (item) => item.response.data.data.url
        ),
      };
      // 学历报名参数
      if (this.formData.type === 1) {
        data = {
          ...data,
          pre_tutor: this.formData.pre_tutor || 0,
          textbook: this.formData.textbook || 0,
          graduation_guidance: this.formData.graduation_guidance || 0,
          thesis_defense: this.formData.thesis_defense || 0,
          platform_fee: this.formData.platform_fee || 0,
          others: this.formData.others || 0,
          examination: this.formData.examination || 0,
          project: JSON.stringify(
            this.majorData.map((item) => ({
              id: item.id,
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
              total_money: item.price,
              lower_price: item.lowest_price,
              service_period: item.service_period,
              service_type: item.service_type,
              service_effective: item.service_effective,
              project: {
                id: item.project_id,
                value: item.project_name,
              },
            }))
          ),
        };
      } else {
        // 安监报名参数
        data = {
          ...data,
          project: JSON.stringify(
            this.projectData.map((item) => ({
              id: item.id,
              project_name: item.project_name,
              project_price: item.price,
              lower_price: item.lowest_price,
              must_price: item.must_price,
              service_effective: item.service_effective,
              service_period: item.service_period,
              service_type: item.service_type,
            }))
          ),
        };
      }
      let pay_plan = [
        {
          pay_day: this.formData.pay_day,
          pay_money: this.formData.pay_money,
          pay_type: this.formData.pay_type,
        },
      ];
      if (this.planOptions.length) {
        pay_plan = this.planOptions.map((item, index) => {
          if (index === this.formData.planIndex) {
            return {
              ...item,
              pay_day: this.formData.pay_day,
              pay_money: this.formData.pay_money,
              pay_type: this.formData.pay_type,
            };
          }
          return item;
        });
      }
      data.pay_plan = JSON.stringify(pay_plan);
      const res = await createCrmOrder(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.$emit("input", false);
        this.addCertificatesDialog = true;
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.createCrmOrder();
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      for (const k in this.formData) {
        this.formData[k] = "";
      }
      this.formData.receipt_file = [];
      this.formData.type = 0;
      this.projectData = [];
      this.majorData = [];
      this.planOptions = [];
      this.type_id = "";
      this.school_id = "";
      this.level_id = "";
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
  width: 240px;
}
.table {
  margin-bottom: 20px;
}
/deep/.el-form-item {
  margin-right: 30px;
}
.block {
  width: 100%;
  /deep/.el-form-item__content {
    width: 80%;
  }
}
/deep/.el-upload-list--picture-card .el-upload-list__item {
  width: 60px;
  height: 60px;
}
/deep/.el-upload--picture-card {
  width: 60px;
  height: 60px;
  line-height: 60px;
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