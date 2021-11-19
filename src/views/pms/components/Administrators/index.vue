<template>
  <div class="admin" v-loading="loading"></div>
</template>
<script>
import {
  getAdminWorkData,
  getVisitChart,
  getSaleChart,
} from "@/api/workbench.js";
export default {
  name: "Administrators",
  components: {},
  data() {
    return {
      loading: false,
    };
  },

  created() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.admin {
}
</style>