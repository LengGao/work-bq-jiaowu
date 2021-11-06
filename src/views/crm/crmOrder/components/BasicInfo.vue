<template>
  <div class="basic-info">
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
        <span class="info-item__name">业绩归属：</span>
        <span class="info-item__value">fdsafdsafdsaf2424</span>
      </div>
      <div class="info-item">
        <span class="info-item__name">订单金额：</span>
        <span class="info-item__value">fdsafdsafdsaf2424</span>
      </div>
      <div class="info-item">
        <span class="info-item__name">合计金额：</span>
        <span class="info-item__value">fdsafdsafdsaf2424</span>
      </div>
      <div class="info-item">
        <span class="info-item__name">已回款金额：</span>
        <span class="info-item__value">fdsafdsafdsaf2424</span>
      </div>
      <div class="info-item">
        <span class="info-item__name">未回款金额：</span>
        <span class="info-item__value">fdsafdsafdsaf2424</span>
      </div>
      <div class="info-item">
        <span class="info-item__name">报名类型：</span>
        <span class="info-item__value">fdsafdsafdsaf2424</span>
      </div>
      <div class="info-item">
        <span class="info-item__name">考前辅导费：</span>
        <span class="info-item__value">fdsafdsafdsaf2424</span>
      </div>
      <div class="info-item">
        <span class="info-item__name">报考费：</span>
        <span class="info-item__value">fdsafdsafdsaf2424</span>
      </div>
      <div class="info-item">
        <span class="info-item__name">教材费：</span>
        <span class="info-item__value">fdsafdsafdsaf2424</span>
      </div>
      <div class="info-item">
        <span class="info-item__name">毕设指导费：</span>
        <span class="info-item__value">fdsafdsafdsaf2424</span>
      </div>
      <div class="info-item">
        <span class="info-item__name">论文答辩费：</span>
        <span class="info-item__value">fdsafdsafdsaf2424</span>
      </div>
      <div class="info-item">
        <span class="info-item__name">平台费：</span>
        <span class="info-item__value">fdsafdsafdsaf2424</span>
      </div>
      <div class="info-item">
        <span class="info-item__name">其他费用：</span>
        <span class="info-item__value">fdsafdsafdsaf2424</span>
      </div>
      <div class="info-item">
        <span class="info-item__name">订单备注：</span>
        <span class="info-item__value">fdsafdsafdsaf2424</span>
      </div>
    </div>
    <Title text="学历信息"></Title>
    <el-table
      :data="[]"
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
        show-overflow-tooltip
        min-width="70"
        align="center"
        prop="id"
      >
      </el-table-column>
      <el-table-column
        label="学历形式"
        show-overflow-tooltip
        min-width="160"
        align="center"
        prop="title"
      >
      </el-table-column>
      <el-table-column
        prop="has_question"
        label="院校名称"
        min-width="80"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        label="层次名称"
        align="center"
        min-width="100"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        label="专业名称"
        align="center"
        min-width="100"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        label="关联项目"
        align="center"
        min-width="100"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        label="最低学费"
        align="center"
        min-width="100"
        show-overflow-tooltip
      >
      </el-table-column>
    </el-table>
    <Title text="项目信息"></Title>
    <el-table
      :data="[]"
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
        show-overflow-tooltip
        min-width="70"
        align="center"
        prop="id"
      >
      </el-table-column>
      <el-table-column
        label="项目名称"
        show-overflow-tooltip
        min-width="160"
        align="center"
        prop="title"
      >
      </el-table-column>
      <el-table-column
        prop="has_question"
        label="所属分类"
        min-width="80"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        label="最低价格"
        align="center"
        min-width="100"
        show-overflow-tooltip
      >
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "ChangeBasicInfo",
  data() {
    return {};
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