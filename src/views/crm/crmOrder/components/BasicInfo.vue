<template>
  <div class="basic-info">
    <Title text="订单信息"></Title>
    <div class="info-block">
      <template v-if="$route.query.verify_id">
        <div class="info-item">
          <span class="info-item__name">审批类型：</span>
          <span class="info-item__value">
            <el-tag
              size="small"
              :type="verifyTypeMap[data.verify_type || 0].type"
            >
              {{ verifyTypeMap[data.verify_type || 0].text }}
            </el-tag></span
          >
        </div>
        <template v-if="data.verify_type === 2">
          <div class="info-item">
            <span class="info-item__name">作废原因：</span>
            <span class="info-item__value">{{
              data.refund_invalid_reason
            }}</span>
          </div>
          <div class="info-item">
            <span class="info-item__name">作废凭证：</span>
            <span class="info-item__value">
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
                v-for="(item, index) in data.refund_invalid_voucher"
                :key="index"
                @click="handlePreview(item)"
              />
            </span>
          </div>
        </template>
        <template v-if="[1, 3].includes(data.verify_type)">
          <div class="info-item">
            <span class="info-item__name">退款金额：</span>
            <span class="info-item__value">{{
              data.refund_invalid_refund_money | moneyFormat
            }}</span>
          </div>

          <div class="info-item">
            <span class="info-item__name">退款方式：</span>
            <span class="info-item__value">{{
              data.refund_invalid_refund_type
            }}</span>
          </div>
          <div class="info-item">
            <span class="info-item__name">退款原因：</span>
            <span class="info-item__value">{{
              data.refund_invalid_reason
            }}</span>
          </div>
          <div class="info-item">
            <span class="info-item__name">退款凭证：</span>
            <span class="info-item__value">
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
                v-for="(item, index) in data.refund_invalid_voucher"
                :key="index"
                @click="handlePreview(item)"
              />
            </span>
          </div>
        </template>
      </template>
      <div class="info-item">
        <span class="info-item__name">订单编号：</span>
        <span class="info-item__value">{{ data.order_no }}</span>
      </div>
      <div class="info-item">
        <span class="info-item__name">订单时间：</span>
        <span class="info-item__value">{{ data.create_time }}</span>
      </div>
      <div class="info-item">
        <span class="info-item__name">客户姓名：</span>
        <span class="info-item__value">{{ data.surname }}</span>
      </div>
      <div class="info-item">
        <span class="info-item__name">业绩归属：</span>
        <span class="info-item__value">{{ data.staff_name }}</span>
      </div>
      <div class="info-item">
        <span class="info-item__name">订单金额：</span>
        <span class="info-item__value">{{
          data.total_money | moneyFormat
        }}</span>
      </div>
      <div class="info-item">
        <span class="info-item__name">学费金额：</span>
        <span class="info-item__value">{{
          data.order_money | moneyFormat
        }}</span>
      </div>
      <div class="info-item">
        <span class="info-item__name">其他金额：</span>
        <span class="info-item__value">{{
          data.other_money | moneyFormat
        }}</span>
      </div>
      <div class="info-item">
        <span class="info-item__name">已回款金额：</span>
        <span class="info-item__value">{{ data.pay_money | moneyFormat }}</span>
      </div>
      <div class="info-item">
        <span class="info-item__name">未回款金额：</span>
        <span class="info-item__value">{{
          data.overdue_money | moneyFormat
        }}</span>
      </div>
      <div class="info-item">
        <span class="info-item__name">届别名称：</span>
        <span class="info-item__value">{{ data.jiebie_name }}</span>
      </div>
      <div class="info-item">
        <span class="info-item__name">报名类型：</span>
        <span class="info-item__value">{{
          data.type === 1 ? "学历教育" : "职业教育"
        }}</span>
      </div>
      <div class="info-item">
        <span class="info-item__name">回款凭证：</span>
        <span class="info-item__value">
          <template v-if="data.receipt_file && data.receipt_file.length">
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
              v-for="(item, index) in data.receipt_file"
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
    <template v-if="data.type === 1">
      <Title text="学历信息"></Title>
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
        <el-table-column
          label="操作"
          align="center"
          fixed="right"
          min-width="100"
        >
          <template slot-scope="{ row }">
            <el-button
              type="text"
              v-if="row.open_course_id && data.verify_status === 3"
              @click="eduOpenCourseConfirm(row.open_course_id)"
              >开课</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </template>
    <template v-else>
      <Title text="项目信息"></Title>
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
        <el-table-column
          label="操作"
          align="center"
          fixed="right"
          min-width="100"
        >
          <template slot-scope="{ row }">
            <el-button
              type="text"
              v-if="row.open_course_id && data.verify_status === 3"
              @click="eduOpenCourseConfirm(row.open_course_id)"
              >开课</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </template>
    <PreviewImg ref="view" />
  </div>
</template>
<script>
import { eduOpenCourse } from "@/api/crm";
export default {
  name: "orderBasicInfo",
  props: {
    data: {
      type: Object,
      default: () => ({}),
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
      const tableData = JSON.parse(this.data.project) || [];
      return tableData;
    },
  },
  methods: {
    handlePreview(src) {
      this.$refs.view.show(src);
    },
    // 开课
    eduOpenCourseConfirm(id) {
      this.$confirm("是否确定一键开通课程和题库？", "开课提醒", {
        type: "warning",
      })
        .then(() => {
          this.eduOpenCourse(id);
        })
        .catch(() => {});
    },
    async eduOpenCourse(id) {
      const data = { id };
      const res = await eduOpenCourse(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.$parent.getCrmOrderDetail();
      }
    },
  },
};
</script>
<style lang="less">
.basic-info {
  .info-block {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;
    .info-item {
      padding: 16px 10px;
      color: #666;
      display: flex;
      &__name {
        min-width: 100px;
      }
      &__value {
        min-width: 300px;
        line-height: 1.5;
      }
    }
  }
}
</style>