<template>
  <div class="international-waters">
    <div class="head_remind">
      *公海学员的数据来源是授权登录小程序的未付费客户，以及招生老师自行释放出来的客户。
    </div>
    <div class="container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="招生公海" name="CRM"></el-tab-pane>
        <el-tab-pane label="东培公海" name="Dongpei"></el-tab-pane>
        <el-tab-pane label="机构公海" name="Institution"></el-tab-pane>
      </el-tabs>
      <component :is="getComponent" />
    </div>
  </div>
</template>

<script>
export default {
  name: "changeEdit",
  data() {
    return {
      activeName: "CRM",
    };
  },
  computed: {
    getComponent() {
      if (this.activeName) {
        return () => import(`./components/${this.activeName}.vue`);
      }
    },
  },
  created() {},
  methods: {},
};
</script>
<style lang="less">
.international-waters {
  .container {
    padding: 16px;
  }
}
</style>


