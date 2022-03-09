<template>
  <div class="help">
    <div class="help-header">
      <i
        class="iconfont icontuichuquanping"
        @click="exitFullscreen"
        v-if="isFullscreen"
        title="关闭全屏"
      ></i>
      <i
        class="iconfont iconquanping"
        title="全屏展示"
        @click="enterFullscreen"
        v-else
      ></i>
      <i @click="handleClose" title="关闭" class="iconfont iconclose"></i>
    </div>
    <iframe :src="url" class="help-iframe" frameborder="0"></iframe>
  </div>
</template>

<script>
export default {
  name: "Help",
  props: {
    url: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isFullscreen: false,
    };
  },
  mounted() {
    document.addEventListener("fullscreenchange", () => {
      this.getFullScreenStatus();
    });

    document.addEventListener("mozfullscreenchange", () => {
      this.getFullScreenStatus();
    });

    document.addEventListener("webkitfullscreenchange", () => {
      this.getFullScreenStatus();
    });

    document.addEventListener("msfullscreenchange", () => {
      this.getFullScreenStatus();
    });
  },
  methods: {
    // 判断当前页面是否全屏
    getFullScreenStatus() {
      this.isFullscreen = !!(
        document.fullscreen ||
        document.mozFullScreen ||
        document.webkitIsFullScreen ||
        document.webkitFullScreen ||
        document.msFullScreen
      );
    },
    enterFullscreen() {
      var docElm = document.querySelector(".help");
      //W3C
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      }
      //FireFox
      else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      }
      //Chrome等
      else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      }
      //IE11
      else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
    },
    exitFullscreen() {
      //W3C
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      //FireFox
      else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      }
      //Chrome等
      else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
      //IE11
      else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    },
    handleClose() {
      this.$store.commit("SET_HELP_URL", "");
      this.isFullscreen && this.exitFullscreen();
    },
  },
};
</script>

<style lang='less' scoped>
.help {
  width: 0;
  background-color: #fff;
  transition: width 0.28s;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  &-header {
    display: flex;
    padding: 13px 6px;
    align-items: center;
    .title {
      margin: 0 auto;
    }
    .iconfont {
      font-size: 24px;
      cursor: pointer;
    }
    .iconclose {
      margin-left: auto;
    }
  }
  &-iframe {
    background-color: #eee;
    flex: 1;
  }
}
</style>