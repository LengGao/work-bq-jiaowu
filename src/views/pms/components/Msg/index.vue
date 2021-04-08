<template>
  <div class="msg">
    <div class="msg-title">
      <h4 class="title">消息中心</h4>
    </div>
    <ul class="msg-content">
      <li class="msg-item" v-for="(item, index) in data" :key="index">
        <span class="msg-item-info" :title="item.title">{{ item.title }}</span>
        <span class="msg-item-date">{{ item.create_time }}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "Msg",
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.title {
  font-weight: normal;
  margin-right: 16px;
}
.msg {
  padding: 16px;
  border: 1px solid #dcdfe6;
  .msg-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .msg-content {
    padding-top: 10px;
    .msg-item {
      display: flex;
      justify-content: space-between;
      line-height: 30px;
      color: #909399;
      .msg-item-info {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: 14px;
      }
      .msg-item-date {
        width: 100px;
        font-size: 12px;
        flex-shrink: 0;
        text-align: right;
      }
    }
  }
}
</style>