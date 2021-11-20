<template>
  <div class="refund-only">
    <Title text="订单信息"></Title>
    <div class="info-block">
      <div class="info-item">
        <span class="info-item__name">订单编号：</span>
        <span class="info-item__value">65464875432131</span>
      </div>
      <div class="info-item">
        <span class="info-item__name">订单时间：</span>
        <span class="info-item__value">fdsafdsafdsaf2424</span>
      </div>
      <div class="info-item">
        <span class="info-item__name">客户姓名：</span>
        <span class="info-item__value">fdsafdsafdsaf2424</span>
      </div>
      <div class="info-item">
        <span class="info-item__name">报名项目：</span>
        <span class="info-item__value">fdsafdsafdsaf2424</span>
      </div>
      <div class="info-item">
        <span class="info-item__name">订单金额：</span>
        <span class="info-item__value">fdsafdsafdsaf2424</span>
      </div>
      <div class="info-item">
        <span class="info-item__name">已回款金额：</span>
        <span class="info-item__value">fdsafdsafdsaf2424</span>
      </div>
      <div class="info-item">
        <span class="info-item__name">扣款金额：</span>
        <span class="info-item__value">范德萨范德萨</span>
      </div>
      <div class="info-item">
        <span class="info-item__name">订单结余：</span>
        <span class="info-item__value">fdsafdsafdsaf2424</span>
      </div>
    </div>
    <el-form
      label-width="100px"
      :model="formData"
      :rules="rules"
      ref="formData"
      inline
    >
      <Title text="更换新项目"></Title>
      <el-form-item label="报名类型" prop="type">
        <el-radio-group class="input" v-model="formData.type">
          <el-radio :label="1">职业教育</el-radio>
          <el-radio :label="2">学历教育</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="报名项目" prop="pay_type">
        <el-select
          v-model="formData.pay_type"
          placeholder="请选择"
          class="input"
          filterable
        >
          <el-option
            v-for="item in payWays"
            :key="item.value"
            :label="item.label"
            :value="item.label"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单金额" prop="title">
        <el-input
          class="input"
          v-model="formData.title"
          type="number"
          placeholder="请输入订单金额"
        />
      </el-form-item>
      <el-form-item label="共享业绩" prop="pay_type">
        <el-select
          v-model="formData.pay_type"
          placeholder="请选择"
          class="input"
          filterable
        >
          <el-option
            v-for="item in payWays"
            :key="item.value"
            :label="item.label"
            :value="item.label"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <div v-if="formData.type === 2">
        <el-form-item label="考前辅导费" prop="title">
          <el-input
            class="input"
            v-model="formData.title"
            type="number"
            placeholder="请输入考前辅导费"
          />
        </el-form-item>
        <el-form-item label="报考费" prop="title">
          <el-input
            class="input"
            v-model="formData.title"
            type="number"
            placeholder="请输入报考费"
          >
            <template slot="append">元/科</template>
          </el-input>
        </el-form-item>
        <el-form-item label="教材费" prop="title">
          <el-input
            class="input"
            v-model="formData.title"
            type="number"
            placeholder="请输入教材费"
          >
            <template slot="append">元/年</template>
          </el-input>
        </el-form-item>
        <el-form-item label="毕设指导费" prop="title">
          <el-input
            class="input"
            v-model="formData.title"
            type="number"
            placeholder="请输入毕设指导费"
          />
        </el-form-item>
        <el-form-item label="论文答辩费" prop="title">
          <el-input
            class="input"
            v-model="formData.title"
            type="number"
            placeholder="请输入论文答辩费"
          />
        </el-form-item>
        <el-form-item label="平台费" prop="title">
          <el-input
            class="input"
            v-model="formData.title"
            type="number"
            placeholder="请输入平台费"
          />
        </el-form-item>
        <el-form-item label="其他费用" prop="title">
          <el-input
            class="input"
            v-model="formData.title"
            type="number"
            placeholder="请输入其他费用"
          />
        </el-form-item>
      </div>
      <el-form-item label="备注信息" prop="resource">
        <el-input
          style="width: 800px"
          v-model="formData.title"
          type="textarea"
          placeholder="请输入备注信息"
        />
      </el-form-item>
      <div class="table">
        <!-- 职业教育 -->
        <el-table
          v-if="formData.type === 1"
          :data="[{ price: 1 }]"
          :header-cell-style="{
            'text-align': 'center',
            'background-color': '#f8f8f8',
          }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column label="序号" min-width="70" type="index">
          </el-table-column>
          <el-table-column
            label="项目名称"
            show-overflow-tooltip
            min-width="150"
            prop="project_name"
          >
          </el-table-column>
          <el-table-column
            label="所属分类"
            show-overflow-tooltip
            min-width="150"
            prop="project_name"
          >
          </el-table-column>
          <el-table-column
            prop="price"
            label="项目价格"
            min-width="110"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <div>￥{{ row.price }}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" min-width="200">
            <template slot-scope="{ row }">
              <div style="display: flex; justify-content: center">
                <el-button type="text">删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!-- 学历教育 -->
        <el-table
          v-else
          :data="[{ price: 1 }]"
          :header-cell-style="{
            'text-align': 'center',
            'background-color': '#f8f8f8',
          }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column label="序号" min-width="70" type="index">
          </el-table-column>
          <el-table-column
            label="学历形式"
            show-overflow-tooltip
            min-width="150"
            prop="project_name"
          >
          </el-table-column>
          <el-table-column
            label="院校名称"
            show-overflow-tooltip
            min-width="150"
            prop="project_name"
          >
          </el-table-column>
          <el-table-column
            label="层次名称"
            show-overflow-tooltip
            min-width="150"
            prop="project_name"
          >
          </el-table-column>
          <el-table-column
            label="专业名称"
            show-overflow-tooltip
            min-width="150"
            prop="project_name"
          >
          </el-table-column>
          <el-table-column
            label="关联项目"
            show-overflow-tooltip
            min-width="150"
            prop="project_name"
          >
          </el-table-column>
          <el-table-column
            prop="price"
            label="总学费"
            min-width="110"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <div>￥{{ row.price }}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" min-width="200">
            <template slot-scope="{ row }">
              <div style="display: flex; justify-content: center">
                <el-button type="text">删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <Title text="结算差价"></Title>
      <el-form-item label="合计金额">
        <div class="total-amount">
          <span class="total-amount__value">$1212121</span>
          <span class="total-amount__desc"
            >*合计金额正数代表应向学员收费，负数代表应对学员退费，0元代表不收不退</span
          >
        </div>
      </el-form-item>
      <div>
        <el-form-item label="回款期次" prop="region">
          <el-select
            class="input"
            v-model="formData.region"
            placeholder="请选择回款期次"
          >
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
          <el-button type="text" style="margin-left: 10px" title="配置回款计划"
            >配置</el-button
          >
        </el-form-item>
        <el-form-item label="回款金额" prop="title">
          <el-input
            class="input"
            v-model="formData.title"
            type="number"
            placeholder="请输入回款金额"
          />
        </el-form-item>
        <el-form-item label="支付方式" prop="pay_type">
          <el-select
            v-model="formData.pay_type"
            placeholder="请选择支付方式"
            class="input"
            filterable
          >
            <el-option
              v-for="item in payWays"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="应退金额" prop="title">
          <el-input
            class="input"
            v-model="formData.title"
            type="number"
            placeholder="请输入应退金额"
          />
        </el-form-item>
        <el-form-item label="退款方式" prop="pay_type">
          <el-select
            v-model="formData.pay_type"
            placeholder="请选择退款方式"
            class="input"
            filterable
          >
            <el-option
              v-for="item in payWays"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收款账号" prop="title">
          <el-input
            class="input"
            v-model="formData.title"
            type="number"
            placeholder="请输入收款账号"
          />
        </el-form-item>
      </div>
    </el-form>
    <div class="submit">
      <el-button>取 消</el-button>
      <el-button
        type="primary"
        :loading="addLoading"
        @click="submitForm('formData')"
        >确 定</el-button
      >
    </div>
  </div>
</template>
<script>
import { payWays } from "@/utils";
export default {
  name: "RefundOnly",
  data() {
    return {
      payWays,
      addLoading: false,
      formData: {
        type: 1,
        title: "",
        items: [],
        remark: "",
      },
      rules: {
        type: [{ required: true, message: "请选择", trigger: "change" }],
        title: [{ required: true, message: "请输入", trigger: "blur" }],
      },
    };
  },
  methods: {
    async submit() {
      const data = {
        title: this.formData.title,
        remark: this.formData.remark,
      };
      const api = {};
      this.addLoading = true;
      const res = await api(data).catch(() => {
        this.addLoading = false;
      });
      this.addLoading = false;
      if (res.code === 0) {
        this.$message.success(res.message);
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submit();
        }
      });
    },
  },
};
</script>
<style lang="less">
.refund-only {
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
  .input {
    width: 300px;
  }
  .table {
    border: 1px solid #eee;
    margin-bottom: 20px;
  }
  .total-amount {
    &__value {
      color: #fd6500;
      margin-right: 100px;
    }
    &__desc {
      color: #666;
    }
  }
  .submit {
    position: relative;
    padding: 30px 0;
    text-align: center;
    button {
      margin-right: 20px;
      padding: 12px 40px;
    }
    &::before {
      content: "";
      height: 10px;
      position: absolute;
      background-color: #f2f6fc;
      top: 0;
      left: -16px;
      right: -16px;
    }
  }
}
</style>