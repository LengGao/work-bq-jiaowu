<template>
  <div class="order-change-info">
    <Title :text="orderTitle"></Title>
    <div class="info-block">
      <div class="info-item">
        <span class="info-item__name">客户姓名：</span>
        <span class="info-item__value"
          ><el-button
            type="text"
            @click="coursDetail(data.uid || originData.uid)"
            style="padding: 0"
            >{{ data.surname || originData.surname }}</el-button
          ></span
        >
      </div>
      <div
        class="info-item"
        :class="{
          'info-item--red': isChange && originData.source != data.source,
        }"
      >
        <span class="info-item__name">订单来源</span>
        <span class="info-item__value">{{ data.source }}</span>
      </div>

      <div class="info-item">
        <span class="info-item__name">报名类型：</span>
        <span class="info-item__value">{{
          data.type === 1 ? "学历教育" : "职业教育"
        }}</span>
      </div>
      <div
        class="info-item"
        :class="{
          'info-item--red':
            isChange && originData.project_name != data.project_name,
        }"
      >
        <span class="info-item__name">报名项目：</span>
        <span class="info-item__value">{{ data.project_name }}</span>
      </div>
      <div
        class="info-item"
        :class="{
          'info-item--red':
            isChange && originData.jiebie_name != data.jiebie_name,
        }"
      >
        <span class="info-item__name">届别名称：</span>
        <span class="info-item__value">{{ data.jiebie_name }}</span>
      </div>
      <div
        class="info-item"
        :class="{
          'info-item--red':
            isChange && originData.staff_name != data.staff_name,
        }"
      >
        <span class="info-item__name">业绩归属：</span>
        <span class="info-item__value">{{ data.staff_name }}</span>
      </div>
      <div
        class="info-item"
        :class="{
          'info-item--red':
            isChange && originData.total_money != data.total_money,
        }"
      >
        <span class="info-item__name">订单金额：</span>
        <span class="info-item__value">{{
          data.total_money | moneyFormat
        }}</span>
      </div>
      <div
        class="info-item"
        :class="{
          'info-item--red':
            isChange && originData.order_money != data.order_money,
        }"
      >
        <span class="info-item__name">学费金额：</span>
        <span class="info-item__value">{{
          data.order_money | moneyFormat
        }}</span>
      </div>
      <div
        class="info-item"
        :class="{
          'info-item--red':
            isChange && originData.other_money != data.other_money,
        }"
      >
        <span class="info-item__name">其他金额：</span>
        <span class="info-item__value">{{
          data.other_money | moneyFormat
        }}</span>
      </div>
      <div
        class="info-item"
        :class="{
          'info-item--red': isChange && originData.pay_money != data.pay_money,
        }"
      >
        <span class="info-item__name">已回款金额：</span>
        <span class="info-item__value">{{ data.pay_money | moneyFormat }}</span>
      </div>
      <div
        class="info-item"
        :class="{
          'info-item--red':
            isChange && originData.overdue_money != data.overdue_money,
        }"
      >
        <span class="info-item__name">未回款金额：</span>
        <span class="info-item__value">{{
          data.overdue_money | moneyFormat
        }}</span>
      </div>

      <div class="info-item">
        <span class="info-item__name">回款凭证：</span>
        <span class="info-item__value">
          <template v-if="getReceiptFile(data.receipt_file).length">
            <img
              :src="item"
              alt=""
              title="点击预览大图"
              style="
                width: 40px;
                height: 30px;
                cursor: pointer;
                margin-right: 10px;
              "
              v-for="(item, index) in getReceiptFile(data.receipt_file)"
              :key="index"
              @click="handlePreview(item)"
            />
          </template>
          <span v-else>--</span>
        </span>
      </div>
      <div class="info-item">
        <span class="info-item__name">订单备注：</span>
        <span class="info-item__value">{{ data.tips || "--" }}</span>
      </div>
    </div>
    <Title :text="projectTitle"></Title>
    <template v-if="data.type === 1">
      <el-table
        :key="data.type"
        :data="getTableData"
        style="border: 1px solid #f1f1f1"
        v-loading="false"
        element-loading-text="loading"
        element-loading-spinner="el-icon-loading"
        element-loading-background="#fff"
        :header-cell-style="{
          'text-align': 'center',
          'background-color': '#f8f8f8',
        }"
      >
        <el-table-column
          label="序号"
          min-width="70"
          align="center"
          type="index"
        >
        </el-table-column>
        <el-table-column
          label="学历形式"
          show-overflow-tooltip
          min-width="160"
          align="center"
          prop="type.value"
        >
        </el-table-column>
        <el-table-column
          prop="university.value"
          label="院校名称"
          min-width="80"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          label="层次名称"
          align="center"
          prop="level.value"
          min-width="100"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          label="专业名称"
          align="center"
          prop="major.value"
          min-width="100"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          label="关联项目"
          align="center"
          min-width="100"
          prop="project_name"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          label="总学费"
          align="center"
          min-width="100"
          prop="total_money"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span> {{ row.total_money | moneyFormat }} </span>
          </template>
        </el-table-column>
        <el-table-column
          label="实收金额"
          align="center"
          min-width="100"
          prop="must_money"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span> {{ row.must_money | moneyFormat }} </span>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <template v-else>
      <el-table
        :key="data.type"
        :data="getTableData"
        style="border: 1px solid #f1f1f1"
        v-loading="false"
        element-loading-text="loading"
        element-loading-spinner="el-icon-loading"
        element-loading-background="#fff"
        :header-cell-style="{
          'text-align': 'center',
          'background-color': '#f8f8f8',
        }"
      >
        <el-table-column
          label="序号"
          min-width="70"
          align="center"
          type="index"
        >
        </el-table-column>
        <el-table-column
          label="项目名称"
          show-overflow-tooltip
          min-width="160"
          align="center"
          prop="project_name"
        >
        </el-table-column>
        <el-table-column
          prop="category_name"
          label="所属分类"
          min-width="80"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          label="项目价格"
          align="center"
          min-width="100"
          prop="project_price"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span> {{ row.project_price | moneyFormat }} </span>
          </template>
        </el-table-column>
        <el-table-column
          label="实收金额"
          align="center"
          min-width="100"
          prop="must_money"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span> {{ row.must_money | moneyFormat }} </span>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <PreviewImg ref="view" />
  </div>
</template>
<script>
export default {
  name: "OrderChangeInfo",
  props: {
    orderTitle: {
      type: String,
      default: "原始订单信息",
    },
    projectTitle: {
      type: String,
      default: "原始项目信息",
    },
    changeIndex: 0,
    data: {
      type: Object,
      default: () => ({}),
    },
    originData: {
      type: Object,
      default: () => ({}),
    },
    isChange: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      verifyTypeMap: {
        0: {
          text: "新订单",
          type: "success",
        },
        1: {
          text: "申请退款",
          type: "warning",
        },
        2: {
          text: "申请作废",
          type: "danger",
        },
        3: {
          text: "申请退差价",
          type: "warning",
        },
      },
    };
  },
  computed: {
    getTableData() {
      const tableData =
        typeof this.data.project === "string"
          ? JSON.parse(this.data.project) || []
          : this.data.project;
      return tableData;
    },
  },
  methods: {
    getReceiptFile(val) {
      if (typeof val === "string" && val !== "") {
        return [val];
      } else {
        return val || [];
      }
    },
    coursDetail(uid) {
      this.$router.push({
        name: "cusdetail",
        query: {
          uid,
        },
      });
    },
    handlePreview(src) {
      this.$refs.view.show(src);
    },
  },
};
</script>
<style lang="less">
.order-change-info {
  .info-block {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;
    .info-item {
      padding: 16px 10px;
      color: #666;
      display: flex;
      &--red {
        color: red;
      }
      &__name {
        min-width: 100px;
      }
      &__value {
        min-width: 200px;
        line-height: 1.5;
      }
    }
  }
}
</style>