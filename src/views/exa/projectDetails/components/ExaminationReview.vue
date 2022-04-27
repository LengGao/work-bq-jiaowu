<template>
  <!--报考审核弹窗-->
  <el-dialog
    title="报考审核"
    :visible.sync="visible"
    width="1050px"
    @open="handleOpen"
    :close-on-click-modal="false"
    @closed="hanldeCancel"
    class="review-dialog"
  >
    <div class="review-container">
      <div class="review-batch-list" v-if="isBatch">
        <div class="list-header">
          <span>已选学生：</span>
          <span class="check-number">{{ getCheckedNum }}</span>
        </div>
        <ul class="list-content">
          <li
            class="list-item"
            v-for="(item, index) in batchData"
            :key="item.id"
            :class="{ 'list-item--active': activeIndex === index }"
            @click="handleListChange(index)"
          >
            <span class="list-item-name">{{ item.user_realname }}</span>
            <span
              class="list-item-status"
              :style="{ color: statusColors[item.audit_status] }"
              >{{ applyStatusMap[item.audit_status] }}</span
            >
          </li>
        </ul>
      </div>
      <div class="review-content" v-loading="listLoading">
        <ul class="review-info">
          <li class="info-item">
            <span class="info-item-title">学生姓名</span>
            <span class="info-item-content">{{ listData.surname }}</span>
          </li>
          <li class="info-item">
            <span class="info-item-title">身份证号</span>
            <span class="info-item-content">{{ listData.id_card }}</span>
          </li>
          <li class="info-item">
            <span class="info-item-title">籍贯</span>
            <span class="info-item-content">{{
              listData.user_province
                ? listData.user_province + " " + listData.user_city
                : "--"
            }}</span>
          </li>
          <li class="info-item">
            <span class="info-item-title">考试计划</span>
            <span class="info-item-content">{{ listData.plan }}</span>
          </li>
          <li class="info-item">
            <span class="info-item-title">报考省市</span>
            <span class="info-item-content">{{
              listData.rule_province
                ? listData.rule_province + " " + listData.rule_city
                : "--"
            }}</span>
          </li>
          <li class="info-item">
            <span class="info-item-title">报考时间</span>
            <span class="info-item-content">{{ listData.enroll_time }}</span>
          </li>
        </ul>
        <div class="review-table">
          <ul class="table-header">
            <li></li>
            <li>报考要求</li>
            <li>本人情况</li>
            <li>
              <el-checkbox
                :disabled="listData.audit_res !== 0"
                v-model="allChecked"
                @change="handleCheckAllChange"
              ></el-checkbox>
              批量达标
            </li>
          </ul>
          <ul class="table-content">
            <li
              class="table-row"
              v-for="(item, index) in listData.audit_item"
              :key="index"
            >
              <span class="table-col">{{ item.title }}</span>
              <span class="table-col">{{ item.require }}</span>
              <span class="table-col">
                <div
                  v-if="item.info.includes('http')"
                  @click="handlePreview(item.info)"
                  class="table-col-img"
                >
                  <img :src="item.info" alt="" />
                </div>
                <span v-else>{{ item.info }}</span>
              </span>
              <span class="table-col"
                ><el-checkbox
                  v-if="listData.audit_res === 0"
                  v-model="item.checked"
                  @change="handleCheckChange"
                ></el-checkbox>
                <el-checkbox v-else :value="item.checked"></el-checkbox>
                达标</span
              >
            </li>
            <li class="table-row table-row-remark" v-if="listData.audit_item">
              <span class="remark-title"> 备注信息 </span>
              <el-input
                v-if="listData.audit_res === 0"
                v-model="remark"
                maxlength="100"
                placeholder="请输入备注信息"
              ></el-input>
              <span class="remark-detail" v-else>{{ listData.comment }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <Seal
      v-if="listData.audit_res === 1 || listData.audit_res === 2"
      :text="`已${listData.audit_res === 1 ? '审核' : '驳回'}`"
      :type="listData.audit_res === 1 ? 'success' : 'error'"
      right="40"
      bottom="30"
    />
    <span slot="footer" class="dialog-footer" v-if="listData.audit_res === 0">
      <el-button :loading="btnLoading" @click="handleSubmit(2)"
        >驳 回</el-button
      >
      <el-button type="primary" :loading="btnLoading" @click="handleSubmit(1)"
        >审核通过</el-button
      >
    </span>

    <div class="review-footer">
      <div v-if="isBatch">
        <el-button :disabled="!activeIndex" @click="handlePrev"
          >上一个</el-button
        >
        <el-button
          :disabled="activeIndex === getCheckedNum - 1"
          @click="handleNext"
          >下一个</el-button
        >
      </div>
      <div
        class="review-footer-right"
        v-if="listData.audit_res === 1 || listData.audit_res === 2"
      >
        <el-button type="primary" @click="handleReset" :loading="btnLoading"
          >重置审核</el-button
        >
        <div class="footer-info">
          <div>
            <span class="info-title">审核人</span>
            <span>{{ listData.auditor }}</span>
          </div>
          <div>
            <span class="info-title">审核时间</span>
            <span>{{ listData.auditTime }}</span>
          </div>
        </div>
      </div>
    </div>
    <PreviewImg ref="view" />
  </el-dialog>
</template>

<script>
import Seal from "@/components/Seal/index";
import { auditInfo, audit, refresh } from "@/api/exa";
export default {
  name: "reviewDialog",
  components: {
    Seal,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    id: {
      type: [String, Number],
      default: "",
    },
    isBatch: {
      type: Boolean,
      default: false,
    },
    batchData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      visible: this.value,
      listLoading: false,
      listData: {},
      allChecked: false,
      remark: "",
      btnLoading: false,
      activeIndex: 0,
      statusColors: {
        1: "#2798ee",
        2: "#FD6552",
        3: "#43D100",
        4: "#FD6552",
      },
      batchId: "",
      applyStatusMap: {
        1: "待审核",
        2: "资料缺失",
        3: "审核通过",
        4: "审核驳回",
      },
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },
  computed: {
    getCheckedNum() {
      return this.batchData.length;
    },
  },
  methods: {
    handlePrev() {
      let index = (this.activeIndex || 1) - 1;
      this.handleListChange(index);
    },
    handleNext() {
      let index = this.activeIndex + 1;
      this.handleListChange(
        index >= this.getCheckedNum ? this.getCheckedNum - 1 : index
      );
    },
    handlePreview(src) {
      this.$refs.view.show(src);
    },
    handleListChange(index) {
      this.activeIndex = index;
      this.batchId = this.batchData[index].id;
      this.auditInfo();
    },
    //   重置审核
    async handleReset() {
      const data = {
        id: this.isBatch ? this.batchId : this.id,
      };
      this.btnLoading = true;
      const res = await refresh(data).catch(() => {
        this.btnLoading = false;
      });
      this.btnLoading = false;
      if (res.code === 0) {
        this.$message.success(res.message);
        if (this.isBatch) {
          this.batchData[this.activeIndex].audit_res = 0;
          this.auditInfo();
        } else {
          this.$emit("on-success");
          this.hanldeCancel();
        }
      }
    },
    // 审核通过，驳回
    async handleSubmit(audit_res) {
      const resetParams = {};
      for (const key in this.listData.audit_item) {
        resetParams[key] = this.listData.audit_item[key].checked ? 1 : 0;
      }
      const data = {
        id: this.isBatch ? this.batchId : this.id,
        audit_res,
        comment: this.remark,
        ...resetParams,
      };
      this.btnLoading = true;
      const res = await audit(data).catch(() => {
        this.btnLoading = false;
      });
      this.btnLoading = false;
      if (res.code === 0) {
        this.$message.success(res.message);
        if (this.isBatch) {
          this.batchData[this.activeIndex].audit_res = audit_res;
          this.auditInfo();
        } else {
          this.$emit("on-success");
          this.hanldeCancel();
        }
      }
    },
    // 单选
    handleCheckChange(val) {
      if (val) {
        let allNum = 0;
        let allCheckedNum = 0;
        for (const key in this.listData.audit_item) {
          allNum++;
          this.listData.audit_item[key].checked && allCheckedNum++;
        }
        this.allChecked = allNum === allCheckedNum;
      } else {
        this.allChecked = val;
      }
    },
    // 全选
    handleCheckAllChange(val) {
      if ("audit_item" in this.listData) {
        for (const key in this.listData.audit_item) {
          this.listData.audit_item[key].checked = val;
        }
      }
    },
    handleOpen() {
      this.isBatch && (this.batchId = this.batchData[0].id);
      this.auditInfo();
    },
    //审核详情
    async auditInfo() {
      this.ressetState();
      const data = {
        id: this.isBatch ? this.batchId : this.id,
      };
      this.listLoading = true;
      const res = await auditInfo(data);
      this.listLoading = false;
      this.listData = res.data;
    },
    //重置用到的数据
    ressetState() {
      this.listData = {};
      this.allChecked = false;
      this.remark = "";
    },
    hanldeCancel() {
      this.ressetState();
      this.activeIndex = 0;
      this.$emit("input", false);
      this.isBatch && this.$emit("on-success");
    },
  },
};
</script>

<style lang="scss" scoped>
.review-dialog {
  .review-container {
    margin-bottom: 20px;
    display: flex;
    .review-batch-list {
      width: 200px;
      border: 1px solid #e4e7ed;
      margin-right: 20px;
      flex-shrink: 0;
      .list-header {
        background-color: #f2f2f2;
        padding: 14px;
        font-weight: 550;
        border-bottom: 1px solid #e4e7ed;
        span {
          color: #909399;
        }
        .check-number {
          color: #2798ee;
        }
      }
      .list-content {
        overflow-y: auto;
        height: 520px;
        .list-item {
          padding: 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #e4e7ed;
          cursor: pointer;
          &-name {
            color: #909399;
          }
          &.list-item--active {
            background-color: #ecf5ff;
            color: #409eff;
            .list-item-name {
              color: #409eff;
            }
          }
        }
      }
    }
    .review-content {
      flex: 1;
      .review-info {
        margin-bottom: 20px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        .info-item {
          width: calc(100% / 3.3);
          display: flex;
          align-items: center;
          margin: 0 20px 20px 0;
          &-title {
            color: #909399;
            margin-right: 16px;
          }
          &-content {
            color: #606266;
          }
        }
      }
      .review-table {
        border: 1px solid #e4e7ed;
        .table-header {
          display: flex;
          background-color: #f2f2f2;
          li {
            padding: 14px 6px;
            width: calc(100% / 4);
            color: #909399;
            font-weight: 550;
            text-align: center;
          }
        }
        .table-content {
          height: 400px;
          overflow-y: auto;
          .table-row {
            display: flex;
            align-items: center;
            border-bottom: 1px solid #e4e7ed;
            .table-col {
              text-align: center;
              padding: 14px 6px;
              width: calc(100% / 4);
              color: #909399;
              &-img {
                height: 50px;
                cursor: pointer;
              }
            }
          }
          .table-row-remark {
            padding: 14px 36px 14px 6px;
            .remark-title {
              width: 100px;
              text-align: center;
            }
            .remark-detail {
              color: #2798ee;
            }
          }
        }
      }
    }
  }
  .review-footer {
    display: flex;
    align-items: center;
    &-right {
      margin-left: 16px;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .footer-info {
      width: 50%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      color: #606266;
      .info-title {
        color: #909399;
        margin-right: 16px;
      }
    }
  }
}
</style>