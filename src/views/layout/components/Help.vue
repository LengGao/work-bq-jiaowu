<template>
  <div class="help">
    <div class="help-header">
      <i
        class="iconfont icontuichuquanping"
        @click="exitFullscreen"
        v-if="value"
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
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    enterFullscreen() {
      this.$emit("input", true);
    },
    exitFullscreen() {
      this.$emit("input", false);
    },
    handleClose() {
      this.$store.commit("SET_HELP_URL", "");
      this.value && this.exitFullscreen();
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