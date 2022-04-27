<template>
  <div class="sms">
    <div class="sms-container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="发送消息" name="SendSMS"></el-tab-pane>
        <el-tab-pane label="消息记录" name="SMSRecordList"></el-tab-pane>
      </el-tabs>
      <component :is="getComponent" />
    </div>
  </div>
</template>

<script>
export default {
  name: "examinationSMS",
  data() {
    return {
      activeName: "SendSMS",
    };
  },
  computed: {
    getComponent() {
      if (this.activeName) {
        return () => import(`./components/${this.activeName}.vue`);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.sms {
  &-container {
    padding: 10px 20px;
  }
}
</style>