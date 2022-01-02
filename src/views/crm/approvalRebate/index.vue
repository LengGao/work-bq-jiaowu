<template>
  <div class="institutional-collection">
    <div class="head_remind">*审批机构返点数据</div>
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
            prop="id"
            label="ID"
            min-width="70"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="institution_name"
            label="机构名称"
            min-width="120"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="apply_rebate_price"
            label="申请返点金额"
            min-width="150"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="order_count"
            label="关联订单数"
            min-width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="apply_staff_name"
            label="创建人"
            show-overflow-tooltip
            min-width="100"
          >
          </el-table-column>
          <el-table-column
            prop="apply_time"
            label="创建时间"
            show-overflow-tooltip
            min-width="160"
          >
          </el-table-column>
         
          <el-table-column
            prop="status"
            label="返点状态"
            min-width="100"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <span
                v-if="row.status == 0"
                class="approve-status approve-status--none"
                >待审批</span
              >
              <span
                v-if="row.status == 1"
                class="approve-status approve-status--wait"
                >已通过</span
              >
              <span v-if="row.status == 2" class="approve-status"
                >已驳回
                <i class="el-icon-question" :title="row.rejected_note"></i>
              </span>
            </template>
          </el-table-column>
           <el-table-column
            prop="real_rebate_price"
            label="实际返点金额"
            min-width="120"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              ￥{{ row.real_rebate_price || 0 }}
            </template>
          </el-table-column>
          <el-table-column
            prop="approve_staff_name"
            label="操作人"
            min-width="100"
            show-overflow-tooltip
          >
          <template slot-scope="{ row }">
              {{ row.approve_staff_name || '--' }}
            </template>
          </el-table-column>
          <el-table-column
            prop="operate_time"
            label="操作时间"
            min-width="120"
            show-overflow-tooltip
          >
          <template slot-scope="{ row }">
              {{ row.operate_time || '--' }}
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" min-width="160">
            <template slot-scope="{ row }">
              <el-button type="text" @click="toAdopt(row)" v-if="row.status == 0"
                >通过</el-button
              >
              <el-button type="text" @click="toReject(row)" v-if="row.status == 0"
                >驳回</el-button
              >
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
    <AdoptRebate
        v-model="addRebateVisible"
        :id="currentId"
        :contractInfo="contractInfo"
        @on-success="rebateList"
    />
    <RejectRebate
        v-model="rejectVisible"
        :id="currentId"
        :contractInfo="contractInfo"
        @on-success="rebateList"
    />

  </div>
</template>

<script>
import { rebateList,getStaffSelect } from "@/api/rebate";
import { getShortcuts } from "@/utils/date";
import AdoptRebate from "./components/AdoptRebate";
import RejectRebate from "./components/RejectRebate";
import { getInstitutionSelectData } from "@/api/sou";
import { cloneOptions } from "@/utils/index";
export default {
  name: "approvalRebate",
  components: {
    AdoptRebate,
    RejectRebate
  },
  data() {
    return {
      addRebateVisible:false,
      rejectVisible:false,
      currentId:"",
      contractInfo: {},
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        apply_staff_id:"",
        status:"",
        from_organization_id:"",
        date: "",
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
          type: "cascader",
          attrs: {
            placeholder: "机构名称",
            filterable: true,
            clearable: true,
            options: [],
          },
        },
        {
          key: "apply_staff_id",
          type: "select",
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
          key: "status",
          type: "select",
          width: 120,
          options: [
            {
              value: 0,
              label: "待审批",
            },
            {
              value: 1,
              label: "已通过",
            },
             {
              value: 2,
              label: "已驳回",
            },
          ],
          attrs: {
            clearable: true,
            placeholder: "返点状态",
          },
        },

      ],

    };
  },
  created() {
    this.rebateList();
    this.getInstitutionSelectData();
    this.getStaffSelect();
  },
  methods: {
     // 获取机构
    async getInstitutionSelectData() {
      const data = { list: true };
      const res = await getInstitutionSelectData(data);
      if (res.code === 0) {
        this.searchOptions[1].attrs.options = cloneOptions(
          res.data,
          "institution_name",
          "institution_id",
          "children"
        );
      }
    },
      // 获取创建人
    async getStaffSelect() {
      const data = {
        limit: 99999,
      };
      const res = await getStaffSelect(data);
      this.searchOptions[2].options = res.data;
    },
    async rebateList() {
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await rebateList(data);
      this.listLoading = false;
      this.listTotal = res.data.total;
      this.listData = res.data.list;
      console.log(this.listData);
    },
   handleSearch(data) {
      this.pageNum = 1;
      const date = data.date || ["", ""];
      delete data.date;
      this.searchData = {
        ...data,
        start_time: date[0],
        end_time: date[1],
        from_organization_id: Array.isArray(data.from_organization_id)
          ? data.from_organization_id.pop()
          : data.from_organization_id,
      };
      this.rebateList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.rebateList();
    },
    toDetail(id){
      this.$router.push({
        name: "institutionalRebateDetail",
        query: {
        id,
        },
      })
    },
    toAdopt(row){
      this.contractInfo = row;
      this.addRebateVisible = true
    },
    toReject(row){
       this.contractInfo = row;
      this.rejectVisible = true
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
