<template>
  <div class="table-block">
    <div class="table-block-head">
      <Title slot="header-title" :text="title"></Title>
      <div class="header-tab">
        <span
          class="header-tab-item"
          :class="{ 'header-tab-item--active': checkedValue === tab.value }"
          v-for="tab in tabs"
          :key="tab.value"
          @click="handleChecked(tab.value)"
          >{{ tab.title }}</span
        >
      </div>
      <slot name="header-right"></slot>
    </div>
    <div class="table-block-list">
      <div
        class="list-item"
        v-for="(item, index) in data"
        :key="item.id"
        @click="$emit('list-click', item)"
      >
        <slot name="left" :row="item" :index="index"></slot>
        <slot name="right" :row="item" :index="index"></slot>
      </div>
      <div class="no-data" v-if="!data.length">
        <img src="../../../../../assets/images/no-data.png" alt="" />
        <p>暂无数据</p>
      </div>
      <div v-if="isMore" class="table-block-load-more" @click="handleLoadMore">
        <span>加载更多...</span>
      </div>
    </div>
  </div>
</template>
<script >
export default {
  name: "TableBlock",
  props: {
    title: {
      type: String,
      default: "",
    },
    listTotal: {
      type: [String, Number],
      default: 0,
    },
    tabsActive: {
      type: Number,
      default: 0,
    },
    tabs: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      checkedValue: this.tabsActive || 0,
    };
  },
  computed: {
    isMore() {
      console.log(this.data.length, this.listTotal);
      return this.data.length < this.listTotal;
    },
  },
  methods: {
    handleLoadMore() {
      this.$emit("load-more");
    },
    handleChecked(val) {
      this.checkedValue = val;
      this.$emit("tabs-change", val);
    },
  },
};
</script>
<style lang="scss" scoped>
.table-block {
  border: 1px solid #eceef3;
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 20px;
  &-head {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    .el-title {
      margin-bottom: 0;
    }
    .header-tab {
      display: flex;
      align-items: center;
      margin-left: 16px;
      &-item {
        margin-left: 16px;
        color: #999;
        font-size: 14px;
        cursor: pointer;
        padding: 0 2px;
        border-radius: 2px;
        &--active {
          color: #fff;
          background-color: #199fff;
        }
      }
    }
  }
  &-list {
    height: 360px;
    overflow-y: auto;
    position: relative;
    .list-item {
      display: flex;
      justify-content: space-between;
      padding: 8px;
      border-bottom: 1px solid #ededed;
      font-size: 14px;
      cursor: pointer;
      &:hover {
        background-color: #f2f6fc;
      }
    }
    .no-data {
      position: absolute;
      left: 0;
      top: 30%;
      width: 100%;
      text-align: center;
      font-size: 14px;
      color: #999;
      img {
        width: 200px;
      }
    }
  }
  &-load-more {
    margin-top: 8px;
    padding: 8px;
    background-color: #f2f6fc;
    color: #999;
    font-size: 14px;
    text-align: center;
    cursor: pointer;
  }
}
</style>