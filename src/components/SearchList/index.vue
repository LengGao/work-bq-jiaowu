<template>
  <div class="search-lise">
    <div v-for="(item, index) in options" :key="index">
      <component
        :style="{
          width: computeWidth(item.width, item.type === 'datePicker'),
        }"
        v-model="searchData[item.key]"
        :is="allComponents[item.type || 'input']"
        v-bind="item.attrs"
        v-on="item.events"
        @keypress.native.enter="handleSearch"
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
            :value="option[item.optionValue || 'value']"
            :label="option[item.optionLabel || 'label']"
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
import NumberRange from "./components/NumberRange";
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
  components: {
    NumberRange,
  },
  data() {
    return {
      allComponents: {
        input: "el-input",
        select: "el-select",
        datePicker: "el-date-picker",
        cascader: "el-cascader",
        numberRange: "NumberRange",
      },
      searchData: {},
    };
  },
  created() {
    this.initData();
  },
  methods: {
    computeWidth(width, isDate) {
      if (width) {
        return typeof width === "number" ? width + "px" : width;
      }
      return isDate ? "300px" : "200px";
    },
    initData() {
      // this.searchData = { ...this.data };
      this.searchData = this.data;
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
        if (typeof data[key] === "object" && data[key] !== null) {
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
    margin: 0 10px 10px 0;
  }
  .search-btns {
    margin: 0 10px 10px 0;
  }
}
</style>
