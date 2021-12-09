<template>
  <div class="student-order-detail" v-loading="loading">
    <div class="student-order-title">
      <h3>{{ detailData.surname }}-{{ detailData.project_name }}</h3>
      <span class="student-order-status">机构学生单</span>
    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="基本信息" name="BasicInfo"></el-tab-pane>
      <el-tab-pane label="回款记录" name="CollectionRecord"></el-tab-pane>
    </el-tabs>
    <component :is="getComponent" :data="detailData" />
  </div>
</template>

<script>
import { getCrmOrderDetail } from "@/api/crm";
export default {
  name: "studentOrderDetail",
  data() {
    return {
      activeName: "BasicInfo",
      loading: false,
      detailData: {
        pay_plan: [],
        pay_log: [],
        project: "[]",
        verify_step: [],
        verify_status: 0,
      },
    };
  },
  computed: {
    getComponent() {
      if (this.activeName) {
        return () => import(`./components/${this.activeName}.vue`);
      }
    },
  },
  created() {
    this.getCrmOrderDetail();
  },
  methods: {
    async getCrmOrderDetail() {
      const data = {
        order_id: this.$route.query.id,
      };
      this.loading = true;
      const res = await getCrmOrderDetail(data).catch(() => {});
      this.loading = false;
      if (res.code === 0) {
        this.detailData = res.data;
      }
    },
  },
};
</script>
<style lang="less">
.student-order-detail {
  padding: 16px;
  .student-order-title {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    .student-order-status {
      margin-left: 20px;
      color: #999;
      &::before {
        display: inline-block;
        content: "";
        width: 8px;
        height: 8px;
        background-color: #43d100;
        border-radius: 50%;
        margin-right: 4px;
      }
    }
  }
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


