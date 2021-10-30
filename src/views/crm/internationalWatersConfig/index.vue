<template>
  <!-- 公海配置 -->
  <div class="international-waters-config">
    <div class="head_remind">*公海主要目的是让企业的客户资源能循环利用。</div>
    <div class="container">
      <Title text="超过N天'未跟进'的客户，由系统定时划入公海"> </Title>
      <p class="tips">
        *从获得客户（新增、转移、从公海领取客户）开始，对客户写跟进以及新增订单都视为跟进了客户。
      </p>
      <!--表格-->
      <div class="table">
        <el-table :data="followUpData" border>
          <el-table-column
            label="是否启用"
            min-width="120"
            align="center"
            prop="name"
          >
            <template slot-scope="{ row }">
              <el-switch v-model="row.value1"> </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            prop="has_question"
            label="未跟进天数"
            min-width="160"
          >
            <template slot-scope="{ row }">
              <span>
                超过
                <el-input
                  class="input"
                  type="number"
                  placeholder="0"
                  v-model="row.value2"
                ></el-input>
                天未跟进
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="has_question"
            label="划入公海时间"
            min-width="240"
          >
            <template slot-scope="{ row }">
              <span>
                系统会在每天
                <el-time-picker
                  style="width: 120px"
                  v-model="row.value3"
                  placeholder="00:00:00"
                >
                </el-time-picker>
                将客户划入公海
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="has_question"
            label="销售人员提醒时间"
            min-width="260"
          >
            <template slot-scope="{ row }">
              <span>
                并在划入公海前
                <el-input
                  class="input"
                  type="number"
                  placeholder="0"
                  v-model="row.value4"
                ></el-input>
                天提醒销售人员及时跟进
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="container">
      <Title text="超过N天'未成交'的客户，由系统定时划入公海"> </Title>
      <p class="tips">
        *从获得客户（新增、转移、从公海领取客户）开始来计算客户多久未达到“成交”状态。
      </p>
      <!--表格-->
      <div class="table">
        <el-table :data="dealData" border>
          <el-table-column
            label="是否启用"
            min-width="120"
            align="center"
            prop="name"
          >
            <template slot-scope="{ row }">
              <el-switch v-model="row.value1"> </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            prop="has_question"
            label="未跟进天数"
            min-width="160"
          >
            <template slot-scope="{ row }">
              <span>
                超过
                <el-input
                  class="input"
                  type="number"
                  placeholder="0"
                  v-model="row.value2"
                ></el-input>
                天未成交
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="has_question"
            label="划入公海时间"
            min-width="240"
          >
            <template slot-scope="{ row }">
              <span>
                系统会在每天
                <el-time-picker
                  style="width: 120px"
                  v-model="row.value3"
                  placeholder="00:00:00"
                >
                </el-time-picker>
                将客户划入公海
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="has_question"
            label="销售人员提醒时间"
            min-width="260"
          >
            <template slot-scope="{ row }">
              <span>
                并在划入公海前
                <el-input
                  class="input"
                  type="number"
                  placeholder="0"
                  v-model="row.value4"
                ></el-input>
                天提醒销售人员及时跟进
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="submit">
      <el-button type="primary">保存设置</el-button>
    </div>
  </div>
</template>

<script>
import {
  getStaffList,
  updateStaffStatus,
  getDepartmentlists,
  delDepartment,
} from "@/api/set";
export default {
  name: "approveConfig",
  data() {
    return {
      value: true,
      followUpData: [
        {
          value1: "一级审批",
          value2: "",
          value3: "",
          value4: "",
        },
      ],
      dealData: [
        {
          value1: "一级审批",
          value2: "",
          value3: "",
          value4: "",
        },
      ],
      staffOptions: [],
    };
  },

  created() {
    this.getStaffList();
  },
  methods: {
    async getStaffList() {
      const data = {
        limit: 99999,
      };
      const res = await getStaffList(data);
      this.staffOptions = res.data.list;
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/.el-table__header th,
.el-table__header tr {
  background-color: #f8f8f8;
  color: #909399;
}
.container {
  padding: 20px;
}
.switch {
  display: flex;
  align-items: center;
  /deep/.text {
    margin-right: 10px;
  }
}
.tips {
  color: #999;
  font-size: 14px;
}
.table {
  margin-top: 20px;
  .input {
    width: 100px;
  }
}
.submit {
  width: 100%;
  padding-top: 100px;
  text-align: center;
  button {
    width: 200px;
  }
}
</style>
<style >
/* 去掉number样式 */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type="number"] {
  -moz-appearance: textfield;
}
</style>