<template>
  <div>
    <div class="app-container">
      <el-col :span="13" style="margin-left: 100px;margin-top: 60px; text-align: left;">
        <img :src="img_404" alt="404" class="img-style" />
      </el-col>
      <el-col :span="8">
        <div style="margin-left: 100px;margin-top: 60px; text-align: left;">
          <h1 class="color-main">OOPS!</h1>
          <h2 style="color: #606266">很抱歉，页面它不小心迷路了！</h2>
          <div style="color:#909399;font-size: 14px">请检查您输入的网址是否正确，请点击以下按钮返回主页或者发送错误报告</div>
          <el-button style="margin-top: 20px" type="primary" round @click="handleGoMain">返回首页</el-button>
        </div>
      </el-col>
    </div>
  </div>
</template>

<script>
import img_404 from "@/assets/images/gif_404.gif";
export default {
  // inject: ["logining"],
  // inject: ["reload"],
  name: "error",
  data() {
    return {
      img_404
    };
  },
  created() {
    // this.logining();
  },
  methods: {
    handleGoMain() {
      this.$router.push({ path: "/" });
    }
  }
};
</script>

<style scoped>
.app-container {
  width: 80%;
  margin: 120px auto;
}

.img-style {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}
.app-container{
  background: #ffffff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
   margin: 120px auto;
   display: flex;
   justify-items: center;
    margin: 120px auto;
  
}
.main{
 left: 0 !important;
 top: 0 !important;
 padding: 0 !important;
 background: #ffffff !important;
}
</style>
