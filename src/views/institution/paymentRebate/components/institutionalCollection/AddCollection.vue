<template>
  <div class="add-collection">
    <el-form
      label-width="100px"
      :model="formData"
      :rules="rules"
      inline
      ref="formData"
    >
      <div class="order-table" v-if="!id">
        <Title text="关联订单"></Title>
        <!-- 首次回款 -->
        <SearchList
          :options="searchOptions"
          :data="searchData"
          @on-search="handleSearch"
          ref="searchList"
        />
        <div class="order-table-wrap">
          <el-table
            key="1"
            :data="listData"
            v-loading="listLoading"
            element-loading-text="loading"
            element-loading-spinner="el-icon-loading"
            element-loading-background="#fff"
            :header-cell-style="{
              'text-align': 'center',
              'background-color': '#f8f8f8',
            }"
            :cell-style="{ 'text-align': 'center' }"
            @selection-change="handleOrderTableChange"
            row-key="order_id"
            ref="multipleTable"
            max-height="500"
          >
            <el-table-column
              type="selection"
              width="45"
              fixed="left"
              reserve-selection
            >
            </el-table-column>
            <el-table-column
              label="创建时间"
              show-overflow-tooltip
              min-width="150"
              prop="create_time"
            >
            </el-table-column>
            <el-table-column
              prop="user_name"
              label="客户姓名"
              min-width="80"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="项目名称"
              show-overflow-tooltip
              min-width="200"
              prop="project_name"
            >
            </el-table-column>
            <el-table-column
              prop="jiebie_name"
              label="届别名称"
              min-width="100"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              min-width="100"
              prop="order_money"
              fixed="right"
            >
              <template slot="header">
                <div
                  title="双击复制（同时编辑多个时有效）"
                  class="header-copy"
                  @dblclick="handleHeaderDblclick('resetOrderMoney')"
                >
                  <span>学费金额</span>
                  <i class="el-icon-document-copy"></i>
                </div>
              </template>
              <template slot-scope="{ row }">
                <el-input
                  size="small"
                  v-if="row.edit"
                  v-model="row.resetOrderMoney"
                  type="number"
                  placeholder="请输入订单金额"
                />
                <span v-else>{{ row.order_money | moneyFormat }} </span>
              </template>
            </el-table-column>
            <el-table-column
              label="其他金额"
              show-overflow-tooltip
              min-width="120"
              prop="other_money"
              fixed="right"
            >
              <template slot-scope="{ row }">
                <span>{{ row.other_money | moneyFormat }} </span>
              </template>
            </el-table-column>
            <el-table-column
              label="已回款学费"
              show-overflow-tooltip
              min-width="140"
              fixed="right"
              prop="pay_money"
            >
              <template slot-scope="{ row }">
                <span>{{ row.pay_money | moneyFormat }} </span>
                <el-button type="text" @click.stop="clearPayLog(row.order_id)"
                  >清除</el-button
                >
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              show-overflow-tooltip
              min-width="110"
              prop="outstanding_amount"
            >
              <template slot="header">
                <div
                  class="header-copy"
                  title="双击复制（同时编辑多个时有效）"
                  @dblclick="handleHeaderDblclick('resetOrderOverdueMoney')"
                >
                  <span>未回款学费</span>
                  <i class="el-icon-document-copy"></i>
                </div>
              </template>
              <template slot-scope="{ row }">
                <el-input
                  v-if="row.edit"
                  size="small"
                  v-model="row.resetOrderOverdueMoney"
                  type="number"
                  placeholder="请输入"
                />
                <span v-else>{{ row.outstanding_amount | moneyFormat }} </span>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              min-width="100"
              fixed="right"
              prop="reduction"
            >
              <template slot="header">
                <div
                  class="header-copy"
                  title="双击复制（同时编辑多个时有效）"
                  @dblclick="handleHeaderDblclick('resetOrderReductionMoney')"
                >
                  <span>优惠金额</span>
                  <i class="el-icon-document-copy"></i>
                </div>
              </template>
              <template slot-scope="{ row }">
                <el-input
                  v-if="row.edit"
                  size="small"
                  v-model="row.resetOrderReductionMoney"
                  type="number"
                  placeholder="请输入"
                />
                <span v-else>{{ row.reduction | moneyFormat }} </span>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" min-width="90">
              <template slot="header">
                <div
                  class="header-copy"
                  title="双击全部保存（同时编辑多个时有效）"
                  @dblclick="handleAllSave"
                >
                  <span>操作</span>
                  <i class="el-icon-finished"></i>
                </div>
              </template>
              <template slot-scope="{ row, $index: index }">
                <template v-if="row.edit">
                  <el-button
                    type="text"
                    @click.stop="handleCancelResetMoney(row)"
                    >取消</el-button
                  >
                  <el-button
                    type="text"
                    :loading="row.loading"
                    @click.stop="changeOrderMoney(row, index)"
                    >保存</el-button
                  >
                </template>
                <el-button v-else type="text" @click.stop="row.edit = true"
                  >编辑</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <div class="table_bottom">
            <p>
              *未搜索到以下学生信息：<span style="color: red">{{
                not_in_list
              }}</span>
            </p>
            <page
              :data="listTotal"
              :curpage="pageNum"
              @pageChange="handlePageChange"
              @pageSizeChange="handleSizeChange"
            />
          </div>
        </div>
      </div>
      <Title text="回款信息"></Title>
      <el-form-item label="回款类型" prop="type" class="checkbox-type">
        <el-checkbox-group v-model="formData.type" @change="handleTypeChange">
          <el-checkbox
            :label="value"
            name="type"
            v-for="(name, value) in expenseType"
            :key="value"
            >{{ name }}</el-checkbox
          >
        </el-checkbox-group>
      </el-form-item>
      <!-- 再次回款 -->
      <div class="again-table" v-if="id">
        <el-table
          :data="againListData"
          v-loading="againListLoading"
          element-loading-text="loading"
          element-loading-spinner="el-icon-loading"
          element-loading-background="#fff"
          :header-cell-style="{
            'text-align': 'center',
            'background-color': '#f8f8f8',
          }"
          key="2"
          :cell-style="{ 'text-align': 'center' }"
          max-height="500"
        >
          <el-table-column
            show-overflow-tooltip
            min-width="100"
            prop="user_name"
            label="客户姓名"
          >
          </el-table-column>
          <el-table-column
            label="项目名称"
            show-overflow-tooltip
            min-width="150"
            prop="project_name"
          >
          </el-table-column>
          <el-table-column
            label="订单金额"
            show-overflow-tooltip
            min-width="120"
            prop="project_name"
          >
            <template slot-scope="{ row }">
              <span>{{ row.order_money | moneyFormat }} </span>
            </template>
          </el-table-column>
          <el-table-column
            label="已回款金额"
            show-overflow-tooltip
            min-width="120"
            prop="project_name"
          >
            <template slot-scope="{ row }">
              <span>{{ row.pay_money | moneyFormat }} </span>
            </template>
          </el-table-column>
          <el-table-column
            v-for="(item, key) in showColumns"
            :key="key"
            show-overflow-tooltip
            min-width="120"
          >
            <template slot="header">
              <div
                class="header-copy"
                title="双击复制（同时编辑多个时有效）"
                @dblclick="handleHeaderDblclick('moneys', key)"
              >
                <span>{{ item }}</span>
                <i class="el-icon-document-copy"></i>
              </div>
            </template>
            <template slot-scope="{ row }">
              <el-input
                v-model="row.moneys[key]"
                size="mini"
                type="number"
                :placeholder="`请输入${item}`"
              />
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 首次回款 -->
      <div v-else class="checked-table">
        <el-table
          :data="checkedOrderData"
          :header-cell-style="{
            'text-align': 'center',
            'background-color': '#f8f8f8',
          }"
          :cell-style="{ 'text-align': 'center' }"
          max-height="500"
        >
          <el-table-column
            show-overflow-tooltip
            min-width="80"
            prop="user_name"
          >
            <template slot="header">
              <span>已选学生：{{ checkedOrderData.length }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="项目名称"
            show-overflow-tooltip
            min-width="150"
            prop="project_name"
          >
          </el-table-column>
          <el-table-column
            label="学费金额"
            show-overflow-tooltip
            min-width="100"
            prop="order_money"
          >
            <template slot-scope="{ row }">
              <span>{{ row.order_money | moneyFormat }} </span>
            </template>
          </el-table-column>
          <el-table-column
            label="已回款学费"
            show-overflow-tooltip
            min-width="100"
            prop="pay_money"
          >
            <template slot-scope="{ row }">
              <span>{{ row.pay_money | moneyFormat }} </span>
            </template>
          </el-table-column>
          <el-table-column
            label="未回款学费"
            show-overflow-tooltip
            min-width="100"
            prop="outstanding_amount"
          >
            <template slot-scope="{ row }">
              <span>{{ row.outstanding_amount | moneyFormat }} </span>
            </template>
          </el-table-column>
          <el-table-column
            v-for="(item, key) in showColumns"
            :key="key"
            show-overflow-tooltip
            min-width="120"
          >
            <template slot="header">
              <div
                class="header-copy"
                title="双击复制（同时编辑多个时有效）"
                @dblclick="handleHeaderDblclick('moneys', key)"
              >
                <span>{{ item }}</span>
                <i class="el-icon-document-copy"></i>
              </div>
            </template>
            <template slot-scope="{ row }">
              <el-input
                v-model="row.moneys[key]"
                size="mini"
                type="number"
                :placeholder="`请输入${item}`"
              />
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip min-width="80">
            <template slot="header">
              <el-button type="text" @click="hadleResetOrder"
                >清空学生</el-button
              >
            </template>
            <template slot-scope="{ $index }">
              <el-button @click="handleRemoveOrder($index)" type="text"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-form-item label="机构名称" prop="from_organization_id">
        <el-select
          v-model="formData.from_organization_id"
          filterable
          clearable
          placeholder="请选择机构"
          disabled
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
      <el-form-item prop="pay_date" label="回款日期">
        <el-date-picker
          class="input"
          type="date"
          placeholder="选择日期"
          v-model="formData.pay_date"
          value-format="yyyy-MM-dd"
          :picker-options="{
            disabledDate: disabledDate,
          }"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="回款总金额">
        <el-input class="input" :value="totalMoney" disabled />
      </el-form-item>
      <el-form-item label="所属年份" prop="year">
        <el-select v-model="formData.year" placeholder="请选择" filterable>
          <el-option
            v-for="item in yearOptions"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
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
        <ImgListUpload v-model="formData.receipt_file" />
      </el-form-item>
      <el-form-item label="备注信息" prop="note" class="block">
        <el-input
          class="remark"
          type="textarea"
          v-model="formData.note"
          placeholder="请输入内容"
        />
      </el-form-item>
    </el-form>
    <div class="footer">
      <el-button @click="hanldeCancel">取 消</el-button>
      <el-button
        type="primary"
        :loading="addLoading"
        @click="submitForm('formData')"
        >确 定</el-button
      >
    </div>
  </div>
</template>

<script>
import {
  addReceivable,
  getOrgName,
  getCustomfieldOptions,
  getOrder,
  getCategory,
  getProject,
  getReceivableInfo,
  clearPayLog,
  changeOrderMoney,
} from "@/api/crm";
import {
  getUniversityTypeOptions,
  getUniversityOptions,
  getGradeOptions,
} from "@/api/sou";
import { getShortcuts, getPlanYearOptions } from "@/utils/date";
import { accAdd } from "@/utils";
import ImgListUpload from "@/components/imgListUpload";
import { mapGetters } from "vuex";
export default {
  name: "addInstitutionalCollection",
  components: {
    ImgListUpload,
  },
  data() {
    return {
      id: this.$route.query.id,
      addLoading: false,
      formData: {
        from_organization_id: "",
        pay_type: "",
        pay_date: "",
        note: "",
        year: "",
        type: [],
        receipt_file: [],
      },
      rules: {
        year: [{ required: true, message: "请选择", trigger: "change" }],
        type: [{ required: true, message: "请选择", trigger: "change" }],
        pay_date: [{ required: true, message: "请选择", trigger: "change" }],
        pay_type: [{ required: true, message: "请选择", trigger: "change" }],
      },
      payMethodOptions: [],
      institutionOptions: [],
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        date: "",
        user_name: "",
        arr_project: [],
        from_organization_id: "",
      },
      searchOptions: [
        {
          key: "from_organization_id",
          type: "select",
          options: [],
          optionValue: "from_organization_id",
          optionLabel: "institution_name",
          width: 220,
          attrs: {
            placeholder: "请选择机构",
            filterable: true,
          },
          events: {
            change: this.onOrgChange,
          },
        },

        {
          key: "arr_category",
          type: "select",
          width: 150,
          options: [],
          optionValue: "category_id",
          optionLabel: "category_name",
          attrs: {
            placeholder: "所属分类（多选）",
            clearable: true,
            filterable: true,
            multiple: true,
            "collapse-tags": true,
          },
        },
        {
          key: "arr_project",
          type: "select",
          options: [],
          optionValue: "project_id",
          optionLabel: "project_name",
          attrs: {
            placeholder: "所属项目（多选）",
            clearable: true,
            filterable: true,
            multiple: true,
            "collapse-tags": true,
          },
        },
        {
          key: "type_id",
          type: "select",
          options: [],
          optionValue: "id",
          optionLabel: "title",
          attrs: {
            placeholder: "学历形式",
            clearable: true,
            filterable: true,
          },
        },
        {
          key: "school_id",
          type: "select",
          options: [],
          optionValue: "id",
          optionLabel: "title",
          attrs: {
            placeholder: "院校名称",
            clearable: true,
            filterable: true,
          },
        },
        {
          key: "jiebie_id",
          type: "select",
          options: [],
          optionValue: "id",
          optionLabel: "category_name,title",
          attrs: {
            placeholder: "届别名称",
            clearable: true,
            filterable: true,
          },
        },
        {
          key: "date",
          type: "datePicker",
          attrs: {
            value: "",
            type: "daterange",
            "range-separator": "至",
            "start-placeholder": "开始日期",
            "end-placeholder": "结束日期",
            format: "yyyy-MM-dd",
            "value-format": "yyyy-MM-dd",
            pickerOptions: {
              shortcuts: getShortcuts([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
            },
          },
        },
        {
          key: "user_name",
          width: 800,
          attrs: {
            placeholder: "输入多个姓名时，可用空格隔开",
            type: "textarea",
            autosize: { minRows: 1, maxRows: 4 },
          },
        },
      ],
      checkedOrderData: [],
      yearOptions: getPlanYearOptions(),
      //再次回款
      againListData: [],
      againListLoading: false,
      againData: {},
      not_in_list: "",
    };
  },
  computed: {
    ...mapGetters(["expenseType"]),
    showColumns() {
      const result = {};
      this.formData.type.forEach((item) => {
        result[item] = this.expenseType[item];
      });
      return result;
    },
    totalMoney() {
      let result = 0;
      const data = this.id ? this.againListData : this.checkedOrderData;
      data.forEach((item) => {
        const values = Object.values(item.moneys);
        if (values && values.length) {
          const rowTotalMoney = values.reduce((p, c) => accAdd(p, c), 0);
          result = accAdd(result, rowTotalMoney);
        }
      });
      return result;
    },
  },
  created() {
    this.getCustomfieldOptions();
    this.getOrgName();
    this.getGradeOptions();
    this.getUniversityTypeOptions();
    this.getUniversityOptions();
    if (this.id) {
      this.getReceivableInfo();
    }
  },
  methods: {
    // 清空未选中的回款类型金额
    handleTypeChange(e) {
      const data = this.id ? this.againListData : this.listData;
      data.forEach((item) => {
        for (const k in item.moneys) {
          if (!e.includes(k)) {
            item.moneys[k] = "";
          }
        }
      });
    },
    // 双击保存全部
    handleAllSave() {
      this.listData.forEach((item, index) => {
        if (item.edit) {
          this.changeOrderMoney(item, index);
        }
      });
    },
    // 双击表头复制指定金额
    handleHeaderDblclick(field, field2) {
      let value = "";
      const data = this.id ? this.againListData : this.listData;
      data.forEach((item) => {
        if (field2) {
          if (value !== "") {
            item[field][field2] = value;
          } else {
            value = item[field][field2];
          }
        } else {
          if (item.edit) {
            if (value !== "") {
              item[field] = value;
            } else {
              value = item[field];
            }
          }
        }
      });
    },

    handleCancelResetMoney(row) {
      row.resetOrderMoney = row.order_money;
      row.resetOrderOverdueMoney = row.outstanding_amount;
      row.resetOrderReductionMoney = row.reduction;
      row.edit = false;
    },
    async changeOrderMoney(row, index) {
      const data = {
        order_id: row.order_id,
        money: row.resetOrderMoney,
        overdue_money: row.resetOrderOverdueMoney,
        reduction: row.resetOrderReductionMoney,
      };
      row.loading = true;
      const res = await changeOrderMoney(data).catch(() => {});
      row.loading = false;
      if (res.code === 0) {
        this.listData[index].order_money = res.data.order_money;
        this.listData[index].outstanding_amount = res.data.overdue_money;
        this.listData[index].reduction = res.data.reduction;
        this.listData[index].pay_money = res.data.pay_money;
        row.edit = false;
        this.$message.success(res.message);
      }
    },
    // 清除回款
    async clearPayLog(order_id) {
      const data = { order_id };
      const res = await clearPayLog(data);
      if (res.code === 0) {
        this.getOrder();
      }
    },

    disabledDate(e) {
      return e.getTime() > Date.now();
    },

    // 回款详情数据
    async getReceivableInfo() {
      const data = {
        log_id: this.id,
      };
      this.againListLoading = true;
      const res = await getReceivableInfo(data).catch(() => {});
      this.againListLoading = false;
      if (res.code === 0) {
        this.againData = res.data.data;
        this.formData.from_organization_id = res.data?.data?.organization_id;
        const types = Object.keys(this.expenseType);
        const moneys = {};
        types.forEach((item) => {
          moneys[item] = "";
        });
        this.againListData = res.data.list.map((item) => ({
          ...item,
          moneys: { ...moneys },
        }));
      }
    },
    // 选择机构时
    onOrgChange(from_organization_id) {
      this.formData.from_organization_id = from_organization_id;
      this.hadleResetOrder();
      this.handlePageChange(1);
      this.getProject();
      this.getCategory();
    },
    // 右侧已选删除
    handleRemoveOrder(index) {
      this.$refs.multipleTable.selection.splice(index, 1);
      this.checkedOrderData.splice(index, 1);
    },
    // 右侧已选清空
    hadleResetOrder() {
      this.$refs.multipleTable.clearSelection();
    },
    // 切换列表选择状态
    toggleSelection(row) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },
    handleOrderTableChange(selection) {
      this.checkedOrderData = [...selection];
    },
    handleSearch(data) {
      this.pageNum = 1;
      const date = data.date || ["", ""];
      delete data.date;
      this.searchData = {
        ...data,
        start_date: date[0],
        end_date: date[1],
      };
      this.getOrder();
    },
    handleSizeChange(size) {
      this.pageNum = 1;
      this.pageSize = size;
      this.getOrder();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getOrder();
    },
    async getOrder() {
      const { from_organization_id } = this.formData;
      if (!from_organization_id) {
        this.$message.error("请选择机构");
        return;
      }
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
        ...this.searchData,
        from_organization_id,
      };
      this.listLoading = true;
      const res = await getOrder(data);
      this.listLoading = false;
      const types = Object.keys(this.expenseType);
      const moneys = {};
      types.forEach((item) => {
        moneys[item] = "";
      });
      this.listData = res.data.list.map((item) => {
        return {
          ...item,
          moneys: { ...moneys },
          edit: false,
          loading: false,
          resetOrderMoney: item.order_money,
          resetOrderOverdueMoney: item.outstanding_amount,
          resetOrderReductionMoney: item.reduction,
        };
      });
      this.listTotal = res.data.total;
      this.panelData = res.data.count || {};
      this.not_in_list = res.data.not_in_list;
    },
    // 获取项目下拉
    async getProject() {
      const data = { from_organization_id: this.formData.from_organization_id };
      const res = await getProject(data);
      if (res.code === 0) {
        this.searchOptions[2].options = res.data;
      }
    },
    // 获取所属分类
    async getCategory() {
      const data = { from_organization_id: this.formData.from_organization_id };
      const res = await getCategory(data);
      if (res.code === 0) {
        this.searchOptions[1].options = res.data;
      }
    },
    // 获取届别选项
    async getGradeOptions() {
      const res = await getGradeOptions();
      if (res.code === 0) {
        this.searchOptions[5].options = res.data;
      }
    },
    // 获取学历形式选项
    async getUniversityTypeOptions() {
      const res = await getUniversityTypeOptions();
      if (res.code === 0) {
        this.searchOptions[3].options = res.data;
      }
    },
    // 获取院校选项
    async getUniversityOptions() {
      const res = await getUniversityOptions();
      if (res.code === 0) {
        this.searchOptions[4].options = res.data;
      }
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
    // 获取机构
    async getOrgName() {
      const res = await getOrgName({ state: 0 });
      this.institutionOptions = res.data;
      this.searchOptions[0].options = res.data;
    },
    async submit() {
      const data = {
        ...this.formData,
        receipt_file: this.formData.receipt_file.map(
          (item) => item.response.data.data.url
        ),
        total_money: this.totalMoney,
      };
      if (this.id) {
        data.arr_receivable = this.againListData.map(
          ({ moneys, order_id }) => ({
            order_id,
            pay_money: moneys["1"] || "",
            moneys,
          })
        );
      } else {
        data.arr_receivable = this.checkedOrderData.map((item) => {
          return {
            order_id: item.order_id,
            pay_money: item.moneys["1"] || "",
            moneys: item.moneys,
          };
        });
      }
      this.addLoading = true;
      const res = await addReceivable(data).catch(() => {});
      this.addLoading = false;
      if (res.code === 0) {
        this.$message.success(res.message);
        this.hanldeCancel();
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submit();
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.formData = {
        from_organization_id: "",
        pay_type: "",
        pay_date: "",
        note: "",
        year: "",
        type: [],
        receipt_file: [],
      };
      this.$emit("input", false);
      if (this.id) {
        this.againListData = [];
      } else {
        this.hadleResetOrder();
        this.pageNum = 1;
        this.pageSize = 20;
        this.$refs.searchList.handleReset();
        this.listData = [];
      }
    },
    hanldeCancel() {
      this.$router.replace({
        name: "paymentRebate",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.add-collection {
  padding: 16px;

  .input {
    width: 217px;
  }
  .block {
    width: 100%;
    /deep/.el-form-item__content {
      width: 80%;
    }
  }

  .header-copy {
    cursor: pointer;
    i {
      margin-left: 2px;
    }
  }
  .again-table {
    margin-bottom: 16px;
    border: 1px solid #ededed;
    border-bottom: none;
  }
  .order-table {
    margin-bottom: 16px;
    &-wrap {
      border: 1px solid #ededed;
    }
    .table_bottom {
      padding: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      p {
        color: #999;
        font-size: 14px;
      }
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
  .checked-table {
    margin-bottom: 16px;
    border: 1px solid #ededed;
    border-bottom: none;
  }
  .footer {
    padding: 30px 0;
    text-align: center;
    button {
      margin-left: 30px;
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