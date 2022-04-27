<template>
  <section class="mainwrap">
    <div style="display:flex">
      <div class="weixinBox">
        <img :src="img_url" alt="" @click="showpopup" />
        <span>{{ subscribe_classroom_name }}</span>
      </div>
      <div class="code">
        <el-button type="primary" @click="showpopup">二维码全屏</el-button>
        <div class="code_sign"></div>
      </div>
    </div>

    <div v-show="popup" @click="closepopup">
      <!--这里是要展示的内容层-->
      <div class="login">
        <div class="weixinBox2">
          <img :src="img_url" alt="" />
          <!-- <span>{{classroomName}}</span> -->
        </div>
      </div>
      <!--这里是半透明背景层-->
      <div class="over"></div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'signCode',
  data() {
    return {
      img_url: '',
      popup: 0,
      subscribe_classroom_name: '',
    }
  },
  created() {
    this.$api.getQrCode(this)
    this.subscribe_classroom_name = this.$route.query.subscribe_classroom_name
  },
  methods: {
    showpopup() {
      this.popup = 1
      this.$message('点击任意区域,即可退出全屏')
    },
    closepopup() {
      this.popup = 0
    },
  },
}
</script>

<style lang="scss" scoped>
.main {
  padding: 20px;
  margin: 20px;
  background: #fff;
}
.login {
  position: fixed;
  font-size: 24px;

  border-radius: 0.25rem;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  .weixinBox2 {
    width: 700px;
    background: #fff;
    height: 700px;
    // background: url(../../assets/images/sigincode3.png) no-repeat;
    background-size: 100% 100%;
    position: relative;
    img {
      position: absolute;
      width: 700px;
    }
    span {
      width: 267px;
      text-align: center;
      position: absolute;
      font-size: 14px;
      bottom: 63px;
      left: 20px;
    }
  }
}
.over {
  position: fixed;
  width: 100%;
  height: 100%;
  opacity: 1; //透明度为70%
  filter: alpha(opacity=70);
  top: 0;
  left: 0;
  z-index: 999;
  background-color: #fff;
}
.code {
  padding-left: 50px;
  .code_link {
    font-size: 14px;
    display: flex;
    align-items: center;
    padding-bottom: 30px;
    p {
      padding-right: 30px;
    }
  }
  .code_sign {
    display: flex;

    p {
      padding-right: 30px;
    }
  }
}
.weixinBox {
  width: 239px;
  height: 362px;
  background: url(../../../assets/images/sigincode3.png) no-repeat;
  position: relative;
  img {
    position: absolute;
    width: 144px;
    top: 100px;
    left: 46px;
  }
  span {
    width: 200px;
    text-align: center;
    position: absolute;
    font-size: 16px;
    bottom: 63px;
    left: 20px;
  }
}
</style>
