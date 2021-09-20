<template>
  <div class="configuration">机构配置配置</div>
</template>
<script>
// import ImageUpload from "@/components/ImgUpload";
import {
  modifyInstitutionConfig,
  getInstitutionDetail,
} from "@/api/institution";
export default {
  name: "institutionConfig",
  // components: {
  //   ImageUpload,
  // },
  data() {
    return {

    };
  },
  created() {
    // this.getInstitutionDetail();
  },
  methods: {
 
    },
  }

</script>
<style lang="less" scoped>
.institution-config {
  padding: 20px;
  .config-form {
    width: 600px;
  }
}
</style>