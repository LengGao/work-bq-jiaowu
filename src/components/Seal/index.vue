<template>
  <div
    class="seal"
    :style="{
      left: left + 'px',
      right: right + 'px',
      bottom: bottom + 'px',
      top: top + 'px',
    }"
  >
    <div class="seal__solid" :style="{ 'border-color': colors[type] }"></div>
    <div class="seal__dashed" :style="{ 'border-color': colors[type] }">
      <span :style="{ color: colors[type] }" class="seal-text">{{ text }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "seal",
  props: {
    text: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "success",
    },
    left: {
      type: [String, Number],
      default: "",
    },
    top: {
      type: [String, Number],
      default: "",
    },
    right: {
      type: [String, Number],
      default: "",
    },
    bottom: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      colors: {
        success: "#1ABC9C",
        error: "#FD6500",
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.seal {
  position: absolute;
  .seal__solid {
    width: 130px;
    height: 130px;
    border-radius: 50%;
    border: 2px solid #fff;
  }
  .seal__dashed {
    position: absolute;
    left: 5px;
    top: 5px;
    border: 1px dashed #fff;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: rotate(-25deg);
    .seal-text {
      font-size: 25px;
    }
  }
}
</style>