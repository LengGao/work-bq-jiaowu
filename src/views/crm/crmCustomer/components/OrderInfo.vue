<template>
  <div>
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
      <el-form-item label="学费价格" prop="order_money">
        <el-input
          type="number"
          class="input"
          v-model="formData.order_money"
          placeholder="请输入学费价格"
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

      <el-form-item label="备注信息" prop="tips" class="block">
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
              <div>￥{{ row.price }}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="实收金额"
            min-width="110"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <el-input
                v-model="row.pay_money"
                type="number"
                placeholder="请输入实收金额"
              />
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
              <div>￥{{ row.price }}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="实收金额"
            min-width="120"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <el-input
                v-model="row.pay_money"
                type="number"
                placeholder="请输入实收金额"
              />
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
    </el-form>
    <div class="dialog-footer">
      <el-button class="cancel" @click="hanldeCancel">取 消</el-button>
      <el-button
        type="primary"
        :loading="addLoading"
        @click="submitForm('formData')"
        >下一步</el-button
      >
    </div>
  </div>
</template>

<script>
import { categoryGetSessionList, getCustomfieldOptions } from "@/api/crm";
import { getStaffList } from "@/api/set";
import { getUniversityMajorDetailList } from "@/api/sou";
import { getCateProjectOption, getCateProjectDetail } from "@/api/etm";
export default {
  name: "OrderInfo",
  props: {
    userInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      visible: this.value,
      formData: {
        surname: "",
        mobile: "",
        id_card_number: "",
        order_money: "",
        union_staff_id: [],
        tips: "",
        type: 0,
        selectMajor: [],
        selectProject: [],
        jiebie_id: "",
        source: "",
      },
      rules: {
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
      gradeOptions: [],
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
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
        });
    },
  },
  created() {
    this.getCateProjectOption();
    this.getStaffList();
    this.getCustomfieldOptions();
    this.formData.surname = this.userInfo.name || this.userInfo.surname;
    this.formData.mobile = this.userInfo.mobile;
    this.formData.id_card_number = this.userInfo.id_card_number || "";
  },
  methods: {
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

      const data = {
        id: idStr,
      };
      const res = await getCateProjectDetail(data);
      if (res.code === 0) {
        this.projectData = res.data.map((item) => ({
          ...item,
          pay_money: "",
        }));
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
    resetCheckedParams(type) {
      this.type_id = "";
      this.school_id = "";
      this.level_id = "";
      this.formData.selectMajor = [];
      this.formData.selectProject = [];
      // 获取学历类届别选项
      type === 1 ? this.categoryGetSessionList(6) : (this.gradeOptions = []);
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
    async setParams() {
      const { union_staff_id, selectMajor, selectProject, ...restParams } =
        this.formData;
      let params = {
        ...restParams,
        id: this.userInfo.id,
        union_staff_id: (union_staff_id || []).join(","),
      };
      // 学历报名参数
      if (this.formData.type === 1) {
        params.project_pay_money = {};
        params.project = this.majorData.map((item) => {
          if (!item.pay_money) {
            this.$message.error(`请输入 ${item.project_name} 的实收金额`);
            throw new Error("pay_money is null");
          }
          params.project_pay_money[item.id] = item.pay_money;
          return item.id;
          // return {
          //   id: item.id,
          //   type: {
          //     id: item.type_id,
          //     value: item.type_name,
          //   },
          //   university: {
          //     id: item.school_id,
          //     value: item.school_name,
          //   },
          //   level: {
          //     id: item.level_id,
          //     value: item.level_name,
          //   },
          //   major: {
          //     id: item.major_id,
          //     value: item.major_name,
          //   },
          //   pay_money: item.pay_money,
          //   total_money: item.price,
          //   lower_price: item.lowest_price,
          //   service_period: item.service_period,
          //   service_type: item.service_type,
          //   service_effective: item.service_effective,
          //   project: {
          //     id: item.project_id,
          //     value: item.project_name,
          //   },
          // };
        });
      } else {
        // 职业报名参数
        params.project_pay_money = {};
        params.project = this.projectData.map((item) => {
          if (!item.pay_money) {
            this.$message.error(`请输入 ${item.project_name} 的实收金额`);
            throw new Error("pay_money is null");
          }
          params.project_pay_money[item.id] = item.pay_money;
          return item.id;
          // return {
          //   id: item.id,
          //   pay_money: item.pay_money,
          //   project_name: item.project_name,
          //   project_price: item.price,
          //   lower_price: item.lowest_price,
          //   must_price: item.must_price,
          //   service_effective: item.service_effective,
          //   service_period: item.service_period,
          //   service_type: item.service_type,
          // };
        });
      }
      this.$emit("next", { ...params });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.setParams();
        }
      });
    },
    hanldeCancel() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="less" scoped>
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
.dialog-footer {
  display: flex;
  .cancel {
    margin-left: auto;
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