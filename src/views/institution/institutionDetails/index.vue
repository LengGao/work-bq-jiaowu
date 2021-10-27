<template>
  <div class="institution-detail">
    <el-tabs v-model="activeName">
      <el-tab-pane label="机构课程" name="BasicInfo"></el-tab-pane>
      <el-tab-pane label="机构题库" name="InsitutionQuestion"></el-tab-pane>
      <el-tab-pane label="机构学生" name="InsitutionStudent"></el-tab-pane>
      <el-tab-pane label="机构公海" name="InsitutionSeas"></el-tab-pane>
      <el-tab-pane label="资金流水" name="CapitalFlow"></el-tab-pane>
      <el-tab-pane label="学生订单" name="StudentOrder"></el-tab-pane>
      <el-tab-pane label="学生对接" name="StudentDocking"></el-tab-pane>
    </el-tabs>
    <component
      :is="getComponent"
      @on-basic-success="getStudentBasicDetail"
      :datas="detailData"
      :uid="detailData.uid"
    />
  </div>
</template>

<script>
import { getStudentBasicDetail } from "@/api/eda";
export default {
  name: "studentDetail",
  data() {
    return {
      activeName: "BasicInfo",
      detailData: {},
      detailLoading: false,
    };
  },
  computed: {
    getComponent() {
      if (this.activeName) {
        return () => import(`./components/${this.activeName}.vue`);
      }
    },
  },
  activated() {
    this.getStudentBasicDetail();
  },
  methods: {
    openSingUpDialog() {
      this.signUpDialog = true;
    },
    //学生基本信息
    async getStudentBasicDetail() {
      const data = {
        id: this.$route.query?.id || "",
      };
      this.detailLoading = true;
      const res = await getStudentBasicDetail(data);
      this.detailLoading = false;
      if (res.code === 0) {
        this.detailData = res.data;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.institution-detail {
  padding: 20px;
}
</style>
