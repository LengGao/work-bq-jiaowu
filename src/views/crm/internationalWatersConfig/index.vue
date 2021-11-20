<template>
  <!-- 公海配置 -->
  <div class="international-waters-config" v-loading="loading">
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
              <el-switch
                v-model="row.status"
                :active-value="1"
                :inactive-value="0"
              >
              </el-switch>
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
                  v-model="row.day"
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
                  format="HH:mm"
                  value-format="HH:mm"
                  :picker-options="{
                    format: 'HH:mm',
                  }"
                  style="width: 120px"
                  v-model="row.plan_time"
                  placeholder="00:00"
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
                  v-model="row.remind_day"
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
              <el-switch
                v-model="row.status"
                :active-value="1"
                :inactive-value="0"
              >
              </el-switch>
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
                  v-model="row.day"
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
                  format="HH:mm"
                  value-format="HH:mm"
                  :picker-options="{
                    format: 'HH:mm',
                  }"
                  style="width: 120px"
                  v-model="row.plan_time"
                  placeholder="00:00"
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
                  v-model="row.remind_day"
                ></el-input>
                天提醒销售人员及时跟进
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="submit">
      <el-button type="primary" @click="setConfig" :loading="saveLoding"
        >保存设置</el-button
      >
    </div>
  </div>
</template>

<script>
import {
  getInternationalWatersConfig,
  setInternationalWatersConfig,
} from "@/api/crm";
export default {
  name: "internationalWatersConfig",
  data() {
    return {
      loading: false,
      saveLoding: false,
      followUpData: [],
      dealData: [],
    };
  },

  created() {
    this.getConfig();
  },
  methods: {
    getConfig() {
      this.loading = true;
      this.getInternationalWatersConfig("no_follow_up");
      this.getInternationalWatersConfig("no_clinch_deal");
    },
    setConfig() {
      this.saveLoding = true;
      ["no_follow_up", "no_clinch_deal"].forEach((item) => {
        this.setInternationalWatersConfig(item);
      });
    },
    async setInternationalWatersConfig(title) {
      const config =
        title === "no_follow_up" ? this.followUpData[0] : this.dealData[0];
      const data = {
        ...config,
        title,
      };
      const res = await setInternationalWatersConfig(data).catch(() => {
        this.saveLoding = false;
      });
      if (res.code === 0 && title === "no_clinch_deal") {
        this.saveLoding = false;
        this.getConfig();
        this.$message.success(res.message);
      }
    },
    async getInternationalWatersConfig(title) {
      const data = {
        title,
      };
      const res = await getInternationalWatersConfig(data).catch(() => {
        this.loading = false;
      });
      if (title === "no_follow_up") {
        this.followUpData = [res.data.config];
      }
      if (title === "no_clinch_deal") {
        this.dealData = [res.data.config];
        this.loading = false;
      }
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