<template>
  <div class="search-lise">
    <div v-for="(item, index) in options" :key="index">
      <component
        :style="item.width ? { width: item.width + 'px' } : ''"
        v-model.trim="searchData[item.key]"
        :is="allComponents[item.type || 'input']"
        v-bind="item.attrs"
        v-on="{ ...item.events }"
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
            :value="option[item.optionValue]"
            :label="option[item.optionLabel]"
          >
          </el-option>
        </template>
      </component>
    </div>
    <div class="search-btns">
      <el-button @click="handleSearch">搜索</el-button>
      <!-- <el-button type="primary" @click="handleReset">重置</el-button> -->
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
      searchData: {},
    };
  },
  created() {
    console.log(this.$listeners);
    this.initData();
  },
  methods: {
    initData() {
      this.searchData = { ...this.data };
    },
    handleReset() {
      for (const key in this.searchData) {
        if (typeof this.searchData[key] === "object") {
          this.searchData[key] = Array.isArray(this.searchData[key]) ? [] : {};
        } else {
          this.searchData[key] = "";
        }
      }
      this.handleSearch();
    },
    deepClone(data, newData) {
      for (const key in data) {
        if (typeof data[key] === "object") {
          newData[key] = Array.isArray(data[key]) ? [] : {};
          this.deepClone(data[key], newData[key]);
        } else {
          newData[key] = data[key];
        }
      }
    },
    handleSearch() {
      const data = {};
      this.deepClone(this.searchData, data);
      this.$emit("on-search", data);
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
