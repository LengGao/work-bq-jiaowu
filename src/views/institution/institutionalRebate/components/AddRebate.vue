<template>
  <el-dialog
    title="添加机构返点"
    :visible.sync="visible"
    width="90%"
    @open="handleOpen"
    :close-on-click-modal="false"
    @closed="resetForm('formData')"
    top="2vh"
    class="add-collection"
  >
    <el-form
      label-width="110px"
      :model="formData"
      :rules="rules"
      inline
      ref="formData"
    >
      <Title text="关联订单"></Title>
      <div style="display:flex;">
      <div>
      <el-form-item label="请选择机构" prop="from_organization_id" style="margin-top:10px;">
        <el-select
          v-model="formData.from_organization_id"
          filterable
          clearable
          placeholder="机构名称"
          @change="onOrgChange"
     
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
      </div>
       <SearchList
            :options="searchOptions"
            :data="searchData"
            @on-search="handleSearch"
            ref="searchList"
          />
      </div>
      <div class="tables">
        <div class="order-table">
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
            height="470"
            @row-click="toggleSelection"
          >
            <el-table-column type="selection" width="45" reserve-selection>
            </el-table-column>
            <el-table-column
              label="学生姓名"
              show-overflow-tooltip
              min-width="80"
              prop="surname"
            >
            </el-table-column>
            <el-table-column
              prop="from_institution_name"
              label="推荐机构"
              min-width="80"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="学历形式"
              show-overflow-tooltip
              min-width="120"
              prop="project_name"
            >
            </el-table-column>
            <el-table-column
              label="院校名称"
              show-overflow-tooltip
              min-width="120"
              prop="university_name"
            >
            </el-table-column>
             <el-table-column
              label="层次名称"
              show-overflow-tooltip
              min-width="80"
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
              label="创建时间"
              show-overflow-tooltip
              min-width="140"
              prop="create_time"
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
        <div class="checked-table">
            <el-table
            :data="checkedOrderData"
            :header-cell-style="{
              'text-align': 'center',
              'background-color': '#f8f8f8',
            }"
            :cell-style="{ 'text-align': 'center' }"
            height="470"
          >
            <el-table-column
              show-overflow-tooltip
              min-width="100"
              prop="surname"
            >
              <template slot="header">
                <span>已选学生：{{ checkedOrderData.length }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="订单金额"
              show-overflow-tooltip
              min-width="150"
              prop="project_name"
            >
              <template slot-scope="{ row }">
                <span>{{ row.order_money | moneyFormat }} </span>
              </template>
            </el-table-column>
            <el-table-column
              label="应返点金额"
              show-overflow-tooltip
              min-width="100"
              prop="rebate_price"
            >
             <template slot-scope="{ row }">
                <span>{{ row.rebate_price | moneyFormat }} </span>
              </template>
            </el-table-column>
            <el-table-column
              label="本次返点金额"
              show-overflow-tooltip
              min-width="180"
              prop="project_name"
            >
              <template slot="header">
                <div class="header-money">
                  <el-input
                    v-model="totalMoney"
                    size="mini"
                    type="number"
                    placeholder="申请返点金额"
                    style="padding: 0"
                  />
                  <div class="header-money-actions">
                    <span
                      class="btn-distribution"
                      @click="handleComputedMoney(1)"
                      >分配</span
                    >
                    <span class="btn-fill" @click="handleComputedMoney(0)"
                      >填充</span
                    >
                  </div>
                </div>
              </template>
              <template slot-scope="{ row }">
                <el-input
                  v-model="row.currentMoney"
                  size="mini"
                  type="number"
                  placeholder="返点金额"
                />
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              min-width="100"

            >
              <template slot="header">
                <el-button type="text" @click="hadleResetOrder"
                  >批量删除</el-button
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
      </div>

     <Title text="返点信息"></Title>
     <div class="distance"></div>
      <el-form-item label="机构名称" prop="institution_name">
        <el-input
          class="input"
          :value="institutionName"
          placeholder="机构名称"
          disabled
        />
      </el-form-item>
      <el-form-item label="应返点金额" prop="order_money">
        <el-input
          class="input"
          :value="totalPrice"
          type="number"
          placeholder="应返点金额"
          disabled
        />
      </el-form-item>
      <el-form-item label="申请返点金额" prop="apply_rebate_price">
        <el-input
          class="input"
          v-model="formData.apply_rebate_price"
          type="number"
          placeholder="申请返点金额"
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

      <el-form-item label="备注信息" prop="remark" class="block">
        <el-input
          class="remark"
          type="textarea"
          v-model="formData.remark"
          placeholder="请输入内容"
        />
      </el-form-item>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hanldeCancel">取 消</el-button>
      <el-button
        type="primary"
        :loading="addLoading"
        @click="submitForm('formData')"
        >确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  getCustomfieldOptions,
} from "@/api/crm";
import { getShortcuts } from "@/utils/date";
import { getEduList,applyRebate } from "@/api/rebate";
import { getInstitutionSelectData } from "@/api/sou";
export default {
  name: "AddCustomeDialog",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    id: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      visible: this.value,
      addLoading: false,
       totalMoney: "",
       payMethodOptions:[],
       xinxiOptions:{},
       institutionOptions: [],
      formData: {
        from_organization_id: "",
        pay_type: "",
        remark: "",
        apply_rebate_price:"",
      },
      rules: {
        from_organization_id:[{ required: true, message: "请输入", trigger: "blur" }],
        apply_rebate_price: [{ required: true, message: "请输入", trigger: "blur" }],
        pay_date: [{ required: true, message: "请选择", trigger: "change" }],
        pay_type: [{ required: true, message: "请选择", trigger: "change" }],
      },
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
       searchData: {
        keyword: "",
        from_organization_id: "",
        admin_id: "",
        date: "",
      },
      searchOptions: [
        {
          key: "date",
          type: "datePicker",
          attrs: {
            type: "daterange",
            "range-separator": "至",
            "start-placeholder": "开始日期",
            "end-placeholder": "结束日期",
            "value-format": "yyyy-MM-dd",
            pickerOptions: {
              shortcuts: getShortcuts([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
            },
          },
        },
        {
          key: "keyword",
          attrs: {
            placeholder: "学生姓名",
          },
        },
      ],
      checkedOrderData: [],
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },
  computed: {
    totalPrice(){
     return this.checkedOrderData.reduce((pre,item)=>pre+(+item.rebate_price || 0),0)
    },
    institutionName(){
     let result = this.institutionOptions.filter(item=>item.institution_id === this.formData.from_organization_id)
    if(result.length){
      return result[0].institution_name
    }
    return ''
    },
    totalInputMoney() {
      return this.listData.reduce((p, c) => p + c.currentMoney * 1, 0);
    },
  },

  methods: {
    handleOpen() {
       this.getInstitutionSelectData();
       this.getCustomfieldOptions();
       if (this.id) {
        this.getEduList();
      }
    },
     onOrgChange() {
       this.hadleResetOrder();
       this.getEduList();
       this.handlePageChange(1);
    },
  onInput(val) {
      this.totalMoney = val;
    },

    async getInstitutionSelectData() {
      const data = { list: true };
      const res = await getInstitutionSelectData(data);
      if (res.code === 0) {
        this.institutionOptions = res.data;
      }
    },

    // 获取列表
    async getEduList() {
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
        ...this.searchData,
        from_organization_id: this.formData.from_organization_id,
      };
      this.listLoading = true;
      const res = await getEduList(data);
      this.listLoading = false;
      if (res.code === 0) {
        this.listData = res.data.list.map(item=>({
          ...item,
          currentMoney:'',
        }));
        this.listTotal = res.data.total;
      }
    },

    handleComputedMoney(isDistribution) {
      const data = this.checkedOrderData;
      const leng = data.length;
      const totalMoney = this.totalMoney;
      if (leng && totalMoney) {
        let value = totalMoney;
        if (isDistribution) {
          value = (totalMoney / leng + "").split(".")[0];
          console.log(totalMoney / leng)
        }
        data.forEach((item) => {
          item.currentMoney = value;
        });
      }
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
      this.searchData = {
        ...data,
        date: data.date.length ? data.date.join(" - ") : "",
      };
      this.getEduList();
    },
    handleSizeChange(size) {
      this.pageNum = 1;
      this.pageSize = size;
      this.getEduList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getEduList();
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

    async submit() {
      const data = {
        ...this.formData,
      };
      data.order_data = this.checkedOrderData.map((item) => {
          return {
            order_id: item.order_id,
            rebate_price:item.rebate_price,
          };
      });
      this.addLoading = true;
      const res = await applyRebate(data).catch(() => {
      this.addLoading = false;
      });
      this.addLoading = false;
      if (res.code === 0) {
        this.$message.success(res.message);
        this.visible = false;
        this.$emit("on-success");
      }
    },
      submitForm(formName) {
      console.log(this.formData);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submit();
        }
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
      for (const k in this.formData) {
        this.formData[k] = "";
      }
      this.$emit("input", false);
    },
    hanldeCancel() {
      this.visible = false;
      this.getEduList();
    },
  },
};
</script>

<style lang="scss" scoped>
.input {
  width: 217px;
}
.block {
  width: 100%;
  /deep/.el-form-item__content {
    width: 80%;
  }
}
.tables {
  display: flex;
  justify-content: space-between;
  /deep/.el-table {
    // border: 1px solid #efefef;
    border-bottom: none;
  }
  .again-table {
    flex: 1;
  }
  .order-table {
    width: 55%;
    border: 1px solid #efefef;
    margin-bottom: 20px;
    .table_bottom {
      padding-bottom: 0;
    }
  }
  .checked-table {
    border: 1px solid #efefef;
    width: 44%;
    margin-bottom: 20px;
    .money-total {
      text-align: right;
      padding: 16px 0;
      & > span {
        margin-left: 40px;
        .price {
          color: #fd6552;
        }
      }
    }
    .header-money {
      display: flex;
      align-items: center;
      padding: 0;
      &-actions {
        width: 40px;
        flex-shrink: 0;
        font-size: 12px;
        font-weight: normal;
        display: flex;
        flex-direction: column;
        line-height: 1.5;
        padding: 0;
        .btn-fill {
          color: #fcc850;
          cursor: pointer;
        }
        .btn-distribution {
          color: #43d100;
          cursor: pointer;
        }
      }
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
.add-collection {
  .el-dialog__body {
    padding: 10px 16px 0;
  }
}
.el-dialog__footer{
  padding-top: 0;
}
.el-pagination{
  padding: 0 5px 10px 0;
}
.el-textarea{
  width: 91%;
}
.el-title[data-v-6f792258]{
  margin-bottom: 2px ;
}
.distance{
  height: 10px;
}
</style>