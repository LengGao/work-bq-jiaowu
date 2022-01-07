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
      <ul class="panel-list">
        <li class="panel-item">
          <span>机构人数</span>
          <div class="time_num">
            <span>￥{{ panelData.order_money || 0 }}</span>
          </div>
        </li>
        <li class="panel-item">
          <span>订单数</span>
          <div class="time_num">
            <span>￥{{ panelData.pay_money || 0 }}</span>
          </div>
        </li>
        <li class="panel-item">
          <span>订单总金额</span>
          <div class="time_num">
            <span>￥{{ panelData.overdue_money || 0 }}</span>
          </div>
        </li>
        <li class="panel-item">
          <span>已回款金额</span>
          <div class="time_num">
            <span>￥{{ panelData.overdue_money || 0 }}</span>
          </div>
        </li>
        <li class="panel-item">
          <span>未回款金额</span>
          <div class="time_num">
            <span>￥{{ panelData.overdue_money || 0 }}</span>
          </div>
        </li>
        <li class="panel-item">
          <span>豁免金额</span>
          <div class="time_num">
            <span>￥{{ panelData.overdue_money || 0 }}</span>
          </div>
        </li>
      </ul>
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
          all="1"
        >
          <!-- <el-table-column type="selection" width="45"> </el-table-column> -->
          <el-table-column
            prop="order_id"
            label="订单编号"
            show-overflow-tooltip
            min-width="160"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="toCrmOrderDetail(scope.row.order_id)"
              >
                {{ scope.row.order_no }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="创建时间"
            min-width="140"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="surname"
            label="客户姓名"
            min-width="90"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <el-button type="text" @click="coursDetail(scope.row.uid)">
                {{ scope.row.surname }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="from"
            label="客户来源"
            min-width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="project_name"
            label="项目名称"
            min-width="220"
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
            prop="order_money"
            label="订单总金额"
            min-width="90"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }"> ￥{{ row.order_money }} </template>
          </el-table-column>

          <el-table-column
            prop="pay_money"
            label="已回款金额"
            min-width="90"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <span>￥{{ row.pay_money }}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="pay_progress"
            label="回款进度"
            min-width="140"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <el-progress
                :percentage="+(row.pay_progress || '').split('%')[0] || 0"
              ></el-progress>
            </template>
          </el-table-column>
          <el-table-column
            prop="pay_status"
            label="支付状态"
            min-width="100"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <el-tag size="small" :type="row.pay_status | orderTagType">{{
                row.pay_status | orderStatus
              }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="verify_status"
            label="审批状态"
            min-width="100"
            style="overflow: auto"
            class-name="badge"
          >
            <template slot-scope="{ row }">
              <el-badge :value="row.reshuffle ? '异' : ''" class="item">
                <el-tag
                  size="small"
                  :type="verifyStatusMap[row.verify_status || 0].type"
                >
                  {{ verifyStatusMap[row.verify_status || 0].text }}
                </el-tag>
              </el-badge>
            </template>
          </el-table-column>
          <el-table-column
            prop="contract_status"
            label="合同状态"
            min-width="100"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <el-tag
                v-if="row.order_id"
                size="small"
                :type="statusMap[row.contract_status || 0].type"
              >
                {{ statusMap[row.contract_status || 0].text }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" min-width="200">
            <template slot-scope="{ row }">
              <div style="display: flex; justify-content: center">
                <el-button
                  type="text"
                  @click="seebtn(row)"
                  v-if="
                    !row.contract_status &&
                    row.project_ids &&
                    !row.sign_url &&
                    row.verify_status === 3
                  "
                  >生成合同</el-button
                >
                <el-button
                  type="text"
                  @click="seeview(row)"
                  v-if="row.sign_url && row.contract_status"
                  >查看合同</el-button
                >
                <el-button
                  type="text"
                  @click="handleCopy(row.sign_url)"
                  v-if="
                    row.sign_url &&
                    (row.contract_status === 2 || row.contract_status === 4)
                  "
                  >复制签名链接</el-button
                >
                <el-button type="text" @click="toCrmOrderDetail(row.order_id)"
                  >订单详情</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="frame_bottom">
          <div class="frame_bottom_btn">
        <el-button size="medium">一键优惠</el-button>
        </div>
        <div class="table_bottom">
          <page
            :data="listTotal"
            :curpage="pageNum"
            @pageChange="handlePageChange"
            @pageSizeChange="handleSizeChange"
          />
        </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { getShortcuts, today } from "@/utils/date";
import { rebateList } from "@/api/rebate";
import { getCrmOrderList } from "@/api/crm";
import { getCateList } from "@/api/sou";
import { cloneOptions } from "@/utils/index";
export default {
  name: "InstitutionalPreview",

  data() {
    return {
      listData: [],
      statusMap: {
        0: {
          text: "未生成",
          type: "info",
        },
        1: {
          text: "未审核",
          type: "primary",
        },
        2: {
          text: "已审核",
          type: "success",
        },
        3: {
          text: "已驳回",
          type: "danger",
        },
        4: {
          text: "签署完成",
          type: "success",
        },
      },
      verifyStatusMap: {
        1: {
          text: "待审核",
          type: "info",
        },
        2: {
          text: "（多人）审核中",
          type: "primary",
        },
        3: {
          text: "审核通过",
          type: "success",
        },
        8: {
          text: "已撤销审核",
          type: "info",
        },
        9: {
          text: "驳回不通过",
          type: "danger",
        },
      },
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      // recordData:[],
      panelData: {
        total: "",
        order_money: 0,
        pay_money: "",
        overdue_money: "",
        money: "",
        reduction: 0,
      },
      searchData: {
        date: (this.$route.query.date || `${today},${today}`).split(","),
        status:"",
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
          key: "category_id",
          type: "cascader",
          width: 240,
          attrs: {
            placeholder: "所属分类",
            clearable: true,
            // props: {
            //   multiple: true,
            //   checkStrictly: true,
            // },
            "collapse-tags": true,
            filterable: true,
            options: [],
          },
        },
        {
          key: "keyword",
          attrs: {
            placeholder: "订单金额",
            clearable: true,
          },
        },
      ],
    };
  },
  activated() {
    this.getCrmOrderList();
  },
  created() {
    this.getCateList();
  },
  methods: {
    // 获取所属分类
    async getCateList() {
      const data = { list: true };
      const res = await getCateList(data);
      if (res.code === 0) {
        this.searchOptions[1].attrs.options = cloneOptions(
          res.data,
          "category_name",
          "category_id",
          "son"
        );
      }
    },
    handleSearch(data) {
      this.pageNum = 1;
      const date = data.date || ["", ""];
      delete data.date;
      this.searchData = {
        ...data,
        start_time: date[0],
        end_time: date[1],
      };
      this.getCrmOrderList(data);
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.rebateList();
    },
    async rebateList() {
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
        ...this.searchData,
        from_organization_id:this.$route.query.institution_id,
      };
      this.listLoading = true;
      const res = await rebateList(data);
      this.listLoading = false;
      this.listTotal = res.data.total;
      this.listData = res.data.list;
      console.log(this.listData);
    },
    toDetail(id){
      this.$router.push({
        name: "institutionalRebateDetail",
        query: {
        id,
        },
      })
    },
     handleSizeChange(size) {
      this.pageNum = 1;
      this.pageSize = size;
      this.rebateList();
    },

     async getCrmOrderList() {
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
        channel: 2,
        ...this.searchData,
        date: Array.isArray(this.searchData.date)
          ? this.searchData.date.join(" - ")
          : "",
        project_id: Array.isArray(this.searchData.project_id)
          ? this.searchData.project_id.join(",")
          : "",
        category_id: Array.isArray(this.searchData.category_id)
          ? this.searchData.category_id.join(",")
          : "",
        sources: Array.isArray(this.searchData.sources)
          ? this.searchData.sources.join(",")
          : "",
        staff_id: Array.isArray(this.searchData.staff_id)
          ? this.searchData.staff_id.join(",")
          : "",
      };
      this.listLoading = true;
      const res = await getCrmOrderList(data);
      this.listLoading = false;
      this.listData = res.data.list;
      this.listTotal = res.data.total;
      this.panelData = res.data.count || {};
    },

  },
};
</script>

<style lang="scss" scoped>
.institutional-collection {
  section {
    padding: 10px 16px 0 0;
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

.panel-list {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  color: #606266;
  .panel-item {
    width: calc(100% / 6);
    margin-left: 16px;
    border: 1px solid #e4e7ed;
    text-align: center;
    padding: 16px;
    .time_num {
      margin-top: 6px;
      font-size: 22px;
    }
    &:first-child {
      margin-left: 0;
    }
  }
}
.userTable{
  margin-top: 20px;
}
.frame_bottom{
  display: flex;
  justify-content: space-between;
  .frame_bottom_btn{
    margin-top: 20px;
  }
}
</style>
