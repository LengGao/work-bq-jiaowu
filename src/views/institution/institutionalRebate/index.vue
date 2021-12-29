<template>
  <div class="institutional-collection">
    <div class="head_remind">*管理机构返点数据</div>
    <section>
      <!--搜索模块-->
      <header>
        <SearchList
          :options="searchOptions"
          :data="searchData"
          @on-search="handleSearch"
        />
        <div class="actions">
          <el-button type="primary" @click="openAddRebateDialog('')"
            >添加返点</el-button
          >
        </div>
      </header>
      <!--列表-->
      <div class="userTable">
        <el-table
          ref="multipleTable"
          :data="listData"
          v-loading="listLoading"
          element-loading-text="loading"
          element-loading-spinner="el-icon-loading"
          element-loading-background="#fff"
          :header-cell-style="{ 'text-align': 'center', background: '#f8f8f8' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column
            prop="log_id"
            label="ID"
            min-width="70"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="pay_date"
            label="机构名称"
            min-width="120"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="org_name"
            label="申请返点金额"
            min-width="150"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="staff_name"
            label="关联订单数"
            min-width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="order_num"
            label="创建人"
            show-overflow-tooltip
            min-width="100"
          >
          </el-table-column>
          <el-table-column
            prop="order_num"
            label="创建时间"
            show-overflow-tooltip
            min-width="160"
          >
          </el-table-column>
         
          <el-table-column
            prop="check_state"
            label="返点状态"
            min-width="100"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <span
                v-if="row.check_state == 0"
                class="approve-status approve-status--none"
                >待确认</span
              >
              <span
                v-if="row.check_state == 1"
                class="approve-status approve-status--wait"
                >已确认</span
              >
              <span
                v-if="row.check_state == 2"
                class="approve-status approve-status--success"
                >已入账
              </span>
              <span v-if="row.check_state == -1" class="approve-status"
                >已驳回
                <i class="el-icon-question" :title="row.rejected_note"></i>
              </span>
            </template>
          </el-table-column>
           <el-table-column
            prop="receivable_money"
            label="实际返点金额"
            min-width="120"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              ￥{{ row.receivable_money || 0 }}
            </template>
          </el-table-column>
          <el-table-column
            prop="check_time"
            label="操作人"
            min-width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="操作时间"
            min-width="120"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column label="操作" fixed="right" min-width="160">
            <template slot-scope="{ row }">
              <el-button type="text" @click="toDetail(row.id)"
                >返点详情</el-button
              >
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
    </section>
  <AddRebate
      v-model="addRebateVisible"
      :id="currentId"

    />
  </div>
</template>

<script>
// import PartiallyHidden from "@/components/PartiallyHidden/index";
import { getShortcuts } from "@/utils/date";
// import { download } from "@/utils";
// import {
//   getOrgReceivableList,
//   getOrgName,
//   getReceivableStatus,
//   getBelongPeople,
//   orgReceivableImportUrl,
// } from "@/api/crm";
import AddRebate from "./components/AddRebate";
export default {
  name: "institutionalRebate",
  components: {
    // PartiallyHidden,
    AddRebate,
  },
  data() {
    return {
      addRebateVisible:false,
      currentId:"",
      listData: [
        {order_num:'1111'}
      ],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        keyword: "",
        check_state: "",
      },
      searchOptions: [
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
          key: "from_organization_id",
          type: "select",
          optionValue: "from_organization_id",
          optionLabel: "institution_name",
          options: [],
          attrs: {
            placeholder: "机构名称",
            clearable: true,
            filterable: true,
          },
        },
        {
          key: "staff_id",
          type: "select",
          width: 120,
          options: [],
          optionValue: "staff_id",
          optionLabel: "staff_name",
          attrs: {
            placeholder: "创建人",
            clearable: true,
            filterable: true,
          },
        },
        {
          key: "check_state",
          type: "select",
          width: 120,
          options: [],
          optionValue: "check_state",
          optionLabel: "title",
          attrs: {
            clearable: true,
            placeholder: "返点状态",
          },
        },

      ],

    };
  },
  created() {

  },
  methods: {
  handleSearch(data) {
      this.pageNum = 1;
      const money = data.money || ["", ""];
      const date = data.date || ["", ""];
      delete data.money;
      delete data.date;
      this.searchData = {
        ...data,
        min_money: money[0],
        max_money: money[1],
        start_date: date[0],
        end_date: date[1],
      };
      // this.getOrgReceivableList(data);
    },
    handlePageChange(val) {
      this.pageNum = val;
      // this.getOrgReceivableList();
    },
    openAddRebateDialog(id) {
      this.currentId = id;
      this.addRebateVisible = true;
    },
    toDetail(id){
      this.$router.push({
        name: "institutionalRebateDetail",
        query: {
        id,
        },
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.institutional-collection {
  section {
    padding: 16px;
    header {
      display: flex;
      justify-content: space-between;
      .actions {
        display: flex;
        button {
          align-self: flex-start;
          margin-left: 10px;
        }
      }
    }
  }
}
.approve-status {
  &::before {
    display: inline-block;
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #fd6500;
    vertical-align: middle;
    margin-right: 2px;
  }
  &--success::before {
    background-color: #43d100;
  }
  &--wait::before {
    background-color: #199fff;
  }
  &--none::before {
    background-color: #999;
  }
}
</style>
