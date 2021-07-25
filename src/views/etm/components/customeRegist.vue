<template>
  <section>
    <el-dialog
      title="客户报名"
      :visible.sync="openStatus"
      @close="doClose"
      :close-on-click-modal="false"
      append-to-body
      width="1200px"
      top="5vh"
      class="create-order"
    >
      <el-form
        label-width="90px"
        class="create-order-form"
        :rules="rules"
        label-position="right"
        inline
        ref="ruleForm"
        :model="ruleForm"
        :show-message="true"
        :key="ruleForm.type"
      >
        <Title text="客户信息" />
        <div class="user-info">
          <el-form-item label="客户姓名">
            <el-input
              class="input-width"
              disabled
              v-model="userInfo.surname"
            ></el-input>
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input
              disabled
              class="input-width"
              v-model="userInfo.mobile"
            ></el-input>
          </el-form-item>
          <el-form-item label="开通网课" prop="online_course">
            <el-radio-group
              v-model="ruleForm.online_course"
              class="input-width"
            >
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="报名类型" prop="type">
            <el-select
              v-model="ruleForm.type"
              placeholder="请选择"
              class="input-width"
            >
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <!-- 学历报名 -->
        <div v-if="ruleForm.type === 1">
          <Title text="报名项目">
            <el-form-item prop="selectMajor">
              <el-cascader
                ref="cascaderMajor"
                popper-class="select-project"
                placeholder="请选择报名专业"
                style="width: 400px"
                v-model="ruleForm.selectMajor"
                :options="majorOptions"
                :props="majorProps"
                :show-all-levels="false"
                collapse-tags
              ></el-cascader>
            </el-form-item>
          </Title>
          <div class="project-table">
            <el-table
              ref="multipleTable"
              :data="majorData"
              style="width: 100%"
              class="min_table"
              :header-cell-style="{ 'text-align': 'center' }"
              :cell-style="{ 'text-align': 'center' }"
            >
              <el-table-column
                prop="type_name"
                label="学历形式"
                show-overflow-tooltip
                min-width="90"
              ></el-table-column>
              <el-table-column
                prop="school_name"
                label="院校名称"
                show-overflow-tooltip
                min-width="90"
              ></el-table-column>
              <el-table-column
                prop="level_name"
                label="层次名称"
                show-overflow-tooltip
                min-width="90"
              ></el-table-column>
              <el-table-column
                prop="major_name"
                label="专业名称"
                show-overflow-tooltip
                min-width="90"
              ></el-table-column>
              <el-table-column
                prop="school_system"
                label="学制"
                show-overflow-tooltip
                min-width="90"
              ></el-table-column>
              <el-table-column
                prop="price"
                label="总学费"
                show-overflow-tooltip
                min-width="90"
              >
                <template slot-scope="{ row }">
                  <span>￥{{ row.price }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="lowest_price"
                label="最低学费"
                show-overflow-tooltip
                min-width="90"
              >
                <template slot-scope="{ row }">
                  <span>￥{{ row.lowest_price }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="project_name"
                label="关联项目"
                show-overflow-tooltip
                min-width="90"
              ></el-table-column>
              <el-table-column label="操作" fixed="right" min-width="200">
                <template slot-scope="{ row }">
                  <div style="display: flex; justify-content: center">
                    <el-button
                      type="danger"
                      icon="el-icon-delete"
                      circle
                      plain
                      @click="delMajor(row.id)"
                    ></el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <Title text="报名小结" />
          <div class="sign-up">
            <div class="sign-up-item">
              <span class="sign-up-item-label">课程名称</span>
              <span class="sign-up-item-content">{{
                majorTeachingMaterialInfo.allCourse
              }}</span>
            </div>
            <div class="sign-up-item">
              <span class="sign-up-item-label">题库名称</span>
              <span class="sign-up-item-content">{{
                majorTeachingMaterialInfo.allQuestion
              }}</span>
            </div>
            <div class="sign-up-item">
              <span class="sign-up-item-label">教材名称</span>
              <span class="sign-up-item-content">{{
                majorTeachingMaterialInfo.allTeachingMaterial
              }}</span>
            </div>
          </div>
          <Title text="支付信息" />
          <div class="major-pay-info">
            <el-form-item label="应收总额" prop="total_money">
              <el-input
                placeholder="请输入应收总额"
                class="input-width"
                type="number"
                v-model="ruleForm.total_money"
              ></el-input>
            </el-form-item>
            <el-form-item label="缴费形式" prop="payment_type">
              <el-select
                v-model="ruleForm.payment_type"
                placeholder="请选择缴费形式"
                class="input-width"
              >
                <el-option
                  v-for="item in paymentTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="支付方式" prop="pay_type">
              <el-select
                v-model="ruleForm.pay_type"
                placeholder="请选择支付方式"
                class="input-width"
                filterable
              >
                <el-option
                  v-for="item in payWays"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="支付金额" prop="major_pay_money">
              <el-input
                placeholder="请输入支付金额"
                class="input-width"
                type="number"
                v-model="ruleForm.major_pay_money"
                @input="majorPayMoneyChange"
              ></el-input>
            </el-form-item>
            <el-form-item label="欠费金额">
              <span style="color: #fd6500"
                >￥{{ parsePrice(majorArrearsMoney) }}</span
              >
            </el-form-item>
            <el-form-item label="补缴时间">
              <el-date-picker
                v-model="ruleForm.supplement_time"
                type="date"
                format="yyyy-MM-dd "
                value-format="yyyy-MM-dd "
                class="input-width"
                placeholder="选择日期"
                :disabled="!majorArrearsMoney"
              >
              </el-date-picker>
            </el-form-item>
          </div>
        </div>
        <!-- 安监报名 -->
        <div v-else>
          <Title text="报名项目">
            <el-form-item prop="selectProject">
              <el-cascader
                popper-class="select-project"
                placeholder="请选择项目"
                style="width: 400px"
                v-model="ruleForm.selectProject"
                :options="projectOptions"
                :props="{ multiple: true }"
                :show-all-levels="false"
                filterable
                collapse-tags
              ></el-cascader>
            </el-form-item>
          </Title>
          <!--表格-->
          <div class="project-table">
            <el-table
              ref="multipleTable"
              :data="projectData"
              style="width: 100%"
              class="min_table"
              :header-cell-style="{ 'text-align': 'center' }"
              :cell-style="{ 'text-align': 'center' }"
            >
              <el-table-column
                label="项目名称"
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
              <el-table-column
                prop="lowest_price"
                label="最低价格"
                min-width="150"
                show-overflow-tooltip
              >
                <template slot-scope="{ row }">
                  <div>￥{{ row.lowest_price }}</div>
                </template>
              </el-table-column>
              <el-table-column
                prop="must_price"
                label="应收金额"
                min-width="150"
                show-overflow-tooltip
              >
                <template slot-scope="{ row }">
                  <el-input
                    v-model="row.must_price"
                    type="number"
                    size="small"
                    placeholder="请输入"
                    @input="payPriceChange($event, row)"
                    @blur="payPriceBlur($event, row)"
                  ></el-input>
                </template>
              </el-table-column>

              <el-table-column label="操作" fixed="right" min-width="200">
                <template slot-scope="{ row }">
                  <div style="display: flex; justify-content: center">
                    <el-button
                      type="danger"
                      icon="el-icon-delete"
                      circle
                      plain
                      @click="delbtn(row.id)"
                    ></el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <Title text="报名小结" />
          <div class="sign-up">
            <div class="sign-up-item">
              <span class="sign-up-item-label">课程名称</span>
              <span class="sign-up-item-content">{{
                allOrderInfo.allCourse
              }}</span>
            </div>
            <div class="sign-up-item">
              <span class="sign-up-item-label">题库名称</span>
              <span class="sign-up-item-content">{{
                allOrderInfo.allQuestion
              }}</span>
            </div>
            <div class="sign-up-item">
              <span class="sign-up-item-label">教材名称</span>
              <span class="sign-up-item-content">{{
                allOrderInfo.allTeachingMaterial
              }}</span>
            </div>
          </div>
          <Title text="支付信息" />
          <div class="pay-info">
            <el-form-item label="应收总额">
              <span style="color: #fd6500"
                >￥{{ parsePrice(allOrderInfo.totalReceivable) }}</span
              >
            </el-form-item>
            <el-form-item label="支付方式" prop="pay_type">
              <el-select
                v-model="ruleForm.pay_type"
                placeholder="请选择支付方式"
                class="input-width"
                filterable
              >
                <el-option
                  v-for="item in payWays"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="支付金额" prop="pay_money">
              <el-input
                placeholder="请输入支付金额"
                class="input-width"
                type="number"
                v-model="ruleForm.pay_money"
                @input="payMoneyChange"
              ></el-input>
            </el-form-item>
            <el-form-item label="欠费金额">
              <span style="color: #fd6500"
                >￥{{ parsePrice(arrearsMoney) }}</span
              >
            </el-form-item>
            <el-form-item label="补缴时间">
              <el-date-picker
                v-model="ruleForm.supplement_time"
                type="date"
                format="yyyy-MM-dd "
                value-format="yyyy-MM-dd "
                class="input-width"
                placeholder="选择日期"
                :disabled="!arrearsMoney"
              >
              </el-date-picker>
            </el-form-item>
          </div>
        </div>

        <Title text="学费信息" v-if="ruleForm.type === 1" />
        <div class="tuition-info" v-if="ruleForm.type === 1">
          <el-form-item label="考前辅导费">
            <el-input
              type="number"
              class="input-width"
              placeholder="请输入"
              v-model="ruleForm.pre_tutor"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="报考费">
            <el-input
              type="number"
              class="input-width"
              placeholder="请输入"
              v-model="ruleForm.examination"
            >
              <template slot="append">元/科</template>
            </el-input>
          </el-form-item>
          <el-form-item label="教材费">
            <el-input
              type="number"
              class="input-width"
              placeholder="请输入"
              v-model="ruleForm.textbook"
            >
              <template slot="append">元/年</template>
            </el-input>
          </el-form-item>

          <el-form-item
            label="第一学年学费"
            prop="tuition_1"
            v-if="ruleForm.payment_type === 2"
          >
            <el-input
              type="number"
              class="input-width"
              placeholder="请输入"
              v-model="ruleForm.tuition_1"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="第二学年学费"
            prop="tuition_2"
            v-if="ruleForm.payment_type === 2"
          >
            <el-input
              type="number"
              class="input-width"
              placeholder="请输入"
              v-model="ruleForm.tuition_2"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="第三学年学费"
            prop="tuition_3"
            v-if="ruleForm.payment_type === 2"
          >
            <el-input
              type="number"
              class="input-width"
              placeholder="请输入"
              v-model="ruleForm.tuition_3"
            ></el-input>
          </el-form-item>
          <el-form-item label="毕设指导费">
            <el-input
              type="number"
              class="input-width"
              placeholder="请输入"
              v-model="ruleForm.graduation_guidance"
            ></el-input>
          </el-form-item>
          <el-form-item label="论文答辩费">
            <el-input
              type="number"
              class="input-width"
              placeholder="请输入"
              v-model="ruleForm.thesis_defense"
            ></el-input>
          </el-form-item>
          <el-form-item label="平台费">
            <el-input
              type="number"
              class="input-width"
              placeholder="请输入"
              v-model="ruleForm.platform_fee"
            ></el-input>
          </el-form-item>
          <el-form-item label="其他费用">
            <el-input
              type="number"
              class="input-width"
              placeholder="请输入"
              v-model="ruleForm.others"
            ></el-input>
          </el-form-item>
        </div>
        <Title text="备注信息" />
        <el-form-item label="备注信息">
          <el-input
            style="width: 700px"
            type="textarea"
            placeholder="请输入订单备注信息"
            v-model="ruleForm.remark"
            maxlength="200"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="form-footer">
        <el-button @click="doClose">取消</el-button>
        <el-button type="primary" @click="orderDeatilShow('ruleForm')"
          >报名缴费</el-button
        >
      </div>
    </el-dialog>
    <AddPhoto
      title="上传用户资料"
      :visible.sync="addCertificatesDialog"
      :uid="userInfo.uid"
    />
  </section>
</template>

<script>
import {
  getCateProjectOption,
  getCateProjectDetail,
  createOrder,
} from "@/api/etm";
import { getUniversityMajorDetailList } from "@/api/sou";
import { parsePrice } from "@/utils/index";
import AddPhoto from "@/views/eda/certificates/components/AddPhoto";
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    userInfo: {
      type: Object,
      default: {},
    },
  },
  components: {
    AddPhoto,
  },
  data() {
    return {
      parsePrice,
      openStatus: this.value,
      payWays: [
        {
          value: 1,
          label: "现金",
        },
        {
          value: 2,
          label: "微信",
        },
        {
          value: 3,
          label: "支付宝",
        },
        {
          value: 4,
          label: "聚合收单",
        },
        {
          value: 5,
          label: "银行转账",
        },
        {
          value: 6,
          label: "收钱吧",
        },
        {
          value: 7,
          label: "机构签约订单",
        },
        {
          value: 8,
          label: "pos机",
        },
      ],
      ruleForm: {
        online_course: "",
        pay_type: "",
        pay_money: "",
        supplement_time: "",
        selectProject: "",
        remark: "",
        type: 0,
        selectMajor: "",
        total_money: "",
        payment_type: "",
        major_pay_money: "",
        tuition_1: "",
        tuition_2: "",
        tuition_3: "",
        pre_tutor: "",
        textbook: "",
        graduation_guidance: "",
        thesis_defense: "",
        platform_fee: "",
        others: "",
        examination: "",
      },
      rules: {
        total_money: [
          { required: true, message: "请输入应收总额", trigger: "blur" },
        ],
        selectMajor: [{ required: true, message: "请选择", trigger: "change" }],
        type: [{ required: true, message: "请选择", trigger: "change" }],
        selectProject: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        online_course: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        pay_type: [
          { required: true, message: "请选择支付方式", trigger: "change" },
        ],
        payment_type: [
          { required: true, message: "请选择缴费形式", trigger: "change" },
        ],
        pay_money: [
          { required: true, message: "请输入支付金额", trigger: "blur" },
        ],
        major_pay_money: [
          { required: true, message: "请输入支付金额", trigger: "blur" },
        ],
        tuition_3: [{ required: true, message: "请输入", trigger: "blur" }],
        tuition_2: [{ required: true, message: "请输入", trigger: "blur" }],
        tuition_1: [{ required: true, message: "请输入", trigger: "blur" }],
      },
      projectVisible: false,
      projectData: [],
      projectOptions: [],
      addCertificatesDialog: false,
      typeOptions: [
        {
          value: 0,
          label: "软考安监",
        },
        {
          value: 1,
          label: "学历教育",
        },
      ],
      // 学历报名相关
      type_id: "",
      school_id: "",
      level_id: "",
      majorProject: [],
      majorData: [],
      majorOptions: [],
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
      paymentTypeOptions: [
        {
          label: "一次性结清",
          value: 1,
        },
        {
          label: "按学年缴费",
          value: 2,
        },
      ],
    };
  },
  computed: {
    // 学历报名 欠缴金额
    majorArrearsMoney() {
      const money = this.ruleForm.total_money - this.ruleForm.major_pay_money;
      const result = money > 0 ? money : 0;
      // 欠缴金额为0要清空欠缴时间
      if (!result) {
        this.ruleForm.supplement_time = "";
      }
      return result;
    },
    // 欠缴金额
    arrearsMoney() {
      const money = this.allOrderInfo.totalReceivable - this.ruleForm.pay_money;
      const result = money > 0 ? money : 0;
      // 欠缴金额为0要清空欠缴时间
      if (!result) {
        this.ruleForm.supplement_time = "";
      }
      return result;
    },
    allOrderInfo() {
      let totalPrice = 0; // 订单总价
      let totalReceivable = 0; // 订单应收总金额
      let allCourse = []; // 所有课程
      let allQuestion = []; // 所有题库
      let allTeachingMaterial = []; // 所有教材
      this.projectData.forEach((item) => {
        totalReceivable += +item.must_price || 0;
        totalPrice += +item.price || 0;
        allCourse = allCourse.concat(item.course);
        allQuestion = allQuestion.concat(item.problem);
        allTeachingMaterial = allTeachingMaterial.concat(item.textbooks);
      });
      this.ruleForm.pay_money = totalReceivable || "";
      return {
        totalPrice: parsePrice(totalPrice),
        totalReceivable,
        allTeachingMaterial: allTeachingMaterial
          .map((item) => item.book_name)
          .join("、"),
        allQuestion: allQuestion.map((item) => item.problem_title).join("、"),
        allCourse: allCourse.map((item) => item.course_name).join("、"),
      };
    },
    // 学历报名的教材，课程，题库数据
    majorTeachingMaterialInfo() {
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
      this.openStatus = val;
      val && this.getCateProjectOption();
    },
    // 根据选中的项目获取项目详情
    "ruleForm.selectProject"(newVal) {
      this.getCateProjectDetail(newVal || []);
    },
    // 根据选中的专业获取相关数据
    "ruleForm.selectMajor"(val) {
      const el = this.$refs.cascaderMajor;
      val &&
        this.$nextTick(() => {
          let checkNodes = el.getCheckedNodes(true);
          this.majorData = checkNodes
            .filter((item) => item.checked)
            .map((item) => item.data);
          this.ruleForm.total_money = 0;
          let projectIds = this.majorData.map((item) => {
            this.ruleForm.total_money += +item.price || 0;
            return item.project_id;
          });
          this.getTeachingMaterial(projectIds || []);
        });
    },
  },
  methods: {
    // 学历报名 删除已选
    delMajor(id) {
      this.ruleForm.selectMajor = this.ruleForm.selectMajor.filter(
        (item) => [...item].pop() !== id
      );
    },
    // 获取学历报名相关的教材，题库，课程数据
    async getTeachingMaterial(arr) {
      const idStr = arr.join(",");
      if (!idStr) {
        this.majorProject = [];
        return;
      }
      const data = {
        id: idStr,
      };
      const res = await getCateProjectDetail(data);
      if (res.code === 0) {
        this.majorProject = res.data;
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
    // 学历报名支付金额判断
    majorPayMoneyChange(val) {
      if (+val > +this.ruleForm.total_money) {
        this.ruleForm.major_pay_money = this.ruleForm.total_money;
        this.$message.warning("支付金额不能大于应收金额！");
      }
    },
    // 安监报名支付金额判断
    payMoneyChange(val) {
      if (+val > +this.allOrderInfo.totalReceivable) {
        this.ruleForm.pay_money = this.allOrderInfo.totalReceivable;
        this.$message.warning("支付金额不能大于应收金额！");
      }
    },
    // 应收金额输入时
    payPriceChange(val, row) {
      let price = +row.price || 0;
      if (val > price) {
        row.must_price = price;
        this.$message.warning("应收金额不能大于项目价格！");
      }
    },
    payPriceBlur(e, row) {
      let lowest_price = +row.lowest_price || 0;
      let val = e.target.value;
      if (val < lowest_price) {
        row.must_price = lowest_price;
        this.$message.warning("应收金额不能小于最低价格！");
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
      const res = await getCateProjectDetail(data);
      if (res.code === 0) {
        const oldMustPrice = {};
        this.projectData.forEach((item) => {
          oldMustPrice[item.id] = item.must_price;
        });
        this.projectData =
          res.data.map((item) => ({
            ...item,
            must_price: oldMustPrice[item.id] || +item.price || 0,
          })) || [];
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
    // 报名缴费
    async createOrder() {
      let data;
      // 学历报名参数
      if (this.ruleForm.type === 1) {
        data = {
          order_token: Date.now(),
          uid: this.userInfo.uid,
          aid: this.userInfo.id,
          pay_type: this.ruleForm.pay_type,
          pay_money: this.ruleForm.major_pay_money,
          order_money: this.ruleForm.total_money,
          overdue_money: this.majorArrearsMoney,
          surname: this.userInfo.surname,
          mobile: this.userInfo.mobile,
          id_card_number: this.userInfo.id_card_number,
          supplement_time: this.ruleForm.supplement_time,
          online_course: this.ruleForm.online_course,
          tips: this.ruleForm.remark,
          type: this.ruleForm.type,
          payment_type: this.ruleForm.payment_type,
          pre_tutor: this.ruleForm.pre_tutor || 0,
          textbook: this.ruleForm.textbook || 0,
          graduation_guidance: this.ruleForm.graduation_guidance || 0,
          thesis_defense: this.ruleForm.thesis_defense || 0,
          platform_fee: this.ruleForm.platform_fee || 0,
          others: this.ruleForm.others || 0,
          examination: this.ruleForm.examination || 0,
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
        if (this.ruleForm.payment_type === 2) {
          data.tuition_1 = this.ruleForm.tuition_1;
          data.tuition_2 = this.ruleForm.tuition_2;
          data.tuition_3 = this.ruleForm.tuition_3;
        }
      } else {
        // 安监报名参数
        data = {
          order_token: Date.now(),
          uid: this.userInfo.uid,
          aid: this.userInfo.id,
          pay_type: this.ruleForm.pay_type,
          pay_money: this.ruleForm.pay_money,
          order_money: this.allOrderInfo.totalReceivable,
          overdue_money: this.arrearsMoney,
          surname: this.userInfo.surname,
          mobile: this.userInfo.mobile,
          id_card_number: this.userInfo.id_card_number,
          supplement_time: this.ruleForm.supplement_time,
          online_course: this.ruleForm.online_course,
          tips: this.ruleForm.remark,
          type: this.ruleForm.type,
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
      const res = await createOrder(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.$emit("input", false);
        this.addCertificatesDialog = true;
      }
    },
    doClose() {
      this.$refs.ruleForm.resetFields();
      for (var item in this.ruleForm) {
        this.ruleForm[item] = "";
      }
      this.ruleForm.type = 0;
      this.type_id = "";
      this.school_id = "";
      this.level_id = "";
      this.projectData = [];
      this.majorData = [];
      this.majorProject = [];
      this.$emit("input", false);
    },
    // 安监报名删除已选项目
    delbtn(id) {
      console.log(id);
      this.ruleForm.selectProject = this.ruleForm.selectProject.filter(
        (item) => [...item].pop() !== id
      );
    },
    orderDeatilShow(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.createOrder();
        } else {
          this.$message.error("资料未完善！");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.create-order {
  /deep/.el-dialog__body {
    padding: 0;
  }
  .create-order-form {
    padding: 20px 30px 0 30px;
    height: 600px;
    overflow-y: auto;
    overflow-x: hidden;
    .user-info {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
    }
    .project-table {
      margin-bottom: 16px;
    }
    .major-pay-info {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
    }
    .pay-info {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      & > div {
        width: calc(100% / 3.1);
        &:nth-of-type(3n - 2) {
          width: 200px;
        }
        &:last-child {
          margin-right: auto;
          margin-left: 86px;
        }
      }
    }
    .sign-up {
      margin-bottom: 8px;
      &-item {
        margin-bottom: 16px;
        display: flex;
        &-label {
          flex-shrink: 0;
          margin-right: 8px;
        }
        &-content {
          color: #199fff;
        }
      }
    }
    .tuition-info {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      /deep/.el-form-item__label {
        width: 110px !important;
      }
      & > div {
        /deep/.el-input-group__append {
          padding: 0 6px;
        }
      }
    }
  }
  .form-footer {
    width: 100%;
    padding: 20px;
    text-align: right;
  }
}

/deep/.el-table__header th,
.el-table__header tr {
  background-color: #f8f8f8;
  color: #909399;
}

.input-width {
  width: 240px;
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