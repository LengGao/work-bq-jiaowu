<template>
  <div class="number-range">
    <el-input
      type="number"
      @mousewheel.native.prevent
      :placeholder="startPlaceholde"
      v-model="start"
      @input="handleInput"
    />
    <span class="number-range-separator">-</span>
    <el-input
      type="number"
      @mousewheel.native.prevent
      :placeholder="endPlaceholde"
      v-model="end"
      @input="handleInput"
    />
  </div>
</template>
<script>
export default {
  name: "NumberRange",
  props: {
    value: {
      type: [Array, String],
      default: () => ["", ""],
    },
    startPlaceholde: {
      type: String,
      default: "起",
    },
    endPlaceholde: {
      type: String,
      default: "止",
    },
    valueFormat: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      start: this.value[0] || "",
      end: this.value[1] || "",
    };
  },
  created() {
    if (this.valueFormat && +this.value) {
      this.handleInput();
    }
  },
  methods: {
    handleInput() {
      let result = [this.start, this.end];
      if (this.valueFormat) {
        result = result.join(this.valueFormat);
        if (!this.start && !this.end) {
          result = "";
        }
      }
      this.$emit("input", result);
    },
  },
};
</script>
<style lang="less" scoped>
.number-range {
  display: flex;
  align-items: center;
  &-separator {
    margin: 0 10px;
  }
}
</style>
<style >
/* 去掉number样式 */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type="number"] {
  -moz-appearance: textfield;
}
</style>