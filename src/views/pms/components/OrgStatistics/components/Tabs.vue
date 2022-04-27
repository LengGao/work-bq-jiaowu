<template>
  <div class="tab" slot="header-center">
    <span
      v-for="(item, index) in data"
      :key="index"
      class="tab-item"
      :class="[type, value === item.value ? 'tab-item--active' : '']"
      @click="handleClick(item.value)"
      >{{ item.label }}</span
    >
  </div>
</template>

<script>
export default {
  props: {
    type: {
      validator: function (value) {
        return (
          ["primary", "success", "warning", "danger"].indexOf(value) !== -1
        );
      },
      default: "primary",
    },
    value: {
      type: [String, Number],
      default: "",
    },
    data: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    handleClick(val) {
      this.$emit("input", val);
      this.$emit("change", val);
    },
  },
};
</script>

<style lang="less" scoped>
.tab {
  font-size: 14px;
  color: #333;
  text-align: center;
  &-item {
    padding: 0 20px;
    cursor: pointer;
    &:not(:last-child) {
      border-right: 1px solid #666;
    }
    &--active {
      &.primary {
        color: #199fff;
      }
      &.success {
        color: #43d100;
      }
      &.warning {
        color: #fdc400;
      }
      &.danger {
        color: #fd6500;
      }
    }
  }
}
</style>