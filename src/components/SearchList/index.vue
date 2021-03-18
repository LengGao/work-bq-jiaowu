<template>
  <div class="search-lise">
    <div v-for="(item, index) in options" :key="index">
      <component
        :style="item.width ? { width: item.width + 'px' } : ''"
        v-model.trim="data[item.key]"
        :is="allComponents[item.type || 'input']"
        v-bind="item.attrs"
        class="search-item"
        :class="{
          'search-item': true,
          'search-item-date': item.type === 'datePicker',
        }"
      >
        <template v-if="item.type === 'select'">
          <el-option
            v-for="(option, oIndex) in item.options"
            :key="oIndex"
            v-bind="option"
          >
          </el-option>
        </template>
      </component>
    </div>
    <div class="search-btns">
      <!-- <el-button>重置</el-button> -->
      <el-button @click="handleSearch">搜索</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchList",
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      allComponents: {
        input: "el-input",
        select: "el-select",
        datePicker: "el-date-picker",
        cascader: "el-cascader",
      },
    };
  },
  methods: {
    handleSearch() {
      this.$emit("on-search");
    },
  },
};
</script>

<style lang="scss" scoped>
.search-lise {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  .search-item {
    width: 200px;
    margin: 0 10px 10px 0;
    &.search-item-date {
      width: 300px;
    }
  }
  .search-btns {
    margin: 0 10px 10px 0;
  }
}
</style>