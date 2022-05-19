<template>
  <div class="institutional-collection">
    <section>
      <!--搜索模块-->
      <header>
        <SearchList
          :options="searchOptions"
          :data="searchData"
          @on-search="handleSearch"
        />
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
            label="回款日期"
            min-width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="org_name"
            label="机构名称"
            min-width="130"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="staff_name"
            label="业绩归属"
            min-width="100"
            show-overflow-tooltip
          >
          </el-table-column>

          <el-table-column
            prop="order_num"
            label="关联订单数"
            show-overflow-tooltip
            min-width="100"
          >
          </el-table-column>
          <el-table-column
            prop="receivable_money"
            label="回款总金额"
            min-width="120"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              ￥{{ row.receivable_money || 0 }}
            </template>
          </el-table-column>
          <el-table-column
            prop="check_state"
            label="入账状态"
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
            prop="check_time"
            label="入账时间"
            min-width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="创建时间"
            min-width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column label="操作" fixed="right" min-width="160">
            <template slot-scope="{ row }">
              <el-button type="text" @click="toDetail(row.log_id)"
                >回款详情</el-button
              >
              <el-button
                v-if="row.check_state == 2"
                type="text"
                @click="toAddCollection(row.log_id)"
                >再次回款</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div class="table_bottom">
          <page
            :data="listTotal"
            :curpage="pageNum"
            @pageChange="handlePageChange"
            @pageSizeChange="handleSizeChange"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { getShortcuts } from "@/utils/date";
import { getOrgName, getReceivableStatus, getBelongPeople } from "@/api/crm";
import { getReceivableList } from "@/api/institution";
export default {
  name: "institutionalCollection",
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      pageSize: 20,
      listTotal: 0,
      searchData: {
        keyword: "",
        check_state: "-2",
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
            placeholder: "业绩归属",
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
            placeholder: "入账状态",
          },
        },
        {
          key: "money",
          type: "numberRange",
          width: 280,
          attrs: {
            startPlaceholde: "回款金额起",
            endPlaceholde: "回款金额止",
          },
        },
        // {
        //   key: "keyword",
        //   attrs: {
        //     placeholder: "订单名称",
        //   },
        // },
      ],
    };
  },
  created() {
    this.getReceivableList();
    this.getOrgName();
    this.getBelongPeople();
    this.getReceivableStatus();
  },
  methods: {
    // 获取入账状态
    async getReceivableStatus() {
      const res = await getReceivableStatus();
      if (res.code === 0) {
        this.searchOptions[3].options = res.data;
      }
    },
    // 获取机构
    async getOrgName() {
      const res = await getOrgName();
      if (res.code === 0) {
        this.searchOptions[1].options = res.data;
      }
    },

    // 业绩归属
    async getBelongPeople() {
      const data = { list: true };
      const res = await getBelongPeople(data);
      if (res.code === 0) {
        this.searchOptions[2].options = res.data;
      }
    },
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
      this.getReceivableList(data);
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getReceivableList();
    },
    handleSizeChange(size) {
      this.pageNum = 1;
      this.pageSize = size;
      this.getReceivableList();
    },
    async getReceivableList() {
      const data = {
        from_organization_id: this.$route.query.institution_id,
        page: this.pageNum,
        limit: this.pageSize,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await getReceivableList(data).catch(() => {});
      this.listLoading = false;
      this.listData = res.data.list;
      this.listTotal = res.data.total;
    },
    toDetail(id) {
      this.$router.push({
        name: "institutionalCollectionDetail",
        query: {
          id,
          isFromList: 1,
        },
      });
    },
    toAddCollection(id) {
      this.$router.push({
        name: "addInstitutionalCollection",
        query: { id },
      });
    },
    toCrmOrderDetail(id) {
      this.$router.push({
        name: "crmOrderDetail",
        query: {
          id,
        },
      });
    },
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
