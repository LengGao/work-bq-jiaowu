<template>
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
        :data="listData"
        v-loading="listLoading"
        element-loading-text="loading"
        element-loading-spinner="el-icon-loading"
        element-loading-background="#fff"
        :header-cell-style="{ 'text-align': 'center', background: '#f8f8f8' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column
          prop="order_id"
          label="订单编号"
          show-overflow-tooltip
          min-width="190"
        >
          <template slot-scope="{ row }">
            <el-button type="text" @click="toCrmOrderDetail(row.order_id)">
              {{ row.order_no }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="reason"
          label="异动原因"
          show-overflow-tooltip
          min-width="190"
        >
        </el-table-column>
        <el-table-column
          prop="surname"
          label="客户姓名"
          min-width="90"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <div class="link" @click="coursDetail(scope.row.uid)">
              {{ scope.row.surname }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="staff_name"
          label="业绩归属"
          min-width="100"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="project_name"
          label="项目名称"
          min-width="180"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="order_money"
          label="订单金额"
          min-width="120"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            {{ row.order_money | moneyFormat }}
          </template>
        </el-table-column>
        <el-table-column
          prop="pay_money"
          label="支付金额"
          min-width="120"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span>{{ row.pay_money | moneyFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="new_order_money"
          label="新订单金额"
          min-width="120"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            {{ row.new_order_money | moneyFormat }}
          </template>
        </el-table-column>
        <el-table-column
          prop="new_pay_money"
          label="新支付金额"
          min-width="120"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span>{{ row.new_pay_money | moneyFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="pay_type"
          label="支付方式"
          min-width="80"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column
          prop="verify_status"
          label="审批状态"
          min-width="100"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <el-tag size="small" :type="statusMap[row.status || 0].type">
              {{ statusMap[row.status || 0].text }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="处理状态"
          min-width="80"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span
              v-if="row.status > 1"
              class="approve-status approve-status--success"
              >已处理</span
            >
            <span v-else class="approve-status">待处理</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" fixed="right" min-width="160">
          <template slot-scope="{ row }">
            <template v-if="row.status < 2">
              <el-button type="text" @click="approveConfirm(row.id, 1)"
                >通过</el-button
              >
              <el-button type="text" @click="approveConfirm(row.id, 2)"
                >驳回</el-button
              >
            </template>
            <el-button
              type="text"
              v-if="row.status === 2 && row.reshuffle"
              @click="oneMoreReshuffle(row.id)"
              >重置</el-button
            >
            <el-button type="text" @click="toCrmOrderDetail(row.order_id)"
              >订单详情</el-button
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
</template>

<script>
import PartiallyHidden from "@/components/PartiallyHidden/index";
import {
  getUnusualList,
  orderUnusualApprove,
  oneMoreReshuffle,
} from "@/api/crm";
export default {
  name: "changeApprove",
  components: {
    PartiallyHidden,
  },
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      pageSize: 20,
      listTotal: 0,
      searchData: {
        keyword: "",
      },
      searchOptions: [
        {
          key: "keyword",
          attrs: {
            placeholder: "学生姓名/手机号码",
          },
        },
      ],
      statusMap: {
        0: {
          text: "待审核",
          type: "info",
        },
        1: {
          text: "（多人）审核中",
          type: "primary",
        },
        2: {
          text: "审核通过",
          type: "success",
        },
        3: {
          text: "驳回不通过",
          type: "danger",
        },
      },
    };
  },
  activated() {
    this.getUnusualList();
  },
  created() {
    this.getUnusualList();
  },
  methods: {
    async oneMoreReshuffle(id) {
      const data = { id };
      const res = await oneMoreReshuffle(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.getUnusualList();
      }
    },
    toCrmOrderDetail(id) {
      this.$router.push({
        name: "crmOrderDetail",
        query: {
          id,
          isFromApprove: 1,
          isOrderUnusual: 1,
        },
      });
    },
    approveConfirm(id, action) {
      this.$prompt("请输入备注", action === 2 ? "驳回" : "通过", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          this.orderUnusualApprove(id, action, value);
        })
        .catch(() => {});
    },
    async orderUnusualApprove(id, verify, tips) {
      const data = {
        id,
        verify,
        tips,
      };
      const res = await orderUnusualApprove(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.getUnusualList();
      }
    },
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
      };
      this.getUnusualList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getUnusualList();
    },
    async getUnusualList() {
      const data = {
        page: this.pageNum,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await getUnusualList(data).catch(() => {});
      this.listLoading = false;
      this.listData = res.data.list;
      this.listTotal = res.data.total;
    },
  },
};
</script>

<style lang="scss" scoped>
.userTable {
  margin-top: 20px;
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
}
</style>
