<template>
  <section class="main">
    <!-- <breadcrumb class="breadcrumb"></breadcrumb> -->
    <div>
      <img :src="logo" alt="" />
    </div>
    <el-button type="primary">下载图片</el-button>
  </section>
</template>

<script>
import logo from '@/assets/images/studyReport.jpg'
export default {
  name: 'studyReport',
  data() {
    return {
      logo,
    }
  },
}
</script>

<style lang="scss" scoped>
.main {
  padding: 20px;
}
.breadcrumb {
  display: flex !important;
  justify-content: flex-start;
}
</style>
